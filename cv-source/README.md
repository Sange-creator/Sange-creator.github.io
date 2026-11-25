## Current published academic CV

The published academic PDF is the one-page reference-format CV updated in November 2026, including Neural Networks and Deep Learning (DeepLearning.AI). Its editable HTML is `Saange_Tamang_CV_Reference_Format.html`. The CV page embeds `site/assets/documents/Saange_Tamang_Academic_CV.pdf` with direct open and download links.

The LaTeX files and build instructions below describe earlier CV versions. Do not overwrite the current academic PDF with the earlier two-page LaTeX build.

# CV sources

Two editable LaTeX documents share `common.tex`. Build both with Tectonic:

```sh
bash cv-source/build.sh
```

The PDFs are written to `site/assets/documents/`. Intermediate output remains in `cv-source/.build/` and should not be committed. TeX Gyre Pagella is distributed with standard TeX systems; no proprietary font is required. Standard XeLaTeX also works when run from this directory.

The academic version is two pages; the outreach version is one page. Both retain the original percentage scale and First Division classification, distinguish completed research from 5G/6G interests, and preserve team attribution. Course completions are not degree qualifications or claims of professional certification.

Education was expanded from the user's confirmed details: bachelor's degree at Paschimanchal Campus, Institute of Engineering, Tribhuvan University (2022-2026); higher secondary (+2) at Kathmandu Model College (2019-2021); and SEE in 2018 with GPA 3.9. The one-page outreach CV focuses on university education. No +2 grade or stream, SEE school, or GPA denominator were provided, so none are invented. The bachelor's entry remains most prominent.

The manuscript's current title was checked against the repository's `paperinfo.tex` and archive metadata during portfolio preparation. The supplied earlier CV uses a different title. Both new versions use the current title, while retaining the user-confirmed accepted-for-presentation status and noting that a proceedings citation is pending. No paper DOI is claimed.

Reported study results are simulation findings. Public research code does not include every input required to reproduce them. The accepted paper is a focused revision of the year-long major project (semesters 7-8); SolVote is the semester 6 minor project. Planned RFID/fingerprint integrations are not described as completed hardware deployments.

The academic CV includes the user-confirmed ongoing JAMJAMNEPAL tourism side project after SolVote. Its public repository currently provides a Go/Fiber and MongoDB scaffold, initial server-side templates, and a handler test for `HelloWorldHandler` (`GET /`). This is not described as a test of the health endpoint. AI integration is planned; no completed AI feature is claimed.

The Computer-Network coursework repository was inspected for Packet Tracer simulations and saved Wireshark captures/screenshots. Demonstrated preparation includes IP address configuration, cross-network ping/messages, DHCP/DNS simulation, and packet capture/filtering. Saved examples show DHCP Discover/Offer/Request/ACK and DNS A/AAAA/HTTPS queries and responses. The CV does not infer NAT configuration, subnet design, VLANs, OSPF/BGP, socket programming, or a CCNA credential from these artifacts. No packet-capture contents or private network records are copied into the portfolio.
