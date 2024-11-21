import classNames from 'classnames/bind';
import styles from './FindDoctor.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function FindDoctor(){
    return(
        <div className={cx('content')}>
            <h2 className={cx('desc')}>Search for Doctor , Make an Appointment</h2>
            <div className={cx('border')}></div>
            <div className={cx('page')}>
                <div className={cx('sidebar')}>
                    <div className={cx('search', 'element')}>
                        <label className={cx('field-text')}>Search</label>
                        <div className={cx('decor-input')}>
                            <input className={cx('input')} type="text" placeholder="Search doctor" />
                            <button className={cx('search-btn')}>
                                Search
                            </button>
                        </div>
                    </div>

                    <form className={cx('filter', 'element')} id="filter-form">
                        <div className={cx('gender-options')}>
                            <label className={cx('field-text')}>Gender of doctor</label>
                            <div className={cx('decor-gender')}>
                                <label>
                                    <input type="radio" name="gender" value="male" />
                                    Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" />
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className={cx('speciality-options')}>
                            <label htmlFor="speciality" className={cx('field-text')}>Speciality</label>
                            <select id="speciality" className={cx('select-options')} name="speciality">
                                <option value="" >All</option>
                                <option value="cardiologist">Cardiologist</option>
                                <option value="dentist">Dentist</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="psychiatrist">Psychiatrist</option>
                            </select>
                        </div>

                        <div className={cx('experience-options')}>
                            <label htmlFor="experience" className={cx('field-text')}>Experience</label>
                            <select id="experience" className={cx('select-options')} name="experience">
                                <option value="" >All</option>
                                <option value="1">1 year</option>
                                <option value="2">2 years</option>
                                <option value="3">3 years</option>
                                <option value="4">4 years</option>
                                <option value="5">5 years</option>
                                <option value="6+">6+ years</option>
                            </select>
                        </div>

                        <button type="submit" className={cx('submit-btn')}>Show Doctors</button>
                    </form>
    
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('list-doctors')}>
                        <div className={cx('doctor')}>
                            <img src={images.doctorDefault} alt="doctor"/>
                            <h3>Dr. John Doe</h3>
                            <p className={cx('speciality')}>Cardiologist</p>
                            <p className={cx('review')}>120 reviews</p>
                        </div>
                        <div className={cx('doctor')}>
                            <img src={images.doctorDefault} alt="doctor"/>
                            <h3>Dr. John Doe</h3>
                            <p className={cx('speciality')}>Cardiologist</p>
                            <p className={cx('review')}>120 reviews</p>
                        </div>
                        <div className={cx('doctor')}>
                            <img src={images.doctorDefault} alt="doctor"/>
                            <h3>Dr. John Doe</h3>
                            <p className={cx('speciality')}>Cardiologist</p>
                            <p className={cx('review')}>120 reviews</p>
                        </div>
                        <div className={cx('doctor')}>
                            <img src={images.doctorDefault} alt="doctor"/>
                            <h3>Dr. John Doe</h3>
                            <p className={cx('speciality')}>Cardiologist</p>
                            <p className={cx('review')}>120 reviews</p>
                        </div>
                        <div className={cx('doctor')}>
                            <img src={images.doctorDefault} alt="doctor"/>
                            <h3>Dr. John Doe</h3>
                            <p className={cx('speciality')}>Cardiologist</p>
                            <p className={cx('review')}>120 reviews</p>
                        </div>
                        <div className={cx('doctor')}>
                            <img src={images.doctorDefault} alt="doctor"/>
                            <h3>Dr. John Doe</h3>
                            <p className={cx('speciality')}>Cardiologist</p>
                            <p className={cx('review')}>120 reviews</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default FindDoctor;