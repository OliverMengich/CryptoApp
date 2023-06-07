import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Button from '../components/Button';

function MainPage() {
    const { width, height } = Dimensions.get('window');
    function sendButtonHandler(){}
    return (
        <View style={{flex:1,marginTop:height*.09,position:'relative'}}>
            <View  style={{flexDirection:'row', }}>
                <Text style={styles.boldText}>Total Sent:</Text>
                <Text style={styles.boldText}>0 BTC</Text>
            </View>
            <Text style={[styles.boldText,{marginTop:height*.04, textAlign:'center'}]}> Send only 5 BTC per transaction</Text>
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
    }
});
export default MainPage;