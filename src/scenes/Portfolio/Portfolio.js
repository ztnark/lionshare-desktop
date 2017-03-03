import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';

import { formatNumber } from '../../utils/formatting';

import { Flex } from 'reflexbox';

import Layout from '../../components/Layout';
import FatButton from '../../components/FatButton';
import EditAssets from './components/EditAssets';
import AssetList from './components/AssetList';
import Divider from './components/Divider';
import ChangeHighlight from '../../components/ChangeHighlight';
import ColoredChange from '../../components/ColoredChange';

import PortfolioStore from './PortfolioStore';

// import styles from './Portfolio.scss';

// @inject('prices', 'ui')
// @observer
class Portfolio extends React.Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    balances: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.store = new PortfolioStore({
      prices: props.prices,
      ui: props.ui,
    });
  }

  get chartOptions() {
    return {
      cutoutPercentage: 95,
      tooltips: {
        enabled: false,
      },
      animation: false,
    };
  }

  get footer() {
    return (
      <Footer>
        { this.store.showEditCancel && (
          <FatButton
            label="Cancel"
            onClick={ this.store.toggleEdit }
            active
          />
        ) }
        <FatButton
          label="Save"
          onClick={ this.store.saveEdit }
          active={ this.store.allowSave }
        />
      </Footer>
    );
  }

  render() {
    let direction;
    if (this.store.isLoaded) {
      direction = this.store.totalChange >= 0 ? 'up' : 'down';
    }

    return (
      <Layout>
        { this.store.isLoaded && (
          <Flex column justify="space-between" auto>
            { !this.store.isEditing &&
              <View className={ styles.balance }>
              <Doughnut
                height={ 185 }
                data={ this.store.doughnutData }
                options={ this.chartOptions }
              />
                <View className={styles.balanceContainer}>
                  <View className={styles.balanceAmount}>
                    <ChangeHighlight trigger={ this.store.totalBalance }>
                      { formatNumber(this.store.totalBalance, 'USD', { maximumFractionDigits: 0 }) }
                    </ChangeHighlight>
                  </View>
                  <View className={ styles.balanceTotal }>
                    <ColoredChange direction={ direction }>
                      { formatNumber(this.store.totalChange, 'USD', { directionSymbol: true,
                                                                      minPrecision: true }) }
                    </ColoredChange>
                  </View>
                </View>
              </View>
            }

            <Flex auto column className={styles.content}>
              { this.store.isEditing ? (
                <Flex auto column>
                  <EditAssets
                    balances={ this.store.editedBalances }
                    totalBalance={ this.store.totalBalance }
                    onChange={ this.store.updateBalance }
                    visibleCurrencies={ this.props.ui.visibleCurrencies }
                    editMode={ this.store.editMode }
                    toggleEditMode={ this.store.toggleEditMode }
                    fiatCurrency={ this.store.fiatCurrency }
                    toggleOnboarding={ this.store.toggleOnboarding }
                    showOnboarding={ this.store.showOnboarding }
                  />
                  { this.footer }
                </Flex>
              ) : (
                <Flex auto column>
                  <Divider onClick={ this.store.toggleEdit }>Edit</Divider>
                  <AssetList
                    assets={ this.store.assetListData }
                  />
                </Flex>
              ) }
            </Flex>
          </Flex>
        ) }
      </Layout>
    );
  }
}

const Footer = ({ children }) => (
  <Flex auto className={ styles.footer }>
    { children }
  </Flex>
);

export default Portfolio;
