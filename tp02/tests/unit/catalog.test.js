
const {
  getProductById,
  checkStock,
} = require('../../src/catalog/catalogService');

describe('catalogService', () => {
  test('returns the correct product for an existing ID', async () => {
    const product = await getProductById(1);

    expect(product).toEqual({
      id: 1,
      name: 'Casque Bluetooth',
      category: 'audio',
      price: 89.9,
      stock: 12,
    });
  });

  test('rejects an unknown product ID with the correct message', async () => {
    expect.assertions(1);

    await expect(getProductById(999)).rejects.toThrow(
      'Produit introuvable : 999'
    );
  });

  test('resolves to false when the requested quantity exceeds stock', async () => {
    await expect(checkStock(2, 1)).resolves.toBe(false);
  });
});
