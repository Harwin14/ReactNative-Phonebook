import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faContactBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function Contact() {
    const [user, setUser] = useState({
        isAdd: false
    })

    const handleAddForm = () => {
        setUser({
            isAdd: true
        })
    }
    const handleCancelForm = () => {
        setUser({
            isAdd: false
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>PhoneBooks Apps</Text>
            <View >
                {
                    user.isAdd ? <ContactForm cancel={handleCancelForm} />
                        :
                        <TouchableOpacity style={styles.button} onPress={handleAddForm}>
                            <Text style={styles.labelButton}>Add</Text>
                        </TouchableOpacity>
                }
                <ContactSearch />
            </View>
            <View>
                <ContactList />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    form: {
        height: 40,
        borderWidth: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        width: 60,
        height: 40,
        padding: 5,
        backgroundColor: 'blue',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
    },
    labelButton: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
});

