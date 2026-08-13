export const categorias = [
  { name: "Women's Fashion", quantidade: "500+ items" },
  { name: "Men's Fashion", quantidade: "350+ items" },
  { name: "Accessories", quantidade: "200+ items" },
  { name: "Shoes", quantidade: "180+ items" },
]



interface CategoriasProps {
  name: string
  quantidade: string
}

export default function Categorias({ name, quantidade }: CategoriasProps) {
  return (
    <div className="flex flex-col items-start gap-2 cursor-pointer">
      <p className="text-lg font-semibold leading-tight">{name}</p>
      <p className="text-sm text-white/80">{quantidade}</p>
    </div>
  )
}