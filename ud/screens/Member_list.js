import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  checkedIcon,
  uncheckedIcon,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectMultiple from "react-native-select-multiple";
import { Button, ListItem, CheckBox } from "../node_modules/react-native-elements";
import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";

export default class Member extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        source={require("../assets/images/LogoFont_w.png")}
        style={styles_layout.titleLogo}
      />
    ),
    headerStyle: styles_layout.titleDiv
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: ""
    }
  }

  //onload
  componentDidMount() {
    this.ViewCheckAJAX();
  }

  //顯示list
  ViewCheckAJAX() {
    return fetch('http://172.20.10.2/urbandiary/ud_api/viewList_api.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  //修改手機上圖案勾選狀態
  list_check(status) {
    if (status == 1) {
      return "checkbox-marked";
    }
    else {
      return "checkbox-blank-outline";
    }
  }

  //修改資料庫勾選狀態
  ListCheckAJAX(id, status) {
    var self = this;
    if (status == 0) {
      status = 1;
    }
    else {
      status = 0;
    }

    axios({
      url: "http://172.20.10.2/urbandiary/ud_api/CheckList.php",
      // url: "http://172.20.10.2:8181/urbandiary/ud_api/signup_api.php",
      method: "post",
      data: {
        id: id,
        status: status
      }
    })
      .then(function (response) {
        console.log(response.data);
        self.ViewCheckAJAX();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles_member.container_bottom}
      >
        <ListView
          style={styles_member.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity
              style={styles_member.itemDiv}
              onPress={this.ListCheckAJAX.bind(this, rowData.id, rowData.status)}
            >
              <View style={styles_member.itemDiv_top} >
                <Icon
                  name={this.list_check(rowData.status)}
                  style={styles_member.itemDiv_check}
                  color="#666"
                  size={30}
                />
                <Icon
                  name={"pencil-circle"}
                  style={styles_member.itemDiv_icon}
                  color="#edb900"
                />
                <Text style={styles_member.itemDiv_item}>{rowData.content}</Text>
              </View>
              <View style={styles_member.itemDiv_bottom} >
                <Text style={styles_member.itemDiv_time}>{rowData.time}</Text>
                <Text style={styles_member.itemDiv_location}>{rowData.location}</Text>
              </View>
            </TouchableOpacity>
          }
        />

      </ScrollView>
    );
  }
}
