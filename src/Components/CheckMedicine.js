// dependencies 
import React, {Component} from 'react'
import axios from 'axios'
import querystring from 'querystring'
import $ from 'jquery'
// shared
import getCookie from '../shared/functions'

class CheckMedicine extends Component {
    constructor(){
        super()
        this.state = {
            access: '',
            page: 0,
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

    //Szukanie leku z parametrami
    showMedicineRequestHandle = () => {
        let userName = getCookie('userName');
        this.setState({
            page: 1
        })
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/showMedicines.php',
            method: 'post',
            data: querystring.stringify({
                yourAidKit: this.refs.yourAidKit.value,
                userName: userName,
                medicineName: this.refs.medicineName.value,
                medicineid: this.refs.medicineid.value,
                medicineUser: this.refs.medicineUser.value
            })
        })
        .then( response => {
            let res=response.data.split(';')
            let content = '<tr><td>Nazwa leku : Ilość : Data Ważności : Data dodania leku : Id leku : Użytkownik</td></tr>'
            console.log(res.length)
            for(let i=0;i<res.length;i++) {
                content+= '<tr><td>'+res[i]+'</td></tr>'
            }
            $('#medicines-check').append(content)
        }, err => {
            console.log(err)
        })
    }

    showTakenRequestHandle = () => {
        this.setState({
            page: 3
        })
        axios({
            url: 'https://tomekdev.000webhostapp.com/api/showTaken.php',
            method: 'post',
            data: querystring.stringify({
                medicineName: this.refs.medicineName.value,
                medicineid: this.refs.medicineid.value,
                medicineUser: this.refs.medicineUser.value,
                medicineFrom: this.refs.medicineFrom.value,
                medicineTo: this.refs.medicineTo.value

            })
        })
        .then( response => {
            let res=response.data.split(';')
            let content = '<tr><td>Id rekordu : Id Leku : Nazwa leku : Ilość : Cena : Akcja : Użytkownik : Data Akcji</td></tr>'
            console.log(res.length)
            for(let i=0;i<res.length;i++) {
                content+= '<tr><td>'+res[i]+'</td></tr>'
            }
            $('#medicines-taken').append(content)
        }, err => {
            console.log(err)
        })
    }

    backHandler = (nr) => {
        let page=-1
        if(nr===1){
            page=0
        }
        if(nr===3){
            page=2
        }
        this.setState({
            page: page
        })
    }
    nextHandler = () => {
        this.setState({
            page: 2
        })
    }

    render(){
        let {page} = this.state
        //Formularz przypisany do zmiennej którą wywołuje w 68 linijce
        const showMedicines = page === 0 ? <div className='inputmedicine-form'>
            <label>Podaj nazwę swojej apteczki:</label>
            <input ref='yourAidKit' type='text' ></input>
            <label>Podaj nazwę leku (niewymagane):</label>
            <input ref='medicineName' type='text' ></input>
            <label>Podaj id leku (niewymagane):</label>
            <input ref='medicineid' type='text' ></input>
            <label>Podaj użytkownika</label>
            <input ref='medicineUser' type='text' ></input>
            <button onClick={this.showMedicineRequestHandle}>Zatwierdź</button>
            <button onClick={this.nextHandler}>Sprawdź rozchody</button>
        </div>
        :null

        const outputMedicines = page === 1?<div className='check-output'>
        <table id='medicines-check'></table>
        <button onClick={()=>this.backHandler(1)}>Wstecz</button>
        </div>
        :null

        const checktakenList = page === 2 ? <div className='checktakenlist-form'>
            <label>Podaj nazwę leku (niewymagane):</label>
            <input ref='medicineName' type='text' ></input>
            <label>Podaj id leku (niewymagane):</label>
            <input ref='medicineid' type='text' ></input>
            <label>Podaj użytkownika</label>
            <input ref='medicineUser' type='text' ></input>
            <label>Podaj przedział czasowy od do (YYYY-MM-DD)</label>
            <input ref='medicineFrom' type='text' ></input>
            <input ref='medicineTo' type='text' ></input>
            <button onClick={this.showTakenRequestHandle}>Zatwierdź</button>
        </div>
        :null

        const takenList = page === 3? <div className='takenlist-output'>
        <table id='medicines-taken'></table>
        <button onClick={()=>this.backHandler(3)}>Wstecz</button>
        </div>
        :null

        return(
            <div className='inputmedicine'>
                <div>
                    {showMedicines}
                    {outputMedicines}
                    {checktakenList}
                    {takenList}
                </div>
            </div>
        )
    }

}

export default CheckMedicine
