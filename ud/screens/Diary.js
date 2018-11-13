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
import { Button } from "../node_modules/react-native-elements";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import ServiceApiNet from "./ServiceApiNet";

import styles_layout from "./style/style_layout";
import styles_diary from "./style/style_diary";
import History_day from "./History_day";
const window = Dimensions.get("window");

export default class Diary extends React.Component {
  static navigationOptions = {
    title: "日記",
    headerRight: (
      <TouchableOpacity
      // onPress={() => {
      //   InsertDataToServe;
      // }}
      >
        {/* <Icon
          name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
          iconStyle={{ right: 20 }}
          size={50}
        /> */}
      </TouchableOpacity>
    ),
    headerStyle: styles_layout.titleDiv,
    headerTitleStyle: styles_layout.titleTxt
  };

  constructor(props) {
    super(props);
    this.state = {
      taginput: "",
      isHidden: false,
      MainNumber: 0,
      diaryContent:
        "今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！"
    };
    this.onPress = this.onPress.bind(this);
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

  // This is hidden window function Start
  onPress() {
    this.setState({ isHidden: !this.state.isHidden });
    this.setState({ MainNumber: this.MainNumber + 1 });
  }
  // This is hidden window function End

  connection_inputtext(text) {
    /* diary add tag input */
    var showtext = this.state.diaryContent + text;
    this.setState({ diaryContent: showtext });
  }
  labelAJAX(type) {
    var self = this;
    axios({
      url: ServiceApiNet.getURL() + "mongo_labeldiary.php",
      method: "post",
      data: {
        type: type
      }
    })
      .then(function(response) {
        self.setState({ taginput: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  InsertDataToServer = () => {
    var self = this;
    var content = this.state.diaryContent;
    axios({
      url: ServiceApiNet.getURL() + "mongo_diary.php",
      method: "post",
      data: {
        content: content
      }
    })
      .then(function(response) {
        console.log(response.data);
        // self.setState({ diaryContent: "" });
        Alert.alert("儲存成功", "");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles_diary.container}
      >
        <Button
          title="儲存"
          onPress={this.InsertDataToServer}
          buttonStyle={{
            width: 100,
            height: 100,
            position: "absolute",
            right: 0
          }}
        />
        <View style={styles_diary.header}>
          <Text style={styles_diary.header_txt}>{this.ShowCurrentDate()}</Text>
        </View>
        <View style={styles_diary.diary}>
          <TextInput
            style={styles_diary.diary_input}
            multiline={true}
            placeholder="今天發生了什麼趣事呢？"
            ref={el => {
              this.diaryContent = el;
            }}
            onChangeText={diaryContent =>
              this.setState({ diaryContent: diaryContent })
            }
            value={this.state.diaryContent}
          />
        </View>

        {/* This is hidden window */}

        {/* Click urban diary's tag => diaplay window*/}
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="標籤" />}
          dialogStyle={styles_diary.dialog}
        >
          <TextInput
            style={styles_diary.dialog_input}
            placeholderTextColor="#a3a6a7"
            ref={el => {
              this.taginput = el;
            }}
            onChangeText={taginput => this.setState({ taginput })}
            value={this.state.taginput}
            // multiline={true}
          />
          <Button
            title="送出"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles_diary.dialog_btn}
            onPress={() => {
              this.connection_inputtext(this.state.taginput);
              this.popupDialog.dismiss();
              this.setState({ isHidden: !this.state.isHidden });
            }}
          />
        </PopupDialog>
        {/* Click urban diary's tag => diaplay window */}

        {this.state.isHidden ? (
          <View style={styles_diary.tag_div}>
            <TouchableOpacity
              style={{
                width: "55%",
                height: "100%",
                position: "absolute",
                top: 0,
                right: 0
              }}
              onPress={this.onPress}
            />
            <View style={styles_diary.tag_box}>
              {/* urban diary's  mood tag  Staret*/}
              <TouchableHighlight
                onPress={() => {
                  this.labelAJAX("love");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_love.png")}
                />
              </TouchableHighlight>
              {/* urban diary's mood tag  End*/}

              {/* urban diary's weather tag  Start*/}
              <TouchableHighlight
                onPress={() => {
                  this.labelAJAX("eat");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_eat.png")}
                />
              </TouchableHighlight>
              {/* urban diary's weather tag  End*/}

              <TouchableHighlight
                onPress={() => {
                  this.labelAJAX("trip");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_trip.png")}
                />
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.labelAJAX("work");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_work.png")}
                />
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.labelAJAX("schoolwork");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_homework.png")}
                />
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.labelAJAX("life");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_life.png")}
                />
              </TouchableHighlight>
            </View>
          </View>
        ) : null}

        <ActionButton
          position="right"
          buttonColor="rgba(231, 76, 60, 0.5)"
          btnOutRange="rgba(231, 76, 60, 1)"
          hideShadow={true}
          offsetX={15}
          offsetY={90}
        >
          <ActionButton.Item
            buttonColor="#3498db"
            title="標籤"
            onPress={this.onPress}
          >
            <Icon
              name={Platform.OS === "ios" ? "ios-pricetags" : "md-pricetags"}
              style={styles_diary.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="圖片"
            onPress={() => {}}
          >
            <Icon
              name={Platform.OS === "ios" ? "ios-image" : "md-image"}
              style={styles_diary.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>

        <Button
          title="✓"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 55,
            height: 55,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 50,
            position: "absolute",
            bottom: 20,
            right: 0
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={this.InsertDataToServer}
        />
      </ScrollView>
    );
  }
}
