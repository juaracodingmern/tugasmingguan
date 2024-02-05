import { useCallback, useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { ScrollView, Text, View, RefreshControl, StyleSheet } from "react-native";
import { List,DataTable } from "react-native-paper"
import useMessage from "../../hooks/useMessage";
import { BASE_URL } from "../../setting";
import { Appbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
 
const ScreenKasList = ({navigation}) =>{
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const http = useHTTP();
    const jwt = useJWT();
    const message = useMessage();
  
    const [daftarkas, setDaftarkas] = useState([]);
   
  
    const onKasList = async (params) => {
      const url = `${BASE_URL}/kas/`;
      const config = {
        headers: {
          Authorization: await jwt.get(),
        },
        params
      }
      http.privateHTTP.get(url, config).then((response) => {
        console.log("uyee", BASE_URL)
        const { results, ...pagination } = response.data;
        
   
        setDaftarkas(results)

      }).catch((error) => {
        message.error(error);
      })
    }
  
    const onRefresh = () => {
     onKasList()
      console.log("direfresh....")
    }
  
    useEffect(() => {
      if (isFocused) {
        onKasList()
      }
      
    }, [isFocused]);
    return (
        <>
          <View>
            <WidgetCommonHeader 
              back={(
                <Appbar.BackAction onPress={navigation.goBack} />
              )}
              title={"Kas"} 
              action={(
                <Appbar.Action icon="plus-circle-outline" onPress={() => {
                  navigation.navigate('ScreenKasCreate')
                }} />
              )}
            />
            <WidgetCommonAuth child={(
              <ScrollView
                style={{width: "100%"}}
                // onScroll={(e) => {console.log(e.contentOffset)}}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                {/* {daftarkas.map((kas) => (
                  <List.Item
                    // onPress={() => navigation.navigate("ScreenBarangDetail", {id: barang._id})}
                    key={kas._id}
                    title={kas.nomorTransaksi}
                    left={props => <List.Icon {...props} icon="folder-outline" />}
                  />
                ))} */}

    <View style={style.mainbox}>
     <DataTable>
      <DataTable.Header style={style.databeHeader} >
        <DataTable.Title>nomorTransaksi</DataTable.Title>
        <DataTable.Title >Keterangan</DataTable.Title>
        <DataTable.Title >Pemasukan</DataTable.Title>
        <DataTable.Title >Pengeluaran</DataTable.Title>
      </DataTable.Header>
      

      {daftarkas.map((item) => (
        <DataTable.Row style={style.databeBox} key={item._id}>
          <DataTable.Cell onPress={() => navigation.navigate("ScreenKasDetail", {id: item._id})} >{item.nomorTransaksi}</DataTable.Cell> 
          <DataTable.Cell>{item.keterangan}</DataTable.Cell>
          <DataTable.Cell >{item.pemasukkan}</DataTable.Cell>
          <DataTable.Cell >{item.pengeluaran}</DataTable.Cell>
        </DataTable.Row>
      ))}

      </DataTable >
    </View>
    </ScrollView>
    
            )} />
          </View>
        </>
      )
}
const style = StyleSheet.create({
    title:{
        margin: 10,
        fontSize: 15,
        fontSize: 35
      },
      mainbox:{
        textAlign:'center',
        marginVertical: 10,
        flex: 1,
        justifyContent: 'space-between',
      },
      databeBox:{
        gap:4,
        textAlign: 'center',
        paddingHorizontal:10,
      },
      databeHeader:{
        paddingHorizontal:10,
        textAlign: 'left', 
      },
      DataTables:{
        
      }
})
export default ScreenKasList