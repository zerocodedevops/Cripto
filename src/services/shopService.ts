import { db } from '../config/firebase';
import { collection, getDocs, doc, setDoc, query, orderBy, getDoc } from 'firebase/firestore';
import { Product } from '../features/projects/ecommerce/services/productsApi';
import { mockProducts } from '../features/projects/ecommerce/data/mockProducts';

const PRODUCTS_COLLECTION = 'shop_products';

export const ShopService = {
  // Get all products from Firestore
  getProducts: async (): Promise<Product[]> => {
    try {
      // Check if running in mock mode (db is empty object)
      if (!db || Object.keys(db).length === 0) {
        console.warn('Firestore not configured, falling back to mock data');
        return [];
      }

      const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('id'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(doc => doc.data() as Product);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
      // Return empty to trigger fallback in the API layer
      return []; 
    }
  },

  // Seed database with mock data (one-time use)
  seedDatabase: async () => {
    try {
      if (!db || Object.keys(db).length === 0) {
         console.warn('Cannot seed: Firestore not configured');
         return false;
      }

      console.log('Seeding database...');
      const batchPromises = mockProducts.map(product => {
        const docRef = doc(db, PRODUCTS_COLLECTION, product.id.toString());
        return setDoc(docRef, product);
      });
      
      await Promise.all(batchPromises);
      console.log('Database seeded successfully!');
      return true;
    } catch (error) {
      console.error('Error seeding database:', error);
      return false;
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
        if (!db || Object.keys(db).length === 0) {
           return null;
        }

        // Since we are not using standard auto-IDs for seeding but custom IDs, we query by document ID
        // The seed uses product.id.toString() as document ID
        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
  }
};
