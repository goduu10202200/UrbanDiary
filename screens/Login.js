import React from "react";
import { ScrollView, Text, View, Alert, TextInput, Image, ImageBackground } from "react-native";
import "@expo/vector-icons";
import { Button, Icon, SocialIcon } from "react-native-elements";
import styles from "./style/style_login";
import styles_layout from "./style/style_layout";
import axios from "axios";
import ServiceApiNet from "./ServiceApiNet";
export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      account: " ",
      password: " "
    };
  }

  SendDataAJAX = () => {
    login = () => {
      this.props.navigation.navigate("Main");
    };
    var account = this.state.account;
    var password = this.state.password;

    axios({
      url: ServiceApiNet.getURL() + "mongo_login.php",
      method: "post",
      data: {
        account: account,
        password: password
      }
    })
      .then(function(response) {
        if (response.data == "successfully") {
          this.login();
        } else if (response.data == "0 results") {
          Alert.alert("登入驗證", "帳號密碼錯誤", [{ text: "確認" }]);
        }
        //console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView                keyboardShouldPersistTaps="handled"
      >
      <ImageBackground
        //contentContainerStyle={{ flexGrow: 1 }}
        style={styles.container}
        source={require("../assets/images/enter1.png")}
      >
      {/* <Image
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/images/enter.gif")}
        /> */}
      <Text
        style={{
          marginTop: "25%",
          color: "#FFFFFF",
          fontSize: 35,
          fontFamily: "Georgia",
          fontWeight: "bold",
          alignSelf: "center",

        }}
      >
          L O G I N
        </Text>
      <View
        style={{marginTop: "10%"}}
      >
          <View style={styles.View_TextInput}>
            <TextInput
              style={styles.TextInput}
              placeholder="請輸入帳號"
              placeholderTextColor="#FFF" 
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
              placeholderTextColor="#FFF" 
              secureTextEntry={true}
              ref={el => {
                this.password = el;
              }}
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          <Button
            title="登入"
            textStyle={styles.textStyle}
            buttonStyle={styles.someButtonStyle}
            onPress={this.SendDataAJAX}
          />
          <Text
            style={{
              color: "#e4e4e4",
              textAlign: "center",
              marginTop: 100,
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
              style={{ width: "80%", borderRadius: 5, shadowOpacity: 0,}}
              type="facebook"
              onPress={() => this.props.navigation.navigate("Main")}
            />
          </View>
          <View
            style={{
              marginTop: 140
            }}
          />
        </View>
      </ImageBackground>
      </ScrollView>
    );
  }
}
