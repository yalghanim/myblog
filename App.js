import React from 'react';
import { observer } from "mobx-react";
import { View } from 'react-native';
import { Container, Text } from 'native-base';
import BlogHeader from './Components/Header'
import MyContent from './Components/Content'
import Login from './Components/Login'
import myStore from './Components/Store';


export default observer(class App extends React.Component {

  render() {

  if (!myStore.authenticated) {
      return(
        <Container>
        <Text> {"\n"}{"\n"}{"\n"} </Text>
        <Login store={myStore} />
        </Container>
      )
    } else {
    return (
      <Container>
      <BlogHeader />
      <MyContent store={myStore} />
      </Container>
    );
  }
}
})

// const styles = StyleSheet.create({
//   container: {
//     fontFamily: "Gill Sans",
//     fontSize: 20,
//   },
// });
