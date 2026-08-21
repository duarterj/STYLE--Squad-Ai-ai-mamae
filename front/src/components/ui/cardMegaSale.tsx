import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import broken from "../../assets/Icon/categoryBroke.svg"
import star from "../../assets/Icon/star.svg"
import add from "../../assets/Icon/addCart.svg"
import loadMore from "../../assets/Icon/loadMore.svg"
import fav from "../../assets/Icon/favButton.svg"

type CardMegaSaleProps = {
  produtos: typeof import("../componentsData/saleData").produtosSale;
};

export default function CardMegaSale({ produtos }: CardMegaSaleProps) {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 ml-4 gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {produtos.map((produto, index) => (
            <Card
              key={index}
              className="relative h-[540px] w-[358px] sm:h-[526px] sm:w-[344px] rounded-b-[12px] pt-0 border-none bg-white text-black shadow-[0_30px_60px_#0f172a1e] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 flex items-start justify-start p-2">
                <Badge className="bg-[#DC2626] text-white">{produto.badgeD}</Badge>
              </div>

              <div className="absolute inset-0 flex items-start justify-end p-2">
                <Badge className="bg-[#F3F4F6] ">{produto.badgeT}</Badge>
              </div>

              <div className="h-[344px] w-full flex items-center justify-center">
                <img src={broken} alt={produto.name} className="sm:h-[344px] h-[358px] w-full object-contain " />
              </div>

              <div className="relative flex h-full flex-col -mt-5 justify-between p-3">
                <div>
                  <div className="absolute inset-0 flex justify-start p-4">
                    <Badge className="bg-white border-[#E5E7EB] ">{produto.categoria}</Badge>
                  </div>
                  <div className="flex items-start justify-end gap-1 mt-2">
                    <img src={star} />
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

                <div className="flex flex-row -ml-5">
                  <Button>
                    <img src={add} className="w-[264px] -mr-2 cursor-pointer" />
                  </Button>
                  <Button>
                    <img src={fav} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center">
        <Button className="w-[195px] cursor-pointer hover:-translate-y-1 hover:shadow-2xl mb-5">
          <img src={loadMore} />
        </Button>
      </div>
    </>
  )
}

