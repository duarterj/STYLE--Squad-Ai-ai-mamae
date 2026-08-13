import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card} from "@/components/ui/card"
import  { produtosSale } from "./componentsData/saleData"

import broken from "../assets/Icon/categoryBroke.svg"
import star from "../assets/Icon/star.svg"
import add from "../assets/Icon/addCart.svg"
import fav from "../assets/Icon/favButton.svg"

export default function SaleItems() {
  return (
    <div className="grid grid-cols-1  gap-4 sm:grid-cols-1 lg:grid-cols-3">
      {produtosSale.map((produto, index) => (
        <Card
          key={index}
          className="relative h-[526px] w-[344px] overflow-hidden rounded-b-[12px] pt-0 border-none bg-white text-black shadow-[0_30px_60px_#0f172a1e] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">

          
          <div className="absolute inset-0 flex items-start justify-start  p-2">
            <Badge className="bg-[#DC2626] text-white">{produto.badgeD}</Badge>
          </div>

          <div className="absolute inset-0 flex items-start justify-end  p-2">
            <Badge className="bg-[#F3F4F6] ">{produto.badgeT}</Badge>
          </div>

          <div className="h-[344px] w-full bg-gray-100 flex   items-center justify-center">
            <img src={broken} alt={produto.name} className="h-[344px] w-[344px] object-contain " />
          </div>

          <div className="relative flex h-full flex-col  -mt-5 justify-between p-3">
            <div>
                <div className="absolute inset-0 flex  justify-start  p-4">
                    <Badge className="bg-white border-[#E5E7EB] ">{produto.badgeC}</Badge>
                </div>
                <div className="flex  items-start justify-end gap-1 mt-2">
                    <img src={star}/>
                    <span className="text-sm font-medium">{produto.rate}</span>
                    <span className="text-sm text-gray-500">({produto.reviews})</span>
                </div>
                <h3 className="text-lg font-semibold text-left">{produto.name}</h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-xl text-[#DC2626] font-bold">{produto.preco}</span>
                <span className="text-sm text-gray-400 line-through">{produto.precoOld}</span>
                <Badge className="bg-[#EF4343] text-white">Save {produto.badgeS}</Badge>
              </div>
            </div>

            <div className="flex flec-row -ml-5">
                <Button ><img src={add} className="w-[264px] -mr-2" /></Button>
                <Button ><img src={fav}/></Button>
            </div>

          </div>
        </Card>
      ))}
    </div>
  )
}