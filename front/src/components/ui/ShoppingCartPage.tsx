import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, AlertCircle, Heart, Trash2, Minus, Plus, Image as ImageIcon } from 'lucide-react';

// isso é mock precisa trocar depois quando for integrar 

const initialAvailableItems = [
    {
        id: 'item-1',
        name: 'Premium Cotton T-Shirt',
        brand: 'STYLE Premium',
        size: 'M',
        color: 'Black',
        price: 29,
        originalPrice: 49,
        quantity: 2,
        maxQuantity: 10,
    },
    {
        id: 'item-2',
        name: 'Designer Jeans',
        brand: 'STYLE Premium',
        size: '32',
        color: 'Dark Blue',
        price: 79,
        originalPrice: 120,
        quantity: 1,
        maxQuantity: 5,
    },
];

const initialOutOfStockItems = [
    {
        id: 'item-3',
        name: 'Summer Dress',
        brand: 'STYLE Collection',
        size: 'S',
        color: 'Floral',
        price: 49,
    },
];

const PROMO_CODES = { SAVE10: 0.1, WELCOME20: 0.2, STUDENT15: 0.15 };

function ItemThumbnail({ outOfStock = false }) {
    return (
        <div className="relative flex h-[84px] w-[84px] flex-shrink-0 items-center justify-center rounded-[10px] bg-gray-100">
            {outOfStock && (
                <span className="absolute left-1.5 right-1.5 rounded-[5px] bg-red-400 px-1 py-[3px] text-center text-[10px] font-semibold text-white">
                    Out of Stock
                </span>
            )}
            <ImageIcon size={20} strokeWidth={1.5} className="text-gray-300" />
        </div>
    );
}

