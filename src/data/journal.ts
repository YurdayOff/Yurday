import type { OccasionKey } from '@/lib/occasions'
import type { JournalLocale } from '@/lib/journal'

export type JournalSection = {
  heading: string
  paragraphs?: string[]
  /** Liste courte (ex. « 20 idées ») : une phrase par puce. */
  items?: string[]
}

export type JournalContent = {
  title: string
  /** Résumé : utilisé en meta description et sur la page liste. */
  description: string
  intro: string
  sections: JournalSection[]
  ctaTitle: string
  ctaText: string
}

export type JournalArticle = {
  id: string
  slug: Record<JournalLocale, string>
  relatedOccasion: OccasionKey
  image: string
  publishedAt: string
  content: Record<JournalLocale, JournalContent>
}

export const journalArticles: JournalArticle[] = [
  {
    id: 'cadeau-noel-idees',
    slug: {
      fr: 'idees-cadeau-noel-original-paris',
      en: 'original-christmas-gift-ideas-paris',
    },
    relatedOccasion: 'noel',
    image: '/images/moment-degustation-vin.webp',
    publishedAt: '2026-10-08',
    content: {
      fr: {
        title: '20 idées de cadeau de Noël original à Paris (qu’on n’oublie pas)',
        description:
          'Pas un objet de plus sous le sapin : 20 idées de journées à offrir cette année, pour elle, pour lui, pour vos parents ou pour un couple.',
        intro:
          'Chaque année, c’est le même problème : trouver un cadeau de Noël qui ne finira pas dans un tiroir en janvier. Un parfum de plus, un pull de plus, un gadget qu’on utilisera trois fois. Et si, cette année, vous offriez une journée plutôt qu’un objet ? Voici 20 idées pour vous inspirer, classées par destinataire — à adapter, mélanger, ou à nous raconter telles quelles.',
        sections: [
          {
            heading: 'Pourquoi offrir une journée plutôt qu’un objet',
            paragraphs: [
              'Un objet se possède. Une journée se vit, se raconte, et reste dans la mémoire bien après le 25 décembre. C’est tout le principe de Yurday : vous nous confiez la personne que vous aimez, nous construisons pour elle une journée entièrement sur mesure, scénarisée du matin au soir, avec de vrais comédiens quand l’histoire le demande.',
              'Le cadeau de Noël, lui, reste simple : une enveloppe scellée à poser sous le sapin. Ce qu’elle contient, c’est la promesse d’un jour que la personne concernée n’a pas vu venir. Yurday organise ces journées en toute discrétion, à Paris et dans toute l’Île-de-France : la personne concernée ne se doute de rien jusqu’au jour J — c’est souvent cela, plus que le lieu ou l’activité, qui rend le souvenir inoubliable.',
            ],
          },
          {
            heading: 'Pour elle : 5 idées qui sortent du lot',
            items: [
              'Une journée spa suivie d’un déjeuner dans un lieu tenu secret jusqu’au dernier moment.',
              'Une dégustation dans une cave à vin centenaire, au cœur de Paris.',
              'Une balade en calèche d’époque jusqu’au pied de la tour Eiffel.',
              'Une après-midi shopping personnalisée, suivie d’un dîner où tout a été pensé à l’avance.',
              'Une surprise orchestrée par ses proches, du réveil jusqu’au soir, sans qu’elle se doute de rien.',
            ],
          },
          {
            heading: 'Pour lui : 5 idées qui changent du classique',
            items: [
              'Un vol en montgolfière au lever du jour, suivi d’un petit-déjeuner servi sur place.',
              'Une sortie en voiture de collection vers une destination tenue secrète.',
              'Une mission façon jeu de piste dans Paris, avec de vrais comédiens en renfort.',
              'Une dégustation de whisky ou de vin rare, commentée par un expert.',
              'Une journée sportive sur mesure : saut en parachute, karting ou coaching boxe, selon ce qui lui ressemble.',
            ],
          },
          {
            heading: 'Pour vos parents : 5 idées pour leur dire merci autrement',
            items: [
              'Un déjeuner en famille organisé dans un lieu qu’ils n’auraient jamais choisi eux-mêmes.',
              'Une journée où leurs petits-enfants, parfois venus de loin, leur font la surprise.',
              'Une croisière privée sur la Seine, au coucher du soleil.',
              'Une relecture de leur propre histoire : un lieu, une chanson, un souvenir ravivé pour l’occasion.',
              'Une journée où, pour une fois, ce sont eux qu’on chouchoute du matin au soir.',
            ],
          },
          {
            heading: 'Pour un couple : 5 idées pour se surprendre encore',
            items: [
              'Une chasse au trésor dans Paris qui se termine par un dîner aux chandelles.',
              'Une soirée à l’Opéra avec chauffeur privé, du départ jusqu’au retour.',
              'Un pique-nique scénarisé dans un lieu insolite, loin du froid de décembre.',
              'Une journée où l’un surprend l’autre, avec notre équipe en coulisses pour tout orchestrer.',
              'Une relecture de leur rencontre, à travers une journée qui en reprend les étapes à sa façon.',
            ],
          },
          {
            heading: 'Comment ça se passe concrètement',
            paragraphs: [
              'Le concept est simple : vous nous racontez la personne — ses goûts, ce qui la touche, ce qu’elle n’aime pas — et nous imaginons la journée qui lui correspond vraiment. Vous recevez une enveloppe à glisser sous le sapin ; la journée elle-même a lieu plus tard, à une date fixée avec la personne concernée, une fois l’enveloppe ouverte.',
              'Réservez avant le 15 décembre pour recevoir votre enveloppe à temps. Pour tout le détail — livraison, zone d’intervention, délais — notre page dédiée au cadeau de Noël répond à vos questions.',
            ],
          },
        ],
        ctaTitle: 'Envie d’offrir une journée plutôt qu’un objet ?',
        ctaText:
          'Racontez-nous pour qui vous l’imaginez, nous revenons vers vous avec les premières idées sous 12h.',
      },
      en: {
        title: '20 Original Christmas Gift Ideas in Paris (That Won’t Be Forgotten)',
        description:
          'Not one more thing under the tree: 20 day-long gift ideas for this year, for her, for him, for your parents, or for a couple.',
        intro:
          'Every year, it’s the same problem: finding a Christmas gift that won’t end up in a drawer by January. One more fragrance, one more jumper, one more gadget you’ll use three times. What if, this year, you gave a day instead of an object? Here are 20 ideas to inspire you, sorted by recipient — mix, match, or tell us about them as they are.',
        sections: [
          {
            heading: 'Why give a day instead of an object',
            paragraphs: [
              'An object is owned. A day is lived, retold, and stays in the memory long after December 25th. That’s the whole idea behind Yurday: you entrust us with the person you love, and we build an entirely bespoke day for them, scripted from morning to night, with real actors when the story calls for it.',
              'The Christmas gift itself stays simple: a sealed envelope to slip under the tree. What’s inside is the promise of a day the person never saw coming. Yurday organises these days with complete discretion, in Paris and across the whole Île-de-France region — the person concerned has no idea until the day itself, and that, often more than the venue or the activity, is what makes the memory unforgettable.',
            ],
          },
          {
            heading: 'For her: 5 ideas that stand out',
            items: [
              'A spa day followed by lunch in a location kept secret until the last moment.',
              'A tasting in a century-old wine cellar, right in the heart of Paris.',
              'A ride in a vintage horse-drawn carriage to the foot of the Eiffel Tower.',
              'A personalised shopping afternoon, followed by a dinner planned down to the smallest detail.',
              'A surprise orchestrated by her loved ones, from the moment she wakes up to the evening, with no idea it’s coming.',
            ],
          },
          {
            heading: 'For him: 5 ideas beyond the usual',
            items: [
              'A hot air balloon flight at sunrise, followed by breakfast served on arrival.',
              'A drive in a vintage car to a destination kept secret.',
              'A puzzle-hunt style mission across Paris, with real actors woven into the story.',
              'A rare whisky or wine tasting, guided by an expert.',
              'A bespoke sports day: skydiving, karting or private boxing coaching, matched to who he is.',
            ],
          },
          {
            heading: 'For your parents: 5 ideas to say thank you differently',
            items: [
              'A family lunch organised in a venue they would never have chosen themselves.',
              'A day where their grandchildren, sometimes travelling from afar, show up as a surprise.',
              'A private cruise on the Seine, at sunset.',
              'A retelling of their own story: a place, a song, a memory revived for the occasion.',
              'A day where, for once, they’re the ones being looked after from morning to night.',
            ],
          },
          {
            heading: 'For a couple: 5 ideas to surprise each other again',
            items: [
              'A treasure hunt across Paris that ends in a candlelit dinner.',
              'An evening at the Opéra with a private driver, from departure to return.',
              'A scripted picnic in an unexpected setting, away from December’s cold.',
              'A day where one partner surprises the other, with our team working behind the scenes.',
              'A retelling of how they met, through a day that revisits its key moments in its own way.',
            ],
          },
          {
            heading: 'How it actually works',
            paragraphs: [
              'The idea is simple: you tell us about the person — what they love, what moves them, what they don’t like — and we imagine the day that truly fits them. You receive an envelope to slip under the tree; the day itself happens later, on a date set with the person concerned once the envelope is opened.',
              'Book before December 15th to receive your envelope in time. For all the details — delivery, coverage area, deadlines — our dedicated Christmas gift page answers your questions.',
            ],
          },
        ],
        ctaTitle: 'Want to give a day instead of an object?',
        ctaText:
          'Tell us who you’re imagining this for, and we’ll get back to you with the first ideas within 12 hours.',
      },
    },
  },
  {
    id: 'demande-mariage-guide',
    slug: {
      fr: 'organiser-demande-en-mariage-paris-guide',
      en: 'marriage-proposal-paris-complete-guide',
    },
    relatedOccasion: 'demande-en-mariage',
    image: '/images/moment-demande-mariage-coucher-soleil.webp',
    publishedAt: '2026-10-08',
    content: {
      fr: {
        title: 'Comment organiser une demande en mariage inoubliable à Paris : le guide complet',
        description:
          'Lieu, timing, comment surprendre sans éveiller les soupçons, impliquer les proches : tout ce qu’il faut savoir avant d’organiser une demande à Paris.',
        intro:
          'Vous avez pris votre décision. Reste la partie qui angoisse le plus : comment la demander, où, et comment faire en sorte que ce moment lui ressemble vraiment, à elle, à lui, ou à vous deux ? Ce guide reprend les questions qu’on nous pose le plus souvent, avant de se lancer dans l’organisation d’une demande en mariage à Paris.',
        sections: [
          {
            heading: 'Choisir le bon lieu',
            paragraphs: [
              'Paris regorge de lieux emblématiques pour une demande, mais le plus photogénique n’est pas toujours le bon choix. Le pied de la tour Eiffel au coucher du soleil fonctionne à merveille pour un couple qui aime la foule et la spontanéité ; un jardin privé, une péniche sur la Seine ou un château en Île-de-France conviennent mieux à ceux qui préfèrent l’intimité.',
              'La vraie question n’est pas « quel est le plus beau lieu de Paris », mais « quel lieu raconte quelque chose de notre histoire ». C’est toujours notre point de départ chez Yurday : comprendre le couple avant de proposer un décor.',
            ],
          },
          {
            heading: 'Le bon moment : date, heure, saison',
            paragraphs: [
              'La lumière dorée de fin de journée reste la plus demandée, en particulier au printemps et à l’automne, quand les températures restent agréables sans la foule de l’été. Mais une demande en hiver, au coin du feu ou sur une patinoire privatisée, peut être tout aussi forte — parfois plus, justement parce qu’elle sort de l’attendu.',
              'Le jour de la semaine compte aussi : un samedi offre plus de flexibilité pour organiser ensuite une soirée avec les proches, pendant qu’un mardi soir surprend davantage, simplement parce que personne ne l’attend un soir de semaine.',
            ],
          },
          {
            heading: 'Comment la ou le surprendre sans éveiller les soupçons',
            paragraphs: [
              'C’est souvent le point le plus délicat : comment amener la personne au bon endroit, à la bonne heure, sans qu’elle se doute de rien ? Chez Yurday, on construit toute une journée — souvent un jeu de piste ou une série de rendez-vous présentés autrement — pour que le moment de la demande arrive comme une surprise totale, et non comme un rendez-vous suspect un peu trop habillé.',
              'Les proches, quand ils sont briefés à l’avance, jouent souvent un rôle clé : un message anodin, un déjeuner qui se transforme en prétexte, une excuse professionnelle qui cache en réalité toute une organisation.',
            ],
          },
          {
            heading: 'Impliquer les proches : jusqu’où aller',
            paragraphs: [
              'Beaucoup de futurs fiancés veulent que leurs proches soient présents juste après la demande, sans que la personne ne le sache à l’avance. C’est tout à fait possible : on peut orchestrer l’arrivée des amis et de la famille à l’instant précis où la réponse est donnée, pour transformer un moment à deux en une soirée entière à célébrer ensemble.',
              'D’autres couples préfèrent garder ce moment strictement privé, et annoncer la nouvelle eux-mêmes, à leur rythme. Les deux approches se valent : il n’y a pas de bonne réponse, seulement celle qui vous ressemble.',
            ],
          },
          {
            heading: 'Et après le oui ?',
            paragraphs: [
              'La demande n’est souvent que le point de départ d’une journée pensée dans son ensemble : un dîner réservé en amont, une activité qui prolonge l’émotion, parfois une surprise supplémentaire pour fêter l’instant avec ceux qui comptent. Beaucoup de nos clients nous disent, après coup, que c’est cette continuité — le fait que rien ne s’arrête juste après le « oui » — qui a rendu la journée inoubliable.',
            ],
          },
          {
            heading: 'Les erreurs à éviter',
            items: [
              'Vouloir à tout prix un lieu touristique bondé, au détriment de l’intimité du moment.',
              'Ne pas prévoir de plan B en cas de pluie ou d’imprévu.',
              'Trop en dire aux proches trop tôt, au risque qu’un message maladroit éveille les soupçons.',
              'Négliger la suite de la journée, en pensant que la demande suffit à elle seule.',
              'Attendre la dernière minute pour réserver les lieux et prestataires les plus demandés.',
            ],
          },
        ],
        ctaTitle: 'Prêt à organiser votre demande ?',
        ctaText:
          'Racontez-nous votre histoire et ce que vous imaginez, nous revenons vers vous avec un scénario complet sous 12h.',
      },
      en: {
        title: 'How to Plan an Unforgettable Marriage Proposal in Paris: The Complete Guide',
        description:
          'Venue, timing, how to surprise them without raising suspicion, involving loved ones: everything you need to know before planning a proposal in Paris.',
        intro:
          'You’ve made your decision. What’s left is the part that causes the most anxiety: how to ask, where, and how to make sure the moment truly fits the two of you. This guide answers the questions we’re asked most often, before planning a marriage proposal in Paris.',
        sections: [
          {
            heading: 'Choosing the right venue',
            paragraphs: [
              'Paris is full of iconic spots for a proposal, but the most photogenic isn’t always the right choice. The foot of the Eiffel Tower at sunset works beautifully for a couple who loves spontaneity and a bit of a crowd; a private garden, a boat on the Seine, or a château in Île-de-France suits those who prefer intimacy better.',
              'The real question isn’t “what’s the most beautiful spot in Paris”, but “what venue tells a part of our story”. That’s always our starting point at Yurday: understanding the couple before suggesting a setting.',
            ],
          },
          {
            heading: 'The right moment: date, time, season',
            paragraphs: [
              'Golden late-afternoon light remains the most requested, especially in spring and autumn, when temperatures stay pleasant without the summer crowds. But a winter proposal, by a fireplace or on a private ice rink, can be just as powerful — sometimes more so, precisely because it breaks from the expected.',
              'The day of the week matters too: a Saturday offers more flexibility to follow up with an evening with loved ones, while a Tuesday evening surprises more, simply because no one expects it on a weeknight.',
            ],
          },
          {
            heading: 'How to surprise them without raising suspicion',
            paragraphs: [
              'This is often the trickiest part: how do you get the person to the right place, at the right time, without them suspecting a thing? At Yurday, we build an entire day around it — often a puzzle hunt or a series of appointments presented differently — so the proposal arrives as a complete surprise, not as a slightly-too-dressed-up date that gives itself away.',
              'Loved ones, when briefed in advance, often play a key role: an innocent-sounding message, a lunch that turns into a pretext, a work excuse that actually hides an entire operation.',
            ],
          },
          {
            heading: 'Involving loved ones: how far to go',
            paragraphs: [
              'Many future fiancé(e)s want their loved ones to be present right after the proposal, without the other person knowing in advance. That’s entirely possible: we can time the arrival of friends and family to the exact moment the answer is given, turning a moment for two into an entire evening to celebrate together.',
              'Other couples prefer to keep the moment strictly private, and share the news themselves, at their own pace. Both approaches are valid — there’s no right answer, only the one that fits you.',
            ],
          },
          {
            heading: 'And after the yes?',
            paragraphs: [
              'The proposal is often just the starting point of a day thought through as a whole: a dinner booked in advance, an activity that extends the emotion, sometimes an additional surprise to celebrate the moment with the people who matter. Many of our clients tell us afterwards that it’s this continuity — the fact that nothing stops right after the “yes” — that made the day unforgettable.',
            ],
          },
          {
            heading: 'Mistakes to avoid',
            items: [
              'Insisting on a crowded tourist spot at the expense of the moment’s intimacy.',
              'Not having a backup plan for rain or the unexpected.',
              'Telling loved ones too much, too early, risking a careless message giving it away.',
              'Overlooking the rest of the day, assuming the proposal alone is enough.',
              'Waiting until the last minute to book the most sought-after venues and providers.',
            ],
          },
        ],
        ctaTitle: 'Ready to plan your proposal?',
        ctaText:
          'Tell us your story and what you’re imagining, and we’ll get back to you with a complete scenario within 12 hours.',
      },
    },
  },
  {
    id: 'evjf-idees',
    slug: {
      fr: 'evjf-paris-idees-originales',
      en: 'bachelorette-party-paris-original-ideas',
    },
    relatedOccasion: 'evg-evjf',
    image: '/images/moment-evjf-boite-nuit.webp',
    publishedAt: '2026-10-08',
    content: {
      fr: {
        title: 'EVJF à Paris : 15 idées qui sortent vraiment de l’ordinaire',
        description:
          'Spa, brunch, déguisements roses : l’EVJF classique a son charme, mais il commence à se ressembler. 15 idées pour faire autrement.',
        intro:
          'Spa, brunch, déguisements roses : l’EVJF classique a son charme, mais il commence à se ressembler d’une bande de copines à l’autre. Voici 15 idées pour sortir du schéma habituel, à piocher ou à combiner pour composer une journée qui ressemble vraiment à la future mariée.',
        sections: [
          {
            heading: 'Les formats qui sortent du lot',
            items: [
              'Une enquête grandeur nature dans Paris, avec de vrais comédiens glissés dans le décor.',
              'Un cours de cuisine privé suivi d’un dîner que vous avez préparé vous-mêmes.',
              'Une croisière privée sur la Seine, avec DJ et vue sur les monuments illuminés.',
              'Un atelier créatif insolite : poterie, parfum sur-mesure ou cocktails, selon ses goûts.',
              'Une soirée dans un bar caché, dont l’adresse reste secrète jusqu’au dernier moment.',
            ],
          },
          {
            heading: 'Pour celles qui aiment les sensations fortes',
            paragraphs: [
              'Toutes les futures mariées ne rêvent pas de spa et de champagne. Pour celles qui carburent à l’adrénaline, une journée peut s’ouvrir sur un saut en parachute ou une sortie en karting, avant de basculer vers quelque chose de plus festif en soirée. Le mélange des genres, loin d’être un problème, fait souvent toute la réussite de la journée.',
            ],
            items: [
              'Un saut en parachute en tandem, suivi d’un déjeuner pour redescendre en douceur.',
              'Une sortie karting entre filles, aussi compétitive que les egos présents dans la voiture.',
              'Un cours de boxe privé, pour canaliser le trac avant le grand jour.',
            ],
          },
          {
            heading: 'Pour un groupe qui préfère la douceur',
            items: [
              'Un pique-nique scénarisé dans un lieu tenu secret jusqu’à l’arrivée.',
              'Une après-midi bien-être, suivie d’un dîner dans un cadre choisi avec soin.',
              'Une balade en calèche à travers Paris, loin du bruit et des embouteillages.',
              'Un atelier dégustation, vin ou champagne, commenté par un expert.',
            ],
          },
          {
            heading: 'Comment transformer ces idées en vraie journée',
            paragraphs: [
              'La différence entre une liste d’idées et un souvenir marquant, c’est le scénario qui relie tout : le fil conducteur, les surprises qui s’enchaînent, et surtout la garantie que la future mariée ne se doute de rien avant le premier indice. Chez Yurday, on part toujours de son histoire à elle — ce qu’elle aime, ce qu’elle déteste, un souvenir qui compte — pour construire une journée qui ne ressemble à aucune autre, jamais un format déjà vu ailleurs.',
              'On s’occupe aussi de la logistique la moins drôle à gérer entre copines : répartir les coûts par tête ou au forfait, coordonner les horaires de chacune, réserver les lieux. Vous nous racontez le groupe, on construit le reste.',
            ],
          },
        ],
        ctaTitle: 'Prêtes à organiser son EVJF ?',
        ctaText:
          'Racontez-nous la future mariée et l’ambiance que vous voulez lui offrir, on revient vers vous avec les premières idées sous 12h.',
      },
      en: {
        title: 'Bachelorette Party in Paris: 15 Ideas That Actually Stand Out',
        description:
          'Spa, brunch, pink costumes: the classic bachelorette has its charm, but it’s starting to look the same everywhere. 15 ideas to do things differently.',
        intro:
          'Spa, brunch, pink costumes: the classic bachelorette party has its charm, but it’s starting to look the same from one group of friends to the next. Here are 15 ideas to break from the usual script, to pick from or combine into a day that truly fits the bride-to-be.',
        sections: [
          {
            heading: 'Formats that stand out',
            items: [
              'A full-scale investigation across Paris, with real actors woven into the scenery.',
              'A private cooking class followed by a dinner you made yourselves.',
              'A private cruise on the Seine, with a DJ and a view of the illuminated monuments.',
              'An unexpected creative workshop: pottery, bespoke perfume, or cocktail-making, matched to her taste.',
              'An evening at a hidden bar, whose address stays secret until the last moment.',
            ],
          },
          {
            heading: 'For those who love a thrill',
            paragraphs: [
              'Not every bride-to-be dreams of spas and champagne. For those running on adrenaline, a day can open with a skydive or a karting session, before shifting into something more festive by evening. Mixing genres, far from being a problem, is often what makes the day work.',
            ],
            items: [
              'A tandem skydive, followed by a lunch to come back down to earth, gently.',
              'A karting session between friends, as competitive as the egos in the car.',
              'A private boxing class, to channel the nerves before the big day.',
            ],
          },
          {
            heading: 'For a group that prefers things gentler',
            items: [
              'A scripted picnic in a location kept secret until arrival.',
              'A wellness afternoon, followed by a carefully chosen dinner.',
              'A horse-drawn carriage ride through Paris, away from the noise and traffic.',
              'A tasting workshop, wine or champagne, guided by an expert.',
            ],
          },
          {
            heading: 'Turning these ideas into a real day',
            paragraphs: [
              'The difference between a list of ideas and a memory that lasts is the storyline that ties it all together: the thread, the surprises that build on each other, and above all the guarantee that the bride-to-be won’t suspect a thing before the first clue. At Yurday, we always start from her story — what she loves, what she can’t stand, a memory that matters — to build a day unlike any other, never a format you’ve seen anywhere else.',
              'We also handle the least fun logistics to manage between friends: splitting costs per head or as a flat fee, coordinating everyone’s schedule, booking the venues. Tell us about the group, and we’ll handle the rest.',
            ],
          },
        ],
        ctaTitle: 'Ready to plan her bachelorette party?',
        ctaText:
          'Tell us about the bride-to-be and the mood you want to create, and we’ll get back to you with the first ideas within 12 hours.',
      },
    },
  },
  {
    id: 'anniversaire-surprise-idees',
    slug: {
      fr: 'anniversaire-surprise-adulte-paris-idees',
      en: 'surprise-birthday-ideas-adults-paris',
    },
    relatedOccasion: 'anniversaire',
    image: '/images/moment-karting.webp',
    publishedAt: '2026-10-08',
    content: {
      fr: {
        title: 'Anniversaire surprise pour adulte à Paris : 12 idées pour marquer le coup',
        description:
          'Passé un certain âge, les anniversaires se ressemblent. 12 idées pour sortir du rituel habituel et offrir un anniversaire qu’on racontera encore l’an prochain.',
        intro:
          'Passé un certain âge, les anniversaires se ressemblent : un restaurant, un gâteau, les mêmes têtes autour de la table. Voici 12 idées pour sortir du rituel habituel et offrir un anniversaire qu’on racontera encore l’année suivante — à un ami, un proche, ou même à soi-même.',
        sections: [
          {
            heading: 'Des idées qui changent du dîner classique',
            items: [
              'Un vol en montgolfière au lever du soleil, suivi d’un petit-déjeuner sur place.',
              'Une mission façon jeu de piste dans Paris, ponctuée de fausses pistes et de vrais comédiens.',
              'Une dégustation dans une cave secrète, au cœur de la capitale.',
              'Une sortie en voiture de collection vers une destination tenue secrète jusqu’au départ.',
              'Un appel surprise ou une apparition orchestrée par quelqu’un que la personne admire.',
            ],
          },
          {
            heading: 'Pour les amateurs de sensations',
            items: [
              'Un saut en parachute, pour ceux qui n’ont jamais osé le faire seuls.',
              'Une sortie karting entre amis, aussi animée que les paris engagés avant le départ.',
              'Un cours de boxe privé avec un coach, suivi d’un déjeuner bien mérité.',
            ],
          },
          {
            heading: 'Pour réunir ceux qui comptent',
            paragraphs: [
              'Le plus dur, souvent, n’est pas l’activité elle-même mais la coordination : faire venir des amis d’enfance, parfois depuis une autre ville, sans que la personne concernée ne se doute de rien. Chez Yurday, on s’occupe de cette logistique invisible — rendez-vous présentés autrement, proches briefés, timing millimétré — pour que la seule chose qui reste à vivre, ce soit la surprise elle-même.',
            ],
            items: [
              'Des amis d’enfance réunis après des années, pour un dîner dont la personne ignore tout.',
              'Une vidéo ou des messages surprises de proches éloignés, diffusés au moment clé de la journée.',
              'Trois générations réunies autour d’une même table, pour un anniversaire qui marque vraiment.',
            ],
          },
          {
            heading: 'Comment construire une journée qui ne ressemble à aucune autre',
            paragraphs: [
              'Un bon anniversaire surprise ne se résume pas à une activité originale : c’est l’enchaînement, du réveil jusqu’au soir, qui fait toute la différence. Chez Yurday, chaque journée est écrite pour une seule personne, jamais deux fois la même, à partir de ce que vous nous racontez d’elle — ce qui la fait vibrer, ce qu’elle n’aime pas, un souvenir qui compte.',
              'Racontez-nous qui vous voulez gâter : on revient vers vous avec les premières idées sous 12h, sans jamais rien vous imposer qui ne lui ressemble pas.',
            ],
          },
        ],
        ctaTitle: 'Envie de lui organiser une journée qu’il ou elle n’oubliera jamais ?',
        ctaText:
          'Racontez-nous pour qui vous imaginez cette journée, on revient vers vous avec les premières idées sous 12h.',
      },
      en: {
        title: 'Surprise Birthday for Adults in Paris: 12 Ideas to Make It Count',
        description:
          'Past a certain age, birthdays start to look the same. 12 ideas to break the routine and give a birthday people will still be talking about next year.',
        intro:
          'Past a certain age, birthdays start to look the same: a restaurant, a cake, the same faces around the table. Here are 12 ideas to break from the usual routine and give a birthday people will still be talking about next year — for a friend, a loved one, or even for yourself.',
        sections: [
          {
            heading: 'Ideas beyond the classic dinner',
            items: [
              'A hot air balloon flight at sunrise, followed by breakfast on arrival.',
              'A puzzle-hunt style mission across Paris, full of false leads and real actors.',
              'A tasting in a secret cellar, right in the heart of the capital.',
              'A drive in a vintage car to a destination kept secret until departure.',
              'A surprise call or appearance orchestrated by someone the person admires.',
            ],
          },
          {
            heading: 'For thrill-seekers',
            items: [
              'A skydive, for those who never dared to do it alone.',
              'A karting session with friends, as lively as the bets placed before the start.',
              'A private boxing class with a coach, followed by a well-earned lunch.',
            ],
          },
          {
            heading: 'For bringing together the people who matter',
            paragraphs: [
              'The hardest part is often not the activity itself but the coordination: getting childhood friends together, sometimes from another city, without the person suspecting a thing. At Yurday, we handle this invisible logistics — appointments presented differently, loved ones briefed in advance, timing down to the minute — so the only thing left to experience is the surprise itself.',
            ],
            items: [
              'Childhood friends reunited after years apart, for a dinner the person knows nothing about.',
              'A surprise video or messages from loved ones far away, played at just the right moment.',
              'Three generations gathered around the same table, for a birthday that truly marks the occasion.',
            ],
          },
          {
            heading: 'How to build a day unlike any other',
            paragraphs: [
              'A great surprise birthday isn’t just one original activity: it’s the flow, from the moment they wake up to the evening, that makes all the difference. At Yurday, every day is written for one person only, never the same twice, built from what you tell us about them — what makes them light up, what they don’t like, a memory that matters.',
              'Tell us who you want to spoil: we’ll get back to you with the first ideas within 12 hours, never imposing anything that doesn’t truly fit them.',
            ],
          },
        ],
        ctaTitle: 'Want to give them a day they’ll never forget?',
        ctaText:
          'Tell us who you’re imagining this day for, and we’ll get back to you with the first ideas within 12 hours.',
      },
    },
  },
]
