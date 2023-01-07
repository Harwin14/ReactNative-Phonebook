import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faContactBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { View } from "react-native";


export default function Contact() {

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            margin: 0, 
            padding: 20 
        }}>

            <ContactForm />
            <ContactList />
        </View>
    )
}
// const styles = StyleSheet.create({
//     container: {
//         height: 40,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },
//     add: {
//         height: 40,
//         width: 75,
//         backgroundColor: 'purple',
//         borderStyle: 'solid',
//         borderColor: 'white',
//         borderWidth: 1,
//         borderRadius: 6,
//     },
//     labelButton: {
//         color: "#ffffff"
//     }
// });