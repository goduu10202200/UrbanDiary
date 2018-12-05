import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import "@expo/vector-icons";
// import { MapView } from "expo";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

import styles_layout from "./style/style_layout";
import flagPinkImg from "../assets/images/leaf.png";

import ServiceApiNet from "./ServiceApiNet";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 25.021359;
const LONGITUDE = 121.534433;
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
      url: ServiceApiNet.getURL() + "mongo_viewMap_api.php",
      method: "post"
    })
      .then(responseJson => {
        self.setState({
          markers: responseJson.data
        });
      })
      .catch(error => {
        console.log(error);
        // console.error(error);
      });
  }

  render() {
    this.marker();
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
        >
          {this.state.markers === "No data" ? null : this.state.markers.map(marker => (
            <Marker
              image={flagPinkImg}
              key={marker.id}
              coordinate={marker.coordinates}
              description={marker.title}
              onPress={() => {
                this.props.navigation.navigate("Diary_old", {
                  id: marker.id,
                  date: marker.date
                });
              }}
            />
          ))}
        </MapView>
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
    ...StyleSheet.absoluteFillObject
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

// export default withNavigationFocus(MapDiary);
