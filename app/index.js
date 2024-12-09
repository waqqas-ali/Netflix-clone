import { AppRegistry } from 'react-native'
import React from 'react';
import App from "../src/App"
import {name as appName} from '../app.json';

const index = () => {
  return (
    <App/>
  )
}
AppRegistry.registerComponent(appName, () => App);
export default index