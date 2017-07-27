import React, { PropTypes }from 'react';
import { observer } from 'mobx-react';

// import { shell } from 'electron';

import { CURRENCIES } from '../../utils/currencies';

import Layout from '../../components/Layout';
import CurrencyColor from '../../components/CurrencyColor';
import { SettingToggle, ToggleOption } from './components/SettingToggle';

// import styles from './Settings.scss';

// @inject('ui', 'prices')
// @observer
class Settings extends React.Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    prices: PropTypes.object.isRequired,
  }

  render() {
    const { ui } = this.props;
    // const openGitHubFaq = () => shell.openExternal('https://github.com/lionsharecapital/lionshare-desktop#faq');
    const { selectPeriod, period } = this.props.prices;
    const periodDay = () => selectPeriod('day');
    const periodWeek = () => selectPeriod('week');
    const periodMonth = () => selectPeriod('month');

    return (
      <Layout footer alwaysLoad>
        <Flex auto column className={ styles.container }>
          <Section>
            <Heading>Time Period</Heading>
            <SettingToggle>
              <ToggleOption
                onClick={ periodDay }
                selected={ period === 'day' }
              >
                1 Day
              </ToggleOption>
              <ToggleOption
                onClick={ periodWeek }
                selected={ period === 'week' }
              >
                1 Week
              </ToggleOption>
              <ToggleOption
                onClick={ periodMonth }
                selected={ period === 'month' }
              >
                1 Month
              </ToggleOption>
            </SettingToggle>
          </Section>
          <Section>
            <Heading>Native Currency</Heading>
            <Setting>
              US Dollars (USD)
            </Setting>
          </Section>
          <Section>
            <Heading>Exchange</Heading>
            <Setting>
              GDAX/Poloniex
              <Link onClick={ openGitHubFaq }>Why?</Link>
            </Setting>
          </Section>
          <Section>
            <Heading>
              <View>Asset List</View>
              <View className={ styles.headingActions }>
                <HeadingAction onClick={ ui.toggleCurrenciesAll }>All</HeadingAction>
                &nbsp;|&nbsp;
                <HeadingAction onClick={ ui.toggleCurrenciesNone }>None</HeadingAction>
              </View>
            </Heading>
            <AssetList>
              { CURRENCIES.map(asset => (
                <Asset
                  key={ asset.symbol }
                  { ...asset }
                  toggleCurrency={ ui.toggleCurrency }
                  visibleCurrencies={ ui.visibleCurrencies }
                />
              )) }
            </AssetList>
          </Section>
        </Flex>
      </Layout>
    );
  }
}

const Section = ({ children }) => (
  <View className={ styles.section }>
    { children }
  </View>
);

const Heading = ({ children }) => (
  <Flex justify="space-between" className={ styles.heading }>
    { children }
  </Flex>
);

const HeadingAction = ({ children, onClick }) => (
  <View role="button" className={ styles.headingAction } onClick={ onClick }>
    { children }
  </View>
);

const Setting = ({ children }) => (
  <View className={ styles.setting }>
    { children }
  </View>
);

const Link = ({ children, onClick }) => (
  <View className={ styles.link } onClick={ onClick } role="button">
    { children }
  </View>
);

const AssetList = ({ children }) => (
  <View className={ styles.assetList }>
    { children }
  </View>
);

const Asset = observer(({
  name,
  symbol,
  color,
  toggleCurrency,
  visibleCurrencies,
}) => {
  const onChange = () => toggleCurrency(symbol);
  const checked = visibleCurrencies.includes(symbol);

  return (
    <Flex
      align="center"
      justify="space-between"
      className={ styles.asset }
      auto
    >
      <Flex>
        <CurrencyColor color={ color } className={ styles.colorDot } />
        { name }&nbsp;<View className={ styles.symbol }>({ symbol })</View>
      </Flex>
      <View>
        <input
          type="checkbox"
          onChange={ onChange }
          checked={ checked }
        />
      </View>
    </Flex>
  );
});

export default Settings;
