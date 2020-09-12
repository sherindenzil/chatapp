import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ChatScreen extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    /**
     * uses name and background color defiend on start screen
     */
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: this.props.navigation.state.params.color,
        }}
      >
        <Text>Hello Screen2!</Text>
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
