import { useState } from "react"
import { StyleSheet, View,Text, TextInput, TouchableOpacity } from "react-native"

const SignIn = () =>{
    const [user, setuser] = useState({
        email: "",
        password: "",

    })

    const handlechange = (text, field) =>{
      setuser({...user, [field]: text})
    }

    const sign = () =>{
        // alert(`${user.username } ${user.password}`)
        fetch(`http://192.168.18.16:4000/api/v1/users/signin`,{
            method: 'POST', 
            body: JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(async(response)=> response.json())
        .then((json)=> console.log(json)).catch((error)=>console.log("ini err",error))
    }
    return(
        <>
            <View style={style.container}>
                <View style = {style.Wrapper}>
                    <View style = {style.Form}>
                        <Text style={style.Label}>EMAIL</Text>
                        <TextInput 
                        placeholder="Email" 
                        autoCapitalize="none" 
                        placeholderTextColor={"#ced4d4"} 
                        value={user.email}
                        onChangeText={(text)=>{handlechange(text,"email")}}
                        style = {style.Inputsign}/>
                    </View>


                    <View style = {style.Form}>
                        <Text style={style.Label}>Password</Text>
                        <TextInput 
                        placeholder="Password" 
                        autoCapitalize="none" 
                        placeholderTextColor={"#ced4d4"} 
                        secureTextEntry = {true}
                        value={user.password}
                        onChangeText={(text)=>{handlechange(text,"password")}}
                        style = {style.Inputsign}/>

                    </View>
                    <View>
                        <TouchableOpacity onPress={sign}>
                            <Text style= {style.btn}> submit </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
    
}

const style = StyleSheet.create(
    {
        container:{
            justifyContent : 'center',
            alignItems : 'center',
            height: '100%',
            backgroundColor : "#001524"
        },
        Wrapper: {
            width:'70%'
        },
        Form:{
            paddingVertical : 4,
            paddingBottom: 5
         
        },
        Label : {
            marginVertical :10,
            paddingHorizontal: 5,
            color: '#ffecd1'
        },
        Inputsign :{
           backgroundColor:"#15616d",
           paddingVertical:10,
           paddingHorizontal:5,
           fontSize:15,
           borderRadius: 5,
           color: "#ffecd1"
        },
        btn:{
            textAlign :'center',
            width : '100%',
            backgroundColor :"#ff7f00",
            paddingVertical : 16,
            fontWeight : "bold",
            color : "#001524",
            marginVertical : 10,
            borderRadius : 10
        }
    }
)

export default SignIn