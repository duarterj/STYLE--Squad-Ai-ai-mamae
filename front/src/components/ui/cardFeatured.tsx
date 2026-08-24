import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card} from "@/components/ui/card"
import { getProducts, type Product } from "../../services/product"
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/userPagination";

import star from "../../assets/Icon/star.svg"

export default function FeatProduct() {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 4;
  const totalPages = Math.ceil(produtos.length / itemsPerPage);
  const { page } = usePagination(Math.max(totalPages - 1, 0));
  const produtosVisiveis = produtos.slice(0, (page + 1) * itemsPerPage);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await getProducts()
        setProdutos([...(response.data || response)].reverse())  
      } catch (err: unknown) {
        setError("Erro ao carregar produtos.")
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Carregando produtos...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }
  
  return (
    <div className="grid grid-cols-1 gap-8 px-4  py-10  lg:grid-cols-4 lg:px-[245px]">
      {produtosVisiveis.map((produto, index) => (
        <Card
          key={index}
          className="relative h-[490px] w-[358px] sm:h-[450px] sm:w-[318px] overflow-hidden rounded-b-[12px] pt-0 border-none bg-white text-black shadow-[0_30px_60px_#0f172a1e] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">

          
          <div className="absolute inset-0 flex items-start justify-start p-2">
           <Badge className={ produto.collection === 'Sale' ?  'bg-[#ef4343] text-white':'bg-black text-white'}>
              {produto.collection  }
            </Badge>
          </div>

          <div className="h-[318px]  w-full bg-gray-100 flex  items-center justify-center">
            <img 
              src={produto.pathImage} 
              alt={produto.name} 
              className="text-center sm:h-[318px] h-[358px] w-[358px] object-contain" />
          </div>

          <div className="relative flex h-full flex-col  sm:-mt-5 justify-between p-3">
            <div>
              <h3 className="text-lg font-semibold text-left">{produto.name}</h3>
              <div className="flex items-center gap-1 mt-2">
                <img src={star} alt="Star rating"/>
                <span className="text-sm font-medium">{produto.rating}</span>
                <span className="text-sm text-gray-500">({produto.ratingCount})</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-bold">${produto.price}</span>
                {produto.salePrice ? (
                  <span className="text-sm text-gray-400 line-through">${produto.salePrice}</span>
                ) : null}
              </div>
              <Button className="cursor-pointer bg-white text-black border border-gray-200">Add to Cart</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
