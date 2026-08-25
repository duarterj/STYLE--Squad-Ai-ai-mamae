import { faker } from "@faker-js/faker";
import type { PrismaClient } from "../../generated/prisma/client";
import type { CategoryType, Prisma } from "../../generated/prisma/client";

const seedImagesByCategory: Record<CategoryType, string> = {
  TOPS: "seed_images/camisa1.jpg",
  BOTTOMS: "seed_images/calca1.jpg",
  DRESSES: "seed_images/vestido1.jpg",
  SHOES: "seed_images/sapato1.jpg",
  ACCESSORIES: "seed_images/acessorios1.jpg",
};

const tamanhosPorCategoria: Record<CategoryType, string[]> = {
  TOPS: ["XS", "S", "M", "L", "XL"],
  DRESSES: ["XS", "S", "M", "L", "XL"],
  BOTTOMS: ["28", "30", "32", "34", "36"],
  SHOES: ["6", "7", "8", "9", "10", "11"],
  ACCESSORIES: ["XS", "S", "M"],
};

const nomesPorCategoria: Record<CategoryType, string[]> = {
  TOPS: ["T-Shirt", "Blouse", "Tank Top", "Polo Shirt", "Sweater", "Cropped Top", "Blazer", "Jacket"],
  DRESSES: ["Midi Dress", "Maxi Dress", "Mini Dress", "Cocktail Dress"],
  BOTTOMS: ["Jeans", "Bermuda Shorts", "Shorts", "Tailored Pants", "Skirt"],
  SHOES: ["Sneakers", "Dress Shoes", "Sandals", "Boots", "Ankle Boots", "Slides"],
  ACCESSORIES: ["Belt", "Bag", "Sunglasses", "Cap", "Necklace"],
};

const MARCAS = ["Style Premium", "Style Luxury", "Style Sport", "Style Collection"];

const COLECOES = [
  "Best Seller",
  "New",
  "Sale",
  "Premium",
  "Limited Time",
  "Flash Sale",
  "Luxury Sale",
  "Summer Sale",
  "Sport Sale",
  "Summer 2026",
  "Winter 2026",
];

const NOMES_MATERIAIS: Record<CategoryType, string[]> = {
  TOPS: ["Cotton", "Linen", "Knit", "Viscose", "Silk", "Cashmere", "Denim"],
  DRESSES: ["Silk", "Crepe", "Knit", "Chiffon", "Cotton"],
  BOTTOMS: ["Denim", "Twill", "Cotton", "Tech"],
  SHOES: ["Leather", "Mesh", "Suede", "Canvas"],
  ACCESSORIES: ["Leather", "Metal", "Acrylic", "Nylon"],
};

const MATERIAIS: Record<CategoryType, string[]> = {
  TOPS: ["cotton blend", "lightweight linen", "soft knit", "soft viscose"],
  DRESSES: ["synthetic silk", "flowing crepe", "ribbed knit", "lightweight chiffon"],
  BOTTOMS: ["stretch denim", "structured twill", "cotton twill", "tech fabric"],
  SHOES: ["synthetic leather", "breathable mesh", "vegan suede", "reinforced canvas"],
  ACCESSORIES: ["eco leather", "matte metal", "acrylic", "ballistic nylon"],
};

const CARACTERISTICAS: Record<CategoryType, string[]> = {
  TOPS: ["modern cut", "relaxed fit", "slim fit", "statement collar"],
  DRESSES: ["midi length", "subtle neckline", "defined waist", "side slit"],
  BOTTOMS: ["high waist", "classic straight cut", "relaxed fit", "clean finish"],
  SHOES: ["rubber sole", "anatomic insole", "minimalist design", "durable construction"],
  ACCESSORIES: ["contemporary design", "magnetic clasp", "universal fit", "metallic details"],
};

