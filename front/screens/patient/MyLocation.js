import React from 'react';
import { StyleSheet, View, Button, Text, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Tabs } from 'native-base';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import { GOOGLE_MAPS_APIKEY } from '../../main';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const DELTA = {
    latitude: 50.528660,
    longitude: 30.594799,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
};

class MyLocation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            location: null,
            user: null
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
                Geocoder.from(data.location)
                    .then(json => {
                        var location = json.results[0].geometry.location;

                        this.setState({
                            location: location,
                            user: data
                        })
                    })
                    .catch(error => console.warn(error));
            }
        } catch (error) {
            console.log("error");
            // Error retrieving data
        }
    };

    handlerLogout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <Container>
                {
                    this.state.user ? <View style={{ alignItems: 'center', padding: 10 }}>
                        <Text>Доброго дня, пацієнт {this.state.user.name}</Text>
                    </View> : null
                }

                {
                    this.state.location && <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.location.lat,
                            longitude: this.state.location.lng,
                            latitudeDelta: DELTA.latitudeDelta,
                            longitudeDelta: DELTA.longitudeDelta
                        }}>
                        <Marker coordinate={{
                            latitude: this.state.location.lat,
                            longitude: this.state.location.lng
                        }} />
                    </MapView>
                }
                <View style={{padding: 16}}>
                    <Button title="Вийти з системи" onPress={this.handlerLogout}></Button>
                </View>
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
    },
    map: {
        flex: 1,
        height: 300,
        width: width
    }
});

export default MyLocation;
