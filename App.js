
import React, {useState, useEffect} from "react"
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Bird from './components/Bird'
import Obstacles from "./components/Obstacles"


export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight= Dimensions.get("screen").height
  
  //precisely bottom left of bird component
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const gravity = 3
  let gameTimerId


  //randomise obstacles heights 
  // could pass in math random here instead of 0 to make the first obstacles random
  const [obstaclesNegHeight, setObstaclesNegHeight]=useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]=useState(0)

  //start bird falling
  useEffect(()=>{
    if(birdBottom > 0){
       gameTimerId = setInterval(()=>{
          setBirdBottom(birdBottom => birdBottom - gravity)
       }, 30) //30ms

    return ()=>{
      clearInterval(gameTimerId)
      }
    }
  },[birdBottom])

  //start obstacles scrolling
  const[obstaclesLeft, setObstaclesLeft] = useState(screenWidth) //so starts off the page
  
  let obstaclesLeftTimerId
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  
  useEffect(()=>{
    if(obstaclesLeft>-obstacleWidth){  //obstaclewidth so object disapeares
      obstaclesLeftTimerId = setInterval(()=>{
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      },30)
      return()=>{
        clearInterval(obstaclesLeftTimerId)
      }
    } 
    else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random()*100)
    }
  },[obstaclesLeft])

  //start second obstacle

  const[obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 +30) 
  
  let obstaclesLeftTimerIdTwo

  useEffect(()=>{
    if(obstaclesLeftTwo>-obstacleWidth){  //obstaclewidth so object disapeares
      obstaclesLeftTimerIdTwo = setInterval(()=>{
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      },30)
      return()=>{
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } 
    else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random()*100)
    }
  },[obstaclesLeftTwo])



  //check for collisons

  useEffect(()=>{
    if(
    ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) 
    || birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) 
    && (obstaclesLeft > screenWidth/2 -30 
    && obstaclesLeft < screenWidth/2 + 30))
    || 
    ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) 
    || birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) 
    && (obstaclesLeftTwo> screenWidth/2 -30 
    && obstaclesLeftTwo < screenWidth/2 + 30)
    ))
    {
      console.log("game over")
      gameOver()
      setIsGameOver(true)
    }
    
  },[])

 

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesTimerIdTwo)
  }

  const jump = () => {
    
  }

  return (
  <TouchableWithoutFeedback onPress={jump}> 
  <View style={styles.container}>
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
        />
      <Obstacles
        obstaclesLeft={obstaclesLeft}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        gap={gap}
        randomBottom={obstaclesNegHeight}
        color={"green"}
      />
       <Obstacles
        obstaclesLeft={obstaclesLeftTwo}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstaclesNegHeightTwo}
        gap={gap}
        color={"yellow"}
      />
    </View>
  </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
