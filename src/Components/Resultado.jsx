import React from 'react'
import styled from '@emotion/styled'


const Result = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Imagen = styled.img`
    display: block;
    width: 150px;
`

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`
const Resultado = ({resultado}) => {
  
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPC24HOUR, IMAGEURL, LASTUPDATE} = resultado

    return (
    <Result>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
       <div>
        <Precio>El precio es de: <span>{PRICE}</span></Precio>
        <Texto>El precio mas alto del dia es de: <span>{HIGHDAY}</span></Texto>
        <Texto>El precio mas bajo del dia es de: <span>{LOWDAY}</span></Texto>
        <Texto>Variacion ultimas 24 horas: <span>{CHANGEPC24HOUR}</span></Texto>
        <Texto>Ultima actualizacion: <span>{LASTUPDATE}</span></Texto>
       </div>
    </Result>
  )
}

export default Resultado