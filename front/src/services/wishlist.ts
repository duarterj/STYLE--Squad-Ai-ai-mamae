import API from "./api";

export async function getWishlist(userId: number) {
    return await API.get(`/users/${userId}/wishlist`);
}

export async function addToWishlist(userId: number, productId: number) {
    return await API.post(`/users/${userId}/wishlist`, { productId });
}

export async function removeFromWishlist(userId: number, productId: number) {
    return await API.delete(`/users/${userId}/wishlist/${productId}`);
}
