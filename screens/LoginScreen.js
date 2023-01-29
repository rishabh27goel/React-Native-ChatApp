import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useEffect, useState } from 'react'
import { Input, Image, Button } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  
    // Storing Data Entries
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // Check if entry exists in firebase
    useEffect(() => {

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        
        if(user){
          
          // For no coming back to login
          navigation.replace("Home Screen");
        } 
         
      });

      return unsubscribe;
      
    }, []);


    // Sign In Function
    const signIn = () => { 

      signInWithEmailAndPassword(auth, email, password)
      .catch((error) => alert(error.message));
    }

    return (

        <KeyboardAvoidingView style={styles.container}>    
          
          <StatusBar style='light' />
          <Image
            source={{
                uri: "https://preview.redd.it/jdto14wkj9f51.png?auto=webp&s=8e1d0f6b8b80e73a08ddd3b7b4e0f8bafeb94585",
            }}

            style={{
              width: 160,
              height: 160,
            }}
          />
          <View style={styles.inputContainer}> 
            <Input 
              autoFocus
              placeholder='Email'
              type='email'
              value={email}
              onChangeText={ emailText => setEmail(emailText) }
            />
            <Input 
              secureTextEntry
              placeholder='Password'
              type='password'
              value={password}
              onChangeText={ passwordText => setPassword(passwordText) }
            />
          </View>

          <Button 
            containerStyle={styles.buttons} 
            title='Login'
            onPress={signIn}
          />
          <Button 
            containerStyle={styles.buttons} 
            type='outline' 
            title='Register'
            onPress={ () => navigation.navigate("Register Screen") }
          />

          <View style={{ height: 50 }}/>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  inputContainer: {
    width: 280,
    marginTop: 50
  },

  buttons: {
    width: 200,
    marginTop: 10,
  },
});