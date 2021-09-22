/* ------------------------------------------------------- 
Alexis B.Trépanier

Exercice de recrutement iOS 

Outils utilisés :
- VS Code
- Expo
- Npm

Testé sur snack.expo.dev pour vérifier le fonctionnement sur IOS.
--------------------------------------------------------*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Usines from "./src/screens/Usines";
import Details from "./src/screens/Details";
import Splash from "./src/screens/Splash";

const Stack = createNativeStackNavigator();

/* 
Voici le navigateur qui affiche l'écran requis et qui permet de passer d'un écran à l'autre.
J'ai retiré la possibilité de faire des retours en arrière pour tout les écrans excepté Details.
*/

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options = {{ headerShown: false }}/>
        <Stack.Screen name="Usines" component={Usines} options = {{ headerShown: false }}/>
        <Stack.Screen name="Details" component={Details}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

