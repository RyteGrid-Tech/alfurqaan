import pathToParadise from "@/assets/path-to-paradise.webp";
import islamAndChristianity from "@/assets/islam-and-christianity-why-conflict.webp";
import quranicParables from "@/assets/quranic-parables.webp";
import modernIntroduction from "@/assets/modern-introduction-to-islam.webp";
import whatIsSunnah from "@/assets/what-is-sunnah.webp";
import critiqueTijaniyyah from "@/assets/critique-tijaniyyah.webp";
import islamicIdeology from "@/assets/islamic-ideology.webp";
import muslimPrayers from "@/assets/muslim-prayers-everyday-success.webp";

export interface Book {
  id: string;
  slug: string;
  title: string;
  arabicTitle?: string;
  author: string;
  category: string;
  tagline: string;
  desc: string;
  longDesc: string;
  year: number;
  isbn?: string;
  pages?: number;
  pricePrint: number;
  priceEbook: number;
  printAvailable: boolean;
  cover: string;
  accentColor: string;
  selarUrl: string;
  amazonUrl: string;
  whatsappMessage: string;
  chapters: string[];
  keyThemes: string[];
  featured?: boolean;
}

export const AUTHOR_NAME = "Barrister (Dr.) Abdur-Raheem Adebayo Shittu";
export const PUBLISHER_NAME = "Al Furqaan Publishers Ltd";
export const PUBLISHER_EST = 1987;
export const PUBLISHER_LOCATION = "Saki & Ibadan, Oyo State, Nigeria";
export const WHATSAPP_PHONE = "+2347062716154"; // Official Al Furqaan line (07062716154)
export const SELAR_STORE_URL = "https://selar.com/m/Barr-Adebayo-Shittu";

