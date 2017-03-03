module.exports = require('react-native').StyleSheet.create(
  {
   "row":{
      "position":"relative",
      "flexShrink":0,
      "backgroundColor": "black",
      "flexDirection":"row"
   },
   "row+row":{
      "borderTopWidth":1,
      "borderTopColor":"rgba(255,255,255,0.35)"
   },
   "rowLeft":{
      "padding":15,
      "paddingRight":0
  },
   "rowRight":{
      "padding":15,
      "paddingLeft":0,
      "flex": .4
   },
   "rowRight:hover chart":{
      "opacity":0.35,
   },
   "colorDot":{
      "marginTop":3,
      "marginRight":8
   },
   "currencyCode":{
      "padding":13,
      "width":68
   },
   "price":{
      "fontSize":24,
      "color":"white"
   },
   "change":{
      "color":"rgba(255,255,255,0.5)"
   },
   "up":{
      "color":"#2ACB42"
   },
   "down":{
      "color":"#FB2C2C"
   },
   "highlow":{
      "position":"absolute",
      "right":0,
      "paddingRight":15,
      "paddingLeft":15,
      "fontSize":10,
      "textAlign":"right"
   },
   "symbol":{
     "color":"white"
   },
   "high":{
      "marginTop":2
   },
   "low":{
      "marginTop":2,
      "marginBottom":2
   },
   "cap":{
      "marginBottom":4
   },
   "label":{
      "color":"rgba(255,255,255,0.5)",
      "marginRight":6
   }
});
