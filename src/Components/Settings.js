// dependencies 
import React, {Component} from 'react'
import axios from 'axios'
import querystring from 'querystring'
import $ from 'jquery'
// shared
import getCookie from '../shared/functions'

class InputMedicine extends Component {
    constructor(){
        super()
        this.state = {
            access: ''
        }
    }
    //Sprawdzanie czy uzytkownik posiada cookie 'access' - jeśli nie to przekierowywuje do strony głównej
    componentDidMount () {
        let access = this.state.access
        access = getCookie('access')
        access === '226a318e0106d6a6cd1ea8fe016287ce' ? null : $(window.location).attr('href', '')
        this.setState({
            access: access
        })
    }

    //Dodawanie nowego leku za pomocą php
    addKitRequestHandle = () => {
        let userName = getCookie('userName');
        console.log(userName)
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/relateUserMedicine.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.refs.yourAidKit.value,
                userName: userName,
            })
        })
        .then( response => {
            console.log(response)
            $(window.location).attr('href', '')
        }, err => {
            console.log(err)
        })
    }
    render(){
        //Formularz przypisany do zmiennej którą wywołuje w 68 linijce
        const medicineForm = <div className='inputmedicine-form'>
            <label>Podaj nazwę apteczki z bazy jaką chcesz dodac do swojego konta</label>
            <input ref='yourAidKit' type='text' ></input>
            <button onClick={this.addKitRequestHandle}>Zatwierdź</button>
        </div>

        return(
            <div className='inputmedicine'>
                <div>
                    {medicineForm}
                </div>
            </div>
        )
    }

}

export default InputMedicine
