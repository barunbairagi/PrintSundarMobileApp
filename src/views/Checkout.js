import React, { useEffect, useState } from "react"
import { Dimensions, View, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import {pick , types , isCancel , isInProgress} from 'react-native-document-picker'
import RNPickerSelect from 'react-native-picker-select'
import CheckBox from '@react-native-community/checkbox'
import { useNavigation } from "@react-navigation/native"

const {width,height}=Dimensions.get('window')

const Checkout=({route})=>{
    const navigation=useNavigation()
    const {img , name}=route.params
    const [color,setColor]=useState("lightblue")
    const [allData,setAllData]=useState([])
    const [count,totCount]=useState(0)
    const [promo,setPromo]=useState('')
    const optionsDropAll=[
        {
            text:"Card Type",
            items:[
                { label: 'Corner Rectangle', value: 'Corner Rectangle' },
                { label: 'Rounded Rectangle', value: 'Rounded Rectangle' },
                { label: 'Square', value: 'Square' },
            ]
        },{
            text:"Card Size",
            items:[
                { label: '8.9 X 5.1', value: '8.9 X 5.1' },
                { label: '9.1 X 5.5', value: '9.1 X 5.5' },
                { label: '6.35 X 6.35', value: '6.35 X 6.35' },
            ]
        },{
            text:"Media Type",
            items:[
                { label: 'Paper', value: 'Paper' },
                { label: 'Board', value: 'Board' },
                { label: 'PVC', value: 'PVC' },
                { label: 'Non-Tearable Sheet', value: 'Non-Tearable Sheet' },
                { label: 'Velvet', value: 'Velvet' },
                { label: 'Transparent', value: 'Transparent' },
            ]
        },{
            text:"Quality",
            items:[
                { label: 'Glossy', value: 'Glossy' },
                { label: 'Matte', value: 'Matte' },
            ]
        },{
            text:"Quantity",
            items:[
                { label: '100', value: '100' },
                { label: '200', value: '200' },
                { label: '300', value: '300' },
                { label: '400', value: '400' },
                { label: '500', value: '500' },
                { label: '1000', value: '1000' },
                { label: '2000', value: '2000' },
                { label: '5000', value: '5000' },
                { label: '10000', value: '10000' },
            ]
        },
    ]
    const optionsChequeDropAll=[
        {
            text:"QR Code",
            items:[
                { label: 'Front Side', value: 'Front Side' },
                { label: 'Back Side', value: 'Back Side' },
            ]
        },{
            text:"Lamination",
            items:[
                { label: 'Single Side', value: 'Single Side' },
                { label: 'Both Sides', value: 'Both Sides' },
            ]
        },{
            text:"Spot UV",
            items:[
                { label: 'Single Side', value: 'Single Side' },
                { label: 'Both Sides', value: 'Both Sides' },
            ]
        },{
            text:"Texture",
            items:[
                { label: 'Single Side', value: 'Single Side' },
                { label: 'Both Sides', value: 'Both Sides' },
            ]
        },{
            text:"Transparent",
            items:[
                { label: 'Single Side', value: 'Single Side' },
                { label: 'Both Sides', value: 'Both Sides' },
            ]
        },{
            text:"Special Color",
            items:[
                { label: 'Single Side', value: 'Single Side' },
                { label: 'Both Sides', value: 'Both Sides' },
            ]
        },{
            text:"Embossing",
            items:[
                { label: 'Single Side', value: 'Single Side' },
                { label: 'Both Sides', value: 'Both Sides' },
            ]
        },
    ]
    useEffect(()=>{
        if(allData && getValueByText("Upload Front Page of Design"))
            setColor((allData.length)===(optionsDropAll.length+count)?"blue":"lightblue")
    },[allData,count])
    const getValueByText = (text) => {
        const foundObject = allData.find(item => item.text === text);
        return foundObject ? true : false
    }
    const handleBuy=()=>{
        if(color !=="lightblue")
            navigation.replace("Summary",{data:allData,promo:promo})
        else alert("Enter all necessary details")
    }    
    return(
        <SafeAreaView style={{height:height}}>
            <View style={styles.header}>
                <Text style={styles.text}>{name}</Text>
            </View>
            <Image source={img} style={styles.image}/>
            <ScrollView style={{flex:1,paddingHorizontal:10}}>
                {optionsDropAll.map((option, index) => (
                    <PickerItem key={index} text={option.text} options={option.items} setAllData={setAllData}/>
                ))}
                {optionsChequeDropAll.map((option, index) => (
                    <CheckerItem key={index} text={option.text} totCount={totCount}
                    options={option.items} setAllData={setAllData}/>
                ))}
                <Text 
                style={{
                    // backgroundColor:'red',
                    textAlign:'center',flexWrap:'wrap',padding:10,
                    color:'black',fontSize:18,fontWeight:'bold'
                }}>
                    Please upload existing design template if any
                </Text>
                <FileUpload text={"Upload Front Page of Design"} totCount={totCount} setAllData={setAllData}/>
                <FileUpload text={"Upload Second Page of Design"} totCount={totCount} setAllData={setAllData}/>
                <FileUpload text={"Upload QR Code Image"} totCount={totCount} setAllData={setAllData}/>
                <TextInput placeholder="Enter your promo code" value={promo} 
                onChangeText={(e)=>setPromo(e)} style={styles.promo}/>
            </ScrollView>
            <TouchableOpacity style={[styles.buy,{backgroundColor:color}]} onPress={handleBuy}>
                <Text style={[styles.text,{fontSize:25,color:(color==="lightblue"?'black':'white')}]}>
                    Buy Now
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const PickerItem=({text,options , setAllData})=>{
    const handleChange=(value)=>{
        setAllData(prevData => {
            const updatedData = prevData.filter(item => !(item.text === text && value === null))
            if (value !== null) {
                const index = updatedData.findIndex(item => item.text === text)
                if (index !== -1)   updatedData[index].value = value
                else    updatedData.push({ text:text, value:value })
            }
            return updatedData
        })
    }
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{text} :</Text>
            <RNPickerSelect
                onValueChange={(value) => handleChange(value)}
                items={options}
                style={pickerSelectStyles}
                placeholder={{ label: "Select", value: null }}
            />
        </View>
    )
}
const CheckerItem=({text, totCount,options,setAllData})=>{
    const [isChecked, setIsChecked] = useState(false)
    const handleCheckBoxChange = (newValue) => {
        setIsChecked(newValue)
        totCount(prevData => {
            if (newValue)return prevData+1
            else return prevData-1
        })
        if(!newValue)
            setAllData(prevData => {
                const updatedData = prevData.filter(item => !(item.text === text))
                return updatedData
            })
    }
    const handleChange=(value)=>{
        setAllData(prevData => {
            const updatedData = prevData.filter(item => !(item.text === text && value === null))
            if (value !== null) {
                const index = updatedData.findIndex(item => item.text === text)
                if (index !== -1)   updatedData[index].value = value
                else    updatedData.push({ text:text, value:value })
            }
            return updatedData
        })
    }
  
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{text} :</Text>
            {isChecked &&
                <RNPickerSelect
                    onValueChange={(value) => handleChange(value)}
                    items={options}
                    style={pickerSelectStyles}
                    placeholder={{ label: "Select", value: null }}
                />
            }
            <CheckBox
            value={isChecked}
            onValueChange={handleCheckBoxChange}
            style={{margin:5,marginVertical:10}}
            />
        </View>
    )
}
const FileUpload=({text ,totCount, setAllData})=>{
    const [pickedFile, setPickedFile] = useState(null)
    const [isChecked, setIsChecked] = useState(false)
    const pickDocument = async () => {
        try {
            const res = await pick({type: [types.images],allowMultiSelection:false})
            setPickedFile(res)
            setAllData(prevData => {
                const updatedData = prevData.filter(item => !(item.text === text && value === null))
                if (res !== null) {
                    const index = updatedData.findIndex(item => item.text === text)
                    if (index !== -1)   updatedData[index].value = res
                    else    updatedData.push({ text:text, value:res })
                }
                return updatedData
            })
        } catch (err) {
            if (isCancel(err)) { console.log('User cancelled the picker') } 
            else if(isInProgress(err)){console.log('Unresponsive')}
            else { 
                console.log('Error : ' + err)
                setPickedFile(null)
            }
        }
    }
    const handleCheckBoxChange = (newValue) => {
        setIsChecked(newValue)
        totCount(prevData => {
            if (newValue)return prevData+1
            else return prevData-1

        })
        if(!newValue){
            setPickedFile(null)
            setAllData(prevData => {
                const updatedData = prevData.filter(item => !(item.text === text))
                return updatedData
            })
        }
    }
    return (
        <View style={[styles.container,{flexDirection:'column',padding:5}]}>
            <View style={[styles.container,{width:'100%',margin:0}]}>
                <Text style={styles.label}>{text} ?</Text>
                <CheckBox
                value={isChecked}
                onValueChange={handleCheckBoxChange}
                style={{margin:5,marginVertical:0}}
                />
            </View>
            {isChecked && <TouchableOpacity onPress={pickDocument} 
            style={{backgroundColor:'lightgrey',borderRadius:20,paddingHorizontal:20,paddingVertical:5}}>
                 <Text style={{color:'black',fontSize:20}}>
                    {pickedFile===null?"Select your File":pickedFile[0].name}
                 </Text>
             </TouchableOpacity>}
        </View>
    )
}

const styles=StyleSheet.create({
    header:{
        flex:0.14,borderBottomLeftRadius:15,borderBottomRightRadius:15,
        backgroundColor:'white',alignItems:'center',justifyContent:'center',
    },text:{
        fontSize:30,fontWeight:'bold',color:'black'
    },image:{
        flex:0.4,
        width:(width-5),
        // aspectRatio:1,
        alignSelf:'center',
        borderRadius:20,marginVertical:10,borderWidth:1,borderColor:'black',
        resizeMode:'stretch',backgroundColor:'lightgrey'
    },buy:{
        flex:0.15,borderTopLeftRadius:15,borderTopRightRadius:15,
        justifyContent:'center',alignItems:'center',
    },promo:{
        backgroundColor:'white',borderRadius:10,marginBottom:10,
        width:'90%',alignSelf:'center',paddingHorizontal:15,
        color:'black',fontSize:18
    },
    container: {
        // paddingVertical:10,
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        paddingHorizontal: 20,borderRadius:10,marginBottom:10,marginHorizontal:20,
        backgroundColor:'white'
    },label: {
    fontSize: 18,color:'black'
    // marginBottom: 10,
    }
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
    //   fontSize: 16,
    //   paddingHorizontal: 5,
    //   paddingVertical: 8,
    //   borderWidth: 0.5,
    //   borderColor: 'purple',
    //   borderRadius: 8,
    //   color: 'red',
    //   paddingRight: 30,
    //   backgroundColor:'red',
      color:'black',minWidth:width/2.5,
      borderRadius:20,borderWidth:5,borderColor:'green'
    },
})

export default Checkout