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
import { Button, ListItem, List } from "../node_modules/react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import location from "./Add_location";

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

// const GooglePlacesInput = () => {
//   return (
//     <GooglePlacesAutocomplete
//       text={this.state.location}
//       placeholder="地點"
//       minLength={2} // minimum length of text to search
//       autoFocus={false}
//       returnKeyType={"done"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//       listViewDisplayed="false" // true/false/undefined
//       fetchDetails={true}
//       renderDescription={row => row.description} // custom description render
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//         console.log(data["description"]);
//         this.setState({ location: data["description"] });
//       }}
//       getDefaultValue={() => ""}
//       query={{
//         // available options: https://developers.google.com/places/web-service/autocomplete
//         key: "AIzaSyCa6NbQaDltVUE8Cdu0k0vj_O5nK78oGhw",
//         language: "zh-TW", // language of the results
//         types: "" // default: 'geocode'
//       }}
//       styles={
//         ({
//           textInputContainer: {
//             width: "100%"
//           },
//           description: {
//             fontWeight: "bold"
//           },
//           predefinedPlacesDescription: {
//             color: "#1faadb"
//           }
//         },
//           styles_add.addInput)
//       }
//       currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
//       currentLocationLabel="Current location"
//       nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//       GoogleReverseGeocodingQuery={
//         {
//           // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//         }
//       }
//       GooglePlacesSearchQuery={{
//         // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//         rankby: "distance",
//         types: "food"
//       }}
//       filterReverseGeocodingByTypes={[
//         "locality",
//         "administrative_area_level_3"
//       ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//       //predefinedPlaces={[homePlace, workPlace]}
//       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//       renderLeftButton={() => (
//         // <Image source={require("path/custom/left-icon")} />
//         <Image />
//       )}
//     // renderRightButton={() => <Text>Custom text after the input</Text>}
//     />
//   );
// };

export default class Member extends React.Component {
  static navigationOptions = {
    title: "新增待辦事項",
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

    // 日期格式化
    Date.prototype.Format = function (fmt) {
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
      location: "地點",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      listDate: new Date().Format("yyyy-MM-dd"),
      listTime: new Date().Format("hh:mm"),
      url_api: "http://172.20.10.2/urbandiary/ud_api/"
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
      url: this.state.url_api + "scheduled_api.php",
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
      .then(function (response) {
        self.setState({ title: "" });
        self.setState({ location: "" });
        //self.GooglePlacesRef.clearInput();
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
        {/* <View style={styles_add.header}>
          <Text style={styles_add.headerTxt}>新增待辦事項</Text>
        </View> */}
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
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                itemCount={list_type.length}
                data={list_type}
                onChangeText={data => this.setState({ type: data })}
                fontSize={16}
                value={"請選擇"}
              />
            </View>
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
          <View style={styles_add.listDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
              style={styles_add.listIcon}
            />
            <View style={styles_add.listDiv_data}>
              <Text
                style={styles_add.listDiv_dataTxt}
                onPress={() => this.props.navigation.navigate('Add_location')}
              >
                {this.state.location}
              </Text>
            </View>
            {/* <GooglePlacesAutocomplete
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
                    width: "100%",
                    backgroundColor: "#fff",
                  },
                  description: {
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                    backgroundColor: "#fff",
                  },
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
            /> */}
          </View>
          <View style={styles_add.listDiv}>
            <Icon
              name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
              style={styles_add.listIcon}
            />
            <TouchableOpacity onPress={this._showDatePicker}>
              <View style={styles_add.listDiv_data}>
                <Text style={styles_add.listDiv_dataTxt}>{this.state.listDate}</Text>
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
                <Text style={styles_add.listDiv_dataTxt}>{this.state.listTime}</Text>
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
              height: 50,
            }}
            containerViewStyle={{
              width: "100%",
            }}
            containerStyle={{
              marginTop: 20,
              letterSpacing: 2,
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
      </ScrollView >
    );
  }
}
