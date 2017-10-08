import React, { Component } from 'react';
import { Container, Form, Item, Input, Button, Text } from 'native-base';
import { observer } from "mobx-react";
import auth from './auth';
import Spinner from './Spinner';
import myStore from './Store';
import { CheckBox } from 'react-native-elements';



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

  // ButtonPress(e){
  //   this.createPost(title,author,postcontent,draft)
  // }




  createPost(e){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = yyyy+'-'+mm+'-'+dd;

     fetch("http://139.59.119.40/api/create/",{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'JWT ' + myStore.token,
      },
      body: JSON.stringify({
        "title": this.state.title,
        "content": this.state.postcontent,
        "draft": this.state.draft,
        "publish": today
      })}

    ).then((res)=> res.json())
    .then((res)=>  {
        console.log(res)
      }).catch((error)=> console.log(error)).done();

    }


  componentDidMount() {
  var self = this;
  setTimeout(() => {
    self.setState({loading: true}); }, 1200);
  }

  DraftControl() {
    this.setState({ draft: !this.state.draft })
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
    <Container style={{alignSelf: 'stretch'}}>
    <Text style={{ color: 'red'}}> Create a blog post {"\n"} </Text>
      <Form>
        <Item>
          <Input label='title' placeholder='title' value={this.state.title} onChangeText={text => this.setState({ title: text })} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Input disabled label='author' placeholder={this.state.author} value={this.state.author} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Input autoCapitalize="sentences" label='postcontent' placeholder='content' value={this.state.postcontent} onChangeText={text => this.setState({ postcontent: text })} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
        <CheckBox
        title='Draft'
        checked={this.state.draft}
        onIconPress={this.DraftControl.bind(this)} />
        </Item>
        <Button
        onPress={this.createPost.bind(this)}
        full primary><Text style={{fontFamily: "Gill Sans"}}>Create</Text></Button>
      </Form>
    </Container>
  )
}
}
})

// <Input autoCapitalize="none" label='draft' placeholder='draft' value={this.state.draft} onChangeText={text => this.setState({ draft: text })} style={{fontFamily: "Gill Sans"}} />
