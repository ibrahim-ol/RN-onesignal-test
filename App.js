import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/home';
import Profile from './src/screens/profile';

import OneSignal from 'react-native-onesignal';

const Stack = createStackNavigator();
const oneSignalAppId = '46d9c8a2-a88c-49e4-86d2-93d9336c6ec4';

class App extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init(oneSignalAppId);
    OneSignal.getPermissionSubscriptionState(status => {
      console.log(status);
    });
    OneSignal.inFocusDisplaying(0);
    //the option 2 is to allow only a notification
    // the option 1 appears is the default
    //the option 0 is what i will advise we use since it won't display an alert or notification when the app is opened.
    // that means when the app is closed we can it will display a notification and we can then decide how to handle from there
    //For opening the app automatically when it is in background so that the alarm can play
    OneSignal.addEventListener('received', ev => {
      // console.log('received', ev);
      //we will save the ev.payload at this point as it looks like the one in onOpened always cause errors
      if (ev.isAppInFocus) {
        console.log('App in focus show alert');
        console.log(ev.payload.additionalData);
        this.showAlert(ev.payload.additionalData.message);
      } else {
        console.log('We will wait for openings');
      }
    });
    OneSignal.addEventListener('opened', ev => {
      // console.log('opened', ev);
      console.log(
        'check if action has been done by received if not do it here',
      );
      console.log(Object.keys(ev));
      console.log(ev.notification.payload.additionalData);
      this.showAlert(ev.notification.payload.additionalData.message);

      console.log(
        'I also noticed that when the app is opened the notification pops up an alert',
      );
    });
  }

  showAlert(message) {
    return Alert.alert('Ewa ooooo', message);
  }
  render() {
    return (
      <>
        <StackNav />
      </>
    );
  }
}

function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
