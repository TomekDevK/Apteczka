// dependencies
import React ,{Component} from 'react'
import {Link} from 'react-router-dom'



class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='welcome-header'>
                    Witamy na stronie apteczki
                </div>
                <div className='chooselanguage-header'>
                    Wybierz język
                </div>
                <div className='home-header'>
                    <Link to='/'>Strona główna</Link>
                </div>
                <div className='home-addmedicine'>
                    <Link to='/settings'>Dodaj apteczkę do konta</Link>
                </div>
            </div>
        )
    }
}

export default Header