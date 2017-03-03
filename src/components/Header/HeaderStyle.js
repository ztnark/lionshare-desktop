module.exports = require('react-native').StyleSheet.create({
  header: {
    "position": "relative",
    "padding": 0,
    "flexShrink": 0,
    "alignItems": "center",
    "marginTop": 0,
    "paddingTop": 20,
    "backgroundColor": "black",
    "flexDirection": "row",
    "justifyContent": "center",
    'alignSelf': 'stretch',
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(255,255,255,0.35)"
  },
  headerTab: {
    "paddingTop": 10,
    "paddingBottom": 10,
    "paddingLeft": 20,
    "paddingRight": 20,
    "backgroundColor": "black",
  },
  activeTab: {
    "opacity": 1,
    "position": "relative"
  },
  after: {
    "width": 100,
    "height": 1,
    "backgroundColor": "#fff",
    "position": "absolute",
    "left": 0,
    "bottom": -1
  },
  settingsIcon: {
    "position": "absolute",
    "right": 10
  },
  text:{
    "color": "white"
  }
});
