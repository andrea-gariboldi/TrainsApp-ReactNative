import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      marginTop: 30,
      backgroundColor: "white",
    },

    cardLinea:{
      fontSize: 25,
      width: 390,
      padding: 10,
      borderWidth: 5,
      marginTop: 10,
      backgroundColor: 'rgba(229,231,235, 1)'
    },

    postCard:{
      borderWidth: 5,
      borderRadius: 20,
      padding: 20,
      backgroundColor: "#fffff0"
    },

    smallImage:{
      width: 150,
      height: 150,
      opacity: 0.2
    },

    smallImageContainer:{
      marginTop: 50,
      alignItems: 'center',
      justifyContent:'center'
    },

    button: {
      width: 80,
      borderRadius: 25,
      marginBottom: 10,
      alignItems: 'center'      
    },

    containerButton:{
      flexDirection: "row",
      justifyContent: "space-evenly"
    },

    proPic: {
      width: 100,
      height: 100,
      borderRadius: 50
    },

    titleLinea:{
      fontWeight: "bold",
      fontSize: 30
    },

    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height- 200
    },

    containerMap:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    textPost:{
      fontSize: 20
    },

    userImage:{
      width: 50,
      height: 50,
      marginTop: 100
    },

    inputText:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    },

    userLoggedPicture:{
      width: 300,
      height: 300,
    },

    smallImageContainer2:{
      marginTop: 170,
      alignItems: 'center',
      justifyContent:'center'
    },

    title:{
      fontSize: 40,
      textAlign: 'center'
    },

    box:{
      margin: 10,
      borderWidth: 3,
      padding: 10,
      borderRadius: 20
    },

    bottomBar:{
      width: '100%',
      height: 60,
      backgroundColor: '#A9A9A9',
      position: 'absolute',
      bottom: 0
    },

    flatlist:{
      backgroundColor: "#8fbc8f",
      borderRadius: 20,
    }

  });
  
  export {styles}