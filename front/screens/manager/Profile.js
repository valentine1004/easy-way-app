import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';
import { url } from '../../main';
import doctorIcon from '../../assets/male_dr.jpg';

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    }
  }

  async componentDidMount() {
    await this.searchDoctors();
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

  handlerLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
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
                      <Text note>{item.description}</Text>
                    </Body>
                  </ListItem>
                )
              })
            }

          </List>
        </Content>
        <View style={{ padding: 15 }}>
          <Button title="Вийти з системи" onPress={this.handlerLogout}></Button>
        </View>
        {/* <ModalExample /> */}
      </Container>
    );
  }
}

export default ProfileScreen;