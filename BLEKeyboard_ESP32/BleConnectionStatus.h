#ifndef ESP32_BLE_CONNECTION_STATUS_H
#define ESP32_BLE_CONNECTION_STATUS_H
#include "sdkconfig.h"
#if defined(CONFIG_BT_ENABLED)

#include <BLEServer.h>
#include "BLE2902.h"
#include "BLEHIDDevice.h"
#include "BLECharacteristic.h"
#include <BLEDevice.h>

#define SERVICE_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_RX_UUID "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_TX_UUID "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

class BleConnectionStatus : public BLEServerCallbacks {

public:
  BleConnectionStatus(void);
  bool connected = false;
  void onConnect(BLEServer* pServer);
  void onDisconnect(BLEServer* pServer);
  BLECharacteristic* inputKeyboard;
  BLECharacteristic* outputKeyboard;
  BLECharacteristic* inputMouse;
  BLEHIDDevice* hid;
};

// class MyServerCallbacks : public BLEServerCallbacks {
//   void onConnect(BLEServer* pServer);
//   void onDisconnect(BLEServer* pServer);
// };

// class MyCallbacks : public BLECharacteristicCallbacks {
//   void onWrite(BLECharacteristic* pCharacteristic);
// };
#endif  // CONFIG_BT_ENABLED
#endif  // ESP32_BLE_CONNECTION_STATUS_H
