import Home from '../pages/Home'
import FindDoctor from '../pages/FindDoctor'
import OurService from '../pages/OurService';
import Review from '../pages/Review';
import Login from '../pages/Login';


const publicRoutes = [
    {path: '/', component: Home},
    {path: '/find-doctor', component: FindDoctor},
    {path: '/our-service', component: OurService},
    {path: '/review', component: Review},
    {path: '/login', component: Login, layout: null},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes }