import API from "./api";

const dispatchCartUpdate = () => {
    window.dispatchEvent(new Event('cartUpdated'));
};

export async function getCart(userId: number) {
    return await API.get(`/users/${userId}/cart`);
}

export async function addToCart(userId: number, variantId: number, quantity: number) {
    const response = await API.post(`/users/${userId}/cart`, { variantId, quantity });
    dispatchCartUpdate();
    return response;
}

export async function updateCartQuantity(userId: number, variantId: number, quantity: number) {
    const response = await API.patch(`/users/${userId}/cart/${variantId}`, { quantity });
    dispatchCartUpdate();
    return response;
}

export async function removeFromCart(userId: number, variantId: number) {
    const response = await API.delete(`/users/${userId}/cart/${variantId}`);
    dispatchCartUpdate();
    return response;
}
