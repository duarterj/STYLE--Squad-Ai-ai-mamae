import TopBar from "../../components/topBar"

import shopNow from "../../assets/Icon/buttonShop.svg"
import collection from "../../assets/Icon/collection.svg"
import shipping from "../../assets/Icon/carShipping.svg"
import retorno from "../../assets/Icon/return.svg"
import seguro from "../../assets/Icon/secure.svg"


import { Button } from "../../components/ui/button";
import CardCategory from "../../components/cardCategory";


function Home() {
  return(
    <div className="font-segoe">
      <TopBar/>

      <div
        className="flex items-center justify-center gap-6 flex-col bg-[#F8F8F9]  h-[840px]"
        
      >

        <h1 className="font-bold text-[72px]">Style Redefined</h1>
        <span className="text-[#6b7280] text-[24px] text-center w-[570px]">Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.</span>

        
        <div className="flex cursor-pointer flex-row gap-4">
          
          <Button>
            <img src={shopNow}/>
          </Button>

          <Button><img src={collection}/></Button>

        </div>



        

      </div>

      <div className="flex items-center justify-evenly text-center p-16 flex-row md:mr-5 " >

        <div className="flex flex-col  ">

          <img src={shipping} className="h-16 ml-23 w-16"/>
          <text className="text-[18px] text[#030711]">Free Shipping</text>
          <text className="text-[#6b7280] text-[16px]">Free shipping on orders over $100</text>
        </div>

        <div className="flex flex-col">
          <img src={retorno} className="h-16 ml-15 w-16"/>
          <text className="text-[18px] text[#030711]">Easy Returns</text>
          <text className="text-[#6b7280] text-[16px]">30-day hassle-free returns</text>
        </div>

        <div className="flex flex-col">
          <img src={seguro} className="h-16 ml-20 w-16"/>
          <text className="text-[18px] text[#030711]">Secure Payment</text>
          <text className="text-[#6b7280] text-[16px]">Your payment information is safe</text>
        </div>




      </div>
      
      <div className="flex flex-col gap-4 text-center">
        <text className="text-[#030711] text-4xl">Shop by Category</text>
        <text className="text-[#6b7280] text-[20px]">Explore our carefully curated collections for every style and occasion</text>
      </div>

      <div>
        <CardCategory/>
      </div>

      <div className="flex flex-col mt-[160px] gap-4 text-center">
        <text className="text-[#030711] text-4xl">Featured Products</text>
        <text className="text-[#6b7280] text-[20px]">Handpicked favorites from our latest collection</text>
      </div>


    </div>
    
    )


}

export default Home;
