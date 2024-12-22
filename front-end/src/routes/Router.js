import Home from "../pages/Home/Home";
import FindDoctor from "../pages/FindDoctor/FindDoctor";
import OurService from "../pages/OurService/OurService";
import Review from "../pages/Review/Review";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DetailDOctor from "../pages/DetailDoctor/DetailDoctor";
import FormBookDoctor from "../pages/FormBookDoctor/FormBookDoctor";
import VideoCall from "../pages/VideoCall/VideoCall";
import DrugList from "../pages/DrugList/DrugList";
import UserProfile from "../pages/UserProfile/UserProfile";
import Messages from "../pages/Message/Message";
import DrugDoctor from "../pages/DrugDoctor/DrugDoctor";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/find-doctor", component: FindDoctor },
  { path: "/our-service", component: OurService },
  { path: "/review", component: Review },
  { path: "/drug-list", component: DrugList},
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/doctor/:id", component: DetailDOctor },
  { path: "/book-appointment", component:FormBookDoctor},
  { path: "/video-call", component:VideoCall, layout: null },
  { path: "/user-profile", component: UserProfile},
  { path: "/messages", component:Messages},
  { path: "/doctor-drug", component: DrugDoctor},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
