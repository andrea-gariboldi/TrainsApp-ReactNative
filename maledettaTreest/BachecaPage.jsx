import { StyleSheet, Text, View, Image, Button, Alert, FlatList } from "react-native";
import { styles } from "./AppStyle";
import { Component, React } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import LineaCard from "./LineaCard";
import PostCard from "./PostCard";

class BachecaPage extends Component{
    state = {
        posts: [],
        page: "bacheca",
        did: this.props.did,
        lines: this.props.lines,
        images: [],
        sid: this.props.sid
    }

    constructor(props){
        super(props);
        this.getPosts();
    }

    //cosa fare quando ricevo i post dal server --> li aggiungo nello state
    getPosts(){
        this.state.posts = [];
        CommunicationController.getPosts(this.state.sid,this.state.did)
        .then((result) => {
            //console.log(this.state.sid)
            //console.log(this.state.did)
            //console.log("Posts: " + result.posts)
            result.posts.forEach(post => {
                this.state.posts.push(post)
                this.setState(this.state)
            });
            })
        .catch((error)=>{
            console.log("Errore: "+ error)
        })
    }

    //cosa faccio quando viene schiacciato il pulsante di inverti linea
    switchLine(){
        console.log("Dentro al metodo per cambiare did:" + this.state.did)
        if(this.state.did == 1){
            this.state.did = 2;
            this.setState(this.state)
        }else if(this.state.did == 2){
            this.state.did = 1;
            this.setState(this.state)
        }else if(this.state.did == 3){
            this.state.did = 4;
            this.setState(this.state)
        }else if(this.state.did == 4){
            this.state.did = 3;
            this.setState(this.state)
        }

        this.getPosts();
       // console.log(this.state.posts)
        this.render();
        //console.log(this.state.posts)
    }


    //visualizzazione
    render(){
        return(
        <View style={styles.container}> 
        <View style={styles.containerButton}>
        <View style= {styles.button}>
           <Button
        title="Back"
        onPress={this.props.onPressBack}
      />
      </View>
      <View style= {styles.button}>
       <Button
        title="Switch Line"
        onPress = {()=> {this.switchLine()} }
      />
      </View>
       <View style= {styles.button}>
       <Button
        title="Add Post"
        onPress={this.props.onPressPost}
      />
      </View>
      <View style= {styles.button}>
       <Button
        title="Info"
        onPress={this.props.onPressMap}
      />
      </View>
      </View>
      <Text style={styles.titleLinea}> {this.state.lines[this.state.did-1].slice(0, -1)}</Text>
      <FlatList data={this.state.posts} style={styles.flatlist}
        renderItem = {({item}) => <PostCard reload = {()=>{this.getPosts()}} post = {item} sid = {this.state.sid}></PostCard>}/>
        </View>
        )
    }
    }

export default BachecaPage;