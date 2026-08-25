# Joel Works

Static marketing site for Joel Works, an interior renovation contractor based in
Simcoe, Ontario, serving Norfolk County and area.

Plain HTML and CSS. No framework, no build step, no npm. Everything is served
straight from the repo root so GitHub Pages can host it as-is.

## Structure

```
index.html      home
services/       services
gallery/        recent work
contact/        contact details + quote form
reviews/        review request page: the link Joel texts after a job
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
into each page. If you change one, change all five. Note that `reviews/index.html`
sits one level down, so its paths are prefixed with `../`.

`reviews/` is deliberately kept out of the main nav and marked `noindex`. It is
meant to be reached from a link Joel texts customers, not browsed to.

Contact details appear in three places per page (header, footer, and the
sticky call bar) plus the buttons in the page body. Search and replace:

- phone: `(226) 931-5768` and `tel:+12269315768` / `sms:+12269315768`
- email: `joel@joelworks.ca`

## Still placeholder

- All photos in `images/` except `logo.svg` / `logo-footer.svg`
- The "Meet Joel" bio on the home page, assembled from the Facebook blurb and
  the reviews rather than written by Joel
- Deposit terms and payment methods on the services page

- Both review buttons in `reviews/index.html`, and the Google/Facebook links in
  every footer, are `href="#"` until the real profile URLs are in
- "Currently booking into Fall 2026" appears on the home and contact pages and
  will go stale. Both are marked with an HTML comment

## Confirmed by Joel

Insurance (no WSIB needed, no employees), free quotes, booking into Fall, and
the service area: Norfolk County plus Brantford and Tillsonburg. He does not
want calls about roofing, exterior siding, windows and doors, plumbing or
electrical.

## House style

No em dashes or en dashes anywhere. Use commas, colons or full stops.

## Contact form

`contact/index.html` posts to FormSubmit, which needs no account. Enquiries go to
`joel@joelworks.ca`, which forwards to Joel's inbox. The form redirects to
`/thanks` on success.

**Status: activated and verified end to end on 25 Aug 2026.** A test
submission reached Joel's inbox through the forward, with all fields intact.

Reply-To is set from the `email` field, so replying to a notification goes
straight back to the customer.

FormSubmit's free tier appends a sponsor ad to the notification email. It is
only in the copy Joel receives, never visible to anyone submitting the form.

If notifications ever stop arriving, check spam first: `joel@joelworks.ca`
forwards rather than being a real mailbox, and forwarding breaks SPF
alignment, which AOL treats harshly.

To swap services later, only the `action` attribute needs changing. The
hidden `_subject`, `_template`, `_next` and `_captcha` fields are
FormSubmit-specific; `_honey` is a spam trap and should stay whatever the
service.

## Logo

`images/logo.svg` is converted from the original Illustrator file (dark
charcoal artwork, for light backgrounds). `images/logo-footer.svg` is the same
artwork recoloured white for the dark footer. Its cut-out shapes are filled
with the footer background `#12293f`, so if that colour changes the file must
be regenerated.
