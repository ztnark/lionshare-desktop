import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { version } from '../../../package.json';

import { changeView } from '../../actions/index';


import Header, { HeaderTab, SettingsTab } from '../../components/Header';
import ErrorMessage from '../../components/ErrorMessage';

import styles from './LayoutStyle';

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    ui: React.PropTypes.object.isRequired,
    prices: React.PropTypes.array.isRequired,
    border: React.PropTypes.bool,
    footer: React.PropTypes.bool,
    alwaysLoad: React.PropTypes.bool,
    title: React.PropTypes.string,
  }

  onClickPrices = () => this.props.changeView('prices')
  onClickPortfolio = () => this.props.changeView('portfolio')
  onClickSettings = () => this.props.changeView('settings')
  // const openDonateLink = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop#donate');
  // const openVersionLink = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop/releases');

  render(){
    return (
      <View>
        <Header
          border={ true }
          onClickSettings={ this.onClickSettings }
        >
          <HeaderTab
            onPress={ this.onClickPrices }
            label="Prices"
            active={ this.props.ui.view === 'prices' }
          />
          <HeaderTab
            onPress={ this.onClickPortfolio }
            label="Portfolio"
            active={ this.props.ui.view === 'portfolio' }
          />
          <SettingsTab
            onPress={ this.onClickSettings }
            active={ this.props.ui.view === 'settings' }
          />
        </Header>
        <View>
        { this.props.prices.error && !alwaysLoad ? (
          <ErrorMessage
            message={ this.props.prices.error }
            onRetry={ this.props.prices.fetchData }
          />
        ) : this.props.children }
        </View>
      </View>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeView }, dispatch);
}

export default connect(null, mapDispatchToProps)(Layout);
