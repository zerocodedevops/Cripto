# Implementation Plan - Technical SEO

Focus on technical performance and search engine discoverability through structured data and server-side visibility.

## Proposed Changes

### 1. Structured Data (JSON-LD)

#### [MODIFY] [SEO.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/components/common/SEO.tsx)

- Add a new optional prop `jsonLd` to the `Seo` component.
- Inject the JSON-LD script into the `<Helmet>` section.

### 2. LocalBusiness Schema

#### [MODIFY] [Home.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/features/home/Home.tsx) & [PymesService.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/features/services/PymesService.tsx)

- Pass a `LocalBusiness` schema object to the `Seo` component.
- Data to include:
  - Name: ZeroCode
  - Address: Madrid, Spain (Specific address placeholder or general Madrid center)
  - Telephone: +34 912 622 712 (from Footer)
  - Opening Hours: Mo-Fr 09:00-19:00

### 3. SSG & Non-JS Indexability

- Verify `vite-plugin-prerender` or similar is correctly generating static routes.
- Ensure all critical content is present in the initial HTML.

### 4. Performance & Mobile

- Verify image optimizations (WebP use).
- Ensure viewport meta tags are correct.

## Verification Plan

1. Check source code of the build to see if critical text exists outside the JS bundle.
2. Use browser tools to inspect the injected `<script type="application/ld+json">`.
3. Verify mobile layout responsiveness.
