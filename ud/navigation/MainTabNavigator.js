import React from 'react';
import { Platform, View, Button, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import MapDiary from '../screens/MapDiary';
import Diary from '../screens/Diary';
import Add from '../screens/Add';
import History from '../screens/History';
import Member from '../screens/Member';

import PopupDialog from 'react-native-popup-dialog';
import styles_layout from "../screens/style/style_layout";

/* 地圖 */
const MapDiaryStack = createStackNavigator({
  MapDiary: MapDiary,
});

MapDiaryStack.navigationOptions = {
  tabBarLabel: <View/>,     //隱藏bar文字
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-pin${focused ? '' : '-outline'}` : 'md-pin'}
    />
  ),
};

/* 日記 */
const DiaryStack = createStackNavigator({
  Diary: Diary,
});

DiaryStack.navigationOptions = {
  tabBarLabel: <View/>,     //隱藏bar文字
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-book${focused ? '' : '-outline'}` : 'md-book'}
    />
  ),
};

/* 新增待辦事項 */
const AddStack = createStackNavigator({
  Add: Add,
});

AddStack.navigationOptions = {
  tabBarLabel: <View/>,     //隱藏bar文字
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-add${focused ? '' : '-outline'}` : 'md-add'}
    />
  ),
};

/* 歷史日記 */
const HistoryStack = createStackNavigator({
  History: History,
});

HistoryStack.navigationOptions = {
  tabBarLabel: <View/>,     //隱藏bar文字
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-albums${focused ? '' : '-outline'}` : 'md-albums'}
    />
  ),
};

/* 會員中心 */
const MemberStack = createStackNavigator({
  Member: Member,
});

MemberStack.navigationOptions = {
  tabBarLabel: <View/>,     //隱藏bar文字
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
  },
};


export default createBottomTabNavigator({
  DiaryStack,
  HistoryStack,
  AddStack,
  MapDiaryStack,
  MemberStack,
});
