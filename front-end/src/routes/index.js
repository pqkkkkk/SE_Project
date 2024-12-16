import Home from "../pages/Home";
import FindDoctor from "../pages/FindDoctor";
import OurService from "../pages/OurService";
import Review from "../pages/Review";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DetailDOctor from "../pages/DetailDoctor";
import FormBookDoctor from "../pages/FormBookDoctor";
import DrugList from "../pages/DrugList";
import UserProfile from "../pages/UserProfile";
import Messages from "../pages/Message";
import DrugDoctor from "../pages/DrugDoctor";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/find-doctor", component: FindDoctor },
    { path: "/our-service", component: OurService },
    { path: "/review", component: Review },
    { path: "/drug-list", component: DrugList },
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
    { path: "/doctor/:id", component: DetailDOctor },
    { path: "/book-appointment", component: FormBookDoctor },
    { path: "/user-profile", component: UserProfile },
    { path: "/messages", component:  Messages},
    { path: "/doctor-drug", component: DrugDoctor },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
