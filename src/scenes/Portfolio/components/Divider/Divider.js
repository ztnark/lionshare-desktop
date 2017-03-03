import React from 'react';
import { Flex } from 'reflexbox';

import styles from './DividerStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Divider = ({ children, onClick, active }) => (
  <Flex
    align="center"
    justify="center"
    className={ cx(styles.container, { active }) }
  >
    <View className={ cx(styles.content, { action: onClick }) } onClick={ onClick }>
      { children }
    </View>
  </Flex>
);

export default Divider;
