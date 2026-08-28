// The nine filings linked from /financials/.
//
// Note the duplicate: on the live site the FY2025 and FY2024 audited statements both
// link to WORKFORCE-OUTSOURCE-SERVICES-INC-WOS-FINALS.pdf. That is reproduced here
// rather than guessed at, because only WOS knows which year that document covers and
// which one is missing. Reported, not fixed.

export type Filing = { year: string; file: string };

export const FORM_990: Filing[] = [
  { year: "2025", file: "/documents/WORKFORCE-OUTSOURCES-SERVICES-990-FINAL.pdf" },
  { year: "2024", file: "/documents/Workforce-Outsource-E-Filed-Tax-Return.pdf" },
  { year: "2023", file: "/documents/WOS-990A-FY-22-23.pdf" },
  { year: "2022", file: "/documents/2021_S84091_WOS-INC_ClientCopy_Exempt-Org.-no-NY-Char.pdf" },
  { year: "2021", file: "/documents/2020_S84091_WORKFORCE-OUTSOURCE-SERVICES-INC_ClientCopy_Exempt-Org.pdf" },
];

export const AUDITED_STATEMENTS: Filing[] = [
  { year: "2025", file: "/documents/WORKFORCE-OUTSOURCE-SERVICES-INC-WOS-FINALS.pdf" },
  { year: "2024", file: "/documents/WORKFORCE-OUTSOURCE-SERVICES-INC-WOS-FINALS.pdf" },
  { year: "2023", file: "/documents/Workforce-FS-FY-22-23.pdf" },
  { year: "2022", file: "/documents/WOS-9.30.22-Financial-Statments.pdf" },
  { year: "2021", file: "/documents/WOS-9-30-21-FINANCIALS.pdf" },
];
