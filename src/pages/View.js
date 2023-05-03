import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        fireDb.child(`customer/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser({...snapshot.val()});
            } else {
                setUser ({});
            }
        })
    }, [id]);

    console.log("user", user);

    return(
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Customer Details</p>
                </div>
                <div className="container">
                    
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br></br><br></br>
                    
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br></br><br></br>
                    
                    <strong>Contact Number: </strong>
                    <span>{user.role}</span>
                    <br></br><br></br>

                    <Link to="/">
                        <button className="btn btn-edit">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View