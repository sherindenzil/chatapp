// import React from "react";
// import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";

// export class Chat extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       messages: [],
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       messages: [
//         {
//           _id: 1,
//           text: "Hello developer",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "React Native",
//             avatar: "https://placeimg.com/140/140/any",
//           },
//         },
//       ],
//     });
//   }

//   onSend(messages = []) {
//     this.setState((previousState) => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }));
//   }

//   render() {
//     let name = this.props.route.params.name;
//     this.props.navigation.setOptions({ title: name });

//     /**
// //      * uses name and background color defiend on start screen
// //      */
//     return (
//       <View>
//         <GiftedChat
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

import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class ChatScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "This is a system message",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

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
    // name and color must be passed as props from Start.js
    let name = this.props.route.params.name;
    let color = this.props.route.params.color;

    // sets the title
    this.props.navigation.setOptions({ title: name });

    // includes conditional render as a keyboardfix in case of Android OS
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: color,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
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
