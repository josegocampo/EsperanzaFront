import React, {useState, useEffect} from 'react'
import axios from 'axios'
import S from 'styled-components'

const GameDetails = ( {id, btn} ) => {

    const [gameInfo, setGameInfo] = useState()
    
    useEffect(() => {
        axios.get(`https://hcesperanzino.herokuapp.com/games/${id}/gameinfo/`)
            .then((response) => {
                setGameInfo(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    console.log(gameInfo)

    return(
        <div>
            { gameInfo ? <View>{ gameInfo.map(( player ) => <div>{player.player_name}</div>) } <button onClick={btn} style={{height: 20, width: 20}}></button></View>
            : <View>...loading</View>}
            </div>
    )
}

const View = S.div`

`


export default GameDetails;