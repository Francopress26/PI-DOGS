import {GET_ALL_DOGS,ORDER_BY_NAME,ORDER_BY_BD,GET_DOG_NAME,GET_TEMPS,CREATE_DOG} from "../actions";

const initialState = {
    allDogs: [],
    allDogs2:[], // Siempre lleno, no lo modifico
    dogDetail: [],
    temperaments:[],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                allDogs2:action.payload
            };
        case ORDER_BY_NAME:
            let dogSorted = action.payload==="Asc" ?
                state.allDogs.sort((a,b)=> {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                :
                state.allDogs.sort((b, a) => {
                     if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
            return{
                ...state,
                allDogs:dogSorted
                

            }
        case ORDER_BY_BD:
            const allDogss=state.allDogs2
            const orderCreated=action.payload==="orderBD" ? allDogss.filter(el=>el.createdAt) : allDogss.filter(el=>!el.createdAt)
            
            return{
                ...state,
                allDogs: action.payload ==="orderALL" ? state.allDogs2 : orderCreated
            }
        case GET_DOG_NAME:
            return{
                ...state,
                allDogs:action.payload
            }
        case CREATE_DOG:
             return{
                ...state
             };
         case GET_TEMPS:
            return{
                ...state,
                temperaments:action.payload
                
            }   
        default:
            return state;
    }
}

export default rootReducer;