import React, {useState, useEffect} from 'react';
import Header  from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator
} from 'react-native';



const App = () => {
  const [moneda, setMoneda] =useState('');
  const [crypto, setCrypto] =useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] =useState({});
  const [cargando, setCargando] = useState(false)

  useEffect(() =>{
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){
        //consultar api para cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
        const resultado = await axios.get(url);
        setCargando(true);
        //ocultar spinner y mostrar resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[crypto][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 1500);

      } 
    }
    cotizarCriptomoneda();
  }, [consultarAPI])

  //mostrar spinner o resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5e49e2" /> : <Cotizacion resultado={resultado} />

  return (
    <>
    <ScrollView>
      <Header />
      <Image
      style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario 
          moneda={moneda}
          crypto={crypto}
          setMoneda={setMoneda}
          setCrypto={setCrypto}
          setConsultarAPI={setConsultarAPI}
        />
      </View>
      <View style={{marginTop:40}}>
        {componente}
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
