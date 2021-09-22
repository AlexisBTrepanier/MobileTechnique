import React, { useEffect } from "react";
import { Image, StyleSheet, View, } from 'react-native';

/* 
J'ai fait un petit splashscreen pour l'ouverture de l'application.
Le logo de Poka est affiché pendant 2 secondes avant que l'application arrive à la liste des usines.
useEffect est activé une fois que la page a chargée.

En iOS, j'aurais utilisé le lauchScreen.storyboard au lieu d'en avoir fait un manuellement comme içi.
*/

const Splash = props => {
    useEffect(() => {
        setTimeout(function(){ props.navigation.navigate('Usines'); }, 2000);
    });

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../images/poka.png')}
        />
      </View>
    )
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  },
  logo: {
    backgroundColor: "white",
    width: 300,
    height: 400,
  },
});
