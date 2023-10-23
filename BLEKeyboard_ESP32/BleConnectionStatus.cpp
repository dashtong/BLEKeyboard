#include "BleConnectionStatus.h"
#include <iostream>

BleConnectionStatus::BleConnectionStatus(void) {
}

void BleConnectionStatus::onConnect(BLEServer* pServer) {
  this->connected = true;
  uint16_t connId = pServer->getConnId();
  std::cout << "connID: " << connId << std::endl;
  BLE2902* desc = (BLE2902*)this->inputKeyboard->getDescriptorByUUID(BLEUUID((uint16_t)0x2902));
  desc->setNotifications(true);
  desc = (BLE2902*)this->inputMouse->getDescriptorByUUID(BLEUUID((uint16_t)0x2902));
  desc->setNotifications(true);

  // // this->hid->removeServices(pServer);
  // pServer->setCallbacks(new MyServerCallbacks());
  // BLEAdvertising* pAdvertising = pServer->getAdvertising();
  // pAdvertising->addServiceUUID(SERVICE_UUID);
  // pAdvertising->start();
  pServer->startAdvertising();
}

void BleConnectionStatus::onDisconnect(BLEServer* pServer) {
  this->connected = false;
  BLE2902* desc = (BLE2902*)this->inputKeyboard->getDescriptorByUUID(BLEUUID((uint16_t)0x2902));
  desc->setNotifications(false);
  desc = (BLE2902*)this->inputMouse->getDescriptorByUUID(BLEUUID((uint16_t)0x2902));
  desc->setNotifications(false);
  pServer->startAdvertising();
}


// void MyServerCallbacks::onConnect(BLEServer* pServer) {

//   uint16_t connId = pServer->getConnId();
//   // Serial.print(connId);
//   std::cout << "  iPhone Connected, Now start advertising keyboard " << std::endl;
//   // const char* connectedDeviceAddress = (static_cast<BLEClient*>(pServer->getPeerDevices(true).end()->second.peer_device))->getAddress().toString().c_str();
//   // (static_cast<BLEClient*>(pServer->getPeerDevices(true).end()->second.peer_device))->clearServices();

//   BLEService* pService = pServer->createService(SERVICE_UUID);
//   BLECharacteristic* pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_TX_UUID, BLECharacteristic::PROPERTY_NOTIFY);
//   pCharacteristic->addDescriptor(new BLE2902());
//   pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_RX_UUID, BLECharacteristic::PROPERTY_WRITE);
//   pCharacteristic->setCallbacks(new MyCallbacks());
//   // pClient

//   // if (strcmp(IPHONE_ADDRESS, connectedDeviceAddress) != 0) {
//   //   std::cout << "Wrong device connected. Disconnecting. " << std::endl;
//   //   pServer->disconnectClient();
//   //   return;
//   // }
//   // delay(5000);
//   std::cout << "Service Count: " << pServer->getConnectedCount() << std::endl;
// };

// void MyServerCallbacks::onDisconnect(BLEServer* pServer) {
//   // BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
//   // pAdvertising->addServiceUUID(SERVICE_UUID);
//   // pAdvertising->setMinPreferred(0x06);
//   // BLEDevice::startAdvertising();
// }
