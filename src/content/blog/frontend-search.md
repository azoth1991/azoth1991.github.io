---
title: "Great Search for a Static Blog"
description: "Using a build-time content index and Fuse.js for lightweight fuzzy search without a backend."
pubDate: 2026-08-12
tags: [JavaScript, Search]
featured: true
draft: false
---

## The idea behind static search

At build time, titles, summaries, and tags are serialized into the page. The browser only performs lightweight matching. For a small or medium personal blog, this is often faster and simpler than a remote search service.

## Keeping the index small

Avoid shipping full article bodies to every visitor. Titles, summaries, and tags cover most navigational search needs.
