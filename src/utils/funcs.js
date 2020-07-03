const giveMeScore = (id, cP) => {
    let score = 0
    //aqui tomamos los players del parametro cP porque aun no llegan al state, al corren
    //primero esta funcion dentro de handleplayer
    const playerHoles = cP[id].holes
 
    if(playerHoles && Object.keys(playerHoles).length === 0){
        const getScores = Object.values(playerHoles)
        return score += getScores
    }
   
    if(playerHoles && Object.keys(playerHoles).length >= 1){
        const getScores = Object.values(playerHoles)
        getScores.forEach(s => score += Number(s))
    }
    cP[id] = {...cP[id], gross : score }
    return cP
    }