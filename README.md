# Joel Works

Static marketing site for Joel Works, an interior renovation contractor based in
Simcoe, Ontario, serving Norfolk County and area.

Plain HTML and CSS. No framework, no build step, no npm. Everything is served
straight from the repo root so GitHub Pages can host it as-is.

## Structure

```
index.html      home
services.html   services
gallery.html    recent work
contact.html    contact details + quote form
reviews.html    review request page: the link Joel texts after a job
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
into each page. If you change one, change all six.

`reviews.html` is deliberately kept out of the main nav and marked `noindex`.
It is meant to be reached from a link Joel texts customers, not browsed to.

## URLs

GitHub Pages resolves `/foo` to `foo.html`, so every page is linked without
an extension and without a trailing slash: `/services`, `/gallery`,
`/contact`, `/reviews`, `/thanks`. Keep internal links in that form, and keep
the canonical tags matching it, or the same page becomes reachable at several
URLs.

Contact details appear in three places per page (header, footer, and the
sticky call bar) plus the buttons in the page body. Search and replace:

- phone: `(226) 931-5768` and `tel:+12269315768` / `sms:+12269315768`
- email: `joel@joelworks.ca`

## Still placeholder

- The "Meet Joel" photo (`about.svg`) is still a placeholder. Everything in
  the gallery and the hero is a real Joel job
- The "Meet Joel" bio on the home page, assembled from the Facebook blurb and
  the reviews rather than written by Joel
- Gallery captions describe the work but name no towns. We do not know which
  town most of those jobs were in; ask Joel, a real town name is worth having
- Deposit terms and payment methods on the services page

- Both review buttons in `reviews/index.html`, and the Google/Facebook links in
  every footer, are `href="#"` until the real profile URLs are in
- Availability appears on the home and contact pages and goes stale fastest.
  See "Availability line" below

## Confirmed by Joel

Insurance (no WSIB needed, no employees), free quotes, and
the service area: Norfolk County plus Brantford and Tillsonburg. He does not
want calls about roofing, exterior siding, windows and doors, plumbing or
electrical.

## House style

No em dashes or en dashes anywhere. Use commas, colons or full stops.

## Availability line

The line naming a month on the home and contact pages. It goes stale faster
than anything else on the site, and a stale one is worse than none: it tells
visitors nobody maintains the place.

It updates itself. `.github/workflows/availability.yml` runs on the 1st of
each month and rolls it to "Openings through <next month>", commits, and the
site redeploys.

**To say something specific, put one line in `availability.txt`:**

    Booked solid until November

That text is then used verbatim and never rolled. Empty the file to hand
control back to the rolling default. Run `python3
scripts/update-availability.py` to apply it locally, or trigger the workflow
by hand from the Actions tab.

**Two things to watch.** The rolling default claims Joel has openings next
month, every month, which nobody confirms. If he gets booked up, put it in
`availability.txt` or the site will keep advertising capacity he does not
have.

And the pill has a green dot that reads as "available". If you set a message
saying the opposite, the dot contradicts the words; either reword it or drop
the pill for that period.

## Contact form

`contact.html` posts to FormSubmit, which needs no account. Enquiries go to
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