function AvailableItemRow({ item, onQuantityChange, onRemove, onSaveForLater }) {
    const save = item.originalPrice - item.price;

    return (
        <div className="flex w-full flex-col gap-4 px-6 py-5 sm:flex-row">
            <ItemThumbnail />

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-row items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="m-0 text-[16px] sm:text-[15px] font-semibold text-gray-900">{item.name}</p>
                        <p className="m-0 mt-0.5 font-['Segoe_UI'] text-[15px] sm:text-[14px] font-normal leading-[20px] text-[#6B7280]">{item.brand}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[16px] sm:text-[15px] font-bold text-gray-900">${item.price}</span>
                            <span className="text-[14px] sm:text-[13px] text-gray-400 line-through">${item.originalPrice}</span>
                        </div>
                        {save > 0 && (
                            <span className="w-fit rounded-full bg-red-600 px-2 py-0.5 text-[12px] sm:text-[11px] font-semibold text-white">
                                Save ${save}
                            </span>
                        )}
                    </div>
                </div>

                <p className="m-0 font-['Segoe_UI'] text-[15px] sm:text-[14px] font-normal leading-[20px] text-[#6B7280]">
                    Size: {item.size} <span className="ml-3">Color: {item.color}</span>
                </p>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-[10px] border border-[#E5E7EB] p-[1px]">
                            <button
                                type="button"
                                className="flex h-[26px] w-[26px] items-center justify-center rounded-md border-0 bg-white text-gray-700 hover:enabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() => onQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                                aria-label={`Diminuir quantidade de ${item.name}`}
                            >
                                <Minus size={13} />
                            </button>
                            <span className="min-w-[16px] px-3 text-center font-['Segoe_UI'] text-[16px] font-normal leading-[24px] text-[#030711]">{item.quantity}</span>
                            <button
                                type="button"
                                className="flex h-[26px] w-[26px] items-center justify-center rounded-md border-0 bg-white text-gray-700 hover:enabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() => onQuantityChange(item.id, 1)}
                                disabled={item.quantity >= item.maxQuantity}
                                aria-label={`Aumentar quantidade de ${item.name}`}
                            >
                                <Plus size={13} />
                            </button>
                        </div>
                        <span className="ml-1 text-xs text-gray-400">Max {item.maxQuantity}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-[#030711] hover:text-gray-900"
                            onClick={() => onSaveForLater(item.id)}
                        >
                            <Heart size={14} />
                            Save for Later
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-[#030711] hover:text-red-600"
                            onClick={() => onRemove(item.id)}
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

function OutOfStockRow({ item, onRemove, onSaveForLater, onNotify, notified }) {
    return (
        <div className="flex w-full flex-col gap-4 sm:flex-row">
            <ItemThumbnail outOfStock />

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-row items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="m-0 text-[16px] sm:text-[15px] font-semibold text-[#030711]">{item.name}</p>
                        <p className="m-0 mt-0.5 font-['Segoe_UI'] text-[15px] sm:text-[14px] font-normal leading-[20px] text-[#6B7280]">{item.brand}</p>
                    </div>
                    <span className="text-[16px] sm:text-[15px] font-semibold text-[#030711] text-right">${item.price}</span>
                </div>

                <p className="m-0 font-['Segoe_UI'] text-[15px] sm:text-[14px] font-normal leading-[20px] text-[#6B7280]">
                    Size: {item.size} <span className="ml-3">Color: {item.color}</span>
                </p>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <button
                        type="button"
                        className={`rounded-lg border px-3.5 py-2 text-[13px] font-medium ${
                            notified 
                            ? 'cursor-default border-green-200 bg-green-50 text-green-600' 
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => onNotify(item.id)}
                        disabled={notified}
                    >
                        {notified ? "We'll notify you" : 'Notify When Available'}
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-gray-500 hover:text-gray-900"
                            onClick={() => onSaveForLater(item.id)}
                        >
                            <Heart size={14} />
                            Save for Later
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] text-gray-500 hover:text-red-600"
                            onClick={() => onRemove(item.id)}
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
    const [availableItems, setAvailableItems] = useState(initialAvailableItems);
    const [outOfStockItems, setOutOfStockItems] = useState(initialOutOfStockItems);
    const [promoInput, setPromoInput] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [promoFeedback, setPromoFeedback] = useState(null);
    const [notifyList, setNotifyList] = useState([]);

    const handleQuantityChange = (id, delta) => {
        setAvailableItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.min(item.maxQuantity, Math.max(1, item.quantity + delta)) }
                    : item
            )
        );
    };

    const handleRemoveAvailable = (id) => setAvailableItems((prev) => prev.filter((i) => i.id !== id));
    const handleRemoveOutOfStock = (id) => setOutOfStockItems((prev) => prev.filter((i) => i.id !== id));

    const handleSaveForLater = (id) => {
        setAvailableItems((prev) => prev.filter((i) => i.id !== id));
        setOutOfStockItems((prev) => prev.filter((i) => i.id !== id));
    };

    const handleNotify = (id) => {
        setNotifyList((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    const handleApplyPromo = () => {
        const code = promoInput.trim().toUpperCase();
        if (!code) {
            setPromoFeedback({ type: 'error', text: 'Digite um código.' });
            return;
        }
        if (PROMO_CODES[code]) {
            setPromoDiscount(PROMO_CODES[code]);
            setPromoFeedback({ type: 'success', text: `Código aplicado: ${PROMO_CODES[code] * 100}% off` });
        } else {
            setPromoDiscount(0);
            setPromoFeedback({ type: 'error', text: 'Código inválido.' });
        }
    };

    const lineItemCount = availableItems.length + outOfStockItems.length;
    const subtotal = availableItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const savings = availableItems.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0);
    const promoAmount = subtotal * promoDiscount;
    const total = Math.max(0, subtotal - promoAmount);

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
                    <h1 className="m-0 font-['Segoe_UI'] text-[30px] font-bold leading-[36px] text-[#030711]">Shopping Cart</h1>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[13px] font-medium text-gray-700">
                        {lineItemCount} items
                    </span>
                </div>
                <div className="flex w-full flex-col items-start gap-8 self-stretch xl:flex-row xl:justify-center">
                    <div className="flex w-full flex-col items-start gap-6 self-stretch xl:w-[901.33px] xl:max-w-full">
                        <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-xl border border-gray-200 bg-white pb-px pl-px pr-px pt-[25px] shadow-sm">
                            <div className="flex w-full items-center gap-2 px-6">
                                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                                <h2 className="m-0 font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#030711]">Available Items ({availableItems.length})</h2>
                            </div>

                            <div className="flex w-full flex-col">
                                {availableItems.length === 0 ? (
                                    <div className="w-full p-6 text-center text-sm text-gray-400">
                                        Nenhum item disponível no carrinho.
                                    </div>
                                ) : (
                                    availableItems.map((item, idx) => (
                                        <React.Fragment key={item.id}>
                                            {idx > 0 && <div className="h-px w-full bg-gray-200" />}
                                            <AvailableItemRow
                                                item={item}
                                                onQuantityChange={handleQuantityChange}
                                                onRemove={handleRemoveAvailable}
                                                onSaveForLater={handleSaveForLater}
                                            />
                                        </React.Fragment>
                                    ))
                                )}
                            </div>
                        </div>

                        {outOfStockItems.length > 0 && (
                            <div className="flex w-full flex-col items-start gap-6 self-stretch rounded-xl border border-red-200 bg-white p-[25px] shadow-sm">
                                <div className="flex w-full items-center gap-2">
                                    <AlertCircle size={18} className="text-red-600" />
                                    <h2 className="m-0 font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#DC2626]">
                                        Out of Stock ({outOfStockItems.length})
                                    </h2>
                                </div>
                                <div className="flex w-full flex-col gap-5">
                                    {outOfStockItems.map((item, idx) => (
                                        <React.Fragment key={item.id}>
                                            {idx > 0 && <div className="h-px w-full bg-gray-200" />}
                                            <OutOfStockRow
                                                item={item}
                                                onRemove={handleRemoveOutOfStock}
                                                onSaveForLater={handleSaveForLater}
                                                onNotify={handleNotify}
                                                notified={notifyList.includes(item.id)}
                                            />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex w-full flex-col items-start gap-6 self-stretch xl:w-[434.66px] xl:max-w-full">
                        <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-xl border border-gray-200 bg-white pb-px pl-px pr-px pt-[25px] shadow-sm">
                            <div className="flex w-full items-center gap-2 px-6">
                                <Tag size={20} className="flex-shrink-0" />
                                <h2 className="m-0 flex items-center justify-center font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#030711]">Promo Code</h2>
                            </div>
                            <div className="flex w-full flex-col gap-2.5 px-6 pb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900"
                                        placeholder="Enter promo code"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                    />
                                    <button
                                        type="button"
                                        className="rounded-lg border-0 bg-[#030711] px-[18px] py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                                        onClick={handleApplyPromo}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {promoFeedback && (
                                    <p
                                        className={`m-0 text-xs ${promoFeedback.type === 'success' ? 'text-green-600' : 'text-red-600'
                                            }`}
                                    >
                                        {promoFeedback.text}
                                    </p>
                                )}
                                <p className="m-0 text-xs text-gray-400">Try: SAVE10, WELCOME20, STUDENT15</p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-6 self-stretch rounded-xl border border-gray-200 bg-white pb-px pl-px pr-px pt-[25px] shadow-sm">
                            <div className="flex w-full items-center gap-2 px-6">
                                <h2 className="m-0 font-['Segoe_UI'] text-[24px] font-semibold leading-[24px] tracking-[-0.6px] text-[#030711]">Order Summary</h2>
                            </div>
                            <div className="flex w-full flex-col gap-3 px-6 pb-6">
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <span>Subtotal ({lineItemCount} items)</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {savings > 0 && (
                                    <div className="flex items-center justify-between text-sm text-green-600">
                                        <span>Savings</span>
                                        <span>-${savings.toFixed(2)}</span>
                                    </div>
                                )}
                                {promoAmount > 0 && (
                                    <div className="flex items-center justify-between text-sm text-green-600">
                                        <span>Promo ({promoInput.trim().toUpperCase()})</span>
                                        <span>-${promoAmount.toFixed(2)}</span>
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
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button
                                    type="button"
                                    className="mt-2 w-full rounded-[10px] border-0 bg-[#030711] py-[13px] text-sm font-semibold text-white hover:opacity-90"
                                    onClick={() => navigate('/pagamento')}
                                >
                                    Proceed to Checkout
                                </button>
                                <button
                                    type="button"
                                    className="mt-2 w-full rounded-[10px] border border-[#E5E7EB] bg-white py-[13px] text-sm font-semibold text-black hover:border-black/90"
                                    onClick={() => navigate('/megaSale')}
                                >
                                    Continue Shopping
                                </button>

                                <p className="m-0 mt-1 text-center font-['Segoe_UI'] text-[12px] font-normal leading-[16px] text-[#6B7280]">
                                    Secure checkout with SSL encryption
                                    <br />
                                    30-day return policy • Free returns
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}