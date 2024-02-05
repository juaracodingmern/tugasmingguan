import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from 'react';
import { CONTEXT_APP } from './setting';
import Homescreen from './screens/homescreen';
import ScreenAuthSignIn from "./screens/auth/ScreenAuthSignIn";
import { StatusBar } from "expo-status-bar";
import ScreenBarangList from "./screens/barang/ScreenBarangList";
import ScreenBarangCreate from "./screens/barang/ScreenBarangCreate";
import ScreenBarangDetail from "./screens/barang/ScreenBarangDetail";
import ScreenMain from "./screens/main/ScreenMain";
import ScreenTerimaCreate from "./screens/terima/SreenTerimaCreate";
import ScreenTerimaList from "./screens/terima/ScreenTerimaList";
import ScreenKasList from "./screens/kas/ScreenKasList";
import ScreenKasCreate from "./screens/kas/ScreenKasCreate";
import ScreenKasDetail from "./screens/kas/ScreenKasDetail";


const Stack = createStackNavigator()
export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true)
  return (
  
      // {/* <List/> */}
      // <SignIn/>
    <CONTEXT_APP.Provider value={{isAuthenticated,setIsAuthenticated}}>

      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen 
          name='ScreenMain'
          component={ScreenMain}
          options={{ headerShown: false}}/>

          <Stack.Screen 
          name='ScreenAuthSignIn'
          component={ScreenAuthSignIn}
          options={{title: "signin"}}/>

        <Stack.Screen 
          name='ScreenBarangList'
          component={ScreenBarangList}
          options={{ headerShown: false}}/>

        <Stack.Screen 
          name='ScreenBarangCreate'
          component={ScreenBarangCreate}
          options={{ headerShown: false}}/>

        <Stack.Screen 
          name='ScreenBarangDetail'
          component={ScreenBarangDetail}
          options={{ headerShown: false}}/>

          <Stack.Screen 
            name='ScreenTerimaList'
            component={ScreenTerimaList}
            options={{ headerShown: false }}
          />
           <Stack.Screen 
            name='ScreenTerimaCreate'
            component={ScreenTerimaCreate}
            options={{ headerShown: false }}
          />
           <Stack.Screen 
            name='ScreenKasList'
            component={ScreenKasList}
            options={{ headerShown: false }}
          />
           <Stack.Screen 
            name='ScreenKasCreate'
            component={ScreenKasCreate}
            options={{ headerShown: false }}
          />

        <Stack.Screen 
            name='ScreenKasDetail'
            component={ScreenKasDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

      </NavigationContainer>
      <StatusBar style='dark' hidden={true} />
    </CONTEXT_APP.Provider>
    
   
  );
}

