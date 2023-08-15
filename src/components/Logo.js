import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo({ position }) {
  return <Image source={require('../assets/logo.png')} style={[
    styles.image,
    { position: 'absolute', top: position, left: '50%', transform: [{ translateX: -30 }]}
  ]} />
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
})
