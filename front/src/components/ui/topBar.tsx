// import { Input } from "../components/input"

import { NavLink } from 'react-router-dom';
import Heart from '../../assets/Icon/heart.svg';
import Search from "../../assets/Icon/search.svg"
import ShoppingBag from '../../assets/Icon/shoppingBag.svg';
import { Input } from './inputSearch';
import { useState, useEffect } from 'react';
import { getUserId } from '../../services/getUserId';
import { getCart } from '../../services/cart';

export default function TopBar() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            const userId = getUserId();
            if (userId) {
                try {
                    const response = await getCart(userId);
                    const count = response.data.reduce((acc: number, item: any) => acc + item.quantity, 0);
                    setCartCount(count);
                } catch (e) {
                    console.error("Failed to fetch cart for TopBar", e);
                }
            } else {
                setCartCount(0);
            }
        };

        fetchCartCount();

        window.addEventListener('cartUpdated', fetchCartCount);
        return () => window.removeEventListener('cartUpdated', fetchCartCount);
    }, []);
    return (
        <div className="sticky top-0 z-50 w-full">

            <div className="hidden md:block">

                <div className="h-[101px] backdrop-blur-xs border-0 border-b-1">

                    {/* barra no topo */}
                    <span className="flex items-center justify-center h-5 text-white text-[14px] bg-[#030711]">
                        Free shipping on orders over $100 | New arrivals daily
                    </span>

                    {/* div para a barra que contem o icons, link para outras abas e etc*/}
                    <div className="flex p-4 md:gap-2 items-center justify-evenly ml-69 md:ml-0 md:mr-0 mr-69  " >


                        <NavLink to="/" className=" flex flex-row gap-2 font-bold">
                            <span className="flex items-center justify-center text-[18px] rounded-[12px] h-8 w-8 bg-[#030711] text-white">S</span>
                            <span className=" text-[20px]"> Style</span>
                        </NavLink>


                        {/* link das outra abas */}
                        <div className="font-[rgba(3, 7, 17, 0.8)] gap-8 flex items-start text-[14px] text-left">

                            <text>New in</text>
                            <text>Women</text>
                            <text>Men</text>
                            <NavLink to="/megaSale">Sale</NavLink> {/*navega para megaSale */}

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

                            <NavLink
                                to="/wishlist"
                                className="flex items-center"
                            >
                                <img
                                    src={Heart}
                                    alt="Favorites"
                                />
                            </NavLink>

                            <span className="mt-3 flex items-center justify-center rounded-full h-8 w-8 bg-[#f3f4f6] text-[14px]">
                                JD
                            </span>

                            <NavLink to="/carrinho" className="flex mb-2 relative">
                                <img
                                    src={ShoppingBag}
                                    alt="Shopping bag"
                                />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#030711] text-[11px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </NavLink>

                        </div>

                    </div>
                </div>
            </div>

            {/* so afeta em tela pequena */}
            <div className=" flex md:hidden flex-col">

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

                        <NavLink to="/" className=" flex flex-row gap-2 font-bold">
                            <span className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-[#030711] text-[18px] text-white">
                                S
                            </span>
                            <span className="text-[20px]">
                                Style
                            </span>
                        </NavLink>





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

                        <NavLink
                            to="/wishlist"
                            className="flex items-center"
                        >
                            <img
                                src={Heart}
                                alt="Favorites"
                            />
                        </NavLink>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] text-[14px]">
                            JD
                        </span>

                        <NavLink to="/carrinho" className="flex mb-2 relative">
                            <img
                                src={ShoppingBag}
                                alt="Shopping bag"
                            />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#030711] text-[11px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                    </div>

                </div>
            </div>

        </div>
    );
}