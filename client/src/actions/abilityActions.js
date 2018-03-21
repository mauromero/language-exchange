import axios from 'axios';


export function fetchAbilities(){
    return function(dispatch){
        axios.get('/api/abilities')
        .then(response => dispatch({type:"FETCH_ABILITIES_FULFILLED",payload:response.data}))
        .catch(err => dispatch({type:"FETCH_ABILITIES_REJECTED", payload: err}));
    }
}   

