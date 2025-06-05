import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { updateEmail, updateUsername } from "../requests/queries";

const AccountPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`
const AccountBody = styled.section`
    display: grid;
    gap: 1em;
`
const Section = styled.section`
    margin: 0 5%;
`
const Form = styled.form`
    display: flex;
    align-items: baseline;
    column-gap: 2em;
    row-gap: 10px;
    flex-wrap: wrap;
`

export default function Account () {
    const navigate = useNavigate();
    const {user} = useOutletContext();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/', {replace: true});
        } else if (user) {
            console.log(user)
            setUsername(user.username);
            setEmail(user.email)
        }
    }, [user])

    const handleUsername = async (e) => {
        e.preventDefault();
        const update = await updateUsername(user.id, username)
        console.log(update)
    }
    const handleEmail = async (e) => {
        e.preventDefault();
        const update = await updateEmail(user.id, email)
        console.log(update)
    }

    return (
        <AccountPage>
            <Header account/>
            <AccountBody>
                {user &&
                    <>
                    <Section>
                        <Form onSubmit={handleUsername}>
                            <Input
                                type="text"
                                name="username"
                                label="Username"
                                value={user.username}
                                id="username"
                                setUsername={setUsername}
                            />
                            <button type="submit">Change</button>
                        </Form>
                    </Section>
                    <Section>
                        <Form onSubmit={handleEmail}>
                            <Input
                                type="text"
                                name="email"
                                label="Email"
                                value={user.email}
                                id="email"
                                setEmail={setEmail}
                            />
                            <button type="submit" className="normal">Change</button>
                        </Form>
                    </Section>
                    </>
                }
            </AccountBody>
        </AccountPage>
    )
}