import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import { styles } from "./AppStyle";
import { Component, React } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import LineaCard from "./LineaCard";
import BachecaPage from "./BachecaPage";
import MapPage from "./MapPage";
import ProfilePage from "./ProfilePage";
import PersistentStorage from "./PersistentStorage";
import CreatePostPage from "./CreatePost";

class AppStartPage extends Component{
    state = {
        lines : [],
        page: "home",
        did: "",
        sid: "",
        uid:""
    }

    constructor(props){
        //PersistentStorage.clear();
        super(props);
        PersistentStorage.getSid().then((value) =>{
            if(value!= undefined){
                console.log("Prendo il sid dal persistent storage")
                this.state.sid = value;
                console.log(value)
                this.getLines(value);
                this.setState(this.state);
            }else{
                CommunicationController.register()
                .then((result) => {
                    console.log("Prendo il sid da rete e lo salvo nel persistent storage")
                    PersistentStorage.storeSid(result);
                    this.state.sid = result;
                    this.getProfile(result);
                    this.getLines(result);
                    this.setState(this.state);
                })
                .catch((error)=> {
                    console.log("Errore: " + error);
                })   
            }
        })
    }

    getProfile(sid){
        CommunicationController.getProfile(sid)
        .then((result) => {
            this.state.uid = result.uid;
            PersistentStorage.storeUid(result.uid);
            PersistentStorage.storePropic(result.picture);
            PersistentStorage.storeUserName(result.name);
        })
        .catch((error)=> {
            
        })
    }
    
    //invio la richiesta getLines e gestisco la risposta per prendere le linee
    getLines(sid){
        CommunicationController.getLines(sid)
        .then((result) => {
            for(let i =0; i < result.lines.length; i ++){
                this.state.lines.push([result.lines[i].terminus1.sname + " - " + result.lines[i].terminus2.sname, result.lines[i].terminus1.did])
                this.state.lines.push([result.lines[i].terminus2.sname + " - " + result.lines[i].terminus1.sname, result.lines[i].terminus2.did])
            }
           this.setState(this.state)
        })
        .catch((error)=> {
            console.log("Errore: " + error);
        })
    }
        
    //invio la richiesta register e gestisco la risposta per prendere il Sid

    //visualizzazione
    render(){
        switch(this.state.page){
            case "home":
                return(
                    <View style={styles.container}> 
                        <Text>{this.state.lines.map(v => <LineaCard key = {v[0]}nomeLinea = {v[0]} onPress={()=>{this.state.page="bacheca";this.state.did=v[1];this.setState(this.state)}}></LineaCard>)}  </Text>
                        <View style = {styles.smallImageContainer}>
                        </View>
                        <Pressable onPress={() => {
                            this.state.page = 'profile'
                            this.setState(this.state)
                        }}>
                            
                        <View style = {styles.smallImageContainer2}>
                        <Image 
                    style={styles.userImage}
                    source={require('./assets/user.png')}/>
                        </View>
                        </Pressable>
                    </View>
                    )
            case "bacheca":
                return(
                    <View style={styles.container}>
                    <BachecaPage did={this.state.did} sid={this.state.sid} lines={this.state.lines} onPressBack={()=>{this.state.page="home";this.state.did=""; this.setState(this.state)}}onPressPost = {()=> {this.state.page = 'post'; this.setState(this.state)}} onPressMap ={()=>{this.state.page = "map"; this.setState(this.state)}}></BachecaPage>
                    </View>
                )
            case "map":
                return(
                    <View style={styles.container}>
                    <MapPage did={this.state.did} onPressBack={()=>{this.state.page="bacheca"; this.setState(this.state)}}></MapPage>
                    </View>
                )
            case "profile":
                return(
                    <View style = {styles.container}>
                    <ProfilePage sid={this.state.sid} onPressBack={()=> {this.state.page = "home"; this.setState(this.state)}}></ProfilePage>
                    </View>
                )
                case "post":
                    return(
                        <View style = {styles.container}>
                        <CreatePostPage sid={this.state.sid} did={this.state.did} onPressBack={()=> {this.state.page = "bacheca"; this.setState(this.state)}}></CreatePostPage>
                        </View>
                    )
            }
        }
       
    }

export default AppStartPage;