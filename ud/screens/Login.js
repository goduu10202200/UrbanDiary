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
import axios from "axios";
export default class Login extends React.Component {
  static navigationOptions = {
    title: "登入",
    headerStyle: {
      height: 50
    },
    headerTitleStyle: {
      fontSize: 20,
      letterSpacing: 2,
      color: "#333"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      account: " ",
      password: " "
    };
  }

  SendDataAJAX = () => {
    var account = this.state.account;
    var password = this.state.password;

    axios({
      url: "http://172.20.10.2:8181/urbandiary/ud_backend/login_backend.php",
      method: "post",
      data: {
        account: account,
        password: password
      }
    })
      .then(function(response) {
        //this.props.navigation.navigate("Main");
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
            ref={el => {
              this.account = el;
            }}
            onChangeText={text => this.setState({ account: text })}
          />
        </View>
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入密碼"
            secureTextEntry={true}
            ref={el => {
              this.password = el;
            }}
            onChangeText={text => this.setState({ password: text })}
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
          onPress={this.SendDataAJAX}
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
