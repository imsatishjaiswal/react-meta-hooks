import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetaProvider, useTitle, useMeta } from '../src';

const TestComponent = () => {
  useTitle('Test Title');
  useMeta('description', 'Test Description');
  return <div>Content</div>;
};

describe('Meta Hooks', () => {
  it('updates document metadata accurately', async () => {
    render(
      <MetaProvider>
        <TestComponent />
      </MetaProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('Test Title');
      const descMeta = document.querySelector('meta[name="description"]');
      expect(descMeta).toBeTruthy();
      expect(descMeta?.getAttribute('content')).toBe('Test Description');
    });
  });
});
