import styled from "styled-components";
import Header from "../components/Header";
import { BACKEND_URL } from "../Root";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Orbit, BouncyArc } from "ldrs/react";
import 'ldrs/react/Orbit.css'
import 'ldrs/react/BouncyArc.css'

import { LoadingContainer, LoadingText } from "./home";
import PostTitle from "../components/post/PostTitle";
import PostBody from "../components/post/PostBody";
import PostComments from "../components/post/PostComments";
import { NewPostDetails } from "./new-post";
import { deletePost, updatePost, updatePublish } from "../requests/queries";


const PostPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`

const PostContainer = styled.div`
    display: grid;
    margin: 0 1em;
    max-width: 1500px;
    width: 95%;
    align-self: center;
`

const DividerLine = styled.hr`
    background-color: currentColor;
    width: 100%;
    margin-top: 2em;
`

const LoadingDialog = styled.dialog`
    
`
const Icon = styled.img`
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
    &:focus, &:hover {
        transform: scale(1.1)
    }
`
const Menu = styled.section`
    display: flex;
    font-size: 1.5rem;
    gap: 2em;
    margin: 1em 0;
`

const GenericContainer = styled.div`
    display: flex;
    gap: 10px;
`

export default function Post() {
    let params = useParams()
    const {setRefresh} = useOutletContext()
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(null);
    const [publish, setPublish] = useState(false)
    const[text, setText] = useState(null)
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
       const getPost = async () => {
            const newPost = await fetchPost(params.postid)
            setPost(newPost);
            setText(newPost.text);
            setTitle(newPost.title);
            setPublish(newPost.published)
       }

       getPost()
    }, [params.postid])

    const handleSave = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (editorRef.current) {
            const blog = editorRef.current.getContent()
            const result = await updatePost({id: post.id, title, text: blog});
            console.log(result)
        }
        setEdit(false)
        // setRefresh(true)
        setLoading(false)
        navigate(0)
    }

    const handleCancel = async(e) => {
        e.preventDefault()
        setEdit(false)
        setText(newPost.text);
        setTitle(newPost.title);
    }

    const handlePublish = async (e) => {
        setLoading(true)
        if (publish) {
            setPublish(false)
            const result = await updatePublish({id: post.id, publish: false});
            console.log(result);
        } else {
            setPublish(true)
            const result = await updatePublish({id: post.id, publish: true});
            console.log(result);
        }
        setLoading(false)
    }

    const handleDelete = async (e) => {
        setLoading(true)
        const result = await deletePost({id: post.id});
        console.log(result)
        setEdit(false)
        setLoading(false)
        setRefresh(true)
        navigate('/', {replace: true})
    }

    return (
        <PostPage className="post-page">
            {loading &&
                <LoadingDialog>
                    <BouncyArc size="100"/>
                </LoadingDialog>
            }
            <Header/>
            {Boolean(post) === true && edit === false ?
                <PostContainer>
                    <Menu>
                        <Icon src="/icons/edit.svg" onClick={(e) => setEdit(true)}/>
                        <GenericContainer>
                            Published:
                            {publish ?
                                <Icon src="/icons/tick.svg" alt="" onClick={handlePublish}/>
                            :
                                <Icon src="/icons/cancel.svg" alt="" onClick={handlePublish}/>
                            }
                        </GenericContainer>
                        <Icon src="/icons/bin.svg" alt="" onClick={handleDelete}/>
                    </Menu>
                    <PostTitle
                        authorid={post.authorid}
                        date={post.createdAt}
                        title={post.title}
                        edited={post.updatedAt}
                    />
                    <PostBody text={post.text}/>
                    <DividerLine />
                    <PostComments  
                        comments={post.Comment} 
                        loading={loading}
                        setLoading={setLoading} 
                    />
                </PostContainer>
            :   Boolean(post) === false ?
                <LoadingContainer>
                    <LoadingText>
                        Loading the content...
                    </LoadingText>
                    <Orbit size="55" speed="1.5"  color="royalblue"/>
                </LoadingContainer>
            :  Boolean(post) === true && edit === true &&
                <NewPostDetails
                    handleSave={handleSave}
                    title={title}
                    editorRef={editorRef}
                    setTitle={setTitle}
                    value={text}
                    handleCancel={handleCancel}
                />
            }
        </PostPage>
    )
}

export async function fetchPost(id) {
    try {
        let result = null;
        const url = `${BACKEND_URL}posts/${id}`
        await fetch(url)
                .then(res => res.json())
                .then(res => result = res)
        return result
    } catch (error) {
        console.error(error.message);        
    }
}
