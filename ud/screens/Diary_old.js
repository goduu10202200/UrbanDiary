import React from "react";
import axios from "axios";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import ServiceApiNet from "./ServiceApiNet";

import styles_layout from "./style/style_layout";
import styles_diary from "./style/style_diary";
import History_day from "./History_day";


export default class Diary_old extends React.Component {
  static navigationOptions = {
    title: "日記"
  };

  constructor(props) {
    super(props);
    this.state = {
      diaryContent: "",
    };
  }

  /* Date */

  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = new Date().getDay();
    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    return year + " / " + month + " / " + date + "   " + weekday[day];
  };


  //顯示list
  ViewAJAX() {
    var date = this.props.navigation.state.params.date;
    // alert(date);

    return fetch(ServiceApiNet.getURL() + "viewdiary_api.php", {
      method: "POST",
      body: JSON.stringify({
        date: date
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            diaryContent: responseJson[0].content
          },
          function () {
            // In this block you can do something with new state.
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  //onload
  componentDidMount() {
    this.ViewAJAX();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles_diary.container}
      >
        <View style={styles_diary.header}>
          <Text style={styles_diary.header_txt}>{this.props.navigation.state.params.date}</Text>
        </View>
        <View style={styles_diary.diary}>
          <Text
            style={styles_diary.diary_input}
            ref={el => {
              this.diaryContent = el;
            }}
          >
            {this.state.diaryContent}
          </Text>
        </View>
      </ScrollView>
    );
  }
}
