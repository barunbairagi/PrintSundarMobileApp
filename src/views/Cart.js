import React from "react"
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Cart=()=>{
    const hanleCheckout=()=>{
        alert('There is no item in the cart')
    }
    return(
        <SafeAreaView style={{height:'100%'}}>
            <View style={styles.header}>
                <Text style={styles.text}>Cart</Text>
            </View>
            <View style={styles.body}>
                <Text style={[styles.text,{fontWeight:'400'}]}>There is no item in the cart</Text>
            </View>
            <TouchableOpacity style={styles.checkout} onPress={hanleCheckout}>
                <Text style={[styles.text,{fontSize:25}]}>Checkout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    header:{
        flex:0.1,borderBottomLeftRadius:15,borderBottomRightRadius:15,
        backgroundColor:'white',alignItems:'center',justifyContent:'center',
    },body:{
        flex:1,
        justifyContent:'center',alignItems:'center'
        // backgroundColor:'red'
    },checkout:{
        flex:0.1,borderTopLeftRadius:15,borderTopRightRadius:15,
        justifyContent:'center',alignItems:'center',
        backgroundColor:'lightblue'
    },text:{
        fontSize:30,fontWeight:'bold',color:'black'
    }
})

export default Cart