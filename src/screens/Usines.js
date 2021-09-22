import React, { useState, useEffect } from "react";
import { Image, TouchableWithoutFeedback, StyleSheet, Text, View, FlatList } from 'react-native';

/* 
Fonction qui permet d'appeller l'API.
Le useEffect permet d'appeller la fonction dès que la page est chargée.
On en retire les infos des usines requises, un array contenant les numéros de pages, et un booléen de 'loading'.
*/

const useFetch = url => {
    const [state, setState] = useState({ data: null, nbPages: 0, loading: true});
    var pages = [];

    useEffect(() => {
      setState({ data: null, nbPages: 0, loading: true});
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            /* Détermine le nombre de pages à partir de la quantité d'éléments dans la liste et créer un array. */
            for (let i = 1; i <= Math.ceil(responseJson.count/10); i++) {
                pages.push(i);
            }

            setState({ data: responseJson.results, nbPages: pages, loading: false });
        });
    }, [url, setState]);
  
    return state;
};

/* 
Fonction principale de la page qui permet d'afficher les éléments.
*/

const Factories = props => {

    /* Le offset est ajouté à la state pour que dès qu'il soit modifié, 
    un nouvel appel se fasse à l'API pour charger les nouvelles usines. */
    const [offset, setOffset] = useState(0);

    /* Appel de l'API */
    const { data , nbPages , loading} = useFetch(`https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev?offset=${offset}`);
    
    /* 
    Chargement des éléments, lorsque loading est true un élément de texte ("Loading factory list...") est affiché.
    Une flatlist horizontale est utilisée pour afficher les numéros de pages de la liste.
    Une flatlist verticale est utilisée pour afficher les usines.
    Lorsqu'une usine est selectionné, ces informations sont envoyées à la page détails.
    
    En iOS, je pense que j'aurais utilisé des stacks (un horizontal et un vertical) au lieu des flatlists.
    */ 

    return (
    <View style = {{backgroundColor:"white", height: '100%'}}>

        <Text style={styles.logo}>Factory List</Text>
        <View style={styles.paging}>
            <Text>{loading ? "Loading factory list..." : ""}</Text>
            <FlatList style={styles.pageNumbers} horizontal = {true}
                    keyExtractor={(x) => x.toString()}
                    data={nbPages} 
                    renderItem={( { item } ) => {
                        return( 
                            <TouchableWithoutFeedback style={styles.pageBtn} onPress={() => setOffset((item-1)*10)}>
                                <Text style={styles.pageNumbers}> {item}</Text>
                            </TouchableWithoutFeedback>
                        )
                    }} >
            </FlatList>
        </View>
        
        <FlatList 
            keyExtractor={(usine) => usine.id.toString()}
            data={data} 
            renderItem={( { item } ) => {
                return( 
                    <View style = {{backgroundColor:"white", alignItems: 'center',}}>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Details', {
                            itemId: item.id,
                            itemName: item.name,
                            itemCountry: item.country,
                            itemDivision: item.division,
                            itemAddress: item.address,
                        })}>

                            <View style={styles.factoryBtn}>
                                <Text style={styles.btnText}>{item.name}</Text>
                                <Text style={styles.btnText}>{item.division}</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                )
            }} >
            
        </FlatList>
        
        <View style = {{justifyContent: "center", marginBottom: 30}}>
            <Image
            style={styles.icon}
            source={require('../images/icon.png')}
            />
        </View>
    </View>)
}
export default Factories;

/* 
Le stylesheet utilisé pour l'esthétique des éléments.
En iOS, j'aurais utilisé AutoLayout pour positionner les éléments.
*/

const styles = StyleSheet.create({
    btnText: {
        color: "white",
        marginTop: '10',
        borderRadius:50,
    },
    pageNumbers: {
        color: "black",
        marginLeft:20,
        marginRight:20,
        textDecorationLine: "underline",
        textAlign: 'center',
        
    },
    logo:{
        fontWeight:"bold",
        fontSize:25,
        color:"#336699",
        marginBottom:20,
        marginTop:50,
        justifyContent:"center",
        textAlign: 'center',
    },
    factoryBtn:{
        width:"60%",
        backgroundColor:"#336699",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:30,
        textAlign: 'center',
        position: 'relative',
    },
    paging:{
        marginBottom:30,
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    pageBtn:{
        backgroundColor:"#336699",
        alignItems:"center",
        justifyContent:"center",
        textAlign: 'center',
    },
    icon: {
        backgroundColor: "white",
        width: 100,
        height: 100,
        alignSelf: "center"
    },
});


