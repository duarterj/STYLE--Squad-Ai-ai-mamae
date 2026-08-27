import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/wishlist";
import { getUserId } from "../../services/getUserId";

interface FavoriteButtonProps {
  productId: number | string;
}

interface WishlistItem {
  productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const [ativo, setAtivo] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const checkStatus = async () => {
      const userId = getUserId();
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        
        const wishlistResponse = await getWishlist(userId);
        const wishlist: WishlistItem[] = wishlistResponse.data;
        const isFavorite = wishlist.some((item) => item.productId === Number(productId));
        setAtivo(isFavorite);
      } catch (error) {
        console.error("Erro ao checar status do favorito:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [productId]);
  
  const handleToggleWishlist = async (productId: number | string) => {
    const userId = getUserId();

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    try {
      if (ativo) {
        await removeFromWishlist(userId, Number(productId));
        setAtivo(false);
      } else {
        await addToWishlist(userId, Number(productId));
        setAtivo(true);
      }
    } catch (error) {
      console.error("Erro ao adicionar produto à wishlist:", error);
    }
  };

  return (
    <Button
      size="icon"
      type="button"
      aria-label={ativo ? "Remover da wishlist" : "Adicionar à wishlist"}
      onClick={() => handleToggleWishlist(productId)}
      className="cursor-pointer"
    >
      <Heart
        className={`h-19 transition-all duration-300 ${ativo ? "fill-red-600 text-red-600 " : "fill-transparent text-black"}`}
      />
    </Button>
  );
}