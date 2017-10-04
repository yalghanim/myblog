import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { observer } from "mobx-react";
import myStore from './Store';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import BlogList from './BlogList';
import Login from './Login';
import CreatePost from './CreatePost';


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
