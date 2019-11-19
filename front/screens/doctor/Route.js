import React from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Tabs } from 'native-base';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { url, GOOGLE_MAPS_APIKEY } from '../../main';
import {getDistance, getCurrentDate} from '../../assets/utils';

Geocoder.init(GOOGLE_MAPS_APIKEY);

const { width, height } = Dimensions.get('window');

const DELTA = {
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
};

class RouteScreen extends React.Component {

    static navigationOptions = {
        title: 'Лікар',
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
            doctor: null,
            requests: [],
            location: null,
            isMapReady: false,
            maxDirection: null,
            waypoints: []
        }
    }

    async componentDidMount() {
        await this._retrieveUserData();
        await this.getRequests();
    }

    _retrieveUserData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                let location = await Geocoder.from(data.location);
                this.setState({
                    location: {
                        latitude: location.results[0].geometry.location.lat,
                        longitude: location.results[0].geometry.location.lng
                    },
                    doctor: data
                })
            }
        } catch (err) {
            console.log('error');
        }
    }

    findMaxDistance = (points) => {
        let maxRoute = {};
        for (let i = 0; i < points.length; i++) {
            let distance = getDistance(this.state.location, points[i].coordinates);
            maxRoute[distance.toString()] = points[i];
        }
        let maxDistance = Math.max.apply(null, Object.keys(maxRoute));
        let waypoints = points.filter(el => el._id !== maxRoute[maxDistance]._id).map(el => {
            return el.coordinates;
        });
        this.setState({
            maxDirection: maxRoute[maxDistance],
            waypoints: waypoints
        });
    }

    parseRequestsLocations = async (requests) => {
        let res = [];
        for (let i = 0; i < requests.length; i++) {
            let req = await Geocoder.from(requests[i].location);
            res.push(
                {
                    ...requests[i],
                    coordinates: {
                        latitude: req.results[0].geometry.location.lat,
                        longitude: req.results[0].geometry.location.lng
                    }
                });
        }
        if (requests.length !== 0 && res.length === requests.length) {
            this.findMaxDistance(res);
            this.setState({
                requests: res,
                isMapReady: true
            })
        }
    }

    getRequests = async () => {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            let data = JSON.parse(value);
            let requestsCriterias = {
                date: getCurrentDate(),
                area: data.area,
                doctorId: data.id
            }
            await fetch(`${url}/requests/search`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestsCriterias),
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.parseRequestsLocations(data);
            }).catch(error => {
                alert(error);
            })
        }
    }

    render() {

        return (
            this.state.isMapReady ?
                <Container>
                    {
                        this.state.location && this.state.requests && <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude,
                                latitudeDelta: DELTA.latitudeDelta,
                                longitudeDelta: DELTA.longitudeDelta
                            }}>
                            <Marker
                                coordinate={{
                                    latitude: this.state.location.latitude,
                                    longitude: this.state.location.longitude
                                }}
                                title="Поліклініка"
                            ></Marker>
                            {this.state.requests && this.state.requests.map((request, index) =>
                                <Marker
                                    key={`coordinate_${index}`}
                                    coordinate={request.coordinates}
                                    title={request.location}
                                    description={request.title}
                                ></Marker>
                            )}
                            {
                                this.state.location && this.state.requests ?
                                    <MapViewDirections
                                        origin={this.state.location}
                                        waypoints={this.state.waypoints.length !== 0 ? this.state.waypoints : []}
                                        destination={this.state.maxDirection ? this.state.maxDirection.coordinates : null}
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        strokeWidth={3}
                                        strokeColor="hotpink"
                                        onStart={(params) => {
                                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                        }}

                                        onError={(errorMessage) => {
                                            // console.log('GOT AN ERROR');
                                        }}
                                    /> : null
                            }

                        </MapView>
                    }
                </Container> :
                <Container>
                    <View style={{ alignItems: 'center', padding: 15 }}>
                        <Text>На сьогодні пацієнтів немає</Text>
                    </View>
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        height: 300,
        width: width
    }
});

export default RouteScreen;
