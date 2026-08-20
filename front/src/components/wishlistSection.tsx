import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    ArrowLeft,
    Share2,
    ShoppingBag,
    Trash2,
    Heart,
    Bell,
    Star,
} from "lucide-react"

import broken from "../assets/Icon/categoryBroke.svg"

type WishlistItem = {
    id: number
    brand: string
    name: string
    rate: number
    reviews: number
    preco: string
    precoOld: string
    discount: string
    tag: string
    addedDate: string
    outOfStock?: boolean
}

type RecommendedItem = {
    id: number
    name: string
    rate: number
    preco: string
}

// Isso daqui eu preciso trocar pra quando eu for integrar com o back
const wishlistItems: WishlistItem[] = [
    {
        id: 1,
        brand: "STYLE Premium",
        name: "Premium Cotton T-Shirt",
        rate: 4.8,
        reviews: 124,
        preco: "$29",
        precoOld: "$49",
        discount: "-41%",
        tag: "Limited Time",
        addedDate: "14/01/2024",
    },
    {
        id: 2,
        brand: "STYLE Luxury",
        name: "Cashmere Sweater",
        rate: 4.8,
        reviews: 156,
        preco: "$120",
        precoOld: "$200",
        discount: "-40%",
        tag: "Luxury Sale",
        addedDate: "09/01/2024",
    },
    {
        id: 3,
        brand: "STYLE Sport",
        name: "Athletic Sneakers",
        rate: 4.5,
        reviews: 234,
        preco: "$84",
        precoOld: "$140",
        discount: "-40%",
        tag: "Sport Sale",
        addedDate: "04/01/2024",
        outOfStock: true,
    },
]

const recommendedItems: RecommendedItem[] = [
    { id: 1, name: "Recommended Item 1", rate: 4.6, preco: "$39" },
    { id: 2, name: "Recommended Item 2", rate: 4.7, preco: "$49" },
    { id: 3, name: "Recommended Item 3", rate: 4.8, preco: "$59" },
    { id: 4, name: "Recommended Item 4", rate: 4.9, preco: "$69" },
]

