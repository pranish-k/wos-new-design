# Progress

Where the rebuild stands and what is still open.
Rules are in [CLAUDE.md](CLAUDE.md), the look in [DESIGN.md](DESIGN.md), and the history in git.

## Where it stands

Every page of the live site is built, at its live URL, in the colour-chapter design.
`main` is the site; the live preview is [wos-new-design.vercel.app](https://wos-new-design.vercel.app).

- **Content** was extracted once from the mirror by the scripts in `tools/` and committed to `content/`; the build never reads the mirror.
  `tools/audit.py` compares the built site against the mirror route by route and has caught real regressions several times.
- **People** are one JSON record each in `content/people/`, edited at `/admin/people` in development (CLAUDE.md, Code).
  `tools/people-image.mjs` normalises a headshot to a 1200x1200 WebP.
  The admin is a local convenience, not an auth boundary.
- **The homepage** reads as a sales journey, one question per chapter (DESIGN.md §5).
  Its motion is the reel drift, the globe, the partner marquee and the gentle scroll arrivals (DESIGN.md §10).
- **Partner logos** for the marquee are trimmed to their marks by `tools/partner-logos.mjs`; rerun it after adding a logo.
- **Images** carry their real sizes in `lib/image-dims.json` (`tools/image-dims.mjs`); an image without an entry fails the build.
- **Locations** embeds Google maps with the keyless `output=embed` URL, which is undocumented.
  `mapSrc()` in `content/offices.ts` is the one place to change if WOS wants the keyed Maps Embed API.

## Waiting on WOS

Copy and facts only WOS can supply.
Nothing here gets written for them.

- **A cost answer for the Business Solution.**
  The paragraph names culture, cost, control and continuity and never says how WOS answers them.
  Answering all four on the homepage would sell the consultant-to-employee model far harder; cost is the missing one.
  The only cost claim on the site is the co-op page's "converted to your employment at no additional charge". Does that hold for consultants too?
- **The Institute's supporting line**, "AI is changing how the world works. We're preparing people to lead it.", is the one homepage line WOS did not write and needs their sign-off.
- **The Hunter 92% figure needs a source.** "Approximately 92% of WOS revenue is reinvested..." on `/wos-hunter-college-partnership/` should cite a year and a filing, or lose the number.
- **Nine Industry Advisory Board bios.** Banerji, Donofrio, Hildebrand, O'Brien, Knight, Hackney, Sevola, Jones and Beecher have photos and no bio, so their cards do not link.
  On the live site their photos point at Popup Maker pop-ups (`#popmake-6612` to `6636`) that are no longer on the page, so clicking them there opens nothing either; the pop-ups may still exist as drafts in WordPress.
- **HR Advisory Board intro copy.**
- **Consulting to Hire Services copy.** The page is a hub over its three services with one paragraph of its own.
- **20 corporate and 15 academic partner logos have no name**, so a screen reader skips them and the homepage marquee leaves them out. One word each fixes it, in `content/partners.ts` and `content/academic-partners-logos.ts`.
- **A Hunter photograph.** The partnership page has none of its own.
- **About twenty one-line service descriptions** would give the Services menu a description under each link.
- **`/financials`** links the same PDF for FY2025 and FY2024, as the live page does; only WOS knows which year is missing.
- **`/donate`** is prose only; no payment processor is identified.
- **Craig Cuyar's title** reads "Cheif Information Officer" on the live site and here.

## Still to do

- The two open decisions in CLAUDE.md: where the program pages live, and College Co-ops' place under Managed Service Centers.
- The USFCR Verified Vendor footer badge is not carried over.
- `PeopleGrid` names are `h3` with no `h2` above them on the five people pages.
- `public/images` carries about 17MB of PNG photographs that would be a tenth of that as WebP. `tools/audit.py` matches images by filename, so a re-encode has to update it too.
- `/announcements-demo` still compares ways of announcing the Institute (DESIGN.md §11); it comes out once one is chosen or the idea is dropped.
