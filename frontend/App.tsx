// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.ts to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import { Navigation } from 'react-native-navigation';
import ApolloAndReduxProvider from './apollo-and-redux-provider';
import {
  AUTH_SCREEN,
  TOP_SCREEN
} from './src/constants/screens';

import AuthScreen from './src/screens/Auth/Auth';
import TopScreen from './src/screens/Top/Top';
import configureStore from './src/store/configureStore';
const store = configureStore();


Navigation.registerComponent(
  AUTH_SCREEN,
  () => ApolloAndReduxProvider(
    AuthScreen,
    store
  )
);

Navigation.registerComponent(
  TOP_SCREEN,
  () => ApolloAndReduxProvider(
    TopScreen,
    store
  )
);

Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH_SCREEN,
    title: "Login"
  }
})
