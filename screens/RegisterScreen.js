import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Input, Image, Button, Text } from '@rneui/base';
import { auth } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";


export default function RegisterScreen({ navigation }) {

    // Storing Register Data
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');

    // Register Function
    const register = () => {
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                updateProfile(userCredential.user, {
                    
                    displayName: name,
                    photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSEuKKwqIqbJH-NRiDHluGbuC9ysMW99BPA&usqp=CAU",
                
                    // photoURL: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSEuKKwqIqbJH-NRiDHluGbuC9ysMW99BPA&usqp=CAU",
                })
                .catch((error) => alert(error.message));
            })
            .catch((error) => alert(error.message));
    };


    return (
        <KeyboardAvoidingView enabled style={styles.container}>
            <StatusBar style='light' />

            <View style={styles.inputContainer}>

                <Text h4 style={{ marginBottom: 45, color: '#356fcb' }}> Create a chat account : </Text>
                
                <Input
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChangeText={ nameText => setName(nameText) }
                />
                <Input 
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChangeText={ emailText => setEmail(emailText) }
                />
                <Input 
                    secureTextEntry
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChangeText={ passwordText => setPassword(passwordText) }
                />
                <Input 
                    type='text'
                    placeholder='Profile Picture Url (optional)'
                    value={imageUrl}
                    onChangeText={ urlText => setImageUrl(urlText) }
                    // onSubmitEditing={register}
                />
            </View>

            <Button 
                raised
                containerStyle={styles.buttons}
                title='Register'
                onPress={register}
            />

            <View style={{ height: 50 }}/>
        </KeyboardAvoidingView>
    )
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
        width: 300,
    },
    buttons: {
        width: 200,
        marginTop: 30,
    },
});