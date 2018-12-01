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
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles_layout from "./style/style_layout";
import styles_member from "./style/style_member";
import ServiceApiNet from "./ServiceApiNet";
import moment from "moment";
import { Rating, AirbnbRating } from 'react-native-ratings';



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
  //傳評分值
  ratingCompleted( rating ) {
    console.log( `Rating is: ${rating}` );
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
            <AirbnbRating //使用者勾選待辦事項評分
              count={7}
              reviews={["糟透了嗚嗚","還有進步空間～","還行啦","滿不錯的","感覺不賴","輕輕鬆鬆","完美！"]}
              defaultRating={0}
              size={31}
              onFinishRating={this.ratingCompleted} //傳評分值
            />
          </View>
        </PopupDialog>

        <Button
          title="跳出情緒視窗"
          titleStyle={{ fontWeight: "700" }}
          onPress={() => {
            this.popupDialog.show()
          }}
        />
      </ScrollView >
    );
  }
}
