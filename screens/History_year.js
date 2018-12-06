import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.jump("Diary")}
        >
          <Text style={styles.Title_History}>2018年</Text>
          <Image
            style={styles.Image_History}
            source={require("../assets/images/t7.jpg")}
          />
          <Text style={styles.buttonText}>
            今天去打撞球，消夜又吃亞美
            {"\n"}
            不小心就吃掉300塊了
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
