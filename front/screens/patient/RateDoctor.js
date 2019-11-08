import React from 'react';
import { StyleSheet, View, Button, Text, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Tabs } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';

class RateDoctor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            location: null,
            user: null
        }
    }

    ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    render() {
        return (
            <Container>
                <AirbnbRating
                    count={11}
                    reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                    defaultRating={11}
                    size={20}
                    onFinishRating={this.ratingCompleted}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({

});

export default RateDoctor;
