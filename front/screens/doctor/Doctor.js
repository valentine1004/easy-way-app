import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from './Profile.js';
import RouteScreen from './Route.js';

const bottomTabNavigator = createBottomTabNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    focused ? <Icon name="user-circle-o" size={25} color={'#2C73D2'} /> :
                    <Icon name="user-circle-o" size={25} color={'#a1a1a1'} />
                ),
                title: 'Профіль',
            }
        },
        Route: {
            screen: RouteScreen,
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    focused ? <Icon name="map-o" size={25} color={'#2C73D2'} /> :
                    <Icon name="map-o" size={25} color={'#a1a1a1'} />
                ),
                title: 'Маршрут обходу',
            }
        }
    },
    {
        initialRouteName: 'Profile'
    }
);

export default createAppContainer(bottomTabNavigator);