import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../assets/images';


const cx = classNames.bind(styles);

function Header(){
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                    <img src={images.medicare} alt="Medicare"/>
                </div>

                <ul className={cx('list-services')}>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to="/our-service">Our Service</Link>
                    </li>
                    <li>
                        <Link to="/find-doctor">Find Doctor</Link>
                    </li>
                    <li>
                        <Link to="/review">Reviews</Link>
                    </li>
                </ul>

                <div className={cx('phonecall')}>
                    <img src={images.call} alt="phone"/>
                    <div>
                        <p className={cx('phoneNumber')}>+233554205473</p>
                        <p className={cx('timeOnline')}>Mon-Sat 9am - 6pm</p>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header;