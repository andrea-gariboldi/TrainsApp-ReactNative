import { StyleSheet, Text, View, Pressable, Button, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "./AppStyle";
import { Component } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import PersistentStorage from "./PersistentStorage";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';


const alertName = () =>
    Alert.alert(
      "Error",
      "Username must be less then 20 characters"
    );

class ProfilePage extends Component {   
  state = {
    sid : this.props.sid,
    nomeUtente: "",
    picture: undefined
  };

  constructor(props) {
    super(props);
    PersistentStorage.getUserName().then((value) => {
      if (value != undefined) {
        this.state.nomeUtente = value;
        this.setState(this.state);
      } else {
        this.state.nomeUtente = "undefined";
        this.setState(this.state);
      }
    });

    PersistentStorage.getPropic().then((value) => {
        if (value !== undefined) {
          this.state.picture = value;
          this.setState(this.state);
        } 
      });
  }

  changeName(text) {
    if(text.length <= 20){
      console.log(text);
    this.state.nomeUtente = text;
    PersistentStorage.storeUserName(text);
    this.setState(this.state);
    CommunicationController.setProfileName(this.state.sid, text)
    .then((result) => {
        console.log("provo a cambiare nome sul server")
    })
    .catch((error)=> {
        console.log("Errore: " + error);
    })   
    }else{
      alertName()
    }
    
  }

  changeImage = async () => {
    console.log("cambio immagine");

    try {
      const res = await DocumentPicker.getDocumentAsync();

      console.log("res : " + res.uri);

      FileSystem.readAsStringAsync(res.uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then((data) => {
          console.log("open :" + data);
          // 'data:image/png;base64,'+
          var base64Icon = data;
          PersistentStorage.storePropic(base64Icon);
          this.state.picture = base64Icon;
          this.setState(this.state);
          CommunicationController.setProfilePicture(this.state.sid, base64Icon)
          .then((result) => {
            console.log("provo a cambiare picture sul server")
        })
        .catch((error)=> {
            console.log("Errore: " + error);
        })   
        })
        .catch((err) => {
          console.log("​getFile -> err", err);
          reject(err);
        });
    } catch (err) {
      /*console.log(err)
                    
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;*/
    }
  };

  //visualizzazione
  render() {
    return (
      <View>
        <Button title="Back" onPress={this.props.onPressBack} />
        <Text style = {styles.title}>Profile Page</Text>
       
        <View style={styles.smallImageContainer}>
          <TouchableOpacity onPress={() => this.changeImage()}>
          {(this.state.picture == undefined || this.state.picture == null) && (<Image source={require('./assets/user.png')}  style={styles.userLoggedPicture} />)}
          {(this.state.picture != undefined && this.state.picture != null) && (<Image  style={styles.userLoggedPicture} source={{ uri: 'data:image/png;base64,' + this.state.picture }} />)}
          </TouchableOpacity>
        </View>
        <TextInput
          onSubmitEditing={(value) => this.changeName(value.nativeEvent.text)}
          style={styles.inputText}
        >
          {this.state.nomeUtente}
        </TextInput>
      </View>
    );
  }
}

export default ProfilePage;