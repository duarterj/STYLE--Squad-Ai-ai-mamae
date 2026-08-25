import { useState, useEffect } from "react"
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
    Loader2,
} from "lucide-react"
import broken from "../../assets/Icon/categoryBroke.svg"
import { getWishlist, removeFromWishlist } from "../../services/wishlist"
import { getUserId } from "../../services/getUserId"

type WishlistProduct = {
    id: number
    name: string
    brand: string | null
    description: string
    price: string
    salePrice: string | null
    pathImage: string | null
    category: string
    rating: number
    ratingCount: number
}

type WishlistItem = {
    userId: number
    productId: number
    addedAt: string
    product: WishlistProduct
}

type RecommendedItem = {
    id: number
    name: string
    rate: number
    preco: string
}

const recommendedItems: RecommendedItem[] = [
    { id: 1, name: "Recommended Item 1", rate: 4.6, preco: "$39" },
    { id: 2, name: "Recommended Item 2", rate: 4.7, preco: "$49" },
    { id: 3, name: "Recommended Item 3", rate: 4.8, preco: "$59" },
    { id: 4, name: "Recommended Item 4", rate: 4.9, preco: "$69" },
]

function formatPrice(value: string | number): string {
    return `$${Number(value).toFixed(2)}`
}

function calcDiscount(price: string, salePrice: string | null): string | null {
    if (!salePrice) return null
    const original = Number(price)
    const sale = Number(salePrice)
    if (original <= 0 || sale >= original) return null
    const pct = Math.round((1 - sale / original) * 100)
    return `-${pct}%`
}

function formatDate(isoDate: string): string {
    const date = new Date(isoDate)
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

export default function WishlistSection() {
    const navigate = useNavigate()

    const [items, setItems] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [removingIds, setRemovingIds] = useState<number[]>([])
    const [notifiedItems, setNotifiedItems] = useState<number[]>([])

    const handleNotify = (productId: number) => {
        setNotifiedItems((current) => {
            if (current.includes(productId)) {
                return current.filter((id) => id !== productId)
            }

            return [...current, productId]
        })
    }

    const userId = getUserId()

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return
        }

        async function fetchWishlist() {
            try {
                const response = await getWishlist(userId!)
                setItems(response.data)
            } catch {
                setError("Erro ao carregar a wishlist.")
            } finally {
                setLoading(false)
            }
        }

        fetchWishlist()
    }, [userId])

    const handleRemove = async (productId: number) => {
        if (!userId) return

        setRemovingIds((prev) => [...prev, productId])

        try {
            await removeFromWishlist(userId, productId)
            setItems((current) =>
                current.filter((item) => item.productId !== productId)
            )
        } catch {
            setError("Erro ao remover item da wishlist.")
        } finally {
            setRemovingIds((prev) => prev.filter((id) => id !== productId))
        }
    }

    const handleClearWishlist = async () => {
        if (!userId || items.length === 0) return

        try {
            await Promise.all(
                items.map((item) => removeFromWishlist(userId, item.productId))
            )
            setItems([])
        } catch {
            setError("Erro ao limpar a wishlist.")
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-100 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        )
    }

    if (!userId) {
        return (
            <div className="flex min-h-100 w-full flex-col items-center justify-center px-6 py-16 text-center">
                <Heart className="mb-4 h-12 w-12 text-gray-300" />
                <h2 className="text-xl font-bold text-black">
                    Sign in to view your Wishlist
                </h2>
                <p className="mt-2 max-w-md text-sm text-gray-500">
                    You need to be logged in to access your wishlist.
                </p>
                <Button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-6 bg-black text-white hover:bg-black/90"
                >
                    Sign In
                </Button>
            </div>
        )
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

                {error && (
                    <div className="w-full rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

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
                        {items.map((item) => {
                            const { product } = item
                            const discount = calcDiscount(product.price, product.salePrice)
                            const displayPrice = product.salePrice
                                ? formatPrice(product.salePrice)
                                : formatPrice(product.price)
                            const originalPrice = product.salePrice
                                ? formatPrice(product.price)
                                : null
                            const isRemoving = removingIds.includes(item.productId)

                            return (
                                <Card
                                    key={item.productId}
                                    className={`
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
                                        ${isRemoving ? "pointer-events-none opacity-50" : ""}
                                    `}
                                >
                                    <div
                                        className="relative flex h-55 w-full items-center justify-center bg-gray-100"
                                    >
                                        <img
                                            src={product.pathImage || broken}
                                            alt={product.name}
                                            className={`object-contain ${product.pathImage ? "h-full w-full object-cover" : "h-16 w-16 opacity-60"}`}
                                        />

                                        <div className="absolute left-3 top-3 flex flex-col items-start gap-1">
                                            {discount && (
                                                <Badge className="rounded-full bg-[#DC2626] px-2 py-1 text-xs text-white">
                                                    {discount}
                                                </Badge>
                                            )}

                                            <span className="rounded-full bg-gray-100 px-2.75 py-0.75 text-xs font-semibold leading-4 text-slate-950">
                                                {product.category}
                                            </span>
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
                                            onClick={() => handleRemove(item.productId)}
                                        >
                                            <Heart className="h-4 w-4 fill-current" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2 p-4">
                                        <div className="flex items-center justify-between">
                                            {product.brand && (
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
                                                    {product.brand}
                                                </span>
                                            )}

                                            <div className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

                                                <span className="text-xs font-medium">
                                                    {product.rating}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    ({product.ratingCount})
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-base font-semibold">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold">
                                                {displayPrice}
                                            </span>

                                            {originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    {originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        <span className="text-xs text-gray-400">
                                            Added {formatDate(item.addedAt)}
                                        </span>

                                        <div className="mt-2 flex flex-col gap-2">
                                            {product.salePrice && Number(product.salePrice) === 0 ? (
                                                <>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                handleNotify(item.productId)
                                                            }
                                                            variant="outline"
                                                            className={`flex flex-1 items-center justify-center gap-2 ${notifiedItems.includes(item.productId)
                                                                ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                                                                : "border-[#6B7280] bg-[#6B7280] text-white hover:bg-[#6B7280]"
                                                                }`}
                                                        >
                                                            <Bell className="h-4 w-4" />

                                                            {notifiedItems.includes(
                                                                item.productId
                                                            )
                                                                ? "Notification Saved"
                                                                : "Notify Me"}
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleRemove(item.productId)
                                                            }
                                                            className="border-gray-300 text-gray-500"
                                                            aria-label="Remover item"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {notifiedItems.includes(
                                                        item.productId
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
                                                            handleRemove(item.productId)
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
                            )
                        })}
                    </div>
                )}

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