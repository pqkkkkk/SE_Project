import Home from "../pages/Home";
import FindDoctor from "../pages/FindDoctor";
import OurService from "../pages/OurService";
import Review from "../pages/Review";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DetailDOctor from "../pages/DetailDoctor";
import DrugList from "../pages/DrugList";

const publicRoutes = [

    { path: "/", component: Home },
    { path: "/find-doctor", component: FindDoctor },
    { path: "/our-service", component: OurService },
    { path: "/review", component: Review },
    { path: "/drug-list", component: DrugList },
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
    { path: "/doctor/:id", component: DetailDOctor },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
