import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ListView, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';

import Row from './components/row';

export default class App extends Component {
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.renderModal = this.renderModal.bind(this)
    this.getContacts = this.getContacts.bind(this)
    this.requestContactPerm = this.requestContactPerm.bind(this)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      isModalVis : false,
      contactPerm : null,
      searchitem : null,
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
      this.renderModal();
      this.setModalVis(!this.state.isModalVis);
    }
  }

  async getContacts(){
    const contactsFull = await Expo.Contacts.getContactsAsync({
      fields: [ Expo.Contacts.PHONE_NUMBERS ]
    });
    contacts = contactsFull.data.filter(function(contact){
      return contact.phoneNumbers.length > 0;
    }).map(function(contact){
      return {
        first: contact.firstName.toLowerCase().charAt(0).toUpperCase(),
        last: contacts.lastName.toLowerCase().charAt(0).toUpperCase(), 
      }
    })
    this.setState({ contactData: this.state.ds.cloneWithRows(contacts) })
  }

  componentWillMount(){
    if (this.state.contactPerm !== 'granted') this.requestContactPerm()
    else if (this.state.contactData === null) this.getContacts()
  }


  setModalVis(vis){
    this.setState({isModalVis: vis})
  }

  renderModal(){
    if (this.state.contactData === null) {
      return (
        <View style={styles.modalError}>
          <Text>🤔 Having some trubs getting your contacts.</Text>
          <Text>Let's try this again. Namaste 🙏</Text>
          <TouchableHighlight onPress={() => { this.setModalVis(!this.state.isModalVis) }} >
            <Text>Close</Text>
          </TouchableHighlight>
        </View>
      )
    } else return (
      <View style={styles.modalSuccess}>
        <TextInput onChangeText={(searchitem) => this.setState({searchitem})}
                   value={this.state.searchitem}
                   style={styles.searchBar}
                   />
        <ListView dataSource={this.state.contactData}
                  renderRow={(data) => <Row {...data} />}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  />
        <TouchableHighlight onPress={() => { this.setModalVis(!this.state.isModalVis) }} >
          <Text>Close</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>

        <Modal animationType={"slide"}
               transparent={false}
               visible={this.state.isModalVis} >
          { this.renderModal() }
        </Modal>

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
  modalError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 30,
  },
  modalSuccess: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
    height: '90%',
  },
  searchBar: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    height: 30,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

Expo.registerRootComponent(App);
