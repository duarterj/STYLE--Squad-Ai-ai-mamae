import api from "./api";

export interface Variant {
  id: number;
  color: string;
  size: string | number;
  stock: number;
  productId: number;
}
export interface Product {
  id: string | number;
  description?: string;
  name: string;
  price: number;
  salePrice?: string;
  pathImage: string;
  category: string;
  collection: string;
  rating : number;
  ratingCount:  number;
  variants?: Variant[];
}

export const getVariants = async (productId: string | number) => {
  const response = await api.get(`/variants?productId=${productId}`);
  return response.data;
};

export  const getProducts = async() => {
  try {
    const response = await api.get("/products");
    return response;
  } catch(error: unknown) {
    throw new Error(
        error instanceof Error ? error.message : "error getting the product"
    );
  };
   
};

