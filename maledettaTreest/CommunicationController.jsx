export default class CommunicationController{
    //richiesta generica che useremo negli altri metodi
    static async genericRequest(endpoint, parameters) {
        let BASE_URL = 'https://ewserver.di.unimi.it/mobicomp/treest/';
        //console.log("Sending request: " + endpoint);
        const url = BASE_URL + endpoint + '.php';
        let requestResult = await fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parameters),
        });
        let status =  requestResult.status;
        if(status == 200) {
           // console.log("status 200")
            let unmarshalledObject = await requestResult.json();
            return unmarshalledObject;
        }else {
            console.log("status Error")
            let error = new Error(
                "Error message from the server. HTTP Status:" + status
            );
            throw error;
        }
    }

    //richiesta register (ritorna il sid)
    static async register() {
        const endpoint = "register";
        const parameters = {};
        let requestResult = await this.genericRequest(endpoint, parameters)
        return requestResult.sid;
    }

    //questo metodo avrà un parametro sid 
    static async getLines(sid){
        const endpoint = "getLines";
        const parameters = {"sid": sid};
        let requestResult = await this.genericRequest(endpoint, parameters)
        return requestResult
    }

     //questo metodo avrà un parametro sid 
    static async getProfile(sid){
        const endpoint = "getProfile";
        const parameters = {"sid": sid};
        let requestResult = await this.genericRequest(endpoint, parameters)
        return requestResult
    }

    static async setProfileName(sid, name){
        console.log("ciao")
        const endpoint = "setProfile";
        const parameters = {"sid": sid, "name":name};
        let requestResult = await this.genericRequest(endpoint, parameters)
        return requestResult
    }

    static async setProfilePicture(sid, picture){
    
        const endpoint = "setProfile";
        const parameters = {"sid": sid,"picture": picture};
        let requestResult = await this.genericRequest(endpoint, parameters)
        return requestResult
    }

    static async getStations(sid, did){
        const endpoint = "getStations";
        const parameters = {"sid": sid, "did": did}
        let requestResult = await this.genericRequest(endpoint, parameters)
        return requestResult
    }

    //questo metodo avrà due parametri sid e did
    static async getPosts(sid, did){
        const endpoint = "getPosts";
        const parameters = {"sid": sid, "did":did};
        let requestResult = await this.genericRequest(endpoint, parameters);
        return requestResult;
    }

    static async addPost(sid, did, delay, status, comment){
        const endpoint = "addPost";
        //bisogna controllare i valori di delay, status e commento per decidere se metterli come parametri della richiesta
        const parameters = {"sid": sid, "did": did, "delay": delay, "status": status, "comment": comment};
        let requestResult = await this.genericRequest(endpoint, parameters);
        return requestResult
    }

    static async getUserPicture(sid, uid){
        const endpoint  = "getUserPicture";
        const parameters = {"sid": sid, "uid": uid};
        let requestResult = await this.genericRequest(endpoint, parameters);
        return requestResult
    }

    static async follow(sid, uid){
        const endpoint = "follow";
        const parameters = {"sid": sid, "uid": uid};
        let requestResult = await this.genericRequest(endpoint, parameters);
        return requestResult
    }
    
    static async unfollow(sid, uid){
        const endpoint = "unfollow";
        const parameters = {"sid": sid, "uid": uid};
        let requestResult = await this.genericRequest(endpoint, parameters);
        return requestResult
    }
}