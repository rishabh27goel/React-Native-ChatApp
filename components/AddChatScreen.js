import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button } from '@rneui/base';
import { Entypo } from '@expo/vector-icons';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";


export default function AddChatScreen({ navigation }) { 

    // Storing Input Data
    const [ chatName, setChatName ] = useState("");

    // Adding data to firebase firestore
    const addNewChat = async() => {

        await 
            addDoc(collection(db, "Chats"), {
                
                chatName: chatName
            })
            .then( () => navigation.goBack() )
            .catch((error) => alert(error.message))
    };

    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Add a new Chat",
            headerTitleAlign: 'left',
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });

    }, [navigation]);

    return (

        <View style={styles.container}>
            <Input 
                leftIcon={
                    <Entypo 
                        name="chat" 
                        size={27} 
                        style={{ marginRight: 8 }}
                        color="#408ade" 
                    />
                    
                }
                placeholder='Enter a chat name '
                value={chatName}
                onChangeText={ chatText => setChatName(chatText) }
                onSubmitEditing={addNewChat}
            />
            <Button 
                raised
                title='Create Chat'
                onPress={addNewChat}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        height: "100%",
        padding: 18
    }
});