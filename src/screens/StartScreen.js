import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../core/theme'

export default function StartScreen() {
    const navigation = useNavigation();

    return (
        <Background>
          <Header>Choose an Option</Header>
          <Paragraph>
              What would you like to do?
          </Paragraph>
          <Pressable
            activeOpacity={0.}
            style={({pressed}) => [
              styles.itemBox,
              pressed && { opacity: .8, backgroundColor: '#7B3A71'},
            ]}
            onLongPress = {() => navigation.navigate('FileUploadScreen')}
            onPress={() => navigation.navigate('FileUploadScreen')}
          >
            <Text style={styles.itemText}>Import a resume/CV</Text>
          </Pressable>
          <Pressable
            activeOpacity={0.}
            style={({pressed}) => [
              styles.itemBox,
              pressed && { opacity: .8, backgroundColor: '#7B3A71'},
            ]}
            onLongPress = {() => navigation.navigate('FileUploadScreen')}
            onPress={() => navigation.navigate('FileUploadScreen')}
          >
            <Text style={styles.itemText}>Provide LinkedIn Profile</Text>
          </Pressable>
        </Background>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 0, // Assuming you want some padding around your content
        paddingBottom: 126,    // Padding at the bottom
        paddingTop: 64,
        overflow: 'hidden',
        maxWidth: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    itemBox: {
        margin: 10, padding: 40, backgroundColor: theme.colors.primary, width: '100%', borderRadius: 4, justifyContent: 'center', alignItems: 'center'
    },
    itemText: { fontSize: 20, lineHeight: 26, color: 'white', fontWeight: 'bold'}
});
