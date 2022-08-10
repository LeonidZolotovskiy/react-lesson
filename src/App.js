import React, {useMemo, useState} from 'react';
import '../src/style/App.css'
import PostList from "./components/PostList";
import MyPostForm from "./components/MyPostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";


function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton
                style={{marginTop: 30}}
                onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <MyPostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: " 15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost}
                      posts={sortedAndSearchedPosts}
                      title={"Посты для JS"}/>
        </div>
    )
}

export default App;
