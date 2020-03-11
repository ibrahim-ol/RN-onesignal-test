import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import OneSignal from 'react-native-onesignal';

class ProfileScreen extends Component {
  constructor() {
    super();
    OneSignal.addEventListener('received', ev => {
      // console.log('received', ev);
      if (ev.isAppInFocus) {
        console.log('Coming from profile', 'App in focus show alert');
        console.log(ev.payload.additionalData);
        //at this point i will advise we check through the data target to know what the notification is for
      } else {
        console.log('Coming from profile', 'We will wait for openings');
      }
    });
    OneSignal.addEventListener('opened', ev => {
      // console.log('opened', ev);
      console.log(
        'Coming from profile',
        'check if action has been done by received if not do it here',
      );
      console.log(
        'I also noticed that when the app is opened the notification pops up an alert',
      );
    });
  }
  render() {
    return (
      <View>
        <Text>This is the Profile Screen</Text>
        <Button
          title="Go to home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default ProfileScreen;
