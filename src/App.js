
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

import axios from "axios";

class App extends Component{
  constructor(){
    super();
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      },
      credits:[],
      debits:[]
    }
  }
  

  async componentDidMount() {
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")

    credits = credits.data
    debits = debits.data

    let sumDebit = 0;
    let sumCredit = 0;

    credits.forEach((credit) => {
      sumCredit += credit.amount
    })

    debits.forEach((debit) => {
      sumDebit += debit.amount
    })

    let accountBalance = parseFloat((sumCredit - sumDebit).toFixed(2))

    this.setState({credits,debits,accountBalance})
  }


  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }


  addCredit = (e) => {
    e.preventDefault();
    const description = e.target[0].value;
    const amount = Number(e.target[1].value);

    const curr_date = new Date();
    let date = curr_date.getFullYear() + "-" + curr_date.getMonth() + "-" + curr_date.getDate();

    const cred_obj = {'description':description, 'amount':amount, 'date':date};
    this.setState({
      credits:[...this.state.credits, cred_obj]
    })

    const new_Balance = this.state.accountBalance += amount;
    this.setState({
      accountBalance: new_Balance
    })
  }
  
  addDebit = (e) => {

  }
  render(){
    const {debits} = this.state;
    const {credits} = this.state;
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn}/>)
    return(
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
