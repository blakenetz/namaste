import React , { Component } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

class ContactRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      checked: props.checkedItem.indexOf(props.contactData.phone) === -1 ? false : true
    }
  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps')
    this.setState({
      checked: props.checkedItem.indexOf(props.contactData.phone) === -1 ? false : true
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    console.log(nextProps, nextState);
  }

  render(){
    return (
      <ListItem title={this.props.contactData.first + " " + this.props.contactData.last}
                subtitle={this.props.contactData.subtitle}
                hideChevron={true}
                onPress={(e) => {this.props.handleSelect(e, this.props.contactData.phone)}}
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
