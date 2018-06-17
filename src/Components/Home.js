// dependencies
import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
// shared
import getCookie from '../shared/functions'
//styles

class Header extends Component {
    constructor(){
        super()
        this.state = {
            access: '',
            lFollowX: 0,
            lFollowY: 0,
            x: 0,
            y: 0,
            friction: 1 /10
        }
    }

    componentDidMount(){
        let that = this
        $(window).on('mousemove click', function(e) {

            var lMouseX = Math.max(-300, Math.min(300, $(window).width() / 2 - e.clientX));
            var lMouseY = Math.max(-300, Math.min(300, $(window).height() / 2 - e.clientY));
            var lFollowX = (lMouseX) ; // 100 : 12 = lMouxeX : lFollow
            var lFollowY = (lMouseY) ;

            that.setState({
                lFollowX: lFollowX,
                lFollowY: lFollowY
            })
    
        });
    }
    
    componentWillUnmount(){
        $(window).off('mousemove click')

    }

    moveBackground = () => {
    let {x,y,lFollowX,lFollowY,friction} = this.state

    x += (lFollowX - x) * friction
    y += (lFollowY - y) * friction
    
    var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

    $('.bg').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });

    window.requestAnimationFrame(this.moveBackground);
    }


    componentWillMount () {
        let access = this.state.access
        access=getCookie('access')
        this.setState({
            access: access
        })
    }

    logoutHandler = () => {
        document.cookie ='access=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.setState({
            access: ''
        })
    }


    render() {
        let access = this.state.access
        const newMedicineFeature = <div className='new-medicine-features'><Link to='/nowylek'>Nowy Lek</Link></div>
        const newAidKitFeature = <div className='new-aid-kit-features'><Link to='/nowaapteczka'>Nowa Apteczka</Link></div>
        const outofdate = <div className='new-out-of-date'><Link to='/terminwaznosci'>Leki do utylizacji</Link></div>
        const deletemed = <div className='delete-med'><Link to='/usun'>Utylizuj/Pobierz lek</Link></div>
        const logoutFeature = <div className='logout'><a href='/' onClick={this.logoutHandler}>Wyloguj</a></div>
        const viewMedicines = <div className='view-medicines'><Link to='leki'>Spis Leków</Link></div>

        const loggedFeature = access === '226a318e0106d6a6cd1ea8fe016287ce' ? <div className='loggedFeatures'>
        {logoutFeature}
        {newMedicineFeature}
        {newAidKitFeature}
        {outofdate}
        {deletemed}
        {viewMedicines}
        </div>
        :null
        const loginFeature = access !== '226a318e0106d6a6cd1ea8fe016287ce' ?  
        <div className='home-buttons'>
            <div className='registration'>
                <Link to='/register'>Rejstracja</Link>
            </div>
            <div className='login'>
                <Link to='/login'>Logowanie</Link>
            </div>
        </div>
        :null

        this.moveBackground()
        
        return (
            <div className='home'>
                <div className='wrap'>
                    <div className='bg' />
                    {loginFeature}
                    {loggedFeature}
                </div>
            </div>
        )
    }
}

export default Header