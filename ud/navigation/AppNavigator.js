import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Enter from '../screens/Enter';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MapDiary from '../screens/MapDiary';

const AppNavigator = createStackNavigator({
  Enter: {
    screen:Enter, 
    navigationOptions: {
      header: null   //去除上方title
    }
  },
  Signup: Signup,
  Login: Login,
  Main: {
    screen: MainTabNavigator, 
    navigationOptions: {
      header: null   //去除上方title
    }
  },
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