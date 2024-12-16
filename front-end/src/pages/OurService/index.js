import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";


function OurService(){
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(`/${path}`);
    }
    return(
        <div>
            <h2>OurService Page</h2>
            <button onClick={() => handleClick('drug-list')}>Mua thuoc</button>
            <button onClick={() => handleClick('messages')}>Chat</button>
        </div>
        
    )
}

export default OurService;