import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Image,
} from 'react-native';
import "@expo/vector-icons";
import { Button, Icon, SocialIcon } from 'react-native-elements';
import styles from "./style/style_login";
import { MapView } from 'expo';


export default class Signup extends React.Component {
  static navigationOptions = {
    title: '註冊',
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
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled' 
        style={styles.container}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0%',
          }}
        >
          <Text style={styles.pagetitle}>
            你的日記，從註冊開始
        </Text>
        </View>
        {/* <Text>
          這邊有上傳圖片
        </Text> */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
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
            placeholder="請輸入帳號"
            placeholderTextColor="#a3a6a7"
            onChangeText={(text) => this.setState({ input: text })}
          />
        </View>
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入密碼"
            secureTextEntry={true}
            placeholderTextColor="#c2c2c4"

            onChangeText={(text) => this.setState({ input: text })}
          />
        </View>
        <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="確認密碼"
            secureTextEntry={true}
            placeholderTextColor="#c2c2c4"

            onChangeText={(text) => this.setState({ input: text })}
          />
        </View>
        {/* <View style={styles.View_TextInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="請輸入信箱：XXX@gmail.com"
            placeholderTextColor="#a3a6a7"
            onChangeText={(text) => this.setState({ input: text })}
          />
        </View> */}

        {/* <View
          style={{
            //height: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        > */}
          <Button
            icon={{
              // name: 'arrow-right',
              // size: 15,
              // color: 'white'
            }}
            title='註冊'
            textStyle={styles.textStyle}
            backgroundColor="#f3f7fa"
            buttonStyle={styles.someButtonStyle}
            containerViewStyle={{ marginTop: 10 }}
            onPress={() =>
              this.props.navigation.navigate('Main')
            }
          />

         {/* </View> */}
      </ScrollView>
    );
  }
}


