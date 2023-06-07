import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,SafeAreaView } from 'react-native';
import Button from './components/Button';
import React, { useState } from 'react';
import AuthPage from './screens/AuthPage';
import MainPage from './screens/MainPage';
export default function App() {
	const [currentAccount, setCurrentAccount] = useState("");
	let screen = <MainPage />;

	return (
		<>
			<StatusBar style="dark" />
			<ImageBackground style={{flex:1}} imageStyle={{opacity: .5}} resizeMode='cover' source={require('./assets/background.jpg')}>
				<SafeAreaView style={styles.container}>
					{screen}
				</SafeAreaView>
			</ImageBackground>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	backgroundImage:{
		// opacity: .15,
		flex:1,
		// backgroundColor:'rgba(0,0,0,.5)'
	}
});
