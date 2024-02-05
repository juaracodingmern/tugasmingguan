import { useState } from "react"
import {StyleSheet, TouchableOpacity, View,Text, Alert } from "react-native"
let datafake = [
    {
        id:1,
        nama:"sayur1"
    },
    {
        id:2,
        nama:"sayur2"
    },
    {
        id:3,
        nama:"sayur3"
    }
]
const List = ()=>{
    const [daftar,setbelanja] = useState(datafake)
    const [carts,setCarts] = useState([])

    const tampilinfo =(nama)=>{
            Alert.alert(nama)
    }

    const TambahKeranjang =(items)=>{
        console.log(items)
     let newcart = [...carts , items]

     
     setCarts(newcart)
}
    return (
        <>
            <View style={style.container}>
                {daftar.map((val) =>(
                    <TouchableOpacity key={val.id} style={style.item} onPress={()=>TambahKeranjang(val)}> 
                        <Text>
                            {val.nama}
                        </Text>
                    </TouchableOpacity>
                ))}

                {carts.map((val) =>(
                    <TouchableOpacity key={val.id} style={style.cart} onPress={()=>tampilinfo(val.nama)}> 
                        <Text>
                            {val.nama}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    )
}

export default List

const style = StyleSheet.create(
    {
        container:{
            marginTop: 40
        },
        item:{
            paddingVertikal: 8,
            paddingHorizontal:16,
            backgroundColor:'cyan'
        },
        cart:{
            paddingVertikal: 8,
            paddingHorizontal:16,
            backgroundColor:'green'
        }
    }
)