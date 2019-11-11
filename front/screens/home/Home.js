import React from 'react';
import { View, AsyncStorage, Text, Image, Button } from 'react-native';
// import { Button } from 'native-base';

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Головна',
        headerStyle: {
            backgroundColor: '#2C73D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        this._retrieveUserData();
    }

    _retrieveUserData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');

            if (value !== null) {
                let data = JSON.parse(value);
                switch(data.role){
                    case 'doctor':
                        this.props.navigation.navigate('Doctor');
                        break;
                    case 'patient':
                        this.props.navigation.navigate('Patient');
                        break;
                    case 'manager':
                        this.props.navigation.navigate('Manager');
                        break;
                }
                // if (data.role === 'doctor') {
                //     this.props.navigation.navigate('Doctor');
                // } else if (data.role === 'patient') {
                //     this.props.navigation.navigate('Patient');
                // }
            }
        } catch (error) {
            console.log("error");
            // Error retrieving data
        }
    };

    render() {
        return (
            <View>
                <View style={{width: 400}}>
                    <Text style={{ alignItems: 'center', padding: 20 }}>Цей додаток створений для того щоб оптимізувати роботу лікарів та спростити реєстрацію для пацієнтів</Text>
                </View>
                <Image
                    style={{ width: 400, height: 350 }}
                    source={require('../../care-plan.png')}
                />
                <View style={{marginTop: 40}}>
                    <Button
                        title="Повернутись до профілю"
                        onPress={this._retrieveUserData}
                    />
                </View>
            </View>
        )
    }
}

export default HomeScreen;
