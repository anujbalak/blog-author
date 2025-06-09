import { useEffect, useState } from "react";
import styled from "styled-components";
import { BACKEND_URL } from "../../Root";

const PostTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`

const PostTitleText = styled.h2`
    font-size: 3rem;
    margin: 0;
    flex: 100%;
    text-align: left;
`
const PostAuthor = styled.span`
    font-style: italic;
    font-weight: 700;
`

const PostCreate = styled.span`
    font-style: italic;
`

const PublishTag = styled.span`
    font-size: 1rem;
    background-color: #87d156;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    left: 0;
    margin-left: 10%;
    transform: rotate(-10deg);
`
const UnpublishTag = styled(PublishTag)`
    background-color: #ee6f6f;
`

export default function PostTitle ({authorid, date, title, published, edited}) {
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const user = await fetchAuthor(authorid)
            setAuthor(user);
       }
       getUser()
    })
    const createDate = new Date(date).getDate()
    const editDate = new Date(edited).getDate()

    const createdAt = new Date(date).toLocaleDateString()
    const editedDate = new Date(edited).toLocaleDateString()
    return (
        <PostTitleContainer>
            <PostTitleText>
                {title}
                {published ?
                    <PublishTag >
                        published
                    </PublishTag>
                :
                    <UnpublishTag>
                        unpublished
                    </UnpublishTag>
                }              
            </PostTitleText>
            <PostAuthor>
                {author ? author.username : 'Cool author'}
            </PostAuthor>        
            <PostCreate>
                {createdAt}
            </PostCreate> 
            {editDate !== createDate &&
                <PostCreate>
                    edited at {editedDate}
                </PostCreate>
            }       
        </PostTitleContainer>
    )
}

export async function fetchAuthor(id) {
    try {
        let result = null;
        const url = `${BACKEND_URL}author/${id}`
        await fetch(url)
                .then(res => res.json())
                .then(res => result = res)
        return result
    } catch (error) {
        console.error(error.message);        
    }
}