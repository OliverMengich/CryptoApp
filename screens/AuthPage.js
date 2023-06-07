import React from 'react';
import { StyleSheet, Text, View, ImageBackground,SafeAreaView } from 'react-native';
import Button from '../components/Button';
function AuthPage() {
    function onPressHandler(){
		console.log('Pressed');
	}
    return (
        <View>
			<Button widthSet={'50%'} onPress={onPressHandler} >CONNECT YOUR WALLET</Button>
        </View> 
    );
}

export default AuthPage;