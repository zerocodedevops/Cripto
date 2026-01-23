import { describe, it, expect } from 'vitest';
import authReducer, { login, logout } from '../authSlice';
import cartReducer, { addToCart, removeFromCart } from '../cartSlice';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('Auth Slice', () => {
  const initialState = { user: null, isAuthenticated: false };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const user = { username: 'testuser' };
    const actual = authReducer(initialState, login(user));
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.user).toEqual(user);
    expect(globalThis.localStorage.getItem('ecommerce_user')).toContain('testuser');
  });

  it('should handle logout', () => {
    const loggedState = { user: { username: 'testuser' }, isAuthenticated: true };
    const actual = authReducer(loggedState, logout());
    expect(actual.isAuthenticated).toEqual(false);
    expect(actual.user).toEqual(null);
  });
});

describe('Cart Slice', () => {
  const initialState = { items: [], isOpen: false, status: 'idle' as const };

  it('should handle initial state', () => {
    // @ts-ignore
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToCart', () => {
    const product = { id: 1, title: 'Test Product', price: 100, image: 'test.png', category: 'test', description: 'desc', rating: { rate: 5, count: 10 } };
    const actual = cartReducer(initialState, addToCart(product));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].quantity).toEqual(1);
    // @ts-ignore
    expect(actual.items[0].size).toBeUndefined();
  });

  it('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{ id: 1, title: 'Test Product', price: 100, image: 'test.png', quantity: 1, category: 'test', description: 'desc', rating: { rate: 5, count: 10 } }],
      isOpen: false,
      status: 'idle' as const
    };
    const actual = cartReducer(stateWithItem, removeFromCart({ id: 1 }));
    expect(actual.items.length).toEqual(0);
  });
});
