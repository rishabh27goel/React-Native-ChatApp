import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from '@rneui/base';
import { AntDesign, Ionicons, Foundation } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({ navigation }) {

  // For storing the chats list
  const [ chatList, setChatList ] = useState([]);


  // Setting Up Header
  useLayoutEffect(() => {

    navigation.setOptions({

      title: "Chats",
      headerTintColor: '#fff',
      headerTitleStyle: {

        fontWeight: '500',
      },
      headerLeft: () => (
        <View style={{ marginLeft: 5 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={signOutUser}>
            <Avatar
              rounded
              size={40}
              source={{

                uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxu2Ehw3j0RmPYvz24W_cN50zZvTbU9-mhPw&usqp=CAU`,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.iconsContainer}>         
          <TouchableOpacity activeOpacity={0.8} onPress={ () => navigation.navigate("Add Chat Screen") }>
            <Foundation 
              name="pencil" 
              size={25} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      )
    });
    
  }, []);


  // To get the chats from firestore cloud
  useFocusEffect(() => {

    async function fetchChats() {

      chatObjectList = [];
      const querySnapshot = await getDocs(collection(db, "Chats"));
    
      querySnapshot.forEach((doc) => {

        const chatObj = {

          id: doc.id,
          data: doc.data(),
        };
        
        chatObjectList.push(chatObj);
      });

      setChatList(chatObjectList);
    }

    fetchChats();
  });

  // For signing out user
  const signOutUser = () => {
    
    auth
    .signOut()
    .then(() => {

      navigation.replace("Login Screen");
    });
  };


  return (
    <SafeAreaView>
      <StatusBar style='light' />
      
      <ScrollView>
          {
            chatList.map(({ id, data: { chatName } }) => (

              <CustomListItem key={id} id={id} chatTitle={chatName} navigation={navigation}/>
            ))
          }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 25,
  },
});