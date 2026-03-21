export type MetaTags = {
  title?: string;
  description?: string;
  meta: Record<string, string>;
  links: Record<string, string>;
  structuredData: Record<string, any>[];
};

export const createEmptyTags = (): MetaTags => ({
  meta: {},
  links: {},
  structuredData: [],
});

let domUpdateScheduled = false;
let globalTags = createEmptyTags();

export const scheduleDomUpdate = (tags: MetaTags) => {
  globalTags = tags;
  if (!domUpdateScheduled && typeof window !== 'undefined') {
    domUpdateScheduled = true;
    Promise.resolve().then(() => {
      applyToDom(globalTags);
      domUpdateScheduled = false;
    });
  }
};

const applyToDom = (tags: MetaTags) => {
  if (tags.title) {
    document.title = tags.title;
  }

  // Update meta tags
  Object.entries(tags.meta).forEach(([name, content]) => {
    let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        el.setAttribute('property', name);
      } else {
        el.setAttribute('name', name);
      }
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  });

  // Update links (e.g., canonical, favicon, manifest)
  Object.entries(tags.links).forEach(([rel, href]) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  });

  // Update structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-react-meta-hooks]');
  existingScripts.forEach((script) => script.remove());

  tags.structuredData.forEach((data, index) => {
    const el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-react-meta-hooks', 'true');
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  });
};
