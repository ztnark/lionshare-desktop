import React from 'react';
import { View, Text } from 'react-native';


import styles from './FatButtonStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class FatButton extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  }

  onClick = (event) => {
    event.preventDefault();
    if (this.props.active) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <View
        className={ cx(styles.container, { active: this.props.active }) }
        onPress={ this.onClick }
      >
        <Text>{ this.props.label }</Text>
      </View>
    );
  }
}
