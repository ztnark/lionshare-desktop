import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './DividerStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Divider = ({ children, onPress, active }) => (
  <View
    style={{flexDirection: 'row', flexShrink: 0}}
  >
    <View style={styles.line}>
    </View>
    <View>
      <TouchableHighlight style={ styles.content } onPress={ onPress }>
        <Text style={ styles.contentFont}>{ children }</Text>
      </TouchableHighlight>
    </View>
    <View style={styles.line}>
    </View>
  </View>
);

export default Divider;
