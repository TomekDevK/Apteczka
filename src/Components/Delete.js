// dependencies 
import React, {Component} from 'react'
import axios from 'axios'
import querystring from 'querystring'
import $ from 'jquery'
// shared
import getCookie from '../shared/functions'

class Delete extends Component {
    constructor(){
        super()
        this.state = {
            access: '',
            yourAidKit: 'medicines'
        }
    }

    componentDidMount () {
        let access = this.state.access
        access=getCookie('access')
        access === '226a318e0106d6a6cd1ea8fe016287ce' ? null : $(window.location).attr('href', '')
        this.setState({
            access: access
        })
        this.outOfDateRequestHandle()
    }


    outOfDateRequestHandle = () => {
        let userName = getCookie('userName');
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/delete.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.state.yourAidKit,
                userName: userName
            })
        })
        .then( response => {
            console.log(response)
        }, err => {
            console.log(err)
        })
    }

    render(){
        
        const deleteMed = <div className='deletemedicne-form'>
        <label>Podaj nazwę swojej apteczki:</label>
        <input ref='yourAidKit' type='text' ></input>
        <label>Podaj nazwę leku:</label>
        <input ref='medicineName' type='text' ></input>
        <label>Podaj ilość leku:</label>
        <input ref='medicineAmount' type='text' ></input>
        <button onClick={this.deleteRequestHandle} value='U'>Utylizuj</button>
        <button onClick={this.deleteRequestHandle} value='G'>Pobierz</button>
    </div>

        return(
            <div className='delete'>
                {deleteMed}
            </div>
        )
    }

}

export default Delete
