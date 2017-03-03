import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { View, Text } from 'react-native';
import Svg,{
    G,
    Path,
    Polygon
} from 'react-native-svg';

import styles from './ErrorMessageStyle';

const ErrorMessage = ({ message, onRetry }) => (
  <View auto column align="center" justify="center">
    <View className={ styles.iconContainer }>
      <Svg xmlns="http://www.w3.org/2000/svg" width="79" height="66" viewBox="0 0 79 66">
        <G fill="none" fill-rule="evenodd">
          <Polygon
            stroke="#FFBD2E"
            strokeWidth="2"
            points="75.224 62.912 37.724 .412 .224 62.912"
          />
          <Path
            fill="#FFBD2E" d="M36.1446508,22.0382173 L36.4112524,42.4229829 L39.0567602,42.4229829 L39.3233618,22.0382173 L36.1446508,22.0382173 Z M37.7237524,51.8975923 C39.0977758,51.8975923 40.2051977,50.728647 40.2051977,49.2931001 C40.2051977,47.8575533 39.0977758,46.6886079 37.7237524,46.6886079 C36.349729,46.6886079 35.2423071,47.8575533 35.2423071,49.2931001 C35.2423071,50.728647 36.349729,51.8975923 37.7237524,51.8975923 Z"
          />
        </G>
      </Svg>
    </View>
    <View className={ styles.message }>
      <Text>{ message }</Text>
    </View>
    <View
      className={ styles.button }
      role="button"
      onClick={ onRetry }
    >
      <Text>Reload</Text>
    </View>
  </View>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default observer(ErrorMessage);
