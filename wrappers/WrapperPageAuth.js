import { useContext } from "react"

import { Banner } from 'react-native-paper';
import { Alert } from "react-native";
import { CONTEXT_APP } from "../setting";

const WrapperPageAuth = () => {
  const application = useContext(CONTEXT_APP);

  return (
    <>
      <Banner
        visible={!application.isAuthenticated}
        actions={[
          {
            label: 'Sign In Now!',
            onPress: () => Alert.alert("Ups!"),
          },
        ]}
        >
        Hey, halaman ini butuh signin.
      </Banner>
    </>
  )
}

export default WrapperPageAuth;