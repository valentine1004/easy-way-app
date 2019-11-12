import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//components
import MyLocation from './MyLocation.js';
import DoRequest from './DoRequest.js';
import RateDoctor from './RateDoctor.js';

// import { StyleSheet, View, Button, Text, AsyncStorage, Dimensions } from 'react-native';
// import { Container } from 'native-base';
// import { TabView, SceneMap } from 'react-native-tab-view';

const bottomTabNavigator = createBottomTabNavigator(
    {
        MyLocation: {
            screen: MyLocation,
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    focused ? <Icon name="user-circle-o" size={25} color={'#2C73D2'} /> :
                    <Icon name="user-circle-o" size={25} color={'#a1a1a1'} />
                ),
                title: 'Профіль',
            }
        },
        DoRequest: {
            screen: DoRequest,
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    focused ? <Icon name="ambulance" size={25} color={'#2C73D2'} /> :
                    <Icon name="ambulance" size={25} color={'#a1a1a1'} />
                ),
                title: 'Зробити запит',
            }
        },
        RateDoctor: {
            screen: RateDoctor,
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    focused ? <Icon name="comment-o" size={25} color={'#2C73D2'} /> :
                    <Icon name="comment-o" size={25} color={'#a1a1a1'} />
                ),
                title: 'Залишити відгук',
            }
        }
    },
    {
        initialRouteName: 'MyLocation'
    }
);

export default createAppContainer(bottomTabNavigator);

// class PatientScreen extends React.Component {

//     static navigationOptions = {
//         title: 'Пацієнт',
//         headerStyle: {
//           backgroundColor: '#2C73D2',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       };

//     constructor(props) {
//         super(props);

//         this.state = {
//             index: 0,
//             routes: [
//                 { key: 'first', title: 'Запит' },
//                 { key: 'second', title: 'Інформація' },
//                 { key: 'third', title: 'Оцінити' }
//             ],
//         };
//     }

//     handlerLogout = async () => {
//         await AsyncStorage.clear();
//         this.props.navigation.navigate("Login");
//     }

//     render() {
//         return (
//             <Container style={styles.wrapper}>
//                 <TabView
//                     navigationState={this.state}
//                     renderScene={SceneMap({
//                         first: DoRequest,
//                         second: MyLocation,
//                         third: RateDoctor
//                     })}
//                     onIndexChange={index => this.setState({ index })}
//                     initialLayout={{ width: Dimensions.get('window').width }}
//                 />

//                 <Button title="Вийти з системи" onPress={this.handlerLogout}></Button>
//             </Container>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     scene: {
//         flex: 1,
//     },
// });

// export default PatientScreen;
