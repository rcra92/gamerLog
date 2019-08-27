/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import First from './First';
import store from './src/redux/store';
import DetailsScreen from './src/components/detailsScreen';
import FavoritesScreen from './src/components/favoritesScreen';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

let RootStack = createBottomTabNavigator(
  {
    Home: First,
    Details: DetailsScreen,
    List: FavoritesScreen
  },
  {
    initialRouteName: "Home"
  }
);

let Navigation = createAppContainer(RootStack);

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App;
