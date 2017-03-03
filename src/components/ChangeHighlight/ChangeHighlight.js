import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './ChangeHighlightStyle';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class ChangeHighlight extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    trigger: PropTypes.any.isRequired,
  }

  state = {
    highlight: false,
    direction: null,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trigger !== nextProps.trigger) {
      this.setState({
        highlight: true,
        direction: parseFloat(nextProps.trigger) > parseFloat(this.props.trigger) ? 'up' : 'down',
      });
      setTimeout(() => this.setState({ highlight: false }), 2500);
    }
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      highlight,
      direction,
    } = this.state;

    return (
      <View
        className={ cx(styles.number, { [`${direction}Highlight`]: highlight })}
      ><Text>{ children }</Text></View>
    );
  }
}

export default ChangeHighlight;
