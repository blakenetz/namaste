import React , { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

class ContactRow extends Component {
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.state = { checked: null }
  }

  handlePress(){
    this.setState({ checked: !this.state.checked })
  }

  render(){
    return (
      <ListItem title={this.props.first + " " + this.props.last}
                data-number={this.props.phone}
                subtitle={this.props.subtitle}
                hideChevron={true}
                leftIcon={ <CheckBox containerStyle={styles.checkbox}
                                     onPress={this.handlePress}
                                     checked={this.state.checked}
                                     /> }
                />
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    padding: 1,
  }
})

export default ContactRow;
