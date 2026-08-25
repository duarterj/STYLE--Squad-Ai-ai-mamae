import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    ArrowLeft,
    Tag,
    AlertCircle,
    Heart,
    Trash2,
    Minus,
    Plus,
    Image as ImageIcon,
} from 'lucide-react';

import {
    getCart,
    updateCartQuantity,
    removeFromCart,
} from '../../services/cart';

import { addToWishlist } from '../../services/wishlist';

import { getUserId } from '../../services/getUserId';

const PROMO_CODES: Record<string, number> = {
    SAVE10: 0.1,
    WELCOME20: 0.2,
    STUDENT15: 0.15,
};

export interface CartItemResponse {
    userId: number;
    variantId: number;
    quantity: number;

    variant: {
        id: number;
        color: string;
        size: string;
        stock: number;
        productId: number;

        product: {
            id: number;
            name: string;
            brand: string | null;
            description: string;
            price: string;
            salePrice: string | null;
            pathImage: string | null;
            category: string;
            collection: string | null;
            rating: number;
            ratingCount: number;
            isActive: boolean;
        };
    };
}

interface CartItemProps {
    item: CartItemResponse;
    onRemove: (variantId: number) => void;
    onSaveForLater: (productId: number, variantId: number) => void;
}

interface AvailableItemProps extends CartItemProps {
    onQuantityChange: (
        variantId: number,
        delta: number,
        currentQuantity: number
    ) => void;
    isUpdating: boolean;
}

interface OutOfStockProps extends CartItemProps {
    onNotify: (variantId: number) => void;
    notified: boolean;
}

function ItemThumbnail({
    outOfStock = false,
    imagePath = '',
}: {
    outOfStock?: boolean;
    imagePath?: string | null;
}) {
    return (
        <div className="relative flex h-[84px] w-[84px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-gray-100">
            {outOfStock && (
                <span className="absolute left-1.5 right-1.5 z-10 rounded-[5px] bg-red-400 px-1 py-[3px] text-center text-[10px] font-semibold text-white">
                    Out of Stock
                </span>
            )}

            {imagePath ? (
                <img
                    src={`http://localhost:3333/uploads/${imagePath}`}
                    alt="product"
                    className={`h-full w-full object-cover ${outOfStock ? 'opacity-50' : ''
                        }`}
                />
            ) : (
                <ImageIcon
                    size={20}
                    strokeWidth={1.5}
                    className="text-gray-300"
                />
            )}
        </div>
    );
}

