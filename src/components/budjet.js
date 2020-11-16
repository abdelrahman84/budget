import React, { useState, useEffect } from 'react';
import TextField from 'material-ui/TextField';
import {useSelector, shallowEqual} from 'react-redux';


const Budget = (props) => {
    const budget = useSelector(state=>state.budget);
    useEffect(() => {
 

    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
           <h4>Budget: <span>{budget.title}</span></h4>
           <h4>Balance: <span>{budget.balance}</span></h4>
            </div>
    )
}

export default Budget;
