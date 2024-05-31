import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Eye from '../assets/eye.svg'

const Login = () => {
    const navigation=useNavigation()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show,setShow]=useState(true)

    const handleLogin = () => {
        if(email.trim()==='' || password.trim()===''){
            setError("All fields are mandatory !!")
            return
        }if(!regex.test(email)){
            setError("Invalid emailId")
            return
        }
        console.log(`EmailId: ${email}\tPassword: ${password}`)
        setError('')
        navigation.replace("Dashboard")
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <View style={[styles.input,{flexDirection:'row',justifyContent:'space-between'}]}>
                <TextInput style={{width:'85%',fontSize:18,fontWeight:'bold'}}  placeholder="Password" value={password} 
                onChangeText={setPassword} secureTextEntry={show} />
                <TouchableOpacity style={{justifyContent:'center',height:"100%"}} onPress={()=>setShow(!show)}>
                    <Eye width={35} height={35}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Login</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Text style={{marginTop:30,color:'black',textAlign:'center',fontSize:15}}>
                {"Do not have an account?\t "}
                <Text style={{color:'blue',fontWeight:'bold'}} onPress={()=>{setError('');navigation.navigate("Register")}}>
                    {'Register'}
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,paddingVertical:20,
        justifyContent: 'center',
        backgroundColor:'white'
    },
    input: {
        height: 50,
        borderWidth: 1,borderColor: 'black',borderRadius:20,
        fontSize:18,
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    errorText: {
        // backgroundColor:'blue',
        fontSize:15,color: 'red',textAlign:'center',
        marginTop: 8,
    },button:{
        backgroundColor:'blue',
        height:50,
        justifyContent:'center',alignItems:'center',
        borderRadius:50
    }
})

export default Login
