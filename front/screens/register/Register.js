import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Picker } from 'native-base';
import { url } from '../../main';

const districts = [
    'Оболонський',
    'Деснянський',
    'Дніпровський',
    'Дарницький',
    'Шевченківський',
    'Подільський',
    "Солом'янський",
    "Голосіївський",
    "Печерський",
    "Святошинський"
];

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

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                role: "patient",
                email: "",
                phone: "",
                location: "",
                area: "1",
                password: "",
                doctorId: ""
            },
            doctors: []
        }
    }

    componentDidMount() {
        this.searchDoctors();
    }

    searchDoctors = () => {
        fetch(`${url}/users/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: "doctor" }),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({
                doctors: data
            })
        }).catch(error => {
            alert(error);
        })
    }

    onChangeField = (field, value) => {
        if (field === "area") {
            this.setState({
                user: {
                    ...this.state.user,
                    [field]: value,
                    doctorId: ""
                }
            })
        } else {
            this.setState({
                user: {
                    ...this.state.user,
                    [field]: value
                }
            })
        }
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

    handlerDescribeDoctors = () => {
        this.props.navigation.navigate("FamilyDoctors");
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
                            <Label>Місце проживання</Label>
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
                        <Item style={{ marginTop: 10 }}>
                            <Picker
                                iosHeader="District"
                                mode="dropdown"
                                selectedValue={this.state.user.area}
                                onValueChange={(value) => this.onChangeField("area", value)}>
                                {
                                    districts.map((district, i) => {
                                        return <Item label={district} key={i} value={String(i + 1)} />
                                    })
                                }
                            </Picker>
                        </Item>
                        {
                            this.state.doctors && <Item style={{ marginTop: 10 }}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    selectedValue={this.state.user.doctorId}
                                    onValueChange={(value) => this.onChangeField("doctorId", value)}>
                                    <Item label="Виберіть лікаря" value={""} />
                                    {
                                        this.state.doctors.filter(el => el.area === this.state.user.area).map(el => {
                                            return (<Item label={el.name} value={el._id} key={el._id} />)
                                        })
                                    }
                                </Picker>
                            </Item>
                        }
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20, color: "red" }}>
                            <Button
                                title="Створити"
                                color={"#2C73D2"}
                                onPress={this.handlerRegister}
                            />
                        </View>
                    </Form>
                </Content>
                <TouchableOpacity
                    style={styles.describeDoctors}
                    onPress={this.handlerDescribeDoctors}
                >
                    <Text>Переглянути сімейних лікарів</Text>
                </TouchableOpacity>
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
    describeDoctors: {
        marginBottom: 30,
        alignItems: 'center'
    }
});

export default RegisterScreen;
