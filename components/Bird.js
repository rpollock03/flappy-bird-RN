import React from "react"
import {Stylesheet, Text, Animated, View} from 'react-native'


const Bird = ({birdBottom, birdLeft}) =>{

    const birdWidth = 50
    const birdHeight = 60

    return (
        <View 
            style = {[{
                position: "absolute",
                backgroundColor: 'blue',
                width: birdWidth,
                height: birdHeight,
                left: birdLeft - (birdWidth/2), //to centralise the bird view
                bottom: birdBottom - (birdHeight/2),  //possibly delete last bit
            }]}>
        </View>
    )
}

export default Bird

