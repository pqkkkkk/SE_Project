import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const features = [
    {
        image: images.service24Hours,
        title: "24 hours services",
        description: "lorem ipsum dolor sit amet,connector adicipafg",
    },
    {
        image: images.experience,
        title: "10 years of experience",
        description: "lorem ipsum dolor sit amet,connector adicipafg",
    },
    {
        image: images.highQualityCare,
        title: "High quality care",
        description: "lorem ipsum dolor sit amet,connector adicipafg",
    },
];

const services = [
    {
        image: images.customerSupport,
        title: "Customer Support",
    },
    {
        image: images.onlineSpecialist,
        title: "Online Specialist",
    },
    {
        image: images.buyMedicineOnline,
        title: "Buy Medicine Online",
    },
];

const specialists = [
    {
        name: "Dr. Annah Ray",
        field: "Dentician",
        reviews: 120,
        image: images.doctorHomeSpecialist1,
        rating: "5.0",
    },
    {
        name: "Dr. Richard Brook",
        field: "Gastroenterlogist",
        reviews: 120,
        image: images.doctorHomeSpecialist2,
        rating: "5.0",
    },
    {
        name: "Dr. Vivian Monroe",
        field: "Pediatry Surgeon",
        reviews: 120,
        image: images.doctorHomeSpecialist3,
        rating: "5.0",
    },
];

const news = [
    {
        title: "Pumping Iron Improves Longevity in Older Adults",
        description:
            "Those who report weightlifting show reductions in all-cause and cardiovascular disease-related mortality.",
        image: images.trendingHome1,
    },
    {
        title: "Monkeypox Case Rates 5 Times Higher Among Black Americans",
        description:
            "events, exhibitions, publications, and initiatives hosted by, led by, or featuring members of the School of Art community",
        image: images.trendingHome2,
    },
    {
        title: "The Happy Hormone: Why We Shouldn't Mess With Dopamine",
        description:
            "Mailchimp emails and announcements sent out by the Yale School of Art’s Communications Office",
        image: images.trendingHome3,
    },
];

function Home() {
    return (
        <main id={cx("home")}>
            <div className={cx("hero")}>
                <div className={cx("content")}>
                    <div className={cx("hero-text")}>
                        <h1 className={cx("title")}>
                            Your Health Comes First.
                        </h1>

                        <p className={cx("desc")}>
                            With Medicare services you will receive the best
                            medical treatment in your home. Our team of skilled
                            medical professionals and aids ensure that you get
                            the care you need and deserve.
                        </p>

                        <a href="#!" className={cx("btn", "hero-btn")}>
                            Book Appointment
                        </a>
                    </div>

                    <div className={cx("hero-img")}>
                        <img src={images.doctorHome} />
                        <div className={cx("hero-background")}></div>
                    </div>
                </div>
            </div>

            <div className={cx("features")}>
                <div className={cx("content")}>
                    <div className={cx("features-body")}>
                        {features.map((feature, index) => (
                            <div className={cx("feature")}>
                                <div className={cx("feature-img")}>
                                    <img src={feature.image} />
                                </div>

                                <div className={cx("feature-text")}>
                                    <h3 className={cx("feature-name")}>
                                        {feature.title}
                                    </h3>

                                    <p className={cx("feature-desc")}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx("services")}>
                <div className={cx("content")}>
                    <div className={cx("services-header")}>
                        <h2 className={cx("sub-title")}>
                            Your health requirements are our first focus.
                        </h2>

                        <p className={cx("desc")}>
                            Our team of skilled medical professionals and aids
                            ensure that you get the care you need and deserve.
                        </p>
                    </div>

                    <div className={cx("services-body")}>
                        {services.map((service, index) => (
                            <div
                                className={cx("service", {
                                    "service-bgc-1": index === 0,
                                    "service-bgc-2": index === 1,
                                    "service-bgc-3": index === 2,
                                })}
                            >
                                <div className={cx("service-info")}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className={cx("service-img")}
                                    />

                                    <h3 className={cx("service-name")}>
                                        {service.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx("specialists")}>
                <div className={cx("content")}>
                    <h2 className={cx("sub-title")}>Top Specialist</h2>

                    <div className={cx("specialists-body")}>
                        <button className={cx("btn", "carousel-btn", "left")}>
                            <img src={images.arrowLeft} />
                        </button>

                        {specialists.map((specialist, index) => (
                            <div className={cx("specialist-card")}>
                                <div className={cx("specialist-rating")}>
                                    <img src={images.star} />

                                    <p className={cx("rating")}>
                                        {specialist.rating}
                                    </p>
                                </div>

                                <div className={cx("specialist-info")}>
                                    <img
                                        src={specialist.image}
                                        className={cx("specialist-img")}
                                    />

                                    <h3 className={cx("specialist-name")}>
                                        {specialist.name}
                                    </h3>

                                    <p className={cx("specialist-desc")}>
                                        {specialist.field}
                                    </p>

                                    <a
                                        href="#!"
                                        className={cx("btn", "specialist-btn")}
                                    >
                                        Book Now
                                    </a>

                                    <p className={cx("specialist-reviews")}>
                                        {specialist.reviews} Reviews
                                    </p>
                                </div>
                            </div>
                        ))}

                        <button className={cx("btn", "carousel-btn", "right")}>
                            <img src={images.arrowRight} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx("news")}>
                <div className={cx("content")}>
                    <div className={cx("news-header")}>
                        <h2 className={cx("sub-title")}>
                            What you need to know about healthy living
                        </h2>

                        <a href="#!" className={cx("see-more")}>
                            See More
                            <img src={images.arrowRightLink} />
                        </a>
                    </div>

                    <div className={cx("news-body")}>
                        <div className={cx("news-main")}>
                            <img
                                src={images.newsMainHome}
                                className={cx("main-img")}
                            />

                            <p className={cx("main-date")}>APRIL 26, 2022</p>

                            <h4 className={cx("main-name")}>
                                Updated Covid boosters rolled out a month ago.
                                Here's how many Americans have gotten them.
                            </h4>

                            <p className={cx("desc")}>
                                The CDC recommends that everyone over 12 get an
                                updated booster as long as at least two months
                                have passed since their last Covid shot.
                            </p>

                            <a href="#!" className={cx("read-more")}>
                                Read More
                            </a>
                        </div>

                        <div className={cx("news-section")}>
                            <h3 className={cx("section-title")}>
                                Whats Trending?
                            </h3>

                            {news.map((trending, index) => (
                                <div className={cx("trending-item")}>
                                    <img
                                        src={trending.image}
                                        className={cx("trending-img")}
                                    />

                                    <div className={cx("trending-info")}>
                                        <h4 className={cx("trending-name")}>
                                            {trending.title}
                                        </h4>

                                        <p className={cx("desc")}>
                                            {trending.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx("partners")}>
                <div className={cx("content")}>
                    <img src={images.worldHealthOrganization} />
                    <img src={images.medilabGlobal} />
                    <img src={images.healthNet} />
                    <img src={images.healthCare} />
                </div>
            </div>
        </main>
    );
}

export default Home;
