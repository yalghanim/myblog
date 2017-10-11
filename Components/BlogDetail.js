import React, { Component } from 'react';
import { Container, Form, Item, Input, Button, Text,
  List, ListItem, Right, Left, Body, Icon } from 'native-base';
import { Alert, View, ListView } from 'react-native';
import { observer } from "mobx-react";
import myStore from './Store';
import { CheckBox } from 'react-native-elements';
import auth from './auth';
import BlogList from './BlogList';



export default observer(class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      objectdetail: this.props.object,
      object: {},
      postcontent: "",
      author: myStore.username,
      draft: false,
      postauthor: "",
      id: "",
      comment: "",
      publish: "",
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
      };
  }

  postComment(e){
     fetch("http://139.59.119.40/api/comment/create/",{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'JWT ' + myStore.token,
      },
      body: JSON.stringify({
        "object_pk": this.state.id,
        "comment": this.state.comment,
      })}
    )
    .then((res)=>  {
        console.log(res)
        // myStore.editMode = false
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
        console.log(response.author.username);
        this.setState({object: response, id: response.id,
          slug: response.slug, title: response.title,
          draft: response.draft, postcontent: response.content, publish: response.publish,
          dataSource: this.state.dataSource.cloneWithRows(response.comments),
          postauthor: response.author.username})
      })
      .catch((error) => console.log(error)).done();
    }

    renderComment(object){
      return(
        <ListItem>
          <Left>
            <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}>
              {object.object_pk}
            </Text>
          </Left>
          <Body>
            <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}>
              {object.comment}
            </Text>
          </Body>
          <Right>
            <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}>
              {object.user}
            </Text>
          </Right>
        </ListItem>
      );
    }




  render() {
    return (
  <Container>
  <List>
              <ListItem icon>
                <Left>
                  <Text style={{fontFamily: "Gill Sans", fontSize: 14, color: 'green' }}>{this.state.id}</Text>
                </Left>
                <Body>
                  <Text style={{fontFamily: "Gill Sans", fontSize: 18, color: 'grey' }}>{this.state.author}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={{fontFamily: "Gill Sans", fontSize: 24 }}>{this.state.postcontent}</Text>
                </Body>
              </ListItem>
              <ListItem last>
              <Left>
              <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}>
              Draft Status: {this.state.draft}
              </Text>
              </Left>
              <Right>
              <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}>
              Published: {this.state.publish}
              </Text>
              </Right>
              </ListItem>
              </List>

            <Text style={{fontFamily: "Gill Sans", fontSize: 14, color: 'blue' }}>
            {"\n"}{"\n"}{"\n"}{"\t"} Comments: {"\n"}{"\n"}</Text>


            <List>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderComment.bind(this)}
            />
            </List>
            <Text> {"\n"}{"\n"}</Text>

            <Form style={{borderWidth: 1, borderColor: 'grey'}}>
            <Item>
              <Input autoCapitalize="sentences" label='comment' placeholder="Post your comment here.." value={this.state.comment} onChangeText={text => this.setState({ comment: text })} style={{fontFamily: "Gill Sans"}} />
            </Item>
            <Button
            onPress={this.postComment.bind(this)}
            full warning><Text style={{fontFamily: "Gill Sans"}}>Submit Comment</Text></Button>
            </Form>



  </Container>
  )
  }
})
