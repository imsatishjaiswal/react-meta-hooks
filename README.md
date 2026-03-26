# react-meta-hooks

> **React Meta Hooks provides fast, declarative head management with SEO-ready meta tags, JSON-LD, and modern React ergonomics.**

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

### 2. Use hooks in your components

```tsx
import React from 'react';
import { useTitle, useDescription, useSocialMeta } from 'react-meta-hooks';

const BlogPost = () => {
  useTitle('My Awesome Blog Post');
  useDescription('Learn how to manageReact metadata at speed.');
  useMeta('keywords', 'best blog, top blog, digital blog, awesome blog');
  useMeta('og:type', 'website');
  useMeta('twitter:card', 'summary_large_image');
  useSocialMeta({
    title: 'My Awesome Blog Post',
    description: 'Learn how to manageReact metadata at speed.',
    image: 'https://example.com/og-image.jpg',
    url: 'https://example.com/blog/my-awesome-post',
  });
  useStructuredData({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "My blog",
    "url": "https://test123.com",
    "logo": "https://test123.com/logo.png",
    "sameAs": [
      "https://twitter.com/myblog123",
      "https://github.com/myblog123"
    ]
  });
  return (
    <div>
      <h1>My Awesome Blog Post</h1>
      <p>Content goes here...</p>
    </div>
  );
};

export default BlogPost;
```

## Supported Hooks

- `useTitle(title: string)`: Updates the document title.
- `useDescription(description: string)`: Sets the `<meta name="description">` tag.
- `useMeta(name: string, content: string)`: Generic hook for any `<meta>` tag.
- `useSocialMeta(options)`: Easily creates Open Graph (`og:`) and Twitter (`twitter:`) tags.
- `useStructuredData(data: object)`: Injects JSON-LD structured data for SEO.

## Development Scripts

- `npm run dev`: Start development build in watch mode
- `npm run build`: Build for production (ESM, CJS, and types)
- `npm run test`: Run Vitest unit tests
- `npm run prepublishOnly`: Runs build and tests securely before npm publish

## License

MIT
