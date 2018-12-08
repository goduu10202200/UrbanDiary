import React from "react";
import styles_history from "./style/style_history";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
export default class History_day extends React.Component {
  // 跳頁功能 (參數是頁面名稱)
  jump = page => {
    this.props.jump(page);
  };
  render() {
    return (
      <ScrollView style={styles_history.container}>
      <View style={styles_history.diaryDiv}>
        <TouchableOpacity
          style={styles_history.button}
          onPress={() => this.jump("Diary")}
        ><Image
            style={styles_history.Image_History}
            source={require("../assets/images/t1.jpg")}
          />
          <Text style={styles_history.Title_History}>2018/10/04</Text>
          
          <Text style={styles_history.buttonText}>
            今天英文考了93分，好高興
            {/* {"\n"} */}
            晚餐吃{"\n"}了欣葉慶祝一下!!
          </Text>
        </TouchableOpacity>
        </View>

        <View style={styles_history.diaryDiv}>
        <TouchableOpacity style={styles_history.button}>
          <Image
            style={styles_history.Image_History}
            source={require("../assets/images/t2.jpg")}
          /><Text style={styles_history.Title_History}>2018/10/03</Text>
          
          <Text style={styles_history.buttonText}>
            明天要考會計院小考，我要
            {/* {"\n"} */}
            設鬧鐘{"\n"}起床讀書
          </Text>
        </TouchableOpacity>
        </View>

        <View style={styles_history.diaryDiv}>
        <TouchableOpacity style={styles_history.button}>
          <Image
            style={styles_history.Image_History}
            source={require("../assets/images/t3.jpg")}
          /><Text style={styles_history.Title_History}>2018/10/02</Text>
          
          <Text style={styles_history.buttonText}>
            我想守護我想珍惜的人，希望一切{"\n"}一定會更好
          </Text>
        </TouchableOpacity>
        </View>

        <View style={styles_history.diaryDiv}>
        <TouchableOpacity style={styles_history.button}>
          <Image
            style={styles_history.Image_History}
            source={require("../assets/images/t4.jpg")}
          /><Text style={styles_history.Title_History}>2018/10/01</Text>
          
          <Text style={styles_history.buttonText}>
            今天去朋友家烤肉，吃了超多
            {/* {"\n"} */}
            雞屁{"\n"}股聽到很多八卦哈哈哈
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
