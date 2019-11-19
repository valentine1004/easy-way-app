import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5'],
            tableData: [
                ['1', '2', '3', '4', '5']
            ]
        }
    }

    componentDidMount() {
        this._retrieveUserData();
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

    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>Графік роботи</Text>
                </View>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default ProfileScreen;