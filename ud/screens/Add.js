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

import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button, ListItem } from "../node_modules/react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Import file
import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      text={this.state.location}
      placeholder="地點"
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
        this.setState({ location: data["description"] });
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyCa6NbQaDltVUE8Cdu0k0vj_O5nK78oGhw",
        language: "zh-TW", // language of the results
        types: "" // default: 'geocode'
      }}
      styles={
        ({
          textInputContainer: {
            width: "100%"
          },
          description: {
            fontWeight: "bold"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        },
        styles_add.addInput)
      }
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
      renderLeftButton={() => (
        // <Image source={require("path/custom/left-icon")} />
        <Image />
      )}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
    />
  );
};

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
        //self.GooglePlacesRef.clearInput();
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
          {/* <TextInput
            style={styles_add.addInput}
            multiline={true}
            placeholder="地點"
            ref={el => {
              this.location = el;
            }}
            onChangeText={text => this.setState({ location: text })}
            value={this.state.location}
          /> */}
          <GooglePlacesAutocomplete
            text={this.state.location}
            placeholder="地點"
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
              this.setState({ location: data["description"] });
            }}
            getDefaultValue={() => ""}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyCa6NbQaDltVUE8Cdu0k0vj_O5nK78oGhw",
              language: "zh-TW", // language of the results
              types: "" // default: 'geocode'
            }}
            styles={
              ({
                textInputContainer: {
                  width: "100%"
                },
                description: {
                  fontWeight: "bold"
                },
                predefinedPlacesDescription: {
                  color: "#1faadb"
                }
              },
              styles_add.addInput)
            }
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
            renderLeftButton={() => (
              // <Image source={require("path/custom/left-icon")} />
              <Image />
            )}
            // renderRightButton={() => <Text>Custom text after the input</Text>}
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
