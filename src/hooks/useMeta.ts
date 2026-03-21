import { useEffect } from 'react';
import { useMetaContext } from '../MetaContext';

export const useMeta = (name: string, content: string) => {
  const { updateMeta } = useMetaContext();

  useEffect(() => {
    if (content) {
      updateMeta(name, content);
    }
  }, [name, content, updateMeta]);
};
