import React from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Tabs } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import MyLocation from './MyLocation.js';
import DoRequest from './DoRequest.js';
import RateDoctor from './RateDoctor.js';

class PatientScreen extends React.Component {

    static navigationOptions = {
        title: 'Пацієнт',
        headerStyle: {
          backgroundColor: '#2C73D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Запит' },
                { key: 'second', title: 'Інформація' },
                { key: 'third', title: 'Оцінити' }
            ],
        };
    }

    handlerLogout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <Container style={styles.wrapper}>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: DoRequest,
                        second: MyLocation,
                        third: RateDoctor
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />

                <Button title="Вийти з системи" onPress={this.handlerLogout}></Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

export default PatientScreen;
