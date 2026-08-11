import { Card } from "../components/ui/card"
import broken from "../assets/Icon/categoryBroke.svg"
import Categorias, { categorias } from "./categoriasNomes"

export default function CardCategory() {
  return (
    <div className="grid grid-cols-1   py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-[276px]">
      {categorias.map((categoria, index) => (
        <Card
          key={index}
          className="relative h-[324px] w-[324px] overflow-hidden rounded-[32px] border-none bg-transparent text-white shadow-[0_30px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="absolute inset-0">
            <img
              src={broken}
              alt={categoria.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-end p-6">
            <Categorias name={categoria.name} quantidade={categoria.quantidade} />
          </div>
        </Card>
      ))}
    </div>
  )
}