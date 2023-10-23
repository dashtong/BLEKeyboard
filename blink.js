import { Component } from 'react'
import { Animated, View } from 'react-native'

export default class Blink extends Component {
  constructor(props) {
    super(props)
    this.fadeAnimation = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.fadeAnimation, {
          toValue: 0,
          duration: this.props.duration,
          useNativeDriver: true
        }),
        Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: this.props.duration,
          useNativeDriver: true
        })
      ])
    ).start()
  }

  render() {
    if (!this.props.state) {
      return (<View>{this.props.children}</View>)
    }
    return (
      <View style={{ ...this.props.style }}>
        <Animated.View style={{ opacity: this.fadeAnimation }}>
          {this.props.children}
        </Animated.View>
      </View>
    )
  }
}
