// dependencies
import React, {Component} from 'react'
import axios from 'axios'
import querystring from 'querystring'
import $ from 'jquery'
// shared
import getCookie from '../shared/functions'

class CreateAidKit extends Component {
    constructor(){
        super()
        this.state = {
            access: '',
            kitResponse: '0'
        }
    }
    // Tworzenie nowej apteczki
    newAidKitRequestHandle = () => {
        let userName = getCookie('userName');
        console.log(userName)
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/newAidKit.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.refs.yourAidKit.value,
                userName: userName
            })
        })
        .then( response => {
            this.setState({
                kitResponse:response.data
            })
        }, err => {
            console.log(err)
        })
    }

    componentWillMount () {
        let access = this.state.access
        access=getCookie('access')
        this.setState({
            access: access
        })
    }

    render () {
        let {access,kitResponse} = this.state

        const adminValidation = access === '226a318e0106d6a6cd1ea8fe016287ce' ? null : $(window.location).attr('href','')

        const createAidKit = <div className='inputmedicine-form'>
            <label>Podaj nazwę swojej apteczki:</label>
            <input ref='yourAidKit' type='text' ></input>
            <label>Podaj swój login:</label>
            <input ref='login' type='text' ></input>
            <span className='warning'>Apteczki mogą tworzyć tylko admininstratorzy</span>
            <button onClick={this.newAidKitRequestHandle}>Zatwierdź</button>
        </div>

        const aidKitResponse = kitResponse === '0' ? null : <div className='aid-kit-response'></div>

        return (
            <div className='createaidkit'>
                {adminValidation}
                {createAidKit}
                {aidKitResponse}
            </div>
        )
    }
}

export default CreateAidKit