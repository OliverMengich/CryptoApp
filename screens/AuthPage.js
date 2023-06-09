import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from '../components/Button';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
function AuthPage() {
    // const connectWalletHandler = async () => {
    //     console.log('Pressed');
    //     const connector = new WalletConnect({
    //         bridge: "https://bridge.walletconnect.org", // Required
    //         qrcodeModal: QRCodeModal,
    //     });
    //     console.log('Connector is: ',connector);
    //     // Check if connection is already established
    //     if (!connector.connected) {
    //         // create new session
    //         await connector.createSession();
    //     }
    //     // Subscribe to connection events
    //     connector.on("connect", (error, payload) => {
    //         if (error) {
    //             Alert.alert('Error',error);
    //             throw error;
    //         }
    //         // Get provided accounts and chainId
    //         const { accounts, chainId } = payload.params[0];
    //         Alert.alert('Connected','Accounts: '+accounts+' '+chainId);
    //     });
    //     connector.on("session_update", (error, payload) => {
    //         if (error) {
    //             throw error;
    //         }
    //         // Get updated accounts and chainId
    //         const { accounts, chainId } = payload.params[0];
    //         Alert.alert('Session Updated','Accounts: '+accounts+' '+chainId);
    //     });
    //     connector.on("disconnect", (error, payload) => {
    //         if (error) {
    //             throw error;
    //         }
    //         // Delete connector
    //         Alert.alert('Disconnected','Connector Deleted');
    //     });
    // };
    const connector = useWalletConnect();

    const connectWallet =() => {
        return connector.connect();
    };

    const killSession =() => {
        return connector.killSession();
    };
    console.log('Connector is:',connector)
    return (
        <View>
            
			<Button widthSet={'50%'} onPress={()=>{}} >CONNECT YOUR WALLET</Button>
        </View> 
    );
}

export default AuthPage;