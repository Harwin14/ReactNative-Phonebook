import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
export default class ContactItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            name: props.contact.name,
            phone: props.contact.phone
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdate = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({ isEdit: false })
    }
    render() {
        if (this.state.isEdit) {
            return (
                <View style={styles.container}>
                    <View>
                        <View>
                            <TextInput
                                value={this.state.name}
                                onPress={this.handleInputChange}
                            />
                        </View>
                        <View style=''>
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

                </View>
            )
        } else {
            return (

                <View>
                    <View>
                        <View>
                            <View><FontAwesomeIcon icon={faIdBadge} />
                                <Text style='font'> Name : </Text>
                                <Text>{this.state.name}</Text>
                            </View>
                            <View>
                                <FontAwesomeIcon icon={faPhoneSquare} />
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
                    </View>
                </View>
            )
        }
    }
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