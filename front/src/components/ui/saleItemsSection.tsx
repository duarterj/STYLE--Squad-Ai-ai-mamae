import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card} from "@/components/ui/card"
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Field, FieldGroup } from "./field";
import  { produtosSale } from "../componentsData/saleData"

import broken from "../../assets/Icon/categoryBroke.svg"
import star from "../../assets/Icon/star.svg"
import add from "../../assets/Icon/addCart.svg"
import fav from "../../assets/Icon/favButton.svg"
import filter from"../../assets/Icon/filter.svg"
import price from "../../assets/Icon/combobox.svg"
import feat from "../../assets/Icon/combobox2.svg"
import grade from "../../assets/Icon/grid.svg"
import lista from "../../assets/Icon/list.svg"
import loadMore from "../../assets/Icon/loadMore.svg"

import SizeCheck from "./sizeCheck";

export default function SaleItems() {


  
  return (
    <div className="flex flex-row  gap-8">

      {/* seção do filtro */}
      <section className=" flex flex-col  w-[256px] gap-4 h-[548px]">

        <div className="lg:hidden flex items-end flex-row">
          <img src={filter} className="h-5"/>
          <h1 className="mt-2 text-[16px] font-semibold">Filters</h1>
        </div>

        <h1 className="mt-2 text-[16px] font-semibold">Category</h1>

        {/* seção de categorias */}
        <FieldGroup className="flex  gap-2">

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox className="rounded-full"> </Checkbox>
            <Label>Tops</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox className="rounded-full"> </Checkbox>
            <Label>Bottoms</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox className="rounded-full"> </Checkbox>
            <Label>Dresses</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox className="rounded-full"> </Checkbox>
            <Label>Shoes</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox className="rounded-full"> </Checkbox>
            <Label>Accessories</Label>
          </Field>
        </FieldGroup>

        {/* seção de tamanhos */}
        <h1 className="text-[16px] font-semibold">Sizes</h1>
        <SizeCheck/>

        {/* seção de preço */}
        <h1 className="mt-6 text-[16px] font-semibold">Price range</h1>
        <img src={price}/>
      </section>

      {/* seção para os produtos */}
      <section className="flex flex-col gap-6 ">

        {/* header da seção de items */}
        <div className="flex  flex-col">

          <div className="flex ml-4  flex-col">
            <h1 className="text-2xl font-semibold">Sale Items</h1>
            <span className="text-[#6B7280] text-[16px]">6 products found</span>
          </div>

          <div className="flex justify-end flex-row mt-2">
            <img src={feat} className="mr-4 "/>
            <img src={grade} className="mr-1 "/>
            <img src={lista}/>
          </div>

        </div>

        {/* card de produtos */}
        <section>
          <div className="grid grid-cols-1 ml-4 gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {produtosSale.map((produto, index) => (
              <Card
                key={index}
                className="relative h-[540px]  w-[358px] sm:h-[526px] sm:w-[344px] rounded-b-[12px] pt-0 border-none bg-white text-black shadow-[0_30px_60px_#0f172a1e] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">

                <div className="absolute inset-0 flex items-start justify-start  p-2">
                  <Badge className="bg-[#DC2626] text-white">{produto.badgeD}</Badge>
                </div>

                <div className="absolute inset-0 flex items-start justify-end  p-2">
                  <Badge className="bg-[#F3F4F6] ">{produto.badgeT}</Badge>
                </div>

                <div className="h-[344px] w-full  flex   items-center justify-center">
                  <img src={broken} alt={produto.name} className="sm:h-[344px] h-[358px] w-full object-contain " />
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

                  <div className="flex flec-row  -ml-5">
                    <Button ><img src={add} className="w-[264px] -mr-2 cursor-pointer" /></Button>
                    <Button ><img src={fav}/></Button>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center-safe">
          <Button className=" w-[195px] cursor-pointer hover:-translate-y-1 hover:shadow-2xl mb-5"><img src={loadMore}/></Button>
        </div>

      </section>
    </div>
  )
}
