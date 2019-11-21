import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { url } from '../../main';
import { getCurrentDate, convertUnixToDate } from '../../assets/utils';
import requestIcon from '../../assets/request.png';

class RatingDoctorsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      doctors: []
    }
  }

  async componentDidMount() {
    await this.searchRequests();
    await this.searchDoctors();
  }

  searchRequests = async () => {
    const value = await AsyncStorage.getItem('user');
    const data = JSON.parse(value);
    fetch(`${url}/requests/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ area: data.area }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({
        requests: data
      })
    }).catch(error => {
      alert(error);
    })
  }

  searchDoctors = async () => {
    const value = await AsyncStorage.getItem('user');
    const data = JSON.parse(value);
    fetch(`${url}/users/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ area: data.area, role: "doctor" }),
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

  findDoctor = (id) => {
    let doctor = this.state.doctors.find(el => el._id === id);
    if(doctor){
      return doctor.name;
    }
  }

  render() {
    return (
      <Container>
                <Content>
                    <List>
                        {
                            (this.state.requests && this.state.doctors) && this.state.requests.map(el => {
                                return (
                                  <ListItem avatar key={el._id}>
                                  <Left>
                                      <Thumbnail source={requestIcon} />
                                  </Left>
                                  <Body>
                                      <Text>{this.state.doctors && this.findDoctor(el.doctorId)}</Text>
                                      <Text style={{ fontStyle: 'italic' }}>{el.comment ? el.comment : "Коментар відсутній"}</Text>
                                <Text style={{ fontStyle: 'italic' }}>{"Оцінка пацієнта: "  }{el.evaluation && el.evaluation}/5</Text>
                                  </Body>
                                  <Right>
                                      <Text note>{convertUnixToDate(el.date)}</Text>
                                  </Right>
                              </ListItem>
                                )
                            })
                        }

                    </List>
                </Content>
                {/* <ModalExample /> */}
            </Container>
    );
  }
}

export default RatingDoctorsScreen;