export const BOOKS: Book[] = [
  {
    id: "a-modern-introduction-to-islam",
    slug: "a-modern-introduction-to-islam",
    title: "A Modern Introduction to Islam",
    arabicTitle: "مقدمة عصرية إلى الإسلام",
    author: AUTHOR_NAME,
    category: "Basics of Islam",
    tagline: "A clear, comprehensive, and authentic guide to Islam for the modern believer.",
    desc: "A clear, comprehensive and authentic guide to Islam — the Articles of Faith, the Pillars, Shari'ah, Jihad and social justice, explained with the precision of a legal expert and the heart of a believer.",
    longDesc:
      "Written for both curious inquirers and practicing Muslims seeking intellectual clarity, this foundational work bridges classical theological concepts with contemporary challenges. Barrister Adebayo Shittu deconstructs core tenets—from the Oneness of God (Tawheed) to the socio-economic equity of Shari'ah—dispelling common Western and local misconceptions with uncompromising fidelity to the Qur'an and authentic Sunnah.",
    year: 2015,
    isbn: "978-978-948-210-4",
    pages: 284,
    pricePrint: 2500,
    priceEbook: 2500,
    printAvailable: true,
    cover: modernIntroduction,
    accentColor: "#1b4d3e",
    selarUrl: "https://selar.com/5el409146j",
    amazonUrl: "https://www.amazon.com/dp/B0DJMODERNINTRO",
    whatsappMessage:
      "Salam! I would like to order 'A Modern Introduction to Islam' by Dr. Adebayo Shittu.",
    chapters: [
      "The Concept of God and Pure Monotheism (Tawheed)",
      "The Five Pillars of Islam: Spiritual and Civic Dimensions",
      "Demystifying the Shari'ah: Law as Justice and Mercy",
      "Jihad in True Context: Defense, Morality, and Non-Aggression",
      "Human Rights, Gender Equity, and Social Welfare in Islamic Law",
    ],
    keyThemes: ["Tawheed", "Shari'ah Jurisprudence", "Contemporary Challenges", "Social Justice"],
    featured: true,
  },
  {
    id: "muslim-prayers-everyday-success",
    slug: "muslim-prayers-everyday-success",
    title: "Muslim Prayers for Everyday Success",
    arabicTitle: "أدعية المسلم للنجاح اليومي",
    author: AUTHOR_NAME,
    category: "Du'a & Prayers",
    tagline:
      "A spiritual toolkit of authenticated Prophetic supplications for every trial and triumph.",
    desc: "A spiritual toolkit of authentic supplications from the Prophet ﷺ — for protection from witchcraft and the evil eye, prosperity, righteous sleep, matrimonial harmony and guidance through Istikhaarah.",
    longDesc:
      "Al Furqaan's flagship devotional compilation brings together authenticated supplications (Du'a) and remembrance (Adhkar) directly from the Prophet Muhammad ﷺ. Every prayer includes Arabic text, accurate transliteration, and insightful English commentary explaining the spiritual psychology and practical context of seeking divine aid in daily health, career, family peace, and spiritual protection.",
    year: 1985,
    isbn: "978-978-219-002-1",
    pages: 360,
    pricePrint: 11999,
    priceEbook: 6000,
    printAvailable: true,
    cover: muslimPrayers,
    accentColor: "#2a1b3d",
    selarUrl: "https://selar.com/711229n621",
    amazonUrl: "https://www.amazon.com/dp/B0DJPRAYERSSUCCESS",
    whatsappMessage:
      "Salam! I want to purchase the deluxe print edition of 'Muslim Prayers for Everyday Success'.",
    chapters: [
      "The Etiquette and Conditions of Accepted Supplication",
      "Morning and Evening Fortifications (Adhkar as-Sabah wal-Masa')",
      "Protection from the Evil Eye, Envy (Hasad), and Occult Harm",
      "Prayers for Prosperity, Debt Relief, and Noble Sustenance (Rizq)",
      "Supplications for Matrimonial Peace, Children, and Illness",
      "The Practical Istikhaarah Guide for Major Life Decisions",
    ],
    keyThemes: ["Authentic Du'a", "Spiritual Fortification", "Adhkar", "Istikhaarah"],
    featured: true,
  },
  {
    id: "islam-christianity-why-conflict",
    slug: "islam-christianity-why-conflict",
    title: "Islam and Christianity: Why the Conflict?",
    arabicTitle: "الإسلام والنصرانية: لماذا الصراع؟",
    author: AUTHOR_NAME,
    category: "Comparative Religion",
    tagline:
      "A forensic investigation into scripture, historical councils, and the roots of the divide.",
    desc: "A forensic investigation into the roots of the Muslim–Christian divide. Using the Bible itself, the author traces Christian doctrine from pure Monotheism to the Church Councils — and calls for a return to the worship of One God.",
    longDesc:
      "With the meticulous scrutiny of a senior advocate, Dr. Adebayo Shittu examines the biblical manuscripts and historical records of the early Christian church councils (Nicaea, Constantinople, Chalcedon). By comparing textual evidence with the pristine monotheism taught by Jesus (peace be upon him) and reaffirmed by the Holy Qur'an, this book builds an objective bridge of truth and dialogue.",
    year: 1979,
    isbn: "978-978-154-041-8",
    pages: 220,
    pricePrint: 2500,
    priceEbook: 2500,
    printAvailable: true,
    cover: islamAndChristianity,
    accentColor: "#6b3a2a",
    selarUrl: "https://selar.com/60nz7gszs9",
    amazonUrl: "https://www.amazon.com/dp/B0DJISLAMCHRISTIANITY",
    whatsappMessage: "Salam! I want to order 'Islam and Christianity: Why the Conflict?'.",
    chapters: [
      "The Historical Jesus and Pure Semitic Monotheism",
      "Pauline Theology and the Evolution of the Trinity",
      "The Councils of Nicaea and Chalcedon: An Analysis of Doctrinal Shifts",
      "The Prophet Muhammad ﷺ in Biblical Prophecy",
      "The Common Ground: A Call to Worship the One Creator",
    ],
    keyThemes: ["Comparative Theology", "Biblical Exegesis", "Monotheism", "Interfaith Dialogue"],
    featured: true,
  },
  {
    id: "a-book-of-quranic-parables",
    slug: "a-book-of-quranic-parables",
    title: "A Book of Qur'anic Parables",
    arabicTitle: "أمثال القرآن الكريم",
    author: AUTHOR_NAME,
    category: "Qur'an Study",
    tagline: "Unveiling the vivid metaphors, literary brilliance, and moral lessons of the Qur'an.",
    desc: "A guided tour through the parables of the Qur'an — the spider's fragile web, the garden struck by a whirlwind, the light within a niche — turning the abstract realities of faith into vivid, unforgettable lessons.",
    longDesc:
      "Allah strikes parables for mankind that they may reflect. In this illuminating study, the author takes the reader on a guided journey through the allegories of the Holy Qur'an. From the hollow sanctuary of the spider's house to the blinding storm in the wilderness, each parable is analyzed in terms of Arabic rhetoric, theological depth, and ethical application to our modern lives.",
    year: 2015,
    isbn: "978-978-948-212-8",
    pages: 248,
    pricePrint: 3500,
    priceEbook: 3500,
    printAvailable: true,
    cover: quranicParables,
    accentColor: "#2d6a4f",
    selarUrl: "https://selar.com/2f6ju662t0",
    amazonUrl: "https://www.amazon.com/dp/B0DJQURANPARABLES",
    whatsappMessage: "Salam! I would like to buy 'A Book of Qur'anic Parables'.",
    chapters: [
      "The Purpose and Divine Wisdom of Parables (Amthal)",
      "The Parable of the Spider: The Fragility of False Idols",
      "The Parable of the Garden: Arrogance, Wealth, and Sudden Loss",
      "The Verse of Light (Ayat an-Nur): Spiritual Illumination",
      "The Barren Rock Covered with Soil: Hypocrisy and Void Charity",
    ],
    keyThemes: [
      "Qur'anic Tafsir",
      "Literary Rhetoric",
      "Moral Philosophy",
      "Spiritual Reflections",
    ],
    featured: false,
  },
  {
    id: "critique-tijaniyyah-handbook",
    slug: "critique-tijaniyyah-handbook",
    title: "A Critique of Dr. Adekilekun Tijani's Handbook on the Tijaniyyah",
    arabicTitle: "نقد كتيب التيجانية",
    author: AUTHOR_NAME,
    category: "Aqidah",
    tagline: "A fearless, evidence-based evaluation before the authority of the Qur'an and Sunnah.",
    desc: "A fearless, evidence-based response to the Handbook on Tijaniyyah — dissecting its claims page by page before the supreme authority of the Qur'an and the authentic Sunnah, with the precision of a legal practitioner.",
    longDesc:
      "A landmark critical work addressing Sufi theological innovations in West Africa. Dr. Adebayo Shittu subjects the claims of Dr. Adekilekun Tijani's handbook to rigorous scrutiny, comparing mystical doctrines (such as Salat al-Fatih, spiritual hierarchies, and special invocations) against the authenticated traditions of the Sahaba and classical Islamic jurists.",
    year: 2012,
    isbn: "978-978-948-214-2",
    pages: 212,
    pricePrint: 3000,
    priceEbook: 3000,
    printAvailable: true,
    cover: critiqueTijaniyyah,
    accentColor: "#4a2c1a",
    selarUrl: "https://selar.com/1iu611wn3e",
    amazonUrl: "https://www.amazon.com/dp/B0DJTIJANIYYAH",
    whatsappMessage:
      "Salam! I would like to order 'A Critique of Dr. Adekilekun Tijani's Handbook on the Tijaniyyah'.",
    chapters: [
      "The Authority of Revelation vs. Esoteric Intuition",
      "Salat al-Fatih: An Examination of Theological Claims",
      "The Finality of Prophethood and Completion of the Deen",
      "Grave Visitation, Tawassul, and the Boundary of Shirk",
      "A Call to Return to the Method of the Salaf as-Salih",
    ],
    keyThemes: [
      "Orthodox Aqidah",
      "Refutation of Bid'ah",
      "Methodology of Hadith",
      "Sunnah Defense",
    ],
    featured: false,
  },
  {
    id: "what-is-sunnah-what-is-bidah",
    slug: "what-is-sunnah-what-is-bidah",
    title: "What is Sunnah? What is Bid'ah?",
    arabicTitle: "ما هي السنة؟ وما هي البدعة؟",
    author: AUTHOR_NAME,
    category: "Sunnah & Bid'ah",
    tagline: "Separating the gold of Prophetic tradition from the dust of cultural innovation.",
    desc: "The perfection of Islam needs no additions. Written by Barrister Abdur-Raheem Adebayo Shittu, this clarity-inducing guide separates the gold of the Prophetic Tradition from the dust of cultural innovation — a hard look at common innovations in funerals, weddings and daily worship, weighing the evidence for each practice with the author's legal background. Return to the simplicity, beauty and ease of the Sunnah.",
    longDesc:
      "Every act of worship must be established upon authentic divine instruction. In this uncompromising yet compassionate book, Dr. Shittu provides the legal and theological methodology to distinguish genuine Prophetic practice from local cultural additions that have crept into Muslim societies over centuries, highlighting how simplicity preserves religious purity.",
    year: 1996,
    isbn: "978-978-219-011-3",
    pages: 196,
    pricePrint: 2500,
    priceEbook: 2500,
    printAvailable: true,
    cover: whatIsSunnah,
    accentColor: "#3a2a50",
    selarUrl: "https://selar.com/087488535k",
    amazonUrl: "https://www.amazon.com/dp/B0DJSUNNAHBIDAH",
    whatsappMessage: "Salam! I would like to order 'What is Sunnah? What is Bid'ah?'.",
    chapters: [
      "The Legal Definition of Sunnah in Usul al-Fiqh",
      "The Severe Warning Against Bid'ah in the Hadith Corpus",
      "Innovations Surrounding Funerals and Mourning Rites",
      "Cultural Distortions in Marriage and Naming Ceremonies",
      "The Golden Rule: It is Sufficient for Us What was Sufficient for the Companions",
    ],
    keyThemes: ["Sunnah", "Bid'ah Identification", "Usul al-Fiqh", "Cultural Reform"],
    featured: false,
  },
  {
    id: "path-to-paradise",
    slug: "path-to-paradise",
    title: "Path to Paradise",
    arabicTitle: "طريق الجنة",
    author: AUTHOR_NAME,
    category: "Afterlife",
    tagline: "A clear, spiritually grounded map for the only journey that is guaranteed.",
    desc: "A clear map for the only journey that is guaranteed. A vivid, spiritually grounded guide through the stages of the Afterlife — the life of Barzakh, the questioning in the grave, the Day of Reckoning, the crossing of the Sirat bridge, and the two destinations: the Bliss of Jannah and the reality of Jahannam — based entirely on the Qur'an and the authentic Sunnah. It distinguishes the Road to Paradise from the Road to Hell, urging every believer: don't meet your Creator unprepared.",
    longDesc:
      "Death is not the end of existence, but the threshold of ultimate reality. In 'Path to Paradise', Barrister Adebayo Shittu compiles an awe-inspiring, textually grounded account of what awaits the human soul from the moment the breath leaves the chest to the eternal abode in the gardens of bliss. It serves as both a profound spiritual wake-up call and a comforting guide of hope in Allah's mercy.",
    year: 2026,
    isbn: "978-978-948-218-0",
    pages: 260,
    pricePrint: 2500,
    priceEbook: 2500,
    printAvailable: true,
    cover: pathToParadise,
    accentColor: "#1a4a3d",
    selarUrl: "https://selar.com/eea62n4173",
    amazonUrl: "https://www.amazon.com/dp/B0DJPARADISE",
    whatsappMessage: "Salam! I would like to order 'Path to Paradise' by Dr. Adebayo Shittu.",
    chapters: [
      "The Departure of the Soul and the Realm of Barzakh",
      "The Questioning of Munkar and Nakir in the Grave",
      "The Blowing of the Trumpet and the Great Assembly",
      "The Scales (Mizan), the Books of Deeds, and the Hawd",
      "Traversing the Sirat Bridge Above the Fire",
      "The Eternal Delights of Jannah: Seeing the Face of Allah",
    ],
    keyThemes: ["Eschatology", "Barzakh", "Day of Judgment", "Jannah and Jahannam"],
    featured: true,
  },
  {
    id: "islamic-ideology-democratic-socialism",
    slug: "islamic-ideology-democratic-socialism",
    title: "Islamic Ideology: Path to Democratic Socialism in Nigeria",
    arabicTitle: "الأيديولوجية الإسلامية: طريق إلى الاشتراكية الديمقراطية",
    author: AUTHOR_NAME,
    category: "Islamic Thought",
    tagline:
      "A bold intellectual manifesto presenting the Qur'anic blueprint for national equity and justice.",
    desc: "Capitalism has failed. Communism is dead. What is the path forward? A bold intellectual manifesto arguing that the blueprint for justice lies in the Qur'an and Sunnah: true Islam is by nature a form of democratic socialism — protecting the weak, redistributing wealth through Zakat, and holding leaders accountable to God. It dissects the failure of capitalism and the flaws of Marxism, and sets out a blueprint for a just, egalitarian Nigeria where leadership is a trust, not a means of enrichment.",
    longDesc:
      "Originally written during the author's tenure in the Oyo State House of Assembly during Nigeria's Second Republic, this seminal socio-political text critiques both rapacious capitalism and totalitarian Marxism. Dr. Shittu demonstrates that Islam's ethical economics—enforcing Zakat, prohibiting usury (Riba), mandating universal welfare, and establishing leadership as an accountable trust (Amanah)—provides the true foundation for social justice in Nigeria and developing democracies.",
    year: 1982,
    isbn: "978-978-154-032-6",
    pages: 232,
    pricePrint: 2500,
    priceEbook: 2500,
    printAvailable: true,
    cover: islamicIdeology,
    accentColor: "#5a2a3a",
    selarUrl: "https://selar.com/1632092465",
    amazonUrl: "https://www.amazon.com/dp/B0DJISLAMICIDEOLOGY",
    whatsappMessage:
      "Salam! I would like to buy 'Islamic Ideology: Path to Democratic Socialism in Nigeria'.",
    chapters: [
      "The Crisis of Modern Economic Systems: Capitalism and Marxism",
      "The Core Economic Philosophy of Islam: Wealth as a Divine Trust",
      "Institutional Wealth Redistribution: Zakat, Sadaqah, and Awqaf",
      "Prohibition of Riba and Exploitative Monopolies",
      "Governance as Amanah: Accountability of Leaders to the Populace and God",
      "A Practical Program for Social Justice and Development in Nigeria",
    ],
    keyThemes: [
      "Islamic Political Economy",
      "Social Justice",
      "Anti-Corruption",
      "Governance as Amanah",
    ],
    featured: false,
  },
];

export function formatPrice(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function getBookById(idOrSlug: string): Book | undefined {
  return BOOKS.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
}

export function getAllCategories(): string[] {
  const categories = ["All"];
  for (const book of BOOKS) {
    if (!categories.includes(book.category)) {
      categories.push(book.category);
    }
  }
  return categories;
}

export function getRelatedBooks(bookId: string, limit = 3): Book[] {
  const current = getBookById(bookId);
  if (!current) return BOOKS.slice(0, limit);
  return BOOKS.filter((b) => b.id !== current.id)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}
