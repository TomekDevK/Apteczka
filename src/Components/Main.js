// dependencies
import React ,{Component} from 'react'
import {withRouter, Switch, Route} from 'react-router-dom'

// components
import LogIn from './LogIn'
import Register from './Register'
import Home from './Home'
import InputMedicine from './InputMedicine';
import CreateAidKit from './CreateAidKit';
import OutOfDate from './OutOfDate'
import Delete from './Delete'


class Main extends Component {
   render() {
       return(
            <div className='main'>
            {//łączymy komponenty (klasy) z odpowiednimi hiperłączami (linkami w przeglądarce) czyli np zeby 
            //wejsc an rejestracje musisz wejsc na strone apteczki i po sleshu ('/') wpisac 'register'
            }
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login' component={LogIn}/>
                    <Route exact path='/nowylek' component={InputMedicine}/>
                    <Route exact path='/nowaapteczka' component={CreateAidKit}/>
                    <Route exact path='/terminwaznosci' component={OutOfDate} />
                    <Route exact path='/usun' component={Delete} />
                </Switch>
            </div>
       )
   }
}

export default withRouter(Main)