import { StyleSheet, View } from "react-native"
import { Appbar,TextInput,Button } from "react-native-paper"
import useJWT from "../../hooks/useJWT";
import useHTTP from "../../hooks/useHTTP";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, CONTEXT_APP } from "../../setting";
import useMessage from "../../hooks/useMessage";
import useValidator from "../../hooks/useValidator";

import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";

const ScreenBarangDetail = ({navigation,route}) =>{
    const jwt = useJWT()
    const http = useHTTP()
    const message = useMessage();
  
    const [barang, setBarang] = useState({
      nama: "",
      merk: ""
    })
    const useValidators = useValidator({
      nama: [],
      merk: []
    })
    
    const handleChangebarang = (text, field) => {
        setBarang({...barang, [field]: text})
    }
    const onBarangUpdate = async () => {
        useValidators.reset()
        try {
          const config = {
            headers: {
              Authorization: await jwt.get(),
            },
          }
          const url = `${BASE_URL}/barang/${route.params.id}`
          http.privateHTTP.put(url, barang,config).then((response) => {
            message.success(response)
            navigation.goBack()
          }).catch((error) => {
            message.error(error)
            useValidators.except(error)
            
          })
        } catch (error) {
          console.log(error)
        }
      }
      const onBarangdelete = async () => {
        useValidators.reset()
        try {
            message.confirmRemove(async()=>{
                const config = {
                    headers: {
                      Authorization: await jwt.get(),
                    },
                  }
                  const url = `${BASE_URL}/barang/${route.params.id}`
                  http.privateHTTP.delete(url,config).then((response) => {
                    message.success(response)
                    navigation.goBack()
                  }).catch((error) => {
                    message.error(error)
                    
                  })
            })
        
        } catch (error) {
          console.log(error)
        }
      }
    
      const onBarangDetail = async () => {
        try {
          const config = {
            headers: {
              Authorization: await jwt.get(),
            },
          }
          const url = `${BASE_URL}/barang/${route.params.id}`
          http.privateHTTP.get(url, config).then((response) => {
            setBarang(response.data.data);
          }).catch((error) => {
            message.error(error)
            console.log(error);
          })
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
       if (route.params.id) {
          
            onBarangDetail()
       }
      },[route.params])

return (
    <>
       <View>
       <WidgetCommonHeader back={(
                 <Appbar.BackAction  onPress={navigation.goBack}/>
            )} title={"detail barang"}
            />

          <WidgetCommonAuth child={(
                  <View style= {style.container}> 
                  <View style= {style.wrapper}>
                 <TextInput
                   label="nama"
                   autoCapitalize="none" 
                   placeholderTextColor={"#ced4d4"} 
                   style = {style.Inputsign}
                   value={barang.nama}
                   onChangeText={(text)=>{handleChangebarang (text,"nama")}}
                   />
                  <WidgetCommonValidator messages={useValidators.get("nama")}/>
                 </View>
                 <View>
                 <TextInput
                   label="Merk"
                   autoCapitalize="none" 
                   placeholderTextColor={"#ced4d4"} 
                   style = {style.Inputsign}
                   value={barang.merk}
                   onChangeText={(text)=>{handleChangebarang (text,"merk")}}
                   />
                 <WidgetCommonValidator messages={useValidators.get("merk")}/>
                 </View>
                 <View style= {[style.wrapper,style.btn]}>
                 <Button  icon="account-lock-open-outline" mode="contained" onPress={onBarangdelete}>
                    hapus
                  </Button>
                  <Button icon="account-lock-open-outline" mode="contained" onPress={onBarangUpdate}>
                    Update
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
    },
    btn:{
        gap:16
    }
})
export default ScreenBarangDetail