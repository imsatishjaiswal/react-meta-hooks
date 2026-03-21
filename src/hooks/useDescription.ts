import { useEffect } from 'react';
import { useMetaContext } from '../MetaContext';

export const useDescription = (description: string) => {
  const { updateTag } = useMetaContext();

  useEffect(() => {
    if (description) {
      updateTag('description', description);
    }
  }, [description, updateTag]);
};
