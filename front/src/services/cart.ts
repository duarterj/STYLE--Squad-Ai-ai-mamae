import API from "./api";

export async function getCart(userId: number) {
    return await API.get(`/users/${userId}/cart`);
}

export async function addToCart(userId: number, variantId: number, quantity: number) {
    return await API.post(`/users/${userId}/cart`, { variantId, quantity });
}

export async function updateCartQuantity(userId: number, variantId: number, quantity: number) {
    return await API.patch(`/users/${userId}/cart/${variantId}`, { quantity });
}

export async function removeFromCart(userId: number, variantId: number) {
    return await API.delete(`/users/${userId}/cart/${variantId}`);
}
