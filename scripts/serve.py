#!/usr/bin/env python3
"""Local preview server for the site.

Serves the repo root regardless of where it is launched from, and takes its
port from the PORT environment variable so the preview tooling can assign
one. Nothing here needs a fixed port.
"""
import functools
import http.server
import os
import pathlib
import socketserver

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = int(os.environ.get('PORT', '4173'))


class Handler(http.server.SimpleHTTPRequestHandler):
    """Serve /foo as foo.html, the way GitHub Pages does."""

    def translate_path(self, path):
        local = super().translate_path(path)
        if not os.path.exists(local) and not path.endswith('/'):
            candidate = local + '.html'
            if os.path.exists(candidate):
                return candidate
        return local


if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    handler = functools.partial(Handler, directory=str(ROOT))
    with socketserver.TCPServer(('127.0.0.1', PORT), handler) as httpd:
        print(f'serving {ROOT} on http://127.0.0.1:{PORT}', flush=True)
        httpd.serve_forever()
