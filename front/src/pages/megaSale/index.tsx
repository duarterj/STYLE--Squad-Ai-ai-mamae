import TopBar from "../../components/topBar"
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/inputSearch";
import { Checkbox } from "../../components/ui/checkbox";
import { Field, FieldGroup } from "../../components/ui/field";
import { Label } from "../../components/ui/label";

import subscribe from "../../assets/Icon/inscrever.svg"
import freeShiping from "../../assets/Icon/freeShiping.svg"
import offMembers from "../../assets/Icon/extraforMembers.svg"
import price from "../../assets/Icon/combobox.svg"
import feat from "../../assets/Icon/combobox2.svg"
import grade from "../../assets/Icon/grid.svg"
import lista from "../../assets/Icon/list.svg"

import SizeCheck from "../../components/sizeCheck";
import SaleItems from "../../components/cardSale";


export default function MegaSale(){
    return(
        <div >
            <TopBar/>

            {/* hero Banner da pagina */}
            <div className="flex items-center justify-center gap-6 flex-col bg-gradient-to-r from-[#ef4444] to-[#db2777]  h-[398px] ">

                <h1 className="font-bold text-white text-[72px]">MEGA SALE</h1>
                <span className="text-white text-[24px] text-center w-[570px]">Up to 70% off on selected items. Limited time offer - don't miss out!</span>

                
                <div className="flex cursor-pointer flex-row gap-4">
                
                <Button>
                    <img src={freeShiping}/>
                </Button>

                <Button><img src={offMembers}/></Button>

                </div>
            </div>

            {/* info da megaSale*/}
            <div className="flex items-center justify-evenly text-center py-[48px] px-[278px] flex-row sm:gap-5 sm:ml-0 md:mr-5 " >

                <div className="flex flex-col  ">
                    <span className="text-[30px] text-[#dc2626] ">70%</span>
                    <span className="text-[#6b7280] text-[14px]">Max Discount</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[30px] text-[#dc2626]">500+</span>
                    <span className="text-[#6b7280] text-[14px]">Items on Sale</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[30px] text-[#dc2626]">48h</span>
                    <span className="text-[#6b7280] text-[14px]">Time Left</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-[30px] text-[#dc2626]">Free</span>
                    <span className="text-[#6b7280] text-[14px]">Shipping</span>
                </div>

            </div>


            <div className="flex flex-row gap-8 ">

                {/* seção para check com filtros */}
                <section className=" flex flex-col ml-[276px] w-[256px] gap-6 h-[1248px]">

                    <h1 className="mt-6 text-[16px] font-semibold">Category</h1>

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
                <section className="flex flex-col gap-6 h-[1248px] w-[1080px]">

                    {/* header da seção de items */}
                    <div className="flex flex-row">

                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold">Sale Items</h1>  
                            <span className="text-[#6B7280] text-[16px]">6 products found</span>
                        </div>

                        <div className="flex flex-row items-end ml-auto max-w-full">
                            <img src={feat} className="mr-4 "/>
                            <img src={grade} className="mr-1 "/>
                            <img src={lista}/>
                        </div>


                    </div>
                    
                    <SaleItems/>

                </section>
            </div>


            {/* footer da pagina */}
            <div className="bg-gradient-to-r from-[#ef4444] to-[#db2777] h-[352px] flex flex-col  items-center justify-center mt-7">
                <div className="text-white text-center  ">
                    <h2 className="text-4xl font-semibold mb-2 ">Don't Miss Future Sales!</h2>
                    <p className="w-[630px]">Subscribe to our newsletter and be the first to know about exclusive sales and special offers.</p>
                </div>
                
                <div className="flex flex-row items-center mt-6 gap-5">
                    <Input className="bg-white w-[306px] h-[48px]" placeholder="Enter your email"></Input>
                    <Button><img src={subscribe}/></Button>
                </div>

            </div>
        </div>
    )
}