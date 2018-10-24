import React from "react";
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
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
//import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../node_modules/react-native-elements";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";

import styles_layout from "./style/style_layout";
import styles_diary from "./style/style_diary";

const window = Dimensions.get("window");

export default class Diary extends React.Component {
  static navigationOptions = {
    title: "日記",
    headerRight: (
      <TouchableOpacity onPress onPress={this.InsertDataToServer}>
        {/* <Image
          source={require("../assets/images/LogoFont_w.png")}
          style={styles_layout.titleLogo}
        /> */}
        <Icon
            name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
            iconStyle={{right: 20}}
            size={50}
          />
      </TouchableOpacity>


    ),
    // headerTitle: (
    //   // <Image
    //   //   source={require("../assets/images/LogoFont_w.png")}
    //   //   style={styles_layout.titleLogo}
    //   // />
    //   <Text fontStyle="styles_layout.titleTxt">日記</Text>
    // ),
    headerStyle: styles_layout.titleDiv,
    // headerTintColor: "#fff",
    headerTitleStyle : styles_layout.titleTxt,
  };

  constructor(props) {
    super(props);
    this.state = {
      // key: "",
      taginput: "",
      isHidden: false,
      // MainOpacity: 1,
      MainNumber: 0,
      // MainView: "100%",
      // connection_text: "",
      diaryContent: "",
      location: "",
    };
    this.onPress = this.onPress.bind(this);
  }

  /* Date */ 
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day = new Date().getDay();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return year + " / " + month + " / " + date + "   " + weekday[day] + " ☀";
  };

  // This is hidden window function Start
  onPress() {
    this.setState({ isHidden: !this.state.isHidden });

    //Click urban diary's tag number Start
    this.setState({ MainNumber: this.MainNumber + 1 });
    //Click urban diary's tag number End

    // Click urban diary's tag Start
    // if (this.state.MainNumber % 2 == 0) {
    //   this.setState({ MainView: "55%" });
    //   this.setState({ MainOpacity: 0.6 });
    // } else {
    //   this.setState({ MainView: "100%" });
    //   this.setState({ MainOpacity: 1 });
    // }
    // Click urban diary's tag End
  }
  // This is hidden window function End

  // Display Input Text Start
  // renderTodo = () => {
  //   return this.state.diaryContent;
  // };
  // Display Input Text End

  connection_inputtext(text) {
    /* diary add tag input */
    var showtext = this.state.diaryContent + text;
    this.setState({ diaryContent: showtext });
  }

  InsertDataToServer = () => {
    var content = this.state.diaryContent;
    var location = this.state.location;

    axios({
      url: "http://172.20.10.2/urbandiary/ud_api/diary_api.php",
      method: "post",
      data: {
        content: content,
        location: location
      }
    })
      .then(function(response) {
        console.log(response.data);
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
        <View style={styles_diary.header}>
          <Text style={styles_diary.header_txt}>{this.ShowCurrentDate()}</Text>
        </View>
        <View style={styles_diary.diary}>
          <TextInput
            style={styles_diary.diary_input}
            multiline={true}
            placeholder="今天發生了什麼趣事呢？"
            ref= {(el) => { this.diaryContent = el; }}
            onChangeText={(diaryContent) => this.setState({diaryContent})}
            value={this.state.diaryContent}
          />

          {/* <Button
            buttonStyle={styles_diary.diary_btn}
            textStyle={styles_diary.diary_btn_txt}
            title="儲存"
          /> */}
        </View>

        {/* This is hidden window */}

        {/* Click urban diary's tag => diaplay window*/}
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle 
            title="標籤" 
          />}
          dialogStyle={styles_diary.dialog}
          // dialogTitle={<DialogTitle title="Weather" />}
        >
              <TextInput
                style={styles_diary.dialog_input}
                placeholderTextColor="#a3a6a7"
                ref= {(el) => { this.taginput = el; }}
                onChangeText={(taginput) => this.setState({taginput})}
                value={this.state.taginput}
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
          <View  
            style={styles_diary.tag_div} 
          >
            <TouchableOpacity 
              style={{
                width: "55%",
                height: "100%",
                position: "absolute",
                top: 0,
                right: 0,
              }} 
              onPress={this.onPress}
            />
            <View style={styles_diary.tag_box}>
              {/* urban diary's  mood tag  Staret*/}
              <TouchableHighlight
                onPress={() => {
                  this.popupDialog.show();
                  this.setState({ taginput: " 跟女朋友吵架了.... " });
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_love.png")}
                />
                {/* <View style={styles_diary.tag}>
                  <Text style={styles_diary.tag_txt}>#感情</Text>
                </View> */}
              </TouchableHighlight>
              {/* urban diary's mood tag  End*/}

              {/* urban diary's weather tag  Start*/}
              <TouchableHighlight
                onPress={() => {
                  this.popupDialog.show();
                  this.setState({ taginput: "今天吃了... " });
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_eat.png")}
                />
                {/* <View style={styles_diary.tag}>
                  <Text style={styles_diary.tag_txt}>#食記</Text>
                </View> */}
              </TouchableHighlight>
              {/* urban diary's weather tag  End*/}

              <TouchableHighlight
                onPress={() => {
                  this.popupDialog.show();
                  this.setState({ taginput: "今天去了" });
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_trip.png")}
                />
                {/* <View style={styles_diary.tag}>
                  <Text style={styles_diary.tag_txt}>#旅遊</Text>
                </View> */}
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.popupDialog.show();
                  this.setState({ taginput: "今天開會重點是" });
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_work.png")}
                />
                {/* <View style={styles_diary.tag}>
                  <Text style={styles_diary.tag_txt}>#工作</Text>
                </View> */}
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.popupDialog.show();
                  this.setState({ taginput: "今天都沒有功課!!" });
                }}
              >
                <Image
                  style={styles_diary.tag_img}
                  source={require("../assets/images/tag_homework.png")}
                />
                {/* <View style={styles_diary.tag}>
                  <Text style={styles_diary.tag_txt}>#課業</Text>
                </View> */}
              </TouchableHighlight>
            </View>
          </View>
        ) : null}

        <ActionButton
          position="right"
          buttonColor="rgba(231, 76, 60, 0.5)"
          btnOutRange="rgba(231, 76, 60, 1)"
          hideShadow = {true}
          offsetX = {15}
          offsetY = {15}
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
      </ScrollView>
    );
  }
}
