import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";
import 'firebase/compat/database';

const initialState = {
    name: "",
    email: "",
    contact: "",
}

const AddEdit = () => {
    const [state,setState] = useState(initialState);
    const [data, setData] = useState({});

    const {name, email, contact} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        fireDb.child("contact").on("value", (snapshot) => {
            if (snapshot.val()!== null){
                setData({...snapshot.val()})
            } else {
                setData({});
            }
        })
        return () => {
            setData ({});
        };
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({...data[id]})
        } else {
            setState({...initialState})
        }
        return () => {
            setState({...initialState})
        }
    }, [id, data])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || ! email || !contact) {
            toast.error("Please provide value in each input field")
        } else {
            if (!id){
                fireDb.child("contact").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("customer Added Successfully!");
                    }
                }); 
            } else {
            fireDb.child(`contact/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("customer Updated Successfully!");
                }
            });
            setTimeout(() => navigate("/"), 500);
            }}
    };

    return(
        <div class="body">
        <div style={{marginTop: "10px"}}>
        <div class="">
                <p class="biggg">Services</p>
            </div>
            <form style={{
                margin: "auto",
                maxWidth: "400px",
                alignContent: "stretch",}}
                on onSubmit={handleSubmit}>
                    <label class="zzz" htmlFor="name"></label>
                    <input
                    class="smoler"
                    type="text"
                    id="name"
                    name="name"
                    placeHolder="Full Name"
                    value={name || ""}
                    onChange={handleInputChange} /><p></p>
                    
                    <label class="zzz" htmlFor="email"></label>
                    <input
                    class="smoler"
                    type="email"
                    id="email"
                    name="email"
                    placeHolder="FranksCatering@email.com"
                    value={email || ""}
                    onChange={handleInputChange} /><p></p>
                    
                    <label class="zzz" htmlFor="contact"></label>
                    <input
                    class="smoler"
                    type="number"
                    id="contact"
                    name="contact"
                    placeHolder="09xxxxxxxxx"
                    value={contact || ""}
                    onChange={handleInputChange} /><h1></h1><h1></h1><p></p><br></br>

                    <input class="seyb" type="submit" value={id ? "Update": "Submit"} />
            </form>
        </div>
        </div>
    )
}

export default AddEdit