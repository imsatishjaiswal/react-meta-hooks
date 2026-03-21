import { useEffect } from 'react';
import { useMetaContext } from '../MetaContext';

export const useStructuredData = (data: Record<string, any>) => {
  const { addStructuredData } = useMetaContext();

  useEffect(() => {
    if (data) {
      addStructuredData(data);
    }
  }, [data, addStructuredData]);
};
