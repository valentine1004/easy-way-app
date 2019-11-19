import React from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Container, Content, Form, Item, Label, Input, Textarea, Picker } from 'native-base';
import {url} from '../../main';
import {convertUnixToDate, getCurrentDate} from '../../assets/utils';

class DoRequest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            request: {
                title: "",
                description: "",
                location: "",
                patientId: "",
                area: "",
                priority: "1",
                date: undefined,
                doctorId: ""
            },
        }
    }

    componentDidMount() {
        this.setCurrentDate();
        this._retrieveUserData();
    }

    setCurrentDate = () => {
        this.setState({
            request: {
                ...this.state.request,
                date: getCurrentDate()
            }
        });
    }

    _retrieveUserData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                this.setState({
                    request: {
                        ...this.state.request,
                        location: data.location,
                        patientId: data.id,
                        area: data.area,
                        doctorId: data.doctorId
                    }
                })
            }
        } catch (error) {
            console.log("error");
            // Error retrieving data
        }
    };

    handlerChangeDate = (date) => {
        let unixDate = new Date(date).getTime() / 1000;
        this.setState({
            request: {
                ...this.state.request,
                date: unixDate
            }
        })
    }

    handlerChangeTitle = (value) => {
        this.setState({
            request: {
                ...this.state.request,
                title: value
            }
        })
    }

    handlerChangeDescription = (value) => {
        this.setState({
            request: {
                ...this.state.request,
                description: value
            }
        })
    }

    handlerChangePriority = (value) => {
        this.setState({
            request: {
                ...this.state.request,
                priority: value
            }
        })
    }

    handlerSendRequest = () => {
        fetch(`${url}/requests`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.request),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            alert("Ваш запит успішно відправлений, очікуйте лікаря");
            this.setState({
                title: "",
                description: "",
                location: "",
                patientId: "",
                area: "",
                priority: ""
            })
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
                            <Label>Що Вас турбує</Label>
                            <Input onChangeText={(text) => this.handlerChangeTitle(text)}
                                value={this.state.request.title}
                            />
                        </Item>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Textarea
                                style={{ width: 350 }}
                                rowSpan={3}
                                bordered
                                placeholder="Опис"
                                onChangeText={(text) => this.handlerChangeDescription(text)}
                            />
                        </View>
                        <Item style={{marginTop: 10}}>
                            <Picker
                                iosHeader="Priority"
                                mode="dropdown"
                                selectedValue={this.state.request.priority}
                                onValueChange={(value) => this.handlerChangePriority(value)}>
                                <Item label="Не терміново" value="1" />
                                <Item label="Терміново" value="2" />
                                <Item label="Дуже терміново" value="3" />
                            </Picker>
                        </Item>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <DatePicker
                                style={{ width: 300, flex: 1, alignItems: 'center' }}
                                date={convertUnixToDate(this.state.request.date)}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={convertUnixToDate(this.state.request.date)}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => this.handlerChangeDate(date)}
                            />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Button
                                style={{ width: 150 }}
                                title="Відправити"
                                color={"#2C73D2"}
                                onPress={this.handlerSendRequest}
                            />
                        </View>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // justifyContent: 'flex-start'
    },
    title: {
        marginTop: 10,
        fontSize: 42,
        flex: 1,
        alignItems: 'center',
        color: "#f194ff"
    }
});

export default DoRequest;
