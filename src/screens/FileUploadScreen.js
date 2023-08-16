import React, { useState, useEffect, useRef } from 'react'
import { ActivityIndicator, Text, Platform, StyleSheet, Pressable } from 'react-native'
import Header from '../components/Header'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import * as DocumentPicker from 'expo-document-picker'
import { FontAwesome } from '@expo/vector-icons'
import GeneralModal from '../components/GeneralModal';
import * as Application from 'expo-application'
import { FIREBASE_STORAGE } from '../../firebaseConfig'
import { uploadBytesResumable, ref } from 'firebase/storage';
import { theme } from '../core/theme'
import mobileAds, { MaxAdContentRating, InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);


// mobileAds()
//   .setRequestConfiguration({
//     // Update all future ad requests suitable for parental guidance
//     maxAdContentRating: MaxAdContentRating.PG,

//     // Indicates that you want your content treated as child-directed for purposes of COPPA.
//     tagForChildDirectedTreatment: true,

//     // Indicates that you want the ad request to be handled in a manner suitable for users under the age of consent.
//     tagForUnderAgeOfConsent: true,
//   })
//   .then(() => {
//     // Request config successfully set!
//   });

// eslint-disable-next-line react/prop-types
export default function FileUploadScreen({ navigation }) {
    const [selectedURL, setSelectedURL] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [deviceID, setDeviceID] = useState(null)
    const deviceIDRef = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [showConnectionError, setShowConnectionError] = useState(false);
    const [connectionChecked, setConnectionChecked] = useState(false);
    const [adLoaded, setAdLoaded] = useState(false);
    
    interstitial.addAdEventsListener((type, error) => {
      if (type === AdEventType.LOADED) {
        setAdLoaded(true);
      }
    });
    interstitial.load();

    const checkConnection = async () => {
      try {
          const response = await fetch('http://192.168.3.97:5001/isConnected');
          const data = await response.json();
  
          if (data.message === 'Connected successfully') {
              setShowConnectionError(false);
              setConnectionChecked(true);
          } else {
              setIsConnected(false);
              setShowConnectionError(true);
          }
      } catch (error) {
          console.error('Error checking connection:', error);
          setIsConnected(false);
          setShowConnectionError(true);
      }
    };
  
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            })
            if (!result.canceled) {
                setSelectedURL(result.assets[0].uri)
            }
        } catch (err) {
            console.error('Document picking error:', err)
        }
    }

    const checkDeviceID = async () => {
        let _deviceID = null
        if (Platform.OS === 'ios') {
            _deviceID = await Application.getIosIdForVendorAsync()
        } else {
            _deviceID = Application.androidId
        }
        return _deviceID
    }

    const handleUpload = async () => {
        setUploading(true);

        if (selectedURL) {
          try {
            // Read file as blob
            const blob = await new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.onload = function() {
                resolve(xhr.response);
              };
              xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
              };
              xhr.responseType = 'blob';
              xhr.open('GET', selectedURL, true);
              xhr.send(null);
            });
        
            // Set file name
            const fileName = selectedURL.split('/').pop();
        
            // Create a reference to the location you want to upload to in firebase
            const storageRef = ref(FIREBASE_STORAGE, 'uploads/' + fileName);
        
            // Use the put method to upload the blob
            const uploadTask = uploadBytesResumable(storageRef, blob);
        
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setUploadProgress(progress);
              }, 
              (error) => {
                console.error('Error uploading file:', error);
                setUploading(false);
              }, 
              () => {
                // Upload completed successfully, handle success action here
                setUploadSuccess(true);
                setTimeout(async () => {
                  setUploading(false);
                  setUploadSuccess(false);
                  setSelectedURL(null);
                  // navigation.navigate('StartScreen'); // Navigating to StartScreen
                  
                  interstitial.show();
                  if (adLoaded) {
                    interstitial.show();
                  } else {
                      // If the ad isn't loaded for some reason, navigate directly
                      navigation.navigate('StartScreen');
                  }
                }, 3000);
              }
            );
        
          } catch (error) {
            console.error('Upload error:', error);
            setUploading(false);
          }
        }
        setUploadProgress(0);
    };
  
    const renderUploadContent = () => {
      if (uploadSuccess) {
          return (
              <>
                  <FontAwesome name="check" size={50} color="green" />
                  <Text style={styles.text}>Upload Successful!</Text>
              </>
          );
      } else {
          return (
              <>
                  <ActivityIndicator size="large" color="green" />
                  <Text style={styles.text}>{`Uploading: ${uploadProgress.toFixed(0)}%`}</Text>
              </>
          );
      }
    };

    const registerUser = async (_deviceid) => {
      try {
          const response = await fetch('http://192.168.3.97:5001/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  deviceID: _deviceid
              }),
          });

          const data = await response.json();
          if (data.message === 'User already registered') {
              console.log('User ID:', data.userID, 'Device ID:', data.deviceID, 'User Type:', data.userType);
          } else if (data.message === 'User registered successfully') {
              console.log('New User registered with User ID:', data.userID, 'as', data.userType);
          }
      } catch (error) {
          console.error('Error registering user:', error);
      }
    };

    useEffect(() => {
      if (!connectionChecked) {
          checkConnection(); // Immediate check
      }
    }, [connectionChecked]);

    useEffect(() => {
      const fetchDeviceID = async () => {
        let _deviceID = await checkDeviceID()
        setDeviceID(_deviceID);
        deviceIDRef.current = _deviceID;  // <-- Update the ref value
      }

      if (deviceID) {
        registerUser(deviceID);
      }

      setTimeout(() => {
        // setinterval check if deviceID is not null, when not null, clear interval
        const interval = setInterval(() => {
          fetchDeviceID();
          if (deviceIDRef.current) {  // <-- Check the ref value
            clearInterval(interval);
          }
        }, 100);
      }, 100);

    }, [deviceID]);

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Upload PDF File</Header>
            <Header>
                {selectedURL ? selectedURL.split('/').pop() : 'No PDF selected'}
            </Header>
            <Button style={null} mode="contained" color="purple" onPress={pickDocument}>
                Select PDF
            </Button>
            {selectedURL && (
                <Button style={null} mode="contained" color="green" onPress={handleUpload}>
                    Upload
                </Button>
            )}
            <GeneralModal 
                visible={uploading} 
                onClose={() => setUploading(false)}
            >
                {renderUploadContent()}
            </GeneralModal>
            <GeneralModal 
                visible={showConnectionError}
                onClose={() => setShowConnectionError(false)}
            >
                <FontAwesome name="times-circle" size={110} color="red" />
                <Text style={{color: 'red', fontWeight: 'bold', marginTop: 10, fontSize: 24}}>Error: Unable to connect to server.</Text>
                
                <Pressable
                    style={({pressed}) => [
                        styles.itemBox,
                        pressed && { opacity: 0.8, backgroundColor: '#7B3A71'},
                    ]}
                    onPress={checkConnection}
                >
                    <Text style={styles.itemText}>Retry Connection</Text>
                </Pressable>
            </GeneralModal>

        </Background>
    )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 26,
    marginTop: 20,
  },
  itemBox: {
      marginTop: 60, 
      padding: 40, 
      backgroundColor: theme.colors.primary, 
      width: '80%', 
      borderRadius: 4, 
      justifyContent: 'center', 
      alignItems: 'center'
  },
  itemText: { 
      fontSize: 20, 
      lineHeight: 26, 
      color: 'white', 
      fontWeight: 'bold'
  },
})