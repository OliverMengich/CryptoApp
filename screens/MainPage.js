import React,{useEffect} from 'react';
import { StyleSheet,TouchableOpacity, Text,FlatList, View, Dimensions, TextInput, ScrollView, Alert } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import bitcore from 'bitcore-lib';
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
const shortenAddress = (address) => {
	return `${address.slice(0, 6)}...${address.slice(
		address.length - 4,
		address.length
	)}`;
};
function MainPage() {
    const { height } = Dimensions.get('window');
    const connector = useWalletConnect();
    const [isFocus, setIsFocus] = React.useState(false);
    const [value, setValue] = React.useState({wallet:0, amount:0, receiver:''});
    const [transactionHistory,setTransactionHistory] = React.useState([]);
    const [ownerAddress,setOwnerAddress] = React.useState('');
    const connectWallet =() => {
        return connector.connect();
    };
    const killSession =() => {
        setValue({wallet:0});

        return connector.killSession();
    };
    const sendButtonHandler = () => {
        console.log('Pressed');
        console.log('Value is: ',value)
        if (value.amount <5 && value.amount && value.receiver && value.wallet && connector.connected && ownerAddress) {
            Alert.alert('Warning!!','Are you sure you want to send this?',[
                {
                    text:'No',
                    onPress:() => {
                        console.log('No Pressed');
                    },
                    style:'cancel'
                },
                {
                    text:'Yes',
                    onPress:() => {
                        console.log('Yes Pressed');
                        bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;
                        bitcore.Address.isValid(value.receiver);
                        console.log('Owner Address is: ',ownerAddress);
                        console.log('Receiver Address is: ',value.receiver);
                        console.log('Amount is: ',value.amount);
                        console.log('Connector is: ',connector);
                        const tx = bitcore.Transaction()
                        tx.from({
                            "address": ownerAddress,
                        })
                        tx.to({
                            "address": value.receiver,
                            "satoshis": value.amount,
                        })
                        var scriptInput = new bitcore.Script(tx.inputs[0]._scriptBuffer);
                        var addressInput = scriptInput.toAddress();
                        console.log('Address Input is: ',addressInput);
                        console.log('Script Input is: ',scriptInput);
                        console.log('Transaction is: ',tx);
                        var scrOut = new bitcore.Script(tx.outputs[0]._scriptBuffer);
                        var addressOut = scrOut.toAddress();
                        console.log('Address Out is: ',addressOut);
                        // connector.sendTransaction({
                        //     from: ownerAddress,
                        //     to: value.receiver,
                        //     value: value.amount,
                        // }).then((result) => {
                        //     console.log('Result is: ',result);
                        //     setTransactionHistory([...transactionHistory,{amount:value.amount,receiver:value.receiver}]);
                        //     setValue({wallet:0, amount:0, receiver:''});
                        // }).catch((error) => {
                        //     console.log('Error is: ',error);
                        //     setValue({wallet:0, amount:0, receiver:''});
                        // });
                    },
                    style:'destructive'
                }
            ])
            return;
        }
        Alert.alert('Error','Please fill all the fields correctly');
    };
    function connectButtonHandler(){
        console.log('Pressed',value.wallet)
        if(value.wallet===2){
            connectWallet();
        }
    }
    useEffect(() => {
        if(connector.connected){
            setOwnerAddress(connector.accounts[0]);
        }
    }, [connector.connected]);
    function Button({ onPress, label }) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        );
    }
    useEffect(() => {
        connectButtonHandler();
    }, [value.wallet]);
    return (
        <View style={{flex:1,marginTop:height*.09,position:'relative'}}>
            <View  style={{flexDirection:'row',alignItems:'center',justifyContent: 'space-between',marginHorizontal:7 }}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={styles.boldText}>Total Sent:</Text>
                    <Text style={styles.boldText}>0 BTC</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {
                        connector.connected&&(
                            <>
                                <Text style={styles.boldText}>{shortenAddress(ownerAddress)}</Text>
                                <Button onPress={killSession} label="Log out" />
                            </>
                        )
                    }
                </View>
            </View>
            <Text style={[styles.boldText,{marginTop:height*.04, textAlign:'center'}]}> Send only 5 BTC per transaction</Text>

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#000' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={[
                    { label: "Blockchain", value: 1},
                    {label:"Trust Wallet",value: 2},
                    {label:"Binance",value: 3},
                ]}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Account' : '...'}
                searchPlaceholder="Search..."
                value={value.wallet}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue({wallet: item.value});
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign style={styles.icon}
                        color={isFocus ? '#fff' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
            <View style={{marginTop:height*.04,alignItems:'center',flexDirection:'row'}}>
                <Text style={styles.boldText} >Receiver's Wallet:</Text>
                <TextInput keyboardType='twitter' 
                    style={[styles.textInput,{width:'70%'}]} 
                    placeholder="0.00000000" 
                    onChangeText={(text) => setValue({...value,receiver:text})}
                />
            </View>
            <View style={{marginTop:height*.04,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row'}}>
                <Text style={styles.boldText}>BTC Amount</Text>
                <TextInput keyboardType='number-pad' 
                    style={styles.textInput} 
                    placeholder="0.00000000" 
                    onChangeText={(text) => setValue({...value, amount:text})}
                />
                <Button widthSet={'20%'} onPress={sendButtonHandler} label={'Send'}/>
            </View>
            <View style={{marginTop:height*.04,marginHorizontal:height*.04}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',borderBottomWidth:1,paddingVertical:10}}>
                    <Text style={styles.boldText}>History</Text>
                    <Text style={styles.boldText}>Clear</Text>
                </View>
                <ScrollView style={{height: height*.2}}>
                    <FlatList
                        data={transactionHistory}
                        renderItem={({ item }) => (
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
                                <Text style={styles.normalText}>{item.date}</Text>
                                <Text style={styles.normalText}>{item.amount}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View>
            <View style={{position:'absolute',bottom:30}}>
                <Text style={[styles.boldText,{textAlign:'center',fontSize:20}]}>Need to Know</Text>
                <Text style={styles.normalText}>1. Transactions will get 6 confirmations on the Blockchain</Text>
                <Text style={styles.normalText}>2. Transactions stays for only 45 days before becoming invalid</Text>
                <Text style={styles.normalText}>3. Transactions takes 20-30mins</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: '#4E97F5',
    },
    textInput:{
        borderBottomWidth:.5,
        // ,
        // paddingHorizontal:10,
        // paddingVertical: 16,
        paddingHorizontal: 16,
    },
    boldText:{
        fontWeight:'bold',
        fontSize:16, 
    },
    normalText:{
        fontSize:16,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#5A45FF",
        color: "#FFFFFF",
        borderRadius: 2,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    dropdown: {
        height: 50,
        borderColor: '#000',
        borderBottomWidth: 0.5,
        paddingHorizontal: 8,
        marginVertical: 20,
    },
});
export default MainPage;