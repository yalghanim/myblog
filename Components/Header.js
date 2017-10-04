import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import auth from './auth';
import {observer} from 'mobx-react';

export default observer( class BlogHeader extends Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent>
              <Text> </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{fontFamily: "Gill Sans"}}>F&Y Blog</Title>
          </Body>
          <Right>
            <Button transparent onPress={auth.logout.bind(this)}>
              <Text style={{fontFamily: "Gill Sans"}}>Log Out</Text>
            </Button>
          </Right>
        </Header>
    );
  }
}
)
