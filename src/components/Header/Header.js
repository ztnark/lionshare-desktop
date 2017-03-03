import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

import styles from './HeaderStyle';
import classNames from 'classnames/bind';

const Header = (props) => (
  <View
    align="center"
    justify="center"
    style={styles.header}
  >
    { props.children }
  </View>
);

Header.propTypes = {
  children: PropTypes.node,
  border: PropTypes.bool,
};

export default Header;
