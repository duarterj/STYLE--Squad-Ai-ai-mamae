import api from "./api";

export interface Product {
  id: string | number;
  description: string;
  name: string;
  price: number;
  salePrice?: string;
  pathImage: string;
  category: string;
  collection: string;
  rating : number;
  ratingCount:  number;
}


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

