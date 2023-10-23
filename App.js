import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import Blink from './blink'
import Keyboard from './keyboard'
import base64 from 'react-native-base64'

const esp32Name = 'BLEKeyboard'

const manager = new BleManager()
const devices = []
const characteristics = []
let deviceScanning = false

const App = () => {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [isBlink, setBlink] = useState(false)

  const isDarkMode = false

  useEffect(() => {
    const connectionCheckInterval = setInterval(() => {
      fetchData()
    }, 3000)

    const fetchData = async () => {
      const managerReady = await waitUntilBLEManagerReady()
      if (managerReady) {
        checkConnectionStatus()
      }
    }

    return () => {
      manager.stopDeviceScan()
      clearInterval(connectionCheckInterval)
    }
  }, [])

  useEffect(() => {
  }, [connected, connecting])

  const waitUntilBLEManagerReady = async () => {
    let state = await manager.state()
    while (state !== 'PoweredOn') {
      await new Promise(resolve => setTimeout(resolve, 500))
      state = await manager.state()
      // console.log('Waiting for the BLEManger ready', state)
    }
    // console.log('BLE Manager is ready')
    return true
  }

  const checkConnectionStatus = async () => {
    console.log('devices length: ', devices.length)
    if (devices.length >= 1) {
      let status = await devices[0].isConnected()
        .catch((error) => { console.log(error) })
      console.log('Status: ', status)
      setConnected(status)
      if (status === false && !connecting) {
        await connectDevices()
          .catch((error) => { console.log(error) })
      }
    } 
    else if (!deviceScanning) {
      console.log('No device is connected')
      await scanBleDevices()
      console.log('End Scanning')
    }
  }

  const scanBleDevices = async () => {
    await new Promise((resolve, reject) => {
      console.log('Scanning ESP32', deviceScanning)
      deviceScanning = true
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log('Error scanning for devices:', error)
          return
        }

        if (device.name === esp32Name || device.localName === esp32Name) {
          devices.push(device)
          console.log('Found esp32')
          manager.stopDeviceScan()
        }
      })
    })
  }

  const connectDevices = async () => {
    console.log('Devices: ', devices.length, 'Connecting:', connecting)
    setConnecting(true)
    const SERVICE_UUID = devices[0].id
    console.log('SERVICE_UUID: ', SERVICE_UUID)
    let device = await manager.connectToDevice(SERVICE_UUID, { autoConnect: true })
      .catch((error) => { console.log(error) })
    console.log('Connected', device.id)
    let status = await device.isConnected()
    console.log('Status: ', status, device.id)
    if (status) {
      device.discoverAllServicesAndCharacteristics()
      setConnected(true)
    }
    setConnecting(false)
    deviceScanning = false
  }

  const circle = (s) => {
    return <View style={[geometry.circle, ...s]} />
  }

  return (
    <View style={styles.container}>
      <Blink duration={1000} state={isBlink}>
        {circle([styles.connectingStatusStyle,
        connected
          ? styles.connected
          : connecting
            ? styles.connecting
            : styles.disconnected])}
      </Blink>
      <Keyboard device={devices} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9ED',
  },
  connected: {
    backgroundColor: '#66FF66'
  },
  connecting: {
    backgroundColor: '#FF9900'
  },
  disconnected: {
    backgroundColor: '#FF0000'
  },
  connectingStatusStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25
  },
  whiteText: {
    color: '#FFFFFF'
  },
  darkText: {
    color: '#FF00FF'
  }
})

const geometry = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF00FF'
  }
})

export default App
