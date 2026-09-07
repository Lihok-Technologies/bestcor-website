#!/usr/bin/env python3
"""
Live production acceptance checks for the Bestcor site.

Usage: python3 scripts/live-acceptance.py [BASE_URL]
Verifies routes, metadata, sitemap/robots, key assets and internal links.
"""
from __future__ import annotations

import re
import sys
import urllib.request
import urllib.error
from html.parser import HTMLParser

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://bestcor.ph").rstrip("/")

ROUTES = ["/", "/about", "/services", "/services/preventive-maintenance",
          "/services/testing-diagnostics", "/projects", "/safety-quality",
          "/contact", "/gallery"]

HEADERS = {"User-Agent": "BestcorLiveAcceptance/1.0"}


def get(url: str, timeout: int = 30):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, (e.read().decode("utf-8", "replace") if e.fp else "")
    except Exception as e:  # noqa: BLE001
        return -1, str(e)


class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonical = None
        self.h1 = None
        self.title = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta" and a.get("name"):
            self.meta.setdefault(a["name"].lower(), a.get("content", ""))
        if tag == "meta" and a.get("property"):
            self.meta.setdefault(a["property"].lower(), a.get("content", ""))
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        if tag == "h1" and self.h1 is None:
            self.h1 = True
        if tag == "title" and self.title is None:
            self.title = True


def main():
    failures = []
    print(f"Base: {BASE}\n")

    # routes + metadata
    for route in ROUTES:
        status, body = get(BASE + route)
        ok = status == 200
        if ok:
            p = MetaParser()
            p.feed(body)
            desc_ok = bool(p.meta.get("description"))
            og_ok = bool(p.meta.get("og:title")) and bool(p.meta.get("og:image"))
            expected_canon = BASE if route == "/" else BASE + route
            canon_ok = bool(p.canonical) and p.canonical.rstrip("/") == expected_canon.rstrip("/")
            # 404 strings can appear inside serialized <script> payloads;
            # evaluate only the rendered document (scripts stripped)
            stripped = re.sub(r"<script.*?</script>", "", body, flags=re.S)
            notfound = "This page does not exist." in stripped or p.meta.get("title", "") == "Page not found"
            ok = ok and desc_ok and og_ok and not notfound
            print(f"{'PASS' if ok else 'FAIL'} {route:<45} http={status} desc={desc_ok} og={og_ok} canon={canon_ok} notFound={notfound}")
            if not ok:
                failures.append(route)
        else:
            print(f"FAIL {route:<45} http={status}")
            failures.append(route)

    # sitemap + robots
    for asset in ["/sitemap.xml", "/robots.txt"]:
        status, body = get(BASE + asset)
        ok = status == 200 and len(body) > 50
        print(f"{'PASS' if ok else 'FAIL'} {asset:<45} http={status} len={len(body)}")
        if not ok:
            failures.append(asset)

    # static assets
    for asset in ["/images/hero-home.webp", "/images/bestcor-logo.png", "/images/og-home.jpg",
                  "/icon.png", "/apple-icon.png"]:
        status, _ = get(BASE + asset)
        ok = status == 200
        print(f"{'PASS' if ok else 'FAIL'} asset {asset:<38} http={status}")
        if not ok:
            failures.append(asset)

    # homepage internal link crawl
    status, body = get(BASE + "/")
    hrefs = set(re.findall(r'href="(/[^"#?]*)"', body))
    hrefs = {h for h in hrefs if h.startswith(("/", BASE)) and not h.startswith("//")}
    print(f"\nInternal links on homepage: {len(hrefs)}")
    broken = []
    for h in sorted(hrefs):
        if h.startswith("http"):
            continue
        st, _ = get(BASE + h)
        if st >= 400:
            broken.append((h, st))
            print(f"  FAIL {h} -> {st}")
    if not broken:
        print("  all internal links OK")
    else:
        failures.append(f"broken-links:{len(broken)}")

    print("\n" + ("ALL CHECKS PASSED ✔" if not failures else f"FAILURES: {failures}"))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
