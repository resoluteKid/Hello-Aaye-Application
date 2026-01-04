import { StyleSheet, Text, View, TextInput, Button } from 'react-native'   //rnfes
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeScreen from "./src/screens/HomeScreen";

const App = () => {

   const [text, setText] = useState(" ")
   const [submittedText, setSubmittedText] = useState("")

   const handleSubmit = () => {
    setSubmittedText(text);
    setText("");
   }
 
  return (
    // <SafeAreaView style={styles.container}>
    //   <Text style={styles.title}>Welcome...!</Text>
    //   <TextInput 
    //     placeholder="Enter your text..."
    //     style={styles.Input}
    //     value={text}
    //     onChangeText={(text) => setText(text)}
    //   />
    //   <Button title='Submit' onPress={handleSubmit}></Button>

    //   {submittedText ? (<Text>Result:{submittedText} </Text>) : null}

      
    // </SafeAreaView>

    <HomeScreen/>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    gap:10
  },

  title:{
    fontSize:20,
    fontWeight:'500'
  },

  Input:{
    width:"100%",
    padding:10,
    borderWidth:1,
    borderRadius:5

  }
})