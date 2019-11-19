import React from 'react';
import { StyleSheet, View, Button, Text, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { url } from '../../main';
import { getCurrentDate, convertUnixToDate} from '../../assets/utils';
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
        console.log("Rating is: " + rating)
    }

    selectRequest = (id) => {
        this.setState({
            selected: id
        })
    }

    render() {
        return (
            <Container>

                {/* <AirbnbRating
                    count={11}
                    reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                    defaultRating={11}
                    size={20}
                    onFinishRating={this.ratingCompleted}
                /> */}
                <Content>
                    <List>
                        {this.state.requests && this.state.requests.map(el => {
                            return (
                                <ListItem avatar key={el._id}>
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
                                </ListItem>
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

});

export default RateDoctor;
