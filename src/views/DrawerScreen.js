import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Logout from '../assets/logout.svg'

const DrawerScreen=()=>{
    const navigation=useNavigation()
    const opts=["Logout"]
    const optsComp=[Logout]

    const handleTouch=(opt)=>{
        if(opt==='Logout'){
            Alert.alert(
                `Confirm ${opt}`,
                `Are you sure you want to ${opt} ?`,
                [
                    {text: 'Cancel',style: 'cancel',},
                    {text: 'OK',
                        onPress: ()=>{
                            navigation.reset({index:0,routes:[{name:'Login'}]})
                        },
                    },
                ],
                { cancelable: false }
            )
        }
    }
    return(
        <SafeAreaView style={{height:'100%'}}>
            <View style={styles.header}>
                <Text style={{fontSize:40,fontWeight:'bold',color:'black'}}>Menu</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    {opts.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.component} onPress={()=>handleTouch(option)}>
                            <Icon tag={optsComp[index]} dims={40} />
                            <Text style={{color:'black',fontSize:25}}>{`\t\t${option}`}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const Icon=({tag , dims})=>{
    const Tag=tag
    return <Tag width={dims} height={dims} />
}

const styles=StyleSheet.create({
    header:{
        flex:1,width:'100%',borderBottomLeftRadius:20,borderBottomRightRadius:20,
        // flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        justifyContent:'center',alignItems:'center',
        backgroundColor:'white',paddingHorizontal:20
    },body:{
        flex:10,paddingHorizontal:5,
        paddingVertical:10,
        // width:'100%',
        // backgroundColor:'red'
    },component:{
        backgroundColor:'white',paddingHorizontal:25,paddingVertical:10,borderRadius:15,
        flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginBottom:8
    }
})

export default DrawerScreen