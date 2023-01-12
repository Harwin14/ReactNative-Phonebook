import React, { useEffect} from 'react';
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
import {  View, FlatList } from "react-native";


export default function ContactList(props) {
    const contacts = useSelector(selectContact)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readContactAsync())
    }, [dispatch])

   
    const renderItem = ({ item }) => {
        return (
            <View>
                <ContactItem
                    contact={item}
                    key={item.id}
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