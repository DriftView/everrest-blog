// Dummy blog content for the GrowthHub journal. Everything here is
// placeholder copy — swap for a CMS / API source when the backend lands.

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "quote"; text: string; cite?: string }
  | { t: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: { name: string; role: string; initials: string };
  date: string; // display string
  iso: string; // machine-readable
  readMins: number;
  image: string;
  featured?: boolean;
  body: Block[];
};

export const CATEGORIES = [
  "Grief & Healing",
  "Planning Ahead",
  "Ceremonies & Traditions",
  "Family & Legacy",
  "Practical Guides",
] as const;

export type Category = (typeof CATEGORIES)[number];

const AUTHORS = {
  maya: { name: "Maya Ellison", role: "Care Advisor", initials: "ME" },
  theo: { name: "Theo Nakamura", role: "Grief Counselor", initials: "TN" },
  rosa: { name: "Rosa Delgado", role: "Funeral Director", initials: "RD" },
  jules: { name: "Jules Amari", role: "Estate Planner", initials: "JA" },
};

// A shared placeholder body — the detail page is a layout demo, not a CMS.
function body(intro: string): Block[] {
  return [
    { t: "p", text: intro },
    {
      t: "p",
      text: "There is no schedule for any of this. Some people move through the first weeks in a fog and find their footing months later; others feel steady at the start and undone by an ordinary Tuesday in spring. Both are ordinary. Both are survivable.",
    },
    { t: "h2", text: "Start with what is in front of you" },
    {
      t: "p",
      text: "When everything feels urgent, almost nothing is. The handful of decisions that genuinely cannot wait are smaller in number than they appear, and the rest will keep. Give yourself permission to work through them one at a time, in whatever order makes sense to you.",
    },
    {
      t: "list",
      items: [
        "Decide who needs to be told today, and let the wider circle wait.",
        "Choose one person to field calls so you are not repeating the news.",
        "Write down what you are told — memory is unreliable right now.",
        "Eat something, even if you are not hungry. Sleep when you can.",
      ],
    },
    {
      t: "quote",
      text: "Grief is not a problem to be solved. It is a form of love looking for somewhere to go.",
      cite: "From our conversations with families",
    },
    { t: "h2", text: "Let other people carry something" },
    {
      t: "p",
      text: "People will ask what they can do, and the honest answer is usually that you have no idea. Keep a short list somewhere visible — groceries, the school run, sitting in the house while you sleep — and hand items out as they are offered. Accepting help is not a failure of competence.",
    },
    {
      t: "p",
      text: "The people around you want a way in. A specific, small task is a kindness to them as much as to you.",
    },
    { t: "h2", text: "Return to it when you are ready" },
    {
      t: "p",
      text: "Nothing here needs to be finished this week. Save your progress, close the laptop, and come back when the day allows. What you have written down will be waiting exactly where you left it.",
    },
  ];
}

