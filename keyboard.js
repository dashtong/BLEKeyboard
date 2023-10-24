import { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import base64 from 'react-native-base64'
import { BleManager } from 'react-native-ble-plx'
// import { btoa } from 'react-native-quick-base64'

const manager = new BleManager()
const keyboardData = [
  [
    {
      key: 'Esc',
      shifted: '',
      caps: false
    },
    {
      key: 'Insert',
      shifted: '',
      caps: false
    },
    {
      key: 'Del',
      shifted: '',
      caps: false
    },
    {
      key: 'Home',
      shifted: '',
      caps: false
    },
    {
      key: 'End',
      shifted: '',
      caps: false
    },
    {
      key: 'Up',
      shifted: '',
      caps: false
    },
    {
      key: 'Down',
      shifted: '',
      caps: false
    },
  ],
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
    this.state = { isPressed: {} }
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

  renderSpecialText(text, firstRow = false) {
    return (
      <View>
        <Text style={[keyboardStyles.keyButtonTextStyle, keyboardStyles.keyboardSpecialText,
        firstRow ?
          {
            marginTop: 10,
          } :

          {
            marginTop: 14,
          }
        ]}>
          {text}
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
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonFirstRowStyle,
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted(keyboardData[0][0].key) }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded(keyboardData[0][0].key) }}
          key={keyboardData[0][0].key}>
          {this.renderSpecialText(keyboardData[0][0].key, true)}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              keyboardData[0][0].key in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            {this.renderSpecialText(keyboardData[0][0].key, true)}
          </View>
        </View>

        <View
          style={[
            keyboardStyles.keyButtonStyle,
            keyboardStyles.keyButtonTransparentStyle,
            keyboardStyles.keyButtonFirstRowStyle,
            {
              width: 285
            }
          ]}
          key="">
        </View>

        {keyboardData[0].slice(1).map((keyData, idx) => (
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              keyboardStyles.keyButtonFirstRowStyle,
            ]}
            onTouchStart={() => { this.handleKeyboardTouchStarted(keyData.key) }}
            onTouchEnd={() => { this.handleKeyboardTouchEnded(keyData.key) }}
            key={keyData.key}>
            {this.renderSpecialText(keyData.key, true)}
            <View
              style={[
                keyboardStyles.keyButtonStyle,
                keyData.key in this.state.isPressed ?
                  keyboardStyles.keyButtonOverlayStyle :
                  keyboardStyles.keyButtonTransparentStyle
              ]}>
              {this.renderSpecialText(keyData.key, true)}
            </View>
          </View>
        ))}
      </View>
    )
  }

  renderKeyboardSecondRow() {
    return (
      <View style={[keyboardStyles.keyboardRowContainer]}>
        {keyboardData[1].map((keyData, idx) => (
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
                  keyboardStyles.keyButtonTransparentStyle
              ]}>
              {this.renderKeyText(1, idx)}
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
          {this.renderSpecialText("Backspace")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'BACKSPACE' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle,
              {
                height: '110%',
                width: '110%',
              }
            ]}>
            {this.renderSpecialText("Backspace")}
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
              width: 70,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('TAB') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('TAB') }}
          key={'TAB'}>
          {this.renderSpecialText("Tab")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'TAB' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle,
              {
                height: '110%',
                width: '110%',
              }
            ]}>
            {this.renderSpecialText("Tab")}
          </View>
        </View>

        {keyboardData[2].slice(0, -1).map((keyData, idx) => (
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
                  keyboardStyles.keyButtonTransparentStyle
              ]}>
              {this.renderKeyText(2, idx)}
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
          key={keyboardData[2][keyboardData[2].length - 1].key}>
          {this.renderKeyText(2, 12)}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              keyboardData[2][keyboardData[2].length - 1].key in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            <Text style={[keyboardStyles.keyButtonTextStyle, { marginTop: 6 }]}>
              {this.renderKeyText(2, 12)}
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
              width: 90,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('CAPS') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('CAPS') }}
          key={'CAPS'}>
          {this.renderSpecialText("Caps Lock")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'CAPS' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle,
              {
                height: '108%',
                width: '108%',
              }
            ]}>
            {this.renderSpecialText("Caps Lock")}
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
                  keyboardStyles.keyButtonTransparentStyle
              ]}>
              {this.renderKeyText(3, idx)}
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
          {this.renderSpecialText("Enter")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'ENTER' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle,
              {
                height: '108%',
                width: '108%',
              }
            ]}>
            {this.renderSpecialText("Enter")}
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
            {
              width: 115,
              alignItems: 'center'
            }
          ]}
          onTouchStart={() => { this.handleKeyboardTouchStarted('SHIFT_LEFT') }}
          onTouchEnd={() => { this.handleKeyboardTouchEnded('SHIFT_LEFT') }}
          key={'SHIFT_LEFT'}>
          {this.renderSpecialText("Shift")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'SHIFT_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle,
              {
                height: '108%',
                width: '108%',
              }
            ]}>
            {this.renderSpecialText("Shift")}
          </View>
        </View>


        {keyboardData[4].map((keyData, idx) => (
          <View
            style={[
              keyboardStyles.keyButtonStyle
            ]}
            onTouchStart={() => { this.handleKeyboardTouchStarted(keyData.key) }}
            onTouchEnd={() => { this.handleKeyboardTouchEnded(keyData.key) }}
            key={keyData.key}>
            {this.renderKeyText(4, idx)}
            <View
              style={[
                keyboardStyles.keyButtonStyle,
                keyData.key in this.state.isPressed ?
                  keyboardStyles.keyButtonOverlayStyle :
                  keyboardStyles.keyButtonTransparentStyle
              ]}>
              {this.renderKeyText(4, idx)}
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
          {this.renderSpecialText("Shift")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'SHIFT_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle,
              {
                height: '108%',
                width: '108%',
              }
            ]}>
            {this.renderSpecialText("Shift")}
          </View>
        </View>
      </View>
    )
  }

  renderKeyboardSixthRow() {
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
          {this.renderSpecialText("Ctrl")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'CTRL_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
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
          {this.renderSpecialText("Win")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'WIN_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            {this.renderSpecialText("Win")}
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
          {this.renderSpecialText("Alt")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'ALT_LEFT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            {this.renderSpecialText("Alt")}
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
                keyboardStyles.keyButtonTransparentStyle,
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
          {this.renderSpecialText("Alt")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'ALT_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            {this.renderSpecialText("Alt")}
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
          {this.renderSpecialText("Win")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'WIN_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            {this.renderSpecialText("Win")}
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
          {this.renderSpecialText("Fn")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'FUNC' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
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
          {this.renderSpecialText("Ctrl")}
          <View
            style={[
              keyboardStyles.keyButtonStyle,
              'CTRL_RIGHT' in this.state.isPressed ?
                keyboardStyles.keyButtonOverlayStyle :
                keyboardStyles.keyButtonTransparentStyle
            ]}>
            {this.renderSpecialText("Ctrl")}
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
        {this.renderKeyboardSixthRow()}
      </View>
    )
  }
}

const keyboardStyles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    marginLeft: 48,
    marginTop: -20,
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
    marginTop: 8
  },
  keyButtonTransparentStyle: {
    opacity: 0
  },
  keyButtonOverlayStyle: {
    backgroundColor: '#ece1db',
    position: 'absolute',
    height: '115%',
    width: '115%',
    borderRadius: 10,
    marginLeft: -3,
    marginTop: -4,
  },
  keyButtonFirstRowStyle: {
    height: 40,
    width: 60,
  },
  keyButtonSpecialStyle: {
    width: 58,
  },
  keyboardSpecialText: {
    textAlign: 'center',
    fontSize: 16,
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
