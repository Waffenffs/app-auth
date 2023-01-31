import { useEffect, useState } from "react"
import styles from '../home.module.css'
import { database } from '../App'
import { getDatabase, ref, onValue} from 'firebase/database'

export default function HomePage({ post, email }){
    // fix addData so it adds the post content to the database.
    const [postContent, setPostContent] = useState('')
    const [postElements, setPostElements] = useState([])

    const postRef = ref(database, 'posts')


    return(
        <div className={styles.content}>
            <div className={styles.leftSection}>
                <div className={styles.inputContainer}>
                    <input 
                        type="text"
                        placeholder="Write anything in your mind..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className={styles.input}
                    />
                    <button className={styles.button} onClick={() => post(email, postContent)}>Post</button>
                </div>
            </div>

            <div className="rightSection">

            </div>
        </div>
    )
}