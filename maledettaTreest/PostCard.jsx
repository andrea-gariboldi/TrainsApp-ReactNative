import { StyleSheet, Text, View, Image, Button } from "react-native";
import { styles } from "./AppStyle";
import { Component } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import PersistentStorage from "./PersistentStorage";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

class PostCard extends Component{
    state = {
        sid: this.props.sid,
        uid: this.props.post.author,
        post : this.props.post,
        pversion: this.props.post.pversion,
        image: undefined,
        follow: this.props.post.followingAuthor
    }
    constructor(props){
        super(props);
        PersistentStorage.getImageProfilePost(this.state.uid, this.state.sid, this.state.pversion )
        .then((value)=>{
            if (value!= null){
                this.state.image = value;
                this.setState(this.state);
            }else{

            }
        })
    }
    

    follow(){
        CommunicationController.follow(this.state.sid, this.state.uid)
        .then((result) => {
            this.state.follow = true;
            this.setState(this.state)
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Congrats! this is toast notification success',
              })
            console.log("segui")
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    unfollow(){
        CommunicationController.unfollow(this.state.sid, this.state.uid)
        .then((result) => {
            this.state.follow= false;
            this.setState(this.state)
            console.log("smesso di seguire")
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    renderDelay(delay){
        if(delay == 0){
            return "In time"
        }else if (delay == 1){
            return "Slight delay"
        }else if (delay == 2){
            return "Delay over 15 min"
        }else if (delay == 3){
            return "Canceled train"
        }
    }

    renderStatus(status){
        if(status == 0){
            return "Ideal situation"
        }else if (status == 1){
            return "Acceptable"
        }else if (status == 2){
            return "Serious problems"
        }
    }


    //visualizzazione
    render(){
        return(
        <View> 
        <View style={styles.postCard}>
        {(this.state.image != undefined && this.state.image != null && this.state.follow == true) && (<Image source={{uri: this.state.image}} style={{width: 100,height: 100, borderWidth: 4, borderColor: '#7F00FF', borderRadius: 50}}/>)}
        {(this.state.image != undefined && this.state.image != null && this.state.follow == false) && (<Image source={{uri: this.state.image}} style={styles.proPic} />)}
        {(this.state.image == undefined || this.state.image == null) && (<Image source={require('./assets/user.png')} style={styles.proPic} />)}
        <Text style={styles.textPost}> {this.state.post.datetime.substring(0, 16)}</Text>
        {(this.state.follow == true) && (<Button title="Unfollow" onPress={()=>{this.unfollow(), this.props.reload()}} style={styles.follow}/>)}
        {(this.state.follow != true) && (<Button title="Follow" onPress={()=>{this.follow(), this.props.reload()}} style={styles.follow}/>)}
            <Text style={styles.textPost}>Author: {this.state.post.authorName}</Text>
            <Text style={styles.textPost}>Delay: {this.renderDelay(this.state.post.delay)}</Text>
            <Text style={styles.textPost}>Status: {this.renderStatus(this.state.post.status)}</Text>
            <Text style={styles.textPost}>Comment: {this.state.post.comment}</Text>
        </View>
        <Text>{"\n"}</Text>
        </View>
        )
    }
}

export default PostCard;