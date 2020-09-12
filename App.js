// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View>
//       <Text style={styles.blue}>Hello !</Text>
//       {/*
//   add the following <View> after your Text Components
//   By the way, this is how you comment inside JSX!
//   \*/}
//       <View style={styles.box}></View>

//       {/* <StatusBar style="auto" /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   blue: {
//     color: "blue",
//     fontWeight: "600",
//   },
//   bigRed: {
//     color: "red",
//     fontSize: 30,
//   },

//   bigRedBold: {
//     color: "red",
//     fontSize: 30,
//     fontWeight: "600",
//   },
//   box: {
//     width: 60,
//     height: 60,
//     backgroundColor: "blue",
//   },
// });

import React, { Component } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
// } from "react-native";
import SplashScreen from "./components/Start";
import ChatScreen from "./components/Chat";
// import react native gesture handler
import "react-native-gesture-handler";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// creates navigation for app
const Stack = createStackNavigator();

export default class App extends React.Component {
  //constructor(props) {
  //super(props);
  //this.state = { text: "" };
  //}

  render() {
    return (
      //creates application and which screens can be accessed while in the app
      <NavigationContainer>
        {/* sets default screen to splash screen (home) */}
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* defines screens for navigation within screens */}
          <Stack.Screen name="Home" component={SplashScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
// <View style={{ flex: 1, justifyContent: "center" }}>
//   <TextInput
//     style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//     onChangeText={(text) => this.setState({ text })}
//     value={this.state.text}
//     placeholder="Type here ..."
//   />
//   <Text>You wrote: {this.state.text}</Text>
//   <Button
//     onPress={() => {
//       this.alertMyText({ text: this.state.text });
//     }}
//     title="Press Me"
//   />
//   <ScrollView>
//     <Text style={{ fontSize: 100 }}>
//       This text is so big! And so long! You have to scroll!
//     </Text>
//   </ScrollView>
// </View>

// );
// }
//}
