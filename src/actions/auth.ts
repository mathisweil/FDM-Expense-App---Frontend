import { cookies } from "next/headers";

export async function login(formData: FormData) {
    // verify credentials && get user
    const user = {email: formData.get('email'), password: formData.get('password')};

    // create session
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week
    const session = await encrypt({user, expires});

    // store session
    cookies().set('session', session, {expires, httpOnly: true});
}

export async function logout() {
    // clear session
    cookies().set('session', '', {expires: new Date(0)});
}