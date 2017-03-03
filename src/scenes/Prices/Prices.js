import React, { PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPrices } from '../../actions/index';

import Layout from '../../components/Layout/index';
import PriceList from './components/PriceList/index';

class Prices extends React.Component {
  static propTypes = {
    prices: PropTypes.array.isRequired,
    ui: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetchPrices();
  }

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      dataSource: ds.cloneWithRows(this.props.prices)
    });
  }

  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      dataSource: ds.cloneWithRows(nextProps)
    });
  }

  renderRow(prices){
    return <PriceList
      assets={ prices }
    />;
  }

  render() {
    return (
      <Layout
        title={ 'Prices' }
        activeTab="prices"
        prices={this.props.prices}
        ui={this.props.ui}
      >
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            style={{"height": 613}}
          />
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPrices }, dispatch);
}

export default connect(null, mapDispatchToProps)(Prices);
