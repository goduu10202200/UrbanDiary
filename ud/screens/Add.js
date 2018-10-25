import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, ListItem } from "../node_modules/react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

//import PopupDialog from 'react-native-popup-dialog';

import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";

export default class Member extends React.Component {
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

    // 日期格式化
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };

    this.inputRefs = {};
    this.state = {
      title: "",
      type: " ",
      location: "",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      listDate: new Date().Format("yyyy-MM-dd"),
      listTime: new Date().Format("hh:mm")
    };
  }

  _showDatePicker = () =>
    this.setState({
      isDatePickerVisible: true
    });
  _showTimePicker = () =>
    this.setState({
      isTimePickerVisible: true
    });
  _hideDateTimePicker = () =>
    this.setState({
      isDatePickerVisible: false,
      isTimePickerVisible: false
    });

  _handleDatePicked = date => {
    var strDate = date.Format("yyyy-MM-dd");
    this.setState({ listDate: strDate });
    this._hideDateTimePicker();
  };
  _handleTimePicked = date => {
    var strTime = date.Format("hh:mm");
    this.setState({ listTime: strTime });
    this._hideDateTimePicker();
  };

  InsertDataToServer = () => {
    var self = this;
    var title = this.state.title;
    var type = this.state.type;
    var location = this.state.location;
    var date = this.state.listDate;
    var time = this.state.listTime;

    axios({
      url: "http://172.20.10.2:8181/urbandiary/ud_api/scheduled_api.php",
      method: "post",
      data: {
        title: title,
        // content: content,
        type: type,
        location: location,
        date: date,
        time: time
      }
    })
      .then(function(response) {
        self.setState({ title: "" });
        self.setState({ location: "" });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    let list_type = [
      {
        label: "感情",
        tag: "heart",
        value: "love"
      },
      {
        label: "食記",
        tag: "pizza",
        value: "eat"
      },
      {
        label: "旅遊",
        tag: "bicycle",
        value: "trip"
      },
      {
        label: "工作",
        tag: "hammer",
        value: "work"
      },
      {
        label: "學業",
        tag: "brush",
        value: "schoolwork"
      },
      {
        label: "生活",
        tag: "life",
        value: "life"
      }
    ];

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles_add.container}
      >
        <View style={styles_add.header}>
          <Text style={styles_add.headerTxt}>新增待辦事項</Text>
        </View>
        <View style={styles_add.addDiv}>
          <TextInput
            style={styles_add.addInput}
            multiline={true}
            placeholder="請輸入待辦事項"
            ref={el => {
              this.title = el;
            }}
            onChangeText={text => this.setState({ title: text })}
            value={this.state.title}
          />

          {/* <TextInput
            style={styles_add.addInput}
            multiline={true}
            placeholder="描述"
            ref={el => {
              this.content = el;
            }}
            onChangeText={text => this.setState({ content: text })}
          /> */}

          <View style={styles_add.listDiv}>
            <Icon
              // name={list_type.value}
              name={Platform.OS === "ios" ? "ios-pricetag" : "md-pricetag"}
              style={styles_add.btnIcon}
            />
            <Dropdown
              label="標籤類型"
              data={list_type}
              containerStyle={styles_add.listDiv_data}
              onChangeText={data => this.setState({ type: data })}
            />
          </View>
          <TextInput
            style={styles_add.addInput}
            multiline={true}
            placeholder="地點"
            ref={el => {
              this.location = el;
            }}
            onChangeText={text => this.setState({ location: text })}
            value={this.state.location}
          />
          <View style={styles_add.timeDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
              style={styles_add.btnIcon}
            />
            <TouchableOpacity onPress={this._showDatePicker}>
              <View style={styles_add.btnTime}>
                <Text>{this.state.listDate}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles_add.timeDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-time" : "md-time"}
              style={styles_add.btnIcon}
            />
            <TouchableOpacity onPress={this._showTimePicker}>
              <View style={styles_add.btnTime}>
                <Text>{this.state.listTime}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            mode="date"
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <DateTimePicker
            mode="time"
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this._handleTimePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
        <Button
          buttonStyle={styles_add.addBtn}
          textStyle={styles_add.addBtnTxt}
          title="儲存"
          onPress={this.InsertDataToServer}
        />
      </ScrollView>
    );
  }
}
