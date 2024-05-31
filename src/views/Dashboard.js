import { useNavigation } from "@react-navigation/native"
import React from "react"
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Menu from '../assets/menu.svg'

const Dashboard=()=>{
    const navigation=useNavigation()
    return(
        <SafeAreaView style={{height:'100%'}}>
            <View style={styles.header}>
                <TouchableOpacity style={{justifyContent:'center',height:'100%'}} onPress={()=>navigation.navigate("Drawer")}>
                    <Menu height={40} width={40}/>
                </TouchableOpacity>
                <Text style={{width:'75%',textAlign:'flex-start',fontSize:40,fontWeight:'bold',color:'black'}}>Dashboard</Text>
            </View>
            <View style={styles.body}>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    header:{
        flex:1,width:'100%',borderBottomLeftRadius:20,borderBottomRightRadius:20,
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        backgroundColor:'white',paddingHorizontal:20
    },body:{
        flex:9,paddingHorizontal:5,width:'100%',
        // backgroundColor:'red'
    }
})

export default Dashboard