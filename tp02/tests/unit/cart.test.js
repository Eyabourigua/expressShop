
const { Cart } = require('../../src/cart/Cart');

describe('Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  // T1
  test('adds an item to an empty cart', () => {
    cart.addItem({
      id: 1,
      name: 'Souris sans fil',
      price: 24.9,
      quantity: 1,
    });

    expect(cart.getItems()).toEqual([
      {
        id: 1,
        name: 'Souris sans fil',
        price: 24.9,
        quantity: 1,
      },
    ]);
  });

  // T2
  test('calculates the total price of the cart', () => {
    cart.addItem({
      id: 1,
      name: 'Souris sans fil',
      price: 24.9,
      quantity: 1,
    });

    expect(cart.getTotal()).toBe(24.9);
  });

  // T3
  test('adds quantities when the same item is added twice', () => {
    cart.addItem({
      id: 2,
      name: 'Câble USB',
      price: 19.99,
      quantity: 2,
    });

    cart.addItem({
      id: 2,
      name: 'Câble USB',
      price: 19.99,
      quantity: 3,
    });

    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getTotalQuantity()).toBe(5);
    expect(cart.getTotal()).toBe(99.95);
  });

  // T4
  test('removes only the requested item and clears the cart', () => {
    cart.addItem({
      id: 1,
      name: 'Souris sans fil',
      price: 24.9,
      quantity: 1,
    });

    cart.addItem({
      id: 2,
      name: 'Clavier mécanique',
      price: 119,
      quantity: 1,
    });

    cart.removeItem(99);
    expect(cart.getItems()).toHaveLength(2);

    cart.removeItem(1);
    expect(cart.getItems()).toEqual([
      {
        id: 2,
        name: 'Clavier mécanique',
        price: 119,
        quantity: 1,
      },
    ]);

    cart.clear();
    expect(cart.getItems()).toEqual([]);
    expect(cart.getTotal()).toBe(0);
  });

  // T5
  test('rejects a quantity of zero', () => {
    expect(() => {
      cart.addItem({
        id: 3,
        name: 'Câble HDMI',
        price: 10,
        quantity: 0,
      });
    }).toThrow(RangeError);
  });

  // T6
  test('returns a copy without exposing the internal cart items', () => {
    cart.addItem({
      id: 4,
      name: 'Clavier mécanique',
      price: 119,
      quantity: 1,
    });

    const items = cart.getItems();
    items[0].quantity = 99;
    items.push({
      id: 5,
      name: 'Autre article',
      price: 10,
      quantity: 1,
    });

    expect(cart.getItems()).toEqual([
      {
        id: 4,
        name: 'Clavier mécanique',
        price: 119,
        quantity: 1,
      },
    ]);
  });
});
