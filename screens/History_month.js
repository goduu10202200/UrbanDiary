import React from "react";
import styles_history from "./style/style_history";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Font } from 'expo';

export default class Page extends React.Component {
  render() {
    return (
      <ScrollView style={styles_history.container}>
      <View>
        <TouchableOpacity style={styles_history.button}>
          <Image
            style={styles_history.Image_History}
            source={require("../assets/images/t5.jpg")}
          /><Text style={styles_history.Title_History
          }>10月</Text>
          <Text style={styles_history.buttonText}>
            資韻獎快到了，我已經選好歌曲了
            {/* {"\n"} */}
            但不知道會不{"\n"}會被淘汰@@
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
