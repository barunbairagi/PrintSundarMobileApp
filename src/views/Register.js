import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Eye from '../assets/eye.svg'

const Register = () => {
    const navigation=useNavigation()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    const [show,setShow]=useState(true)

    const handleRegister = () => {
        if(email.trim()==='' || password.trim()==='' || name.trim()==='' || confpassword.trim()===''){
            setError("All fields are mandatory !!")
            return
        }if(password.trim()!==confpassword.trim()){
            setError("The passwords are not matching.")
            return
        }if(!regex.test(email)){
            setError("Invalid emailId")
            return
        }
        console.log(`Name: ${name}\tEmailId: ${email}\tPassword: ${password}`)
        setError('')
        navigation.reset({index:0,routes:[{name:'Dashboard'}]})
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <View style={[styles.input,{flexDirection:'row',justifyContent:'space-between'}]}>
                <TextInput style={{width:'85%',fontSize:18,fontWeight:'bold'}}  placeholder="Password" value={password} 
                onChangeText={setPassword} secureTextEntry={show} />
                <TouchableOpacity style={{justifyContent:'center',height:"100%"}} onPress={()=>setShow(!show)}>
                    <Eye width={35} height={35}/>
                </TouchableOpacity>
            </View>
            <TextInput style={[styles.input,{fontWeight:'bold'}]}  placeholder="Confirm Password" value={confpassword} 
            onChangeText={setConfPassword} secureTextEntry={show} />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Register</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Text style={{marginTop:30,color:'black',textAlign:'center',fontSize:15}}>
                {"Already have an account?\t "}
                <Text style={{color:'blue',fontWeight:'bold'}} onPress={()=>{setError('');navigation.goBack()}}>
                    {'Login'}
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

export default Register