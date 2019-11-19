import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { url } from '../../main';
import doctorIcon from '../../assets/male_dr.jpg';
import React, { Component } from 'react';

class FamilyDoctorsScreen extends React.Component {

    static navigationOptions = {
        title: 'Сімейні лікарі',
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

    findDistrict = (area) => {
        switch (area) {
            case '1':
                return 'Оболонський район'
            case '2':
                return 'Деснянський район'
            case '3':
                return 'Дніпровський район'
            case '4':
                return 'Дарницький район'
            case '5':
                return 'Шевченківський район'
            case '6':
                return 'Подільський район'
            case '7':
                return "Солом'янський район"
            case '8':
                return 'Голосіївський район'
            case '9':
                return 'Печерський район'
            case '10':
                return 'Святошинський район'
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {
                            this.state.doctors && this.state.doctors.map(item => {
                                return (
                                    <ListItem thumbnail key={item._id}>
                                        <Left>
                                            <Thumbnail square source={doctorIcon} />
                                        </Left>
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text note>{this.findDistrict(item.area)}</Text>
                                            <Text note>{item.description}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent>
                                                <Text>View</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                )
                            })
                        }

                    </List>
                </Content>
                {/* <ModalExample /> */}
            </Container>
        )
    }
}

class ModalExample extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default FamilyDoctorsScreen;