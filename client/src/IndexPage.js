import React from 'react'
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (!token) {
            navigate("/login");
        } else {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [0])
    return (<div>INDEX</div>);
}

export default Index;