import React from "react";
import styles_history from "./style/style_history";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";

export default class History_year extends React.Component {
  constructor(props) {
    super(props);
  }

  // 跳頁功能 (參數是頁面名稱)
  jump = page => {
    this.props.jump(page);
  };

  render() {
    return (
      <ScrollView style={styles_history.container}>
        <TouchableOpacity
          style={styles_history.button}
          onPress={() => this.jump("Diary")}
        ><Image
            style={styles_history.Image_History}
            source={require("../assets/images/t7.jpg")}
          />
          <Text style={styles_history.Title_History}>2018年</Text>
          
          <Text style={styles_history.buttonText}>
            今天去打撞球，消夜又吃亞美
            {/* {"\n"} */}
            不小心就吃掉{"\n"}300塊了
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
