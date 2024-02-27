import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from './CommunicationController';

export default class PersistentStorage {
    static async storeSid(sid){
        try{
            await AsyncStorage.setItem("@storage_Sid", sid)
        }catch(e){
            console.log(e)
        }
    }

    static async getSid(){
        try {
            const value = await AsyncStorage.getItem('@storage_Sid')
            if (value != null) {
                return value;
            } else {
                return undefined;
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async getUserName(){
        try {
            const value = await AsyncStorage.getItem('@storage_usernameLogged')
            if (value != null) {
                return value;
            } else {
                return undefined;
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async storeUserName(sid){
        try{
            await AsyncStorage.setItem("@storage_usernameLogged", sid)
        }catch(e){
            console.log(e)
        }
    }

    static async storePropic(picture){
        try{
            await AsyncStorage.setItem("@storage_propicUser", picture)
        }catch(e){
            console.log("Errore di inserimento" + e)
        }
    }

    static async getPropic(){
        try {
            const value = await AsyncStorage.getItem('@storage_propicUser')
            if (value != null) {
                return value;
            } else {
                return undefined;
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async storeUid(uid){
        try{
            await AsyncStorage.setItem("@storage_Uid", uid)
        }catch(e){
            console.log(e)
        }
    }

    static async clear(){
        AsyncStorage.clear();
    }


    static async getImageProfilePost(uid, sid, pversion){
        try{
            const value = await AsyncStorage.getItem('@'+uid)
            let toReturn = null;
            
            if(value != null){
                console.log("Ho già l'utente nel DB")
                //abbiamo già lo uid nello storage
                dati = JSON.parse(value)
                if(dati.pversion == pversion){
                    console.log("immagine di "+ dati.uid + "nel DB: corrispondono le versioni")
                    console.log(dati.picture.substring(0, 5));
                    //confronto le versioni (quella nello storage e il parametro)
                    //in questo caso sono uguali
                    toReturn = dati.picture
                }else{
                    console.log("immagine di "+ dati.uid + "nel DB è vecchia")
                    //in questo caso sono diverse (quindi l'immagine nello storage è vecchia )
                    const result = await CommunicationController.getUserPicture(sid,uid)
                    if(this.isBase64(result.picture)){
                        console.log("salvo nel DB l'immagine di "+ result.uid)
                        //se l'immagine è valida
                        await AsyncStorage.setItem(('@'+uid), JSON.stringify(result))
                        //la salvo nell'async storage
                        toReturn = result.picture
                    }else{
                        console.log("immagine sul server non é base64")
                    }
                }
            }else{
                console.log("Non ho l'utente nel DB")
                const result = await CommunicationController.getUserPicture(sid,uid);
                
                if(PersistentStorage.isBase64(result.picture)){
                    console.log("Salvo l'utente nel DB con foto: ")
                    console.log(result.picture.substring(0, 10));
                    await AsyncStorage.setItem(('@'+uid), JSON.stringify(result))
                    toReturn = result.picture
                } else {
                    console.log("immagine sul server non é base64")
                }
            }
            if(toReturn != null){
                if(toReturn.substring(0,22) == "data:image\/png;base64,"){
                    console.log("Ritorno l'immagine NON nulla")
                    return toReturn
                } else {
                    return "data:image\/png;base64," + toReturn
                }
            } else {
                console.log("Ritorno l'immagine nulla")
                return toReturn
            }
        }catch(e){
            console.log(e)
        }
    }

 static isBase64(str) {
        var base64regex = /[A-Za-z0-9+/=]/;
        if (base64regex.test(str)) {
            return true;
        } else {
            return false;
        }
    }

}