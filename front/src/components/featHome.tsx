export const produtosFeat = [
  { name: "Vintage Denim Jacket", preco: "$89", precoOld: "$120", quantidade: "350+ items", rate: "4.8", reviews: 124, badge: "Best Seller" },
  { name: "Oversized Blazer", preco: "$145", precoOld: "", quantidade: "350+ items", rate: "4.9", reviews: 89, badge: "New" },
  { name: "Comfort Slim Jeans", preco: "$79", precoOld: "$99", quantidade: "200+ items", rate: "4.7", reviews: 203, badge: "Sale" },
  { name: "Silk Blouse", preco: "$125", precoOld: "", quantidade: "180+ items", rate: "4.8", reviews: 156, badge: "Premium" },
]



interface FeatProdsProps {
  name: string
  preco: string
  precoOld?: string
  rate: string
  quantidade: string
  reviews: number
  badge: string
}

export default function FeatProds({ name, preco, precoOld, rate, reviews, }: FeatProdsProps) {
  return (
    <div className="flex flex-col items-start  cursor-pointer text-black">
      <p className="text-lg font-semibold leading-tight">{name}</p>
      <div className="flex items-center ">
        <span className="text-sm font-medium">{rate}</span>
        {reviews ? <span className="text-sm text-gray-500">({reviews})</span> : null}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold">{preco}</span>
        {precoOld ? <span className="text-sm text-gray-400 line-through">{precoOld}</span> : null}
      </div>
    </div>
  )
}