import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class Row extends Component {
  render(){
    return (
      <View>
        <Text style={styles.name}>{this.props.first} {this.props.last}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 35,
  }
})

export default Row;
