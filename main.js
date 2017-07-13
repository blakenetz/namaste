import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ListView, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';

import ContactList from './components/contact_list';

export default class App extends Component {
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.getContacts = this.getContacts.bind(this)
    this.requestContactPerm = this.requestContactPerm.bind(this)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      contactVis: false,
      contactPerm : null,
      contactData: null,
      ds: ds,
    }
  }

  async requestContactPerm(){
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    this.setState({contactPerm: permission.status})
    this.getContacts()
  }

  async handlePress(){
    if (this.state.contactPerm !== 'granted') {
      alert("We're not the NSA! We need permission to access your contacts. Namaste!")
      this.requestContactPerm()
    } else {
      this.setState({contactVis: true})
    }
  }

  async getContacts(){
    const contactsFull = await Expo.Contacts.getContactsAsync({
      fields: [ Expo.Contacts.PHONE_NUMBERS ]
    });
    const contacts = contactsFull.data.filter((contact) => {
      return contact.phoneNumbers.length > 0;
    }).map((contact) => {
      return {
        first: contact.firstName.charAt(0).toUpperCase() + contact.firstName.toLowerCase().slice(1),
        last: contact.lastName.charAt(0).toUpperCase() + contact.lastName.toLowerCase().slice(1),
      }
    })
    this.setState({ contactData: this.state.ds.cloneWithRows(contacts) })
  }

  componentWillMount(){
    if (this.state.contactPerm !== 'granted') this.requestContactPerm()
    else if (this.state.contactData === null) this.getContacts()
  }

  render(){
    return (
      <View style={styles.container}>

        { this.state.contactVis
          ? <ContactList isVisable={this.state.contactVis} contacts={this.state.contactData} />
          : null
        }

        <TouchableOpacity onPress={this.handlePress}>
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
