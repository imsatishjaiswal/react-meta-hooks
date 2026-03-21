import { createContext, useContext } from 'react';
import { MetaTags, createEmptyTags } from './domManager';

export interface MetaContextValue {
  tags: MetaTags;
  updateTag: (type: 'title' | 'description', value: string) => void;
  updateMeta: (name: string, content: string) => void;
  updateLink: (rel: string, href: string) => void;
  addStructuredData: (data: Record<string, any>) => void;
}

export const MetaContext = createContext<MetaContextValue | null>(null);

export const useMetaContext = () => {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error('useMetaContext must be used within a MetaProvider');
  }
  return context;
};
