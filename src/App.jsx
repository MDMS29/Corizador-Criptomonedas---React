import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './Components/Formulario'
import Resultado from './Components/Resultado'
import Spinner from './Components/Spinner'

const Contenedor = styled.div`
  max-width:900px;
  margin:0 auto;
  width:90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem; 
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin:100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    height: 6px;
    width: 100px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  //Mira si hay algun cambio en las monedas seleccionadas y si hay algun elemento hara las instrucciones dadas
  useEffect(()=>{
    if(Object.keys(monedas).length > 0) {
      const cotizarCripto = async() => {
        setCargando(true) 
        setResultado({}) //Para que al buscar una nueva cotizacion se elimine el que ya se habia realizado
        const {moneda, criptoMoneda} = monedas //Object destructuring de lo que este guardado
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}` //Se concatena para hacer las conversiones de las monedas
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setResultado(resultado.DISPLAY[criptoMoneda][moneda]) //Guarda toda la informacion de la conversion de la criptoMoneda
        //console.log(resultado.DISPLAY[criptoMoneda][moneda]) //Busca dentro de DISPLAY las propiedades que tienen el nombre de criptoMoneda, y luego de moneda
        setCargando(false)
      }
      cotizarCripto()
    }
  },[monedas])

  return (
    <>
      <Contenedor>
        <Imagen
          src={imagenCripto}
          alt='Imagenes Criptomonedas'
        />
        <div>
          <Heading>Cotiza Ciptomonedas al Instante</Heading>
          <Formulario 
            setMonedas={setMonedas} 
          />
          {cargando && <Spinner/>}
          {resultado && resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Contenedor>
    </>
  )
}

export default App
