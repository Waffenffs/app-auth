import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterUser({ handleSignUp, signedIn }){
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const navigate = useNavigate()

    // once user signs in, navigate them to homepage.
    if(signedIn){
        navigate('/')
    }

    return(
        <div className="formContainer2">
            <div className="form2">
                <h1>Register Email</h1>
                <input 
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <h1>Register Password</h1>
                <input 
                    type="text"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                 />
                 <button onClick={() => handleSignUp(registerEmail, registerPassword)}>Sign up</button>
            </div>
        </div>
    )
}