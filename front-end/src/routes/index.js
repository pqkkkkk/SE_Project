import Home from "../pages/Home";
import FindDoctor from "../pages/FindDoctor";
import OurService from "../pages/OurService";
import Review from "../pages/Review";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DetailDOctor from "../pages/DetailDoctor";
import FormBookDoctor from "../pages/FormBookDoctor";
import VideoCall from "../pages/VideoCall";
import DrugList from "../pages/DrugList";
import UserProfile from "../pages/UserProfile";
import Messages from "../pages/Message";
import DrugDoctor from "../pages/DrugDoctor";
import ManageDrug from "../pages/ManageDrug";
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
  { path: "/video-call", component: VideoCall, layout: null },
  { path: "/user-profile", component: UserProfile },
  { path: "/messages", component: Messages },
  { path: "/doctor-drug", component: DrugDoctor },
  { path: "/manage-drug", component: ManageDrug },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
