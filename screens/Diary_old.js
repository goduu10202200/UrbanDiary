import React from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import { BlurView } from 'expo';
import ServiceApiNet from "./ServiceApiNet";

import styles_layout from "./style/style_layout";
import styles_diary from "./style/style_diary";

export default class Diary_old extends React.Component {
  static navigationOptions = {
    title: "日記",
    headerStyle: styles_layout.titleDiv,
    headerTitleStyle: styles_layout.titleTxt,
    headerTintColor: '#fff',
    headerTintSize: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      diaryContent: "",
      image: null,
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

  //onload
  componentDidMount() {
    this.ViewAJAX();
    this.showImgAJAX();
  }

  showImgAJAX() {
    var self = this;
    axios({
      url: ServiceApiNet.getURL() + "mongo_viewphoto.php",
      method: "post"
    })
      .then(function (response) {
        if (response.data != "No data") {
          self.setState({
            image: ServiceApiNet.getUploadURL() + response.data["name"]
          });
        }
        // console.log(response.data);
        // alert(this.state.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //顯示diary
  ViewAJAX() {
    var date = this.props.navigation.state.params.date;

    return axios({
      url: ServiceApiNet.getURL() + "mongo_viewdiary.php",
      method: "post",
      data: {
        date: date
      }
    })
      .then(responseJson => {
        this.setState({
          diaryContent: responseJson.data[0].content
        });
      })
      .catch(error => {
        console.log(error);
        // console.error(error);
      });
  }


  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles_diary.container}
      >
        <View style={styles_diary.header}>
          <Text style={styles_diary.header_txt}>
            {this.props.navigation.state.params.date}
          </Text>
        </View>
        {this.state.image && (
          <View style={styles_diary.diary_imgDiv}>
            <Image
              source={{ uri: this.state.image }}
              style={styles_diary.diary_img}
            />
            {/* Adjust the tint and intensity */}
            <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill}>
              <Image
                source={{ uri: this.state.image }}
                resizeMode={"contain"}
                style={styles_diary.diary_img}
              />
            </BlurView>
          </View>
        )}
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
