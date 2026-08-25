import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { addToWishlist } from "@/services/wishlist";
import { getUserId } from "../../services/getUserId";

interface FavoriteButtonProps {
  productId: number | string;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const [ativo, setAtivo] = useState(false);

  const handleAddToWishlist = async (productId: number | string) => {
    const userId = getUserId();

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    try {
      await addToWishlist(userId, Number(productId));
      setAtivo(true);
    } catch (error) {
      console.error("Erro ao adicionar produto à wishlist:", error);
    }
  };

  return (
    <Button
      size="icon"
      type="button"
      aria-label="Adicionar à wishlist"
      onClick={() => handleAddToWishlist(productId)}
    >
      <Heart
        className={`h-10 w-10 transition-all duration-300 ${ativo ? "fill-black text-black" : "fill-transparent text-black"}`}
      />
    </Button>
  );
}