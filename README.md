# Saange Tamang — academic website

Personal academic portfolio with equal emphasis on wireless communications and machine learning.

**Website:** https://sange-creator.github.io

## Local development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. The preview builds once at startup. After editing, run `npm run build` in a second terminal and reload the browser.

```sh
npm run build
npm run check
```

The output is plain HTML, CSS, fonts, figures, and PDFs in `dist/`. Core content works without JavaScript. The only optional client script copies a BibTeX citation when the Clipboard API is available.

## Editing

- `content/profile.mjs`: name, public links, current paper title/status, update label, and verified courses.
- `templates/`: Home, Research, Projects, CV, and custom 404 page, with a shared layout.
- `site/assets/style.css`: responsive typography, layout, focus styles, reduced-motion and print styles.
- `site/assets/documents/`: downloadable CVs, public paper, and original results figure.
- `cv-source/`: editable LaTeX sources and the CV build script. Rebuild PDFs before running the site build.

The CVs and text pages are separate editable artifacts. When a title, date, publication status, or credential changes, update both the website and CV sources. Verify the PDF page counts and recheck the rendered pages before committing.

## Publishing

The GitHub Actions workflow builds, validates, and deploys `dist/` on a push to `main`. Pull requests run the build and checks without deployment. Repository Settings → Pages must use **GitHub Actions** as the publishing source.

The site is intended for the root user-site URL. For a repository subpath or a new custom domain, update the canonical URL and root-relative asset/navigation paths before publishing.

## Content and attribution

- The paper title is taken from the current public manuscript and repository metadata. The author confirmed acceptance for presentation at the 19th IOE Graduate Conference, 2026; proceedings details remain pending.
- Research figures and the paper come from the [public research repository](https://github.com/Sange-creator/graph-attention-double-dqn-cellular-handover). The map figure retains attribution to [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL.
- Source Serif 4 and Source Sans 3 are self-hosted through Fontsource. Their font licenses are included in the built font directory.
- Credentials link directly to issuer verification records. Course completions are presented separately from demonstrated project skills.
- The portrait is author-provided. Its image content is preserved; web copies are resized/compressed without retaining source metadata.
- JAMJAMNEPAL is an ongoing side project for domestic and international visitors, with AI integration planned. The public repository currently provides the Go/Fiber/MongoDB foundation.
- Networking preparation is supported by the four [Computer-Network assignment folders](https://github.com/Sange-creator/Computer-Network), including Packet Tracer configurations and saved Wireshark captures. Raw captures and device identifiers are not republished in this website.

No transcripts, registration numbers, internship certificate scans, private experiment inputs, account secrets, or analytics are included. The published contact email is the author’s professional contact address.

## Updating research claims

Keep the year-long major project (semesters 7–8), the subsequent handover-focused conference study, and the semester 6 minor project distinct. Report simulation limitations alongside results. Proposed 5G/6G and broader ML directions should remain labeled as interests until supported by completed work. Do not describe planned RFID/fingerprint integrations as demonstrated hardware.

The public research release does not reproduce the full paper evaluation from a clean clone. See the linked research repository for available assets and reproduction limits.
