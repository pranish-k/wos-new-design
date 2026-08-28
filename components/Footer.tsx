import Link from "next/link";
import type { ReactNode } from "react";
import WosMark from "@/components/WosMark";
import { CAREERS_URL, HQ, LEGAL_STATUS, ORG, SOCIAL } from "@/lib/brand";
import { DONATE, FOOTER_LEGAL, FOOTER_SERVICES } from "@/lib/nav";

/** The link class is shared by every list item here and used nowhere else. */
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-white/75 no-underline transition-colors hover:text-white"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

const COLUMN_HEADING =
  "mb-1 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85";

export default function Footer() {
  return (
    <footer className="mt-20 bg-surface-dark text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <WosMark variant="onDark" className="h-9 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
            {LEGAL_STATUS}
          </p>

          {/* Careers is the only external destination in the footer, and it is the one
              a job seeker arrives looking for, so it leads. */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={CAREERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-5 py-2 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-surface-dark no-underline transition-colors hover:bg-white/85"
            >
              Careers
            </a>
            <Link
              href={DONATE.href}
              className="bg-action-deep px-5 py-2 font-heading text-[13px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-action-deeper"
            >
              Donate
            </Link>
          </div>
        </div>

        {/* White at 75%, not red: red is 2.8:1 on slate and fails AA at any size. */}
        <nav aria-label="Services" className="flex flex-col gap-2.5 text-sm text-white/75">
          <p className={COLUMN_HEADING}>Services</p>
          {FOOTER_SERVICES.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm text-white/75">
          <p className={COLUMN_HEADING}>Contact</p>
          <FooterLink href="/contact/">Contact Us</FooterLink>
          <address className="not-italic leading-relaxed">
            {HQ.name}
            <br />
            {HQ.street}, {HQ.unit}
            <br />
            {HQ.city}
            <br />
            <a
              href={HQ.phoneHref}
              className="text-white/75 no-underline transition-colors hover:text-white"
            >
              {HQ.phone}
            </a>
          </address>

          <p className={`${COLUMN_HEADING} mt-4`}>Follow</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 no-underline transition-colors hover:text-white"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The footer is the only path to both of these, so this line is load-bearing. */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-xs text-white/75 md:flex-row md:items-center md:justify-between">
          <p className="m-0">
            &copy; {new Date().getFullYear()} {ORG}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1">
            {FOOTER_LEGAL.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
