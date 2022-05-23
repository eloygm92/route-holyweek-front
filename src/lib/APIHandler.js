import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();


export async function get(chunk) {
    return await fetch(import.meta.env.VITE_API_URL + chunk, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ' ' + cookies.get('jwt_token')
        }
    })
}
