import styled from "styled-components";

const InputContainer = styled.section`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: baseline;
    text-align: left;
`

const Label = styled.label`
    
`
export const InputComponent = styled.input`
    all: unset;
    background-color:transparent;
    border: none;;
    padding-left: 5px;
    border-bottom: dotted 3px #d0d1cc;
    &:focus, &:hover {
        border-color: #3b3b3a;
    }
`

export default function Input(props) {
    return (
        <>
            <InputContainer>
                <Label htmlFor={props.id}>{props.label}:</Label>
                {props.id === 'username' ?
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                        onChange={(e) => props.setUsername(e.target.value)}
                    />
                : (props.id === 'password') ?
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                :   (props.id === 'email') ?
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                        onChange={(e) => props.setEmail(e.target.value)}
                    />
                :   (props.id === 'confirmPassword') ?
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                        onChange={(e) => props.setConfirmPassword(e.target.value)}
                    />
                : 
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                    />
                }
            </InputContainer>
        </>
    )
}