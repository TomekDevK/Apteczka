// dependencies
import React ,{Component} from 'react'
import axios from 'axios'
import querystring from 'querystring'
import $ from 'jquery'


class LogIn extends Component {
    
    loginRequestHandle = () => {

        axios({
            url: 'https://tomekdev.000webhostapp.com/api/login.php',
            method: 'post',
            data: querystring.stringify({
                userName: this.refs.login.value,
                userPass: this.refs.pass.value
            })
        })
        .then( response => {
            if(response.data !== 'Niepoprawne hasło' && response.data !== 'Nie znaleziono rekordu') {
            let res = response.data.split(";")
            document.cookie='userName='+res[0]
            document.cookie=res[1]
            console.log('No error')
            $(window.location).attr('href','')
            }else{
                console.log('Error')
            }

        })
        .catch(err=>{
            console.log(err)
        })
    }


    render() {
        return (
            <div className='main-login'>
                <div className='login'>
                    <label>Podaj Login:</label>
                    <input ref='login' type='text' ></input>
                    <label> Wprowadź hasło</label>
                    <input ref='pass' type='password' ></input>
                    <button onClick={this.loginRequestHandle}>Submit</button>
                </div>
            </div>
        )
    }
   
}

export default LogIn