export default function WishlistSection() {
    const navigate = useNavigate()

    const [items, setItems] = useState<WishlistItem[]>(wishlistItems)

    const [notifiedItems, setNotifiedItems] = useState<number[]>([])

    const handleNotify = (itemId: number) => {
        setNotifiedItems((current) => {
            if (current.includes(itemId)) {
                return current.filter((id) => id !== itemId)
            }

            return [...current, itemId]
        })
    }

    const handleRemove = (itemId: number) => {
        setItems((current) =>
            current.filter((item) => item.id !== itemId)
        )
    }

    const handleClearWishlist = () => {
        setItems([])
    }

    return (
        <div className="w-full">
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-350
                    flex-col
                    items-start
                    gap-8
                    px-4
                    py-8
                "
            >
                {/* Header my wishlist */}
                <div
                    className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                    "
                >
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="text-gray-500 transition-colors hover:text-black"
                            aria-label="Voltar"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div>
                            <h1 className="text-2xl font-bold text-black sm:text-3xl">
                                My Wishlist
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {items.length} items saved
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="flex shrink-0 items-center gap-2 border-gray-300 text-black"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </div>

                {/* Ações com os produtos da wishlist */}
                <div
                    className="
                        flex
                        w-full
                        flex-wrap
                        items-start
                        content-start
                        gap-4
                    "
                >
                    <Button className="flex items-center gap-2 border-gray-300 text-black">
                        <ShoppingBag className="h-4 w-4" />
                        Add All to Cart
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClearWishlist}
                        className="flex items-center gap-2 border-gray-300 text-black"
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear Wishlist
                    </Button>
                </div>

                {/* Wishlist */}
                {items.length === 0 ? (
                    <div
                        className="
                            flex
                            min-h-100
                            w-full
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            px-6
                            py-16
                            text-center
                            shadow-[0_30px_60px_#0f172a1e]
                        "
                    >
                        <Heart className="mb-4 h-12 w-12 text-gray-300" />

                        <h2 className="text-xl font-bold text-black">
                            Your Wishlist is Empty
                        </h2>

                        <p className="mt-2 max-w-md text-sm text-gray-500">
                            You don't have any items in your wishlist yet.
                        </p>

                        <Button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-6 bg-black text-white hover:bg-black/90"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <div
                        className="
                            grid
                            w-full
                            min-h-126.5
                            grid-cols-1
                            content-start
                            justify-center
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                            lg:pr-87
                        "
                    >
                        {items.map((item) => (
                            <Card
                                key={item.id}
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border-none
                                    bg-white
                                    text-black
                                    shadow-[0_30px_60px_#0f172a1e]
                                    transition-transform
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-2xl
                                "
                            >
                                {/* Imagem */}
                                <div
                                    className={`relative flex h-55 w-full items-center justify-center ${item.outOfStock
                                        ? "bg-gray-300"
                                        : "bg-gray-100"
                                        }`}
                                >
                                    <img
                                        src={broken}
                                        alt={item.name}
                                        className={`h-16 w-16 object-contain ${item.outOfStock
                                            ? "opacity-40"
                                            : "opacity-60"
                                            }`}
                                    />

                                    {/* Badges dos cards */}
                                    <div className="absolute left-3 top-3 flex flex-col items-start gap-1">
                                        <Badge className="rounded-full bg-[#DC2626] px-2 py-1 text-xs text-white">
                                            {item.discount}
                                        </Badge>

                                        <span className="rounded-full bg-gray-100 px-2.75 py-0.75 text-xs font-semibold leading-4 text-slate-950">
                                            {item.tag}
                                        </span>

                                        {item.outOfStock && (
                                            <Badge className="rounded-full bg-[#DC2626] px-2 py-1 text-xs text-white">
                                                Out of Stock
                                            </Badge>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="
                                            absolute
                                            right-3
                                            top-3
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white
                                            text-red-600
                                            shadow
                                        "
                                        aria-label="Remover dos favoritos"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        <Heart className="h-4 w-4 fill-current" />
                                    </button>

                                    {item.outOfStock && (
                                        <div className="absolute inset-x-0 bottom-4 flex justify-center">
                                            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black shadow">
                                                Notify when available
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Informações do produto */}
                                <div className="flex flex-col gap-2 p-4">
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="        
                                            rounded-full       
                                            border       
                                            border-[#E5E7EB]        
                                            px-2      
                                            py-0.5        
                                            text-[#030711]        
                                            font-semibold
                                            leading-4
                                            "

                                            style={{
                                                fontFamily: '"Segoe UI"',
                                                fontSize: "12px",
                                                fontStyle: "normal",
                                                lineHeight: "16px",
                                            }}
                                        >
                                            {item.brand}
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

                                            <span className="text-xs font-medium">
                                                {item.rate}
                                            </span>

                                            <span className="text-xs text-gray-400">
                                                ({item.reviews})
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-base font-semibold">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold">
                                            {item.preco}
                                        </span>

                                        <span className="text-sm text-gray-400 line-through">
                                            {item.precoOld}
                                        </span>
                                    </div>

                                    <span className="text-xs text-gray-400">
                                        Added {item.addedDate}
                                    </span>

                                    <div className="mt-2 flex flex-col gap-2">
                                        {item.outOfStock ? (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            handleNotify(item.id)
                                                        }
                                                        variant="outline"
                                                        className={`flex flex-1 items-center justify-center gap-2 ${notifiedItems.includes(item.id)
                                                            ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                                                            : "border-[#6B7280] bg-[#6B7280] text-white hover:bg-[#6B7280]"
                                                            }`}
                                                    >
                                                        <Bell className="h-4 w-4" />

                                                        {notifiedItems.includes(
                                                            item.id
                                                        )
                                                            ? "Notification Saved"
                                                            : "Notify Me"}
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleRemove(item.id)
                                                        }
                                                        className="border-gray-300 text-gray-500"
                                                        aria-label="Remover item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                {notifiedItems.includes(
                                                    item.id
                                                ) && (
                                                        <p className="text-xs leading-4 text-gray-500">
                                                            Saved! We'll email you
                                                            when this item is back
                                                            in stock.
                                                        </p>
                                                    )}
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Button className="flex flex-1 items-center justify-center gap-2 bg-black text-white hover:bg-black/90">
                                                    <ShoppingBag className="h-4 w-4" />
                                                    Add to Cart
                                                </Button>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleRemove(item.id)
                                                    }
                                                    className="border-gray-300 text-gray-500"
                                                    aria-label="Remover item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Recomendados */}
                <div
                    className="
                        flex
                        w-full
                        flex-col
                        items-start
                        gap-8
                        pt-8
                    "
                >
                    <h2 className="text-xl font-bold text-black">
                        You Might Also Like
                    </h2>

                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {recommendedItems.map((item) => (
                            <Card
                                key={item.id}
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border-none
                                    bg-white
                                    text-black
                                    shadow-[0_30px_60px_#0f172a1e]
                                    transition-transform
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-2xl
                                "
                            >
                                <div className="flex h-55 w-full items-center justify-center bg-gray-100">
                                    <img
                                        src={broken}
                                        alt={item.name}
                                        className="h-16 w-16 object-contain opacity-60"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 p-4">
                                    <h3 className="text-sm font-semibold">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

                                        <span className="text-xs font-medium">
                                            {item.rate}
                                        </span>
                                    </div>

                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-base font-bold">
                                            {item.preco}
                                        </span>

                                        <Button
                                            variant="outline"
                                            className="border-gray-300 text-xs text-black"
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}