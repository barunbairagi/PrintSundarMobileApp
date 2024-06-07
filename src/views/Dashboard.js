import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView,ScrollView, Animated, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList } from "react-native"
import Icon from '../components/Icons'
import Menu from '../assets/menu.svg'
import Home from '../assets/home.svg'
import Cart from '../assets/cart.svg'
import Account from '../assets/account.svg'
import Connect from '../assets/connect_us.svg'
import Address from '../assets/address.svg'
import { useNavigation } from "@react-navigation/native"

const {width}=Dimensions.get('window')
const img_path='../assets/images/'

const Dashboard=()=>{
    const navigation=useNavigation()
    const images=[
        require(`${img_path}scroll_images/VisitingCards.png`),
        require(`${img_path}scroll_images/VC_OrderSubmitPage.png`),
        require(`${img_path}scroll_images/Velvet_Touch_VC.png`),
        require(`${img_path}scroll_images/UniqueShape_VC.png`),
        require(`${img_path}scroll_images/Transparent_VC.png`),
        require(`${img_path}scroll_images/Standard_Glossy_VC.png`),
        require(`${img_path}scroll_images/SpotUV_VC.png`),
        require(`${img_path}scroll_images/photographic_VC.png`),
        require(`${img_path}scroll_images/Non_Tearable_VC.png`),
        require(`${img_path}scroll_images/Matte_Finished_VC.png`),
        require(`${img_path}scroll_images/Magnetic_VC.png`),
        require(`${img_path}scroll_images/Golden_Printed_VC.png`),
    ]
    const imagesList=[
        {
            img:require(`${img_path}Mobile/Standard.a3e56c399e352eb8397a.png`),
            img2:require(`${img_path}scroll_images/Standard_Glossy_VC.png`),
            name:'Standard Visiting Card'
        },{
            img:require(`${img_path}Mobile/Spot_UV.26f5e47494c35e6ca9f2.png`),
            img2:require(`${img_path}scroll_images/SpotUV_VC.png`),
            name:'Spot UV Card'
        },{
            img:require(`${img_path}Mobile/QRCoadPremiuglossy.5441e53677c944ab2062.png`),
            img2:require(`${img_path}scroll_images/VC_OrderSubmitPage.png`),
            name:'QR Code Visiting Card'
        },{
            img:require(`${img_path}Mobile/SpotUVspecialVisitingCard.151aaf4f239a1e7966a1.png`),
            img2:require(`${img_path}scroll_images/Velvet_Touch_VC.png`),
            name:'Velvet Touch Card'
        },{
            img:require(`${img_path}Mobile/TransparentVC.28e77e0ff7f56d05af96.png`),
            img2:require(`${img_path}scroll_images/Transparent_VC.png`),
            name:'Transparent Visiting Card'
        },{
            img:require(`${img_path}Mobile/NonTearable.b7a367958ddf29a73d5a.png`),
            img2:require(`${img_path}scroll_images/Non_Tearable_VC.png`),
            name:'Non-Tearable Visiting Card'
        },{
            img:require(`${img_path}Mobile/MatteVC.2cc49c79264313166a21.png`),
            img2:require(`${img_path}scroll_images/Matte_Finished_VC.png`),
            name:'Matte Visiting Card'
        },{
            img:require(`${img_path}Mobile/SpecialcolourVC.7955b954af35b1675652.png`),
            img2:require(`${img_path}scroll_images/Golden_Printed_VC.png`),
            name:'Special Colored Card'
        },{
            img:require(`${img_path}Mobile/Magnetic.1426d7a6762e916a1d46.png`),
            img2:require(`${img_path}scroll_images/Magnetic_VC.png`),
            name:'Magnetic Card'
        },{
            img:require(`${img_path}Mobile/3DEffect.1c883bf5e1a37611d8b0.png`),
            img2:require(`${img_path}scroll_images/Golden_Printed_VC.png`),//not there
            name:'3D Effect Card'
        },{
            img:require(`${img_path}Mobile/UniqueShape.fa40d772e42d8d340c98.png`),
            img2:require(`${img_path}scroll_images/UniqueShape_VC.png`),
            name:'Unique Shape Card'
        },{
            img:require(`${img_path}Mobile/photographic.7c7e7af6c8960ad5be73.png`),
            img2:require(`${img_path}scroll_images/photographic_VC.png`),
            name:'Photo Graphic Card'
        },
    ]
    const icons=[
        {name:'Home',component:Home},{name:'Cart',component:Cart},
        {name:'Account',component:Account},{name:'Connect',component:Connect}
    ]
    const [address,setAddress]=useState("71, Sujan Bagan, Chinsurah, Hooghly-712101")
    const scrollViewRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        if(scrollViewRef.current){
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % (images.length)
                    scrollViewRef.current.scrollTo({ x: nextIndex * width*0.95, animated: true })
                    return nextIndex;
                })
            }, 2000)
            return () => clearInterval(interval)
        }
    }, [])
    const handleIconPress=(option)=>{
        console.log(option)
        navigation.navigate(option)
    }
    return(
        <SafeAreaView style={styles.fullScreen}>
            <View style={styles.top}>
                <Icon tag={Address} dims={30} />
                <Animated.Text style={styles.text} numberOfLines={1} >
                    {address}
                </Animated.Text>
            </View>
            <View style={styles.scrollImgCont}><ScrollView
                style={styles.scrollView} ref={scrollViewRef}
                horizontal pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                {images.map((image, index) => (
                    <Image key={index} source={image} style={styles.scrollImg} />
                ))}
            </ScrollView></View>
            <FlatList data={imagesList} style={styles.list}
                renderItem={({ item }) => renderItem({ item, navigation })} 
                keyExtractor={(item) => item.img} 
                numColumns={2}
            />
            <View style={styles.bottom}>
                {icons.map((option, index) => (
                    <TouchableOpacity key={index} onPress={()=>handleIconPress(option.name)}>
                        <Icon tag={option.component} dims={45} />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}
const renderItem=({item , navigation})=>{
    const handleBuy=()=>{
        console.log("You are buyng this item")
        navigation.navigate("Checkout",{img:item.img2 , name:item.name})
    }
    const handleCart=()=>{
        console.log("You are adding this item to cart")
    }
    return(
        <View style={styles.bodyComp}>
            <Image source={item.img} style={styles.mainImg}/>
            <Text style={{backgroundColor:'white',color:'black',fontSize:16,fontWeight:'bold',
            textAlign:'center',flexWrap:'wrap',paddingVertical:5}}>
                {item.name}
            </Text>
            <TouchableOpacity style={styles.buy} onPress={handleBuy}>
                <Text style={[styles.buy_text,{color:'white'}]}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buy,{backgroundColor:'lightgrey'}]} onPress={handleCart}>
                <Text style={styles.buy_text}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    fullScreen:{
        height:'100%',
        // paddingtop:10,paddingHorizontal:10,
        flexDirection:'column',justifyContent:'space-between',alignItems:'center',
        // backgroundColor:'red'
    },top:{
        flex:0.1,width:'100%',paddingHorizontal:20,
        borderBottomLeftRadius:10,borderBottomRightRadius:10,
        backgroundColor:'white',overflow:'hidden',marginBottom:10,
        flexDirection:'row',justifyContent:'flex-start',alignItems:'center'
    },text:{
        width:'90%',marginLeft:5,overflow:'hidden',
        fontSize:17,color:'black',fontStyle:'italic',textAlign:'center',fontWeight:'bold'
        // backgroundColor:'red'
    },scrollImgCont:{
        flex:0.29,
        width:'95%',overflow:'hidden',
        // backgroundColor:'blue',
        borderRadius:10
    },scrollImg:{
        width:(0.95*width),height:'100%',
        resizeMode:'stretch',
        // aspectRatio:1,
        // backgroundColor:'red'
    },scrollView: {
        flex: 1,
        // backgroundColor:'green',
    },list:{
        // backgroundColor:'red',
        // width:'96%',
        flex:0.8,
        marginVertical:8
    },bodyComp:{
        width:(width-10)/2.09,
        // maxHeight:(width)/1.4,
        overflow:'hidden',
        borderRadius:10,marginHorizontal:5,marginBottom:10,
        backgroundColor:'lightgrey',
        flexDirection:'column',justifyContent:'flex-start'//,alignItems:'center'
    },mainImg:{
        width:(width-10)/2.09,
        height:(width-10)/2.2,
        // backgroundColor:'red',
        resizeMode:'stretch',
    },buy:{
        // height:'14%',
        padding:5,
        justifyContent:'center',alignItems:'center',
        backgroundColor:'black',
        // borderRadius:10
    },buy_text:{
        textAlign:'center',textAlignVertical:'center',color:'black',
        fontWeight:'bold',fontSize:15
    },bottom:{
        flex:0.12,borderTopLeftRadius:20,borderTopRightRadius:20,
        width:'100%',paddingHorizontal:20,
        backgroundColor:'white',
        flexDirection:'row',justifyContent:'space-between',alignItems:'center'
    }
})

export default Dashboard