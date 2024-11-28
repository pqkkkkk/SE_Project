import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./DrugList.module.scss";

const cx = classNames.bind(styles);

function DrugList() {
    return(
        <div className={cx('container')}>
            <h1 className={cx('heading')}>Hệ thống mua thuốc bệnh viện</h1>
            <div className={cx('background')}>
                <div className={cx('title')}>
                    <h2 className={cx('strong-title')}>WELLNESS</h2>
                    <h3 className={cx('soft-title')}>DELIVERED DAILY</h3>
                    <p className={cx('desc')}>Trang bán thuốc trực tuyến của bệnh viện chúng tôi mang đến sự tiện 
                        lợi và chăm sóc sức khỏe toàn diện ngay tại nhà.</p>
                </div>
                <img src={images.medicineBg} alt="medicineBg" className={cx('medicine-bg')}/>
            </div>
            <div className={cx('feature')}>
                <img src={images.feature1} alt="feature1" className={cx('feature-img')}/>
                <img src={images.feature2} alt="feature2" className={cx('feature-img')}/>
                <img src={images.feature3} alt="feature3" className={cx('feature-img')}/>
                <img src={images.feature4} alt="feature4" className={cx('feature-img')}/>
            </div>
            <div className={cx('filter')}>
                <h2 className={cx('label')}>Tìm kiếm thuốc</h2>
                
                <label className={cx('label-type')} htmlFor="category">Loại thuốc</label>
                <select className={cx('select-options')} id="category">
                    <option value="0">Tất cả</option>
                    <option value="1">Thuốc giảm đau</option>
                    <option value="2">Thuốc kháng sinh</option>
                    <option value="3">Thuốc huyết áp</option>
                </select>

                <label className={cx('label-search')} htmlFor="search">Nhập tên thuốc</label>
                <input className={cx('input')} id="search" type="text" placeholder="Nhập tên thuốc"/>
                <button className={cx("search-btn")}>Lọc</button>
            </div>
            <div className={cx('break')}></div>
            <div className={cx('medicine-list')}>
                <div className={cx('medicine')}>
                    <img src={images.medicine} alt="medicine" className={cx('medicine-img')}/>
                    <p className={cx('desc')}>Nước uống Kinohimitsu Stem Cell hạn chế lão hóa da hộp 16 chai x 50g</p>
                    <span className={cx('price-desc')}>
                        <b className={cx('price')}>Giá: 1.000.000đ </b>
                        /Hộp 
                    </span>
                    
                    <button className={cx('btn-buy')}>Mua</button>
                </div>

                <div className={cx('medicine')}>
                    <img src={images.medicine} alt="medicine" className={cx('medicine-img')}/>
                    <p className={cx('desc')}>Nước uống Kinohimitsu Stem Cell hạn chế lão hóa da hộp 16 chai x 50g</p>
                    <span className={cx('price-desc')}>
                        <b className={cx('price')}>Giá: 1.000.000đ </b>
                        /Hộp 
                    </span>
                    
                    <button className={cx('btn-buy')}>Mua</button>
                </div>

                <div className={cx('medicine')}>
                    <img src={images.medicine} alt="medicine" className={cx('medicine-img')}/>
                    <p className={cx('desc')}>Nước uống Kinohimitsu Stem Cell hạn chế lão hóa da hộp 16 chai x 50g</p>
                    <span className={cx('price-desc')}>
                        <b className={cx('price')}>Giá: 1.000.000đ </b>
                        /Hộp 
                    </span>
                    
                    <button className={cx('btn-buy')}>Mua</button>
                </div>

                <div className={cx('medicine')}>
                    <img src={images.medicine} alt="medicine" className={cx('medicine-img')}/>
                    <p className={cx('desc')}>Nước uống Kinohimitsu Stem Cell hạn chế lão hóa da hộp 16 chai x 50g</p>
                    <span className={cx('price-desc')}>
                        <b className={cx('price')}>Giá: 1.000.000đ </b>
                        /Hộp 
                    </span>
                    
                    <button className={cx('btn-buy')}>Mua</button>
                </div>

                <div className={cx('medicine')}>
                    <img src={images.medicine} alt="medicine" className={cx('medicine-img')}/>
                    <p className={cx('desc')}>Nước uống Kinohimitsu Stem Cell hạn chế lão hóa da hộp 16 chai x 50g</p>
                    <span className={cx('price-desc')}>
                        <b className={cx('price')}>Giá: 1.000.000đ </b>
                        /Hộp 
                    </span>
                    
                    <button className={cx('btn-buy')}>Mua</button>
                </div>

                <div className={cx('medicine')}>
                    <img src={images.medicine} alt="medicine" className={cx('medicine-img')}/>
                    <p className={cx('desc')}>Nước uống Kinohimitsu Stem Cell hạn chế lão hóa da hộp 16 chai x 50g</p>
                    <span className={cx('price-desc')}>
                        <b className={cx('price')}>Giá: 1.000.000đ </b>
                        /Hộp 
                    </span>
                    
                    <button className={cx('btn-buy')}>Mua</button>
                </div>
            </div>
        </div>
    );
}

export default DrugList;