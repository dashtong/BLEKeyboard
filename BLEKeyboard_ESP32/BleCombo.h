#ifndef ESP32_BLE_COMBO_H
#define ESP32_BLE_COMBO_H
#include "BleComboKeyboard.h"
#include "BleComboMouse.h"

const std::string DEVICE_NAME  = "BLEKeyboard";

extern BleComboMouse Mouse;
extern BleComboKeyboard Keyboard;

#endif
