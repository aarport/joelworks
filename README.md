# Joel Works

Static marketing site for Joel Works — interior renovation contractor based in
Simcoe, Ontario, serving Norfolk County and area.

Plain HTML and CSS. No framework, no build step, no npm. Everything is served
straight from the repo root so GitHub Pages can host it as-is.

## Structure

```
index.html      home
services.html   services
gallery.html    recent work
contact.html    contact details + quote form
reviews/        review request page — the link Joel texts after a job
css/style.css   the whole stylesheet
images/         logo + placeholder job photos (SVG)
favicon.svg     simplified logo mark
CNAME           custom domain (joelworks.ca)
.nojekyll       tells GitHub Pages to skip Jekyll processing
```

## Local preview

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173. Opening the files directly with `file://`
works too, but a server is closer to how GitHub Pages behaves.

## Editing

There is no templating, so the header, footer and bottom call bar are copied
into each page. If you change one, change all five — and note `reviews/index.html`
sits one level down, so its paths are prefixed with `../`.

`reviews/` is deliberately kept out of the main nav and marked `noindex`. It is
meant to be reached from a link Joel texts customers, not browsed to.

Contact details appear in three places per page — header, footer, and the
sticky call bar — plus the buttons in the page body. Search and replace:

- phone: `(226) 931-5768` and `tel:+12269315768` / `sms:+12269315768`
- email: `joel@joelworks.ca`

## Still placeholder

- All photos in `images/` except `logo.svg` / `logo-footer.svg`
- The "Meet Joel" bio on the home page
- Hours on the contact page
- The trust strip claims on the home page (insured, years in trade)
- Pricing and deposit details on the services page
- The contact form needs a form service — see the comment in `contact.html`
- Both review buttons in `reviews/index.html`, and the Google/Facebook links in
  every footer, are `href="#"` until the real profile URLs are in
- "Fully insured" appears in all five footers and the home page trust strip —
  confirm with Joel before this goes live

## Logo

`images/logo.svg` is converted from the original Illustrator file (dark
charcoal artwork, for light backgrounds). `images/logo-footer.svg` is the same
artwork recoloured white for the dark footer — its cut-out shapes are filled
with the footer background `#12293f`, so if that colour changes the file must
be regenerated.
