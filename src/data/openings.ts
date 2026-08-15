import type { Opening } from "./types";

/**
 * Opening lessons. Every line is validated as legal chess by scripts/validate-openings.ts
 * (run `npm run validate`). Explanations are written for a curious 9‑year‑old:
 * short sentences, plain words, and always a "why".
 */
export const OPENINGS: Opening[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "italian-game",
    name: "Italian Game",
    subtitle: 'Giuoco Piano — "the quiet game"',
    side: "white",
    difficulty: 1,
    emoji: "🍕",
    tagline:
      "The perfect first opening: fast development and a bishop aimed at f7.",
    intro: [
      "The Italian Game is one of the oldest openings in chess — people were playing it 500 years ago! It is a great first opening because every move follows the golden rules: control the center, bring out your pieces, and castle your king to safety.",
      "The star of the show is your light‑squared bishop. It goes to c4 and stares straight at f7 — the weakest square in Black's camp, because only the king protects it.",
    ],
    keyIdeas: [
      "Grab the center with e4 and get your knight to f3 fast.",
      "Put your bishop on c4, pointing at the weak f7 pawn.",
      "Play c3 and d3 to build a strong pawn wall, then castle.",
    ],
    moves: [
      {
        san: "e4",
        explanation:
          "We start by pushing the king's pawn two squares. This grabs space in the middle of the board and opens lines for both the queen and the bishop.",
        arrows: [{ from: "e2", to: "e4" }],
        highlights: ["e4", "d5", "f5"],
        hint: "Start by controlling the center with your king's pawn.",
      },
      {
        san: "e5",
        explanation:
          "Black copies us and takes their share of the center. Now the two pawns are face to face — neither one can move forward.",
      },
      {
        san: "Nf3",
        explanation:
          "Knights before bishops! Nf3 develops a piece AND attacks the e5 pawn at the same time. Making a threat while developing is a great habit.",
        arrows: [{ from: "f3", to: "e5", kind: "threat" }],
        hint: "Develop a knight toward the center — and attack that e5 pawn while you're at it.",
      },
      {
        san: "Nc6",
        explanation:
          "Black defends the e5 pawn with a knight. Simple and sensible — Black is developing too.",
      },
      {
        san: "Bc4",
        explanation:
          "Here comes the Italian bishop! From c4 it looks straight down the diagonal at f7, the one square that only Black's king is guarding. This is the move that gives the opening its name.",
        arrows: [{ from: "c4", to: "f7", kind: "threat" }],
        highlights: ["f7"],
        hint: "Which bishop can aim at f7, Black's weakest square?",
      },
      {
        san: "Bc5",
        explanation:
          'Black mirrors us and points their bishop at OUR weak square, f2. Both sides now have "Italian bishops". This is called the Giuoco Piano — Italian for "quiet game".',
        arrows: [{ from: "c5", to: "f2", kind: "note" }],
      },
      {
        san: "c3",
        explanation:
          "A small pawn move with a big plan. c3 prepares d4 — pushing our second pawn into the center to kick Black's bishop and take over the middle of the board.",
        arrows: [{ from: "d2", to: "d4", kind: "idea" }],
        highlights: ["d4"],
        hint: "A little pawn move that gets ready to push d2–d4 next.",
      },
      {
        san: "Nf6",
        explanation:
          "Black develops the other knight and attacks our e4 pawn. Watch out — that pawn now needs a bodyguard.",
        arrows: [{ from: "f6", to: "e4", kind: "threat" }],
      },
      {
        san: "d3",
        explanation:
          'We defend e4 with a pawn and free our dark‑squared bishop at the same time. Slow and solid — the "quiet" way to play the Italian.',
        arrows: [{ from: "d3", to: "e4", kind: "idea" }],
        hint: "Your e4 pawn is under attack. Defend it with a pawn and open your bishop.",
      },
      {
        san: "d6",
        explanation:
          "Black defends their e5 pawn the same way. Both sides now have solid pawn chains.",
      },
      {
        san: "O-O",
        explanation:
          "Castle! Your king tucks into the corner behind a wall of pawns and your rook joins the game. Castling early is one of the most important habits in chess.",
        highlights: ["g1", "f1"],
        hint: "Your king is still in the middle. Get it to safety!",
      },
      {
        san: "O-O",
        explanation:
          "Black castles too. Both kings are safe, both sides have developed pieces — a healthy, balanced start. From here you play chess: bring the knight from b1 to d2, push d4 at the right moment, and look for tactics on f7.",
      },
    ],
    quiz: [
      {
        question: "Why does White's bishop go to c4 in the Italian Game?",
        options: [
          "It attacks the weak f7 square next to Black's king",
          "It blocks Black's queen",
          "It protects the e4 pawn",
          "It gets out of the way of the rook",
        ],
        answer: 0,
        explanation:
          "On c4 the bishop looks straight at f7 — the only pawn guarded by nothing but the king. That's the whole idea of the Italian!",
        ply: 5,
      },
      {
        question: "What is the point of the little pawn move c3?",
        options: [
          "To trap Black's bishop",
          "To prepare d4 and take over the center",
          "To let the king escape",
          "It does nothing — it's a waiting move",
        ],
        answer: 1,
        explanation:
          "c3 supports a later d4 push. With pawns on d4 and e4 White controls the center.",
        ply: 7,
      },
      {
        question:
          "After 3…Nf6 Black attacks your e4 pawn. What is the calm Italian way to defend it?",
        options: [
          "Push e5",
          "Play d3",
          "Move the bishop back",
          "Ignore it — pawns don't matter",
        ],
        answer: 1,
        explanation:
          "d3 defends e4 with a pawn and also opens the c1 bishop. Solid and simple.",
        ply: 8,
      },
    ],
    funFact:
      "The Italian Game was written about in a book from 1497 — that's before most of the world even knew America existed!",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ruy-lopez",
    name: "Ruy Lopez",
    subtitle: "The Spanish Opening",
    side: "white",
    difficulty: 2,
    emoji: "🇪🇸",
    tagline:
      "The champion's opening — put pressure on the knight that guards e5.",
    intro: [
      "The Ruy Lopez is named after a Spanish priest who wrote about it in 1561. Almost every world champion has played it. It looks a lot like the Italian at first, but the bishop goes to b5 instead of c4.",
      "The idea is sneaky: the bishop attacks the c6 knight, and that knight is the guard of the e5 pawn. If the guard disappears, the pawn might fall. Black has to be careful and White gets long‑lasting pressure.",
    ],
    keyIdeas: [
      "Bb5 pins down the knight that defends e5.",
      "Castle early, then bring your rook to e1 to protect e4.",
      "Keep the bishop alive — retreat it to a4 and b3 when it is chased.",
    ],
    moves: [
      {
        san: "e4",
        explanation:
          "The classic first move: control the center and open lines for the queen and bishop.",
        highlights: ["e4", "d5", "f5"],
        hint: "Control the center with your king's pawn.",
      },
      { san: "e5", explanation: "Black takes their share of the center." },
      {
        san: "Nf3",
        explanation:
          "Develop the knight and attack e5. Same start as the Italian!",
        arrows: [{ from: "f3", to: "e5", kind: "threat" }],
        hint: "Bring out your knight and attack e5.",
      },
      {
        san: "Nc6",
        explanation:
          "Black defends e5 with the knight — this knight is now the bodyguard of e5.",
      },
      {
        san: "Bb5",
        explanation:
          "The Spanish move! The bishop attacks the c6 knight. That knight is the bodyguard of e5, so we're really pressuring the e5 pawn from a distance. Notice: this is different from the Italian, where the bishop goes to c4.",
        arrows: [
          { from: "b5", to: "c6", kind: "threat" },
          { from: "c6", to: "e5", kind: "note" },
        ],
        highlights: ["c6"],
        hint: "Attack the knight on c6 — the bodyguard of the e5 pawn.",
      },
      {
        san: "a6",
        explanation:
          'Black pokes the bishop with a pawn. "Go away!" This is the most popular reply. Now we must decide: take the knight, or step back?',
        arrows: [{ from: "a6", to: "b5", kind: "threat" }],
      },
      {
        san: "Ba4",
        explanation:
          "We step back but keep the pressure — from a4 the bishop still stares at c6. Taking the knight with Bxc6 is OK too, but keeping the bishop is the main line.",
        arrows: [{ from: "a4", to: "c6", kind: "threat" }],
        hint: "Keep your bishop and keep the pressure on c6. Where can it retreat along the same diagonal?",
      },
      {
        san: "Nf6",
        explanation: "Black develops the other knight and attacks our e4 pawn.",
        arrows: [{ from: "f6", to: "e4", kind: "threat" }],
      },
      {
        san: "O-O",
        explanation:
          "We castle and let Black take e4 if they dare — after Nxe4 we play Re1 and win the pawn back with a strong position. King safety first!",
        highlights: ["g1"],
        hint: "Your e4 pawn is attacked, but there's something more important than pawns…",
      },
      {
        san: "Be7",
        explanation:
          "Black develops the bishop and gets ready to castle. Sensible.",
      },
      {
        san: "Re1",
        explanation:
          "The rook slides to e1 and now protects e4. This is the classic Ruy Lopez setup — the rook belongs on the e‑file.",
        arrows: [{ from: "e1", to: "e4", kind: "idea" }],
        hint: "Now protect e4 — with a rook that just woke up when you castled.",
      },
      {
        san: "b5",
        explanation:
          "Black chases the bishop again with the b‑pawn. Black gains space but also loosens their queenside a little.",
        arrows: [{ from: "b5", to: "a4", kind: "threat" }],
      },
      {
        san: "Bb3",
        explanation:
          "The bishop steps back one more time and lands on a beautiful diagonal aiming at f7. It survived the chase and is now perfectly placed.",
        arrows: [{ from: "b3", to: "f7", kind: "threat" }],
        highlights: ["f7"],
        hint: "Save the bishop again — find the square that points at f7.",
      },
      {
        san: "O-O",
        explanation:
          'Black castles. Both sides are safe and developed. White\'s plan next: c3, then d4 to build a big center. This is the "Closed Ruy Lopez" and grandmasters have played it thousands of times.',
      },
    ],
    quiz: [
      {
        question:
          "In the Ruy Lopez, why does the bishop attack the knight on c6?",
        options: [
          "Because that knight defends the e5 pawn",
          "Because the knight is worth more than a bishop",
          "To block Black from castling",
          "To trade bishops",
        ],
        answer: 0,
        explanation:
          "The c6 knight is the bodyguard of e5. Pressuring the bodyguard is an indirect attack on the pawn.",
        ply: 5,
      },
      {
        question: "After 3…a6, what does White usually do with the bishop?",
        options: [
          "Take the knight on c6",
          "Retreat to a4",
          "Retreat all the way to f1",
          "Leave it on b5",
        ],
        answer: 1,
        explanation: "Ba4 keeps the bishop alive and keeps the pressure on c6.",
        ply: 6,
      },
      {
        question:
          "Why is castling on move 5 a good idea even though e4 is attacked?",
        options: [
          "Because pawns are not important",
          "Because king safety comes first and Re1 will win the pawn back",
          "Because Black cannot legally take on e4",
          "It is not a good idea",
        ],
        answer: 1,
        explanation:
          "If Black takes e4, Re1 attacks the knight and Black has to give the pawn back. Castling first is safe and strong.",
        ply: 9,
      },
    ],
    funFact:
      "Ruy Lopez de Segura, the priest who wrote about this opening, was one of the strongest players in Europe in the 1500s.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "scotch-game",
    name: "Scotch Game",
    subtitle: "Open the center right away",
    side: "white",
    difficulty: 2,
    emoji: "⚔️",
    tagline:
      "Blast open the center on move 3 and get lots of open lines for your pieces.",
    intro: [
      "The Scotch got its name from a famous match between London and Edinburgh in 1824. Instead of playing quietly, White strikes in the center on move 3 with d4 and trades pawns.",
      "The result is an open board where pieces fly around and there are lots of chances for tactics. If you like action, this is your opening.",
    ],
    keyIdeas: [
      "Play d4 early and trade off Black's e5 pawn.",
      "Recapture with the knight so it sits proudly in the center.",
      "Develop quickly — open positions punish slow play.",
    ],
    moves: [
      {
        san: "e4",
        explanation:
          "Control the center and open lines. The same first move as the Italian and the Ruy Lopez.",
        highlights: ["e4"],
        hint: "King's pawn forward two squares.",
      },
      { san: "e5", explanation: "Black takes their share of the center." },
      {
        san: "Nf3",
        explanation: "Develop and attack e5.",
        arrows: [{ from: "f3", to: "e5", kind: "threat" }],
        hint: "Bring your knight out and attack e5.",
      },
      { san: "Nc6", explanation: "Black defends e5." },
      {
        san: "d4",
        explanation:
          "Boom! We push our second center pawn and attack e5 twice — with the pawn and the knight. Black can't hold e5, so they usually take.",
        arrows: [
          { from: "d4", to: "e5", kind: "threat" },
          { from: "f3", to: "e5", kind: "threat" },
        ],
        highlights: ["e5"],
        hint: "Attack e5 a second time with a pawn.",
      },
      {
        san: "exd4",
        explanation: "Black takes the pawn. Now the center is opening up.",
      },
      {
        san: "Nxd4",
        explanation:
          "We take back with the knight. Look at that knight — right in the middle of the board, controlling lots of squares. And we've traded off Black's e5 pawn, so our e4 pawn is the only one in the center.",
        highlights: ["d4"],
        hint: "Take back the pawn — with the piece that lands in the center.",
      },
      {
        san: "Bc5",
        explanation:
          "Black develops the bishop and attacks our proud knight on d4. We need to deal with that.",
        arrows: [{ from: "c5", to: "d4", kind: "threat" }],
      },
      {
        san: "Be3",
        explanation:
          "We defend the knight and develop a piece at the same time. Two jobs with one move! Now if Black takes on d4, we take back with the bishop and stay strong in the center.",
        arrows: [{ from: "e3", to: "d4", kind: "idea" }],
        hint: "Your knight is attacked. Defend it while developing a bishop.",
      },
      {
        san: "Qf6",
        explanation:
          "Black brings the queen out early to pile up on d4 — now it's attacked twice. Queens usually shouldn't come out this early, but here Black has a reason.",
        arrows: [{ from: "f6", to: "d4", kind: "threat" }],
      },
      {
        san: "c3",
        explanation:
          "A pawn defends the knight — now d4 is protected twice too. c3 also takes away the b4 square from Black's pieces.",
        arrows: [{ from: "c3", to: "d4", kind: "idea" }],
        hint: "Defend d4 one more time — with a pawn this time.",
      },
      {
        san: "Nge7",
        explanation:
          "Black develops the other knight to e7 (not f6, because the queen is in the way!). Black plans to castle soon.",
      },
      {
        san: "Bc4",
        explanation:
          "Our other bishop comes out to a lovely diagonal aimed at f7. We've developed almost everything — next we castle and we're ready to fight in the open center.",
        arrows: [{ from: "c4", to: "f7", kind: "threat" }],
        highlights: ["f7"],
        hint: "Bring out your last minor piece to the diagonal that eyes f7.",
      },
    ],
    quiz: [
      {
        question:
          "What makes the Scotch different from the Italian and Ruy Lopez?",
        options: [
          "White plays d4 on move 3 to open the center right away",
          "White doesn't develop the knight",
          "White castles queenside",
          "White gives up a pawn",
        ],
        answer: 0,
        explanation:
          "The early d4 is the signature of the Scotch — it opens the center immediately.",
        ply: 5,
      },
      {
        question: "After 3…exd4, why take back with the knight (Nxd4)?",
        options: [
          "Because it's the only legal capture",
          "Because the knight lands on a strong central square",
          "To trade queens",
          "To attack the king right away",
        ],
        answer: 1,
        explanation:
          "A knight in the center controls up to 8 squares. Nxd4 puts it in the best spot on the board.",
        ply: 7,
      },
      {
        question:
          "Black attacks your d4 knight with Bc5. What is the best way to defend it?",
        options: [
          "Move the knight back to f3",
          "Play Be3 — defend and develop at the same time",
          "Push the pawn to c5",
          "Take the bishop with the knight",
        ],
        answer: 1,
        explanation:
          "Be3 does two jobs at once: it defends the knight and brings a new piece into the game.",
        ply: 9,
      },
    ],
    funFact:
      "The 1824 London vs. Edinburgh match was played by mail — each move took days to arrive!",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    subtitle: "The classic d‑pawn opening",
    side: "white",
    difficulty: 2,
    emoji: "👑",
    tagline:
      "Offer a pawn to take over the center — the most famous opening on TV.",
    intro: [
      'You may have heard of the Queen\'s Gambit from the TV show! A "gambit" means offering a pawn. On move 2 White pushes c4 and says to Black: "You can take this pawn if you want."',
      "The trick: if Black takes, White easily wins the pawn back and gets a big center. Most of the time Black declines and defends d5 with e6 instead — that's the line we'll learn, called the Queen's Gambit Declined.",
    ],
    keyIdeas: [
      "d4 and c4 together fight for the d5 square.",
      "Develop the knight to c3 and pin Black's knight with Bg5.",
      "Play e3 to open the other bishop, then Nf3 and castle.",
    ],
    moves: [
      {
        san: "d4",
        explanation:
          "Instead of e4, we start with the queen's pawn. It grabs the center and — nice bonus — it's already protected by the queen.",
        highlights: ["d4", "e5", "c5"],
        hint: "Start with your queen's pawn this time.",
      },
      {
        san: "d5",
        explanation:
          "Black takes their share of the center. The two pawns face off.",
      },
      {
        san: "c4",
        explanation:
          "The gambit! We offer a pawn. If Black takes it, they lose their grip on the center and we win the pawn back later. Really, c4 is about attacking d5 and taking over the middle.",
        arrows: [{ from: "c4", to: "d5", kind: "threat" }],
        highlights: ["c4", "d5"],
        hint: "Offer a pawn to attack d5 from the side.",
      },
      {
        san: "e6",
        explanation:
          "Black declines the gambit and defends d5 with a pawn. Solid! This is the Queen's Gambit Declined. Black's only small problem: the c8 bishop is now stuck behind the e6 pawn.",
        arrows: [{ from: "e6", to: "d5", kind: "idea" }],
      },
      {
        san: "Nc3",
        explanation:
          "A knight develops toward the center and adds pressure on d5. Now we attack it twice — pawn and knight.",
        arrows: [{ from: "c3", to: "d5", kind: "threat" }],
        hint: "Develop a knight that also attacks d5.",
      },
      {
        san: "Nf6",
        explanation:
          "Black develops the knight and defends d5 again. The fight for d5 continues.",
      },
      {
        san: "Bg5",
        explanation:
          "A pin! Our bishop attacks the f6 knight, and behind that knight is Black's queen. The knight can't move without losing the queen — so it can't help defend d5 as much.",
        arrows: [
          { from: "g5", to: "f6", kind: "threat" },
          { from: "g5", to: "d8", kind: "note" },
        ],
        highlights: ["f6", "d8"],
        hint: "Bring your dark bishop out and pin the knight to the queen.",
      },
      {
        san: "Be7",
        explanation:
          "Black breaks the pin by putting a bishop between the knight and the queen. Now the knight is free again, and Black is ready to castle.",
      },
      {
        san: "e3",
        explanation:
          "A quiet pawn move that opens the diagonal for our other bishop and gives d4 an extra defender. We're building a strong, solid position.",
        hint: "A small pawn move to free your light‑squared bishop.",
      },
      { san: "O-O", explanation: "Black castles. King safe." },
      {
        san: "Nf3",
        explanation:
          "Our last minor piece develops. Next we'll play Bd3 and castle. This is the main line of the Queen's Gambit Declined — a position that has been played by every world champion.",
        hint: "Develop your last knight toward the center.",
      },
    ],
    quiz: [
      {
        question: 'What does the word "gambit" mean?',
        options: [
          "A trap",
          "Offering a pawn (or piece) for an advantage",
          "A checkmate pattern",
          "A quiet move",
        ],
        answer: 1,
        explanation:
          "A gambit offers material — here the c4 pawn — to get something back, like control of the center.",
        ply: 3,
      },
      {
        question:
          "If Black takes the pawn with 2…dxc4, what happens to their center?",
        options: [
          "Black gets an even stronger center",
          "Black loses their grip on the center and White will win the pawn back",
          "The game is a draw",
          "Black wins the queen",
        ],
        answer: 1,
        explanation:
          "Taking the pawn gives up the d5 pawn's control of the center. White plays e3 or e4 and easily wins the c4 pawn back.",
        ply: 3,
      },
      {
        question: "What is special about the move Bg5 on move 4?",
        options: [
          "It attacks the king",
          "It pins the f6 knight to the queen",
          "It threatens to take on d5",
          "It blocks Black's bishop",
        ],
        answer: 1,
        explanation:
          "The bishop, knight and queen are all on one line. The knight is pinned — it can't move without losing the queen.",
        ply: 7,
      },
    ],
    funFact:
      "The Queen's Gambit is probably the oldest recorded opening — it appears in a manuscript from 1490.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "london-system",
    name: "London System",
    subtitle: "The same setup, every game",
    side: "white",
    difficulty: 1,
    emoji: "🎡",
    tagline:
      "A rock‑solid setup you can play against almost anything Black does.",
    intro: [
      "The London System is less like a memorized line and more like a recipe. White puts the pieces on the same squares almost every game: pawn d4, bishop f4, pawns e3 and c3, knights f3 and d2. Because it's the same every time, it's easy to remember.",
      "The secret is getting the dark bishop OUT to f4 before playing e3 — in the Queen's Gambit that bishop sometimes gets stuck. In the London it's always free.",
    ],
    keyIdeas: [
      "d4 first, then Bf4 — bishop out before the e‑pawn moves.",
      "Build the pyramid: pawns on d4, e3, and c3.",
      "Knights go to f3 and d2. Then castle. Same every game!",
    ],
    moves: [
      {
        san: "d4",
        explanation:
          "The queen's pawn takes the center. In the London this is always move one.",
        highlights: ["d4"],
        hint: "Queen's pawn forward two.",
      },
      {
        san: "d5",
        explanation:
          "Black takes the center too. (The London works against almost any Black reply.)",
      },
      {
        san: "Bf4",
        explanation:
          "The London bishop! We bring the dark bishop outside the pawn chain BEFORE playing e3. This is the move that makes it a London System.",
        highlights: ["f4"],
        arrows: [{ from: "f4", to: "b8", kind: "note" }],
        hint: "Get your dark‑squared bishop out before you play e3. Where does it belong?",
      },
      {
        san: "Nf6",
        explanation: "Black develops a knight. Nothing scary yet.",
      },
      {
        san: "e3",
        explanation:
          "Now the e‑pawn moves one square. It supports d4 and opens the diagonal for the other bishop. Since Bf4 is already out, nothing is trapped.",
        arrows: [{ from: "e3", to: "d4", kind: "idea" }],
        hint: "A small pawn move to support d4 and free your other bishop.",
      },
      { san: "e6", explanation: "Black frees their bishop the same way." },
      {
        san: "Nf3",
        explanation:
          "Knight to f3 — the natural square. It defends d4 and prepares castling.",
        hint: "Develop your king's knight to its favorite square.",
      },
      {
        san: "c5",
        explanation:
          "Black attacks our d4 pawn from the side. This is the most common way to fight the London.",
        arrows: [{ from: "c5", to: "d4", kind: "threat" }],
      },
      {
        san: "c3",
        explanation:
          "We complete the pyramid: pawns on c3, d4 and e3. Now d4 is defended by two pawns and simply cannot be broken. This little triangle is the heart of the London.",
        highlights: ["c3", "d4", "e3"],
        hint: "Finish the pawn pyramid to make d4 rock solid.",
      },
      {
        san: "Nc6",
        explanation:
          "Black develops and adds pressure to d4. We're ready for it.",
      },
      {
        san: "Nbd2",
        explanation:
          "The queen's knight goes to d2, not c3 — because the c3 square is taken by our pawn. From d2 it supports e4 later and can hop to f3 if needed.",
        hint: "Develop the other knight. c3 is taken — where else can it go?",
      },
      {
        san: "Bd6",
        explanation:
          "Black offers to trade off our lovely London bishop. We don't want that trade!",
        arrows: [{ from: "d6", to: "f4", kind: "threat" }],
      },
      {
        san: "Bg3",
        explanation:
          "We step back to g3 and keep the bishop. If Black takes it, we recapture with the h‑pawn and get an open h‑file for our rook. Full London setup complete — next: Bd3 and castle.",
        highlights: ["g3"],
        hint: "Keep your bishop! Slide it back one square along the diagonal.",
      },
    ],
    quiz: [
      {
        question: "What move makes the London System a London System?",
        options: [
          "e4",
          "Bf4 — the bishop comes out before e3",
          "Castling queenside",
          "g3",
        ],
        answer: 1,
        explanation:
          "Bf4 on move 2 (before e3) is the signature. The bishop gets out before the pawn chain closes.",
        ply: 3,
      },
      {
        question: "Why does the queen's knight go to d2 instead of c3?",
        options: [
          "Because c3 is a bad square",
          "Because our own pawn is on c3",
          "Because it wants to attack the king",
          "It's a mistake — c3 is better",
        ],
        answer: 1,
        explanation:
          "We played c3 to make the pawn pyramid, so the knight uses d2 instead.",
        ply: 11,
      },
      {
        question:
          "Black plays Bd6 offering to trade bishops. What does White do?",
        options: [
          "Trade right away with Bxd6",
          "Retreat to g3 and keep the bishop",
          "Ignore it and castle",
          "Retreat all the way to c1",
        ],
        answer: 1,
        explanation:
          "Bg3 keeps the bishop, and if Black takes it we get an open h‑file for the rook.",
        ply: 13,
      },
    ],
    funFact:
      "The London System got its name from a big tournament in London in 1922, where several players used the same setup.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sicilian-dragon",
    name: "Sicilian Defense",
    subtitle: "Accelerated Dragon",
    side: "black",
    difficulty: 3,
    emoji: "🐉",
    tagline:
      "Fight for the win with Black — meet e4 with c5 and unleash the Dragon bishop.",
    intro: [
      'When White plays e4, most beginners copy with e5. The Sicilian says "no thanks" and plays c5 instead. It\'s the favorite of players who want to WIN with Black, not just survive.',
      "We'll learn the Dragon: Black puts a bishop on g7, where it breathes fire along the long diagonal all the way to White's queenside. Your pawn shape (f7‑g6‑h7) looks like the back of a dragon — that's where the name comes from!",
    ],
    keyIdeas: [
      "c5 fights for d4 from the side and keeps things unbalanced.",
      "Trade your c‑pawn for White's d‑pawn — you get an open c‑file to attack on later.",
      "Fianchetto: g6 then Bg7. The Dragon bishop is your best piece. Then castle.",
    ],
    moves: [
      {
        san: "e4",
        explanation:
          "White starts with the king's pawn. Now it's our turn to choose a defense.",
      },
      {
        san: "c5",
        explanation:
          "The Sicilian! Instead of copying with e5, we attack the d4 square from the side. White can't comfortably build an e4+d4 center now.",
        arrows: [{ from: "c5", to: "d4", kind: "threat" }],
        highlights: ["c5", "d4"],
        hint: "Don't copy White. Fight for d4 with your c‑pawn instead.",
      },
      {
        san: "Nf3",
        explanation:
          "White develops the knight and gets ready to push d4 anyway.",
      },
      {
        san: "Nc6",
        explanation:
          "We develop a knight to its best square. It controls d4 and e5. Knights before bishops!",
        arrows: [{ from: "c6", to: "d4", kind: "idea" }],
        hint: "Develop a knight that also watches d4.",
      },
      {
        san: "d4",
        explanation:
          'White pushes d4 anyway and offers a trade of pawns. This is the "Open Sicilian".',
        arrows: [{ from: "d4", to: "c5", kind: "threat" }],
      },
      {
        san: "cxd4",
        explanation:
          "We happily trade! Our side pawn (c) for White's center pawn (d) — a great deal. Now we'll have a half‑open c‑file for our rook and queen later.",
        highlights: ["c8", "c7", "c6", "c5", "c4", "c3", "c2"],
        hint: "Take the center pawn — a side pawn for a center pawn is a good trade.",
      },
      {
        san: "Nxd4",
        explanation:
          "White recaptures with the knight, which sits in the center for now.",
      },
      {
        san: "g6",
        explanation:
          'Here comes the Dragon! We prepare to put our bishop on g7 — a "fianchetto" (fee‑ann‑KET‑toe). Look at the pawn shape f7‑g6‑h7… it looks like a dragon\'s back.',
        highlights: ["g6", "g7"],
        arrows: [{ from: "f8", to: "g7", kind: "idea" }],
        hint: "Prepare a home for your dark bishop on the long diagonal.",
      },
      {
        san: "Nc3",
        explanation: "White develops the other knight and defends e4.",
      },
      {
        san: "Bg7",
        explanation:
          "The Dragon bishop! From g7 it looks all the way down the long diagonal, through d4, to b2 and a1. It attacks the d4 knight right now. This is our best piece — never trade it lightly.",
        arrows: [{ from: "g7", to: "b2", kind: "threat" }],
        highlights: ["g7"],
        hint: "Put your bishop on the long diagonal.",
      },
      {
        san: "Be3",
        explanation: "White defends the d4 knight and develops.",
        arrows: [{ from: "e3", to: "d4", kind: "idea" }],
      },
      {
        san: "Nf6",
        explanation:
          "We develop the other knight and attack e4. Now all our minor pieces except one bishop are out.",
        arrows: [{ from: "f6", to: "e4", kind: "threat" }],
        hint: "Develop your king's knight and attack e4.",
      },
      {
        san: "Bc4",
        explanation: "White develops the bishop to c4, eyeing f7 as usual.",
        arrows: [{ from: "c4", to: "f7", kind: "threat" }],
      },
      {
        san: "O-O",
        explanation:
          "Castle! Our king is now safely behind the dragon pawns and the Dragon bishop. Next ideas: d6, then Bd7 and Rc8 to use that open c‑file. The Dragon is ready to breathe fire.",
        highlights: ["g8"],
        hint: "Get your king to safety behind the dragon pawns.",
      },
    ],
    quiz: [
      {
        question: "Why is 1…c5 different from 1…e5?",
        options: [
          "It copies White",
          "It fights for d4 from the side and keeps the game unbalanced",
          "It attacks the king right away",
          "It is a gambit",
        ],
        answer: 1,
        explanation:
          "c5 controls d4 without mirroring White. Unbalanced positions give Black real winning chances.",
        ply: 2,
      },
      {
        question: 'Why is trading cxd4 a "great deal" for Black?',
        options: [
          "Because it wins a pawn",
          "Because we trade a side pawn for a center pawn and open the c‑file",
          "Because it checks the king",
          "It isn't — it's a mistake",
        ],
        answer: 1,
        explanation:
          "Center pawns are worth more than side pawns, and the half‑open c‑file becomes an attacking road for our rook.",
        ply: 6,
      },
      {
        question: 'What is the "Dragon bishop"?',
        options: [
          "The bishop on c8",
          "The bishop on g7, on the long diagonal",
          "White's bishop on c4",
          "A bishop that has been promoted",
        ],
        answer: 1,
        explanation:
          "The g7 bishop looks all the way down the a1–h8 diagonal — the strongest piece in the Dragon.",
        ply: 10,
      },
    ],
    funFact:
      "The Sicilian is the most popular reply to 1.e4 in the whole world — grandmasters play it in about 1 out of every 4 games!",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "french-defense",
    name: "French Defense",
    subtitle: "Advance Variation",
    side: "black",
    difficulty: 2,
    emoji: "🥐",
    tagline:
      "A solid, sneaky defense — build a pawn chain, then attack its base.",
    intro: [
      "The French Defense starts with e6, then d5. Black lets White have a bit more space at first, but builds a solid pawn chain and then attacks it at the root. It's like a boxer who blocks first, then counter‑punches.",
      'When White pushes e5, the pawn chain d4–e5 has its "base" on d4. Black\'s whole plan is to hit d4 with everything: c5, Nc6, Qb6. Knock out the base and the chain falls.',
    ],
    keyIdeas: [
      "e6 then d5 — challenge e4 with a supported pawn.",
      "When White plays e5, attack the base of the chain (d4) with c5.",
      "Pile up on d4: Nc6, Qb6. Then bring the knight to f5.",
    ],
    moves: [
      { san: "e4", explanation: "White starts with the king's pawn." },
      {
        san: "e6",
        explanation:
          "The French! A modest one‑square move. It looks shy, but it's preparing d5 next move — with a pawn already protecting it.",
        arrows: [{ from: "d7", to: "d5", kind: "idea" }],
        highlights: ["e6"],
        hint: "One small step with the e‑pawn — to prepare d5 next.",
      },
      {
        san: "d4",
        explanation:
          "White grabs the full center with two pawns. Looks great — for now.",
      },
      {
        san: "d5",
        explanation:
          "Now we hit e4 with a protected pawn. White must decide: trade, defend, or push. Each choice is a different French variation.",
        arrows: [{ from: "d5", to: "e4", kind: "threat" }],
        hint: "Now challenge the e4 pawn — you prepared this last move.",
      },
      {
        san: "e5",
        explanation:
          "White pushes forward — the Advance Variation. White gets space, but the pawn chain d4–e5 has a base on d4, and that's our target.",
        arrows: [{ from: "d4", to: "e5", kind: "note" }],
        highlights: ["d4", "e5"],
      },
      {
        san: "c5",
        explanation:
          "Attack the base! c5 hits d4. Always attack a pawn chain at its base, not at its head — knock out d4 and e5 becomes weak.",
        arrows: [{ from: "c5", to: "d4", kind: "threat" }],
        highlights: ["d4"],
        hint: "Attack the pawn chain at its base — the d4 pawn.",
      },
      {
        san: "c3",
        explanation: "White defends d4 with a pawn. The battle for d4 is on.",
        arrows: [{ from: "c3", to: "d4", kind: "idea" }],
      },
      {
        san: "Nc6",
        explanation:
          "A second attacker on d4, and we develop a piece. Keep piling up!",
        arrows: [{ from: "c6", to: "d4", kind: "threat" }],
        hint: "Add another attacker on d4 while developing.",
      },
      {
        san: "Nf3",
        explanation: "White defends d4 again. Two attackers, two defenders.",
      },
      {
        san: "Qb6",
        explanation:
          "A third attacker! The queen hits d4 from b6 and also eyes the b2 pawn. Usually queens shouldn't come out early, but here she has a clear job.",
        arrows: [
          { from: "b6", to: "d4", kind: "threat" },
          { from: "b6", to: "b2", kind: "note" },
        ],
        hint: "Bring your queen to a square where she attacks d4 (and peeks at b2).",
      },
      {
        san: "Be2",
        explanation:
          "White develops and gets ready to castle. Notice White did NOT play Bd3? Because after cxd4 cxd4 Nxd4! the d4 pawn would fall.",
      },
      {
        san: "cxd4",
        explanation:
          "We trade on d4. This opens the c‑file for us and fixes White's pawn on d4 as a permanent target.",
        hint: "Trade pawns on d4 to open the c‑file.",
      },
      {
        san: "cxd4",
        explanation:
          "White recaptures. Now d4 is defended by the knight and queen only.",
      },
      {
        san: "Nge7",
        explanation:
          "Our king's knight heads to f5 via e7 — from f5 it will attack d4 a fourth time! We're developed, solid, and White has to babysit d4 all game.",
        arrows: [{ from: "e7", to: "f5", kind: "idea" }],
        highlights: ["f5"],
        hint: "Bring your other knight toward f5 — it can't go to f6 because of the e5 pawn.",
      },
    ],
    quiz: [
      {
        question: "Where should you attack a pawn chain?",
        options: [
          "At the head (front pawn)",
          "At the base (back pawn)",
          "Never — pawn chains are unbreakable",
          "From behind",
        ],
        answer: 1,
        explanation:
          "The base pawn holds up the whole chain. In the Advance French the base is d4, so we play c5.",
        ply: 6,
      },
      {
        question:
          "Why does Black play e6 before d5 instead of just d5 right away?",
        options: [
          "To trap the bishop",
          "So that d5 is protected by a pawn when it challenges e4",
          "To castle faster",
          "It's a mistake",
        ],
        answer: 1,
        explanation:
          "e6 supports d5, so after exd5 we recapture with the pawn and keep a strong center.",
        ply: 2,
      },
      {
        question:
          "Why does Black's knight go to e7 (and then f5) instead of f6?",
        options: [
          "Because f6 is attacked by White's e5 pawn",
          "Because e7 is closer to the king",
          "Because the knight is pinned",
          "For no reason",
        ],
        answer: 0,
        explanation:
          "White's e5 pawn covers f6, so the knight takes the scenic route: e7 then f5, where it attacks d4.",
        ply: 14,
      },
    ],
    funFact:
      "The French Defense got its name from a match played by mail between Paris and London in 1834 — the French players used it and won!",
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "caro-kann",
    name: "Caro‑Kann Defense",
    subtitle: "Classical Variation",
    side: "black",
    difficulty: 2,
    emoji: "🏰",
    tagline:
      "The fortress: solid, safe, and your bishop gets out before the door closes.",
    intro: [
      "The Caro‑Kann is like the French Defense's cousin. Black plays c6 then d5 to challenge e4. The difference: because we play c6 instead of e6, our light‑squared bishop is free to come out to f5 BEFORE we play e6. In the French that bishop gets stuck.",
      "The Caro‑Kann is famous for being very hard to beat. Its pieces come out to good squares and the pawn structure has no weaknesses.",
    ],
    keyIdeas: [
      "c6 then d5 — challenge e4 with a supported pawn (like the French).",
      "Trade on e4, then get your bishop out to f5 before playing e6.",
      "When White plays h4, answer h6 so your bishop always has a safe square.",
    ],
    moves: [
      { san: "e4", explanation: "White starts with the king's pawn." },
      {
        san: "c6",
        explanation:
          "The Caro‑Kann! Like the French, this prepares d5. But we use the c‑pawn instead of the e‑pawn, so our light bishop stays free.",
        arrows: [{ from: "d7", to: "d5", kind: "idea" }],
        highlights: ["c6"],
        hint: "A quiet c‑pawn move to prepare d5 — keeping your bishop's diagonal open.",
      },
      { san: "d4", explanation: "White grabs the center with both pawns." },
      {
        san: "d5",
        explanation:
          "We challenge e4 with a protected pawn. Now White must trade, push, or defend.",
        arrows: [{ from: "d5", to: "e4", kind: "threat" }],
        hint: "Now challenge e4 with the pawn you prepared.",
      },
      {
        san: "Nc3",
        explanation:
          "White defends e4 with the knight — the Classical Variation.",
        arrows: [{ from: "c3", to: "e4", kind: "idea" }],
      },
      {
        san: "dxe4",
        explanation:
          "We take the pawn. White will recapture with the knight, and then we develop with a threat.",
        hint: "Take on e4 — White's knight will have to come and take back.",
      },
      {
        san: "Nxe4",
        explanation:
          "White recaptures. The knight is now sitting in the middle of the board — but it's a target.",
        highlights: ["e4"],
      },
      {
        san: "Bf5",
        explanation:
          "The Caro‑Kann bishop! It comes out to f5 and attacks the e4 knight. This is the whole point of playing c6 instead of e6 — the bishop is free.",
        arrows: [{ from: "f5", to: "e4", kind: "threat" }],
        highlights: ["f5"],
        hint: "Get your light bishop OUT of the pawn chain and attack the knight.",
      },
      {
        san: "Ng3",
        explanation: "White's knight runs away and attacks our bishop back.",
        arrows: [{ from: "g3", to: "f5", kind: "threat" }],
      },
      {
        san: "Bg6",
        explanation:
          "We step back to g6, still on a good diagonal and still safe. Our bishop is outside the pawn chain, which is exactly what we wanted.",
        highlights: ["g6"],
        hint: "Your bishop is attacked. Step back along the diagonal to a safe square.",
      },
      {
        san: "h4",
        explanation:
          "White pushes the h‑pawn, threatening h5 to trap our bishop! We need to give it an escape route.",
        arrows: [{ from: "h4", to: "h5", kind: "threat" }],
        highlights: ["h5"],
      },
      {
        san: "h6",
        explanation:
          "h6 makes a safe home for the bishop on h7. Now if White plays h5, we just go Bh7 and the bishop is perfectly happy. Always give your bishop an escape square!",
        arrows: [{ from: "g6", to: "h7", kind: "idea" }],
        highlights: ["h7"],
        hint: "White threatens h5. Make an escape square for your bishop.",
      },
      { san: "Nf3", explanation: "White develops the other knight." },
      {
        san: "Nd7",
        explanation:
          "We develop the knight to d7. Why not c6? Because our pawn is on c6! From d7 the knight will go to f6, and we'll play e6 and Bd6 next. Solid as a castle — the Caro‑Kann fortress is built.",
        hint: "Develop your queen's knight — c6 is blocked by your own pawn, so where else?",
      },
    ],
    quiz: [
      {
        question:
          "What is the big difference between the Caro‑Kann (c6) and the French (e6)?",
        options: [
          "The Caro‑Kann is a gambit",
          "In the Caro‑Kann the light bishop can come out to f5 before playing e6",
          "The Caro‑Kann attacks the king right away",
          "There is no difference",
        ],
        answer: 1,
        explanation:
          "c6 keeps the c8–h3 diagonal open, so the bishop escapes to f5. In the French it gets stuck behind e6.",
        ply: 8,
      },
      {
        question: "White plays h4. What is White threatening?",
        options: [
          "Checkmate",
          "h5, trapping the bishop on g6",
          "To castle",
          "Nothing",
        ],
        answer: 1,
        explanation:
          "After h5 the bishop on g6 would have no good square. So we play h6 first to make h7 available.",
        ply: 11,
      },
      {
        question: "Why does Black's knight go to d7 and not c6?",
        options: [
          "Because our own pawn is on c6",
          "Because d7 attacks the queen",
          "Because c6 is attacked",
          "To block the bishop",
        ],
        answer: 0,
        explanation:
          "The c6 pawn is in the way, so the knight develops via d7 and heads to f6.",
        ply: 14,
      },
    ],
    funFact:
      "The Caro‑Kann is named after two players, Horatio Caro and Marcus Kann, who studied it in the 1880s.",
  },
];

export function getOpening(id: string): Opening | undefined {
  return OPENINGS.find((o) => o.id === id);
}
