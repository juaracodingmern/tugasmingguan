import { useCallback, useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { List } from "react-native-paper"
import useMessage from "../../hooks/useMessage";
import { BASE_URL } from "../../setting";
import { Appbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
 
// TODO: infinite scroll
// TODO: tambahkan search pada list
const ScreenBarangList = ({navigation}) => {
  
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarBarangPagination, setDaftarBarangPagination] = useState({})
  const barangSearch = useRef({value: ""})

  const onBarangList = async (params) => {
    const url = `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: await jwt.get(),
      },
      params
    }
    http.privateHTTP.get(url, config).then((response) => {
      console.log("uyee", BASE_URL)
      const { results, ...pagination } = response.data;
      
      setDaftarBarangPagination(pagination);
      setDaftarBarang(results)
    }).catch((error) => {
      message.error(error);
    })
  }

  const onRefresh = () => {
    onBarangList()
    console.log("direfresh....")
  }

  useEffect(() => {
    if (isFocused) {
      onBarangList()
    }
    
  }, [isFocused]);

  // TODO: tambahankan infinite scroll
  return (
    <>
      <View>
        <WidgetCommonHeader 
          back={(
            <Appbar.BackAction onPress={navigation.goBack} />
          )}
          title={"Barang"} 
          action={(
            <Appbar.Action icon="plus-circle-outline" onPress={() => {
              navigation.navigate('ScreenBarangCreate')
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
            {daftarBarang.map((barang) => (
              <List.Item
                onPress={() => navigation.navigate("ScreenBarangDetail", {id: barang._id})}
                key={barang._id}
                title={barang.nama}
                left={props => <List.Icon {...props} icon="folder-outline" />}
              />
            ))}
          </ScrollView>

        )} />
      </View>
    </>
  )
}

export default ScreenBarangList;