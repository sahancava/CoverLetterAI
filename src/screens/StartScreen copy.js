import React, { useRef, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <Background>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Logo />
        <Header>Login Template</Header>
        <Paragraph>
          The easiest way to start with your amazing application.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Button>
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 0,  // Assuming you want some padding around your content
    paddingBottom: 126,      // Padding at the bottom
    paddingTop: 64,
    overflow: 'hidden',
    maxWidth: '100%'
  },
});