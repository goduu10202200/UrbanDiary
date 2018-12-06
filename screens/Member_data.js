import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";

export default class Member_data extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image source={require('../assets/images/LogoFont_w.png')} style={styles_layout.titleLogo} />
    ),
    headerStyle: styles_layout.titleDiv,
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles_member.container_bottom}>
        <View style={styles_member.dataDiv}>
          <Text style={styles_member.dataDiv_txt}>姓名：</Text>
          <TextInput style={styles_member.dataDiv_input}>小茂</TextInput>
        </View>
        <View style={styles_member.dataDiv}>
          <Text style={styles_member.dataDiv_txt}>信箱：</Text>
          <TextInput style={styles_member.dataDiv_input}>123@happy.com</TextInput>
        </View>
      </ScrollView>
    );
  }
}
