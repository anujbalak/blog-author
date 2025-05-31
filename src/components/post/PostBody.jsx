import styled from "styled-components";

const PostBodyContainer = styled.div`
    margin: 1em 0;
`

const PostText = styled.p`
    text-align: left;
    font-size: 1.3rem;
`

export default function PostBody({text}) {
    return (
        <PostBodyContainer>
            <PostText>
                {text}
            </PostText>
        </PostBodyContainer>
    )
}