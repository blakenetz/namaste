import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';

export default class App extends Component {
  state = {
    isModalVis : false,
    contactPerm : null,
  }

  async requestContactPerm(){
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    this.setState({contactPerm: permission.status})
  }

  handlePress(){
    if (this.state.contactPerm !== 'granted')
      alert("We're not the NSA! We need permission to access your contacts. Namaste!")
    else {
      contacts = Expo.Contacts.getContactsAsync({
        fields: [ Expo.Contacts.PHONE_NUMBERS ],
      });
      this.setModalVis(!this.state.isModalVis)
    }
  }

  setModalVis(vis){
    this.setState({isModalVis: vis})
  }

  render(){
    if (this.state.contactPerm !== 'granted') this.requestContactPerm()

    return (
      <View style={styles.container}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.isModalVis}
        >
       <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight onPress={() => { this.setModalVis(!this.state.isModalVis) }} >
            <Text>Hide Modal</Text>
          </TouchableHighlight>

        </View>
       </View>
      </Modal>
        <TouchableOpacity onPress={this.handlePress.bind(this)}>
          <Text style={styles.icon}>🙏</Text>
          <Text style={styles.title}>Send a Namaste</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 100,
  },

  title: {
    fontSize: 27,
  },

});

Expo.registerRootComponent(App);
