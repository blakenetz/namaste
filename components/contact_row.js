import React , { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

class ContactRow extends Component {
  constructor(props){
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
    this.state = {
      checked: false
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.checkedItem.indexOf(nextState) == -1
  }


  handleCheck(){
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    const name = this.props.contactData.name.split(' ').map(function(el){
      return el.charAt(0).toUpperCase() + el.toLowerCase().slice(1)
    })
    return (
      <ListItem title={name.join(' ')}
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
