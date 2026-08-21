import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/inputSearch";


import subscribe from "../../assets/Icon/inscrever.svg"
import freeShiping from "../../assets/Icon/freeShiping.svg"
import offMembers from "../../assets/Icon/extraforMembers.svg"

import SaleItems from "./saleItemsSection";

export default function MegaSaleSection(){
    return(
        <>
            {/* gerencia a page em tela grande */}
            <div className="hidden  md:block">

                {/* hero Banner da pagina */}
                <div className="flex items-center justify-center gap-6 flex-col bg-gradient-to-r from-[#ef4444] to-[#db2777]  h-[398px] ">

                    <h1 className="font-bold text-white text-[72px]">MEGA SALE</h1>
                    <span className="text-white text-[24px] text-center w-[570px]">Up to 70% off on selected items. Limited time offer - don't miss out!</span>

                    <div className="flex  flex-row gap-4">
                    
                    <Button className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl">
                        <img src={freeShiping}/>
                    </Button>

                    <Button className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl"><img src={offMembers}/></Button>

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


                {/* seção dos produtos em promoção */}
                <div className="flex items-center justify-center">
                    <SaleItems/>
                </div>


                {/* footer da pagina */}
                <div className="bg-gradient-to-r from-[#ef4444] to-[#db2777] h-[352px] flex flex-col  items-center justify-center mt-7">
                    <div className="text-white text-center  ">
                        <h2 className="text-4xl font-semibold mb-2 ">Don't Miss Future Sales!</h2>
                        <p className="w-[630px]">Subscribe to our newsletter and be the first to know about exclusive sales and special offers.</p>
                    </div>
                    
                    <div className="flex flex-row items-center mt-6 gap-5">
                        <Input className="bg-white w-[306px] h-[48px]" placeholder="Enter your email"></Input>
                        <Button className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl"><img src={subscribe}/></Button>
                    </div>
                </div>
            </div>

            {/* gerencia a page em tela pequena */}
            <div className=" md:hidden ">

                {/* hero Banner da pagina */}
                <div className="flex items-center justify-center gap-6 flex-col bg-gradient-to-r from-[#ef4444] to-[#db2777]  h-[398px] ">

                    <h1 className="font-bold text-white text-[48px]">MEGA SALE</h1>
                    <span className="text-white text-[20px] text-center w-[358px]">Up to 70% off on selected items. Limited time offer - don't miss out!</span>

                    <div className="flex  flex-col gap-6">
                    
                    <Button className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl">
                        <img src={freeShiping}/>
                    </Button>

                    <Button className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl"><img src={offMembers}/></Button>

                    </div>
                </div>

                {/* info da megaSale*/}
                <div className=" grid grid-cols-2 flex items-center justify-evenly text-center py-[48px]  flex-row  ml-0  " >

                    <div className="flex flex-col  ">
                        <span className="text-[30px] font-semibold text-[#dc2626] ">70%</span>
                        <span className="text-[#6b7280] text-[14px]">Max Discount</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[30px] font-semibold  text-[#dc2626]">500+</span>
                        <span className="text-[#6b7280] text-[14px]">Items on Sale</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[30px] font-semibold  text-[#dc2626]">48h</span>
                        <span className="text-[#6b7280] text-[14px]">Time Left</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[30px] font-semibold  text-[#dc2626]">Free</span>
                        <span className="text-[#6b7280] text-[14px]">Shipping</span>
                    </div>

                </div>

                {/* seção dos produtos em promoção */}
                <SaleItems/>


                {/* footer da pagina */}
                <div className="bg-gradient-to-r from-[#ef4444] to-[#db2777] h-[352px] flex flex-col   items-center justify-center mt-4">
                    <div className="text-white text-center  ">
                        <h2 className="text-3xl font-semibold mb-2 ">Don't Miss Future Sales!</h2>
                        <p className="w-[358px]">Subscribe to our newsletter and be the first to know about exclusive sales and special offers.</p>
                    </div>
                    
                    <div className="flex flex-col items-center mt-6 gap-5">
                        <Input className="bg-white w-[358.44px] h-[48px]" placeholder="Enter your email"></Input>
                        <Button className="cursor-pointer hover:-translate-y-1 hover:shadow-2xl font-semibold bg-white border-none h-12 w-[358.44px]">Subscribe</Button>
                    </div>
                </div>
            </div>
        </>

    )
    
}