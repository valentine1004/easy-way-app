import React from 'react';
import { StyleSheet, View, Button, Text, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Textarea } from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { url } from '../../main';
import { getCurrentDate, convertUnixToDate } from '../../assets/utils';
import requestIcon from '../../assets/request.png';

class RateDoctor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            selected: null
        }
    }

    async componentDidMount() {
        await this.getLastRequests();
    }

    getLastRequests = async () => {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            let data = JSON.parse(value);
            await fetch(`${url}/requests/finished`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: getCurrentDate(), patientId: data.id }),
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ requests: data })
            }).catch(error => {
                alert(error);
            })
        }
    }

    ratingCompleted = (rating) => {
        this.setState({
            selected: {
                ...this.state.selected,
                evaluation: rating
            }
        });
    }

    handlerChangeComment = (text) => {
        this.setState({
            selected: {
                ...this.state.selected,
                comment: text
            }
        });
    }

    leaveComment = async () => {
        await fetch(`${url}/requests/${this.state.selected._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.selected),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({selected: null});
            this.getLastRequests();
        }).catch(error => {
            alert(error);
        })
    }

    selectRequest = (el) => {
        this.setState({
            selected: {...el}
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.state.requests && this.state.requests.map(el => {
                            return (
                                this.state.selected === null || (this.state.selected && this.state.selected._id !== el._id) ?
                                    <ListItem avatar key={el._id} onPress={() => this.selectRequest(el)}>
                                        <Left>
                                            <Thumbnail source={requestIcon} />
                                        </Left>
                                        <Body>
                                            <Text>{el.title}</Text>
                                            <Text style={{ fontStyle: 'italic' }}>{el.description}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{convertUnixToDate(el.date)}</Text>
                                        </Right>
                                    </ListItem> : this.state.selected._id === el._id ?
                                        <View key={el._id} style={styles.editedBlock}>
                                            <Text style={{ fontWeight: 'bold' }}>Залиште відгук та оцініть прийом лікаря</Text>
                                            <Textarea
                                                style={{ width: 250, marginTop: 10 }}
                                                rowSpan={3} bordered placeholder="Відгук"
                                                value={this.state.selected.comment ? this.state.selected.comment : null}
                                                onChangeText={(text) => this.handlerChangeComment(text)}
                                            />
                                            <AirbnbRating
                                                count={5}
                                                reviews={["Дуже погано", "Погано", "Задовільно", "Добре", "Чудово"]}
                                                defaultRating={this.state.selected.evaluation ? this.state.selected.evaluation : 4}
                                                size={15}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                            <View style={{ marginTop: 10 }}>
                                                <Button title="Залишити відгук" onPress={this.leaveComment} />
                                            </View>
                                        </View> : null
                            )
                        })}
                    </List>
                    {
                        this.state.requests.length === 0 ? <View><Text>У вас поки немає завершених прийомів лікаря</Text></View> : null
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    editedBlock: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        flex: 1,
        alignItems: 'center'
    }
});

export default RateDoctor;
