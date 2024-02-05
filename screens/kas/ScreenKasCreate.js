import { StyleSheet, View } from "react-native"
import { Appbar,TextInput,Button } from "react-native-paper"
import useJWT from "../../hooks/useJWT";
import useHTTP from "../../hooks/useHTTP";
import { useContext, useState } from "react";
import { BASE_URL, CONTEXT_APP } from "../../setting";
import useMessage from "../../hooks/useMessage";
import useValidator from "../../hooks/useValidator";

import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";

const ScreenKasCreate = ({navigation}) =>{
    const application = useContext(CONTEXT_APP)
    const jwt = useJWT()
    const http = useHTTP()
    const message = useMessage();
  
    const [kas, setKas] = useState({
        pengeluaran: "",
        nomorTransaksi: "",
      keterangan:"",
      pemasukkan:""
    })
    const useValidators = useValidator({
        pengeluaran: [],
        nomorTransaksi:[],
      keterangan:[],
      pemasukkan:[]
    })
    
    const handleChangebarang = (text, field) => {
        setKas({...kas, [field]: text})
    }
    const addbarang = async() => {
        useValidators.reset()

        const config = {
            headers:{
                Authorization: await jwt.get()
            }
        }
    
        const url = `${BASE_URL}/kas/`
        http.privateHTTP.post(url,kas, config).then((response) => {
          console.log(response.data);
          message.success(response)
          navigation.navigate("ScreenKasList")
        }).catch((error) => {
          message.error(error)
          useValidators.except(error);
          console.log(error.response);
        })
      }
    return (
        <>

        <View>
            <WidgetCommonHeader back={(
                 <Appbar.BackAction  onPress={navigation.goBack}/>
            )} title={"add barang"}
            />
            <WidgetCommonAuth child={(
               <View style= {style.container}> 
               <View style= {style.wrapper}>
              <TextInput
                label="nomorTransaksi"
                autoCapitalize="none" 
                placeholderTextColor={"#ced4d4"} 
                style = {style.Inputsign}
                onChangeText={(text)=>{handleChangebarang (text,"nomorTransaksi")}}
                />
               <WidgetCommonValidator messages={useValidators.get("nomorTransaksi")}/>
              </View>
              <View>
              <TextInput
                label=" pengeluaran"
                autoCapitalize="none" 
                placeholderTextColor={"#ced4d4"} 
                style = {style.Inputsign}
                onChangeText={(text)=>{handleChangebarang (text,"pengeluaran")}}
                />
              <WidgetCommonValidator messages={useValidators.get("pengeluaran")}/>
              </View>
              <View>
              <TextInput
                label=" pemasukkan"
                autoCapitalize="none" 
                placeholderTextColor={"#ced4d4"} 
                style = {style.Inputsign}
                onChangeText={(text)=>{handleChangebarang (text,"pemasukkan")}}
                />
              <WidgetCommonValidator messages={useValidators.get("pemasukkan")}/>
              </View>
              <View>
              <TextInput
                label=" keterangan"
                autoCapitalize="none" 
                placeholderTextColor={"#ced4d4"} 
                style = {style.Inputsign}
                onChangeText={(text)=>{handleChangebarang (text,"keterangan")}}
                />
              <WidgetCommonValidator messages={useValidators.get("keterangan")}/>
              </View>
              <View style= {style.wrapper}>
               <Button icon="account-lock-open-outline" mode="contained" onPress={addbarang}>
                 add
               </Button>
           </View>
               </View>
            )}/>
           
          

        </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        height:"90%",
        width:"100%",
        gap: 30,
        paddingHorizontal: 24
    },
    wrapper:{
        width:"100%",
    },
    Inputsign:{
        paddingVertical:10,
        paddingHorizontal:5,
        fontSize:15,
        borderRadius: 5,
        color: "#ffecd1"
    }
})
export default ScreenKasCreate