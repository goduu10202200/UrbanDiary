import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/logo.gif"),
        require("./assets/images/LogoFont_w.png"),
        require("./assets/images/LogoFont_b.png"),
        require("./assets/images/user.png"),
        // urban diary's tag
        require("./assets/images/tag_mood.png"),
        require("./assets/images/tag_weather.png"),
        require("./assets/images/tag_love.png"),
        require("./assets/images/tag_homework.png"),
        require("./assets/images/tag_eat.png"),
        require("./assets/images/tag_life.png"),
        require("./assets/images/t1.jpg"),
        require("./assets/images/t2.jpg"),
        require("./assets/images/t3.jpg"),
        require("./assets/images/t4.jpg"),
        require("./assets/images/t5.jpg"),
        require("./assets/images/t6.jpg"),
        require("./assets/images/t7.jpg")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
