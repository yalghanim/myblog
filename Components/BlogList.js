import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button, Fab, Icon } from 'native-base';
import { Card, CardItem, Body, Left, Thumbnail } from 'native-base';
import { ListView, Image } from 'react-native';
import myStore from './Store';
import {observer} from 'mobx-react';
import EditPost from './EditPost';

export default observer(class BlogList extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: "http://139.59.119.40/api/list/?format=json",
      editMode: false,
      object: this.object,
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
      pagination: "",
      paginationprevious: "",
    }
    this.EditMode = this.EditMode.bind(this);
  }

  componentWillMount(){
    this.fetchdata();
  }
  fetchdata(){
    fetch(this.state.url)
    .then((response) => response.json())
    .then((response) => {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(response.results)})
      this.setState({pagination: response.next})
      this.setState({paginationprevious: response.previous})
    })
    .catch((error) => console.log(error)).done();
  }

  Pagination(e) {
      var paginator = this.state.pagination
      this.setState({
        url: paginator,
      })
      this.fetchdata()
    }

    PaginationPrevious(e) {
        var paginator = this.state.paginationprevious
        this.setState({
          url: paginator,
        })
        this.fetchdata()
      }

      EditMode(object) {
          this.setState({
          object: object,
        })
        myStore.editMode = true
      }



renderItem(object){
  return(
    <ListItem>
      <Card>
            <CardItem>
              <Left>
              <Button success onPress={() => this.EditMode(object)}>
                <Text style={{fontFamily: "Gill Sans"}}>{object.id}</Text>
                </Button>
                <Body>
                  <Text style={{fontFamily: "Gill Sans"}}>{object.title}</Text>
                  <Text note style={{fontFamily: "Gill Sans"}}>{object.publish}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Text style={{fontFamily: "Gill Sans"}}>
             {object.detail}
             </Text>
            </CardItem>
          </Card>
    </ListItem>
  );
}



  render() {
    if (myStore.authenticated && !myStore.editMode) {
    return (
      <Container>

      <Text style={{fontFamily: "Gill Sans"}}>
        {"\n"}{"\n"}{"\n"}{"\n"}
      </Text>

      <List>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
        />
      </List>

      <Fab
      direction="down"
      style={{ backgroundColor: '#5067FF' }}
      position="topRight"
      onPress={this.Pagination.bind(this)}>
      <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}> Next 5 </Text>
      </Fab>

      <Fab
      direction="up"
      style={{ backgroundColor: '#5067FF' }}
      position="topLeft"
      onPress={this.PaginationPrevious.bind(this)}>
      <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}> Prev 5 </Text>
      </Fab>

      </Container>
    );
  } else if (myStore.authenticated && myStore.editMode) {
    return(
      <EditPost object={this.state.object.detail}/>
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
