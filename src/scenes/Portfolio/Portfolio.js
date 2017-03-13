import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import Svg,{
    Circle
} from 'react-native-svg';

import { formatNumber } from '../../utils/formatting';

import Layout from '../../components/Layout';
import FatButton from '../../components/FatButton';
import EditAssets from './components/EditAssets';
import AssetList from './components/AssetList';
import Divider from './components/Divider';
import ChangeHighlight from '../../components/ChangeHighlight';
import ColoredChange from '../../components/ColoredChange';

import PortfolioStore from './PortfolioStore';

import styles from './PortfolioStyle';

// @inject('prices', 'ui')
// @observer
class Portfolio extends React.Component {
  static propTypes = {
    prices: PropTypes.array.isRequired,
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

  chartOptions() {
    return {
      cutoutPercentage: 95,
      tooltips: {
        enabled: false,
      },
      animation: false,
    };
  }

  tap(){
    debugger;
  }

  footer() {
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
    let direction = this.store.totalChange >= 0 ? 'up' : 'down';

    return (
      <Layout
        title={ 'Portfolio' }
        activeTab="portfolio"
        prices={this.props.prices}
        ui={this.props.ui}
      >
        { (
          <View column justify="space-between" auto style={{"height": 613, backgroundColor: "black"}}>
            {/*{ !this.store.isEditing*/}
              <View style={ styles.balance }>
              {/*<Doughnut
                height={ 185 }
                data={ this.store.doughnutData }
                options={ this.chartOptions }
              />*/}
              <Svg height="230" width="230">
                <Circle cx="110"
                    cy="110"
                    r="100"
                    stroke="#FD7322"
                    strokeWidth="5"/>
              </Svg>

                <View style={styles.balanceContainer}>
                  <View>
                    <Text style={{color: "white", textAlign:"center", fontSize: 32}}>{ formatNumber(this.store.totalBalance, 'USD', { maximumFractionDigits: 0 }) }</Text>
                    {/*<ChangeHighlight trigger={ this.store.totalBalance }>
                      { formatNumber(this.store.totalBalance, 'USD', { maximumFractionDigits: 0 }) }
                    </ChangeHighlight>*/}
                  </View>
                  <View>
                    <Text style={{color: "#35C94A", textTransform: "uppercase"}}>{ formatNumber(this.store.totalChange, 'USD', { directionSymbol: true,
                                                                    minPrecision: true }) }</Text>
                    {/*<ColoredChange direction={ direction }>
                      { formatNumber(this.store.totalChange, 'USD', { directionSymbol: true,
                                                                      minPrecision: true }) }
                    </ColoredChange>*/}
                  </View>
                </View>
              </View>


            <View column>
              { !this.store.isEditing ? (
                <View auto column>
                {/*
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
                  />*/}
                  { this.footer }
                </View>
              ) : (
                <View column>
                  <Divider onPress={ this.tap }>Edit</Divider>
                  <AssetList
                    assets={ this.store.assetListData }
                  />
                </View>
              ) }
            </View>
          </View>
        ) }
      </Layout>
    );
  }
}

const Footer = ({ children }) => (
  <View auto className={ styles.footer }>
    { children }
  </View>
);

export default Portfolio;
