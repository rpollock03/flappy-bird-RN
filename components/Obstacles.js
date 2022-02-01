import React from "react"
import {View} from "react-native"


const Obstacles = ({obstaclesLeft, obstacleWidth, obstacleHeight, gap, color, 
randomBottom
}) =>{

    return(
        <>
       <View style={{
            position: "absolute",
            backgroundColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomBottom + obstacleHeight + gap
        }}>

        </View>
     
        <View style={{
            position: "absolute",
            backgroundColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomBottom
        }}>

        </View>
        </>
    )
}

export default Obstacles