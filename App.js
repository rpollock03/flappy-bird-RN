import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, TouchableWithoutFeedback, Animated, Button } from 'react-native'
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'


export default function App() {

  // ---  STATE AND VARIABLES ---- //

  // CALIBRATION
  const screenWidth = Dimensions.get("screen").width
  const screenHeight= Dimensions.get("screen").height

  // GAME
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore]=useState(0)

  // BIRD LOCATION
  const birdLeft = screenWidth / 2 //bird is always same on horizontal axis
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)

  // GAME PHYSICS
  const gravity = 3
  let gravityTimerId

  // OBSTACLES
  const[obstaclesLeft, setObstaclesLeft] = useState(screenWidth) //so starts off the page
  const[obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 +30) 
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200 // gap between obstacles
  let obstacleOneTimerId, obstacleTwoTimerId;



  //randomise obstacles heights 
  // could pass in math random here instead of 0 to make the first obstacles random
  const [obstaclesNegHeight, setObstaclesNegHeight]=useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]=useState(0)


  // --- FUNCTIONS --- //

  // GRAVITY - START BIRD FALLING
  useEffect(()=>{
    if(birdBottom > 0){
      gravityTimerId = setInterval(()=>{
          setBirdBottom(birdBottom => birdBottom - gravity)
       }, 30) //30ms

    return ()=>{
      clearInterval(gravityTimerId)
        }
      }
    }, [birdBottom])

  // OBSTACLE 1
  useEffect(()=>{
    if(obstaclesLeft >- obstacleWidth){  
      obstacleOneTimerId = setInterval(()=>{
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5) //move it to the left
      },30)

    return()=>{
      clearInterval(obstacleOneTimerId)
      }
    } 
    else {
      // obstacle has been cleared, update score and reset obstacle 1 with new randomised height
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random()*100)
      setScore(score => score+1)
    }
  },[obstaclesLeft])

  //OBSTACLE 2
  useEffect(()=>{
    if(obstaclesLeftTwo>-obstacleWidth){  //if obstacle is still on screen
      obstacleTwoTimerId = setInterval(()=>{
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      },30)

      return()=>{
        clearInterval(obstacleTwoTimerId)
      }
    } 
    else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random()*100)
      setScore(score => score+1)
    }
  },[obstaclesLeftTwo])


  // CHECK FOR COLLISONS
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
    }
  })



  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstacleOneTimerId)
    clearInterval(obstacleTwoTimerIdTwo)
    setIsGameOver(true)
  }

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom +50)
      console.log("jumped!")
    }
  }


  return (
  <TouchableWithoutFeedback > 
  <View style={styles.container}>
  <ImageBackground source={require('./assets/flappy-bird-background-2.jpg')}  style={{
    height: "100%",
    width: '100%',
  }}  >

    {isGameOver && <Text>{score}</Text>}
  
      <Bird 
        birdBottom = {birdBottom}
        birdLeft = {birdLeft}
      
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
      </ImageBackground>
    </View>
  </TouchableWithoutFeedback>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center'
  }
})