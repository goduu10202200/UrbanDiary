import React from "react";
import { createStackNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";

import Enter from "../screens/Enter";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import History_year from "../screens/History_year";
import History_day from "../screens/History_day";
import Add from "../screens/Add";
import Add_new from "../screens/Add_new";
import Add_location from "../screens/Add_location";
import Diary_old from "../screens/Diary_old";

import { View } from "react-native-animatable";

// import MapDiary from "../screens/MapDiary";
//}, {
const RootStack = createStackNavigator(
  {
    Enter: {
      screen: Enter,
      navigationOptions: {
        header: null //去除上方title
      }
    },
    Signup: Signup,
    Login: Login,
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null //去除上方title
      }
    },
    History_year: History_year,
    History_day: History_day,
    Add: Add,
    Add_new: Add_new,
    Add_location: Add_location,
    Diary_old: Diary_old,
  },
  // {
  //   initialRouteName: "Main"
  // }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "3333333"
    };
  }
  render() {
    return <RootStack />;
  }
}

