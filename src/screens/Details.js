import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Details({ route, navigation }) {
    
    /*
    Réception des paramètres envoyés de la liste.
    */
    const { itemId } = route.params;
    const { itemName } = route.params;
    const { itemCountry } = route.params;
    const { itemDivision } = route.params;
    const { itemAddress } = route.params;
    
    /* 
    Simple view qui retourne le titre de la page, les infos et le logo de Poka.
    */
   
    return (
        <View style = {{ backgroundColor:"white", height: "100%"}}>
            <Text style={styles.logo}>Factory Details</Text>
            <View style = {{justifyContent: "center", marginBottom: 30}}>
                <Text style={styles.inputText}>Id: {JSON.stringify(itemId)}</Text>
                <Text style={styles.inputText}>Name: {JSON.stringify(itemName)}</Text>
                <Text style={styles.inputText}>Division: {JSON.stringify(itemDivision)}</Text>
                <Text style={styles.inputText}>Address: {JSON.stringify(itemAddress)}</Text>
                <Text style={styles.inputText}>Country: {JSON.stringify(itemCountry)}</Text>
            </View>

            <View style = {{justifyContent: "center", marginBottom: 30}}>
                <Image
                    style={styles.icon}
                    source={require('../images/icon.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        fontWeight:"bold",
        fontSize:25,
        color:"#336699",
        marginBottom:20,
        marginTop:20,
        justifyContent:"center",
        textAlign: 'center',
    },
    inputText:{
        height:50,
        color:"black",
        marginLeft:60,
        borderRadius:25,
    },
    icon: {
        backgroundColor: "white",
        width: 100,
        height: 100,
        alignSelf: "center"
    },    
});
