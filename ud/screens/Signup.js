import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Image
} from "react-native";
import axios from "axios";
import "@expo/vector-icons";
import { Button, Icon, SocialIcon } from "react-native-elements";
import styles from "./style/style_login";
import ServiceApiNet from "./ServiceApiNet";
export default class Signup extends React.Component {
  static navigationOptions = {
    title: "註冊",
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
      name: " ",
      account: " ",
      password: " ",
      password_check: " "
    };
  }

  SignupAJAX = () => {
    signup = () => {
      this.props.navigation.navigate("Main");
    };
    var name = this.state.name;
    var account = this.state.account;
    var password = this.state.password;
    var password_check = this.state.password_check;

    if (password == password_check) {
      axios({
        url: ServiceApiNet.getURL() + "signup_api.php",
        method: "post",
        data: {
          name: name,
          account: account,
          password: password,
          password_check: password_check
        }
      })
        .then(function(response) {
          this.signup();
          console.log(response.data);
        })
        .catch(function(error) {
          alert("註冊失敗");
          //console.log(error);
        });
    } else {
      Alert.alert("密碼驗證", "請輸入相同的密碼", [{ text: "確認" }]);
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles.container}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0%"
          }}
        >
          <Text style={styles.pagetitle}>你的日記，從註冊開始</Text>
        </View>
        {/* <Text>
          這邊有上傳圖片
        </Text> */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <SocialIcon
            button
            title="使用 Facebook 註冊"
            style={{ width: "80%" }}
            type="facebook"
            onPress={() => this.props.navigation.navigate("Main")}
          />
        </View>
        <Text
          style={{
            color: "#e4e4e4",
            textAlign: "center",
            lineHeight: 50
          }}
        >
          ──────────── 或 ────────────
        </Text>

        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入姓名"
            placeholderTextColor="#a3a6a7"
            ref={el => {
              this.name = el;
            }}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入E-mail"
            placeholderTextColor="#a3a6a7"
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
            placeholderTextColor="#c2c2c4"
            ref={el => {
              this.password = el;
            }}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="確認密碼"
            secureTextEntry={true}
            placeholderTextColor="#c2c2c4"
            onChangeText={text => this.setState({ input: text })}
            ref={el => {
              this.password_check = el;
            }}
            onChangeText={text => this.setState({ password_check: text })}
          />
        </View>
        <Button
          title="註冊"
          textStyle={styles.textStyle}
          backgroundColor="#f3f7fa"
          buttonStyle={styles.someButtonStyle}
          containerViewStyle={{ marginTop: 10 }}
          onPress={this.SignupAJAX}
        />
      </ScrollView>
    );
  }
}
