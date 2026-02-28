import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { MenuItem } from '../data/menu';

const PRODUCTS_COLLECTION = 'products';

export const getProducts = async (): Promise<MenuItem[]> => {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as MenuItem[];
};

export const getProduct = async (id: string): Promise<MenuItem | null> => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MenuItem;
    }
    return null;
};

export const addProduct = async (product: Omit<MenuItem, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    return docRef.id;
};

export const updateProduct = async (id: string, product: Partial<MenuItem>): Promise<void> => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, product);
};

export const deleteProduct = async (id: string): Promise<void> => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
};
