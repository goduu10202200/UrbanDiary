import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view"; // 0.0.67
import year from "./History_year";
import month from "./History_month";
import day from "./History_day";
import styles_layout from "./style/style_layout";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};
export default class History extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image source={require('../assets/images/LogoFont_w.png')} style={styles_layout.titleLogo}/>
    ),
    headerStyle: styles_layout.titleDiv,
  };

  state = {
    index: 0,
    routes: [
      { key: "year", title: "年" },
      { key: "day", title: "日" },
      { key: "month", title: "月" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    day: day,
    year: year,
    month: month
  });


  render() {
    return (
      <View style={styles.container}>
      <View
        style={{
          flex: 1,
          // paddingTop: Constants.statusBarHeight,
          backgroundColor: "#1982f3"
        }}
      >
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfe2ee"
  }
});

