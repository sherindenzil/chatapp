// import React from "react";
// import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
// import { GiftedChat, Bubble } from "react-native-gifted-chat";

// // import firestore/firebase
// const firebase = require("firebase");
// require("firebase/firestore");

// export default class ChatScreen extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       messages: [],
//       user: {
//         _id: "",
//         name: "",
//         avatar: "",
//       },
//       loggedInText: "",
//     };

//     // connect to firestore
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: "AIzaSyBjGiofTJlV1JTyeoKpsz0rBaWG9vuOR04",
//         authDomain: "chatapp-7103f.firebaseapp.com",
//         databaseURL: "https://chatapp-7103f.firebaseio.com",
//         projectId: "chatapp-7103f",
//         storageBucket: "chatapp-7103f.appspot.com",
//         messagingSenderId: "414897966039",
//         appId: "1:414897966039:web:699551446c6423cf775992",
//         measurementId: "G-1MBCF9RKJF",
//       });
//     }

//     // reference to messages collection
//     this.referenceMessages = firebase.firestore().collection("messages");
//   }

//   componentDidMount() {

//   //   this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
//   //     if (!user) {
//   //       await firebase.auth().signInAnonymously();
//   //     }
//   //   this.setState({
//   //     messages: [
//   //       {
//   //         _id: 1,
//   //         text: "Hello developer",
//   //         createdAt: new Date(),
//   //         user: {
//   //           _id: 2,
//   //           name: "React Native",
//   //           avatar: "https://placeimg.com/140/140/any",
//   //         },
//   //       },
//   //       {
//   //         _id: 2,
//   //         text: "This is a system message",
//   //         createdAt: new Date(),
//   //         system: true,
//   //       },
//   //     ],
//   //   });
//   // }

//   componentWillUnmount() {
//     this.authUnsubscribe();
//     this.unsubscribe();
//   }

//   //Sends messages
//   onSend(messages = []) {
//     this.setState(
//       (previousState) => ({
//         messages: GiftedChat.append(previousState.messages, messages),
//       }),
//       () => {
//         this.addMessages();
//       }
//     );
//   }

//   onCollectionUpdate = (querySnapshot) => {
//     const messages = [];
//     // loop through documents
//     querySnapshot.forEach((doc) => {
//       // get data snapshot
//       const data = doc.data();
//       messages.push({
//         _id: data._id,
//         text: data.text.toString(),
//         createdAt: data.createdAt.toDate(),
//         user: {
//           _id: data.user._id,
//           name: data.user.name,
//           avatar: data.user.avatar,
//         },
//       });
//     });
//     this.setState({
//       messages,
//     });
//   };

//   addMessages = () => {
//     const message = this.state.messages[0];
//     this.referenceMessages.add({
//       _id: message._id,
//       text: message.text || "",
//       createdAt: message.createdAt,
//       user: message.user,
//       sent: true,
//     });
//   };

//   renderBubble(props) {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: "#000",
//           },
//         }}
//       />
//     );
//   }
//   render() {
//     // name and color must be passed as props from Start.js
//     let name = this.props.route.params.name;
//     let color = this.props.route.params.color;

//     // sets the title
//     this.props.navigation.setOptions({ title: name });

//     // includes conditional render as a keyboardfix in case of Android OS
//     return (
//       <View
//         style={{
//           height: "100%",
//           width: "100%",
//           backgroundColor: color,
//         }}
//       >
//         <Text>{this.state.loggedInText}</Text>
//         <GiftedChat
//           renderBubble={this.renderBubble.bind(this)}
//           messages={this.state.messages}
//           onSend={(messages) => this.onSend(messages)}
//           user={{
//             _id: 1,
//           }}
//         />
//         {Platform.OS === "android" ? (
//           <KeyboardAvoidingView behavior="height" />
//         ) : null}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//   },
// });

import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import { GiftedChat, Bubble } from "react-native-gifted-chat";

//import NetInfo from "@react-native-community/netinfo";

//import CustomActions from "./CustomActions.js";

//import MapView from "react-native-maps";

//import Config from "./Config";

// import firestore/firebase
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      loggedInText: "",
      //isConnected: false,
      //image: null,
      //location: null,
    };
    //connect to firestore
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBjGiofTJlV1JTyeoKpsz0rBaWG9vuOR04",
        authDomain: "chatapp-7103f.firebaseapp.com",
        databaseURL: "https://chatapp-7103f.firebaseio.com",
        projectId: "chatapp-7103f",
        storageBucket: "chatapp-7103f.appspot.com",
        messagingSenderId: "414897966039",
        appId: "1:414897966039:web:699551446c6423cf775992",
        measurementId: "G-1MBCF9RKJF",
      });
    }

    // reference to messages collection
    this.referenceMessages = firebase.firestore().collection("messages");
    this.referenceShoppinglistUser = null;
  }

  //authenticates the user, sets the state to sned messages and gets past messages
  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      this.setState({
        user: {
          _id: user.uid,
          name: this.props.route.params.name,
          avatar: "https://placeimg.com/140/140/any",
        },
        loggedInText: `${this.props.route.params.name} has entered the chat`,
        messages: [],
      });
      this.unsubscribe = this.referenceMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    //stop listening to authentication
    this.authUnsubscribe();
    //stop listening to changes
    this.unsubscribe();
  }

  //Sends messages
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // loop through documents
    querySnapshot.forEach((doc) => {
      // get data snapshot
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        //image: data.image || "",
        //location: data.location,
      });
    });
    this.setState({
      messages,
    });
  };

  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      //image: message.image || "",
      //location: message.location || null,
      sent: true,
    });
  };

  // getMessages = async () => {
  //   let messages = [];
  //   try {
  //     messages = (await AsyncStorage.getItem("messages")) || [];
  //     this.setState({
  //       messages: JSON.parse(messages),
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // saveMessages = async () => {
  //   try {
  //     await AsyncStorage.setItem(
  //       "messages",
  //       JSON.stringify(this.state.messages)
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // deleteMessages = async () => {
  //   try {
  //     await AsyncStorage.removeItem("messages");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // renderInputToolbar = (props) => {
  //   if (this.state.isConnected == false) {
  //   } else {
  //     return <InputToolbar {...props} />;
  //   }
  // };

  // renderCustomActions = (props) => {
  //   return <CustomActions {...props} />;
  // };

  // renderCustomView(props) {
  //   const { currentMessage } = props;
  //   if (currentMessage.location) {
  //     return (
  //       <View>
  //         <MapView
  //           style={{
  //             width: 150,
  //             height: 100,
  //             borderRadius: 13,
  //             margin: 3,
  //           }}
  //           region={{
  //             latitude: currentMessage.location.latitude,
  //             longitude: currentMessage.location.longitude,
  //             latitudeDelta: 0.0922,
  //             longitudeDelta: 0.0421,
  //           }}
  //         />
  //       </View>
  //     );
  //   }
  //   return null;
  // }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }

  render() {
    //Get seleceted background color
    let bcolor = this.props.route.params.color;

    //Get selected user name
    let name = this.props.route.params.name;

    //Set title to username
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          //Set background color to selected
          backgroundColor: bcolor,
        }}
      >
        <Text>{this.state.loggedInText}</Text>

        <GiftedChat
          //renderCustomView={this.renderCustomView}
          //renderInputToolbar={this.renderInputToolbar}
          //renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
