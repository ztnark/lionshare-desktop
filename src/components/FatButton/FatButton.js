import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';


import styles from './FatButtonStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class FatButton extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  }

  onPress = (event) => {
    debugger;
    event.preventDefault();
    if (this.props.active) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableHighlight
        className={ cx(styles.container, { active: this.props.active }) }
        onPress={ this.props.onPress }
      >
        <Text>{ this.props.label }</Text>
      </TouchableHighlight>
    );
  }
}
