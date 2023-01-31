import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn({ handleSignIn, signedIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // once user signs in, navigate them to homepage.
    if(signedIn){
        navigate('/')
    }
    
    return(
        <div className="formContainer">
            <div className="form">
                <h1>Login</h1>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h1>Password</h1>
                <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={(e) => handleSignIn(e, email, password)}>Sign in</button>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    )
}