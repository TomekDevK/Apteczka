import React, {Component} from 'reac'
import axios from 'axios'
import querystring from 'querystring'

class NotValidMedicines extends Component {
    constructor(){
    }

    componentWillMount () {
        let access = this.state.access
        access=getCookie('access')
        this.setState({
            access: access
        })
    }

    render () {
        let access = this.state.access
        const adminValidation = access === '226a318e0106d6a6cd1ea8fe016287ce' ? <div className='not-valid-medicines'>{MedicineList}</div> : $(window.location).attr('href','http://localhost:3000/#/')

        const MedicineList = <div className='mysql-not-valid-list'></div>

        return (
            <div className='not-valid-medicine-main'>
            {adminValidation}
            </div>
        )
    }
}

export default CreateAidKit