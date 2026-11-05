export interface BookExcerpt {
  bookId: string;
  chapterTitle: string;
  arabicSnippet?: string;
  transliteration?: string;
  versesOrHadith?: string;
  paragraphs: string[];
  keyTakeaway: string;
}

export const BOOK_EXCERPTS: Record<string, BookExcerpt> = {
  "a-modern-introduction-to-islam": {
    bookId: "a-modern-introduction-to-islam",
    chapterTitle: "Chapter 1: The Principle of Tawheed and the Modern Mind",
    arabicSnippet: "قُلْ هُوَ اللَّهُ أَحَدٌ · اللَّهُ الصَّمَدُ",
    transliteration: "Qul Huwa Allāhu Aḥad · Allāhu aṣ-Ṣamad",
    versesOrHadith:
      "Say: He is Allah, the One. Allah, the Eternal, Absolute. (Surah Al-Ikhlas 112:1-2)",
    paragraphs: [
      "The modern human condition is plagued by an existential fragmentation. Man has conquered the material cosmos, split the atom, and digitized his consciousness, yet he remains deeply unanchored within his own soul. He chases transient deities: wealth, political clout, hedonistic consumption, and the idol of the unfettered ego.",
      "Against this moral disintegration stands the towering rock of Tawheed—the unadulterated Monotheism of Islam. Tawheed is not merely an intellectual assent that a supreme craftsman constructed the universe; it is a total, revolutionary liberation. When a human being declares 'Lā ilāha illā Allāh' (There is no deity worthy of worship except Allah), he severs every chain of subservience to tyranny, superstition, and fleeting desire.",
      "In this opening chapter, we demonstrate with strict legal and philosophical logic that Tawheed is the only worldview consonant with both scientific rationality and human dignity. An uncreated universe is a logical impossibility; a multi-headed pantheon is an invitation to cosmic anarchy. The One Creator demands undivided allegiance, and in that undivided allegiance alone does humanity discover freedom.",
    ],
    keyTakeaway:
      "Tawheed is the ultimate declaration of spiritual freedom: by submitting wholly to the One Creator, man is liberated from servitude to all created things.",
  },

  "muslim-prayers-everyday-success": {
    bookId: "muslim-prayers-everyday-success",
    chapterTitle: "Section 2: Sayyid al-Istighfar — The Master Invocation for Divine Mercy",
    arabicSnippet:
      "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
    transliteration:
      "Allāhumma Anta Rabbī, lā ilāha illā Anta, khalaqtanī wa anā 'abduka, wa anā 'alā 'ahdika wa wa'dika ma-staṭa'tu...",
    versesOrHadith:
      "Whoever recites this during the day with firm faith and dies before evening will be among the people of Paradise. (Sahih al-Bukhari)",
    paragraphs: [
      "Du'a (supplication) is not an accidental ritual; it is, in the words of the Prophet ﷺ, 'the very marrow of worship' (Mukhkh al-'Ibadah). When all material mechanisms fail, the direct line between the servant and the Lord of the Heavens remains perpetually open.",
      "Among all formulas of repentance and spiritual fortification, the Prophet ﷺ designated one as 'Sayyid al-Istighfar'—the King of Supplications. Consider its profound legal and spiritual architecture: it begins with an affirmation of sovereignty ('You are my Lord'), confesses creaturely dependence ('You created me and I am Your servant'), and acknowledges the divine covenant to the limit of human capacity.",
      "It then moves to the psychology of gratitude: 'I acknowledge Your boundless blessings upon me, and I confess my sins.' In forensic honesty before the Creator, the believer hides nothing. Recited every morning upon awakening and every evening as twilight descends, it wraps the believer in an impenetrable spiritual shield against anxiety, occult oppression, and unexpected adversity.",
    ],
    keyTakeaway:
      "True supplication combines total confession of vulnerability with unwavering confidence in Allah's all-encompassing mercy.",
  },

  "islam-christianity-why-conflict": {
    bookId: "islam-christianity-why-conflict",
    chapterTitle: "Chapter 3: The Council of Nicaea (325 CE) and the Evolution of the Trinity",
    arabicSnippet:
      "مَا قُلْتُ لَهُمْ إِلَّا مَا أَمَرْتَنِي بِهِ أَنِ اعْبُدُوا اللَّهَ رَبِّي وَرَبَّكُمْ",
    transliteration: "Mā qultu lahum illā mā amartanī bihī ani-'budullāha Rabbī wa Rabbakum...",
    versesOrHadith:
      "I said to them nothing except what You commanded me: 'Worship Allah, my Lord and your Lord.' (Surah Al-Ma'idah 5:117)",
    paragraphs: [
      "A lawyer reviewing historical evidence must ask: what was the original text, and when did the doctrinal innovation occur? When we open the canonical Gospels, we find Jesus of Nazareth consistently praying on his face, calling upon the Father as 'the only true God' (John 17:3), and affirming the Shema of Moses: 'Hear, O Israel: The Lord our God is one Lord' (Mark 12:29).",
      "How, then, did the Christian world arrive at the Athanasian Creed, where the Father is God, the Son is God, and the Holy Ghost is God, yet they are not three Gods but one God? The historical record is unequivocal: the doctrine of the co-equal Trinity was not taught by Jesus; it was codified through bitter imperial debate at the Council of Nicaea in 325 CE under the patronage of the pagan-born Roman Emperor Constantine.",
      "By replacing Semitic monotheistic concepts with Hellenistic philosophical terms like 'homoousios' (of one substance), the early church severed itself from the prophetic continuum of Abraham, Moses, and Jesus. The Qur'an came not as a hostile adversary, but as a clarifying appellate judgment—calling our Christian brethren back to the uncorrupted message of Jesus Christ: the pure worship of the One Creator.",
    ],
    keyTakeaway:
      "Scriptural and historical evidence confirms that Jesus preached the pristine Monotheism of Abraham; theological councils later overlaid Roman philosophical dogmas.",
  },

  "a-book-of-quranic-parables": {
    bookId: "a-book-of-quranic-parables",
    chapterTitle: "Chapter 4: The Parable of the Spider's House (Surah Al-Ankabut: 41)",
    arabicSnippet:
      "مَثَلُ الَّذِينَ اتَّخَذُوا مِن دُونِ اللَّهِ أَوْلِيَاءَ كَمَثَلِ الْعَنكَبُوتِ اتَّخَذَتْ بَيْتًا",
    transliteration:
      "Mathalu alladhīna ittakhadhū min dūnillāhi awliyā'a kamathali al-'ankabūti ittakhadhat baytā...",
    versesOrHadith:
      "The likeness of those who take protectors other than Allah is as the likeness of the spider who makes a house... (Surah Al-Ankabut 29:41)",
    paragraphs: [
      "Allah strikes parables for humanity that we may see beneath the veneer of physical appearances. In Surah Al-Ankabut, the Qur'an paints a masterwork of divine imagery: those who rely on false patrons, military might, financial empires, or mortal leaders are compared to the spider constructing its web.",
      "Consider the web: geometrically, it is intricate, symmetrical, and visually impressive. It appears capable of ensnaring smaller creatures. Yet in reality, what is it? It provides no protection from the scorching sun, offers no shield against the rain, and collapses at the gentlest stroke of a passing breeze. More devastatingly, modern biological science reveals that the spider's home is a place of fratricide and hostility—the female frequently consumes the male.",
      "Such is the reality of every ideological sanctuary built outside the grace of Allah. Whether it is an oppressive state, a fraudulent financial scheme, or superstitious amulets, it is as flimsy as the cobweb. When divine judgment breathes upon it, the entire edifice disintegrates. Safety exists only in the shelter of the Almighty.",
    ],
    keyTakeaway:
      "Every earthly power, ideology, and protector outside of Allah is as hollow and fragile as a spider's web.",
  },

  "critique-tijaniyyah-handbook": {
    bookId: "critique-tijaniyyah-handbook",
    chapterTitle:
      "Chapter 2: The Finality of Prophethood and the Fallacy of Post-Canonical Revelations",
    arabicSnippet: "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي",
    transliteration: "Al-yawma akmaltu lakum dīnakum wa atmamtu 'alaykum ni'matī...",
    versesOrHadith:
      "This day have I perfected for you your religion and completed My favor upon you. (Surah Al-Ma'idah 5:3)",
    paragraphs: [
      "In Islamic jurisprudence, the foundational canon is closed. When the Messenger of Allah ﷺ stood on Mount Arafat during the Farewell Pilgrimage and recited Surah Al-Ma'idah verse 3, the divine declaration was irrevocable: the Deen has been perfected; nothing can be added, and nothing can be diminished.",
      "It is therefore a matter of grave theological concern when treatises like Dr. Adekilekun Tijani's 'Handbook on the Tijaniyyah' assert that specific prayers, such as Salat al-Fatih, were revealed in waking dreams centuries after the Prophet's death, carrying rewards that allegedly surpass thousands of recitations of the Holy Qur'an itself.",
      "With forensic rigor, we cross-examine these claims: if Salat al-Fatih were superior to reciting the Words of Allah, why did the Prophet ﷺ conceal it from Abu Bakr, Umar, Uthman, and Ali? To claim that essential secrets of salvation were withheld from the Sahaba and saved for a 12th-century order is an indirect assault on the trustworthiness of Prophetic transmission. The Sunnah is complete, pristine, and sufficient.",
    ],
    keyTakeaway:
      "Islam was fully perfected during the lifetime of the Prophet ﷺ; no post-canonical dream or esoteric order can introduce new rites superior to the Qur'an.",
  },

  "what-is-sunnah-what-is-bidah": {
    bookId: "what-is-sunnah-what-is-bidah",
    chapterTitle:
      "Chapter 1: The Jurisprudential Boundary: Custom (Urf) vs. Devotional Innovation (Bid'ah)",
    arabicSnippet: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ فِيهِ فَهُوَ رَدٌّ",
    transliteration: "Man aḥdatha fī amrinā hādhā mā laysa fīhi fahuwa radd.",
    versesOrHadith:
      "He who innovates something in this matter of ours that is not part of it, will have it rejected. (Sahih al-Bukhari & Muslim)",
    paragraphs: [
      "A frequent source of confusion among contemporary Muslims is the inability to distinguish between societal customs ('Urf) and acts of devotional worship ('Ibadah). A person may ask: 'If using a microphone or riding an airplane is not Bid'ah, why is celebrating an unauthenticated ritual regarded as Bid'ah?'",
      "The legal principle is simple and elegant: in worldly affairs (Mu'amalat), everything is permissible unless explicitly forbidden. You may build modern cities, use computers, and develop medicine. But in matters of religion and worship ('Ibadah), everything is forbidden unless explicitly commanded by Allah and His Messenger ﷺ.",
      "When people invent rituals surrounding funerals (such as mandatory third-day, eighth-day, and fortieth-day feasts), or invent fees and novel invocations for weddings and naming ceremonies, they place heavy financial and spiritual burdens upon the believers. Returning to the Sunnah lifts these burdens, restoring the ease, nobility, and purity of the original Prophetic path.",
    ],
    keyTakeaway:
      "Worldly innovation in technology and society is encouraged; innovation in religious worship is strictly rejected.",
  },

  "path-to-paradise": {
    bookId: "path-to-paradise",
    chapterTitle: "Chapter 2: The Threshold of Barzakh: What Awaits the Soul in the Grave",
    arabicSnippet: "وَمِن وَرَائِهِم بَرْزَخٌ إِلَىٰ يَوْمِ يُبْعَثُونَ",
    transliteration: "Wa min warā'ihim barzakhun ilā yawmi yub'athūn.",
    versesOrHadith:
      "And behind them is a barrier (Barzakh) until the Day they are resurrected. (Surah Al-Mu'minun 23:100)",
    paragraphs: [
      "Death is not the termination of consciousness; it is merely the tearing of the sensory curtain. The body returns to dust, but the soul enters the intermediate realm known as the Barzakh—a transitional station between earthly existence and the final Day of Resurrection.",
      "The authentic Hadiths of al-Bara' ibn 'Azib describe the moment with terrifying realism: after the burial, as the footsteps of the mourners recede into the distance, two angels—Munkar and Nakir—arrive. They do not interrogate the deceased regarding his social status, academic degrees, or bank balances. Three questions alone determine his fate:",
      "'Who is your Lord? What is your religion? Who was the man sent among you?' For the soul who lived in sincere submission, the answers flow naturally from conviction. The grave expands as far as the eye can see, filled with the fragrant breezes of Paradise. But for the hypocrite and the denier, confusion reigns. This book charts this certain journey so that no believer arrives unprepared.",
    ],
    keyTakeaway:
      "The grave is either a garden among the gardens of Paradise or a pit among the pits of Hell; its outcome is determined by faith and deeds.",
  },

  "islamic-ideology-democratic-socialism": {
    bookId: "islamic-ideology-democratic-socialism",
    chapterTitle:
      "Chapter 2: The Fallacy of Laissez-Faire Capitalism and the Qur'anic Mandate of Zakat",
    arabicSnippet: "كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ",
    transliteration: "Kay lā yakūna dūlatan bayna al-aghniyā'i minkum...",
    versesOrHadith:
      "...so that wealth may not circulate solely among the rich among you. (Surah Al-Hashr 59:7)",
    paragraphs: [
      "The contemporary world has witnessed the collapse of Soviet-style state totalitarianism and the moral bankruptcy of unregulated predatory capitalism. Capitalism concentrates wealth in the hands of an oligarchy, turning political democracy into an auction where policies are bought by the highest bidder.",
      "More than fourteen centuries ago, the Holy Qur'an laid down an immutable economic maxim in Surah Al-Hashr: wealth must never become a commodity circulating exclusively among the rich. In Islam, private ownership is recognized, but it is strictly subordinated to the public interest through divine institutional instruments.",
      "Zakat is not voluntary philanthropy; it is a legally enforceable right of the poor upon the surplus capital of the affluent. Combined with the absolute prohibition of usury (Riba) and monopolistic hoarding (Ihtikar), Islamic ideology establishes a moral social democracy—a system where governance is an accountable trust (Amanah) and every citizen is guaranteed dignity, education, and healthcare.",
    ],
    keyTakeaway:
      "Islamic political economy synthesizes individual enterprise with compulsory social justice, ensuring wealth serves humanity rather than enslaving it.",
  },
};

export const EXCERPTS: BookExcerpt[] = Object.values(BOOK_EXCERPTS);

export function getExcerptForBook(bookIdOrSlug: string): BookExcerpt | null {
  if (!bookIdOrSlug) return null;
  if (BOOK_EXCERPTS[bookIdOrSlug]) {
    return BOOK_EXCERPTS[bookIdOrSlug];
  }
  const found = EXCERPTS.find((ex) => ex.bookId === bookIdOrSlug);
  return found || null;
}
