import React, { useEffect } from 'react';
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
import { ScrollView, View ,StyleSheet } from "react-native";


export default function ContactList(props) {

    const contacts = useSelector(selectContact)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readContactAsync())
    }, [dispatch])
    // [dispatch] itu watcher / penonton yg []
    //klo variable berubah ngerender /jalan ulang

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(pagination())
        }
    }

    return (
        <View> 
        <ScrollView scrollEnabled={scrolling} pagingEnabled={true} showsHorizontalScrollIndicator={true}>
            {
                contacts.map((user, index) => (
                    <ContactItem
                        key={user.id}
                        contact={user}
                        sent={user.sent}
                        remove={() => dispatch(deleteContactAsync(user.id))}
                        resend={() => dispatch(createContactAsync({ id: user.id, name: user.name, phone: user.phone }))}
                        update={(name, phone) => dispatch(updateContactAsync({ id: user.id, name, phone }))}
                    />
                ))
            }
        </ScrollView>
        </View>
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
    input:{
        borderWidth:2,
        borderColor:'#f5f6fa',
        borderRadius:6,
        borderTopWidth:0,
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
        marginTop:10,
        marginHorizontal:5
    },
    cancel: {
        backgroundColor: '#f39c12',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical:10,
        marginHorizontal:5
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


