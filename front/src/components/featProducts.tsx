import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card} from "@/components/ui/card"
import  { produtosFeat } from "./featHome"

import broken from "../assets/Icon/categoryBroke.svg"
import star from "../assets/Icon/star.svg"

export default function FeatProduct() {
  return (
    <div className="grid grid-cols-1  py-10  sm:grid-cols-2 lg:grid-cols-4 lg:px-[120px]">
      {produtosFeat.map((produto, index) => (
        <Card
          key={index}
          className="relative h-[450px] w-[318px] overflow-hidden rounded-b-[12px]  border-none bg-white text-black shadow-[0_30px_60px_#0f172a1e] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="absolute inset-0 flex items-start justify-start mt-3 p-5">
            <Badge className={produto.badge === 'Sale' ? 'bg-[#ef4343] text-white' : 'bg-black text-white'}>{produto.badge}</Badge>

          </div>

          <div className="h-[318px] w-full bg-gray-100 flex  items-center justify-center">
            <img src={broken} alt={produto.name} className="h-[318px] w-[318px] object-contain " />
          </div>

          <div className="relative flex h-full flex-col  -mt-5 justify-between p-3">
            <div>
              <h3 className="text-lg font-semibold text-left">{produto.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <img src={star}/>
                <span className="text-sm font-medium">{produto.rate}</span>
                <span className="text-sm text-gray-500">({produto.reviews})</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-bold">{produto.preco}</span>
                {produto.precoOld ? <span className="text-sm text-gray-400 line-through">{produto.precoOld}</span> : null}
              </div>
              <Button className="bg-white text-black border border-gray-200">Add to Cart</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
