import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import ItemScreen from './screens/ItemScreen'
import CartScreen from './screens/CartScreen'
import DeliverScreen from './screens/DeliverScreen'
import DeliverDetailsScreen from './screens/DeliverDetailsScreen'
import SearchScreen from './screens/SearchScreen'
import UserScreen from './screens/UserScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { initSearchItems } from './actions/searchActions'
import { initAlgolia } from './actions/algoliaActions'
import { GoogleSignin } from '@react-native-community/google-signin'
import { getSections, selectSection } from './actions/sectionActions'
import { initializeAuth, authListenerInit } from './actions/authActions'
// import { getDeliveries } from './actions/deliverActions'
import { TransitionPresets } from '@react-navigation/stack'
import { navigationRef } from './RootNavigation'
import codePush from "react-native-code-push"

import configureStore from './store/configureStore'

GoogleSignin.configure({
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '762035873529-e48nthg8qth3qn2l74g6jtpefsi86of5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //hostedDomain: '', // specifies a hosted domain restriction
  //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
})

const store = configureStore()
const Stack = createStackNavigator()

class App extends Component {

  componentDidMount(){
    // store.dispatch(getItems())
    store.dispatch(getSections())
    store.dispatch(selectSection({google_product_category: 1}))
    store.dispatch(authListenerInit())
    store.dispatch(initAlgolia())
    store.dispatch(initSearchItems())
    // store.dispatch(initUserInfoFirebase())
    // store.dispatch(getDeliveries())
    // store.dispatch(initializeAuth())
  }

  render() {
    return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS }} />
          <Stack.Screen name="Profile" component={ItemScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}/>
          <Stack.Screen name="Cart" component={CartScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}/>
          <Stack.Screen name="Deliver" component={DeliverScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}/>
          <Stack.Screen name="DeliverDetails" component={DeliverDetailsScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}/>
          <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false, animationEnabled: false}}/>
          <Stack.Screen name="User" component={UserScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
};


const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
}

export default codePush(codePushOptions)(App)
