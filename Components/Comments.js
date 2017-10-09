import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button, Fab, Icon } from 'native-base';
import { Card, CardItem, Body, Left, Thumbnail } from 'native-base';
import { ListView, Image } from 'react-native';
import myStore from './Store';
import {observer} from 'mobx-react';
import EditPost from './EditPost';

export default observer(class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: this.props.comments,
    }

  componentWillMount(){
    console.log("comments")
  }


      // EditMode(object) {
      //     this.setState({
      //     object: object,
      //   })
      //   myStore.editMode = true
      // }



// renderItem(object){
//   return(
//     <ListItem>
//       <Card>
//             <CardItem>
//               <Left>
//               <Button success onPress={() => this.EditMode(object)}>
//                 <Text style={{fontFamily: "Gill Sans"}}>{object.id}</Text>
//                 </Button>
//                 <Body>
//                   <Text style={{fontFamily: "Gill Sans"}}>{object.title}</Text>
//                   <Text note style={{fontFamily: "Gill Sans"}}>{object.publish}</Text>
//                 </Body>
//               </Left>
//             </CardItem>
//             <CardItem cardBody>
//             <Text style={{fontFamily: "Gill Sans"}}>
//              {object.detail}
//              </Text>
//             </CardItem>
//           </Card>
//     </ListItem>
//   );
// }



  render() {
    if (myStore.authenticated && !myStore.editMode) {
    return (
      <Container>

      <Text style={{fontFamily: "Gill Sans"}}>
        {"\n"}{"\n"}{"\n"}{"\n"}
      </Text>

      <List>
        <ListView
          dataSource={this.state.comments}
          renderRow={this.renderItem.bind(this)}
        />
      </List>

      <Fab
      direction="down"
      style={{ backgroundColor: '#5067FF' }}
      position="topRight"
      onPress={this.Pagination.bind(this)}>
      <Text style={{fontFamily: "Gill Sans", fontSize: 14 }}> View/Edit </Text>
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
