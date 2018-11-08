import { combineReducers} from "redux";
import { change_path } from './actionType'
const defaultState = {
    'navKey': "/home",
    
}
const layout = (state = defaultState, action)=>{
    if (action.type == change_path) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.navKey = action.value
        return newState
        console.log(newState.navKey)
        console.log(action.value)
    }
    return state
}
// 合并store 
export default combineReducers({
    'layout': layout
})

// export default (state = defaultState, action) => {
//     // switch (action.type) {
//     //     case 'CHANGE_PATH':
//     //         console.log("ADD_TODO")
//     //     default:
//     //         return state
//     // }
//     if (action.type == "CHANGE_PATH"){
//         const newState=JSON.parse(JSON.stringify(state));
//         console.log(newState)
//     }
//     return state
// }


