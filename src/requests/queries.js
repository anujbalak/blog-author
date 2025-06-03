import { BACKEND_URL } from "../Root";

export const getUserById = async (id) => {
    try {
        let user = null;
        
        const url = `${BACKEND_URL}users/${id}`
        await fetch(url, {
            method: 'get'
        })
        .then(response => response.json())
        .then(response => user = response)
        .catch(err => console.error(err))
        return user
    } catch (error) {
        console.error(error.message);
    }
}

export const deleteComment = async (id) => {
    try {
        let result = null
        const url = `${BACKEND_URL}comments/${id}`
        
        await fetch(url, {
            method: 'delete'
        })
        .then(response => response.json())
        .then(response => result = response)
        .catch(err => console.error(err))

        return result
    } catch (err) {
        console.error(err)
    }
}