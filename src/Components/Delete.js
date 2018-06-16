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
    }


    deleteRequestHandle = (str) => {
        let userName = getCookie('userName');
        this.refs.medicineAmount.value < 0 ? alert('Podaj ilo większą od 0') :
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/delete.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.refs.yourAidKit.value,
                userName: userName,
                medicineId: this.refs.medicineId.value,
                medicineAmount: this.refs.medicineAmount.value,
                act: str
            })
        })
        .then( response => {
            response.data == 'AmountError' ? alert('Podana ilosc jest niewłaściwa') : alert ('Transakcja przebiegła pomyślnie')
            $(window.location).attr('href','')
        }, err => {
            console.log(err)
        })
    }

    render(){
        
        const deleteMed = <div className='deletemedicne-form'>
        <label>Podaj nazwę swojej apteczki:</label>
        <input ref='yourAidKit' type='text' ></input>
        <label>Podaj id leku:</label>
        <input ref='medicineId' type='text' ></input>
        <label>Podaj ilość leku:</label>
        <input ref='medicineAmount' type='text' ></input>
        <button onClick={() => this.deleteRequestHandle('U')} >Utylizuj</button>
        <button onClick={() => this.deleteRequestHandle('P')} >Pobierz</button>
    </div>

        return(
            <div className='delete'>
                {deleteMed}
            </div>
        )
    }

}

export default Delete
