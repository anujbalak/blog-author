import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonComponent = styled.button`
    display: flex;
`

export default function Button(props) {
    return(
        <>
            {Boolean(props.path) ?
                <Link to={`/${props.path}`} className={props.className}>
                    <ButtonComponent>
                            {props.name}
                    </ButtonComponent>
                </Link>
            :
                <ButtonComponent className={props.className}>
                    {props.name}
                </ButtonComponent>
            }
        </>
    )
}