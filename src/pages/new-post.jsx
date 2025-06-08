import styled from "styled-components"
import Header from "../components/Header"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Editor } from '@tinymce/tinymce-react'
import { InputComponent, InputContainer } from "../components/Input"
import { newPost } from "../requests/queries"

const NewPostPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`

const NewPostBody = styled.div`
    
`
const Label = styled.label`
    font-size: 1.4rem;
    font-weight: 600;
`
const Form = styled.form`
    display: grid;
    gap: 2em;
    width: 100%;
    margin: 1em;
`
const Container = styled(InputContainer)`
    display: flex;
    flex-direction: column;
    align-items: start;
`
const Buttons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-self: end;
    margin-right: 5%;
`

export const init = {
    height: 400,
    width: '95%',
    menubar: true,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'code', 'help', 'wordcount'
      ],
}

export default function NewPost() {
    const navigate = useNavigate();
    const {user, setLoading, setRefresh} =useOutletContext()
    const editorRef = useRef(null);
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/', {replace: true});
        }

    }, [user]);

    const handleSave = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (editorRef.current) {
            const text = editorRef.current.getContent()
            const result = await newPost(title, text)
            console.log(result)
        }
        setRefresh(true)
        setLoading(false)
        navigate('/', {replace: true});
    }

    return (
        <NewPostPage>
            <Header />
            <NewPostDetails 
                handleSave={handleSave}
                title={title}
                setTitle={setTitle}
                init={init}
                editorRef={editorRef}
            />
        </NewPostPage>
    )
}

export const NewPostDetails = ({handleSave, title, editorRef, setTitle, value, handleCancel}) => {
    return (
        <NewPostBody>
            <h3>Make new post</h3>
            <Form onSubmit={handleSave} >
                <InputContainer>
                    <Label htmlFor="title">Title</Label>
                    <InputComponent name="title" id="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                </InputContainer>
                <Container>
                    <Label htmlFor="text">Text</Label>
                    <Editor
                        apiKey="dwd15wk9wobzfn3mpclvymc27enhvqy3yugacole91ape7fp"
                        init={init}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={value}
                    />
                </Container>
                <Buttons>
                    {handleCancel &&
                        <button type="cancel" onClick={handleCancel} className="cancel">Cancel</button>
                    }
                    <button type="submit" >Save</button>
                </Buttons>
            </Form>
        </NewPostBody>
    )
}