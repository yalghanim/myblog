import React, { Component } from 'react';
import { Container, Form, Item, Input, Button, Text, Radio } from 'native-base';
import { observer } from "mobx-react";
import auth from './auth';
import Spinner from './Spinner';
import myStore from './Store';



export default observer(class myLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      postcontent: "",
      author: myStore.username,
      draft: false,
      };
  }



  ButtonPress(e){
    console.log("pressed")
  }

  componentDidMount() {
  var self = this;
  setTimeout(() => {
    self.setState({loading: true}); }, 1200);
  }


  render() {
    if (!this.state.loading) {
      return (
        <Spinner />
      )
    } else if (!myStore.authenticated) {
    return (
      <Container>
            <Text style={{fontFamily: "Gill Sans"}}>  Log in first! </Text>
      </Container>
    )
  } else {
  return (
    <Container>
    <Text style={{ color: 'red'}}> Create a blog post {"\n"} </Text>
      <Form>
        <Item>
          <Input label='title' placeholder='title' value={this.state.title} onChangeText={text => this.setState({ title: text })} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Input disabled label='author' placeholder={this.state.author} value={this.state.author} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Input autoCapitalize="sentences" label='postcontent' placeholder='content' value={this.state.postcontent} onChangeText={text => this.setState({ content: text })} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Radio selected={this.state.draft} />
        </Item>
        <Button
        onPress={this.ButtonPress.bind(this)}
        full primary><Text style={{fontFamily: "Gill Sans"}}>Create</Text></Button>
      </Form>
    </Container>
  )
}
}
})

// <Input autoCapitalize="none" label='draft' placeholder='draft' value={this.state.draft} onChangeText={text => this.setState({ draft: text })} style={{fontFamily: "Gill Sans"}} />
