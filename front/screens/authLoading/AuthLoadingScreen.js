import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';

class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('user');

        this.props.navigation.navigate(user ? 'App' : 'Auth');
    };

    render() {
        return (
            <View>
                <Text>Hello app</Text>
            </View>
        )
    }
}

export default AuthLoadingScreen;
