import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default function ContactItem() {
    const [user, setUser] = useState({
        id: props.users.id,
        name: props.users.name,
        phone: props.users.phone
    })
 
    const handleEditForm = () => {
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
            {
                user.isEdit ? 
                <View>
                    <View>
                        <TextInput
                            value={this.state.name}
                            onPress={this.handleInputChange}
                        />
                    </View>
                    <View>
                        <TextInput
                            value={this.state.phone}
                            onPress={this.handleInputChange}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this.handleUpdate}>
                            <Text> Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setState({ isEdit: false })}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                :
            <View>
                <View>
                    <Text style='font'> Name : </Text>
                    <Text>{this.state.name}</Text>
                </View>
                <View>
                    <Text style='font'> Phone : </Text>
                    <Text>{this.state.phone}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.setState({ isEdit: true })}>
                        <Text> Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.props.sent ? this.props.remove : this.props.resend}
                        style={this.props.sent ? 'styles.remove' : 'styles.resend'}>
                        <Text style={styles.labelButton}>{this.props.sent ? 'Delete' : 'Resend'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    remove: {
        height: 40,
        width: 75,
        backgroundColor: 'red',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
    },
    resend: {
        height: 40,
        width: 75,
        backgroundColor: 'yellow',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
    },
    labelButton: {
        color: "#ffffff"
    }
});