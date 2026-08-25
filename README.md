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

## Gallery

One tile per project, showing the finished room. Clicking opens a shadowbox
with every photo from that job plus a note on how it was built.

Project data lives in a single JSON block at the bottom of `gallery.html`,
under `id="project-data"`. To add a job, drop the photos in `images/`, add an
entry there, and add a tile to the mosaic pointing at it with
`data-project`.

The grid is a masonry column flow, not a row grid. A row grid leaves holes
wherever the spans do not pack, and forcing photos into fixed cells crops
them. In columns nothing is cropped and there are no gaps: every tile runs at
its true aspect.

The one exception is the feature image at the top, which is cropped to a wide
band. That slot needs a landscape photo; a portrait one becomes a thin
useless strip.

Order is curated, strongest first, not chronological. Both the feature and
the tile order are set near the bottom of `gallery.html`; regenerate rather
than hand-edit if you reorder.

## JavaScript

Three scripts, all small and all optional. `contact.html` reads `?job=` and
preselects the dropdown. `gallery.html` runs the shadowbox. `index.html` reveals each section as it
comes into view, on load for what is already on screen and on scroll for the
rest; it only hides a section after adding a class that proves a script is
running, so with JavaScript off nothing disappears. Without any of them the
pages still work: the form submits, the gallery shows the finished shots and
every section is visible. Everything else, including the hero parallax and the trade-bar photo
swapping, is CSS. Keep it that way if you can.

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

Insurance (no WSIB needed, no employees), free quotes, and the service area:
Norfolk County plus Brantford and Tillsonburg. He does not want calls about
roofing, exterior siding, windows and doors, plumbing or electrical.

Background: Renovations Technician co-op, Niagara College, 2013. In the trade
since 2018. Joel Works part time from 2020, full time from 2021. Do not claim
he has been renovating since 2013, which was only occasional work, and do not
name the business he worked at before Joel Works.

## House style

No em dashes or en dashes anywhere. Use commas, colons or full stops.

## Availability line

The line naming a month on the home and contact pages. It goes stale faster
than anything else on the site, and a stale one is worse than none: it tells
visitors nobody maintains the place.

It updates itself. `.github/workflows/availability.yml` runs on the 1st and
the 20th and sets it to "Booking <month>": the current month up to the 19th,
then the next one from the 20th, so it never advertises a month that is
nearly over.

    1-19 Sep   ->  Booking September
    20-30 Sep  ->  Booking October

**To say something specific, put one line in `availability.txt`:**

    Booked solid until November

That text is then used verbatim and never rolled. Empty the file to hand
control back to the rolling default. Run `python3
scripts/update-availability.py` to apply it locally, or trigger the workflow
by hand from the Actions tab.

"Booking <month>" is deliberately a scheduling statement, not a promise of a
free slot. It stays true whether or not Joel has a gap that month, which
matters because nobody confirms it before it publishes.

One thing to watch: the pill has a green dot that reads as "available". If
you set a message saying the opposite, the dot contradicts the words; either
reword it or drop the pill for that period.

## Services page

Five sections, one per trade, each with a feature photo, detail thumbnails and
a quote button. Every image slot is a fixed aspect with `object-fit: cover`, so
a replacement photo crops itself whatever shape or rotation it arrives in. To
swap one, change the `src`; nothing else needs touching.

The quote buttons carry the trade through: `/contact?job=Tile%20work`
preselects that option in the contact form's dropdown. If you add a section,
its `job` value has to match an `<option>` in `contact.html` exactly, or the
preselect silently does nothing.

**Photos still wanted.** Bathrooms has no shower shot, which is the strongest
thing Joel builds. Finish carpentry has none of its own and borrows a door
from the basement job; built-ins, wainscoting, trim runs and closets would all
help.

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
