import React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import Svg,{
    Polyline
} from 'react-native-svg';

import { formatNumber } from '../../../../utils/formatting';

import CurrencyColor from '../../../../components/CurrencyColor';
import ChangeHighlight from '../../../../components/ChangeHighlight';
import ColoredChange from '../../../../components/ColoredChange';
import { CURRENCIES } from '../../../../utils/currencies';
import * as ChatActions from '../../../../actions/ChatActions.js';
import WSInstance from '../../../../utils/ChatWebsocket.js';


import classNames from 'classnames/bind';
import styles from './PriceListStyle';

const PriceList = ({ assets }) => {
  if(typeof assets[0] === "undefined"){
    return null;
  }
  visibleCurrencies = CURRENCIES.map(currency => currency.symbol);
  const includedAssets = assets[0].filter(asset => visibleCurrencies.includes(asset.symbol));
  return (
    <View>
      { includedAssets.map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </View>
  );
};

const AssetRow = ({
  symbol,
  color,
  price,
  change,
  chartData,
  highestPrice,
  lowestPrice,
  marketCap,
}) => {
  const direction = change >= 0 ? 'up' : 'down';
  const chartOptions = {
    animation: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }],
    },
  };

  function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
  }

  function scale(unscaledNums){
    var scaledNums = []
    var maxRange = Math.max.apply(Math, unscaledNums);
    var minRange = Math.min.apply(Math, unscaledNums);

    for (var i = 0; i < unscaledNums.length; i++) {
      var unscaled = unscaledNums[i];
      var scaled = scaleBetween(unscaled, 2, 40, minRange, maxRange);
      // adjust for SVG 0,0 being top
      scaled = (scaled - (40 * 0.5)) * -1 + (40 * 0.5);
      scaledNums[i] = scaled
    }
    return scaledNums;
  }

  function addXAxisPoints(points){
    var pointsDist = 125 / points.length;
    for (var i = 0; i < points.length; i++) {
      points[i] = [pointsDist * i ,points[i]]
    }
    return points.join();
  }

  function formatPoints(data){
    var scaledNums = scale(data);
    var points = addXAxisPoints(scaledNums);
    return points;
  }

  return (
    <View
      align="center"
      justify="space-between"
      style={ styles.row }
    >
      <View row style={ styles.rowLeft }>
        <CurrencyColor color={ color } style={ styles.colorDot } />
      </View>
      <View>
        <View row
          style={ styles.currencyCode }
        >
          <Text style={ styles.symbol }>{ symbol }</Text>
        </View>
      </View>
      <View style={{ "padding": 12, "marginLeft": -20, "flex": .5}}>
        <View column>
          <View>
            <ChangeHighlight trigger={ price }>
              <Text style={ styles.price }>
                { formatNumber(price, 'USD', { minPrecision: true }) }
              </Text>
            </ChangeHighlight>
            {/*<ChangeHighlight trigger={ price }>
              { formatNumber(price, 'USD', { minPrecision: true }) }
            </ChangeHighlight>
            */}
          </View>
          <View>
            <ColoredChange direction={ direction }>
              <Text style={ styles[direction] }>
                { formatNumber(change, undefined, { directionSymbol: true,
                                                  minPrecision: true }) }%
              </Text>
            </ColoredChange>
          </View>
        </View>
      </View>
      <View style={ styles.rowRight }>
        <View style={ styles.chart }>
           <Svg width="125" height="42" xmlns="http://www.w3.org/2000/svg">
              <Polyline fill="none" stroke={ color } strokeWidth="3" strokeLinejoin="round"
              points={formatPoints(chartData.datasets[0].data)}/>
            </Svg>
        </View>
        {/*
        <View column justify="space-between" className={ styles.highlow }>
          <View justify="space-between" className={ styles.high }>
            <View><Text className={ styles.label }>H</Text></View>
            <View><Text>{ formatNumber(highestPrice, 'USD', { minPrecision: true }) }</Text></View>
          </View>
          <View justify="space-between" className={ styles.low }>
            <View className={ styles.label }><Text>L</Text></View>
            <View><Text>{ formatNumber(lowestPrice, 'USD', { minPrecision: true }) }</Text></View>
          </View>
          <View justify="space-between" className={ styles.cap }>
            <View className={ styles.label }><Text>M</Text></View>
            <View><Text>${ marketCap }</Text></View>
          </View>
        </View>
        */}
      </View>
    </View>
  );
};

export default observer(PriceList);
