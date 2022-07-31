import React, {useMemo, useState} from 'react';
import '../src/style/App.css'
import PostList from "./components/PostList";
import MyPostForm from "./components/MyPostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";


function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "аа", body: "бб"},
        {id: 2, title: "гг", body: "аа"},
        {id: 3, title: "вв", body: "яя"},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal]=useState(false)


    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])

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
                style={{marginTop:30}}
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
