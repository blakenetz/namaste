import Expo, { Font, Contacts, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity, Modal, Image } from 'react-native';
import { Button } from 'react-native-elements';

import ContactList from './components/contact_list';

export default class App extends Component {
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.getContacts = this.getContacts.bind(this)
    this.requestContactPerm = this.requestContactPerm.bind(this)
    this.formatContacts = this.formatContacts.bind(this)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      fontLoaded: false,
      contactsVis: false,
      contactPerm : null,
      contactsFull: null,
      contactsData: null,
      searchitem: null,
      ds: ds,
    }
  }

  async requestContactPerm(){
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({contactPerm: permission.status})
    this.getContacts()
  }

  async getContacts(){
    const contactsFull = await Contacts.getContactsAsync({
      fields: [ Contacts.PHONE_NUMBERS ],
      pageSize: 10000,
    });
    const contacts = contactsFull.data.filter((contact) => {
      return contact.phoneNumbers.length > 0;
    })
    const formattedContacts = this.formatContacts(contacts)
    this.setState({
      contactsFull: contactsFull.data,
      contactsData: this.state.ds.cloneWithRows(formattedContacts)
    })
  }

  formatContacts(contacts){
    return contacts.map((contact) => {
      const firstName = contact.firstName.charAt(0).toUpperCase() + contact.firstName.toLowerCase().slice(1)
      const lastName = contact.lastName.charAt(0).toUpperCase() + contact.lastName.toLowerCase().slice(1)
      for (var i = 0; i < contact.phoneNumbers.length; i++) {
        const label = contact.phoneNumbers[i].label ? contact.phoneNumbers[i].label : 'mobile';
        const number = contact.phoneNumbers[i].number.replace(/[^0-9]*/g, '');
        return {
          first: firstName,
          last: lastName,
          subtitle: label,
          phone: number,
        }
      }
    })
  }

  handlePress(){
    if (this.state.contactPerm !== 'granted') {
      alert("We're not the NSA! We need permission to access your contacts. Namaste!")
      this.requestContactPerm()
    } else {
      this.setState({contactsVis: true})
    }
  }

  handleSearch(name){
    const contacts = this.state.contactsFull.filter((contact) => {
      return (contact.name.indexOf(name) != -1)
    })
    const formattedContacts = this.formatContacts(contacts)
    this.setState({
      searchitem: name,
      contactsData: this.state.ds.cloneWithRows(formattedContacts)
    })
  }

  handleClose(){
    this.setState({
      contactsVis: false,
      searchitem: null,
    })
  }

  componentWillMount(){
    if (this.state.contactPerm !== 'granted') this.requestContactPerm()
    else if (this.state.contactsData === null) this.getContacts()
  }

  async componentDidMount(){
    await Font.loadAsync({
      'Prisma': require('./assets/fonts/Prisma.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render(){
    return (
      <Image source={require('./assets/images/budda.png')} style={styles.bgImage} >
        <Modal animationType={"slide"} transparent={false} visible={this.state.contactsVis} >
          <ContactList contacts={this.state.contactsData}
                        handleSearch={this.handleSearch}
                        handleClose={this.handleClose}
                        />
        </Modal>

        { this.state.fontLoaded ?
          <Button raised
                  title="Send a Namaste"
                  onPress={this.handlePress}
                  fontSize={30}
                  fontFamily="Prisma"
                  backgroundColor="rgba(255, 255, 255, 0.8)"
                  color="#000"
                  containerViewStyle={styles.button}
                  />
          : null
        }
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#FFF8C6',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    bottom: 75,
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 2,
  }
});

Expo.registerRootComponent(App);
