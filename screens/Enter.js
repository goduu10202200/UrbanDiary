import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import { Button } from 'react-native-elements';
import { AppLoading, Asset, Font, Icon, WebBrowser, Linking } from 'expo';
import styles_enter from "./style/style_enter";
import styles_layout from "./style/style_layout";
import Login from './Login';
import Signup from './Signup';

export default class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0)
    };
}
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 100,
        duration: 900,
      }
    ).start();
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/enter.png")}
        //source={require("../assets/images/enter.gif")}
        style={[styles_enter.welcomeContainer]}>
        <Image
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/images/enter.gif")}
        />
        {/* <View
          style={{
            position: "absolute",
            width: "94%",
            height: "60%",
            backgroundColor: "rgba(255,255,255,0.2)",
            top: "24%",
            borderRadius: 10,
          }}
        /> */}
        <View style={styles_enter.welcomeLogoDiv}>
          <Animated.View
            style={[styles_enter.welcomeLogo,{transform: [{translateY: this.state.animatedValue}]}]}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/enterLogoImg.png')
                  : require('../assets/images/enterLogoImg.png')
              }
              style={styles_enter.welcomeLogoImg}
            />
            <Image 
              source={require("../assets/images/enterLogoText.png")}
              style={styles_enter.welcomeLogoText}
            />
              
          </Animated.View>
        </View>
        {/* <View>
          <Text style={styles_enter.welcomeText}>
            你的未來，你來記錄
          </Text>
        </View> */}
        <View style={styles_enter.welcomeDiv}>
          <Button
            title='登 入'
            buttonStyle={styles_enter.welcomeBtn}
            color='#fff'
            onPress={() =>
              this.props.navigation.navigate('Login')
            }
          />
          <Button
            title='註 冊'
            buttonStyle={styles_enter.welcomeBtn}
            color='#fff'
            onPress={() =>
              this.props.navigation.navigate('Signup')
            }
          />
        </View>
      </ImageBackground>
    );
  }
}
