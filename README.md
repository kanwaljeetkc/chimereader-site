# Chime Reader domain forwarding

This existing GitHub Pages site forwards visitors from `chimereader.com` and
`www.chimereader.com` to the website at `https://www.chimereader.ai`. GitHub Pages
publishes the repository root from `main`; no new paid service is required.
Keep `CNAME`, `.nojekyll`, and the existing Pages settings. After the forwarding
commit is deployed and verified against GitHub, replace Namecheap's two URL Redirect
records with the original GitHub apex A records (`185.199.108.153`,
`185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` CNAME
`kanwaljeetkc.github.io.`. Preserve all email records and nameservers. GitHub
provides HTTPS for both `.com` hostnames; verify certificate validity at cutover.

This is an immediate **browser redirect**, not an HTTP 301 to `.ai`. Each page
uses `location.replace` to avoid adding the forwarding page to browser history,
an immediate meta refresh when JavaScript is disabled, and a visible destination
link. The JavaScript destination is always the fixed `https://www.chimereader.ai`
origin; URL parameters cannot select another host.

| Old path | Destination |
| --- | --- |
| `/`, `/index.html` | `https://www.chimereader.ai/` |
| `/support`, `/privacy`, `/terms`, `/age-rating` | Same path on `https://www.chimereader.ai` |
| Those pages with a trailing slash, `/index.html`, or `.html` | Same canonical path on `.ai` |
| `/demo`, `/reading`, and the existing reading essays | `https://www.chimereader.ai/#experience` |
| Unknown paths, served by `404.html` | `https://www.chimereader.ai/` |

Equivalent homepage and support/legal routes preserve their query string and
fragment when JavaScript is enabled. Retired content and unknown paths discard
them because those old anchors/routes have no matching page on the new site.
With JavaScript disabled, the fixed visible destination and meta refresh work
without query/fragment preservation. The original reading articles remain in Git
history. The forwarding documents use noindex and canonical links to `.ai`.

Publish by reviewing and pushing the forwarding commit to `main`. Verify the
GitHub Pages build completes and serves the new files before restoring GitHub
web DNS. Then test both `.com` hostnames over HTTPS, including
support/legal URLs, `.html` aliases, an old essay, and an unknown path. Browser
navigation is required to verify the client redirect; `curl -L` does not execute
JavaScript or meta refresh. To roll back, revert the forwarding commit and let
Pages rebuild; no DNS change is needed.
