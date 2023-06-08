import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Button from '../components/Button';
import {Dropdown} from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
function MainPage() {
    const { width, height } = Dimensions.get('window');
    function sendButtonHandler(){}
    const [isFocus, setIsFocus] = React.useState(false);
    const [value, setValue] = React.useState({wallet:''});
    
    return (
        <View style={{flex:1,marginTop:height*.09,position:'relative'}}>
            <View  style={{flexDirection:'row', }}>
                <Text style={styles.boldText}>Total Sent:</Text>
                <Text style={styles.boldText}>0 BTC</Text>
            </View>
            <Text style={[styles.boldText,{marginTop:height*.04, textAlign:'center'}]}> Send only 5 BTC per transaction</Text>
            <View>
            <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={[
                        { label: 'Blockchain', value: '1' },
                        {label:"Trust Wallet",value:"2"},
                        {label:"Binance",value:"3"},
                    ]}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select GRADE' : '...'}
                    searchPlaceholder="Search..."
                    value={value.wallet}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue({wallet:item.value});
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign style={styles.icon}
                            color={isFocus ? COLORS.primary : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>
            <View style={{marginTop:height*.04,alignItems:'center',flexDirection:'row'}}>
                <Text style={styles.boldText} >Receiver's Wallet:</Text>
                <TextInput keyboardType='twitter' style={[styles.textInput,{width:'70%'}]} placeholder="0.00000000" />
            </View>
            <View style={{marginTop:height*.04,justifyContent:'space-evenly',alignItems:'center',flexDirection:'row'}}>
                <Text style={styles.boldText}>BTC Amount</Text>
                <TextInput keyboardType='number-pad' style={styles.textInput} placeholder="0.00000000" />
                <Button widthSet={'20%'} onPress={sendButtonHandler}>Send</Button>
            </View>
            <View style={{marginTop:height*.04,marginHorizontal:height*.04}}>
                <View style={{flexDirection:'row', justifyContent:'space-between',borderBottomWidth:1,paddingVertical:10}}>
                    <Text style={styles.boldText}>History</Text>
                    <Text style={styles.boldText}>Clear</Text>
                </View>
                <ScrollView style={{height: height*.2}}></ScrollView>
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
    }
});
export default MainPage;