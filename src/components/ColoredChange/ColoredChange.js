import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './ColoredChangeStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const ColoredChange = ({ children, direction }) => (
  <View
    className={ cx(styles[direction]) }
  ><Text>{ children }</Text></View>
);

ColoredChange.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string.isRequired,
};

export default ColoredChange;
