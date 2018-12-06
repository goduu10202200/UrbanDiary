import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default class Page extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.Title_History}>10月</Text>
          <Image
            style={styles.Image_History}
            source={require("../assets/images/t6.jpg")}
          />
          <Text style={styles.buttonText}>
            資韻獎快到了，我已經選好歌曲了
            {"\n"}
            但不知道會不會被淘汰@@
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#cfe2ee"
  },
  button: {
    margin: 10,
    padding: 35,
    borderRadius: 9,
    paddingLeft: 75,
    paddingRight: 75,
    alignItems: "center",
    backgroundColor: "#e4eff6",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 13,
    color: "#afbec4",
    textAlign: "left",
    marginLeft: -40,
    paddingRight: 30
  },
  Image_History: {
    width: 80,
    height: 80,
    position: "absolute",
    right: 10
  },
  Title_History: {
    color: "#7b8d93",
    alignSelf: "center",
    fontSize: 17,
    position: "absolute",
    top: 7,
    left: 40
  }
});
