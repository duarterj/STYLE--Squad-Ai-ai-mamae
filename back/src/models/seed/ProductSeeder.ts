import { faker } from "@faker-js/faker";
import type { PrismaClient } from "../../generated/prisma/client";
import type { CategoryType, Prisma } from "../../generated/prisma/client";

const tamanhosPorCategoria: Record<CategoryType, string[]> = {
  TOPS: ["XS", "S", "M", "L", "XL"],
  DRESSES: ["XS", "S", "M", "L", "XL"],
  BOTTOMS: ["28", "30", "32", "34", "36"],
  SHOES: ["6", "7", "8", "9", "10", "11"],
  ACCESSORIES: ["XS", "S", "M"],
};

const nomesPorCategoria: Record<CategoryType, string[]> = {
  TOPS: ["T-Shirt", "Blouse", "Tank Top", "Polo Shirt", "Sweater", "Cropped Top"],
  DRESSES: ["Midi Dress", "Maxi Dress", "Mini Dress", "Cocktail Dress"],
  BOTTOMS: ["Jeans", "Bermuda Shorts", "Shorts", "Tailored Pants", "Skirt"],
  SHOES: ["Sneakers", "Dress Shoes", "Sandals", "Boots", "Slides"],
  ACCESSORIES: ["Belt", "Bag", "Sunglasses", "Cap", "Necklace"],
};

function gerarProdutoInfo(categoria: CategoryType) {
  const base = faker.helpers.arrayElement(nomesPorCategoria[categoria]);
  const adjetivo = faker.commerce.productAdjective();
  const detalhe = faker.commerce.productDescription();

  return {
    nome: `${base} ${adjetivo}`,
    descricao: `${base} ${detalhe}`,
  };
}

function gerarVariantes(
  categoria: CategoryType
): Prisma.VariantCreateWithoutProductInput[] {
  const tamanhosDisponiveis = tamanhosPorCategoria[categoria];
  const quantidadeVariantes = faker.number.int({ min: 2, max: 5 });

  const variantes: Prisma.VariantCreateWithoutProductInput[] = [];
  const combinacoesUsadas = new Set<string>();

  const maxTentativas = quantidadeVariantes * 15;
  let tentativas = 0;

  while (variantes.length < quantidadeVariantes && tentativas < maxTentativas) {
    tentativas++;

    const cor = faker.color.human();
    const tamanho = faker.helpers.arrayElement(tamanhosDisponiveis);
    const chave = `${cor}-${tamanho}`;

    if (combinacoesUsadas.has(chave)) {
      continue;
    }

    combinacoesUsadas.add(chave);

    variantes.push({
      color: cor,
      size: tamanho,
      stock: faker.number.int({ min: 0, max: 100 }),
    });
  }

  return variantes;
}

export async function productSeeder(
  prisma: PrismaClient,
  produtosPorCategoria: number
): Promise<void> {
  const categorias: CategoryType[] = [
    "TOPS",
    "BOTTOMS",
    "DRESSES",
    "SHOES",
    "ACCESSORIES",
  ];

  let totalProdutos = 0;
  let totalVariantes = 0;

  for (const categoria of categorias) {
    for (let i = 0; i < produtosPorCategoria; i++) {
      const preco = parseFloat(faker.commerce.price({ min: 29.99, max: 299.99 }));

      const temPromocao = faker.datatype.boolean({ probability: 0.3 });
      const precoPromocional = temPromocao
        ? parseFloat((preco * (1 - faker.number.float({ min: 0.1, max: 0.5 }))).toFixed(2))
        : null;

      const variantes = gerarVariantes(categoria);
      const produtoInfo = gerarProdutoInfo(categoria);

      await prisma.product.create({
        data: {
          name: produtoInfo.nome,
          brand: faker.company.name(),
          description: produtoInfo.descricao,
          price: preco,
          salePrice: precoPromocional,
          pathImage: null,
          category: categoria,
          collection: faker.commerce.department(),
          rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
          ratingCount: faker.number.int({ min: 0, max: 500 }),
          isActive: faker.datatype.boolean({ probability: 0.9 }),
          variants: {
            create: variantes,
          },
        },
      });

      totalProdutos++;
      totalVariantes += variantes.length;
    }
  }

  console.log(
    `Pouplado com sucesso: ${totalProdutos} produtos com ${totalVariantes} variantes.`
  );
}