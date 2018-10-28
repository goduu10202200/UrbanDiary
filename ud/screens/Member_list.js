import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";
import ServiceApiNet from "./ServiceApiNet";
import moment from "moment";

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
      curTime: "",
      refreshing: false,
      dataSource: "",
      isHidden: false,
    };
  }

  //onload
  componentDidMount() {
    this.ViewCheckAJAX();
  }

  //reload
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.ViewCheckAJAX().then(() => {
      this.setState({ refreshing: false });
    });
  }


  //顯示list
  ViewCheckAJAX() {
    var today = moment(new Date()).format("YYYY-MM-DD");
    return fetch(ServiceApiNet.getURL() + "viewList_api.php", {
      method: "POST",
      body: JSON.stringify({
        today: today,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState(
          {
            isLoading: false,
            isHidden: true,
            dataSource: ds.cloneWithRows(responseJson)
          },
          function () {
            // In this block you can do something with new state.
          }
        );
      })
      .catch(error => {
        // console.error(error);
        this.setState(
          {
            isLoading: false,
            isHidden: false,
          }
        );
      });
  }

  //修改手機上圖案勾選狀態
  list_check(status) {
    if (status == 1) {
      return "checkbox-marked";
    } else {
      return "checkbox-blank-outline";
    }
  }

  // 修改資料庫勾選狀態
  ListCheckAJAX(id, status) {
    var self = this;
    if (status == 0) {
      status = 1;
    } else {
      status = 0;
    }

    axios({
      url: ServiceApiNet.getURL() + "CheckList.php",
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
  }

  // onContentSize(contentWidth, contentHeight) {
  //   alert("<<<<<< content >>>>>>>>>" + contentWidth + "," + contentHeight);
  //   this.setNativeProps({
  //     style: {
  //       height: contentHeight
  //     }
  //   });
  // }

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
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.isHidden ? (
          <ListView
            style={styles_member.listView}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <TouchableOpacity
                style={styles_member.itemDiv}
                onPress={this.ListCheckAJAX.bind(
                  this,
                  rowData.id,
                  rowData.status
                )}
              >
                <View style={styles_member.itemDiv_top}>
                  <Icon
                    name={this.list_check(rowData.status)}
                    style={styles_member.itemDiv_check}
                    color="#666"
                    size={30}
                  />
                  {rowData.kind == "future" ?
                    <Icon
                      name={"star-circle"}
                      style={styles_member.itemDiv_icon}
                      color="#edb900"
                    />
                    : <Icon
                      name={"pencil-circle"}
                      style={styles_member.itemDiv_icon}
                      color="#518c73"
                    />
                  }
                  <Text style={styles_member.itemDiv_item}>
                    {rowData.content}
                  </Text>
                </View>
                <View style={styles_member.itemDiv_bottom}>
                  <Text style={styles_member.itemDiv_time}>{rowData.time}</Text>
                  <Text style={styles_member.itemDiv_location}>
                    {rowData.location}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : null}
      </ScrollView>
    );
  }
}
