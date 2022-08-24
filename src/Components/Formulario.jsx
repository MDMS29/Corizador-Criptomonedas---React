import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .5s ease;
    margin-top: 20px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([])//Es importante que los hooks no creados se definan de primeros
  const [error, setError] = useState(false)//

  //Importante tener el mismo orden en el que se exportan
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas) //Se pasa el texto y el select a mostrar en las monedas
  const [criptoMoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos) //Se pasa el texto y el select a mostrar en las monedas


  useEffect(() => {
    const consultarAPI = async () => {//Se hace una funcion async para tomar informacion de una API
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const res = await fetch(url)
      const resultado = await res.json()

      const arrayCriptos = resultado.Data.map(cripto => {
        //Se itera en el resultado JSON para poder obtener los datos de la API y asi tomarlos
        //Ademas de crea un objeto para guardar la informacion de cada dato, se utiliza el id como KEY

        const objeto = { //Objeto que guardara la informacio de las monedas a usar en el Select
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto //Se debe retornar el objeto para poder mostrar cada dato
      })
      setCriptos(arrayCriptos)//guarda en un array los valores de la API
    }
    consultarAPI()
  }, []) //Cada vez que haya un cambio se realizara el useEffect

  const handleSubmit = e => {
    e.preventDefault()
    if ([moneda, criptoMoneda].includes('')) {
      setError(true)
      return
    }
    setError(false)
    //Guarda la moneda y la cirptomoneda seleccionada
    setMonedas({moneda, criptoMoneda}) 

  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>

        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario