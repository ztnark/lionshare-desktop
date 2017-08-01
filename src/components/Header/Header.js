import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './HeaderStyle';
import classNames from 'classnames/bind';

const Header = (props) => (
  <View
    align="center"
    justify="center"
    style={styles.header}
  >
    <Image style={{width: 25, height: 25, margin: 5}} source={require('../../assets/icon.png')}/>
  </View>
);

Header.propTypes = {
  children: PropTypes.node,
  border: PropTypes.bool,
};

export default Header;
