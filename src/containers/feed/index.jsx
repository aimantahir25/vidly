import React, {useEffect, useState} from 'react';
import {Post} from '../';
import {db} from '../../firebase';
import "./style.css";

const Feed = () => {

    const [posts, setPosts ] = useState([])
    
    useEffect(() => {
        db.collection('posts').onSnapshot((snapshot)=> {
            setPosts(snapshot.docs.map( doc => ({id: doc.id, post: doc.data()}) ))
        })

    }, [])

    return ( <div className="feed">
            {posts.map(({id, post}) => <Post key= {id}
            postId = {id}
            userName = {post.userName}
            userEmail = {post.userEmail}
            userPhoto = {post.userImage}
            userPostText = {post.text}
            postPhoto = {post.image}
            postDateTime = {post.timestamp}
            postComments = {post.comments}                 
            />)}
    </div> );
}
 
export default Feed;