import { StyleSheet, Text, View, Image, Button, Alert, FlatList, TextInput } from "react-native";
import { styles } from "./AppStyle";
import { Component, React } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import LineaCard from "./LineaCard";
import PostCard from "./PostCard";
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown';

const delay = [ "In time", "Slight delay", "Delay over 15 min", "Canceled train"];
const status = ["Ideal situation", "Acceptable", "Serious problems"];

const alertPost = () =>
    Alert.alert(
      "Error",
      "Please fill at least one field"
    );

class CreatePostPage extends Component{
    state = {
        sid: this.props.sid,
        did: this.props.did,
        delay: undefined,
        comment: '',
        status: undefined
    }

    constructor(props){
        super(props);
    }

    createPost(){
        console.log("delay: "+ this.state.delay)
        console.log("status: "+ this.state.status)
        console.log("comment: "+ this.state.comment)
        
        if(this.state.delay == undefined && this.state.status ==undefined && this.state.comment == ''){
            console.log('post non valido')
            alertPost()
        }else{
            CommunicationController.addPost(this.state.sid, this.state.did, this.state.delay, this.state.status, this.state.comment)
            .then((result) => {
                console.log("post pubblicato sul server")
                this.props.onPressBack()
            })
            .catch((error)=> {
                console.log("Errore: " + error);
            })
        }
    }

    onChangeText(text){
        this.state.comment = text
    }
    
    //visualizzazione
    render(){
        return(
            <View style= {styles.container}>
                <View style= {styles.button}>
           <Button
        title="Back"
        onPress={this.props.onPressBack}
      />
        </View>
            <Text style={styles.title}>Create post</Text>
            <View style={styles.box}>
            <Text style="marginTop: 5px">Select delay</Text>
            <SelectDropdown
	            data={delay}
	            onSelect={(selectedItem, index) => {
                this.state.delay = index;
                this.setState(this.state)
	            }}
	        buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                />
                </View>
                <View style={styles.box}>
                <Text>Select status</Text>
                <SelectDropdown
	            data={status}
	            onSelect={(selectedItem, index) => {
                    this.state.status = index;
                     this.setState(this.state)
	            }}
	        buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                />
                </View>
                <View style={styles.box}>
            <Text>Write a comment</Text>
            <TextInput
                    style={styles.inputText}
                    multiline
                    numberOfLines={4}
                    onChangeText={text => this.onChangeText(text)}
                />
                </View>
                <Button
        title="Create Post"
        onPress={()=> {this.createPost()}}
      />
            </View>
            
        )
    }
    }

export default CreatePostPage;