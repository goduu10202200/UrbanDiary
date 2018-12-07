import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo';
import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";
import { TabView, TabBar, SceneMap } from "react-native-tab-view"; // 0.0.67
import list from "./Member_list";
import data from "./Member_data";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class Member extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image source={require('../assets/images/LogoFont_w.png')} style={styles_layout.titleLogo} />
    ),
    headerStyle: styles_layout.titleDiv,
  };

  state = {
    index: 0,
    routes: [
      { key: "list", title: "今日待辦事項" },
      { key: "data", title: "個人資料" },
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    list: list,
    data: data,
  });

  render() {
    return (
      <View style={styles_member.container}>
        <View style={styles_member.userDiv}>
          <Image
            source={
              require('../assets/images/ray_bg.png')
            }
            // resizeMode={"contain"}
            style={{ width: "100%" }}
          />
          {/* Adjust the tint and intensity */}
          <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill}>
            <Image
              source={
                require('../assets/images/ray.png')
              }
              style={styles_member.userLogo}
            />
          </BlurView>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}
