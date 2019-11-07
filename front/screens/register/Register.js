import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Picker } from 'native-base';
import {url} from '../../main';

class RegisterScreen extends React.Component {

    static navigationOptions = {
        title: 'Створити акаунт',
        headerStyle: {
          backgroundColor: '#2C73D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

    constructor(props){
        super(props);

        this.state = {
            user: {
                name: "",
                role: "patient",
                email: "",
                phone: "",
                location: "",
                area: "1",
                password: ""
            }
        }
    }

    onChangeField = (field, value) => {
        this.setState({
            user: {
                ...this.state.user,
                [field]: value
            }
        })
    }

    handlerRegister = () => {
        fetch(`${url}/users/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.props.navigation.navigate('Login');
        }).catch(error => {
            alert(error);
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Ім'я</Label>
                            <Input
                                onChangeText={(text) => this.onChangeField("name", text)}
                                value={this.state.user.name}  
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Електронна пошта</Label>
                            <Input
                                onChangeText={(text) => this.onChangeField("email", text)}
                                value={this.state.user.email} 
                             />
                        </Item>
                        <Item floatingLabel>
                            <Label>Телефон</Label>
                            <Input 
                                onChangeText={(text) => this.onChangeField("phone", text)}
                                value={this.state.user.phone} 
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Місце проживання/роботи(для лікарів)</Label>
                            <Input
                                onChangeText={(text) => this.onChangeField("location", text)}
                                value={this.state.user.location}  
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Пароль</Label>
                            <Input
                                onChangeText={(text) => this.onChangeField("password", text)}
                                value={this.state.user.password}
                                secureTextEntry={true}  
                            />
                        </Item>
                        <Item style={{marginTop: 10}}>
                            <Picker
                                iosHeader="District"
                                mode="dropdown"
                                selectedValue={this.state.user.area}
                                onValueChange={(value) => this.onChangeField("area", value)}>
                                <Item label="Оболонський" value="1" />
                                <Item label="Деснянський" value="2" />
                                <Item label="Дніпровський" value="3" />
                                <Item label="Дарницький" value="4" />
                                <Item label="Шевченківський" value="5" />
                                <Item label="Подільський" value="6" />
                                <Item label="Солом'янський" value="7" />
                                <Item label="Голосіївський" value="8" />
                                <Item label="Печерський" value="9" />
                                <Item label="Святошинський" value="10" />
                            </Picker>
                        </Item>
                        <Item style={{marginTop: 10}}>
                            <Picker
                                iosHeader="Role"
                                mode="dropdown"
                                selectedValue={this.state.user.role}
                                onValueChange={(value) => this.onChangeField("role", value)}>
                                <Item label="Пацієнт" value="patient" />
                                <Item label="Лікар" value="doctor" />
                            </Picker>
                        </Item>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20, color: "red" }}>
                            <Button 
                                title="Створити" 
                                color={"#2C73D2"}
                                onPress={this.handlerRegister} 
                            />
                        </View>
                    </Form>
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
    }
});

export default RegisterScreen;
