import type { NextConfig } from "next";

/**
 * The 18 top-level person URLs the live index cards link to.
 *
 * The sitemap treats the nested paths as canonical and these as duplicates, so these
 * redirect there. Both sets are live today and both are indexed; dropping either without
 * a redirect breaks links that exist in the wild. See PROGRESS.md, open decision 4.
 */
const personRedirects = [
  { source: "/alan-mandell", destination: "/academic-advisory-board/alan-mandell", permanent: true },
  { source: "/arthur-m-langer", destination: "/board-of-directors/arthur-m-langer", permanent: true },
  { source: "/bob-king-2", destination: "/board-of-directors/bob-king-2", permanent: true },
  { source: "/camille-j-bryant", destination: "/board-of-directors/camille-j-bryant", permanent: true },
  { source: "/charles-snow", destination: "/academic-advisory-board/charles-snow", permanent: true },
  { source: "/cindy-r-jebb", destination: "/board-of-directors/cindy-r-jebb", permanent: true },
  { source: "/craig-cuyar", destination: "/board-of-directors/craig-cuyar", permanent: true },
  { source: "/david-thomas", destination: "/academic-advisory-board/david-thomas", permanent: true },
  { source: "/james-wolf-2", destination: "/team/james-wolf-2", permanent: true },
  { source: "/mayela-montano", destination: "/team/mayela-montano", permanent: true },
  { source: "/michael-garrett-2", destination: "/board-of-directors/michael-garrett-2", permanent: true },
  { source: "/ming-wu-2", destination: "/team/ming-wu-2", permanent: true },
  { source: "/patrick-spurgeon-2", destination: "/team/patrick-spurgeon-2", permanent: true },
  { source: "/peter-cappelli-2", destination: "/academic-advisory-board/peter-cappelli-2", permanent: true },
  { source: "/robert-e-farina", destination: "/board-of-directors/robert-e-farina", permanent: true },
  { source: "/sandy-kelton", destination: "/team/sandy-kelton", permanent: true },
  { source: "/steve-petruk", destination: "/team/steve-petruk", permanent: true },
  { source: "/wendy-laplaca", destination: "/team/wendy-laplaca", permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return personRedirects;
  },
};

export default nextConfig;
