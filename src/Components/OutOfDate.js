// dependencies 
import React, {Component} from 'react'
import axios from 'axios'
import querystring from 'querystring'
import $ from 'jquery'
// shared
import getCookie from '../shared/functions'

class OutofDate extends Component {
    constructor(){
        super()
        this.state = {
            access: '',
            yourAidKit: 'medicines'
        }
    }
    // sprawdzanie dostępu
    componentDidMount () {
        let access = this.state.access
        access=getCookie('access')
        access === '226a318e0106d6a6cd1ea8fe016287ce' ? null : $(window.location).attr('href', '')
        this.setState({
            access: access
        })
        this.outOfDateRequestHandle()
    }

    //Zbieranie informacji o przeterminowanych lekach i wyświetlanie ich w tablicy
    outOfDateRequestHandle = () => {
        let userName = getCookie('userName');
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/outOfDate.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.state.yourAidKit,
                userName: userName
            })
        })
        .then( response => {
            let res=response.data.split(';')
            let content = '<tr><td>Nazwa leku : Ilość : Data Ważności : Data dodania leku : Id leku : Użytkownik</td></tr>'
            console.log(res.length)
            for(let i=0;i<res.length;i++) {
                content+= '<tr><td>'+res[i]+'</td></tr>'
            }
            $('#medicines-output').append(content)
        }, err => {
            console.log(err)
        })
    }

    render(){
        
        const outofDateOutput= <div className='out-of-date-output'>
            <table id='medicines-output'></table>
        </div>


        return(
            <div className='inputmedicine'>
                {outofDateOutput}
            </div>
        )
    }

}

export default OutofDate
