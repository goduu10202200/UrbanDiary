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
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import { Button } from "../node_modules/react-native-elements";
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import axios from "axios";

import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";

import ServiceApiNet from "./ServiceApiNet";

export default class Member_list extends React.Component {
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
      list: "",
      list_rating: 0,
      star_txt: "請輸入星情指數"
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
  };

  //顯示list
  ViewCheckAJAX() {
    var today = moment(new Date()).format("YYYY-MM-DD");
    return axios({
      url: ServiceApiNet.getURL() + "mongo_viewlist.php",
      method: "post",
      data: {
        today: today
      }
    })
      .then(responseJson => {
        if (responseJson.data != "No data") {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          this.setState({
            isLoading: false,
            isHidden: true,
            dataSource: ds.cloneWithRows(responseJson.data)
          });
        }
        else {
          this.setState({
            isLoading: false,
            isHidden: false,
            // dataSource: ds.cloneWithRows(responseJson.data)
          });
        }
      })
      .catch(error => {
        // console.error(error);
        console.log(error);  //避免頁面直接出錯
        this.setState({
          isLoading: false,
          isHidden: false
        });
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
  ListCheckAJAX(created_at, status) {
    var self = this;
    if (status == 0) {
      status = 1;
    } else {
      status = 0;
      this.ListMoodAJAX(created_at, 0);
    }

    axios({
      url: ServiceApiNet.getURL() + "mongo_checklist.php",
      method: "post",
      data: {
        created_at: created_at,
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

  // 修改資料庫待辦事項完成情緒狀態
  ListMoodAJAX(created_at, mood) {
    var self = this;

    axios({
      url: ServiceApiNet.getURL() + "mongo_listmood.php",
      method: "post",
      data: {
        created_at: created_at,
        mood: mood
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  changeStar(ratings) {
    var txt = "";
    switch (ratings) {
      case 1:
        txt = "糟透了嗚嗚";
        break;
      case 2:
        txt = "還有進步空間～";
        break;
      case 3:
        txt = "還行啦";
        break;
      case 4:
        txt = "滿不錯的";
        break;
      case 5:
        txt = "感覺不賴";
        break;
      case 6:
        txt = "輕輕鬆鬆";
        break;
      case 7:
        txt = "完美！";
        break;
      default:
        txt = "滿不錯的";
    }
    this.setState({
      star_txt: txt
    });

  }

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
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="星情指數" />}
          dialogStyle={styles_member.dialog}
        >
          <View style={styles_member.dialog_div}>
            <Text style={styles_member.dialog_startxt}>{this.state.star_txt}</Text>
          </View>
          <View style={styles_member.dialog_div}>
            {/* 使用者勾選待辦事項評分 */}
            <StarRating
              disabled={false}
              maxStars={7}
              rating={this.state.list_rating}
              selectedStar={(rating) => {
                this.setState({
                  list_rating: rating
                });
                this.changeStar(rating);
              }}
              fullStarColor={"#FFB700"}
              starStyle={{ margin: 2 }}
            />
          </View>
          <Button
            title="送出"
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={styles_member.dialog_btn}
            onPress={() => {
              this.ListMoodAJAX(this.state.list, this.state.list_rating);
              this.popupDialog.dismiss();
              this.setState({
                list_rating: 0,
                star_txt: "請輸入星情指數"
              });
            }}
          />
        </PopupDialog>

        {this.state.isHidden ? (
          <ListView
            style={styles_member.listView}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <TouchableOpacity
                style={[
                  rowData.status == 1
                    ? styles_member.itemDiv_checked
                    : styles_member.itemDiv
                ]}
                onPress={() => {
                  this.ListCheckAJAX(
                    // this,
                    // rowData.id,
                    // rowData.username,
                    // rowData.title,
                    rowData.created_at,
                    rowData.status
                  );
                  this.setState({
                    list: rowData.created_at
                  });
                  rowData.status == 0 ? this.popupDialog.show() : "";
                }}
              >
                <View style={styles_member.itemDiv_top}>
                  <Icon
                    name={this.list_check(rowData.status)}
                    style={styles_member.itemDiv_check}
                    color="#666"
                    size={30}
                  />
                  {rowData.kind == "future" ? (
                    <Icon
                      name={"star-circle"}
                      style={styles_member.itemDiv_icon}
                      color="#edb900"
                    />
                  ) : (
                      <Icon
                        name={"pencil-circle"}
                        style={styles_member.itemDiv_icon}
                        color="#518c73"
                      />
                    )}
                  <Text style={styles_member.itemDiv_item}>
                    {rowData.title}
                  </Text>
                  {rowData.title === "吃嘿．傑克拉麵" ? (
                    <Image
                      style={styles_member.itemDiv_discount}
                      source={require("../assets/images/discount.png")}
                    />
                  ) : null}
                </View>
                <View style={styles_member.itemDiv_bottom}>
                  <Text style={styles_member.itemDiv_time}>{rowData.time}</Text>
                  <Text style={styles_member.itemDiv_location}>
                    {rowData.location}
                  </Text>
                </View>
              </TouchableOpacity>
            )
            }
          />
        ) : null}


      </ScrollView >
    );
  }
}
