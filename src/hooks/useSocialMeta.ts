import { useEffect } from 'react';
import { useMetaContext } from '../MetaContext';

interface SocialMetaOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export const useSocialMeta = (options: SocialMetaOptions) => {
  const { updateMeta } = useMetaContext();

  useEffect(() => {
    if (options.title) {
      updateMeta('og:title', options.title);
      updateMeta('twitter:title', options.title);
    }
    if (options.description) {
      updateMeta('og:description', options.description);
      updateMeta('twitter:description', options.description);
    }
    if (options.image) {
      updateMeta('og:image', options.image);
      updateMeta('twitter:image', options.image);
    }
    if (options.url) {
      updateMeta('og:url', options.url);
    }
    if (options.twitterCard) {
      updateMeta('twitter:card', options.twitterCard);
    }
  }, [options, updateMeta]);
};
