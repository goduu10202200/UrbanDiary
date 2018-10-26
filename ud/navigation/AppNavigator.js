import React from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import Enter from "../screens/Enter";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MapDiary from "../screens/MapDiary";
import History_year from "../screens/History_year";
import History_day from "../screens/History_day";
const AppNavigator = createStackNavigator({
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
  Signup: { screen: Signup },
  Login: { screen: Login },
  History_year: { screen: History_year },
  History_day: { screen: History_day }
});

export default AppNavigator;

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
