export const content = {
  hero: {
    eyebrow: "Established 1987",
    headline: "Counsel for the matters that decide the next decade.",
    sub: "We are a boutique New England firm advising founders, families, and closely held companies on the questions that shape what they own and who they answer to.",
    secondaryLink: {
      label: "Read our latest insight",
      href: "#insights",
    },
  },
  services: {
    sectionLabel: "Practice",
    sectionHeadline: "Five practice areas. One unhurried bench.",
    sectionSub:
      "Every matter is read in full by a partner before a single hour is billed. That has not changed in thirty-eight years.",
    items: [
      {
        number: "01",
        name: "Estate and trust planning",
        summary:
          "Wills, revocable trusts, and intergenerational structures for families with operating businesses and complex holdings.",
      },
      {
        number: "02",
        name: "Business formation and counsel",
        summary:
          "From the operating agreement that holds for twenty years to the routine board work that keeps it useful.",
      },
      {
        number: "03",
        name: "Mergers, sales, and succession",
        summary:
          "Owner-led transitions, third-party sales, and management buyouts in the ten to one-hundred-million range.",
      },
      {
        number: "04",
        name: "Real estate and land use",
        summary:
          "Acquisitions, conservation easements, and zoning matters for owners and stewards of New England property.",
      },
      {
        number: "05",
        name: "Probate and fiduciary litigation",
        summary:
          "When the document is in dispute or the trustee is, we represent beneficiaries and fiduciaries with measure.",
      },
    ],
  },
  about: {
    eyebrow: "About the firm",
    headline: "A bench of seven. A practice the size of one good case.",
    body: [
      "Charles Haldwell opened the office in a single-room walkup above the post office in 1987 with a typewriter, a leather-bound copy of the Restatement, and an opinion that small was the only honest size for a firm.",
      "The firm has grown to seven attorneys. We share two assistants, one library, and a discipline about taking on only the work we can read end to end. That is the bench.",
    ],
    stats: [
      { label: "Year founded", value: "1987" },
      { label: "Partners", value: "Four" },
      { label: "Average tenure", value: "14 years" },
    ],
  },
  testimonials: [
    {
      quote:
        "I have used Legally for two business sales and a family trust. In every case the partner running the matter knew the file as well as I did. That is increasingly rare.",
      name: "Margaret W.",
      role: "Founder, family-owned manufacturer in Dover",
    },
    {
      quote:
        "Our estate plan needed to hold together three generations and a working farm. They drafted it as if we would still be reading it in 2055. We very much hope to.",
      name: "Henry A.",
      role: "Client since 2003, fourth-generation farmer",
    },
    {
      quote:
        "The fee letter said what the work would cost and what it would not. Six months later, the invoice said the same. I had not seen that from a firm in twenty years.",
      name: "Lillian R.",
      role: "CFO, regional architectural practice",
    },
  ],
  ctaBanner: {
    headline: "A first conversation is unhurried and without cost.",
    sub: "Tell us what you are working on. We will tell you whether we are the right firm before either of us spends another hour.",
    cta: {
      label: "Schedule a consultation",
      href: "#contact",
    },
  },
  footer: {
    blurb:
      "Counsel to founders, families, and closely held companies across northern New England since 1987. Admitted in New Hampshire, Maine, and Massachusetts.",
  },
} as const;

export const attorneys = [
  {
    name: "Charles W. Haldwell",
    role: "Founding partner",
    bar: "NH, ME",
    photo: "/images/attorney-1.jpg",
    bio: "Estate planning, succession, and the kind of trust litigation that keeps a family at the same table.",
  },
  {
    name: "Helena M. Carr",
    role: "Managing partner",
    bar: "NH, MA",
    photo: "/images/attorney-2.jpg",
    bio: "Mergers and owner-led sales for closely held New England businesses since 2001.",
  },
  {
    name: "Margaret L. Eddy",
    role: "Partner",
    bar: "NH, ME, MA",
    photo: "/images/attorney-3.jpg",
    bio: "Real estate, conservation easements, and land use across northern New England.",
  },
  {
    name: "Andrew R. Lin",
    role: "Partner",
    bar: "NH",
    photo: "/images/attorney-4.jpg",
    bio: "Business counsel for founders, plus the routine governance that keeps a company answerable to itself.",
  },
] as const;

export const navLinks = [
  { label: "Practice areas", href: "#practice" },
  { label: "Attorneys", href: "#attorneys" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;
