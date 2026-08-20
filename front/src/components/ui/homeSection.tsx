import shopNow from "../../assets/Icon/buttonShop.svg"
import collection from "../../assets/Icon/collection.svg"
import shipping from "../../assets/Icon/carShipping.svg"
import retorno from "../../assets/Icon/return.svg"
import seguro from "../../assets/Icon/secure.svg"
import view from "../../assets/Icon/viewAll.svg"
import subscribe from "../../assets/Icon/inscrever.svg"


import { Button } from "./button";
import CardCategory from "../ui/cardCategory";
import FeatProduct from "../ui/cardFeatured";
import { Input } from "./inputSearch";

export default function HomeSection(){
    return(
        <>
           {/* gerencia a page em tela grande */}
      <div className="hidden  md:block">

        {/* Hero banner da pagina */}
        <div className="flex items-center justify-center gap-6 flex-col bg-[#F8F8F9]  h-[840px]">

          <h1 className="font-bold bg-linear-to-r from-[#030711] to-[#4C4E56] text-[72px] bg-clip-text text-transparent">Style Redefined</h1>
          <span className="text-[#6b7280] text-[24px] text-center w-[570px]">Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.</span>

          
          <div className="flex cursor-pointer flex-row gap-4">
            
            <Button>
              <img src={shopNow}/>
            </Button>

            <Button><img src={collection}/></Button>

          </div>
        </div>

        {/* icones de vantagens */}
        <div className="flex items-center justify-evenly text-center p-16 flex-row " >

          <div className="flex flex-col items-center justify-center  ">

            <img src={shipping} className="h-16  w-16"/>
            <span className="text-[18px] text-[#030711]">Free Shipping</span>
            <span className="text-[#6b7280] text-[16px]">Free shipping on orders over $100</span>
          </div>

          <div className="flex items-center justify-center flex-col">
            <img src={retorno} className="h-16 w-16"/>
            <span className="text-[18px] text-[#030711]">Easy Returns</span>
            <span className="text-[#6b7280] text-[16px]">30-day hassle-free returns</span>
          </div>

          <div className="flex items-center justify-center flex-col">
            <img src={seguro} className="h-16  w-16"/>
            <span className="text-[18px] text-[#030711]">Secure Payment</span>
            <span className="text-[#6b7280] text-[16px]">Your payment information is safe</span>
          </div>




        </div>
        
        {/* titulo dos card de categorias */}
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-[#030711] text-4xl">Shop by Category</h2>
          <p className="text-[#6b7280] text-[20px]">Explore our carefully curated collections for every style and occasion</p>
        </div>

        
        <CardCategory/>
        

        {/* titulo dos card de produtos da home */}
        <div className="flex flex-col mt-[160px] mb-16 gap-4 text-center">
          <h2 className="text-[#030711] text-4xl">Featured Products</h2>
          <p className="text-[#6b7280] text-[20px]">Handpicked favorites from our latest collection</p>
        </div>

        <FeatProduct />
        
        
        {/* div feito para centralizar o button */}
        <div className="flex items-center justify-center mb-20 mt-10">
          <Button><img src={view} /></Button>
        </div>

          {/* footer da pagina */}
        <div className="bg-[#030711] h-[352px] flex flex-col  items-center justify-center">
          <div className="text-white text-center  ">
          <h2 className="text-4xl mb-2 ">Stay in Style</h2>
          <p className="w-[630px]">Subscribe to our newsletter and be the first to know about new arrivals,exclusive offers, and style tips.</p>
          </div>
          
          <div className="flex flex-row items-center mt-6 gap-5">
            <Input className="bg-white w-[306px] h-[48px]" placeholder="Enter your email"></Input>
            <Button><img src={subscribe}/></Button>
          </div>

        </div>
      </div>

      {/* gerencia a page em tela pequena */}
      <div className=" md:hidden ">
        

        {/* Hero banner da pagina */}
        <div className="flex items-center justify-center gap-6 flex-col bg-[#F8F8F9]  h-[840px]">

          <h1 className="font-bold bg-linear-to-r from-[#030711] to-[#4C4E56] text-[48px] bg-clip-text text-transparent">Style Redefined</h1>
          <span className="text-[#6b7280] text-[20px] text-center w-[343px]">Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.</span>

          
          <div className="flex cursor-pointer flex-col h-[48px] gap-6">
            
            <Button>
              <img src={shopNow} className=""/>
            </Button>

            <Button><img src={collection}/></Button>

          </div>
        </div>

        {/* icones de vantagens */}
        <div className="flex items-center justify-evenly text-center p-15 flex-col gap-8 " >

          <div className="flex flex-col items-center justify-center ">

            <img src={shipping} className="h-16  w-16"/>
            <span className="text-[18px] text-[#030711]">Free Shipping</span>
            <span className="text-[#6b7280] text-[16px]">Free shipping on orders over $100</span>
          </div>

          <div className="flex  items-center justify-center  flex-col">
            <img src={retorno} className="h-16 w-16"/>
            <span className="text-[18px] text-[#030711]">Easy Returns</span>
            <span className="text-[#6b7280] text-[16px]">30-day hassle-free returns</span>
          </div>

          <div className="flex items-center justify-center flex-col">
            <img src={seguro} className="h-16  w-16"/>
            <span className="text-[18px] text-[#030711]">Secure Payment</span>
            <span className="text-[#6b7280] text-[16px]">Your payment information is safe</span>
          </div>




        </div>
        
        {/* titulo dos card de categorias */}
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-[#030711] text-4xl">Shop by Category</h2>
          <p className="text-[#6b7280] text-[20px]">Explore our carefully curated collections for every style and occasion</p>
        </div>

        
        <CardCategory/>
        

        {/* titulo dos card de produtos da home */}
        <div className="flex flex-col mt-[160px] mb-16 gap-4 text-center">
          <h2 className="text-[#030711] text-4xl">Featured Products</h2>
          <p className="text-[#6b7280] text-[20px]">Handpicked favorites from our latest collection</p>
        </div>

        <FeatProduct />
        
        
        {/* div feito para centralizar o button */}
        <div className="cursor-pointer flex items-center justify-center mb-20 mt-10">
          <Button className="cursor-pointer"><img src={view} /></Button>
        </div>

          {/* footer da pagina */}
        <div className="bg-[#030711] px-4 py-[80px] h-[352px] flex flex-col  items-center justify-center">
          <div className="text-white  text-center  ">
          <h2 className="text-4xl font-semibold mb-2 ">Stay in Style</h2>
          <p className="w-[358px]">Subscribe to our newsletter and be the first to know about new arrivals,exclusive offers, and style tips.</p>
          </div>
          
          <div className="flex flex-col items-center mt-6 gap-4">
            <Input className="bg-white w-[358.44px] h-[48px]" placeholder="Enter your email"></Input>
            <Button className="cursor-pointer bg-white border-none h-12 w-[358.44px]">Subscribe</Button>
          </div>

        </div>
      </div> 
        </>
    )
}