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
    headerTitle: (
      <Image
        source={require("../assets/images/LogoFont_w.png")}
        style={styles_layout.titleLogo}
      />
    ),
    headerStyle: styles_layout.titleDiv
  };

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 24.957249398540547,
        longitude: 121.24323277169101,
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
