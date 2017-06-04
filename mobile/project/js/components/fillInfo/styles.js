
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  center:{
    alignSelf: 'center',
  },
  title:{
    marginTop: 30,
    marginLeft: 10,
    color:'#F16C00',
    fontSize: 20,
  },
  list:{
    marginTop:15,
    marginBottom:15,
    marginLeft: 20,
    marginRight:20,
  },
  radios:{
    alignItems: 'center',
    marginLeft: 30,
    marginTop:20,
  }
};
