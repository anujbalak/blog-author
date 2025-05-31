import styled from "styled-components";

const CommentsContainer = styled.div`
`
const CommentHeader = styled.section`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1em;
`

const CommentHeaderText = styled.span`
    
`

const CommentBody = styled.section`
    
`
export default function PostComments({comments}) {
    return (
        <CommentsContainer>
            <CommentHeader>
                <img src="/icons/comment.svg" alt="" />
                <CommentHeaderText>
                    Comments
                </CommentHeaderText>
            </CommentHeader>
            {comments.length > 0 &&
                comments.map(comment => <Comment key={comment.body} comment={comment}/>)
            }
        </CommentsContainer>
    )
}

const Comment = ({comment}) => {
    return (
        <CommentBody>

        </CommentBody>
    )
}