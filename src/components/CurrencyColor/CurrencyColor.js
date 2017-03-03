import React from 'react';
import { View } from 'react-native';
import styles from './CurrencyColorStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


const CurrencyColor = ({ color, className }) => (
  <View
    style={ [styles.container, { "backgroundColor": color }] }
  ></View>
);

export default CurrencyColor;
