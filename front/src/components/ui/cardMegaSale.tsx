import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { type Product } from "@/services/product";
import { usePagination } from '../../hooks/userPagination';

import broken from "../../assets/Icon/categoryBroke.svg"
import star from "../../assets/Icon/star.svg"
import add from "../../assets/Icon/addCart.svg"
import fav from "../../assets/Icon/favButton.svg"
import loadMore from "../../assets/Icon/loadMore.svg"
import FavoriteButton from "./favButton";

type CardMegaSaleProps = {
  produtos: Product[];
};

export default function CardMegaSale({ produtos }: CardMegaSaleProps) {
  const produtosMegaSale = produtos.filter((produto) => produto.salePrice != null);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(produtosMegaSale.length / itemsPerPage);
  const { page, goNext } = usePagination(Math.max(totalPages - 1, 0));
  const produtosVisiveis = produtosMegaSale.slice(0, (page + 1) * itemsPerPage);
  
  

  return (
    <>
      <section>
        <div className="grid grid-cols-1 ml-4 gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {produtosVisiveis.map((produto) => (
            (() => {
              const precoAtual = Number(produto.salePrice);
              const precoAntigo = Number(produto.price);
              const total = Math.round(precoAntigo - precoAtual);
              const desconto = Math.round(((precoAtual / precoAntigo) *100 ) -100 )
              return (
            <Card
              key={produto.id}
              className="relative h-[540px] w-[358px] sm:h-[526px] sm:w-[344px] rounded-b-[12px] pt-0 border-none bg-white text-black shadow-[0_30px_60px_#0f172a1e] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              <div className="absolute inset-0 flex items-start justify-start p-2">
                <Badge className="bg-[#DC2626] text-white">{desconto}%</Badge>
              </div>

              <div className="absolute inset-0 flex items-start justify-end p-2">
                <Badge className="bg-[#F3F4F6] ">{produto.collection}</Badge>
              </div>

              <div className="h-[344px] w-full flex items-center justify-center">
                <img 
                  src={produto.pathImage}  
                  alt={produto.name} 
                  className="text-center sm:h-[344px] h-[358px] w-full object-contain " />
              </div>

              <div className="relative flex h-full flex-col -mt-5 justify-between p-3">
                <div>
                  <div className="absolute inset-0 flex justify-start p-4">
                    <Badge className="bg-white border-[#E5E7EB] ">{produto.category}</Badge>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-2">
                    <img src={star} />
                    <span className="text-sm font-medium">{produto.rating}</span>
                    <span className="text-sm text-gray-500">({produto.ratingCount})</span>
                  </div>
                  <h3 className="text-lg font-semibold text-left">{produto.name}</h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl text-[#DC2626] font-bold">${produto.salePrice}</span>
                    <span className="text-sm text-gray-400 line-through">${produto.price}</span>
                    <Badge className="bg-[#EF4343] text-white">Save ${total}</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between  ">
                        
                  <Button className="cursor-pointer" >
                    <img src={add} alt="adicionar ao cart" className="w-[264px] -mr-2 " />
                  </Button>

                  <FavoriteButton productId={produto.id} />
                  

                </div>
              </div>
            </Card>
              );
            })()
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center">
          <Button
            className="w-[195px] cursor-pointer hover:-translate-y-1 hover:shadow-2xl mb-5"
            onClick={goNext}
            disabled={produtosVisiveis.length >= produtosMegaSale.length}
          >
            <img src={loadMore} />
          </Button>
          
      </div>
    </>
  )
}

