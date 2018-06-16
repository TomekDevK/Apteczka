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

    componentDidMount () {
        let access = this.state.access
        access=getCookie('access')
        access === '226a318e0106d6a6cd1ea8fe016287ce' ? null : $(window.location).attr('href', '')
        this.setState({
            access: access
        })
    }


    newMedicineRequestHandle = () => {
        let userName = getCookie('userName');
        console.log(userName)
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/newMedicine.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.refs.yourAidKit.value,
                userName: userName,
                medicineName: this.refs.medicineName.value,
                medicineAmount: this.refs.medicineAmount.value,
                medicinePrice: this.refs.medicinePrice.value,
                medicineDate: this.refs.medicineDate.value
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
        
        const medicineForm = <div className='inputmedicine-form'>
            <label>Podaj nazwę swojej apteczki:</label>
            <input ref='yourAidKit' type='text' ></input>
            <label>Podaj nazwę leku:</label>
            <input ref='medicineName' type='text' ></input>
            <label>Podaj ilość leku:</label>
            <input ref='medicineAmount' type='text' ></input>
            <label>Podaj cene leku:</label>
            <input ref='medicinePrice' type='text' ></input>
            <label>Podaj termin ważności leku:</label>
            <input ref='medicineDate' type='text' ></input>
            <button onClick={this.newMedicineRequestHandle}>Zatwierdź</button>
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
