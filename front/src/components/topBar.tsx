import Heart from "../assets/Icon/heart.svg";
import Search from "../assets/Icon/search.svg";
import ShoppingBag from "../assets/Icon/shoppingBag.svg";
import { Input } from "./ui/inputSearch";

export default function TopBar() {
    return (
        <div className="sticky top-0 z-50 w-full">

            <div className="hidden md:block">

                <div className="h-[101px] backdrop-blur-xs border-0 border-b-1">

                    {/* barra no topo */}
                    <span className="flex items-center justify-center h-5 text-white text-[14px] bg-[#030711]">
                        Free shipping on orders over $100 | New arrivals daily
                    </span>

                    {/* div para a barra que contem o icons, link para outras abas e etc*/}
                    <div className="flex p-4 md:gap-2 items-center justify-evenly ml-69 md:ml-0 md:mr-0 mr-69">

                        <div className="flex flex-row gap-2 font-bold">

                            <span className="flex items-center justify-center text-[18px] rounded-[12px] h-8 w-8 bg-[#030711] text-white">
                                S
                            </span>

                            <span className="text-[20px]">
                                Style
                            </span>

                        </div>

                        {/* link das outra abas */}
                        <div className="font-[rgba(3, 7, 17, 0.8)] gap-8 flex items-start text-[14px] text-left">

                            <span>New in</span>
                            <span>Women</span>
                            <span>Men</span>
                            <span>Sale</span>

                        </div>

                        {/* barra de pesquisa */}
                        <div className="mr-8 flex flex-row rounded-[10px] bg-[#F9FAFB] shadow-[#000000] border-solid border-[#e5e7eb] bg-[#f3f4f6] w-[384px] text-left">

                            <img
                                src={Search}
                                className="ml-2"
                                alt="Search"
                            />

                            <Input
                                className="p-2"
                                placeholder="Search for products..."
                            />

                        </div>

                        {/* icones do final */}
                        <div className="flex flex-row align-middle">

                            <img
                                src={Heart}
                                alt="Favorites"
                            />

                            <span className="mt-2 flex items-center justify-center rounded-full h-8 w-8 bg-[#f3f4f6] text-[14px]">
                                JD
                            </span>

                            <img
                                src={ShoppingBag}
                                alt="Shopping bag"
                            />

                        </div>

                    </div>
                </div>
            </div>

            <div className="flex md:hidden flex-col">

                {/* barra no topo */}
                <span className="flex h-5 items-center justify-center bg-[#030711] px-2 text-center text-[10px] text-white">
                    Free shipping on orders over $100 | New arrivals daily
                </span>

                <div className="flex h-[76px] w-full items-center justify-between px-4 border-b border-[#e5e7eb] bg-white">

                    <button
                        type="button"
                        className="flex h-8 w-8 flex-col items-center justify-center gap-1"
                        aria-label="Menu"
                    >
                        <span className="h-[2px] w-5 bg-[#030711]" />
                        <span className="h-[2px] w-5 bg-[#030711]" />
                        <span className="h-[2px] w-5 bg-[#030711]" />
                    </button>

                    <div className="flex items-center gap-2 font-bold">

                        <span className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-[#030711] text-[18px] text-white">
                            S
                        </span>

                        <span className="text-[20px]">
                            Style
                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center"
                            aria-label="Search"
                        >
                            <img
                                src={Search}
                                alt="Search"
                            />
                        </button>

                        <img
                            src={Heart}
                            alt="Favorites"
                        />

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] text-[14px]">
                            JD
                        </span>

                        <img
                            src={ShoppingBag}
                            alt="Shopping bag"
                        />

                    </div>

                </div>
            </div>

        </div>
    );
}