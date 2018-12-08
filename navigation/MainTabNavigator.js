import React from "react";
import { Platform, View, Button, Text } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

import MapDiary from "../screens/MapDiary";
import Diary from "../screens/Diary";
import Add from "../screens/Add";
import History from "../screens/History";
import Member from "../screens/Member";

import PopupDialog from "react-native-popup-dialog";
import styles_layout from "../screens/style/style_layout";
import { red } from "ansi-colors";

import Icons from "react-native-vector-icons/Ionicons";
import { Marker } from "react-native-maps";

/* 地圖 */
const MapDiaryStack = createStackNavigator({
  MapDiary: MapDiary
});

MapDiaryStack.navigationOptions = {
  tabBarLabel: <View />, //隱藏bar文字
  tabBarIcon: ({ focused, tintColor }) => (
    <Icons
      focused={focused}
      name={Platform.OS === "ios" ? `ios-pin${focused ? "" : ""}` : "md-pin"}
      color={tintColor}
      size={25}
    />
  ),
  tabBarOptions: {
    inactiveColor: "#333",
    activeTintColor: "#30487b",
    inactiveBackgroundColor: "#f2f2f2",
    activeBackgroundColor: "#f2f2f2"
  }
};


/* 日記 */
const DiaryStack = createStackNavigator({
  Diary: Diary
});

DiaryStack.navigationOptions = {
  tabBarLabel: <View />, //隱藏bar文字
  tabBarIcon: ({ focused, tintColor }) => (
    <Icons
      focused={focused}
      name={Platform.OS === "ios" ? `ios-book${focused ? "" : ""}` : "md-book"}
      color={tintColor}
      size={25}
    />
  ),
  tabBarOptions: {
    inactiveColor: "#333",
    activeTintColor: "#30487b",
    inactiveBackgroundColor: "#f2f2f2",
    activeBackgroundColor: "#f2f2f2"
  }
};

/* 新增待辦事項 */
const AddStack = createStackNavigator({
  Add: Add
});

AddStack.navigationOptions = {
  tabBarLabel: <View />, //隱藏bar文字
  tabBarIcon: ({ focused, tintColor }) => (
    <Icons
      focused={focused}
      name={Platform.OS === "ios" ? `ios-add${focused ? "" : ""}` : "md-add"}
      color={tintColor}
      size={25}
    />
  ),
  tabBarOptions: {
    inactiveColor: "#333",
    activeTintColor: "#30487b",
    inactiveBackgroundColor: "#f2f2f2",
    activeBackgroundColor: "#f2f2f2"
  }
};

/* 歷史日記 */
const HistoryStack = createStackNavigator({
  History: History
});

HistoryStack.navigationOptions = {
  tabBarLabel: <View />, //隱藏bar文字
  tabBarIcon: ({ focused, tintColor }) => (
    <Icons
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-albums${focused ? "" : ""}` : "md-albums"
      }
      color={tintColor}
      size={25}
    />
  ),
  tabBarOptions: {
    inactiveColor: "#333",
    activeTintColor: "#30487b",
    inactiveBackgroundColor: "#f2f2f2",
    activeBackgroundColor: "#f2f2f2"
  }
};

/* 會員中心 */
const MemberStack = createStackNavigator({
  Member: Member
});

MemberStack.navigationOptions = {
  tabBarLabel: <View />, //隱藏bar文字
  tabBarIcon: ({ focused, tintColor }) => (
    <Icons
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-person${focused ? "" : ""}` : "md-person"
      }
      color={tintColor}
      size={25}
    />
  ),
  tabBarOptions: {
    inactiveColor: "#333",
    activeTintColor: "#30487b",
    inactiveBackgroundColor: "#f2f2f2",
    activeBackgroundColor: "#f2f2f2"
  }
};

export default createBottomTabNavigator({
  MemberStack,
  DiaryStack,
  AddStack,
  HistoryStack,
  MapDiaryStack,
});
