import React from "react"
import {Stylesheet, Text, View} from 'react-native'


const Bird = ({birdBottom, birdLeft}) =>{

    const birdWidth = 50
    const birdHeight = 60

    return (
        <View style = {{
            position: "absolute",
            backgroundColor: 'blue',
            width: 50,
            height: 60,
            left: birdLeft - (birdWidth/2), //to centralise the bird view
            bottom: birdBottom - (birdHeight/2)
        }}>

        </View>
    )
}

export default Bird

