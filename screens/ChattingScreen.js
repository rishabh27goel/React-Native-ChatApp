import { StyleSheet, Text, Touchable, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { collection, addDoc, doc, Firestore, serverTimestamp, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';


export default function ChattingScreen({ navigation, route}) {

    // Storing the messages
    const [ messageList, setMessageList ] = useState([]);
    const [ messageText, setMessageText ] = useState(""); 
 
    // Setting Up Header
    useLayoutEffect(() => {

        navigation.setOptions({

            headerTitleAlign: 'left',
            headerTitle: () => (

                <View style={{ flexDirection: 'row', marginLeft: -15, width: 200 }}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={{ 
                        color: "white",
                        fontSize: 17,
                        fontWeight: "700",
                        width: 190,
                    }}> 
                        {route.params.chatTitle} 
                    </Text>
                </View>
            ),
            headerRight: () => (

                <View style={styles.iconsContainer}> 
                    <TouchableOpacity activeOpacity={0.8}>
                        <FontAwesome 
                            name="video-camera" 
                            size={21} 
                            color="white" 
                        />
                    </TouchableOpacity>        
                    <TouchableOpacity activeOpacity={0.8}>
                        <Ionicons 
                            name="call" 
                            size={20} 
                            color="white" 
                        />
                    </TouchableOpacity>
                </View>
            )
        });

    }, [navigation]);


    // Getting the messages from Firebase Firestore
    useFocusEffect(() => {

        async function fetchMessages() {
    
            messageObjectList = [];

            const chatsRef = doc(db, "Chats", route.params.id);
            const querySnapshot = await getDocs(collection(chatsRef, "Messages"));
            
            querySnapshot.forEach((doc) => {
        
                const mssgObj = {
        
                    id: doc.id,
                    data: doc.data(),
                };
                
                messageObjectList.push(mssgObj);
            });
        
            setMessageList(messageObjectList);
        }   

        fetchMessages();
    });


    // When a message is send
    const sendMessage = async() => {

        Keyboard.dismiss();

        // Reference to chats
        const chatsRef = doc(db, "Chats", route.params.id);

        await addDoc(collection(chatsRef, "Messages"), {
            
            timestamp: serverTimestamp(),
            messageText: messageText,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        .catch((error) => alert(error.message))

        setMessageText('');
    };

    return (
        
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar style='light' />

            <KeyboardAvoidingView style={{flex: 1}}>

                {/* Chatting Window */}
                <ScrollView>
                    
                </ScrollView> 
                
                {/* Message Footer */}
                <View style={styles.footer}>
                    <TextInput 
                        placeholder='Type your message...'
                        style={ styles.textInput }
                        value={messageText}
                        onChangeText={ (message) => setMessageText(message) }
                        onSubmitEditing={ sendMessage }
                    />
                    <TouchableOpacity onPress={ sendMessage } activeOpacity={0.8}>
                        <Ionicons 
                            name="send" 
                            size={24} 
                            color="#3b68e6" 
                        />
                    </TouchableOpacity>
                </View>   
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    iconsContainer: {
    
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 62,
        marginRight: 4,
    },
    footer: {

        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        bottom: 0,
    },  
    textInput: {

        bottom: 0,
        height: 45,
        flex: 1,
        borderColor: 'transparent',
        backgroundColor: "#ececec",
        borderRadius: 25,
        borderWidth: 1,
        marginRight: 10,
        fontSize: 15,
        padding: 10,
        paddingHorizontal: 18,
        color: 'grey',
    },
})