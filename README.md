# Making Your Astro Site Discoverable by Google

Your site (https://mengwa.net) is now ready for Google indexing. Here are the steps to ensure it is discoverable:

## 1. Robots.txt and Sitemap

- `robots.txt` is present and allows all search engines except for `/nogooglebot/`.
- Sitemap is available at `/sitemap-index.xml` and includes all static pages and blog posts.

## 2. SEO Best Practices

- The site includes all essential SEO meta tags, Open Graph, Twitter cards, and JSON-LD structured data.
- Canonical URLs and descriptions are set for each page.

## 3. Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/).
2. Add your site property: `https://mengwa.net`
3. Verify ownership. The layout supports Google site verification via a meta tag. Set the environment variable `PUBLIC_GOOGLE_SITE_VERIFICATION` to the value provided by Google.
4. After verification, go to "Sitemaps" in the Search Console and submit:  
   ```
   https://mengwa.net/sitemap-index.xml
   ```
5. Google will now crawl and index your site.

## 4. Tips

- Make sure your site is accessible to the public (which it is, since it's deployed).
- For faster indexing, share your site on social media or get backlinks.
- Check Search Console for crawl errors or indexing issues.
**Your site is now fully set up for Google search!**
