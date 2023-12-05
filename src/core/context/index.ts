import { createContext } from 'react';
import { Category } from '@/core/types';

export const PriceContext = createContext<Category[]>([]);