const ADJETIVOS: Record<CategoryType, string[]> = {
  TOPS: ["casual", "relaxed", "everyday", "trendy", "cozy", "sporty", "classic", "modern", "oversized", "premium"],
  DRESSES: ["elegant", "flowy", "playful", "romantic", "chic", "casual", "bold", "modern", "vintage"],
  BOTTOMS: ["comfortable", "relaxed", "everyday", "trendy", "sporty", "tailored", "classic", "casual", "slim", "designer", "vintage"],
  SHOES: ["comfortable", "sporty", "athletic", "everyday", "trendy", "durable", "classic", "casual", "lightweight", "vintage"],
  ACCESSORIES: ["everyday", "trendy", "bold", "casual", "versatile", "playful", "classic", "statement", "designer", "premium"],
};

const FECHAMENTOS = [
  "Perfect for everyday style.",
  "A versatile piece for your wardrobe.",
  "Designed for comfort and style.",
  "An easy choice for any occasion.",
];

function maiusculo(palavra: string): string {
  return `${palavra.charAt(0).toUpperCase()}${palavra.slice(1)}`;
}

function gerarNome(categoria: CategoryType, base: string): string {
  const adjetivos = ADJETIVOS[categoria];
  const adjetivo = faker.helpers.arrayElement(adjetivos);
  const outrosAdjetivos = adjetivos.filter((a) => a !== adjetivo);
  const segundoAdjetivo = faker.helpers.arrayElement(outrosAdjetivos);
  const material = faker.helpers.arrayElement(NOMES_MATERIAIS[categoria]);

  const padroes = [
    () => `${material} ${base}`,
    () => `${maiusculo(adjetivo)} ${base}`,
    () => `${maiusculo(adjetivo)} ${material} ${base}`,
    () => `${maiusculo(adjetivo)} ${maiusculo(segundoAdjetivo)} ${base}`,
  ];

  return faker.helpers.arrayElement(padroes)();
}

function gerarDescricao(nomeProduto: string, categoria: CategoryType): string {
  const material = faker.helpers.arrayElement(MATERIAIS[categoria]);
  const detalhe = faker.helpers.arrayElement(CARACTERISTICAS[categoria]);
  const fechamento = faker.helpers.arrayElement(FECHAMENTOS);
  return `${nomeProduto} crafted in ${material}, featuring a ${detalhe}. ${fechamento}`;
}

function gerarProdutoInfo(categoria: CategoryType) {
  const base = faker.helpers.arrayElement(nomesPorCategoria[categoria]);

  return {
    nome: gerarNome(categoria, base),
    descricao: gerarDescricao(base, categoria),
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

const MIN_PRODUTOS_COM_SALE_PRICE = 2;

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

  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  let totalProdutos = 0;
  let totalVariantes = 0;

  for (const categoria of categorias) {
    for (let i = 0; i < produtosPorCategoria; i++) {
      const preco = parseFloat(faker.commerce.price({ min: 29.99, max: 299.99 }));

      const deveForcarPromocao = i < MIN_PRODUTOS_COM_SALE_PRICE;
      const temPromocao = deveForcarPromocao || faker.datatype.boolean({ probability: 0.3 });
      const precoPromocional = temPromocao
        ? parseFloat((preco * (1 - faker.number.float({ min: 0.1, max: 0.5 }))).toFixed(2))
        : null;

      const contagemAvaliacoes = faker.number.int({ min: 0, max: 500 });
      const avaliacao = contagemAvaliacoes === 0
        ? 0
        : faker.number.float({ min: 1, max: 5, fractionDigits: 1 });

      const variantes = gerarVariantes(categoria);
      const produtoInfo = gerarProdutoInfo(categoria);

      await prisma.product.create({
        data: {
          name: produtoInfo.nome,
          brand: faker.helpers.arrayElement(MARCAS),
          description: produtoInfo.descricao,
          price: preco,
          salePrice: precoPromocional,
          pathImage: seedImagesByCategory[categoria],
          category: categoria,
          collection: faker.helpers.arrayElement(COLECOES),
          rating: avaliacao,
          ratingCount: contagemAvaliacoes,
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