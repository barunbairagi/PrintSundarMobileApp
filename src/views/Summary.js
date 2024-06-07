import React, { useEffect, useState } from "react"
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import CheckBox from '@react-native-community/checkbox'

const {width,height}=Dimensions.get('window')
const Summary=({route})=>{
    const {data,promo}=route.params
    console.log(data)
    const [price,setPrice]=useState(180)
    const [priceDelivery,setPriceDelivery]=useState(0)
    const [payableAmt,setPayableAmt]=useState(0)
    const [color,setColor]=useState("lightblue")
    const [isChecked, setIsChecked] = useState(false)
    const hanleCheckout=()=>{
        if(isChecked)
            alert(`Full Payment Rs. ${(priceDelivery+price)}/-`)
        else if(payableAmt<0.6*(priceDelivery+price))
            alert(`Please enter an amount higher than or equal to Rs. ${0.6*(priceDelivery+price)}/-`)
        else alert(`You are paying a booking amount of Rs. ${payableAmt}/-`)
    }
    const handleCheckBoxChange = (newValue) => {
        setIsChecked(newValue)
    }
    const getValueByText = (text) => {
        const foundObject = data.find(item => item.text === text);
        return foundObject ? foundObject.value : null;
    }
    return(
        <SafeAreaView style={{height:'100%'}}>
            <View style={styles.header}>
                <Text style={styles.text}>Order Summary</Text>
            </View>
            <ScrollView style={styles.body}>
                <Image src={getValueByText("Upload Front Page of Design")[0]["uri"]} style={styles.img}/>
                <Text style={styles.texts}>{"Order Name:\t\tVisiting Card"}</Text>
                {data.map((option, index) => (
                    option["text"] !== "Upload Front Page of Design" && 
                    option["text"] !== "Upload Second Page of Design" &&
                    option["text"] !== "Upload QR Code Image" &&(
                        <Text key={index} style={styles.texts}>
                            {`${option["text"]}:\t\t${option["value"]}`}
                        </Text>
                    )
                ))}
                <View style={styles.priceView}>
                    <Text style={styles.priceText}>Pricing Details</Text>
                    <View style={styles.pris}>
                        <Text style={styles.pristxt}>Total Price</Text>
                        <Text style={styles.pristxt}>Rs. {price}/-</Text>
                    </View>
                    <View style={styles.pris}>
                        <Text style={styles.pristxt}>Delivery Charges</Text>
                        <Text style={styles.pristxt}>Rs. {priceDelivery}/-</Text>
                    </View>
                    <View style={styles.pris}>
                        <Text style={[styles.pristxt,{color:'black',fontWeight:'bold'}]}>Net payable amount</Text>
                        <Text style={[styles.pristxt,{color:'black',fontWeight:'bold'}]}>Rs. {priceDelivery+price}/-</Text>
                    </View>
                    <View style={styles.pay}>
                        <Text style={[styles.priceText,{backgroundColor:'transparent',marginBottom:20}]}>
                            Select Payment Option
                        </Text>
                        <Text style={{color:'white',fontSize:15,}}>
                            Full payment/Booking amount: Rs. {0.6*(priceDelivery+price)}/-
                        </Text>
                        <Text style={{color:'white',fontSize:15,marginBottom:20}}>
                            (Must be min. 60% of the total amount)
                        </Text>
                        <TextInput value={payableAmt} onChangeText={(e)=>setPayableAmt(e)} 
                        keyboardType={"numeric"} placeholder="Enter your booking Amount"
                        style={styles.inppay} />
                        <View style={[styles.pris,{alignItems:'center'}]}>
                            <Text style={{color:'white',fontSize:15}}>Full payment :</Text>
                            <CheckBox value={isChecked} onValueChange={handleCheckBoxChange}
                            style={{margin:5,marginVertical:10}}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={[styles.checkout,{backgroundColor:color}]} onPress={hanleCheckout}>
                <Text style={[styles.text,{fontSize:25,color:(color==="lightblue"?"black":"white")}]}>
                    Checkout
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    header:{
        flex:0.1,borderBottomLeftRadius:15,borderBottomRightRadius:15,
        backgroundColor:'white',alignItems:'center',justifyContent:'center',
    },body:{
        flex:1,padding:10
        // justifyContent:'center',alignItems:'center',
        // backgroundColor:'red'
    },img:{
        backgroundColor:'lightgray',
        width:width/1.5,aspectRatio:1,alignSelf:'center',borderRadius:10,
        resizeMode:'contain',marginBottom:10
    },checkout:{
        flex:0.1,borderTopLeftRadius:15,borderTopRightRadius:15,
        justifyContent:'center',alignItems:'center'
    },text:{
        fontSize:30,fontWeight:'bold'
    },texts:{
        backgroundColor:'white',
        padding:15,borderRadius:10,marginBottom:10,marginHorizontal:10,
        color:'black',fontSize:18,fontWeight:'bold'
    },priceView:{
        backgroundColor:'white',overflow:'hidden',
        alignItems:'center',justifyContent:'space-between',
        minHeight:width,marginBottom:20,paddingBottom:10,
        borderRadius:20
    },priceText:{
        backgroundColor:'blue',width:'100%',textAlign:'center',textAlignVertical:'center',
        height:70,color:'white',fontSize:25,fontWeight:'bold'
    },pris:{
        // backgroundColor:'red',
        flexDirection:'row',width:'90%',marginVertical:10,
        justifyContent:'space-between'
    },pristxt:{
        fontSize:20
    },pay:{
        backgroundColor:'blue',
        width:'90%',alignItems:'center',
        padding:20,borderRadius:10
    },inppay:{
        backgroundColor:'white',
        width:'90%',borderRadius:15,paddingHorizontal:15,color:'black',fontSize:16
    }
})

export default Summary