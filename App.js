import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Test from './src/components/Test'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './src/reducers/index.js'

const configureStore = () => {
  // eslint-disable-next-line no-underscore-dangle
  return createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )
}

const store = configureStore()

export default class App extends Component {
  render() {
    let pic = {
      uri:
        'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <Text>Hello, world!</Text>
          <Image source={pic} style={{ width: 193, height: 110 }} /> */}
          <Test />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
