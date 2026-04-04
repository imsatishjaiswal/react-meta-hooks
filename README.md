# react-meta-hooks

> **Modern React hooks for managing SEO, Open Graph, and document head.**

A modern, fast, TypeScript-first React npm package for managing `<head>` metadata.

[![npm version](https://badge.fury.io/js/react-meta-hooks.svg)](https://badge.fury.io/js/react-meta-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`react-meta-hooks` provides hook-centric APIs to manage your page's `<head>` tags (title, meta tags, links) efficiently. It supports both client-side rendering and SSR with request-scoped context isolation.

## Features

- ⚛️ **Hook-centric API**: Clean and intuitive hooks like `useTitle`, `useMeta`, `useSocialMeta`, and `useStructuredData`.
- ⚡ **Lightweight & Fast**: Batches DOM updates for optimal performance.
- 🧱 **Context Isolation**: `<MetaProvider>` ensures SSR thread-safety and isolates metadata per request.
- 🛠 **TypeScript First**: Full type safety out of the box.

## Installation

```bash
npm install react-meta-hooks
```

## Quick Start

### 1. Wrap your app with `MetaProvider`

```tsx
import React from 'react';
import { MetaProvider } from 'react-meta-hooks';
import App from './App';

const Root = () => (
  <MetaProvider>
    <App />
  </MetaProvider>
);

export default Root;
```

## Detailed Examples

### 1. Basic Metadata (`useTitle`, `useDescription`)
Easily update the page title and description.

```tsx
import { useTitle, useDescription } from 'react-meta-hooks';

const MyPage = () => {
  useTitle('Home Page | My App');
  useDescription('Welcome to my application where we manage metadata efficiently.');

  return <div>My Content</div>;
};
```

### 2. Social Media & SEO (`useSocialMeta`)
Generate Open Graph (`og:`) and Twitter (`twitter:`) tags with a single call.

```tsx
import { useSocialMeta } from 'react-meta-hooks';

const ProductPage = () => {
  useSocialMeta({
    title: 'Awesome Product',
    description: 'The best developer tool in the market.',
    image: 'https://example.com/product.jpg',
    url: 'https://example.com/product',
    card: 'summary_large_image', // Optional Twitter card type
  });

  return <div>Product Details</div>;
};
```

### 3. Structured Data (`useStructuredData`)
Inject JSON-LD for rich search results.

```tsx
import { useStructuredData } from 'react-meta-hooks';

const Article = () => {
  useStructuredData({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "New advancement in React Meta Hooks",
    "datePublished": "2024-03-31",
    "author": {
      "@type": "Person",
      "name": "Satish"
    }
  });

  return <article>...</article>;
};
```

### 4. Link Tags (`useLink`)
Manage `<link>` tags like canonical URLs or favicons.

```tsx
import { useLink } from 'react-meta-hooks';

const CanonicalPage = () => {
  useLink('canonical', 'https://example.com/canonical-url');
  useLink('icon', 'https://example.com/favicon.ico');

  return <div>Canonical Page</div>;
};
```

### 5. Custom Meta Tags (`useMeta`)
For any custom `<meta>` tags that aren't covered by specific hooks.

```tsx
import { useMeta } from 'react-meta-hooks';

const CustomPage = () => {
  // Sets <meta name="theme-color" content="#ffffff">
  useMeta('theme-color', '#ffffff');
  
  // Sets <meta property="robots" content="noindex">
  useMeta('robots', 'noindex');

  return <div>Private Page</div>;
};
```

### 6. Server-Side Rendering (SSR)
`MetaProvider` can be initialized with tags for SSR support.

```tsx
import { MetaProvider } from 'react-meta-hooks';

const serverInitTags = {
  title: 'Server Rendered Title',
  meta: { description: 'Server rendered description' },
  links: { canonical: 'https://example.com' },
  structuredData: []
};

function App() {
  return (
    <MetaProvider tags={serverInitTags}>
      {/* Your app components */}
    </MetaProvider>
  );
}
```

## API Reference

| Hook | Parameters | Description |
| --- | --- | --- |
| `useTitle` | `(title: string)` | Set the browser tab title. |
| `useDescription` | `(description: string)` | Set the SEO meta description. |
| `useLink` | `(rel: string, href: string)` | Set a generic `<link>` tag (e.g., canonical). |
| `useMeta` | `(name: string, content: string)` | Set a generic `<meta>` tag by name/property. |
| `useSocialMeta` | `(options: object)` | Batch set Open Graph and Twitter tags. |
| `useStructuredData`| `(data: object)` | Inject JSON-LD structured data script. |

## Development Scripts

- `npm run build`: Build for production (ESM, CJS, and types)
- `npm run test`: Run all unit tests
- `npm run prepublishOnly`: Runs build and tests securely before npm publish
- `npm run dev`: Start building in watch mode

## License

MIT