export const POSTS: Post[] = [
  {
    slug: "first-seven-days",
    title: "The first seven days, one hour at a time",
    excerpt:
      "A gentle walkthrough of the week after a loss — what genuinely needs deciding now, and what can wait until you have slept.",
    category: "Grief & Healing",
    author: AUTHORS.theo,
    date: "12 September 2026",
    iso: "2026-09-12",
    readMins: 8,
    image: "/img/grief-support.jpg",
    featured: true,
    body: body(
      "The week after someone dies has a strange texture to it. The world carries on outside the window while inside the house time seems to pool. Paperwork arrives. People call. And somewhere underneath all of it is the fact you have not yet begun to absorb.",
    ),
  },
  {
    slug: "burial-or-cremation",
    title: "Burial or cremation: how families actually decide",
    excerpt:
      "Beyond cost and custom, the question is usually about place — where you want to be able to go, and how often.",
    category: "Practical Guides",
    author: AUTHORS.rosa,
    date: "4 September 2026",
    iso: "2026-09-04",
    readMins: 6,
    image: "/img/burial-cremation.jpg",
    body: body(
      "It is presented as a binary, and financially it often is. But in the conversations we sit in on, the deciding factor is rarely the invoice. It is whether the family wants somewhere to drive to on a birthday.",
    ),
  },
  {
    slug: "writing-a-eulogy",
    title: "Writing a eulogy when the words will not come",
    excerpt:
      "You do not need to summarise a life. You need one true thing, said plainly, in front of people who loved them too.",
    category: "Ceremonies & Traditions",
    author: AUTHORS.maya,
    date: "28 August 2026",
    iso: "2026-08-28",
    readMins: 5,
    image: "/img/memorial-service.jpg",
    body: body(
      "Almost everyone who agrees to give a eulogy regrets it around two in the morning, three days out. The page is blank, the pressure is enormous, and the person best qualified to help you is the one you are writing about.",
    ),
  },
  {
    slug: "pre-planning-in-your-forties",
    title: "Why people are pre-planning in their forties",
    excerpt:
      "Not morbidity — logistics. A generation that has settled someone else's estate is quietly refusing to hand that job on.",
    category: "Planning Ahead",
    author: AUTHORS.jules,
    date: "21 August 2026",
    iso: "2026-08-21",
    readMins: 7,
    image: "/img/funeral-planning.jpg",
    body: body(
      "The stereotype is that pre-planning is something you do at seventy-five, with a folder and a fountain pen. The data says otherwise, and so do the sign-ups: the fastest-growing group is people who have just finished sorting out a parent's affairs.",
    ),
  },
  {
    slug: "what-to-say",
    title: "What to say to someone who is grieving",
    excerpt:
      "Most of us say nothing because we are afraid of saying the wrong thing. Silence is the wrong thing.",
    category: "Grief & Healing",
    author: AUTHORS.theo,
    date: "14 August 2026",
    iso: "2026-08-14",
    readMins: 4,
    image: "/img/bg-park.jpg",
    body: body(
      "There is a particular kind of avoidance that comes from caring a great deal. You cross the road, or you let the message sit unanswered, because nothing you can think of feels adequate. It is worth knowing that adequacy was never the bar.",
    ),
  },
  {
    slug: "digital-legacy",
    title: "Your digital legacy is an estate too",
    excerpt:
      "Photos, passwords, subscriptions, the account that still posts birthday reminders. A practical audit for the living.",
    category: "Family & Legacy",
    author: AUTHORS.jules,
    date: "6 August 2026",
    iso: "2026-08-06",
    readMins: 9,
    image: "/img/digital-memorial.jpg",
    body: body(
      "Wills are good at houses and bad at hard drives. Most people leave behind a sprawl of accounts nobody else can reach — twenty years of photographs behind a password that died with them.",
    ),
  },
  {
    slug: "choosing-a-funeral-home",
    title: "Choosing a funeral home without a showroom visit",
    excerpt:
      "Six questions that surface how a firm actually operates — and the answers that should give you pause.",
    category: "Practical Guides",
    author: AUTHORS.rosa,
    date: "30 July 2026",
    iso: "2026-07-30",
    readMins: 6,
    image: "/img/funeral-homes.jpg",
    body: body(
      "You are making a significant purchase, under time pressure, in a state of exhaustion, from an industry most people encounter twice in a lifetime. It is a structurally uneven transaction, and good firms know it.",
    ),
  },
  {
    slug: "rituals-that-are-not-funerals",
    title: "Rituals that are not funerals",
    excerpt:
      "A walk, a meal, a tree, a playlist. What families are doing instead of — or alongside — the formal service.",
    category: "Ceremonies & Traditions",
    author: AUTHORS.maya,
    date: "22 July 2026",
    iso: "2026-07-22",
    readMins: 5,
    image: "/img/cta-bg.jpg",
    body: body(
      "The service does one job well: it gathers everyone in one room, once. It is less good at the long tail — the second year, the anniversary nobody else remembers, the sibling who could not fly in.",
    ),
  },
  {
    slug: "talking-to-your-parents",
    title: "How to raise this with your parents",
    excerpt:
      "The conversation nobody starts. A script, an opening line, and what to do when it goes badly the first time.",
    category: "Family & Legacy",
    author: AUTHORS.maya,
    date: "15 July 2026",
    iso: "2026-07-15",
    readMins: 7,
    image: "/img/testimonial.jpg",
    body: body(
      "Adult children tend to open with logistics, which is the fastest route to a closed door. The families who get somewhere usually start with a story about someone else entirely.",
    ),
  },
];

export const FEATURED = POSTS.find((p) => p.featured) ?? POSTS[0];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedTo(post: Post, limit = 3) {
  const sameCat = POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  );
  const rest = POSTS.filter(
    (p) => p.slug !== post.slug && p.category !== post.category,
  );
  return [...sameCat, ...rest].slice(0, limit);
}
