import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Avatar, ListItem } from '@rneui/base';


export default function CustomListItem({ id, chatTitle, navigation }) {

    const moveToChat = () => {

        navigation.navigate("Chatting Screen", {

            id,
            chatTitle
        });
    };

    return (
        <ListItem key={id} onPress={moveToChat} style={{ margin: 1 }} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSEuKKwqIqbJH-NRiDHluGbuC9ysMW99BPA&usqp=CAU",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800", marginBottom: 5 }}>
                    { chatTitle }
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is Chat Subtitle. 
                    This is Chat Subtitle. 
                    This is Chat Subtitle. 
                    This is Chat Subtitle. 
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({


})