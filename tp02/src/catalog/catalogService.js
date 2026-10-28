const PRODUCTS = [
  {
    id: 1,
    name: "Casque Bluetooth",
    category: "audio",
    price: 89.9,
    stock: 12,
  },
  { id: 2, name: "Enceinte portable", category: "audio", price: 59, stock: 0 },
  { id: 3, name: "Aspirateur robot", category: "maison", price: 249, stock: 3 },
  {
    id: 4,
    name: "Bouilloire inox",
    category: "maison",
    price: 39.5,
    stock: 25,
  },
  {
    id: 5,
    name: "Souris sans fil",
    category: "informatique",
    price: 24.9,
    stock: 40,
  },
  {
    id: 6,
    name: "Clavier mécanique",
    category: "informatique",
    price: 119,
    stock: 7,
  },
];

const DELAY_MS = 20;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProductById(id) {
  await wait(DELAY_MS);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    throw new Error(`Produit introuvable : ${id}`);
  }

  return { ...product };
}

async function getProductsByCategory(category) {
  await wait(DELAY_MS);

  return PRODUCTS.filter(
    (p) => p.category === String(category).toLowerCase(),
  ).map((p) => ({ ...p }));
}

async function checkStock(id, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError(`Quantité invalide : ${quantity}`);
  }

  const product = await getProductById(id);

  return product.stock >= quantity;
}

module.exports = {
  getProductById,
  getProductsByCategory,
  checkStock,
};
