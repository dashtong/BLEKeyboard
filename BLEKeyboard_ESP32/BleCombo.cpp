#include "BleCombo.h"
#include <cstring>

BleComboKeyboard Keyboard(DEVICE_NAME, "ME", 100);
BleComboMouse Mouse(&Keyboard);
