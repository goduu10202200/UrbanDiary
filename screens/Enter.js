import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  //Animated,
} from 'react-native';
import { Button } from 'react-native-elements';
import { AppLoading, Asset, Font, Icon, WebBrowser, Linking } from 'expo';
import styles_enter from "./style/style_enter";
import styles_layout from "./style/style_layout";
import Login from './Login';
import Signup from './Signup';

export default class Enter extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground style={styles_enter.welcomeContainer}>
        <View style={styles_enter.welcomeLogoDiv}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/LogoFont_b.png')
                : require('../assets/images/LogoFont_b.png')
            }
            style={styles_enter.welcomeLogo}
          />
        </View>
        <View>
          <Text style={styles_enter.welcomeText}>
            你的未來，你來記錄
                  </Text>
        </View>
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
