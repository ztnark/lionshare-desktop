import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './HeaderStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const HeaderTab = (props) => (
  <TouchableHighlight
    onPress={ props.onPress }
    style={ styles.headerTab}
  >
    <Text
    style={styles.text}>{ props.label }</Text>
  </TouchableHighlight>
);

HeaderTab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export default HeaderTab;
