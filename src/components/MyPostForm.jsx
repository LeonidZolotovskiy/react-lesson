import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const MyPostForm = ({create}) => {
    const [post, setPost] = useState({title:'', body:''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post,id: Date.now()
        }
        create(newPost)
        setPost({title:'', body:''})
    }

    return (
        <div>
            <form>
                <MyInput
                    value = {post.title}
                    onChange = {e => setPost({...post, title: e.target.value})}
                    type="text"
                    placeholder={"Называние поста"}/>
                <MyInput
                    value={post.body}
                    onChange={ e => setPost({...post, body: e.target.value})}
                    type="text"
                    placeholder={"Описание поста"}/>
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
        </div>
    );
};

export default MyPostForm;