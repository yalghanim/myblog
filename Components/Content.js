import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { observer } from "mobx-react";
import myStore from './Store';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import BlogList from './BlogList';
import Login from './Login';
import CreatePost from './CreatePost';
// import { ImageBackground, Dimensions, StyleSheet } from 'react-native';


export default observer(class MyContent extends Component {
render() {
  return (
      <NativeRouter>

      <Container>
        <Content>
        <Route exact path="/" render={ () => ( myStore.authenticated ? (
          <Redirect to="/x" /> ) : (
            <Redirect to="y" /> )
          )} />
        <Route path="/x" render={ () => <BlogList store={myStore} />} />
        <Route path="/y" render={ () => <Login store={myStore} />} />
        <Route path="/z" render={ () => <CreatePost store={myStore} />} />

        </Content>


          <Footer>
           <FooterTab>
               <Button>
                  <Link to="/x">
                   <Icon name="shuffle" />
                  </Link>
               </Button>
             <Button>
              <Link to="/y">
               <Icon name="ionic" />
               </Link>
             </Button>
             <Button>
             <Link to="/z">
               <Icon name="nutrition" />
               </Link>
             </Button>
           </FooterTab>
          </Footer>
          </Container>
        </NativeRouter>
  )
}
})

// <ImageBackground
//   source={{uri: 'https://static1.squarespace.com/static/5525bbf5e4b026f75314c09b/t/5535055ee4b0f20e2b62ace7/1429538153345/blog.jpg?format=1500w'}}
//   style={styles.backgroundImage}
// >
//
// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//     justifyContent: 'center',
//     opacity: 0.9,
//   },
// })
