import { useState, useReducer } from "react";
import React from 'react';
import axios from 'axios';

const initialState = {
    error:null, 
    greeting:null
}

function greetingReducer(state, action)
{
    switch (action.type){
        case 'Success':
            return {
                error:null,
                greeting:action.greeting
            }
        case 'Error':
            return {
                error:action.error,
                greeting: null
            }
        default:
            {
                return state;
            }

    }
}

const Fetch = ({url}) => {
    const [{error, greeting}, dispatch] =  useReducer(greetingReducer, initialState)

    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchGreeting = async url =>
    {
        axios.get(url).then(response => {
            const {data} = response;
            const {greeting} = data;
            dispatch({type:'Success', greeting});
            setButtonClicked(true);
        }).catch(error => {
            dispatch({type:'Error', error});
        })
    }

    const buttonText = buttonClicked ? 'Ok': 'Load Greeting';

    return (
        <div>
            <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
                { buttonText }
            </button>
            { greeting && <h1>{greeting}</h1>}
            {error && <p role="alert">Oops, failed to fetch!</p>}
        </div>
    )
}

export default Fetch;