import { useState } from "react"
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Field, FieldGroup } from "./field";
import { sizes } from "../componentsData/sizesData";
import { produtosSale } from "../componentsData/saleData"

import filter from "../../assets/Icon/filter.svg"
import price from "../../assets/Icon/combobox.svg"
import feat from "../../assets/Icon/combobox2.svg"
import grade from "../../assets/Icon/grid.svg"
import lista from "../../assets/Icon/list.svg"

import SizeCheck from "./sizeCheck";
import CardMegaSale from "./cardMegaSale";

export default function SaleItems() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

  function filtroCategoria(categoria: string, checked: boolean | "indeterminate") {
    const estaMarcado = checked === true;

    if (estaMarcado) {
      setCategoriaSelecionada(categoria);
      return;
    }

    setCategoriaSelecionada(null);
  }

  function filtroTamanho(tamanho: string, checked: boolean | "indeterminate") {
    const estaMarcado = checked === true;

    if (estaMarcado) {
      setTamanhoSelecionado(tamanho);
      
      return;
    }

    setTamanhoSelecionado("");
  }

  const produtosFiltrados = produtosSale.filter((produto) => {
    const passaCategoria = !categoriaSelecionada || produto.categoria?.toLowerCase() === categoriaSelecionada.toLowerCase();
    const passaTamanho = !tamanhoSelecionado || produto.size?.toUpperCase() === tamanhoSelecionado.toUpperCase();

    return passaCategoria && passaTamanho;
  });

  return (
    <div className="flex min-w-[1368px] flex-row gap-8">
      {/* seção do filtroCategoria */}
      <section className="flex flex-col w-[256px] gap-4 h-[548px]">
        <div className="lg:hidden flex items-end flex-row">
          <img src={filter} className="h-5" />
          <h1 className="mt-2 text-[16px] font-semibold">Filters</h1>
        </div>

        <h1 className="mt-2 text-[16px] font-semibold">Category</h1>

        {/* seção de categorias atualizada com eventos de clique */}
        <FieldGroup className="flex gap-2">
          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox
              className="rounded-full"
              checked={categoriaSelecionada === "tops"}
              onCheckedChange={(checked) => filtroCategoria("tops", checked)}
            />
            <Label>Tops</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox
              className="rounded-full"
              checked={categoriaSelecionada === "bottoms"}
              onCheckedChange={(checked) => filtroCategoria("bottoms", checked)}
            />
            <Label>Bottoms</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox
              className="rounded-full"
              checked={categoriaSelecionada === "dresses"}
              onCheckedChange={(checked) => filtroCategoria("dresses", checked)}
            />
            <Label>Dresses</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox
              className="rounded-full"
              checked={categoriaSelecionada === "shoes"}
              onCheckedChange={(checked) => filtroCategoria("shoes", checked)}
            />
            <Label>Shoes</Label>
          </Field>

          <Field orientation="horizontal" className="h-4 w-4">
            <Checkbox
              className="rounded-full"
              checked={categoriaSelecionada === "accessories"}
              onCheckedChange={(checked) => filtroCategoria("accessories", checked)}
            />
            <Label>Accessories</Label>
          </Field>
        </FieldGroup>

        {/* seção de tamanhos */}
        <h1 className="text-[16px] font-semibold">Sizes</h1>
        <SizeCheck
          listaTamanhos={sizes}
          selecionado={tamanhoSelecionado}
          aoMudar={filtroTamanho}
        />

        {/* seção de preço */}
        <h1 className="mt-6 text-[16px] font-semibold">Price range</h1>
        <img src={price} />
      </section>

      {/* seção para os produtos */}
      <section className="flex flex-col min-w-[1098px] min-h-[1076px] gap-6">
        <div className="flex flex-col">
          <div className="flex ml-4 flex-col">
            <h1 className="text-2xl font-semibold">Sale Items</h1>
            <span className="text-[#6B7280] text-[16px]">{produtosFiltrados.length} products found</span>
          </div>

          <div className="flex justify-end flex-row mt-2">
            <img src={feat} className="mr-4" />
            <img src={grade} className="mr-1" />
            <img src={lista} />
          </div>
        </div>

        <CardMegaSale produtos={produtosFiltrados} />
      </section>
    </div>
  );
}
