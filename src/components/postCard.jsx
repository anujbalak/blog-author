import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
    width: 80%;
    color: #383835;
`
const BlogTitleContainer = styled.div`
`

const BlogTitle = styled.h2`
    font-size: 3rem;
    margin: 0;
    &:hover {
        text-decoration: underline;
    }
`
const BlogTextContainer = styled.div`
    
`

const BlogText = styled.p`
    font-size: 1.5rem;
    margin: 0;
`

export default function PostCard({post}) {
    return (
        <Link to={`/posts/${post.id}`} className='post'>
            <Card>
                <BlogTitleContainer>
                    <BlogTitle>
                        {post.title}
                    </BlogTitle>
                </BlogTitleContainer>
                <BlogTextContainer>
                    <BlogText>
                        {post.text}
                    </BlogText>
                </BlogTextContainer>
            </Card>
        </Link>
    )
};

