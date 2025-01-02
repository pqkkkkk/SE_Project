import Home from "../pages/Home/Home";
import FindDoctor from "../pages/FindDoctor/FindDoctor";
import OurService from "../pages/OurService/OurService";
import Requests from "../pages/Requests/Requests";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DetailDOctor from "../pages/DetailDoctor/DetailDoctor";
import FormBookDoctor from "../pages/FormBookDoctor/FormBookDoctor";
import VideoCall from "../pages/VideoCall/VideoCall";
import DrugList from "../pages/DrugList/DrugList";
import UserProfile from "../pages/UserProfile/UserProfile";
import Messages from "../pages/Message/Message";
import DrugDoctor from "../pages/DrugDoctor/DrugDoctor";
import ManageDrug from "../pages/ManageDrug/ManageDrug";
import ManageUser from "../pages/ManageUser/ManageUser";
import PaymentResult from "../pages/PaymentResult/PaymentResult";
import ManagePatient from "../pages/ManagePatient/ManagePatient";
import Statistical from "../pages/Statistical/Statistical";
import AdminHome from "../pages/AdminHome/AdminHome";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/find-doctor", component: FindDoctor },
    { path: "/our-service", component: OurService },
    { path: "/requests", component: Requests },
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
    { path: "/manage-user", component: ManageUser },
    { path: "/payment-result", component: PaymentResult, layout: null },
    { path: "/manage-patient", component: ManagePatient },
    { path: "/admin/statistical", component: Statistical, layout: null },
    { path: "/admin", component: AdminHome, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
