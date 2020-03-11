import React from 'react';
import {View, Text, Button} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>This is the Home Screen</Text>
        <Button
          title="Go to profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    );
  }
}

export default HomeScreen;
