import React, { PropTypes } from 'react';

import styles from './InputStyle';

const Input = (props) => (
  <input { ...props } className={ styles[props.type] } />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Input;
