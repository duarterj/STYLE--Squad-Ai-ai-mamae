// import { Input } from "../components/input"

import  Heart  from '../assets/Icon/heart.svg';
import Search from "../assets/Icon/search.svg"
import  ShoppingBag  from '../assets/Icon/shoppingBag.svg';
import { Input } from './ui/inputSearch';

export default function TopBar(){
    return(

        <div className="h-[101px] border-0 border-b-1">

            {/* barra no topo */}
            <span className="flex items-center justify-center h-5 text-white text-[14px] bg-[#030711]">Free shipping on orders over $100 | New arrivals daily</span>

            {/* div para a barra que contem o icons, link para outras abas e etc*/}
            <div className="flex p-4 md:gap-2 items-center justify-evenly ml-69 md:ml-0 md:mr-0 mr-69  " >
                
                <div className=" flex flex-row gap-2 font-bold">
                    
                    <span className="flex items-center justify-center text-[18px] rounded-[12px] h-8 w-8 bg-[#030711] text-white">S</span>
                    <span className=" text-[20px]"> Style</span>
                </div>

                {/* link das outra abas */}
                <div className=" font-[rgba(3, 7, 17, 0.8)]  gap-8 flex items-start text-[14px] text-left ">

                    <text>New in</text>
                    <text>Women</text>
                    <text>Men</text>
                    <text>Sale</text>

                </div>

                {/* barra de pesquisa */}
                <div className="flex flex-row rounded-[10px] border-solid border-[#e5e7eb]  bg-[#f3f4f6] w-[384px] text-left">

                    <img src={Search} className="ml-2"/>
                    <Input className="  p-2" placeholder="Search for products..."></Input>

                </div>

                {/* icones do final */}
                <div className="flex flex-row">

                    <img src={Heart}/>

                    <span className="flex items-center justify-center  rounded-full h-8 w-8 bg-[#f3f4f6] text-[14px]">JD</span>

                    <img src={ShoppingBag}/> 
                
                </div>

            </div>
            

            
        </div>

    )
}