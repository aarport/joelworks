#!/usr/bin/env python3
"""Fail if any page references an image or page that is not there.

Run before pushing. Deleting an image that another page still uses is easy to
do and invisible until someone loads that page.
"""
import glob, os, re, sys

bad = []
for f in sorted(glob.glob('*.html')):
    t = open(f, encoding='utf-8').read()
    refs = re.findall(r'<img[^>]*src="([^"]+)"', t)
    for ss in re.findall(r'srcset="([^"]+)"', t):
        refs += [p.strip().split(' ')[0] for p in ss.split(',') if p.strip()]
    refs += re.findall(r'<link[^>]*href="([^"]+\.(?:css|svg))"', t)
    for href in re.findall(r'<a[^>]*href="([^"]+)"', t):
        if href.startswith(('http', 'mailto:', 'tel:', 'sms:', '#')):
            continue
        p = href.split('#')[0].split('?')[0].lstrip('/')
        if not p:
            p = 'index.html'
        elif not os.path.exists(p) and os.path.exists(p + '.html'):
            p += '.html'
        refs.append(p)
    for r in refs:
        if r.startswith('http'):
            continue
        if not os.path.exists(r.lstrip('/')):
            bad.append((f, r))

for f, r in bad:
    print(f'BROKEN  {f}  ->  {r}')
print(f'{len(bad)} broken reference(s)' if bad else 'All references resolve.')
sys.exit(1 if bad else 0)
