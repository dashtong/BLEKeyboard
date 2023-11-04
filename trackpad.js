import { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import base64 from 'react-native-base64'
import { BleManager } from 'react-native-ble-plx'
// import { btoa } from 'react-native-quick-base64'

const manager = new BleManager()

export default class TrackPad extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }



  async notify(k) {
    if (this.props.device == null) {
      console.log('No Device is connected')
      return
    }

    await manager.writeCharacteristicWithResponseForDevice(
      '019CDE25-84F8-3727-8C84-81DB7D7B6C61',
      '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
      '6E400002-B5A3-F393-E0A9-E50E24DCCA9E',
      base64.encode(k)
    ).catch((error) => {
      console.log('[Notify] Error:', error)
    })
  }

  render() {
    return (
      <View style={[trackPadStyles.trackPad]} />
    )
  }
}

const trackPadStyles = StyleSheet.create({
  trackPad: {
    // backgroundColor: '#ccbcad',
    borderWidth: 2,
    borderColor: '#000000',
    height: '95%',
    width: '95%',
    borderRadius: 20,
    marginTop: 2,
    marginLeft: 15,
  },
  whiteText: {
    color: '#FFFFFF'
  },
  darkText: {
    color: '#FF00FF'
  }
})
