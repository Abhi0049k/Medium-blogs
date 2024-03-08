import { SignupInput } from "mangalam-kumar-medium-blogs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const url = `${BACKEND_URL}/api/v1/user/${type}`;
            const response = await axios.post(url, postInputs);
            const jwt = response.data.token;
            console.log(response);
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (err) {
            console.log("sendRequest", err);
        }

    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>

                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400 text-center">
                        {
                            type === "signup" ? "Already have an account? " : "Don't have an account? "
                        }
                        {
                            type === "signup" ? (<Link className="underline" to={'/signin'}>Sign In</Link>) : (<Link className="underline" to={'/signup'}>Sign Up</Link>)
                        }
                    </div>
                </div>
                <div className="pt-4">
                    {type === "signup" ? <LabelledInput label="Name" type="text" placeholder="Name..." onChange={e => {
                        setPostInputs(c => ({ ...c, name: e.target.value }))
                    }} /> : null}
                    <LabelledInput label="Email" type="email" placeholder="Email..." onChange={e => {
                        setPostInputs(c => ({ ...c, email: e.target.value }))
                    }} />
                    <LabelledInput label="Password" type="password" placeholder="Password..." onChange={e => {
                        setPostInputs(c => ({ ...c, password: e.target.value }))
                    }} />
                    <button onClick={sendRequest} type="button" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2 w-full mt-4 justify-center">
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-gray-900 font font-bold">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}