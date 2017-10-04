import React, { Component } from 'react';
import { Container, Form, Item, Input, Button, Text, Image, Badge } from 'native-base';
import { observer } from "mobx-react";
import auth from './auth';



export default observer(class myLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "fawaz",
      password: "adminadmin",
      };
  }

  UpdateState(e){
    this.props.username = this.state.username
    this.props.password = this.state.password
    console.log(this.state.username + '\n' + this.state.password)
  }

  ButtonPress(e){
    auth.login(this.state.username,this.state.password)
  }

  componentWillMount(){
    console.log("refreshed")
  }

  render() {
    return (
      <Container>
      <Badge info style={{ alignItems: 'center' }}>
        <Text style={{ fontFamily: "Gill Sans" }}> Login Page {"\n"} </Text>
      </Badge>
        <Form>
          <Item>
            <Input autoCapitalize="none" label='user' placeholder='user' value={this.state.username} onChangeText={text => this.setState({ username: text })} style={{fontFamily: "Gill Sans"}} />
          </Item>
          <Item>
            <Input autoCapitalize="none" secureTextEntry label='password' placeholder='password' value={this.state.password} onChangeText={text => this.setState({ password: text })} style={{fontFamily: "Gill Sans"}} />
          </Item>
          <Button
          onPress={this.ButtonPress.bind(this)}
          full Info><Text style={{fontFamily: "Gill Sans"}}>Log In</Text></Button>
        </Form>
      </Container>


    );
  }
})
