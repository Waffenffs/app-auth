import {MdOutlineHideImage} from 'react-icons/md'
import '../App.css'

export default function UserProfile({ userId, photoUrl, email, signedIn}){

    // if signedIn is true, show a user profile.
        // else, show a guest profile.

    const GuestProfile = () => (
        <div className="profile">
            <MdOutlineHideImage className='guestPhoto' />
            <h1>Guest</h1>
        </div>
    )

    const UserProfile = () => (
        <div className="profile">
            <MdOutlineHideImage className='guestPhoto' />
            <h1>{email} (USER)</h1>
        </div>
    )

    return(
        <div className="profileContainer">
            {signedIn ? <UserProfile /> : <GuestProfile />}
        </div>
    )
}