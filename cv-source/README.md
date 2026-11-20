# CV sources

Two editable LaTeX documents share `common.tex`. Build both with Tectonic:

```sh
bash cv-source/build.sh
```

The PDFs are written to `site/assets/documents/`. Intermediate output remains in `cv-source/.build/` and should not be committed. TeX Gyre Pagella is distributed with standard TeX systems; no proprietary font is required. Standard XeLaTeX also works when run from this directory.

The academic version is two pages; the outreach version is one page. Both retain the original percentage scale and First Division classification, distinguish completed research from 5G/6G interests, and preserve team attribution. Course completions are not degree qualifications or claims of professional certification.

The manuscript's current title was checked against the repository's `paperinfo.tex` and archive metadata during portfolio preparation. The supplied earlier CV uses a different title. Both new versions use the current title, while retaining the user-confirmed accepted-for-presentation status and noting that a proceedings citation is pending. No paper DOI is claimed.

Reported study results are simulation findings. Public research code does not include every input required to reproduce them. The accepted paper is a focused revision of the year-long major project (semesters 7-8); SolVote is the semester 6 minor project. Planned RFID/fingerprint integrations are not described as completed hardware deployments.
