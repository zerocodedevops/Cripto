# Implementation Plan - SEO Consolidation into PymesService

Merge the recently created SEO article content into the existing `/paginas-web-pymes-autonomos` route to avoid route duplication and strengthen the main service page's authority.

## Proposed Changes

### 1. Merge Content into PymesService

#### [MODIFY] [PymesService.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/features/services/PymesService.tsx)

- Upgrade `<Seo />` tags with the optimized content from `WebPymesMadrid.tsx`.
- Refactor the page structure to include:
  - The new H1 title ("Desarrollo web profesional para pymes y autónomos en Madrid").
  - The "Benefits" section with cards.
  - The "Pricing" grid.
  - The "Sidebar" with stats and local Madrid neighborhoods.
  - The updated FAQ section.
- Keep the existing "Problemas que resolvemos" section as it adds value.

### 2. Router Cleanup

#### [MODIFY] [router.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/app/router.tsx)

- Remove `WebPymesMadrid` lazy import.
- Delete the `/servicios/desarrollo-web-madrid-pymes` route.

### 3. File Cleanup

#### [DELETE] [WebPymesMadrid.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/features/services/WebPymesMadrid.tsx)

- Remove the temporary landing page file.

### 4. Link Updates

#### [MODIFY] [Footer.tsx](file:///c:/Users/dgper/Proyectos/ZeroCode/src/components/layout/Footer.tsx)

- Point the "Desarrollo Web Pymes Madrid" link to `/paginas-web-pymes-autonomos`.

## Verification Plan

### Manual Verification

1. Navigate to `/paginas-web-pymes-autonomos` and verify it contains all the new SEO information and sections.
2. Confirm the document title and meta description are the optimized ones.
3. Test all CTA buttons.
4. Verify that the footer link now points to this page.
5. Confirm the `/servicios/desarrollo-web-madrid-pymes` route now returns a 404.
