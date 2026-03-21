import { useEffect } from 'react';
import { useMetaContext } from '../MetaContext';

export const useTitle = (title: string) => {
  const { updateTag } = useMetaContext();

  useEffect(() => {
    if (title) {
      updateTag('title', title);
    }
  }, [title, updateTag]);
};
