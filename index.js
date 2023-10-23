// index.js

import { AppRegistry } from 'react-native'
import App from './App' // Import your root component here
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
