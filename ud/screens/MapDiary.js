import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { MapView } from "expo";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles_layout from "./style/style_layout";

const { width, height } = Dimensions.get("window");

export default class MapDiary extends React.Component {
  static navigationOptions = {
    title: "城市日記",
    headerStyle: styles_layout.titleDiv,
    headerTitleStyle: styles_layout.titleTxt
  };

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 25.0213393,
        longitude: 121.532246,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        accuracy: ""
      }
    };
  }
  calDelta(lat, long, accuracy) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    this.setState({
      region: {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
        //accuracy: accuracy
      }
    });
  }

  componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        this.calDelta(lat, long, accuracy);
      },

      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  marker() {
    return {
      markers: [
        {
          key: 1,
          title: "hello",
          coordinates: {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          }
        },
        {
          key: 2,
          title: "hello",
          coordinates: {
            latitude: this.state.region.latitude + 0.001,
            longitude: this.state.region.longitude + 0.0001
          }
        },
        {
          key: 3,
          title: "hello",
          coordinates: {
            latitude: this.state.region.latitude - 0.0009,
            longitude: this.state.region.longitude - 0.0001
          }
        },
        {
          key: 4,
          title: "hello",
          coordinates: {
            latitude: this.state.region.latitude + 0.0001,
            longitude: this.state.region.longitude - 0.0009
          }
        },
        {
          key: 5,
          title: "hello",
          coordinates: {
            // latitude: 25.0213393 + 0.0001,
            // longitude: 121.532246
            latitude: 25.0214393,
            longitude: 121.532246
          }
        }
      ]
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          customMapStyle={mapStyle}
        >
          {this.marker().markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinates}
              description="Urban Diary !"
            >
              <Icon name={"message-text"} color="#edb900" size={50} />
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
var mapStyle = [
  {
    featureType: "water",
    stylers: [
      {
        color: "#19a0d8"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff"
      },
      {
        weight: 6
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#e85113"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#efe9e4"
      },
      {
        lightness: -40
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#efe9e4"
      },
      {
        lightness: -20
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        lightness: 100
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: -100
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon"
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape",
    stylers: [
      {
        lightness: 20
      },
      {
        color: "#efe9e4"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        lightness: 100
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: -100
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        hue: "#11ff00"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        lightness: 100
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        hue: "#4cff00"
      },
      {
        saturation: 58
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#f0e4d3"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#efe9e4"
      },
      {
        lightness: -25
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#efe9e4"
      },
      {
        lightness: -10
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  }
];
