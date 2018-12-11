import React from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Camera, Permissions, ImagePicker, BlurView } from "expo";
import moment from "moment";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Feather";
import Icon_Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "../node_modules/react-native-elements";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import ServiceApiNet from "./ServiceApiNet";

import styles_layout from "./style/style_layout";
import styles_diary from "./style/style_diary";

var photoOptions = {
  //底部彈出框選項
  title: "請選擇",
  cancelButtonTitle: "取消",
  takePhotoButtonTitle: "拍照",
  chooseFromLibraryButtonTitle: "選擇相簿",
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class Diary extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "日記",
      headerStyle: styles_layout.titleDiv,
      headerTitleStyle: styles_layout.titleTxt,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            params.Imgpicker();
          }}
        >
          <Icon name="camera" style={styles_layout.titleSubmit_2} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            params.InsertDataToServer();
          }}
        >
          {/* <Text style={{color: "#FFF", fontSize: 15, marginRight: 10, marginTop: 3}}>
            完成
          </Text> */}
          <Icon name="check" style={styles_layout.titleSubmit_3} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      taginput: "",
      isHidden: true,
      diaryContent:
        "今天一大早十點去教學大樓和通識課組員們準備期末開會報告，過程很順利～" +
        "\n" +
        "中午十二點和很久不見的高中同學聚餐，見到大家好開心，但美中不足的地方是忘記合照了ＱＱ",
      image: null,
      imagefilename: ""
    };
    this.labelonPress = this.labelonPress.bind(this);
  }

  //設定全域變數開啟speechDialog
  componentDidMount() {
    this.props.navigation.setParams({
      InsertDataToServer: this._InsertDataToServer
    });
    this.props.navigation.setParams({ Imgpicker: this._pickImage });
    this.showImgAJAX();
    // Animated.timing(
    //   this.state.animatedValue,
    //   {
    //     toValue: 100,
    //     duration: 1000
    //   }
    // ).start();
    // Animated.sequence([
    //   Animated.timing(this.state.animatedValue, {
    //     toValue: 100,
    //     duration: 1000
    // }),
    //   Animated.timing(this.state.animatedValue, {
    //     toValue: 0,
    //     duration: 1000
    // }),
    // ]).start()
    
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
  labelonPress() {
    //this.setState({ isHidden: !this.state.isHidden });
    if(JSON.stringify(this.state.animatedValue)==120)
    {
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: -20,
          duration: 1000
        }
      ).start();
    }
    else if(JSON.stringify(this.state.animatedValue)!=120)
    {
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: 120,
          duration: 1000
        }
      ).start();
    }
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
        // console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showImgAJAX = () => {
    var self = this;
    axios({
      url: ServiceApiNet.getURL() + "mongo_viewphoto.php",
      method: "post"
    })
      .then(function(response) {
        if (response.data != "No data") {
          self.setState({
            image: ServiceApiNet.getUploadURL() + response.data["name"]
          });
        }
        // console.log(response.data);
        // alert(this.state.image);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  _InsertDataToServer = () => {
    var self = this;
    var content = this.state.diaryContent;

    axios({
      url: ServiceApiNet.getURL() + "mongo_diary.php",
      method: "post",
      data: {
        content: content,
        imagefilename: self.imagefilename
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

  _pickImage = async () => {
    let self = this;
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    let result;
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      //pickerResult = await ImagePicker.launchImageLibraryAsync({
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
    } else {
      alert("尚未開啟相機權限，請先開啟再使用此項功能。");
    }

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    if (result.cancelled) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // 將filename 給全域變數
    self.imagefilename = filename;

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("file", {
      name: filename,
      uri: localUri,
      type
    });

    axios
      .post(ServiceApiNet.getURL() + "mongo_uploadphoto.php", formData)
      .then(function(response) {
        console.log(response.data);
        self.showImgAJAX();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles_diary.container}
        scrollEnabled={false}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles_diary.header}>
            <Text style={styles_diary.header_txt}>
              {this.ShowCurrentDate()}
            </Text>
          </View>
          {this.state.image && (
            <View style={styles_diary.diary_imgDiv}>
              <Image
                source={{ uri: this.state.image }}
                style={styles_diary.diary_img}
              />
              {/* Adjust the tint and intensity */}
              <BlurView
                tint="dark"
                intensity={50}
                style={StyleSheet.absoluteFill}
              >
                <Image
                  source={{ uri: this.state.image }}
                  resizeMode={"contain"}
                  style={styles_diary.diary_img}
                />
              </BlurView>
            </View>
          )}
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
                //onPress={this.labelonPress}
              />
              <View style={styles_diary.tag_box}>
                {/* urban diary's  mood tag  Staret*/}
                <Animated.View
                    style={{transform: [{translateX: this.state.animatedValue}]}}
                >
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
                </Animated.View>
              </View>
            </View>
          ) : null}
          
          <ActionButton
            renderIcon={active =>
              active ? (
                <Icon_Ionicons
                  name="md-pricetags"
                  style={styles_diary.actionButtonIcon}
                />
              ) : (
                <Icon_Ionicons
                  name="md-pricetag"
                  style={styles_diary.actionButtonIcon}
                />
              )
            }
            position="right"
            buttonColor="rgba(142, 142, 142, 0.5)"
            btnOutRange="#3b5998"
            hideShadow={true}
            offsetX={15}
            offsetY={20}
            onPress={ () =>{
              this.labelonPress();
              //alert(JSON.stringify(this.state.animatedValue))
              // setTimeout(() => {
              //   alert(JSON.stringify(this.state.animatedValue))
              // }, 1500)
              
            }}
          >
            <Icon_Ionicons />
          </ActionButton>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}
