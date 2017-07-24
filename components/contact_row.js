import React , { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

class ContactRow extends Component {
  constructor(props){
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = { checked: null }
  }

  handleSelect(){
    this.setState({ checked: !this.state.checked })
  }

  render(){
    return (
      <ListItem title={this.props.contactData.first + " " + this.props.contactData.last}
                data-number={this.props.contactData.phone}
                subtitle={this.props.contactData.subtitle}
                hideChevron={true}
                onPress={this.props.handleSelect}
                leftIcon={ <CheckBox containerStyle={styles.checkbox} checked={this.state.checked} /> }
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
