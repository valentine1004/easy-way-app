import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from './Profile.js';
import RatingDoctorsScreen from './RatingDoctors.js';

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
        RatingDoctors: {
            screen: RatingDoctorsScreen,
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    focused ? <Icon name="list-alt" size={25} color={'#2C73D2'} /> :
                    <Icon name="list-alt" size={25} color={'#a1a1a1'} />
                ),
                title: 'Відгуки лікарям',
            }
        }
    },
    {
        initialRouteName: 'Profile'
    }
);

export default createAppContainer(bottomTabNavigator);