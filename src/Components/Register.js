// dependencies
import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import $ from 'jquery'

class Register extends Component {

    registerRequestHandle = () => {
        let userEmail = this.refs.email.value
        let userName = this.refs.login.value
        let userPass = this.refs.pass.value 
        let userAdmin = this.refs.admin.checked
        
        let correct = userPass === this.refs.passrepeat.value ? 1 : 0 

        console.log(userEmail,userName,userPass,userAdmin,this.refs.passrepeat.value,correct)
        if(correct) {
            $(this.refs.pass).css('border-color','none')
            $(this.refs.passrepeat).css('border-color','none')
            $('.registration-form').remove('div')
            axios({
                url: 'https://tomekdev.000webhostapp.com/api/register.php',
                method: 'POST',
                data: querystring.stringify({
                    userName: userName, 
                    userPass: userPass, 
                    userEmail: userEmail, 
                    userAdmin: userAdmin
                })
            })
            .then( response => {
                console.log(response)
            }, err => {
                console.log(err)
            })
        }else {
            $(this.refs.pass).css('border-color','red')
            $(this.refs.passrepeat).css('border-color','red')
            $('<div>Hasla nie zgadzają się!</div>').insertAfter('#passrepeat')
        }
        
    }


    render() {
        const registrationFrom = 
            <div className='registration-form'>
                <form>
                    <label>Podaj adres e-mail:
                        <input ref='email' type='text' ></input>
                    </label>
                    <label>Podaj Login:
                        <input ref='login' type='text' ></input>
                    </label>
                    <label> Wprowadź hasło:
                        <input ref='pass' type='password' ></input>
                    </label>
                    <label> Powtórz hasło:
                        <input id='passrepeat' ref='passrepeat' type='password' ></input>
                    </label>
                    <label> Jestem Farmaceutą
                        <input ref='admin' type='checkbox' ></input>
                    </label>
                    <button onClick={this.registerRequestHandle}>Submit</button>
                </form>
            </div>


    return (
        <div className="register">
            <div className='registration'>
                {registrationFrom}
            </div>
        </div>
    );
  }
}

export default Register