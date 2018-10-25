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
  
  // tabBarIcon: ({tintColor}) => (
  //   <FontAwesome5 name='thumbtack' size={30} color={tintColor}/>
  // ),
  // tabBarOptions: { activeTintColor:'#316191', }
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
  
  // tabBarIcon: ({tintColor}) => (
  //   <FontAwesome5 name='book' size={30} color={tintColor}/>
  // ),
  // tabBarOptions: { activeTintColor:'#316191', }
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
  
  // tabBarIcon: ({tintColor}) => (
  //   <FontAwesome5 name='plus' size={30} color={tintColor}/>
  // ),
  // tabBarOptions: { activeTintColor:'#316191', }
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
  // tabBarIcon: ({tintColor}) => (
  //   <FontAwesome5 name='history' size={30} color={tintColor}/>
  // ),
  // tabBarOptions: { activeTintColor:'#316191', }
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
  // tabBarIcon: ({tintColor}) => (
  //   <FontAwesome5 name='user' size={30} color={tintColor}/>
  // ),
  // tabBarOptions: { activeTintColor:'#316191', }
};


export default createBottomTabNavigator({
  MemberStack,
  DiaryStack,
  AddStack,
  HistoryStack,
  MapDiaryStack,
});
