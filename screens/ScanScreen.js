import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            /*
            status === "granted" is true when user has granted permission
            status === "granted" is false when user has not granted the permission
            */
            hasCameraPermissions: status === "granted"
        })
    }

    handleBarCodeScanned = async ({type, data}) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermissions) {
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        } else if(buttonState === 'normal') {
            return(
                <View style = { styles.container }>
                <Image
                    style = {{ height: 130, width: 130 }}
                    source = {require('../assets/scanner.jpeg')}
                />
                    <Text style = {styles.displayText}>
                        {hasCameraPermissions === true ? this.state.scannedData: "Request Camera Permission"}
                    </Text>
                    <TouchableOpacity
                        style = {styles.scanButton}
                        onPress = {this.getCameraPermission}
                        title = "Bar Code Scanner">
                        <Text>
                            Scan QR Code
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    scanButton: {
        backgroundColor: '#2196f3',
        padding: 10,
        margin: 10,
    },
    buttonText: {

    }
})