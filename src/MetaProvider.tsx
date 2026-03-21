import React, { useCallback, useMemo, useRef } from 'react';
import { MetaContext, MetaContextValue } from './MetaContext';
import { createEmptyTags, scheduleDomUpdate, MetaTags } from './domManager';

interface MetaProviderProps {
  children: React.ReactNode;
  tags?: MetaTags; // useful for SSR to pass in initial tags
}

export const MetaProvider: React.FC<MetaProviderProps> = ({ children, tags: initialTags }) => {
  const tagsRef = useRef<MetaTags>(initialTags || createEmptyTags());

  const triggerUpdate = useCallback(() => {
    if (typeof window !== 'undefined') {
      scheduleDomUpdate(tagsRef.current);
    }
  }, []);

  const updateTag = useCallback((type: 'title' | 'description', value: string) => {
    tagsRef.current[type] = value;
    if (type === 'description') {
      tagsRef.current.meta['description'] = value;
    }
    triggerUpdate();
  }, [triggerUpdate]);

  const updateMeta = useCallback((name: string, content: string) => {
    tagsRef.current.meta[name] = content;
    triggerUpdate();
  }, [triggerUpdate]);

  const updateLink = useCallback((rel: string, href: string) => {
    tagsRef.current.links[rel] = href;
    triggerUpdate();
  }, [triggerUpdate]);

  const addStructuredData = useCallback((data: Record<string, any>) => {
    // Avoid duplicates by simple stringify matching
    const strData = JSON.stringify(data);
    const exists = tagsRef.current.structuredData.some(d => JSON.stringify(d) === strData);
    if (!exists) {
      tagsRef.current.structuredData.push(data);
      triggerUpdate();
    }
  }, [triggerUpdate]);

  const value = useMemo<MetaContextValue>(() => ({
    tags: tagsRef.current,
    updateTag,
    updateMeta,
    updateLink,
    addStructuredData,
  }), [updateTag, updateMeta, updateLink, addStructuredData]);

  return <MetaContext.Provider value={value}>{children}</MetaContext.Provider>;
};
