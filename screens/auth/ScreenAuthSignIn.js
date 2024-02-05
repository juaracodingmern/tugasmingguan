import { StyleSheet, View } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import useJWT from "../../hooks/useJWT";
import useHTTP from "../../hooks/useHTTP";
import { useContext, useState } from "react";
import { BASE_URL, CONTEXT_APP } from "../../setting";
import useMessage from "../../hooks/useMessage";
import useValidator from "../../hooks/useValidator";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";


const ScreenAuthSignIn = ({navigation, route}) => {
    
    const application = useContext(CONTEXT_APP)
    const jwt = useJWT()
    const http = useHTTP()
    const message = useMessage();
  
    const [user, setUser] = useState({
      email: "",
      password: ""
    })
    const userValidator = useValidator({
      email: [],
      password: []
    })
  
    const handleChangeUser = (text, field) => {
      setUser({...user, [field]: text})
    }
  
    const signIn = () => {
      userValidator.reset()
  
      const url = `${BASE_URL}/users/signin/`
      http.publicHTTP.post(url, user).then((response) => {
        console.log(response.data);
        jwt.set(response.data.token)
        message.success(response)
        application.setIsAuthenticated(true)
        navigation.navigate("ScreenBarangList")
      }).catch((error) => {
        message.error(error)
        userValidator.except(error);
        console.log(error.response);
      })
    }
  return(
    <>
    <View>
        
        <View style= {style.container}>
        <View style= {style.Wrapper}>
            <TextInput
             label="email"
          
             autoCapitalize="none" 
             placeholderTextColor={"#ced4d4"} 
             style = {style.Inputsign}
             onChangeText={(text)=>{handleChangeUser (text,"email")}}
             />

          
        </View>
        <WidgetCommonValidator messages={userValidator.get('email')}/>
        <View style= {style.Wrapper}>
            <TextInput
             label="Password"
      
             autoCapitalize="none" 
             placeholderTextColor={"#ced4d4"} 
             style = {style.Inputsign}
             secureTextEntry = {true}
             onChangeText={(text)=>{handleChangeUser (text,"password")}}
             />
             

          
        </View>
        <WidgetCommonValidator messages={userValidator.get('password')}/>
        <View style= {style.Wrapper}>
        <Button icon="account-lock-open-outline" mode="contained" onPress={signIn}>
              Sign In
            </Button>
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
            width: '100%',
          
            gap: 20,
            paddingHorizontal:20
        },
        Wrapper: {
            width:'100%'
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
export default ScreenAuthSignIn;