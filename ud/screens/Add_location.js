import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Ionicons";

import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";

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
      styles={{
        textInputContainer: {
          width: "100%",
        },
        description: {
          fontWeight: "bold"
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 40,
          color: '#5d5d5d',
          fontSize: 26
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
      renderLeftButton={() => (
        // <Image source={require("path/custom/left-icon")} />
        <Image />
      )}
    // renderRightButton={() => <Text>Custom text after the input</Text>}
    />
  );
};


export default class Member extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "地點",
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          this.props.navigation.setParams({ location: this.location })
        }}
      >
        <Text style={styles_layout.titleSubmit}>確定</Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      location: ""
    }
  };


  //確定地點

  render() {
    return (
      <ScrollView style={styles_add.container} >
        {/* <Icon
          name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
          style={styles_add.listIcon}
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
          styles={{
            textInputContainer: {
              width: "100%",
              padding: 2,
              height: 60,
              backgroundColor: "#ddd",
            },
            description: {
              // fontWeight: "bold",
              backgroundColor: "#fff",
              fontSize: 14,
              height: 50,
            },
            textInput: {
              height: 40,
              color: '#5d5d5d',
              fontSize: 16
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
          renderLeftButton={() => (
            // <Image source={require("path/custom/left-icon")} />
            <Image />
          )}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
        />
      </ScrollView>
    )
  }
}
