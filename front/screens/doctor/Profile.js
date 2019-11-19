import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Text, Button } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { url } from '../../main';
import userIcon from '../../assets/user.jpg';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5'],
            tableData: [
                ['1', '2', '3', '4', '5']
            ],
            patients: []
        }
    }

    async componentDidMount() {
        await this._retrieveUserData();
        await this.getPatients();
    }

    _retrieveUserData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                let tableHead = Object.keys(data.schedule);
                let tableData = Object.values(data.schedule);
                if (tableHead && tableData) {
                    this.setState({
                        user: data,
                        tableHead: tableHead,
                        tableData: [tableData]
                    })
                }
            }
        } catch (error) {
            console.log("error");
            // Error retrieving data
        }
    };

    getPatients = async () => {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            let data = JSON.parse(value);

            await fetch(`${url}/users/search`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctorId: data.id }),
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ patients: data })
            }).catch(error => {
                alert(error);
            })
        }
    }

    handlerLogout = () => {
        AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    render() {
        const state = this.state;
        return (
            <Container style={styles.container}>
                <View>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Графік роботи</Text>
                </View>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
                <View>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 20 }}>Список всіх пацієнтів</Text>
                </View>
                <Content>
                    <List>
                        {this.state.patients.map(el => {
                            return (
                                <ListItem avatar key={el._id}>
                                    <Left>
                                        <Thumbnail source={userIcon} />
                                    </Left>
                                    <Body>
                                        <Text>{el.name}</Text>
                                        <Text style={{ fontStyle: 'italic' }}>{el.location}</Text>
                                    </Body>
                                </ListItem>
                            )
                        })}
                    </List>
                    {
                        this.state.patients.length === 0 ? <View><Text>У вас поки немає пацієнтів</Text></View> : null
                    }
                </Content>
                <View>
                    <Button title="Вийти з системи" onPress={this.handlerLogout}></Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default ProfileScreen;