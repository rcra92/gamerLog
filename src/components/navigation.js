import React from 'react';
import {View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import First from '../screens/First';
import DetailsScreen from '../screens/detailsScreen';
import FavoritesScreen from '../screens/favoritesScreen';

const HomeStack = createStackNavigator({
  Home: First,
  Details: DetailsScreen,
});

const ListStack = createStackNavigator({
  Favorites: FavoritesScreen,
  Details: DetailsScreen,
});

let RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Favorites: ListStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Favorites') {
          iconName = 'star';
        }
        return (
          <View style={styles.iconStyle}>
            <FontAwesome5 name={iconName} size={24} color={tintColor} />
          </View>
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

let Navigation = createAppContainer(RootStack);

let styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});

export default Navigation;
