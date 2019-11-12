import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

class ProfileScreen extends React.Component{

    handlerLogout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text> This is Profile screen </Text>
              <Button title="Вийти з системи" onPress={this.handlerLogout}></Button>
            </View>
          );
    }
}

export default ProfileScreen;