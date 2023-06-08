import { StatusBar } from 'expo-status-bar';
import './global'
import { StyleSheet, ImageBackground,SafeAreaView, Platform } from 'react-native';
import Button from './components/Button';
import React, { useState } from 'react';
// import AuthPage from './screens/AuthPage';
import MainPage from './screens/MainPage';
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
	const [currentAccount, setCurrentAccount] = useState("");
	// let screen = <AuthPage/>;

	return (
		<>
			<StatusBar style="dark" />
			<ImageBackground style={{flex:1}} imageStyle={{opacity: .5}} resizeMode='cover' source={require('./assets/background.jpg')}>
				<SafeAreaView style={styles.container}>
					<WalletConnectProvider
						redirectUrl={
							Platform.OS === "web"
							? window.location.origin
							: `${SCHEME_FROM_APP_JSON}://`
						}
						storageOptions={{
							asyncStorage: AsyncStorage,
						}}
						>
						<View style={styles.container}>
							<WalletConnectExperience />
							<StatusBar style="auto" />
						</View>
					</WalletConnectProvider>
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
