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
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: '地點',
    // headerRight: (
    //   <TouchableOpacity
    //     onPress={() => {
    //       //navigation.state.params.returnData("123", "Name ");
    //       navigation.state.params.returnData(constructor.this.state.location);
    //       navigation.goBack();
    //     }}
    //   >
    //     <Text style={styles_layout.titleSubmit}>確定</Text>
    //   </TouchableOpacity>
    // )
  });


  //確定地點

  render() {
    return (
      <ScrollView style={styles_add.container}>
        {/* <TouchableOpacity
          style={{ marginBottom: 30 }}
          onPress={() => {
            this.props.navigation.state.params.returnData(this.state.location);
            this.props.navigation.goBack();
          }}
        >
          <Text>submit</Text>
        </TouchableOpacity> */}

        {/* <Icon
          name={Platform.OS === "ios" ? "ios-pin" : "md-pin"}
          style={styles_add.listIcon}
        /> */}
        <View style={styles_add.locationInput}>
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
                width: "80%",
                padding: 2,
                height: 60,
                backgroundColor: "#ddd"
              },
              description: {
                // fontWeight: "bold",
                backgroundColor: "#fff",
                fontSize: 14,
                height: 50
              },
              textInput: {
                height: 40,
                color: "#5d5d5d",
                fontSize: 16
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
              // <Image source={require("path/custom/left-icon")} />
              <Image />
            )}
          // renderRightButton={() => <Text>Custom text after the input</Text>}
          />
          <Button
            title="✓"
            textStyle={{
              fontWeight: "700",
              fontSize: 20,
            }}
            buttonStyle={{
              backgroundColor: '#316191',
              width: "15%",
              height: 65,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 3,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => {
              this.props.navigation.state.params.returnData(this.state.location);
              this.props.navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
