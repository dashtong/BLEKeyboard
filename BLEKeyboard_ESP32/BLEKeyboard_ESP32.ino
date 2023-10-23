#include "BleCombo.h"
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
BLEServer *pServer;
class MyCallbacks : public BLECharacteristicCallbacks {
public:
  BleComboKeyboard *keyboard;
  MyCallbacks(BleComboKeyboard *k) {
    this->keyboard = k;
  }
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string rxCommand = pCharacteristic->getValue();
    this->getExpectedContent(rxCommand);
    Serial.print(":onwrite: ");
    Serial.print("  ");
    Serial.println(rxCommand.c_str());
  }
  void getExpectedContent(std::string rxCommand) {
    char c = rxCommand.back();
    bool pressed = c=='1' ? true : false;
    rxCommand.pop_back();
    if (rxCommand.compare("BACKSPACE") == 0) {
      if (pressed) this->keyboard->press(KEY_BACKSPACE);
      else this->keyboard->release(KEY_BACKSPACE);
    } else if (rxCommand.compare("TAB") == 0) {
      if (pressed) this->keyboard->press(KEY_TAB);
      else this->keyboard->release(KEY_TAB);
    } else if (rxCommand.compare("CAPS") == 0) {
      if (pressed) this->keyboard->press(KEY_CAPS_LOCK);
      else this->keyboard->release(KEY_CAPS_LOCK);
    } else if (rxCommand.compare("ENTER") == 0) {
      if (pressed) this->keyboard->press(KEY_RETURN);
      else this->keyboard->release(KEY_RETURN);
    } else if (rxCommand.compare("SHIFT_LEFT") == 0) {
      if (pressed) this->keyboard->press(KEY_LEFT_SHIFT);
      else this->keyboard->release(KEY_LEFT_SHIFT);
    } else if (rxCommand.compare("SHIFT_RIGHT") == 0) {
      if (pressed) this->keyboard->press(KEY_RIGHT_SHIFT);
      else this->keyboard->release(KEY_RIGHT_SHIFT);
    } else if (rxCommand.compare("CTRL_LEFT") == 0) {
      if (pressed) this->keyboard->press(KEY_LEFT_CTRL);
      else this->keyboard->release(KEY_LEFT_CTRL);
    } else if (rxCommand.compare("CTRL_RIGHT") == 0) {
      if (pressed) this->keyboard->press(KEY_RIGHT_CTRL);
      else this->keyboard->release(KEY_RIGHT_CTRL);
    } else if (rxCommand.compare("WIN_LEFT") == 0) {
      if (pressed) this->keyboard->press(KEY_LEFT_GUI);
      else this->keyboard->release(KEY_LEFT_GUI);
    } else if (rxCommand.compare("WIN_RIGHT") == 0) {
      if (pressed) this->keyboard->press(KEY_RIGHT_GUI);
      else this->keyboard->release(KEY_RIGHT_GUI);
    } else if (rxCommand.compare("ALT_LEFT") == 0) {
      if (pressed) this->keyboard->press(KEY_LEFT_ALT);
      else this->keyboard->release(KEY_LEFT_ALT);
    } else if (rxCommand.compare("ALT_RIGHT") == 0) {
      if (pressed) this->keyboard->press(KEY_RIGHT_ALT);
      else this->keyboard->release(KEY_RIGHT_ALT);
    } else if (rxCommand.compare("SPACE") == 0 && pressed) {
      this->keyboard->print(" ");
    } else if (pressed) {
      this->keyboard->print(rxCommand.c_str());
    }
  }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Starting work!");
  BLEDevice::init("BLEKeyboard");
  pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_TX_UUID, BLECharacteristic::PROPERTY_NOTIFY);
  pCharacteristic->addDescriptor(new BLE2902());
  pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_RX_UUID, BLECharacteristic::PROPERTY_WRITE);
  MyCallbacks *rxCallback = new MyCallbacks(&Keyboard);
  pCharacteristic->setCallbacks(rxCallback);
  pService->start();

  Keyboard.setServer(pServer);

  Keyboard.begin();

  Mouse.begin();
}

void loop() {
  Serial.println(pServer->getConnectedCount());
  if (Keyboard.isConnected()) {
    //   Serial.println("Connected");
    Serial.println("Sending 'Hello world'");
    // Keyboard.println("K");

    //   // Serial.println("Sending Enter key...");
    //   // Keyboard.write(KEY_RETURN);

    //   // Serial.println("Sending Ctrl+Alt+Delete...");
    //   // Keyboard.press(KEY_LEFT_CTRL);
    //   // Keyboard.press(KEY_LEFT_ALT);
    //   // Keyboard.press(KEY_DELETE);
    //   // delay(100);
    //   // Keyboard.releaseAll();

    //   // Serial.println("Move mouse pointer up");
    //   // Mouse.move(0,-10);

    //   // Serial.println("Scroll Down");
    //   // Mouse.move(0,0,-1);

    //   // Serial.println("Left click");
    //   // Mouse.click(MOUSE_LEFT);
    // }
  }

  // Serial.println("Waiting 5 seconds...");
  delay(5000);
}