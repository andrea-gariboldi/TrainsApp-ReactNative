import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import { styles } from "./AppStyle";
import { Component } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import { Icon } from 'react-native-elements';

class LineaCard extends Component{
    state = {
        nomeLinea : this.props.nomeLinea
    }

    constructor(props){
        super(props);
        console.log(this.state.nomeLinea)
    }

    //visualizzazione
    render(){
        return(
        <View> 
            <TouchableOpacity onPress={() => {
                            this.props.onPress()
                        }}>
            <Text style={styles.cardLinea}>{this.state.nomeLinea}</Text>
            <Icon 
                style = {{
                    backgroundColor: '#006633'
                }}
                name = 'arrowright'
                type = 'antdesign'
                color = 'white'
             />
            </TouchableOpacity>
        </View>
        )
    }
}

export default LineaCard;