import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Image
} from "react-native";
import "@expo/vector-icons";
import { Button, Icon, SocialIcon } from "react-native-elements";
import styles from "./style/style_login";
import styles_layout from "./style/style_layout";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "登入",
    headerStyle: {
      height: 50,
    },
    headerTitleStyle: {
      fontSize: 20,
      letterSpacing: 2,
      color: '#333',
    },
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles.container}
      >
        {/*<View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0%',
          }}
        >
          <Text style={styles.pagetitle}>
            登入
        </Text>
        </View>
        */}
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入帳號"
            //placeholderTextColor="#a3a6a7"
            // onChangeText={text => this.setState({ input: text })}
          />
        </View>
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入密碼"
            secureTextEntry={true}
           // placeholderTextColor="#c2c2c4"
            // onChangeText={text => this.setState({ input: text })}
          />
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        > */}
          <Button
            icon={
              {
                // name: 'arrow-right',
                // size: 15,
                // color: 'white'
              }
            }
            title="登入"
            textStyle={styles.textStyle}
            // backgroundColor="#f3f7fa"
            buttonStyle={styles.someButtonStyle}
            // containerViewStyle={{ marginTop: 50 }}
            onPress={() => this.props.navigation.navigate("Main")}
          />
        {/* </View> */}
        <Text
          style={{
            color: "#e4e4e4",
            textAlign: "center",
            marginTop: 70
          }}
        >
          ──────────── 或 ────────────
        </Text>
        // Icon
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25
          }}
        >
          <SocialIcon
            button
            title="使用 Facebook 登入"
            style={{ width: "80%" }}
            type="facebook"
            onPress={() => this.props.navigation.navigate("Main")}
          />
        </View>
        <View
          style={{
            marginTop: 140
          }}
        />
      </ScrollView>
    );
  }
}
