import React from "react";
import { createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

import Enter from "../screens/Enter";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

import History_year from "../screens/History_year";
import History_day from "../screens/History_day";

// import MapDiary from "../screens/MapDiary";

const RootStack = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null //去除上方title
    }
  },
  Enter: {
    screen: Enter,
    navigationOptions: {
      header: null //去除上方title
    }
  },
  Signup: Signup,
  Login: Login,
  History_year: History_year,
  History_day: History_day
},{
  initialRouteName: 'Main',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


/*
 export default createSwitchNavigator({
   // You could add another route here for authentication.
   // Read more at https://reactnavigation.org/docs/en/auth-flow.html

  Enter: Enter,
  Signup: Signup,
  Login: Login,
  //Friends: { screen: Friends},
  Main: MainTabNavigator,
 });
 */