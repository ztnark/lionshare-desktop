import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { version } from '../../../package.json';

import { changeView } from '../../actions/index';


import Header, { HeaderTab, SettingsTab } from '../../components/Header';
import ErrorMessage from '../../components/ErrorMessage';

import styles from './LayoutStyle';

const Layout = ({
  ui,
  prices,
  children,
  footer,
  alwaysLoad,
  border = true,
}) => {
  const onClickPrices = () => changeView('prices');
  const onClickPortfolio = () => changeView('portfolio');
  const onClickSettings = () => changeView('settings');
  // const openDonateLink = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop#donate');
  // const openVersionLink = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop/releases');

  return (

    <View>
      <Header
        border={ border }
        onClickSettings={ onClickSettings }
      >
        <HeaderTab
          onPress={ onClickPrices }
          label="Prices"
          active={ ui.view === 'prices' }
        />
        <HeaderTab
          onPress={ onClickPortfolio }
          label="Portfolio"
          active={ ui.view === 'portfolio' }
        />
        <SettingsTab
          onPress={ onClickSettings }
          active={ ui.view === 'settings' }
        />
      </Header>
      <View>
      { prices.error && !alwaysLoad ? (
        <ErrorMessage
          message={ prices.error }
          onRetry={ prices.fetchData }
        />
      ) : children }
      </View>
      { (footer || prices.error) && (
        <View
          align="center"
          justify="space-between"
        >
          <View
            // onClick={ openVersionLink }
            className={ styles.footerLink }
            role="button"
          >
            <Text> v{ version } </Text>
          </View>
          <View
            // onClick={ openDonateLink }
            className={ styles.footerLink }
            role="button"
            title="🙏"
          ><Text> Donate </Text></View>
        </View>
      ) }
    </View>
  );
};

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
  ui: React.PropTypes.object.isRequired,
  prices: React.PropTypes.array.isRequired,
  border: React.PropTypes.bool,
  footer: React.PropTypes.bool,
  alwaysLoad: React.PropTypes.bool,
  title: React.PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeView }, dispatch);
}

export default Layout;
