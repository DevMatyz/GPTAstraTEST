export const filters = [
  "All",
  "Classics",
  "Signature",
  "Vegetarian",
  "Spicy",
] as const;

export type Filter = (typeof filters)[number];

export const pizzas: {
  name: string;
  description: string;
  ingredients: string;
  price: number;
  tags: Filter[];
  art: "basil" | "salami" | "mushroom" | "burrata" | "mortadella" | "tomato";
}[] = [
  {
    name: "Nero",
    description: "Our signature. A little smoke. A lot of soul.",
    ingredients: "Tomato · Fior di Latte · basil · smoked mozzarella",
    price: 16,
    tags: ["Signature", "Vegetarian"],
    art: "basil",
  },
  {
    name: "Diavola",
    description: "For those who like their evenings a little warmer.",
    ingredients: "Spicy salami · tomato · mozzarella · chili oil",
    price: 18,
    tags: ["Classics", "Spicy"],
    art: "salami",
  },
  {
    name: "Tartufo",
    description: "Deeply earthy, impossibly fragrant.",
    ingredients: "Wild mushrooms · truffle cream · Fior di Latte · parmesan",
    price: 23,
    tags: ["Signature", "Vegetarian"],
    art: "mushroom",
  },
  {
    name: "Burrata",
    description: "Cool, creamy indulgence meets blistering heat.",
    ingredients: "Tomato · basil · burrata · extra virgin olive oil",
    price: 21,
    tags: ["Signature", "Vegetarian"],
    art: "burrata",
  },
  {
    name: "Mortadella",
    description: "Soft folds, green pistachios, a bright finish.",
    ingredients: "Mortadella · pistachio · stracciatella · lemon zest",
    price: 22,
    tags: ["Signature"],
    art: "mortadella",
  },
  {
    name: "Marinara",
    description: "Beautifully uncomplicated. Nothing to hide behind.",
    ingredients: "San Marzano tomato · garlic · oregano · olive oil",
    price: 13,
    tags: ["Classics", "Vegetarian"],
    art: "tomato",
  },
];

export const ingredients = [
  {
    name: "San Marzano",
    subtitle: "The tomato",
    origin: "Campania, Italy",
    flavor: "Sweet, sun-warmed, gently acidic.",
    why: "A bright foundation that lets every other ingredient speak.",
    symbol: "tomato",
  },
  {
    name: "Fior di Latte",
    subtitle: "The mozzarella",
    origin: "Inspired by Agerola, Italy",
    flavor: "Milky, delicate, beautifully soft.",
    why: "It melts into little pools without overpowering the dough.",
    symbol: "cheese",
  },
  {
    name: "00 Flour",
    subtitle: "The foundation",
    origin: "Italian milling tradition",
    flavor: "Clean wheat with a lightly toasted finish.",
    why: "Finely milled flour gives our dough its extensible character.",
    symbol: "flour",
  },
  {
    name: "Extra virgin",
    subtitle: "The olive oil",
    origin: "Puglia, Italy",
    flavor: "Grassy, peppery, wonderfully fragrant.",
    why: "A finishing ribbon brings everything into focus.",
    symbol: "oil",
  },
  {
    name: "Fresh basil",
    subtitle: "The final leaf",
    origin: "Inspired by Liguria, Italy",
    flavor: "Sweet herbs, fresh pepper, a hint of anise.",
    why: "Torn by hand and added with restraint.",
    symbol: "basil",
  },
  {
    name: "Parmigiano",
    subtitle: "The finishing touch",
    origin: "Emilia-Romagna, Italy",
    flavor: "Nutty, savory, crystalline.",
    why: "A fine grating adds a long, satisfying finish.",
    symbol: "cheese",
  },
  {
    name: "Burrata",
    subtitle: "The indulgence",
    origin: "Puglia, Italy",
    flavor: "Fresh cream with a delicate outer shell.",
    why: "Served cool against the warmth of a freshly fired pizza.",
    symbol: "cheese",
  },
  {
    name: "Calabrian chili",
    subtitle: "The spark",
    origin: "Calabria, Italy",
    flavor: "Fruity heat with a lingering kick.",
    why: "Heat should add character, not cover it up.",
    symbol: "chili",
  },
];

export const process = [
  ["Mix", "Flour, water, salt. The simplest beginning."],
  ["Rest", "Time for the flour to drink, and the dough to relax."],
  ["Ferment", "24–48 hours. Flavor develops on its own schedule."],
  ["Shape", "Stretched by hand. Never pressed into perfection."],
  ["Fire", "A brief, beautiful encounter with smoke and stone."],
];

export const links = [
  ["Menu", "#menu"],
  ["Experience", "#experience"],
  ["Our Story", "#story"],
  ["Ingredients", "#ingredients"],
  ["Visit", "#visit"],
];
