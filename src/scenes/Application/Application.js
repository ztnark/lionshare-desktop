import React, { PropTypes } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { connect } from 'react-redux';


import Prices from '../../scenes/Prices/index';
import Portfolio from '../../scenes/Portfolio/index';
import Settings from '../../scenes/Settings/index';

class Application extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
  }

  renderView = () => {
    this.props.ui.view = "portfolio";
    switch (this.props.ui.view) {
      case 'prices':
        return <Prices prices={this.props.prices} ui={this.props.ui}/>;
      case 'portfolio':
        return <Portfolio prices={this.props.prices} ui={this.props.ui}/>;
      case 'settings':
        return <Settings />;
      default:
        // no-op
    }
  }

  render() {
    return (
      <View>
        { this.renderView() }
      </View>
    );
  }

}

const mapStateToProps = state => {
  return { prices: state.prices, ui: state.ui };
};

export default connect(mapStateToProps)(Application);
