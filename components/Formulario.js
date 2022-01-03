import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({moneda, setMoneda, crypto, setCrypto, setConsultarAPI}) =>{

    const [cryptos, setCryptos] =useState([]);

    useEffect(() =>{
        const consultarAPI = async () =>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const resultado = await  axios.get(url);
            setCryptos(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //almacena la seleccion del usuario 
    const obtenerMoneda = moneda =>{
        setMoneda(moneda)
    }

    const obtenerCryptoMoneda = cripto =>{
        setCrypto(cripto)
    }

    const cotizarPrecio = () =>{
        if(moneda.trim() === '' || crypto.trim() === ''){
            mostrarAlerta();
            return;
        }

        //si la validacion pasa
        setConsultarAPI(true)
        
    }

    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

    return(

        <View>
            <Text style={styles.label} >Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{height:120}}
            >
                <Picker.Item label="-Seleccione-" value="" />
                <Picker.Item label="Dolar Estados Unidos" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>
            <Text style={styles.label} >Cryptomoneda</Text>
            <Picker
                selectedValue={crypto}
                onValueChange={cripto => obtenerCryptoMoneda(cripto)}
                itemStyle={{height:120}}
            >
                <Picker.Item label="-Seleccione-" value="" />
                { cryptos.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                )) }
            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={() => cotizarPrecio()}
            >
                <Text style={styles.textoCotizar} >Cotizar</Text>
            </TouchableHighlight>
        </View>

    );

}

const styles = StyleSheet.create({
    label:{
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        fontSize:22,
        marginVertical:20
    },
    btnCotizar:{
        backgroundColor:'#5e49e2',
        padding:10,
        marginTop:20
    },
    textoCotizar:{
        color:'#FFF',
        fontSize:18,
        fontFamily:'Lato-Black',
        textAlign:'center'

    }
});

export default Formulario;