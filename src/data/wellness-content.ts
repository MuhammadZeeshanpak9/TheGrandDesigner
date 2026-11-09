// Static content for the ported wellness offering pages — shaped to match
// the WellnessOffering type consumed by OfferingBlock. Copy is TGD's own
// existing wellness text (unchanged from the previous hand-built pages),
// only the surrounding structure/components were ported from NTWGC.

import type { WellnessOffering } from "@/components/sections/wellness/OfferingBlock";

export type WellnessSubPage = {
  slug: "body" | "mind" | "soul" | "unlock-the-lock";
  title: string;
  subtitle: string;
  tierColor: string;
  offerings: WellnessOffering[];
};

export const WELLNESS_SUBPAGES: WellnessSubPage[] = [
  {
    slug: "body",
    title: "BODY",
    subtitle: "Physical Wellness Experience",
    tierColor: "#D96C6C",
    offerings: [
      {
        heading: "Physical Wellness",
        hasPrimaryImage: false,
        hasSecondaryImage: true,
        secondaryImage: "/images/thank-you-body-1.png",
        secondaryImageAspect: "1078/1459",
        tagline: 'Wellness is a "Physical" state of well-being.',
        pricingLabel: "Membership:",
        price1yr: "1 year membership: $5,000",
        price2yr: "2 year membership: $10,000",
        membershipOptions: ["1 Year Membership — $5,000", "2 Year Membership — $10,000"],
        winWinText: "It is always a Win-Win for the family of Greatness! It only gets GREATER.",
        contactEmail: "winwin@thegranddesigner.com",
        collaboratorPitch: "Sign up today to be a global Physical Wellness collaborator.",
        collaboratorItems: [
          "Modern spa/yoga centers",
          "Modern/new age fitness centers",
          "Modern dance studio",
          "Technology companies created to enhance the human body",
          "Wellness seminars/workshops/programs",
        ],
      },
      {
        heading: "Physical Success and Riches",
        image: "/images/thank-you-body-2.png",
        imageAspect: "1367/1151",
        tagline: 'Success and Riches is a "Physical" state of well-being.',
        pricingLabel: "Membership:",
        price1yr: "1 year membership: $5,000",
        price2yr: "2 year membership: $10,000",
        membershipOptions: ["1 Year Membership — $5,000", "2 Year Membership — $10,000"],
        winWinText: "It is always a Win-Win for the family of Greatness! It only gets GREATER.",
        contactEmail: "winwin@thegranddesigner.com",
        collaboratorPitch: "Sign up today to be a global Physical Success and Riches collaborator.",
        collaboratorItems: [
          "Billionaire mentors",
          "Successful and rich investors",
          "Prosperity seminars/workshops/programs",
        ],
      },
    ],
  },
  {
    slug: "mind",
    title: "MIND",
    subtitle: "",
    tierColor: "#4B4E9E",
    offerings: [
      {
        heading: "Mental Health",
        hasPrimaryImage: false,
        tagline: 'Health is a "Mental" state of well-being.',
        bodyParagraphs: [
          'To understand my health, it\'s important to understand "HOW" my mind operates the function of my body in the physical reality in regards to sickness and diseases.',
          "The universe is mental. I AM a mental spiritual being having physical life experiences.",
          "HEALING starts from WITHIN, expressed to the physical reality as wellness for my ultimate well-being.",
          'YES. YOU can heal from anything and everything when YOU know the mental "HOW".',
        ],
        session: {
          heading: "U.M.E",
          subheading: "(Understanding My Emotions)",
          description:
            "This session is a custom mental and emotional analysis integrated with spiritual understanding of SELF that has proven to 100% provide accurate and precise positive outcomes for individuals who practice their truth.",
        },
        bookingLabel: "Mental Health",
        bookingTiers: [
          { label: "30 min — Phone", price: "$2,500" },
          { label: "1 hr — Phone", price: "$5,000" },
          { label: "30 min — Video", price: "$25,000" },
          { label: "1 hr — Video", price: "$50,000" },
          { label: "30 min — One-on-One", price: "$250,000" },
          { label: "1 hr — One-on-One", price: "$500,000" },
        ],
      },
      {
        heading: "Mental Wealth",
        heroArt: "mind-card",
        tagline: 'Wealth is a "Mental" state of well-being.',
        bodyParagraphs: [
          'To understand my wealth, it\'s important to understand \'HOW\' my mind operates the function of my body in the physical reality in regards to money and success.',
          "The universe is mental. I AM a mental spiritual being having physical life experiences.",
          "WEALTH starts from WITHIN, expressed to the physical reality as riches and success for my ultimate well-being.",
          'YES. YOU can attain anything and everything when YOU know the mental \'HOW\'.',
        ],
        session: {
          heading: "The World's Greatest Movie About You",
          description:
            "This session is a custom mental and emotional analysis integrated with spiritual understanding of SELF... production is an actual movie production created for the individual. (FINANCE OPTIONS AVAILABLE)",
          extraParagraph: "Everything Starts In The Mind",
        },
        bookingLabel: "Mental Wealth",
        bookingTiers: [
          { label: "1 hr — Phone", price: "$5,000" },
          { label: "1 hr — Video", price: "$50,000" },
          { label: "30 min — One-on-One", price: "$250,000" },
          { label: "1 hr — One-on-One", price: "$500,000" },
          { label: "30 min — Movie Production", price: "$500,000" },
          { label: "1 hr — Movie Production", price: "$1,000,000" },
        ],
      },
    ],
  },
  {
    slug: "soul",
    title: "SOUL",
    subtitle: "",
    tierColor: "#B8B9C0",
    offerings: [
      {
        heading: "Mental Alignment and Self Care",
        image: "/images/thank-you-soul.png",
        imageAspect: "1/1",
        pricingLabel: "Membership:",
        price1yr: "1 year membership: $5,000",
        price2yr: "2 year membership: $10,000",
        membershipOptions: ["1 Year Membership — $5,000", "2 Year Membership — $10,000"],
        winWinText: "It is always a Win-Win for the family of Greatness! It only gets GREATER.",
        contactEmail: "winwin@thegranddesigner.com",
        collaboratorPitch: "Sign up today to be a global Mental Alignment and Self Care collaborator.",
        collaboratorItems: [
          "Ayahuasca centers",
          "Technology companies created to advance the human mind",
        ],
      },
    ],
  },
  {
    slug: "unlock-the-lock",
    title: "UNLOCK THE LOCK",
    subtitle: "",
    tierColor: "#9B7FC7",
    offerings: [
      {
        heading: "Unlock The Lock.",
        hasPrimaryImage: true,
        heroArt: "go-within",
        bodyParagraphs: [
          "This session is a custom mental and emotional analysis integrated with spiritual understanding of SELF that has been proven to be 100% accurate and precise as the UNIVERSAL SECRET.",
        ],
        bookingLabel: "Body. Mind. Soul.",
        bookingTiers: [
          { label: "1 hr consultation online", price: "$1,000,000" },
          { label: "30 min one-on-one consultation", price: "$2,000,000" },
          { label: "1 hr one-on-one consultation", price: "$4,000,000" },
          { label: "30 min media appearance", price: "$5,000,000" },
          { label: "1 hr media appearance", price: "$10,000,000" },
          { label: "30 min public speaking", price: "$10,000,000" },
          { label: "1 hr public speaking", price: "$25,000,000" },
        ],
      },
    ],
  },
];
