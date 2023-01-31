import { MdOutlineConnectWithoutContact } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './firebase.config'
import { getAuth, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithEmailAndPassword, 
  onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import UserProfile from './components/UserProfile'
import RegisterUser from './components/RegisterUser'
import SignIn from './components/SignIn'
import HomePage from './components/HomePage'
import './App.css'
import Post from './components/Post'
import { getDatabase, ref, set } from 'firebase/database'
import { nanoid } from 'nanoid'

// initialize firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()

// initialize realtime database and get a reference to the service
export const database = getDatabase(app)

// to-do for tomorrow: learn some firebase realtime database.
  // retrieve user profile
  // master account: {jabbawockeez@gmail.com, iamotaku123}

export default function App(){
  const [signedIn, setSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setSignedIn(true)
        setCurrentUser(user)
      } else {
        setSignedIn(false)
        setCurrentUser('guest')
      }
    })
  }, [])

  function handleSignIn(e, email, password){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  }

  function handleSignUp(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    // add user to the database.
    set(ref(database, 'users/' + nanoid()), {
      email: email,
      password: password
    })
  }

  // submits posts to the database.
  function post(email, content){
    set(ref(database, 'posts/' + nanoid()), {
      postedBy: email,
      content: content
    })
  }

  return(
    <div className="container">
      <nav>
        <Link to="/" className='icons'>
          <MdOutlineConnectWithoutContact className='icon' />
          <h1>Link Connect</h1>
        </Link>
        <div className="profileCard">
          <CgProfile />
          {currentUser === 'guest' ? <Link to="/user-profile">GUEST</Link> : <Link to="/user-profile">{currentUser?.email}</Link>}
        </div>
        <div>

          {signedIn ? 
            <button onClick={() => signOut(auth)} className="nav-button">Sign out</button> 
          : 
            <Link to="/sign-in">
              <button className='nav-button'>Sign in</button>
            </Link>}

        </div>
      </nav>

      <Routes>
        <Route path='/' element={ <HomePage 
        email={signedIn && currentUser.email}
        post={post}
        /> } />
        <Route path="/user-profile" element={ <UserProfile 
        email={signedIn && currentUser.email}
        photoUrl={signedIn && currentUser.photoUrl}
        signedIn={signedIn}
        /> } />
        <Route path='/sign-in' element={ <SignIn handleSignIn={handleSignIn} signedIn={signedIn} /> } />
        <Route path="/register" element={ <RegisterUser handleSignUp={handleSignUp} signedIn={signedIn} /> } />
      </Routes>
    </div>
  )
}