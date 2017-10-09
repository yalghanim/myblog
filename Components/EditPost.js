import React, { Component } from 'react';
import { Container, Form, Item, Input, Button, Text } from 'native-base';
import { Alert } from 'react-native';
import { observer } from "mobx-react";
import myStore from './Store';
import { CheckBox } from 'react-native-elements';
import auth from './auth';
import BlogList from './BlogList';



export default observer(class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      objectdetail: this.props.object,
      object: {},
      postcontent: "",
      author: myStore.username,
      draft: false,
      comments: [],
      };
      // this.DeletePost = () => this.DeletePost();
      this.DeletePost = this.DeletePost.bind(this);
  }

  updatePost(e){
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
     fetch("http://139.59.119.40/api/update/"+this.state.object.slug+"/",{
      method: 'PUT',
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
    )
    .then((res)=>  {
        console.log(res)
        myStore.editMode = false
      }).catch((error)=> console.log(error)).done();

    }

    componentWillMount(){
      this.fetchdata();
    }

    fetchdata() {
      fetch(this.state.objectdetail)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({object: response,
          slug: response.slug, title: response.title,
          draft: response.draft, postcontent: response.content, comments: response.comments})
      })
      .catch((error) => console.log(error)).done();
      console.log(this.state.comments);
    }

  DraftControl() {
    this.setState({ draft: !this.state.draft })
  }


  AlertPost(e){
    Alert.alert(
    'Delete' + ' post #' + this.state.object.id,
    'Are you sure you want to delete?',
      [
    {text: 'Delete', onPress: () => {this.DeletePost}},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

    DeletePost(e){
      console.log(myStore.alert);
      fetch("http://139.59.119.40/api/update/"+this.state.object.slug+"/",{
      method: 'DELETE',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'JWT ' + myStore.token,
      }
    }
    )
    .then((res)=>  {
        console.log(res)
        myStore.editMode = false
        myStore.modal = 0
        console.log(myStore.alert)
      }).catch((error)=> console.log(error)).done();
    }


  render() {
  return (
    <Container style={{alignSelf: 'stretch'}}>
    <Text style={{ color: 'red'}}> {"\n"} Edit blog post #{this.state.object.id} {"\n"} </Text>
      <Form>
        <Item>
          <Input label='title' placeholder={this.state.title} value={this.state.title} onChangeText={text => this.setState({ title: text })} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Input disabled label='author' placeholder={this.state.author} value={this.state.author} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
          <Input autoCapitalize="sentences" label='postcontent' placeholder={this.state.postcontent} value={this.state.postcontent} onChangeText={text => this.setState({ postcontent: text })} style={{fontFamily: "Gill Sans"}} />
        </Item>
        <Item>
        <CheckBox
        title='Draft'
        checked={this.state.draft}
        onIconPress={this.DraftControl.bind(this)} />
        </Item>
        <Button
        onPress={this.updatePost.bind(this)}
        full primary><Text style={{fontFamily: "Gill Sans"}}>Submit Edit</Text></Button>
        <Button
        onPress={this.AlertPost.bind(this)}
        full danger><Text style={{fontFamily: "Gill Sans"}}>Delete</Text></Button>
      </Form>
    </Container>
  )
}
})
