import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ContactRow = (contact) => (
  <View>
    {console.log(contact)}
    <Text style={styles.name}>{contact.first} {contact.last}</Text>
  </View>
)

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    padding: 10,
  }
})

export default ContactRow;
