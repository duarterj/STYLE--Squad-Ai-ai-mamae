import API from "./api";

export async function register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
) {
    return await API.post("/users", {
        firstName,
        lastName,
        email,
        password,
    });
}

export async function login(
    email: string,
    password: string
) {
    return await API.post("/users/login", {
        email,
        password,
    });
}