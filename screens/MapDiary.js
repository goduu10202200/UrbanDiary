import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

import styles_layout from "./style/style_layout";
import flagPinkImg from "../assets/images/leaf.png";

import ServiceApiNet from "./ServiceApiNet";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 24.957386;
const LONGITUDE = 121.2429848;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

export default class MapDiary extends React.Component {
  static navigationOptions = {
    title: "城市日記",
    headerStyle: styles_layout.titleDiv,
    headerTitleStyle: styles_layout.titleTxt
  };

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: []
    };

    this.marker = this.marker.bind(this);
  }

  componentWillMount() {
    this.marker();
  }

  marker() {
    var self = this;
    return axios({
      url: ServiceApiNet.getURL() + "mongo_viewmap_api.php",
      method: "post"
    })
      .then(responseJson => {
        self.setState({
          markers: responseJson.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // this.marker();
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          customMapStyle={mapStyle}
        >
          {this.state.markers === "No data"
            ? null
            : this.state.markers.map(marker => (
                <Marker
                  image={flagPinkImg}
                  key={marker.id["$oid"]}
                  coordinate={marker.coordinates}
                  description={marker.title}
                  onPress={() => {
                    this.props.navigation.navigate("Diary_old", {
                      date: marker.date
                    });
                  }}
                />
              ))}
        </MapView>
        //{" "}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

var mapStyle = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6195a0"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#328CB9"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },

  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e6f3d6"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f4d2c5"
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        color: "#4e4e4e"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f4f4f4"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#787878"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#eaf6f8"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eaf6f8"
      }
    ]
  }
];
