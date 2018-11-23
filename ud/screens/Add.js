import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import axios from "axios";
import FontIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, ListItem, List } from "../node_modules/react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import ServiceApiNet from "./ServiceApiNet";
// Import file
import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";
import moment from "moment";


export default class Add extends React.Component {
  //地點回傳資料
  returnData(location, latitude, longitude) {
    var self = this;
    self.setState({
      location: location,
      latitude: latitude,
      longitude: longitude
    });
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: "新增待辦事項 ",
      headerStyle: styles_layout.titleDiv,
      headerTitleStyle: styles_layout.titleTxt,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            params.speechOpenClose()
          }}>
          <FontIcon
            name={"microphone"}
            style={styles_layout.titleIcon}
          />
        </TouchableOpacity >
      )
    }
  }

  //設定全域變數開啟speechDialog 
  componentDidMount() {
    this.props.navigation.setParams({ speechOpenClose: this._speechOpenClose });
  }
  _speechOpenClose = () => {
    this.speechDialog.show();
  };


  constructor(props) {
    super(props);

    this.state = {
      title: "",
      type: " ",
      location: "地點",
      latitude: "",
      longitude: "",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      listDate: moment(new Date()).format("YYYY-MM-DD"),
      listTime: moment(new Date()).format("HH:mm"),
      id: "",
      name: "",
      isHidden: false,

      //speech_Dialog data
      speechInput_type: "",
      speechInput_title: "",
      speechInput_date: moment(new Date()).format("YYYY-MM-DD"),
      speechInput_time: moment(new Date()).format("HH:mm"),
      speechInput_location: "",
      speechInput_latitude: "",
      speechInput_longitude: "",
      speech_type: true,
      speech_title: false,
      speech_date: false,
      speech_time: false,
      speech_location: false,

      // speech_hidden: false,
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
    this.setState({
      listDate: strDate,
      speechInput_date: strDate
    });
    this._hideDateTimePicker();
  };
  _handleTimePicked = date => {
    var strTime = moment(date).format("HH:mm");
    this.setState({
      listTime: strTime,
      speechInput_time: strTime
    });
    this._hideDateTimePicker();
  };

  speech_transform = () => {
    var self = this;
    var date = self.state.speechInput_date.toString();
    var time = self.state.speechInput_time.toString();

    if (date !== "") {
      date = date.replace("年", "-");
      date = date.replace("月", "-");
      date = date.replace("日", "");
      date = date.replace("號", "");
    }

    if (time !== "") {
      time = time.replace("點", ":");
      time = time.replace("分", "");
    }

    this.setState({
      speechInput_date: date,
      speechInput_time: time
    }, function () {
      this.InsertDataToServer_speech();
    });
  }


  InsertDataToServer = () => {
    var self = this;
    var title = this.state.title;
    var type = this.state.type;
    var location = this.state.location;
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var date = this.state.listDate;
    var time = this.state.listTime;

    axios({
      url: ServiceApiNet.getURL() + "mongo_scheduled.php",
      method: "post",
      data: {
        title: title,
        type: type,
        location: location,
        latitude: latitude,
        longitude: longitude,
        date: date,
        time: time
      }
    })
      .then(function (response) {
        self.setState({
          title: "",
          location: "地點",
          latitude: "",
          longitude: "",
          listDate: moment(new Date()).format("YYYY-MM-DD"),
          listTime: moment(new Date()).format("HH:mm"),
        });
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

  InsertDataToServer_speech = () => {
    var self = this;
    var title = this.state.speechInput_title;
    var type = this.state.speechInput_type;
    var location = this.state.speechInput_location;
    var latitude = this.state.speechInput_latitude;
    var longitude = this.state.speechInput_longitude;

    var date = this.state.speechInput_date;
    var time = this.state.speechInput_time;

    axios({
      url: ServiceApiNet.getURL() + "scheduled_api.php",
      method: "post",
      data: {
        title: title,
        type: type,
        location: location,
        latitude: latitude,
        longitude: longitude,
        date: date,
        time: time
      }
    })
      .then(function (response) {
        self.setState({
          speechInput_type: "",
          speechInput_title: "",
          speechInput_location: "",
          speechInput_latitude: "",
          speechInput_longitude: "",
          speechInput_date: moment(new Date()).format("YYYY-MM-DD"),
          speechInput_time: moment(new Date()).format("HH:mm"),
        });
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
        {/* 語音輸入  */}
        < PopupDialog
          ref={popupDialog => {
            this.speechDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="語音輸入" />}
          dialogStyle={styles_add.dialog}
        >
          {this.state.speech_type &&
            <View style={styles_add.dialog_content} >
              <Text style={styles_add.dialog_txt}>請選擇類型</Text>
              <Dropdown
                label=""
                labelFontSize={0}
                dropdownOffset={{ top: 20, left: 0 }}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                itemCount={list_type.length}
                data={list_type}
                onChangeText={data => this.setState({ speechInput_type: data })}
                fontSize={16}
                value={"請選擇"}
                containerStyle={styles_add.dialog_dropCon}
              // overlayStyle={styles_add.dialog_dropOver}
              />
              <View style={styles_add.dialog_btnDiv}>
                <Button
                  title="下一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnNext}
                  onPress={() => {
                    this.setState({
                      speech_type: false,
                      speech_title: true
                    });
                  }}
                />
              </View>
            </View>
          }

          {this.state.speech_title &&
            <View style={styles_add.dialog_content} >
              <Text style={styles_add.dialog_txt}>請輸入待辦事項</Text>
              <TextInput
                style={styles_add.dialog_input}
                placeholder="待辦事項"
                placeholderTextColor="#a3a6a7"
                ref={el => {
                  this.speechInput_title = el;
                }}
                onChangeText={speechInput_title => this.setState({ speechInput_title })}
                value={this.state.speechInput_title}
                autoFocus={true}
              // multiline={true}
              />
              <View style={styles_add.dialog_btnDiv}>
                <Button
                  title="上一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnPre}
                  onPress={() => {
                    this.setState({
                      speech_title: false,
                      speech_type: true
                    })
                  }}
                />
                <Button
                  title="下一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnNext}
                  onPress={() => {
                    this.setState({
                      speech_title: false,
                      speech_date: true
                    })
                  }}
                />
              </View>
            </View>
          }

          {this.state.speech_date &&
            <View style={styles_add.dialog_content} >
              <Text style={styles_add.dialog_txt}>請輸入日期</Text>
              {/* <TextInput
                style={styles_add.dialog_input}
                placeholder="日期"
                placeholderTextColor="#a3a6a7"
                ref={el => {
                  this.speechInput_date = el;
                }}
                onChangeText={speechInput_date => this.setState({ speechInput_date })}
                value={this.state.speechInput_date}
              // multiline={true}
              /> */}
              <TouchableOpacity onPress={this._showDatePicker}>
                <View style={styles_add.dialog_data}>
                  <Text style={styles_add.dialog_dataTxt}>
                    {this.state.speechInput_date}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles_add.dialog_btnDiv}>
                <Button
                  title="上一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnPre}
                  onPress={() => {
                    this.setState({
                      speech_date: false,
                      speech_title: true
                    })
                  }}
                />
                <Button
                  title="下一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnNext}
                  onPress={() => {
                    this.setState({
                      speech_date: false,
                      speech_time: true
                    })
                  }}
                />
              </View>
            </View>
          }

          {this.state.speech_time &&
            <View style={styles_add.dialog_content} >
              <Text style={styles_add.dialog_txt}>請輸入時間</Text>
              {/* <TextInput
                style={styles_add.dialog_input}
                placeholder="時間"
                placeholderTextColor="#a3a6a7"
                ref={el => {
                  this.speechInput_time = el;
                }}
                onChangeText={speechInput_time => this.setState({ speechInput_time })}
                value={this.state.speechInput_time}
              // multiline={true}
            /> */}
              <TouchableOpacity onPress={this._showTimePicker}>
                <View style={styles_add.dialog_data}>
                  <Text style={styles_add.dialog_dataTxt}>
                    {this.state.speechInput_time}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles_add.dialog_btnDiv}>
                <Button
                  title="上一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnPre}
                  onPress={() => {
                    this.setState({
                      speech_time: false,
                      speech_date: true
                    })
                  }}
                />
                <Button
                  title="下一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnNext}
                  onPress={() => {
                    this.setState({
                      speech_time: false,
                      speech_location: true
                    })
                  }}
                />
              </View>
            </View>
          }

          {this.state.speech_location &&
            <View style={styles_add.dialog_content}>
              <Text style={styles_add.dialog_txt}>請輸入地點</Text>
              <GooglePlacesAutocomplete
                text={this.state.speechInput_location}
                placeholder="搜尋地點"
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={"done"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed="false" // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                  console.log(data["description"]);
                  console.log(details.geometry.location.lat, details.geometry.location.lng); // selected coordinates
                  this.setState({
                    speechInput_location: data["description"],
                    speechInput_latitude: details.geometry.location.lat,
                    speechInput_longitude: details.geometry.location.lng
                  });
                }}
                getDefaultValue={() => ""}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: "AIzaSyCa6NbQaDltVUE8Cdu0k0vj_O5nK78oGhw",
                  language: "zh-TW", // language of the results
                  types: "" // default: 'geocode'
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    borderWidth: 0.8,
                    borderColor: "#ddd",
                    marginTop: 10,
                    marginBottom: 25,
                  },
                  listView: {
                    position: 'absolute',
                    top: 50,
                    backgroundColor: "#fff",
                    borderWidth: 0.8,
                    borderColor: "#ddd",
                    maxHeight: 100,
                    zIndex: 1,
                  },
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={
                  {
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                  }
                }
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: "distance",
                  types: "food"
                }}
                filterReverseGeocodingByTypes={[
                  "locality",
                  "administrative_area_level_3"
                ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                //predefinedPlaces={[homePlace, workPlace]}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              // renderLeftButton={() => (
              //   <Image />
              // )}
              />
              <View style={styles_add.dialog_btnDiv}>
                <Button
                  title="上一步"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnPre}
                  onPress={() => {
                    this.setState({
                      speech_location: false,
                      speech_time: true
                    })
                  }}
                />
                <Button
                  title="送出"
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles_add.dialog_btnNext}
                  onPress={() => {
                    this.speechDialog.dismiss();
                    this.setState({
                      speech_type: true,
                      speech_title: false,
                      speech_date: false,
                      speech_time: false,
                      speech_location: false,
                    })
                    this.speech_transform();
                  }}
                />
              </View>
            </View>
          }
        </PopupDialog>


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
                onPress={() =>
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

      </ScrollView >
    );
  }
}
