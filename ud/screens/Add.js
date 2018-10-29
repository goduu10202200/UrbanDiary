import React from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";

import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, ListItem, List } from "../node_modules/react-native-elements";
import ServiceApiNet from "./ServiceApiNet";
// Import file
import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";
import moment from "moment";

export default class Member extends React.Component {
  //地點回傳資料
  returnData(location) {
    this.setState({ location: location });
  }
  static navigationOptions = {
    title: "新增待辦事項 ",
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

    this.inputRefs = {};
    this.state = {
      title: "",
      type: " ",
      location: "地點",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      listDate: moment(new Date()).format("YYYY-MM-DD"),
      listTime: moment(new Date()).format("HH:mm"),
      id: "",
      name: ""
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
    var strDate = moment(date).format("YYYY-MM-DD");
    this.setState({ listDate: strDate });
    this._hideDateTimePicker();
  };
  _handleTimePicked = date => {
    var strTime = moment(date).format("HH:mm");
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
      url: ServiceApiNet.getURL() + "scheduled_api.php",
      method: "post",
      data: {
        title: title,
        type: type,
        location: location,
        date: date,
        time: time
      }
    })
      .then(function (response) {
        self.setState({ title: "" });
        self.setState({ location: "地點" });
        Alert.alert(
          "新增成功",
          "",
          [
            { text: 'OK', onPress: () => self.props.navigation.navigate('Member') },
          ]);
        console.log(response.data);
      })
      .catch(function (error) {
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
            fontSize={18}
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
        </View>
        <View style={styles_add.itemDiv}>
          <View style={styles_add.listDiv}>
            <Icon
              // name={list_type.value}
              name={Platform.OS === "ios" ? "ios-pricetag" : "md-pricetag"}
              style={styles_add.listIcon}
            />
            <View style={styles_add.listDiv_data}>
              <Dropdown
                label=""
                labelFontSize={0}
                dropdownOffset={{ top: 20, left: 0 }}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                itemCount={list_type.length}
                data={list_type}
                onChangeText={data => this.setState({ type: data })}
                fontSize={16}
                value={"請選擇"}
              />
            </View>
          </View>
          <View style={styles_add.listDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
              style={styles_add.listIcon}
            />
            <View style={styles_add.listDiv_data}>
              <Text
                style={styles_add.listDiv_dataTxt}
                onPress={
                  () =>
                    this.props.navigation.navigate("Add_location", {
                      returnData: this.returnData.bind(this),
                      jump: this.returnData.bind(this.jumpPage)
                    })
                  // this.props.navigation.navigate("Add_location")
                }
              >
                {this.state.location}
              </Text>
            </View>
          </View>
          <View style={styles_add.listDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
              style={styles_add.listIcon}
            />
            <TouchableOpacity onPress={this._showDatePicker}>
              <View style={styles_add.listDiv_data}>
                <Text style={styles_add.listDiv_dataTxt}>
                  {this.state.listDate}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles_add.listDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-time" : "md-time"}
              style={styles_add.listIcon}
            />
            <TouchableOpacity onPress={this._showTimePicker}>
              <View style={styles_add.listDiv_data}>
                <Text style={styles_add.listDiv_dataTxt}>
                  {this.state.listTime}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Button
            title="新增"
            textStyle={{
              fontWeight: "400",
              letterSpacing: 2,
              color: "#0b83c4"
            }}
            buttonStyle={{
              backgroundColor: "#f7f7f7",
              height: 50
            }}
            containerViewStyle={{
              width: "100%"
            }}
            containerStyle={{
              marginTop: 20,
              letterSpacing: 2
            }}
            fontSize={20}
            onPress={this.InsertDataToServer}
          />
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
        {/* <Button
          buttonStyle={styles_add.addBtn}
          textStyle={styles_add.addBtnTxt}
          title="儲存"
          onPress={this.InsertDataToServer}
        /> */}
        {/* <Button
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
            bottom: 270,
            right: 0
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={this.InsertDataToServer}
        /> */}
      </ScrollView>
    );
  }
}
