SEO Implementation Notes

- Replace placeholder `https://your-domain.com` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with your production domain.
- Replace `og-image.png` and `logo.png` paths with real assets in `public/`.
- To customize meta per page, set `meta.title` and `meta.description` on the route (see `src/router/index.js`) or call `updateMeta()` from a component after fetching page-specific data.
- For dynamic pages (course detail), update the meta from the page component once the course data loads. Example:

```js
import { updateMeta } from '@/utils/seo'

// after fetching course
updateMeta({ title: course.title, description: course.short_description, canonical: `https://your-domain.com/courses/${course.slug}` })
```

- Consider generating `sitemap.xml` automatically from server-side routes for large sites.
