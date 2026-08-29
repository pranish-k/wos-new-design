// Corporate partner logos, from /corporate-partners/ on the live site.
//
// Names are recovered from the filenames because the live markup carries no alt text on
// any of them. The wall is complete: every logo the live page shows is here.
//
// 18 of them carry name: "" - files named Picture1.png through Picture24.png, plus
// RR-logo.png and images.png, where nothing on the live page identifies the company. An
// empty name renders as alt="" so a screen reader skips the image rather than announcing
// a filename. They are visible to sighted visitors and invisible to assistive technology,
// which is the honest trade until someone supplies the account list. Filling in a name
// here is all it takes to fix one. See PROGRESS.md.

export type Partner = { name: string; src: string };

export const PARTNERS: Partner[] = [
  {
    name: "ACE",
    src: "/images/ACE.png"
  },
  {
    name: "ADP",
    src: "/images/ADP.png"
  },
  {
    name: "Alliance Bernstein",
    src: "/images/Alliance-Bernstein.png"
  },
  {
    name: "Amelia",
    src: "/images/Amelia_Logo_B_Logo.jpg"
  },
  {
    name: "American Airlines",
    src: "/images/American-Airlines.png"
  },
  {
    name: "American Arbitration Association",
    src: "/images/American-Arbitration-Association.png"
  },
  {
    name: "Avon",
    src: "/images/Avon.png"
  },
  {
    name: "Bank Leumi",
    src: "/images/Bank-Leumi.png"
  },
  {
    name: "Bard Graduate Center",
    src: "/images/Bard-Graduate-Center.png"
  },
  {
    name: "BCBS Vermont",
    src: "/images/BCBS-Vermont.png"
  },
  {
    name: "Bell Creative Co",
    src: "/images/cropped-bellcreativeco_plain_500px-2.png"
  },
  {
    name: "Biotest",
    src: "/images/biotest-AG-from-nature-to-life@2x.png"
  },
  {
    name: "BNY Mellon",
    src: "/images/BNY-Mellon.png"
  },
  {
    name: "BP Helios logo.svg",
    src: "/images/BP_Helios_logo.svg.png"
  },
  {
    name: "Bristol Myers Squibb",
    src: "/images/Bristol-Myers_Squibb_logo_2020.svg.png"
  },
  {
    name: "BSC",
    src: "/images/BSC-Logo-Horizontal_web-300x87-1.png"
  },
  {
    name: "CareCentrix",
    src: "/images/CareCentrix.png"
  },
  {
    name: "catalent",
    src: "/images/catalent-logo.svg"
  },
  {
    name: "CCH Final",
    src: "/images/CCH_Final_Logo_CMYK.png"
  },
  {
    name: "Chubb",
    src: "/images/Chubb-Logo.png"
  },
  {
    name: "CNH Industrial",
    src: "/images/CNH_Industrial.svg"
  },
  {
    name: "DTE Energy",
    src: "/images/DTE-Energy.png"
  },
  {
    name: "eastern.generation nybest 26",
    src: "/images/eastern.generation_nybest_26.png"
  },
  {
    name: "Eaton Corporation",
    src: "/images/Eaton_Corporation_logo.png"
  },
  {
    name: "emj",
    src: "/images/emj_logo.jpg"
  },
  {
    name: "Eversource",
    src: "/images/Eversource_logo_Social.jpg"
  },
  {
    name: "Excellus BlueCross BlueShield",
    src: "/images/og_logo_excellus.png"
  },
  {
    name: "Express Scripts",
    src: "/images/Express_Scripts_Logo.jpg"
  },
  {
    name: "Fannie Mae",
    src: "/images/Fannie_Mae_Logo.jpg"
  },
  {
    name: "Feedback Now",
    src: "/images/Feedback-Now.png"
  },
  {
    name: "Forrester",
    src: "/images/Forrester.webp"
  },
  {
    name: "GAF",
    src: "/images/GAF-logo.jpg"
  },
  {
    name: "Guardian Life Insurance",
    src: "/images/Guardian-Life-Insurance.png"
  },
  {
    name: "HBO",
    src: "/images/HBO_logo.png"
  },
  {
    name: "Hewlett Packard Enterprise",
    src: "/images/Hewlett-Packard-Enterprise.jpeg"
  },
  {
    name: "Horizon BCBS of NJ",
    src: "/images/Horizon-BCBS-of-NJ.png"
  },
  {
    name: "HP",
    src: "/images/1200px-HP_logo_2012.png"
  },
  {
    name: "ibm",
    src: "/images/ibm-logo.png"
  },
  {
    name: "IEEE",
    src: "/images/IEEE.png"
  },
  {
    name: "J Crew",
    src: "/images/J-Crew.png"
  },
  {
    name: "The Jewish Theological Seminary",
    src: "/images/Jewish-Theological-Seminary-scaled-1.jpg"
  },
  {
    name: "JJA",
    src: "/images/JJA_Logo_DarkBlue_V01.png"
  },
  {
    name: "Kenvue",
    src: "/images/Kenvue.png"
  },
  {
    name: "MCO",
    src: "/images/MCO.png"
  },
  {
    name: "Medco",
    src: "/images/medco-logo2x.png"
  },
  {
    name: "Memorial Sloan Kettering",
    src: "/images/msk_h_rgb-43.jpg"
  },
  {
    name: "Merck",
    src: "/images/logo-merck.png"
  },
  {
    name: "Mount Sinai Health System",
    src: "/images/Mount_Sinai_Health_System_logo.png"
  },
  {
    name: "NASCO",
    src: "/images/nasco_logo.jpg"
  },
  {
    name: "Navidor",
    src: "/images/Navidor.png"
  },
  {
    name: "New York City Housing Authority",
    src: "/images/New_York_City_Housing_Authority_logo.png"
  },
  {
    name: "Novitex",
    src: "/images/Novitex.png"
  },
  {
    name: "Panasonic",
    src: "/images/Panasonic.webp"
  },
  {
    name: "RGS Financial",
    src: "/images/RGS-Financial.png"
  },
  {
    name: "Safe Horizon",
    src: "/images/Logo-safe-horizon.png"
  },
  {
    name: "SBLI of Massachusetts",
    src: "/images/sbli_of_massachusetts_logo.jpg"
  },
  {
    name: "Sealed Air Product Care",
    src: "/images/sealed_air_product_care_logo.jpg"
  },
  {
    name: "TelVista",
    src: "/images/TelVista.png"
  },
  {
    name: "Thirteen",
    src: "/images/Thirteen.jpg"
  },
  {
    name: "Thomson Reuters",
    src: "/images/Thomson-Reuters.png"
  },
  {
    name: "TMP Worldwide",
    src: "/images/tmp-large.png"
  },
  {
    name: "Tradeweb",
    src: "/images/Tradeweb_logo.jpg"
  },
  {
    name: "Turner",
    src: "/images/Turner.png"
  },
  {
    name: "Union Theological Seminary New York seal",
    src: "/images/Union_Theological_Seminary_New_York_seal.png"
  },
  {
    name: "United States Department of Transportation seal",
    src: "/images/United_States_Department_of_Transportation_seal.svg"
  },
  {
    name: "UseReady",
    src: "/images/UseReady-logo.jpg"
  },
  {
    name: "Walker Miller Energy Services",
    src: "/images/Walker-Miller-Energy-Services.png"
  },
  {
    name: "Weill Cornell Medicine",
    src: "/images/Weill-Cornell-Medicine.png"
  },
  {
    name: "",
    src: "/images/Picture1.png"
  },
  {
    name: "",
    src: "/images/Picture15.png"
  },
  {
    name: "",
    src: "/images/Picture5-2.png"
  },
  {
    name: "",
    src: "/images/Picture24.png"
  },
  {
    name: "",
    src: "/images/Picture9.png"
  },
  {
    name: "",
    src: "/images/Picture10.png"
  },
  {
    name: "",
    src: "/images/Picture4-1.png"
  },
  {
    name: "",
    src: "/images/Picture11.png"
  },
  {
    name: "",
    src: "/images/Picture13.png"
  },
  {
    name: "",
    src: "/images/Picture14.png"
  },
  {
    name: "",
    src: "/images/Picture16.png"
  },
  {
    name: "",
    src: "/images/Picture5.png"
  },
  {
    name: "",
    src: "/images/Picture17.png"
  },
  {
    name: "",
    src: "/images/Picture18.png"
  },
  {
    name: "",
    src: "/images/Picture19.png"
  },
  {
    name: "",
    src: "/images/RR-logo.png"
  },
  {
    name: "",
    src: "/images/Picture21.png"
  },
  {
    name: "",
    src: "/images/images.png"
  },
  {
    name: "",
    src: "/images/logo-primary.svg"
  }
];
