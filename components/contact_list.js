import React, { Component } from 'react';
import { StyleSheet, Modal, View, Text, ListView, Dimensions } from 'react-native';
import { List, SearchBar, Button } from 'react-native-elements';
import Communications, { text } from 'react-native-communications';

import ContactRow from './contact_row';

class ContactList extends Component {
  constructor(props){
    super(props)
    this.handleSend = this.handleSend.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      searchitem: null,
      contacts: props.contacts,
      selectedContacts: [],
    }
  }

  handleSend(){
    console.log('handleSend')
  }

  handleSelect(e){
    console.log('handleSelect')
    console.log(e)
    this.setState((prevState, props) => {

    })
  }

  componentWillReceiveProps(props){
    this.setState({
      isVisable: props.isVisable,
      contacts: props.contacts,
    })
  }

  render() {
    if (this.state.contacts === null) {
      return (
        <View style={styles.modalError}>
          <Text>🤔 Having some trubs getting your contacts.</Text>
          <Text>Let's try this again. Namaste 🙏</Text>
          <TouchableHighlight onPress={this.handlePress} >
            <Text>Close</Text>
          </TouchableHighlight>
        </View>
      )
    } else return (
      <View style={styles.modalSuccess}>
        <SearchBar onChangeText={this.props.handleSearch} placeholder="Search" />

        <List>
          <ListView dataSource={this.state.contacts}
                    renderRow={(data) => <ContactRow contactData={data}
                                                      handleSelect={this.handleSelect} /> }
                    renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
                    enableEmptySections={true}
                    />
        </List>
        <View style={styles.buttonContainer}>
          <Button raised
                  title="Cancel"
                  onPress={this.props.handleClose}
                  fontSize={30}
                  fontFamily="Prisma"
                  backgroundColor="#303337"
                  color="#86939e"
                  containerViewStyle={styles.button}
                  />
          <Button raised
                  title="Send"
                  onPress={this.handleSend}
                  fontSize={30}
                  fontFamily="Prisma"
                  backgroundColor="#303337"
                  color="#86939e"
                  containerViewStyle={styles.button}
                  />
        </View>
      </View>
    )
  }
}

const ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  modalError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  modalSuccess: {
    flex: 2,
    justifyContent: 'center',
    top: 100,
    bottom: 0,
  },
  searchBar: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    height: 30,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  buttonContainer: {
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#43484d',
  },
  button: {
    margin: 8
  }
})

export default ContactList;
