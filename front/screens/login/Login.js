import React from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Label, Input } from 'native-base';
import { url } from '../../main';

class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Увійти в систему',
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
            email: "",
            password: ""
        }
    }

    handlerChangeEmail = (value) => {
        this.setState({ email: value })
    }

    handlerChangePassword = (value) => {
        this.setState({ password: value })
    }

    clearData = () => {
        this.setState({
            email: "",
            password: ""
        })
    }

    handlerLogin = () => {
        fetch(`${url}/users/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.clearData();
            this._storeUserData(JSON.stringify(data.user));
            this.props.navigation.navigate('Home');
        }).catch(error => {
            alert(error);
        })
    }

    _storeUserData = async (user) => {
        try {
            await AsyncStorage.setItem('user', user);
        } catch (error) {
            // Error saving data
        }
    };

    handlerRegister = () => {
        this.clearData();
        this.props.navigation.navigate("Register");
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Електронна пошта</Label>
                            <Input onChangeText={(text) => this.handlerChangeEmail(text)}
                                value={this.state.email}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Пароль</Label>
                            <Input onChangeText={(text) => this.handlerChangePassword(text)}
                                value={this.state.password}
                                secureTextEntry={true}
                            />
                        </Item>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20}}>
                            <Button
                                title="Увійти"
                                color={"#2C73D2"}
                                onPress={this.handlerLogin}
                            />
                        </View>
                    </Form>
                    <TouchableOpacity
                        style={styles.createAccount}
                        onPress={this.handlerRegister}
                    >
                        <Text>Створити акаунт</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    save: {
        width: 300,
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        color: "#f194ff"
    },
    createAccount: {
        marginTop: 30,
        alignItems: 'center'
    }
});

export default LoginScreen;
