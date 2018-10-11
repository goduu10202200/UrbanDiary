import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableHighlight
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
    headerTitle: (
      <Image
        source={require("../assets/images/LogoFont_w.png")}
        style={styles_layout.titleLogo}
      />
    ),
    headerStyle: styles_layout.titleDiv
  };

  constructor(props) {
    super(props);
    this.state = {
      key: "",
      taginput: "",
      isHidden: false,
      MainOpacity: 1,
      MainNumber: 0,
      MainView: "100%",
      connection_text: "",
      TextInputValueHolder: ""
    };
    this.onPress = this.onPress.bind(this);
  }

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
    if (this.state.MainNumber % 2 == 0) {
      this.setState({ MainView: "55%" });
      this.setState({ MainOpacity: 0.6 });
    } else {
      this.setState({ MainView: "100%" });
      this.setState({ MainOpacity: 1 });
    }
    // Click urban diary's tag End
  }
  // This is hidden window function End

  // Display Input Text Start
  renderTodo = () => {
    return this.state.TextInputValueHolder;
  };
  // Display Input Text End

  connection_inputtext(text) {
    var showtext = this.state.TextInputValueHolder + text;
    this.setState({ TextInputValueHolder: showtext });
  }
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
        <View
          style={{
            height: "94%",
            backgroundColor: "#ededed",
            width: "100%",
            // width: this.state.MainView,
            // opacity: this.state.MainOpacity
          }}
        >
          <TextInput
            style={styles_diary.diary_input}
            multiline={true}
            placeholder="今天發生了什麼趣事呢？"
            value={this.renderTodo()}
            multiline={true}
          />

          <Button
            buttonStyle={styles_diary.diary_btn}
            textStyle={styles_diary.diary_btn_txt}
            title="儲存"
          />
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
          dialogStyle={{ 
            width: "85%",
            height: "30%",
            backgroundColor: '#f7f7f7',
            position: 'absolute',
            top: "23%",
          }}
          containerStyle={{
          }}
          // dialogTitle={<DialogTitle title="Weather" />}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            style={styles_diary.container}
          > 
              <TextInput
                style={{ 
                  width: '90%',
                  backgroundColor: "#fff",
                  fontSize: 16,
                  alignSelf: "center",
                  padding: 10,
                  marginTop: 10,
                  marginBottom: 30,
                  borderRadius: 3,
                  borderWidth: 0.8,
                  borderColor: "#ddd",
                }}
                value={this.state.taginput}
                placeholderTextColor="#a3a6a7"
                ref={el => {
                  this.TextInputValueHolder = el;
                }}
                onChangeText={text =>
                  this.setState({
                    connection_text: text
                  })
                }
              />
              <Button
                title="送出"
                titleStyle={{ fontWeight: "700" }}
                // textStyle={{
                //   marginLeft: -30
                // }}
                buttonStyle={{
                  backgroundColor: "#5b9bd5",
                  width: "100%",
                  height: 50,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.connection_inputtext(this.state.connection_text);
                  this.popupDialog.dismiss();
                }}
              />
          </ScrollView> 
        </PopupDialog>
        {/* Click urban diary's tag => diaplay window */}

        {this.state.isHidden ? (
          <View
            style={{
              top: 0,
              right: 0,
              width: "45%",
              position: "absolute",
              height: window.height,
              backgroundColor: "#19446a",
              paddingLeft: "10%",
              paddingTop: "5%",
            }}
          >
            {/* urban diary's  mood tag  Staret*/}
            <TouchableHighlight
              onPress={() => {
                this.popupDialog.show();
                this.setState({ taginput: " 今天早上心情很好" });
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 50,
                  marginTop: "5%",
                }}
                source={require("../assets/images/tag_mood.png")}
              />
            </TouchableHighlight>
            {/* urban diary's mood tag  End*/}

            {/* urban diary's weather tag  Start*/}
            <TouchableHighlight
              onPress={() => {
                this.popupDialog.show();
                this.setState({ taginput: "今天下午天氣很差 " });
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 50,
                  marginTop: "5%",
                }}
                source={require("../assets/images/tag_weather.png")}
              />
            </TouchableHighlight>
            {/* urban diary's weather tag  End*/}

            <TouchableHighlight
              onPress={() => {
                this.popupDialog.show();
                this.setState({ taginput: "跟男朋友吵架了.... " });
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 50,
                  marginTop: "5%",
                }}
                source={require("../assets/images/tag_love.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                this.popupDialog.show();
                this.setState({ taginput: "今天都沒有功課!!" });
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 50,
                  marginTop: "5%",
                }}
                source={require("../assets/images/tag_homework.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                this.popupDialog.show();
                this.setState({ taginput: "晚餐吃百元鍋～" });
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 50,
                  marginTop: "5%",
                }}
                source={require("../assets/images/tag_eat.png")}
              />
            </TouchableHighlight>
          </View>
        ) : null}

        <ActionButton
          position="left"
          buttonColor="rgba(231,76,60,0.5)"
          shadowStyle={{
            shadowOffset: {
              height: 0,
              width: 0
            }
          }}
          btnOutRange="rgba(231,76,60,1)"
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
