import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { Card, CardItem, Body, Left, Thumbnail } from 'native-base';
import { ListView, Image } from 'react-native';
import myStore from './Store';
import {observer} from 'mobx-react';

export default observer(class BlogList extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: "https://api.github.com/events",
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row !== row2,
      })
    }
  }

  componentWillMount(){
    this.fetchdata();
  }
  fetchdata(){
    fetch(this.state.url)
    .then((response) => response.json())
    .then((response) => {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(response)})
    })
    .catch((error) => console.log(error)).done();
  }



renderItem(object){
  return(
    <ListItem>
      <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: object.actor.avatar_url }} />
                <Body>
                  <Text style={{fontFamily: "Gill Sans"}}>{object.actor.display_login}</Text>
                  <Text note style={{fontFamily: "Gill Sans"}}>{object.repo.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Text style={{fontFamily: "Gill Sans"}}>
             {object.repo.name}
             </Text>
            </CardItem>
          </Card>
    </ListItem>
  )

}

  render() {
    if (myStore.authenticated) {
    return (
      <Container>
      <List>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
        />
      </List>
      </Container>
    );
  } else {
    return (
      <Container>
      <Text style={{fontFamily: "Gill Sans"}}>
        Log In first!
      </Text>
      </Container>
    );
  }
}
}
)
