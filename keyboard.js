import { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import base64 from 'react-native-base64'
import { BleManager } from 'react-native-ble-plx'
// import { btoa } from 'react-native-quick-base64'

const manager = new BleManager()
const keyboardData = [
  [
    {
      key: '`',
      shifted: '~',
      caps: false
    },
    {
      key: '1',
      shifted: '!',
      caps: false
    },
    {
      key: '2',
      shifted: '@',
      caps: false
    },
    {
      key: '3',
      shifted: '#',
      caps: false
    },
    {
      key: '4',
      shifted: '$',
      caps: false
    },
    {
      key: '5',
      shifted: '%',
      caps: false
    },
    {
      key: '6',
      shifted: '^',
      caps: false
    },
    {
      key: '7',
      shifted: '&',
      caps: false
    },
    {
      key: '8',
      shifted: '*',
      caps: false
    },
    {
      key: '9',
      shifted: '(',
      caps: false
    },
    {
      key: '0',
      shifted: ')',
      caps: false
    },
    {
      key: '-',
      shifted: '_',
      caps: false
    },
    {
      key: '=',
      shifted: '+',
      caps: false
    }
  ],
  [
    {
      key: 'q',
      shifted: 'Q',
      caps: true
    },
    {
      key: 'w',
      shifted: 'W',
      caps: true
    },
    {
      key: 'e',
      shifted: 'E',
      caps: true
    },
    {
      key: 'r',
      shifted: 'R',
      caps: true
    },
    {
      key: 't',
      shifted: 'T',
      caps: true
    },
    {
      key: 'y',
      shifted: 'Y',
      caps: true
    },
    {
      key: 'u',
      shifted: 'U',
      caps: true
    },
    {
      key: 'i',
      shifted: 'I',
      caps: true
    },
    {
      key: 'o',
      shifted: 'O',
      caps: true
    },
    {
      key: 'p',
      shifted: 'P',
      caps: true
    },
    {
      key: '[',
      shifted: '{',
      caps: false
    },
    {
      key: ']',
      shifted: '}',
      caps: false
    },
    {
      key: '\\',
      shifted: '|',
      caps: false
    }
  ],
  [
    {
      key: 'a',
      shifted: 'A',
      caps: true
    },
    {
      key: 's',
      shifted: 'S',
      caps: true
    },
    {
      key: 'd',
      shifted: 'D',
      caps: true
    },
    {
      key: 'f',
      shifted: 'F',
      caps: true
    },
    {
      key: 'g',
      shifted: 'G',
      caps: true
    },
    {
      key: 'h',
      shifted: 'H',
      caps: true
    },
    {
      key: 'j',
      shifted: 'J',
      caps: true
    },
    {
      key: 'k',
      shifted: 'K',
      caps: true
    },
    {
      key: 'l',
      shifted: 'L',
      caps: true
    },
    {
      key: ';',
      shifted: ':',
      caps: false
    },
    {
      key: '\'',
      shifted: '"',
      caps: false
    }
  ],
  [
    {
      key: 'z',
      shifted: 'Z',
      caps: true
    },
    {
      key: 'x',
      shifted: 'X',
      caps: true
    },
    {
      key: 'c',
      shifted: 'C',
      caps: true
    },
    {
      key: 'v',
      shifted: 'V',
      caps: true
    },
    {
      key: 'b',
      shifted: 'B',
      caps: true
    },
    {
      key: 'n',
      shifted: 'N',
      caps: true
    },
    {
      key: 'm',
      shifted: 'M',
      caps: true
    },
    {
      key: ',',
      shifted: '<',
      caps: false
    },
    {
      key: '.',
      shifted: '>',
      caps: false
    },
    {
      key: '/',
      shifted: '?',
      caps: false
    }
  ]
]

export default class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.isCapped = false
    this.isShifted = false
    this.state = { isPressed: {}, p: 2 }
  }

  getKeyText(row, column) {
    if (row == null || column == null) return [null, null]
    if (keyboardData[row][column].caps) {
      return [keyboardData[row][column].shifted, null]
    }
    return [keyboardData[row][column].shifted, keyboardData[row][column].key]
  }

  renderKeyText(row, column) {
    const [shiftedKey, key] = this.getKeyText(row, column)
    if (shiftedKey == null) return <Text />
    if (key == null) {
      return (
        <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyButtonAlphabetText]}>
          {shiftedKey}
        </Text>
      )
    }
    return (
      <View>
        <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyButtonWithShiftKeyText]}>
          {shiftedKey}
        </Text>
        <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyButtonWithShiftKeyText]}>
          {key}
        </Text>
      </View>
    )
  }

  handleKeyboardTouchStarted(key) {
    let isPressed = { ...this.state.isPressed }
    this.notify(key + '1')
    isPressed[key] = true
    this.setState({ ...this.state, isPressed })
  }

  handleKeyboardTouchEnded(key) {
    let isPressed = { ...this.state.isPressed }
    this.notify(key + '0')
    delete isPressed[key]
    this.setState({ ...this.state, isPressed })
  }

  renderKeyboardFirstRow() {
    let c = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 60]
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        {keyboardData[0].map((keyData, idx) => (
          <View
            style={[
              keyboardStyles.keyButtonStyle
            ]}
            onTouchStart={() => { this.handleKeyboardTouchStarted(keyData.key) }}
            onTouchEnd={() => { this.handleKeyboardTouchEnded(keyData.key) }}
            key={keyData.key}>
            {this.renderKeyText(0, idx)}
            <View
              style={[
                keyboardStyles.keyButtonStyle,
                keyData.key in this.state.isPressed ?
                  keyboardStyles.keyButtonOverlayStyle :
                  keyboardStyles.keyButtonPressedStyle
              ]}>
              {this.renderKeyText(0, idx)}
            </View>
          </View>
        ))}
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 95,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('BACKSPACE') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('BACKSPACE') }}
          key={'BACKSPACE'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Backspace
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'BACKSPACE' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
              {
                height: '110%',
                width: '110%',
              }
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Backspace
            </Text>
          </View>
        </View>
      </View>
    )
  }
  renderKeyboardSecondRow() {
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 70,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('TAB') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('TAB') }}
          key={'TAB'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Tab
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'TAB' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
                {
                  height: '110%',
                  width: '110%',
                }
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Tab
            </Text>
          </View>
        </View>

        {keyboardData[1].slice(0, -1).map((keyData, idx) => (
          <View
            style={[
              keyboardStyles.keyButtonStyle
            ]}
            onTouchStart={() => { this.handleKeyboardTouchStarted(keyData.key) }}
            onTouchEnd={() => { this.handleKeyboardTouchEnded(keyData.key) }}
            key={keyData.key}>
            {this.renderKeyText(1, idx)}
            <View
              style={[
                keyboardStyles.keyButtonStyle,
                keyData.key in this.state.isPressed ?
                  keyboardStyles.keyButtonOverlayStyle :
                  keyboardStyles.keyButtonPressedStyle
              ]}>
              {this.renderKeyText(1, idx)}
            </View>
          </View>
        ))}

        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 70
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted(keyboardData[1][keyboardData[1].length - 1].key) }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded(keyboardData[1][keyboardData[1].length - 1].key) }}
          key={keyboardData[1][keyboardData[1].length - 1].key}>
          {this.renderKeyText(1, 12)}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              keyboardData[1][keyboardData[1].length - 1].key in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, { marginTop: 6 }]}>
              {this.renderKeyText(1, 12)}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderKeyboardThirdRow() {
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 90,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('CAPS') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('CAPS') }}
          key={'CAPS'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Caps Lock
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'CAPS' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
                {
                  height: '108%',
                  width: '108%',
                }
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Caps Lock
            </Text>
          </View>
        </View>

        {keyboardData[2].map((keyData, idx) => (
          <View
            style={[
              keyboardStyles.keyButtonStyle
            ]}
            onTouchStart={() => { this.handleKeyboardTouchStarted(keyData.key) }}
            onTouchEnd={() => { this.handleKeyboardTouchEnded(keyData.key) }}
            key={keyData.key}>
            {this.renderKeyText(2, idx)}
            <View
              style={[
                keyboardStyles.keyButtonStyle,
                keyData.key in this.state.isPressed ?
                  keyboardStyles.keyButtonOverlayStyle :
                  keyboardStyles.keyButtonPressedStyle
              ]}>
              {this.renderKeyText(2, idx)}
            </View>
          </View>
        ))}

        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 100,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('ENTER') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('ENTER') }}
          key={'ENTER'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Enter
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'ENTER' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
                {
                  height: '108%',
                  width: '108%',
                }
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Enter
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderKeyboardForthRow() {
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 115,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('SHIFT_LEFT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('SHIFT_LEFT') }}
          key={'SHIFT_LEFT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Shift
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'SHIFT_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
                {
                  height: '108%',
                  width: '108%',
                }
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Shift
            </Text>
          </View>
        </View>


        {keyboardData[3].map((keyData, idx) => (
          <View
            style={[
              keyboardStyles.keyButtonStyle
            ]}
            onTouchStart={() => { this.handleKeyboardTouchStarted(keyData.key) }}
            onTouchEnd={() => { this.handleKeyboardTouchEnded(keyData.key) }}
            key={keyData.key}>
            {this.renderKeyText(3, idx)}
            <View
              style={[
                keyboardStyles.keyButtonStyle,
                keyData.key in this.state.isPressed ?
                  keyboardStyles.keyButtonOverlayStyle :
                  keyboardStyles.keyButtonPressedStyle
              ]}>
              {this.renderKeyText(3, idx)}
            </View>
          </View>
        ))}

        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 125,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('SHIFT_RIGHT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('SHIFT_RIGHT') }}
          key={'SHIFT_RIGHT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Shift
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'SHIFT_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
                {
                  height: '108%',
                  width: '108%',
                }
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Shift
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderKeyboardFifthRow() {
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('CTRL_LEFT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('CTRL_LEFT') }}
          key={'CTRL_LEFT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Ctrl
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'CTRL_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Ctrl
            </Text>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('WIN_LEFT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('WIN_LEFT') }}
          key={'WIN_LEFT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Win
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'WIN_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Win
            </Text>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('ALT_LEFT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('ALT_LEFT') }}
          key={'ALT_LEFT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Alt
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'ALT_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Alt
            </Text>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            {
              width: 300
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('SPACE') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('SPACE') }}
          key={'SPACE'}>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'SPACE' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle,
                {
                  height: '103%',
                  width: '103%',
                  marginLeft: -4,
                  marginTop: -2,
                }
            ]}>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('ALT_RIGHT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('ALT_RIGHT') }}
          key={'ALT_RIGHT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Alt
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'ALT_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Alt
            </Text>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('WIN_RIGHT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('WIN_RIGHT') }}
          key={'WIN_RIGHT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Win
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'WIN_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Win
            </Text>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { }}
          onTouchEnd={() => { }}
          key={'FUNC'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Fn
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'FUNC' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Fn
            </Text>
          </View>
        </View>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonSpecialStyle
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('CTRL_RIGHT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('CTRL_RIGHT') }}
          key={'CTRL_RIGHT'}>
          <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
            Ctrl
          </Text>
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'CTRL_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonPressedStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText]}>
              Ctrl
            </Text>
          </View>
        </View>
      </View>
    )
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
      <View style={[keyboardStyles.keyboardContainer]}>
        {this.renderKeyboardFirstRow()}
        {this.renderKeyboardSecondRow()}
        {this.renderKeyboardThirdRow()}
        {this.renderKeyboardForthRow()}
        {this.renderKeyboardFifthRow()}
      </View>
    )
  }
}

const keyboardStyles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    marginLeft: 48,
    flexDirection: 'column'
  },
  keyboardRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -3
  },
  keyButtonStyle: {
    backgroundColor: '#E3D5CA',
    zIndex: 0,
    height: 50,
    width: 45,
    borderRadius: 10,
    marginLeft: 4,
    marginBottom: 2,
    marginTop: 10
  },
  keyButtonPressedStyle: {
    opacity: 0
  },
  keyButtonOverlayStyle: {
    backgroundColor: '#ece1db',
    position: 'absolute',
    height: '115%',
    width: '115%',
    borderRadius: 10,
    marginLeft: -4,
    marginTop: -4,
  },
  keyButtonSpecialStyle: {
    width: 58,
    alignItems: 'center'
  },
  keyButtonAlphabetText: {
    marginTop: 2,
    marginLeft: 7,
    fontSize: 24
  },
  keyButtonWithShiftKeyText: {
    marginTop: 2,
    marginLeft: 10,
    fontSize: 16
  },
  keyboardSpecialText: {
    marginTop: 14,
    textAlignVertical: 'center',
    textAlign: 'center',
    // marginRight: 0,
    fontSize: 16
  },
  keyButtonTextStyle: {
    color: '#000000',
    fontSize: 32
  },
  whiteText: {
    color: '#FFFFFF'
  },
  darkText: {
    color: '#FF00FF'
  }
})
