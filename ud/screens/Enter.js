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

  /*constructor(props: any) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }*/

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
      /*
      <Animated.View                         // 可选的基本组件类型: Image, Text, View}
        style={{
          flex: 1,
          transform: [                        // `transform`是一个有序数组（动画按顺序执行）
            {scale: this.state.bounceValue},  // 将`bounceValue`赋值给 `scale`
          ]
        }}
      >
              <View style={styles.welcomeLogoDiv}>
                  <Image
                  source={
                      __DEV__
                      ? require('../assets/images/LogoFont_b.png')
                      : require('../assets/images/LogoFont_b.png')
                  }
                  style={styles.welcomeLogo}
                  />
              </View>
              <View>
                  <Text style={styles.welcomeText}>
                    你的日記，你來記錄
                  </Text>
              </View>
              <View style={styles.welcomeDiv}>
                  <Button
                    title="登 入"
                    buttonStyle={styles.welcomeBtn}
                    onPress={() =>
                      this.props.navigation.navigate('Login')
                    } 
                  />
                  <Button
                    title="註 冊"
                    buttonStyle={styles.welcomeBtn}
                    onPress={() =>
                      this.props.navigation.navigate('Sginup')
                    } 
                  />
              </View>
      </Animated.View>*/
    );
  }

  /*
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
    Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
      this.state.bounceValue,                 // 将`bounceValue`值动画化
      {
        toValue: 0.8,                         // 将其值以动画的形式改到一个较小值
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // 开始执行动画
  }*/

}
