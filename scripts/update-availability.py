#!/usr/bin/env python3
"""Roll the availability line forward so it never reads as stale.

Default: "Booking <month>". Names the current month up to the 19th, then
flips to the next one on the 20th, so it is never advertising a month that
is nearly gone.

Override: put a line in availability.txt and that text is used verbatim and
never rolled. Use it whenever Joel tells you something specific, e.g.
"Booked until November" or "Openings through September". Empty the file to
hand control back to the rolling default.
"""
import datetime as dt
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ['index.html', 'contact.html']
MARK = re.compile(r'(<p class="availability[^"]*">)([^<]*)(</p>)')


FLIP_DAY = 20


def rolling_text(today):
    """Current month until FLIP_DAY, then the next one."""
    month = today
    if today.day >= FLIP_DAY:
        month = (today.replace(day=1) + dt.timedelta(days=32)).replace(day=1)
    return f'Booking {month:%B}'


def main():
    today = dt.date.today()
    override = (ROOT / 'availability.txt')
    text = ''
    if override.exists():
        text = override.read_text(encoding='utf-8').strip().splitlines()[0].strip() if override.read_text(encoding='utf-8').strip() else ''
    source = 'availability.txt' if text else 'rolling default'
    if not text:
        text = rolling_text(today)

    changed = []
    for name in PAGES:
        p = ROOT / name
        s = p.read_text(encoding='utf-8')
        new = MARK.sub(lambda m: m.group(1) + text + m.group(3), s)
        if new != s:
            p.write_text(new, encoding='utf-8')
            changed.append(name)

    print(f'text   : {text}')
    print(f'source : {source}')
    print(f'changed: {", ".join(changed) if changed else "nothing, already current"}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
