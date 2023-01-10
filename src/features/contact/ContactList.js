import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../../components/ContactItem"
import {
    readContactAsync,
    selectContact,
    deleteContactAsync,
    createContactAsync,
    updateContactAsync,
    pagination
} from './contactSlice'
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { render } from 'react-dom';


export default function ContactList(props) {
    const [users, setUser] = useState([])
    const contacts = useSelector(selectContact)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readContactAsync())
    }, [dispatch])

   
    const renderItem = ({ item }) => {
        return (
            <View>
                <ContactItem
                    key={item.id}
                    contact={item}
                    sent={item.sent}
                    remove={() => dispatch(deleteContactAsync(item.id))}
                    resend={() => dispatch(createContactAsync({ id: item.id, name: item.name, phone: item.phone }))}
                    update={(name, phone) => dispatch(updateContactAsync({ id: item.id, name, phone }))}
                    toggle={props.toggle}
                />
            </View>
        )
    }
    return (
        <FlatList
            style={{maxHeight:600}}
            data={contacts}
            renderItem={renderItem}
            keyExtractor={user => user.id}
            onEndReached={() => dispatch(pagination())}
            onEndReachedThreshold={0.2}

        />
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 0,
        width: '100%',
        marginVertical: 10,
    },
    cardHeader: {
        backgroundColor: '#f5f6fa',
        borderRadius: 5,
        width: '100%',
        height: 40,
        paddingHorizontal: 10
    },
    chead: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignContent: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginTop: 10
    },
    input: {
        borderWidth: 2,
        borderColor: '#f5f6fa',
        borderRadius: 6,
        borderTopWidth: 0,
        height: 40
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 20,
        shadowColor: 'black',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#4cd137',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 5
    },
    cancel: {
        backgroundColor: '#f39c12',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5
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


