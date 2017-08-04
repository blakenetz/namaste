import React, { Component } from 'react';
import { StyleSheet, Modal, View, Text, ListView } from 'react-native';
import { List, SearchBar, Icon, Button } from 'react-native-elements';
import Communications, { text } from 'react-native-communications';

import ContactRow from './contact_row';

class ContactList extends Component {
  constructor(props){
    super(props)
    this.handleSend = this.handleSend.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      contacts: props.contacts,
      selectedContacts: []
    }
  }

  handleSend(){
    text(this.state.selectedContacts.pop(), 'namaste 🙏')
  }

  handleSelect(e, num){
    const selectedContacts = this.state.selectedContacts
    const i = selectedContacts.indexOf(num)
    if (i === -1) selectedContacts.push(num)
    else selectedContacts.splice(i, 1)
    this.setState({ selectedContacts: selectedContacts })
  }

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  componentWillReceiveProps(props){
    this.setState({ contacts: props.contacts })
  }

  renderRow(data, sID, rID){
    return (
      <ContactRow contactData={data}
                  handleSelect={this.handleSelect}
                  checkedItem={this.state.selectedContacts}
                  row={rID}/>
    )
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

        <List style={styles.list}>
          <ListView dataSource={this.state.contacts}
                    renderRow={this.renderRow}
                    renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
                    enableEmptySections={true}
                    />
        </List>
        <View style={styles.buttonContainer}>
          <Icon name="chevron-circle-left"
                type="font-awesome"
                onPress={this.props.handleClose}
                color="#86939e"
                iconStyle={styles.icon}
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

const styles = StyleSheet.create({
  modalError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    height: 100
  },
  modalSuccess: {
    flex: 2,
    justifyContent: 'center',
    top: 100,
    bottom: 0,
  },
  list: {
    height: '100%',
  },
  searchBar: {
    width: '100%',
    height: 30,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  buttonContainer: {
    bottom: 155,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#43484d',
  },
  button: {
    margin: 8,
    width: 200,
  },
  icon: {
    margin: 0,
  }

})

export default ContactList;
