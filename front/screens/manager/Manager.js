import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';



class HomeScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> This is my Home screen </Text>
        </View>
      );
    }
  }
  
  class ExploreScreen extends React.Component {
    render() {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> This is my Explore screen </Text>
        </View>
      );
    }
  }

  const bottomTabNavigator = createBottomTabNavigator(
    {
      Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: () => (
              <Icon name="home" size={25} color={'#2C73D2'} />
            )
          }
      },
      Explore: ExploreScreen
    },
    {
      initialRouteName: 'Home'
    }
  );

export default createAppContainer(bottomTabNavigator);