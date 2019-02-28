import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import StarRating from 'react-native-star-rating';
import { Button, ListItem, List } from "react-native-elements";
import ServiceApiNet from "./ServiceApiNet";
// Import file
import styles_layout from "./style/style_layout";
import styles_add from "./style/style_add";
import moment from "moment";
import { Agenda } from 'react-native-calendars';

export default class Add extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "行事曆",
      headerStyle: styles_layout.titleDiv,
      headerTitleStyle: styles_layout.titleTxt,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Add_new")
          }}
        >
          <Icon name={"plus"} style={styles_layout.titleIcon} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      list: {},
      items: {},
      list_rating: 0,
      star_txt: "請輸入星情指數"
    };
  }

  // 修改資料庫勾選狀態
  ListCheckAJAX(created_at, status) {
    var self = this;
    if (status == 0) {
      status = 1;
    } else {
      status = 0;
      self.ListMoodAJAX(created_at, 0);
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
        self.loadItemsForMonth(self.loadItems.bind(self))

        self.renderItem(self)
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
        // console.log(response.data);
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
    return (
      <View
        style={styles_add.container}
      >
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={moment(new Date()).format("YYYY-MM-DD")}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />


        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogTitle={<DialogTitle title="星情指數" />}
          dialogStyle={styles_add.dialog}
        >
          <View style={styles_add.dialog_div}>
            <Text style={styles_add.dialog_startxt}>{this.state.star_txt}</Text>
          </View>
          <View style={styles_add.dialog_div}>
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
            buttonStyle={styles_add.dialog_btn}
            onPress={() => {
              this.ListMoodAJAX(this.state.list_created_at, this.state.list_rating);
              this.popupDialog.dismiss();
              this.setState({
                list_rating: 0,
                star_txt: "請輸入星情指數"
              });
            }}
          />
        </PopupDialog>
      </View>
    );
  }

  // 讀取資料庫資料
  loadItems(day) {
    // alert("1")
    let self = this;
    axios({
      url: ServiceApiNet.getURL() + "mongo_viewalllist.php",
      method: "post"
    })
      .then(responseJson => {
        if (responseJson.data != "No data") {
          self.setState({
            list: responseJson.data
          });
        }
      })
      .catch(error => {
        console.log(error);  //避免頁面直接出錯
      });

    setTimeout(() => {
      //列出對應行事曆
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        this.state.items[strTime] = [];
      }
      //跑資料庫待辦事項筆數並且將對應日期放入陣列中
      for (let j = 0; j < this.state.list.length; j++) {
        const listdate = this.state.list[j]["date"];
        this.state.items[listdate].push({
          date: this.state.list[j]['date'],
          title: this.state.list[j]["title"],
          time: this.state.list[j]['time'],
          location: this.state.list[j]['location'],
          status: this.state.list[j]['status'],
          created_at: this.state.list[j]['created_at'],
        });
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  // 顯示資料
  renderItem(item) {
    // alert("2")
    return (
      <TouchableOpacity
        style={[
          item.status == 1
            ? styles.itemDiv_checked
            : styles.itemDiv
        ]}
        onPress={() => {
          this.ListCheckAJAX(
            item.created_at,
            item.status
          );
          this.setState({
            list_created_at: item.created_at
          });
          item.status == 0 ? this.popupDialog.show() : "";
        }}
      >

        <Text style={styles.item_title}>{item.title}</Text>
        <View>
          <Text style={styles.item_subtitle}>
            {item.time}
            {item.location === "" ? "" : "，" + item.location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  //沒有待辦事項的時候
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <View
          style={{
            width: "95%",
            height: 10,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }

  // 立即顯示
  rowHasChanged(r1, r2) {
    // return r1.name !== r2.name;
    // return true
    return r1 !== r2
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  itemDiv: {
    height: 70,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 10,
    marginTop: 17
  },
  itemDiv_checked: {
    height: 70,
    backgroundColor: '#888',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 10,
    marginTop: 17
  },
  item_title: {
    fontSize: 18,
    lineHeight: 34,
    minHeight: 34,
    color: "#333",
  },
  item_subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: "#999",

  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});