import { useEffect } from 'react';
import { useMetaContext } from '../MetaContext';

/**
 * Hook to manage <link> tags in the <head>.
 * @param rel The 'rel' attribute of the link (e.g., 'canonical', 'favicon')
 * @param href The 'href' attribute of the link
 */
export const useLink = (rel: string, href: string) => {
  const { updateLink } = useMetaContext();

  useEffect(() => {
    if (href) {
      updateLink(rel, href);
    }
  }, [rel, href, updateLink]);
};
