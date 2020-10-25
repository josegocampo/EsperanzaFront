import { holes } from './mockdata'

export const getHcScore = (player, holeIndex, score) => {
    let maxScore = 0
    let netScore = score
    if (player.handicap / 2 <= holes[holeIndex].handicap) {
        maxScore = holes[holeIndex].par + 2
    }
    else if (player.handicap / 2 > holes[holeIndex].handicap) {
        maxScore = holes[holeIndex].par + 3
    }
    if (score > maxScore) {
        netScore = maxScore
    }
    return netScore
}

export const getNetScore = (player, holeIndex, score) => {
    let netScore = score

    if (player.handicap / 2 >= holes[holeIndex].handicap) {
        netScore = netScore - 1
    }
    return netScore
}

export const holeMax = (player, holeIndex, score) => {
    if (getHcScore(player, holeIndex, score) < score) {
        return true
    }
}
// I wanna extract get Winners afterwards into its own component
    //or at least the return of it, I should build a new component for that

