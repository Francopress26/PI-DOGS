import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DETAIL = "GET_DETAIL_DOG";
export const CREATE_DOG = "CREATE_DOG";
export const GET_TEMPS = "GET_TEMPS";
export const ORDER_BY_NAME="ORDER_BY_NAME";
export const ORDER_BY_BD="ORDER_BY_CREATED"
export const GET_DOG_NAME="GET_DOG_NAME"
export function getDogs() {
    return async function(dispatch) {
        try{
            var json = await axios.get('http://localhost:3001/dogs');
        }catch(e){
            return e
        }
       
       return dispatch({
            type:GET_ALL_DOGS,
            payload:json.data
       })
    }
}

export function orderByName(payload){

return{
    type:ORDER_BY_NAME,
    payload
}
}



export function filterCreated(payload){
    return{
        type:ORDER_BY_BD,
        payload
    }
}

export function searchDog(name){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type:GET_DOG_NAME,
                payload:json.data
            })
        }catch(e){
            console.log(e)
        }
    }

}

export function getTemperaments(){
    return async function(dispatch){
        var resp = await axios ("http://localhost:3001/temperaments")
        return dispatch({type:GET_TEMPS,payload:resp.data})
    }
}

export function postDog(payload){
    console.log(payload)
    return async function(){
        var resp = await axios.post("http://localhost:3001/dogs",payload)
        return resp
    
    }
}