function AvailableItemRow({
    item,
    onQuantityChange,
    onRemove,
    onSaveForLater,
    isUpdating,
}: AvailableItemProps) {
    const originalPrice = Number(item.variant.product.price);

    const salePrice = item.variant.product.salePrice
        ? Number(item.variant.product.salePrice)
        : originalPrice;

    const save = originalPrice - salePrice;

    return (
        <div className="flex w-full flex-col gap-4 px-6 py-5 sm:flex-row">
            <ItemThumbnail imagePath={item.variant.product.pathImage} />

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-row items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="m-0 text-[16px] font-semibold text-gray-900 sm:text-[15px]">
                            {item.variant.product.name}
                        </p>

                        <p className="m-0 mt-0.5 font-['Segoe_UI'] text-[15px] font-normal leading-[20px] text-[#6B7280] sm:text-[14px]">
                            {item.variant.product.collection}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[16px] font-bold text-gray-900 sm:text-[15px]">
                                ${salePrice.toFixed(2)}
                            </span>

                            {save > 0 && (
                                <span className="text-[14px] text-gray-400 line-through sm:text-[13px]">
                                    ${originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {save > 0 && (
                            <span className="w-fit rounded-full bg-red-600 px-2 py-0.5 text-[12px] font-semibold text-white sm:text-[11px]">
                                Save ${save.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                <p className="m-0 font-['Segoe_UI'] text-[15px] font-normal leading-[20px] text-[#6B7280] sm:text-[14px]">
                    Size: {item.variant.size}{' '}
                    <span className="ml-3">
                        Color: {item.variant.color}
                    </span>
                </p>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-[10px] border border-[#E5E7EB] p-[1px]">
                            <button
                                type="button"
                                className="flex h-[26px] w-[26px] items-center justify-center rounded-md border-0 bg-white text-gray-700 hover:enabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() =>
                                    onQuantityChange(
                                        item.variantId,
                                        -1,
                                        item.quantity
                                    )
                                }
                                disabled={
                                    item.quantity <= 1 || isUpdating
                                }
                                aria-label={`Diminuir quantidade de ${item.variant.product.name}`}
                            >
                                <Minus size={13} />
                            </button>

                            <span className="min-w-[16px] px-3 text-center font-['Segoe_UI'] text-[16px] font-normal leading-[24px] text-[#030711]">
                                {item.quantity}
                            </span>

                            <button
                                type="button"
                                className="flex h-[26px] w-[26px] items-center justify-center rounded-md border-0 bg-white text-gray-700 hover:enabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() =>
                                    onQuantityChange(
                                        item.variantId,
                                        1,
                                        item.quantity
                                    )
                                }
                                disabled={
                                    item.quantity >= item.variant.stock ||
                                    isUpdating
                                }
                                aria-label={`Aumentar quantidade de ${item.variant.product.name}`}
                            >
                                <Plus size={13} />
                            </button>
                        </div>

                        <span className="ml-1 text-xs text-gray-400">
                            Max {item.variant.stock}
                        </span>

                        {isUpdating && (
                            <span className="text-xs text-gray-400">
                                Atualizando...
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-[#030711] hover:text-gray-900"
                            onClick={() =>
                                onSaveForLater(
                                    item.variant.productId,
                                    item.variantId
                                )
                            }
                            disabled={isUpdating}
                        >
                            <Heart size={14} />
                            Save for Later
                        </button>

                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-[#030711] hover:text-red-600"
                            onClick={() => onRemove(item.variantId)}
                            disabled={isUpdating}
                        >
                            <Trash2 size={14} />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OutOfStockRow({
    item,
    onRemove,
    onSaveForLater,
    onNotify,
    notified,
}: OutOfStockProps) {
    return (
        <div className="flex w-full flex-col gap-4 sm:flex-row">
            <ItemThumbnail
                outOfStock
                imagePath={item.variant.product.pathImage}
            />

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-row items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="m-0 text-[16px] font-semibold text-[#030711] sm:text-[15px]">
                            {item.variant.product.name}
                        </p>

                        <p className="m-0 mt-0.5 font-['Segoe_UI'] text-[15px] font-normal leading-[20px] text-[#6B7280] sm:text-[14px]">
                            {item.variant.product.collection}
                        </p>
                    </div>

                    <span className="text-right text-[16px] font-semibold text-[#030711] sm:text-[15px]">
                        $
                        {Number(item.variant.product.price).toFixed(2)}
                    </span>
                </div>

                <p className="m-0 font-['Segoe_UI'] text-[15px] font-normal leading-[20px] text-[#6B7280] sm:text-[14px]">
                    Size: {item.variant.size}{' '}
                    <span className="ml-3">
                        Color: {item.variant.color}
                    </span>
                </p>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <button
                        type="button"
                        className={`rounded-lg border px-3.5 py-2 text-[13px] font-medium ${notified
                            ? 'cursor-default border-green-200 bg-green-50 text-green-600'
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                            }`}
                        onClick={() => onNotify(item.variantId)}
                        disabled={notified}
                    >
                        {notified
                            ? "We'll notify you"
                            : 'Notify When Available'}
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-gray-500 hover:text-gray-900"
                            onClick={() =>
                                onSaveForLater(
                                    item.variant.productId,
                                    item.variantId
                                )
                            }
                        >
                            <Heart size={14} />
                            Save for Later
                        </button>

                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-gray-500 hover:text-red-600"
                            onClick={() => onRemove(item.variantId)}
                        >
                            <Trash2 size={14} />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ShoppingCart() {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const [promoInput, setPromoInput] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);

    const [promoFeedback, setPromoFeedback] = useState<{
        type: 'error' | 'success';
        text: string;
    } | null>(null);

    const [notifyList, setNotifyList] = useState<number[]>([]);
    const [updatingItems, setUpdatingItems] = useState<Set<number>>(
        () => new Set()
    );

    useEffect(() => {
        const fetchCart = async () => {
            const userId = getUserId();

            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                const response = await getCart(userId);
                setCartItems(response.data);
            } catch (error) {
                console.error('Failed to load cart', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [navigate]);

    const handleQuantityChange = async (
        variantId: number,
        delta: number,
        currentQuantity: number
    ) => {
        const userId = getUserId();

        if (!userId) {
            return;
        }
        if (updatingItems.has(variantId)) {
            return;
        }

        const newQuantity = currentQuantity + delta;

        if (newQuantity <= 0) {
            return;
        }

        const item = cartItems.find(
            (cartItem) => cartItem.variantId === variantId
        );

        if (!item) {
            return;
        }

        if (newQuantity > item.variant.stock) {
            return;
        }

        setUpdatingItems((prev) => {
            const next = new Set(prev);
            next.add(variantId);
            return next;
        });

        try {
            await updateCartQuantity(
                userId,
                variantId,
                newQuantity
            );

            setCartItems((prev) =>
                prev.map((item) =>
                    item.variantId === variantId
                        ? {
                            ...item,
                            quantity: newQuantity,
                        }
                        : item
                )
            );
        } catch (error) {
            console.error('Failed to update quantity', error);

            alert(
                'Não foi possível atualizar a quantidade. Verifique o estoque.'
            );
        } finally {
            setUpdatingItems((prev) => {
                const next = new Set(prev);
                next.delete(variantId);
                return next;
            });
        }
    };

    const handleRemove = async (variantId: number) => {
        const userId = getUserId();

        if (!userId) {
            return;
        }

        try {
            await removeFromCart(userId, variantId);

            setCartItems((prev) =>
                prev.filter(
                    (item) => item.variantId !== variantId
                )
            );
        } catch (error) {
            console.error('Failed to remove item', error);

            alert(
                'Não foi possível remover o item. Tente novamente.'
            );
        }
    };

    const handleSaveForLater = async (
        productId: number,
        variantId: number
    ) => {
        const userId = getUserId();

        if (!userId) {
            return;
        }

        try {
            await addToWishlist(userId, productId);
        } catch (error: any) {
            if (error.response?.status !== 409) {
                console.error(
                    'Failed to add to wishlist',
                    error
                );

                alert(
                    'Não foi possível salvar o item para depois. Tente novamente.'
                );

                return;
            }
        }

        try {
            await removeFromCart(userId, variantId);

            setCartItems((prev) =>
                prev.filter(
                    (item) => item.variantId !== variantId
                )
            );
        } catch (error) {
            console.error(
                'Failed to remove item from cart after saving to wishlist',
                error
            );

            alert(
                'O item foi salvo na sua lista de desejos, mas não foi possível removê-lo do carrinho. Tente remover manualmente.'
            );
        }
    };

    const handleNotify = (id: number) => {
        setNotifyList((prev) =>
            prev.includes(id) ? prev : [...prev, id]
        );
    };

    const handleApplyPromo = () => {
        const code = promoInput.trim().toUpperCase();

        if (!code) {
            setPromoFeedback({
                type: 'error',
                text: 'Digite um código.',
            });

            return;
        }

        if (PROMO_CODES[code]) {
            setPromoDiscount(PROMO_CODES[code]);

            setPromoFeedback({
                type: 'success',
                text: `Código aplicado: ${PROMO_CODES[code] * 100
                    }% off`,
            });
        } else {
            setPromoDiscount(0);

            setPromoFeedback({
                type: 'error',
                text: 'Código inválido.',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Carregando carrinho...
            </div>
        );
    }

    const availableItems = cartItems.filter(
        (item) => item.variant.stock > 0
    );

    const outOfStockItems = cartItems.filter(
        (item) => item.variant.stock === 0
    );

    const lineItemCount =
        availableItems.length + outOfStockItems.length;

    const subtotal = availableItems.reduce(
        (sum, item) => {
            const originalPrice = Number(
                item.variant.product.price
            );

            const salePrice = item.variant.product.salePrice
                ? Number(item.variant.product.salePrice)
                : originalPrice;

            return (
                sum +
                salePrice * item.quantity
            );
        },
        0
    );

    const savings = availableItems.reduce(
        (sum, item) => {
            const originalPrice = Number(
                item.variant.product.price
            );

            const salePrice = item.variant.product.salePrice
                ? Number(item.variant.product.salePrice)
                : originalPrice;

            return (
                sum +
                (originalPrice - salePrice) * item.quantity
            );
        },
        0
    );

    const promoAmount = subtotal * promoDiscount;
    const total = Math.max(
        0,
        subtotal - promoAmount
    );

    return (
        <div className="flex w-full flex-col items-start self-stretch bg-white px-6 pb-16 font-sans text-gray-900 xl:min-h-[1200px] xl:px-[260px] xl:pb-[423px]">
            <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-8 self-stretch px-4 py-8">
                <div className="flex items-center gap-4 self-stretch">
                    <button
                        type="button"
                        className="flex items-center justify-center rounded-md border-0 bg-transparent p-1 text-gray-900 hover:bg-gray-100"
                        aria-label="Voltar"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <h1 className="m-0 font-['Segoe_UI'] text-[30px] font-bold leading-[36px] text-[#030711]">
                        Shopping Cart
                    </h1>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[13px] font-medium text-gray-700">
                        {lineItemCount} items
                    </span>
                </div>

                <div className="flex w-full flex-col items-start gap-8 self-stretch xl:flex-row xl:justify-center">
                    <div className="flex w-full flex-col items-start gap-6 self-stretch xl:w-[901.33px] xl:max-w-full">
                        <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-xl border border-gray-200 bg-white pb-px pl-px pr-px pt-[25px] shadow-sm">
                            <div className="flex w-full items-center gap-2 px-6">
                                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />

                                <h2 className="m-0 font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#030711]">
                                    Available Items (
                                    {availableItems.length})
                                </h2>
                            </div>

                            <div className="flex w-full flex-col">
                                {availableItems.length === 0 ? (
                                    <div className="w-full p-6 text-center text-sm text-gray-400">
                                        Nenhum item disponível no
                                        carrinho.
                                    </div>
                                ) : (
                                    availableItems.map(
                                        (item, idx) => (
                                            <React.Fragment
                                                key={
                                                    item.variantId
                                                }
                                            >
                                                {idx > 0 && (
                                                    <div className="h-px w-full bg-gray-200" />
                                                )}

                                                <AvailableItemRow
                                                    item={item}
                                                    onQuantityChange={
                                                        handleQuantityChange
                                                    }
                                                    onRemove={
                                                        handleRemove
                                                    }
                                                    onSaveForLater={
                                                        handleSaveForLater
                                                    }
                                                    isUpdating={updatingItems.has(
                                                        item.variantId
                                                    )}
                                                />
                                            </React.Fragment>
                                        )
                                    )
                                )}
                            </div>
                        </div>

                        {outOfStockItems.length > 0 && (
                            <div className="flex w-full flex-col items-start gap-6 self-stretch rounded-xl border border-red-200 bg-white p-[25px] shadow-sm">
                                <div className="flex w-full items-center gap-2">
                                    <AlertCircle
                                        size={18}
                                        className="text-red-600"
                                    />

                                    <h2 className="m-0 font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#DC2626]">
                                        Out of Stock (
                                        {outOfStockItems.length})
                                    </h2>
                                </div>

                                <div className="flex w-full flex-col gap-5">
                                    {outOfStockItems.map(
                                        (item, idx) => (
                                            <React.Fragment
                                                key={
                                                    item.variantId
                                                }
                                            >
                                                {idx > 0 && (
                                                    <div className="h-px w-full bg-gray-200" />
                                                )}

                                                <OutOfStockRow
                                                    item={item}
                                                    onRemove={
                                                        handleRemove
                                                    }
                                                    onSaveForLater={
                                                        handleSaveForLater
                                                    }
                                                    onNotify={
                                                        handleNotify
                                                    }
                                                    notified={notifyList.includes(
                                                        item.variantId
                                                    )}
                                                />
                                            </React.Fragment>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex w-full flex-col items-start gap-6 self-stretch xl:w-[434.66px] xl:max-w-full">
                        <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-xl border border-gray-200 bg-white pb-px pl-px pr-px pt-[25px] shadow-sm">
                            <div className="flex w-full items-center gap-2 px-6">
                                <Tag
                                    size={20}
                                    className="flex-shrink-0"
                                />

                                <h2 className="m-0 flex items-center justify-center font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#030711]">
                                    Promo Code
                                </h2>
                            </div>

                            <div className="flex w-full flex-col gap-2.5 px-6 pb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900"
                                        placeholder="Enter promo code"
                                        value={promoInput}
                                        onChange={(e) =>
                                            setPromoInput(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' &&
                                            handleApplyPromo()
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="rounded-lg border-0 bg-[#030711] px-[18px] py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                                        onClick={
                                            handleApplyPromo
                                        }
                                    >
                                        Apply
                                    </button>
                                </div>

                                {promoFeedback && (
                                    <p
                                        className={`m-0 text-xs ${promoFeedback.type ===
                                            'success'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}
                                    >
                                        {promoFeedback.text}
                                    </p>
                                )}

                                <p className="m-0 text-xs text-gray-400">
                                    Try: SAVE10, WELCOME20,
                                    STUDENT15
                                </p>
                            </div>
                        </div>

                        <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-xl border border-gray-200 bg-white pb-px pl-px pr-px pt-[25px] shadow-sm">
                            <div className="flex w-full items-center gap-2 px-6">
                                <h2 className="m-0 font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#030711]">
                                    Order Summary
                                </h2>
                            </div>

                            <div className="flex w-full flex-col gap-3 px-6 pb-6">
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>
                                        Subtotal ({lineItemCount}{' '}
                                        items)
                                    </span>

                                    <span>
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                {savings > 0 && (
                                    <div className="flex items-center justify-between text-sm text-green-600">
                                        <span>Savings</span>

                                        <span>
                                            -$
                                            {savings.toFixed(
                                                2
                                            )}
                                        </span>
                                    </div>
                                )}

                                {promoAmount > 0 && (
                                    <div className="flex items-center justify-between text-sm text-green-600">
                                        <span>
                                            Promo (
                                            {promoInput
                                                .trim()
                                                .toUpperCase()}
                                            )
                                        </span>

                                        <span>
                                            -$
                                            {promoAmount.toFixed(
                                                2
                                            )}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>
                                        Shipping{' '}
                                        <span className="ml-1.5 rounded-full bg-gray-100 px-2 py-px text-[11px] text-[#030711]">
                                            Free
                                        </span>
                                    </span>

                                    <span>$0.00</span>
                                </div>

                                <div className="my-0.5 h-px w-full bg-gray-200" />

                                <div className="flex items-center justify-between text-[17px] font-bold text-gray-900">
                                    <span>Total</span>

                                    <span>
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="mt-2 w-full rounded-[10px] border-0 bg-[#030711] py-[13px] text-sm font-semibold text-white hover:opacity-90"
                                    onClick={() =>
                                        navigate('/pagamento')
                                    }
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    type="button"
                                    className="mt-2 w-full rounded-[10px] border border-[#E5E7EB] bg-white py-[13px] text-sm font-semibold text-black hover:border-black/90"
                                    onClick={() =>
                                        navigate('/megaSale')
                                    }
                                >
                                    Continue Shopping
                                </button>

                                <p className="m-0 mt-1 text-center font-['Segoe_UI'] text-[12px] font-normal leading-[16px] text-[#6B7280]">
                                    Secure checkout with SSL
                                    encryption
                                    <br />
                                    30-day return policy • Free
                                    returns
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}