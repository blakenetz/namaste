import React , { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

class ContactRow extends Component {
  constructor(props){
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
    this.state = {
      checked: false
    }
  }

  handleCheck(){
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    return (
      <ListItem title={this.props.contactData.first + " " + this.props.contactData.last}
                subtitle={this.props.contactData.subtitle}
                hideChevron={true}
                onPress={(e) => {
                  this.handleCheck()
                  this.props.handleSelect(e, this.props.contactData.phone)
                }}
                row={this.props.key}
                leftIcon={<CheckBox containerStyle={styles.checkbox} checked={this.state.checked} />}
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
