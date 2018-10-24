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
import publicIP from "react-native-public-ip";
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

    this.inputRefs = {};

    this.state = {
      title: " ",
      // content: " ",
      type: " ",
      location: " ",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      listDate: new Date().toDateString(),
      listTime: new Date().toTimeString()
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
    var strDate = date.toDateString();
    this.setState({ listDate: strDate });
    this._hideDateTimePicker();
  };
  _handleTimePicked = date => {
    var strTime = date.toTimeString();
    this.setState({ listTime: strTime });
    this._hideDateTimePicker();
  };

  InsertDataToServer = () => {
    var title = this.state.title;
    // var content = this.state.content;
    var type = this.state.type;
    var location = this.state.location;
    var date = this.state.listDate;
    var time = this.state.listTime;

    // alert(
    //   "title:"+ title+
    //   "content:"+ content+
    //   "type:"+ type+
    //   "location:"+ location+
    //   "date:"+ date+
    //   "time:"+ time);

    // alert(DeviceInfo.getIPAddress().toString());

    // publicIP()
    // .then(ip => {
    //   console.log(ip);
    //   alert(ip);
    //   // '47.122.71.234'
    // })
    // .catch(error => {
    //   console.log(error);
    //   // 'Unable to get IP address.'
    // });

    axios({
      url: "http://172.20.10.2/urbandiary/ud_api/scheduled_api.php",
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
            placeholder="說明"
            ref={el => {
              this.title = el;
            }}
            onChangeText={text => this.setState({ title: text })}
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
