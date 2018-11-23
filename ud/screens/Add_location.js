import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { View } from "../node_modules/react-native-animatable"
import { Button } from "../node_modules/react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// Import style files
import styles_add from "./style/style_add";
import styles_layout from "./style/style_layout";

export default class Add_location extends React.Component {
  static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state
    return {
      title: '地點',
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.state.params.returnData(params.location, params.latitude, params.longitude);
            navigation.goBack();
          }}
        >
          <Text style={styles_layout.titleSubmit}>確定</Text>
        </TouchableOpacity>
      )
    }
  };

  //確定地點

  render() {
    return (
      <ScrollView style={styles_add.container}>
        <View style={styles_add.locationInput}>
          <GooglePlacesAutocomplete
            text={this.props.navigation.state.params.location}
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
              this.props.navigation.setParams({ location: data["description"], latitude: details.geometry.location.lat, longitude: details.geometry.location.lng });
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
                height: 60,
              },
              textInput: {
                height: 42,
                fontSize: 16,
              }
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
              <Image />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}
