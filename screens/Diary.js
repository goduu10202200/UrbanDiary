import React from "react";
import axios from "axios";
import {
  // ScrollView,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SlidingPanel from 'react-native-sliding-up-down-panels';
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

const { width, height } = Dimensions.get('window');
var isHidden = true;

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
        "今天早上九點去大安區圖書館，準備開會報告，希望可以順利～ 中午十二去吃要排隊超久的一蘭拉麵，和好久不見的大學同學會聚餐，真開心吃完拉麵後，和小睿一起去台北地下街逛逛，還買了初音未來的模型哦！",
      image: null,
      imagefilename: "",
      animatedValue: new Animated.Value(0),

      bounceValue: new Animated.Value(500),  //This is the initial position of the subview
      buttonText: "Show Subview"
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
    if (JSON.stringify(this.state.animatedValue) == 120) {
      Animated.timing(this.state.animatedValue, {
        toValue: -20,
        duration: 1000
      }).start();
    } else if (JSON.stringify(this.state.animatedValue) != 120) {
      Animated.timing(this.state.animatedValue, {
        toValue: 120,
        duration: 1000
      }).start();
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
        content: content,
        imagefilename: self.imagefilename
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
      .then(function (response) {
        console.log(response.data);
        self.showImgAJAX();
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  _toggleSubview() {
    this.setState({
      buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    });

    var toValue = 500;

    if (isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isHidden = !isHidden;
  }


  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles_diary.container}
        scrollEnabled={false}
      >
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}{/* Click urban diary's tag => diaplay window*/}
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
              //this.setState({ isHidden: !this.state.isHidden });
              this.labelonPress();
            }}
          />
        </PopupDialog>
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
        <View style={styles.tagSlide}>
          {isHidden ? null : (
            <BlurView
              style={{ width, height, backgroundColor: "#333", opacity: 0.7, zIndex: -1, position: "absolute", bottom: 0 }}
              // viewRef={this.state.viewRef}
              blurType="prominent"
              blurAmount={100}
            />
          )}
          <TouchableOpacity style={styles.tagSlide_uparrow} onPress={() => { this._toggleSubview() }}>
            <Icon_Ionicons
              name={Platform.OS === "ios" ? `ios-arrow-up` : "md-arrow-dropup"}
              size={30}
              color={"#fff"}
            />
            <Text style={styles.tagSlide_title}>標籤</Text>
          </TouchableOpacity>
          <Animated.View
            style={[styles.subView,
            { transform: [{ translateY: this.state.bounceValue }] }]}
          >
            <View style={styles.tagSlide_div}>
              <TouchableOpacity
                style={styles.tagSlide_downarrow}
                onPress={() => { this._toggleSubview() }}>
                <Icon_Ionicons
                  name={Platform.OS === "ios" ? `ios-arrow-down` : "md-arrow-dropdown"}
                  size={30}
                  color={"#fff"}
                />
                <Text style={styles.tagSlide_title}>標籤</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this._toggleSubview()
                  this.labelAJAX("love");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
                style={styles.tagSlide_item}
              >
                <Icon name="heart" size={20} color={"#922B21"} />
                <Text style={[styles.tagSlide_itemtxt, { color: "#922B21" }]}>感情</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this._toggleSubview()
                  this.labelAJAX("life");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
                style={styles.tagSlide_item}
              >
                <Icon name="activity" size={20} color={"#D4AC0D"} />
                <Text style={[styles.tagSlide_itemtxt, { color: "#D4AC0D" }]}>生活</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this._toggleSubview()
                  this.labelAJAX("schoolwork");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
                style={styles.tagSlide_item}
              >
                <Icon name="book" size={20} color={"#E67E22"} />
                <Text style={[styles.tagSlide_itemtxt, { color: "#E67E22" }]}>學業</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this._toggleSubview()
                  this.labelAJAX("work");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
                style={styles.tagSlide_item}
              >
                <Icon name="briefcase" size={20} color={"#1B4F72"} />
                <Text style={[styles.tagSlide_itemtxt, { color: "#1B4F72" }]}>工作</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this._toggleSubview()
                  this.labelAJAX("trip");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
                style={styles.tagSlide_item}
              >
                <Icon name="compass" size={20} color={"#0E6251"} />
                <Text style={[styles.tagSlide_itemtxt, { color: "#0E6251" }]}>旅遊</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this._toggleSubview()
                  this.labelAJAX("eat");
                  this.popupDialog.show();
                  this.taginput.focus();
                }}
                style={styles.tagSlide_item}
              >
                <Icon name="compass" size={20} color={"#5B2C6F"} />
                <Text style={[styles.tagSlide_itemtxt, { color: "#5B2C6F" }]}>食記</Text>
              </TouchableOpacity>
              <View style={styles.tagSlide_row}>
                <View style={styles.tagSlide_additem}>
                  <Icon name="plus-circle" size={40} color={"#aaa"} />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  //上拉標籤樣式
  tagSlide: {
    // flex: 1,
    position: "absolute",
    bottom: 0,
    width,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    height: 430,
  },
  tagSlide_uparrow: {
    width: width,
    // height: 70,
    flexDirection: 'row',
    backgroundColor: '#5F6A6A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  tagSlide_downarrow: {
    width: width,
    // height: 70,
    flexDirection: 'row',
    backgroundColor: '#5F6A6A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  tagSlide_title: {
    lineHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 20,
    letterSpacing: 10,
    marginLeft: 18,
  },
  tagSlide_div: {
    width,
    height: 400,
    // backgroundColor: '#eee',
    justifyContent: 'center',
    // alignItems: 'center',
    alignItems: 'flex-start'
  },
  tagSlide_row: {
    width,
    // height: 100,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  tagSlide_item: {
    width,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  tagSlide_itemL: {
    width: width / 2,
    height: 100,
    backgroundColor: '#F9EBEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSlide_itemD: {
    width: width / 2,
    height: 100,
    backgroundColor: '#FFFBEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSlide_itemtxt: {
    fontSize: 20,
    marginLeft: 15,
    letterSpacing: 8
  },
  tagSlide_additem: {
    width: width,
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

});