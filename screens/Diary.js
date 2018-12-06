import React from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Camera, Permissions, ImagePicker } from 'expo';
import moment from "moment";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "../node_modules/react-native-elements";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import ServiceApiNet from "./ServiceApiNet";

import styles_layout from "./style/style_layout";
import styles_diary from "./style/style_diary";

const window = Dimensions.get("window");

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
          <Image
            style={styles_layout.titleSubmit_3}
            source={require("../assets/images/camera_icon.png")}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            params.InsertDataToServer();
          }}
        >
          <Image
            style={styles_layout.titleSubmit_2}
            source={require("../assets/images/check_icon.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      taginput: "",
      isHidden: false,
      diaryContent:
        "今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！",

      image: null,
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
    this.setState({ isHidden: !this.state.isHidden });
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
      .then(function (response) {
        self.setState({ taginput: response.data });
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showImgAJAX = () => {
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

  _InsertDataToServer = () => {
    var self = this;
    var content = this.state.diaryContent;

    axios({
      url: ServiceApiNet.getURL() + "mongo_diary.php",
      method: "post",
      data: {
        content: content
      }
    })
      .then(function (response) {
        console.log(response.data);
        // self.setState({ diaryContent: "" });
        Alert.alert("儲存成功", "");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  _pickImage = async () => {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    let result;
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      //pickerResult = await ImagePicker.launchImageLibraryAsync({
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
    }
    else {
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
      .then(function (response) {
        console.log(response.data);
        this.showImgAJAX();
      })
      .catch(function (error) {
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
        <View style={styles_diary.header}>
          <Text style={styles_diary.header_txt}>{this.ShowCurrentDate()}</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {this.state.image && (
            <View style={styles_diary.diary_imgDiv}>
              <Image
                source={{ uri: this.state.image }}
                resizeMode={"contain"}
                style={styles_diary.diary_img}
              />
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
                onPress={this.labelonPress}
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
            renderIcon={active =>
              active ? (
                <Icon
                  name="md-pricetags"
                  style={styles_diary.actionButtonIcon}
                />
              ) : (
                  <Icon
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
            onPress={this.labelonPress}
          >
            <Icon />
            {/* <ActionButton.Item
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
              onPress={this._pickImage}
            >
              <Icon
                name={Platform.OS === "ios" ? "ios-image" : "md-image"}
                style={styles_diary.actionButtonIcon}
              />
            </ActionButton.Item> */}
          </ActionButton>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center"
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 5,
    width: 250
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden"
  },
  maybeRenderImage: {
    height: 250,
    width: 250
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});