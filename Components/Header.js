import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import auth from './auth';
import {observer} from 'mobx-react';
import myStore from './Store';


export default observer( class BlogHeader extends Component {

  BackButton(e) {
    myStore.editMode = false,
    myStore.detailMode = false
  }

  render() {
    return (


        <Header>
          <Left>
          <Button transparent
          onPress={this.BackButton.bind(this)}
          ><Text style={{fontFamily: "Gill Sans"}}>List</Text></Button>
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
