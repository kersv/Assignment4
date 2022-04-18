import React from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

const Debits = (props) => {
    let displayDebits = () =>{
        const {debits} = props;
        return debits.map((debit) => {
            let date = debit.date.slice(0,10);
            return <li key = {debit.id}> {debit.amount} {debit.description} {date}</li>
        })
    }

    return(
        <div>
            <h1>Debits</h1>
            <Link to="/userProfile">User Profile </Link>
            <Link to="./Login"> Log In </Link>
            <Link to="/"> Home </Link>
            <Link to="./Debits"> Debits</Link>
            
            {displayDebits()}


            <form onSubmit={props.addDebit}>
                <label htmlFor='description'>Description</label>
                <input type='text' name='description'/>
                <label htmlFor='amount'>Amount</label>
                <input type='number' name='amount'/>
                <button type='submit'>Add Debit</button>

            </form>
            <AccountBalance accountBalance={props.accountBalance}/>
    
        </div>
    )
}
export default Debits