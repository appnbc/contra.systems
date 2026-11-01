// =====================================================================
// All site copy, in English, Spanish and Italian.
// Edit text here, then run:  node build/build.mjs
// Rule: never use the ampersand character in any language.
// =====================================================================

export const L = (en, es, it) => ({ en, es, it });

export const EMAIL = 'brieducon@gmail.com';

// Public address of the site (ends with a slash). Used for canonical,
// language-alternate and sitemap links. Change it if a custom domain is added.
export const SITE_URL = 'https://appnbc.github.io/contra.systems/';

// ---------------------------------------------------------------------
// Interface strings shared by every page
// ---------------------------------------------------------------------
export const ui = {
  skip: L('Skip to main content', 'Saltar al contenido principal', 'Vai al contenuto principale'),
  langGroup: L('Language', 'Idioma', 'Lingua'),
  themeGroup: L('Theme', 'Tema', 'Tema'),
  day: L('Day', 'Día', 'Giorno'),
  night: L('Night', 'Noche', 'Notte'),
  sectionsNav: L('Sections', 'Secciones', 'Sezioni'),
  weaveHint: L('Interact to explore', 'Interactúa para explorar', 'Interagisci per esplorare'),
  weaveLabel: L(
    'Activate the interactive visual. Press Enter or Space to send a wave of light and a multilingual greeting through the woven grid.',
    'Activar la obra visual interactiva. Pulsa Intro o Espacio para enviar una onda de luz y un saludo multilingüe a través de la retícula tejida.',
    "Attiva l'opera visiva interattiva. Premi Invio o Spazio per inviare un'onda di luce e un saluto multilingue attraverso la griglia intrecciata."),
  shortcut: L('Keyboard shortcut:', 'Atajo de teclado:', 'Scorciatoia da tastiera:'),
  terms: L('Terms in three languages', 'Términos en tres idiomas', 'Termini in tre lingue'),
  practices: L('Three intersecting practices', 'Tres prácticas que se cruzan', 'Tre pratiche che si intersecano'),
  nav: [
    { href: '#statement', section: '01', label: L('01 Statement', '01 Declaración', '01 Dichiarazione') },
    { href: '#works', section: '02', label: L('02–07 Works', '02–07 Obras', '02–07 Opere') },
    { href: '#systems', section: '08', label: L('08–09 Language and Play', '08–09 Lenguaje y Juego', '08–09 Linguaggio e Gioco') },
    { href: '#publications', section: '10', label: L('10 Written Work', '10 Obra Escrita', '10 Opere Scritte') },
  ],
  back: L('← Return to Curated Overview', '← Volver al Resumen Curatorial', '← Torna alla Panoramica Curata'),
  indexWord: L('Index', 'Índice', 'Indice'),
  gallery: L('Documentation Gallery', 'Galería de Documentación', 'Galleria di Documentazione'),
  backAll: L('← Back to all work', '← Volver a todas las obras', '← Torna a tutte le opere'),
  touch: L('Get in touch', 'Contacto', 'Contatti'),
  copy: L('Copy Email', 'Copiar Correo', 'Copia Email'),
  copied: L('Copied', 'Copiado', 'Copiato'),
  openFig: L('View full size: Fig', 'Ver a tamaño completo: Fig', 'Apri a dimensione intera: Fig'),
  viewer: L('Image viewer', 'Visor de imágenes', 'Visualizzatore di immagini'),
  prev: L('Previous', 'Anterior', 'Precedente'),
  next: L('Next', 'Siguiente', 'Successivo'),
  close: L('Close', 'Cerrar', 'Chiudi'),
};

// The six hero greetings are deliberately shown in all three languages at
// once, whatever language the page is in. They live in assets/site.js
// (GREETINGS) so their punctuation can be styled separately.

export const specLabels = {
  role: L('Role', 'Rol', 'Ruolo'),
  format: L('Format', 'Formato', 'Formato'),
  context: L('Context', 'Contexto', 'Contesto'),
  methods: L('Methods', 'Métodos', 'Metodi'),
  tools: L('Hardware and Tools', 'Hardware y Herramientas', 'Hardware e Strumenti'),
  recognition: L('Recognition', 'Reconocimiento', 'Riconoscimento'),
};

const about = L('About the Work', 'Sobre la Obra', "Informazioni sull'Opera");

// The Agent: one concise descriptor (set in the serif voice) and its description
const AGENT_VOICE = L(
  'Acoustic performance and scenographic intervention exploring voice, expression, and automated language.',
  'Performance acústica e intervención escenográfica que explora la voz, la expresión y el lenguaje automatizado.',
  "Performance acustica e intervento scenografico che esplora la voce, l'espressione e il linguaggio automatizzato.");
const AGENT_BODY = L(
  '<em>The Agent</em> is a site-specific performance combining spoken word, reactive theatrical lighting, and spatial scenography to explore the tension between automated speech systems and the human voice. Treating the voice as both expressive and acoustic material, the work stages poetry, light, and algorithmic processing within one immersive environment, examining how computational rules frame vocal expression, identity, and bodily presence inside a shared performance space.',
  '<em>The Agent</em> es una performance específica para el espacio que combina palabra hablada, iluminación teatral reactiva y escenografía espacial para explorar la tensión entre los sistemas automatizados de habla y la voz humana. Al tratar la voz como materia expresiva y acústica a la vez, la obra pone en escena la poesía, la luz y el procesamiento algorítmico dentro de un mismo entorno inmersivo, y examina cómo las reglas computacionales enmarcan la expresión vocal, la identidad y la presencia corporal dentro de un espacio escénico compartido.',
  "<em>The Agent</em> è una performance site-specific che unisce parola parlata, illuminazione teatrale reattiva e scenografia spaziale per esplorare la tensione tra i sistemi vocali automatizzati e la voce umana. Trattando la voce come materia espressiva e acustica insieme, l'opera mette in scena poesia, luce ed elaborazione algoritmica in un unico ambiente immersivo, ed esamina come le regole computazionali inquadrino l'espressione vocale, l'identità e la presenza corporea all'interno di uno spazio performativo condiviso.");

// ---------------------------------------------------------------------
// Shared spec values
// ---------------------------------------------------------------------
const ARS = L('Ars Electronica Festival, Linz, Austria, 2023', 'Festival Ars Electronica, Linz, Austria, 2023', 'Ars Electronica Festival, Linz, Austria, 2023');

const S = {
  otg: [
    ['role', L('Concept lead and installation architect', 'Dirección conceptual y arquitectura de instalación', "Direzione concettuale e architettura dell'installazione")],
    ['format', L('Robotic installation and spatial visualization', 'Instalación robótica y visualización espacial', 'Installazione robotica e visualizzazione spaziale')],
    ['context', ARS],
  ],
  agent: [
    ['role', L('Spoken word artist, stylist, and scenographer', 'Artista de palabra hablada, estilista y escenógrafo', 'Artista spoken word, stylist e scenografo')],
    ['format', L('Acoustic performance and scenography', 'Performance acústica y escenografía', 'Performance acustica e scenografia')],
    ['context', ARS],
  ],
  kynd: [
    ['format', L('Augmented-reality prototype and spatial audio interaction', 'Prototipo de realidad aumentada e interacción de audio espacial', 'Prototipo in realtà aumentata e interazione tramite audio spaziale')],
    ['context', L('MIT Reality Hack, Cambridge, MA, 2026; Honorable Mention, Community Hack', 'MIT Reality Hack, Cambridge, MA, 2026; Mención Honorífica, Community Hack', "MIT Reality Hack, Cambridge, MA, 2026; Menzione d'Onore, Community Hack")],
  ],
  recreate: [
    ['format', L('Participatory installation and interactive environmental modeling', 'Instalación participativa y modelado ambiental interactivo', 'Installazione partecipativa e modellazione ambientale interattiva')],
    ['context', L('Art and Science Symposium, Aalborg University, Denmark, 2023', 'Simposio de Arte y Ciencia, Universidad de Aalborg, Dinamarca, 2023', 'Art and Science Symposium, Università di Aalborg, Danimarca, 2023')],
  ],
  tgrass: [
    ['format', L('Experimental installation and spatial media', 'Instalación experimental y medios espaciales', 'Installazione sperimentale e media spaziali')],
    ['context', L('Tropical Lab, Singapore, 2023', 'Tropical Lab, Singapur, 2023', 'Tropical Lab, Singapore, 2023')],
  ],
  alicc: [
    ['format', L('Video installation and projection mapping', 'Videoinstalación y mapeo de proyección', 'Videoinstallazione e projection mapping')],
    ['context', L('TTTLabs, Crete, Greece, 2024', 'TTTLabs, Creta, Grecia, 2024', 'TTTLabs, Creta, Grecia, 2024')],
  ],
};

// ---------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------
export const home = {
  title: L('Brian Contreras — Tactile Curation', 'Brian Contreras — Curaduría Táctil', 'Brian Contreras — Curatela Tattile'),
  description: L(
    'Portfolio of Brian Contreras, artist and researcher working across media art, spatial computing, language, and participatory experiences.',
    'Portafolio de Brian Contreras, artista e investigador que trabaja entre el arte de los medios, la computación espacial, el lenguaje y las experiencias participativas.',
    'Portfolio di Brian Contreras, artista e ricercatore attivo tra media art, spatial computing, linguaggio ed esperienze partecipative.'),
  headline: L(
    'Tactile Curation: Engineering Play, Materiality, and Social Connection in Spatial Computing',
    'Curaduría Táctil: Diseño de Juego, Materialidad y Conexión Social en la Computación Espacial',
    'Curatela Tattile: Progettare il Gioco, la Materialità e la Connessione Sociale nello Spatial Computing'),
  descriptor: L(
    'Artist and researcher working across media art, spatial computing, language, and participatory experiences.',
    'Artista e investigador que trabaja entre el arte de los medios, la computación espacial, el lenguaje y las experiencias participativas.',
    'Artista e ricercatore attivo tra media art, spatial computing, linguaggio ed esperienze partecipative.'),
  descriptorSupport: L(
    'My practice moves between interactive installations, language technologies, and artistic research, treating computation and communication as materials for creating shared experiences.',
    'Mi práctica transita entre las instalaciones interactivas, las tecnologías del lenguaje y la investigación artística, abordando la computación y la comunicación como materiales para crear experiencias compartidas.',
    'La mia pratica attraversa installazioni interattive, tecnologie del linguaggio e ricerca artistica, considerando la computazione e la comunicazione come materiali per creare esperienze condivise.'),
  statement: {
    label: L('Artist Statement', 'Declaración Artística', 'Dichiarazione Artistica'),
    body: [
      L(
        "Interactive environments and digital architectures shape how people move, behave, and connect when they share physical space. My practice brings the hidden rules of computation into the room through spatial audio, computer vision, and tactile materials. Growing up around my parents' craft as jewelers taught me that technical precision matters most when it serves the human body, a material sensibility I bring to spatial computing and interactive installation design. My work also moves between linguistics, literature, and language technologies. Grounded in my experience across conversational AI, UX strategy, and game studies, I examine how designed systems govern participation, and how voice, writing, translation, and linguistic variation shape the ways people construct meaning and connect across cultural contexts. Language, for me, is both cultural material and interface.",
        'Los entornos interactivos y las arquitecturas digitales moldean cómo las personas se mueven, se comportan y se conectan cuando comparten un espacio físico. Mi práctica traslada las reglas invisibles de la computación al espacio físico mediante audio espacial, visión artificial y materiales táctiles. Crecer rodeado del oficio de mis padres como joyeros me enseñó que la precisión técnica cobra mayor sentido cuando sirve al cuerpo humano, una sensibilidad material que aplico a la computación espacial y al diseño de instalaciones interactivas. Mi trabajo también se sitúa entre la lingüística, la literatura y las tecnologías del lenguaje. A partir de mi experiencia en inteligencia artificial conversacional, estrategia de experiencia de usuario y estudios de juegos, analizo cómo los sistemas diseñados regulan la participación, y cómo la voz, la escritura, la traducción y la variación lingüística influyen en la manera en que las personas construyen significado y se relacionan entre distintos contextos culturales. Para mí, el lenguaje es a la vez materia cultural e interfaz.',
        "Gli ambienti interattivi e le architetture digitali modellano il modo in cui le persone si muovono, si comportano e si connettono quando condividono lo spazio fisico. La mia pratica porta le regole invisibili della computazione dentro la stanza attraverso l'audio spaziale, la visione artificiale e i materiali tattili. Crescere accanto al mestiere dei miei genitori come gioiellieri mi ha insegnato che la precisione tecnica conta soprattutto quando serve il corpo umano, una sensibilità materiale che porto nello spatial computing e nella progettazione di installazioni interattive. Il mio lavoro attraversa anche la linguistica, la letteratura e le tecnologie del linguaggio. Forte della mia esperienza nell'intelligenza artificiale conversazionale, nella strategia UX e nei game studies, esamino come i sistemi progettati regolino la partecipazione, e come voce, scrittura, traduzione e variazione linguistica influenzino la costruzione del significato e le relazioni tra contesti culturali diversi. Per me, il linguaggio è al tempo stesso materia culturale e interfaccia."),
      L(
        "My perspective as a gay Guatemalan also informs my attention to cultural memory and representation, particularly across Central American and wider Latin American contexts. Across my work, from robotics and wearable spatial audio to my current residency at Accademia Unidee (Cittadellarte, Fondazione Pistoletto) in Biella, Italy, where I weave raw sheep's wool with programmable LED matrices, I build multisensory spaces that act as spatial games. As visitors walk through these installations, the architecture reacts to their proximity and movement, inviting strangers to touch, collaborate, and negotiate shared space together.",
        'Mi perspectiva como guatemalteco gay también orienta mi atención a la memoria cultural y la representación, especialmente en contextos centroamericanos y latinoamericanos más amplios. En toda mi obra, desde la robótica y el audio espacial portátil hasta mi residencia actual en Accademia Unidee (Cittadellarte, Fondazione Pistoletto) en Biella, Italia, donde tejo lana virgen de oveja con matrices LED programables, construyo espacios multisensoriales que funcionan como juegos espaciales. A medida que los visitantes recorren estas instalaciones, la arquitectura reacciona a su proximidad y movimiento, invitando a desconocidos a tocar, colaborar y negociar juntos el espacio compartido.',
        "La mia prospettiva di guatemalteco gay orienta anche la mia attenzione verso la memoria culturale e la rappresentazione, in particolare nei contesti centroamericani e latinoamericani più ampi. Attraverso il mio lavoro, dalla robotica e dall'audio spaziale indossabile fino alla mia attuale residenza presso Accademia Unidee (Cittadellarte, Fondazione Pistoletto) a Biella, in Italia, dove intreccio lana grezza di pecora con matrici LED programmabili, costruisco spazi multisensoriali che agiscono come giochi spaziali. Mentre i visitatori attraversano queste installazioni, l'architettura reagisce alla loro prossimità e al loro movimento, invitando gli sconosciuti a toccare, collaborare e negoziare insieme lo spazio condiviso."),
    ],
    // three complementary dimensions: conceptual groupings, not categories
    practices: [
      {
        title: L('Material and spatial', 'Material y espacial', 'Materiale e spaziale'),
        text: L(
          'Interactive installations, spatial computing, participatory experiences, and experimental media art.',
          'Instalaciones interactivas, computación espacial, experiencias participativas y arte de los medios experimental.',
          'Installazioni interattive, spatial computing, esperienze partecipative e media art sperimentale.'),
      },
      {
        title: L('Language and narrative', 'Lenguaje y narrativa', 'Linguaggio e narrazione'),
        text: L(
          'Linguistics, literature, spoken word, localization, conversation, translation, and storytelling.',
          'Lingüística, literatura, palabra hablada, localización, conversación, traducción y narración.',
          'Linguistica, letteratura, spoken word, localizzazione, conversazione, traduzione e narrazione.'),
      },
      {
        title: L('Computational and interactive', 'Computacional e interactiva', 'Computazionale e interattiva'),
        text: L(
          'Human-computer interaction, AI, language technologies, game mechanics, and digital systems.',
          'Interacción persona-computadora, inteligencia artificial, tecnologías del lenguaje, mecánicas de juego y sistemas digitales.',
          'Interazione uomo-macchina, intelligenza artificiale, tecnologie del linguaggio, meccaniche di gioco e sistemi digitali.'),
      },
    ],
    headshotAlt: L('Portrait of Brian Contreras', 'Retrato de Brian Contreras', 'Ritratto di Brian Contreras'),
  },
  works: [
    {
      slug: 'off-the-gaze', index: '02', preview: 'otg-installation.jpg',
      title: L('<em>OF(F) THE GAZE</em>: Machine Perception as Spatial Encounter', '<em>OF(F) THE GAZE</em>: La Percepción de la Máquina como Encuentro Espacial', '<em>OF(F) THE GAZE</em>: La Percezione della Macchina come Incontro Spaziale'),
      body: L(
        "<em>OF(F) THE GAZE</em> stages machine vision as a shared physical encounter. A Boston Dynamics Spot robot navigates an overhead canopy of tensioned reflective tiles, folding the shifting reflections of visitors directly into the robot's camera feeds. By placing human bodies and autonomous robotics inside the same mirrored environment, the installation prompts strangers to coordinate their movements, observe one another in the overhead grid, and collectively test the boundaries of how an automated system tracks group presence.",
        '<em>OF(F) THE GAZE</em> presenta la visión artificial como un encuentro físico compartido. Un robot Spot de Boston Dynamics recorre una estructura superior de paneles reflectantes tensados, integrando los reflejos cambiantes de los visitantes directamente en las cámaras del robot. Al situar cuerpos humanos y robótica autónoma dentro del mismo entorno espejado, la instalación impulsa a desconocidos a coordinar sus movimientos, observarse mutuamente en la retícula superior y poner a prueba de forma colectiva cómo un sistema automatizado rastrea la presencia grupal.',
        "<em>OF(F) THE GAZE</em> mette in scena la visione artificiale come un incontro fisico condiviso. Un robot Spot di Boston Dynamics si muove sotto una copertura sospesa di pannelli riflettenti tesi, integrando i riflessi mutevoli dei visitatori direttamente nei flussi video del robot. Collocando corpi umani e robotica autonoma all'interno dello stesso ambiente specchiante, l'installazione invita gli sconosciuti a coordinare i propri movimenti, osservarsi a vicenda nella griglia superiore e verificare collettivamente come un sistema automatizzato traccia la presenza di gruppo."),
      specs: S.otg,
      cta: L('View System Diagrams and Exhibition Documentation →', 'Ver Diagramas del Sistema y Documentación de la Exposición →', 'Visualizza gli Schemi di Sistema e la Documentazione della Mostra →'),
    },
    {
      slug: 'the-agent', index: '03', preview: 'agent-performance.png',
      title: L('<em>The Agent</em>: Acoustic Automation and Biological Voice', '<em>The Agent</em>: Automatización Acústica y Voz Biológica', '<em>The Agent</em>: Automazione Acustica e Voce Biologica'),
      voice: AGENT_VOICE,
      body: AGENT_BODY,
      specs: S.agent,
      cta: L('View Performance Video and Scenography →', 'Ver Video de la Performance y Escenografía →', 'Guarda il Video della Performance e la Scenografia →'),
    },
    {
      slug: 'kynd', index: '04', preview: 'kynd-journey-map.png',
      title: L('<em>Kynd</em>: Familiarity, Orientation, and Spatial Audio', '<em>Kynd</em>: Familiaridad, Orientación y Audio Espacial', '<em>Kynd</em>: Familiarità, Orientamento e Audio Spaziale'),
      body: L(
        "<em>Kynd</em> explores how augmented reality and directional spatial audio can support spatial orientation for people navigating memory loss. Built on smart glasses, the prototype pairs computer vision with localized audio whispers that deliver familiar voices and context cues within the user's immediate surroundings. Treating acoustic timing and spatial placement as primary design materials allows the system to guide physical movement and preserve human agency in everyday environments.",
        '<em>Kynd</em> explora cómo la realidad aumentada y el audio espacial direccional pueden apoyar la orientación espacial de personas con pérdida de memoria. Desarrollado sobre gafas inteligentes, el prototipo combina visión artificial con susurros de audio localizados que transmiten voces familiares y señales contextuales en el entorno inmediato del usuario. Tratar el tiempo acústico y la ubicación espacial como materiales primordiales de diseño permite guiar el movimiento físico y preservar la autonomía humana en entornos cotidianos.',
        "<em>Kynd</em> esplora come la realtà aumentata e l'audio spaziale direzionale possano supportare l'orientamento spaziale per le persone che affrontano la perdita di memoria. Sviluppato su smart glasses, il prototipo abbina la visione artificiale a sussurri audio localizzati che trasmettono voci familiari e indicazioni contestuali nell'ambiente immediato dell'utente. Trattare il tempo acustico e la disposizione spaziale come materiali progettuali primari consente al sistema di guidare il movimento fisico e preservare l'autonomia umana negli ambienti quotidiani."),
      specs: S.kynd,
      cta: L('Explore Interaction Architecture and Prototype →', 'Explorar Arquitectura de Interacción y Prototipo →', "Esplora l'Architettura di Interazione e il Prototipo →"),
    },
    {
      slug: 're-create', index: '05', preview: 'recreate-complete.jpg',
      title: L('<em>Re-CREATE</em>: Participatory Environmental Modeling', '<em>Re-CREATE</em>: Modelado Ambiental Participativo', '<em>Re-CREATE</em>: Modellazione Ambientale Partecipativa'),
      body: L(
        '<em>Re-CREATE</em> turns the gallery into a collaborative studio where visitors arrange physical objects inside a light-controlled miniature box to design shared environments. Participants pair their physical arrangements with an AI-generated background and custom programmable LED lighting before photographing their room to join a collective digital house. Combining hands-on miniature making with responsive lighting turns environmental design into a playful, social activity across gallery visitors.',
        '<em>Re-CREATE</em> transforma la galería en un estudio colaborativo donde los visitantes disponen objetos físicos dentro de una caja en miniatura con iluminación controlada para diseñar entornos compartidos. Los participantes combinan sus composiciones físicas con un fondo generado por inteligencia artificial e iluminación LED programable antes de fotografiar su habitación para integrarla en una casa digital colectiva. Unir la creación manual de miniaturas con la iluminación reactiva convierte el diseño ambiental en una actividad lúdica y social entre los visitantes.',
        "<em>Re-CREATE</em> trasforma la galleria in uno studio collaborativo in cui i visitatori dispongono oggetti fisici all'interno di una scatola in miniatura a luce controllata per progettare ambienti condivisi. I partecipanti abbinano le proprie composizioni fisiche a uno sfondo generato dall'intelligenza artificiale e a un'illuminazione LED programmabile prima di fotografare la propria stanza per unirla a una casa digitale collettiva. Unire la creazione manuale di miniature all'illuminazione reattiva trasforma il design ambientale in un'attività ludica e sociale tra i visitatori della galleria."),
      specs: S.recreate,
      cta: L('View Participatory Setup and Artifacts →', 'Ver Montaje Participativo y Artefactos →', "Visualizza l'Allestimento Partecipativo e i Manufatti →"),
    },
    {
      slug: 'touch-grass', index: '06', preview: 'tgrass-outside.jpg',
      title: L('<em>Touch Grass</em>: A Nostalgic Picnic and the Reclamation of Space', '<em>Touch Grass</em>: Un Picnic Nostálgico y la Recuperación del Espacio', '<em>Touch Grass</em>: Un Picnic Nostalgico e la Riconquista dello Spazio'),
      body: L(
        '<em>Touch Grass</em> stages an indoor picnic inside the gallery using synthetic turf, gingham textiles, woven baskets, and interactive digital tags. Bringing outdoor leisure materials into an exhibition setting invites visitors to step onto a shared tactile surface, sit together, and explore how sensory textures and digital prompts spark conversation, nostalgia, and connection among strangers.',
        '<em>Touch Grass</em> escenifica un picnic interior dentro de la galería utilizando césped sintético, telas de cuadros vichy, cestas tejidas y etiquetas digitales interactivas. Trasladar materiales de ocio al aire libre a un espacio expositivo invita a los visitantes a pisar una superficie táctil compartida, sentarse juntos y explorar cómo las texturas sensoriales y los estímulos digitales despiertan la conversación, la nostalgia y la conexión entre desconocidos.',
        "<em>Touch Grass</em> allestisce un picnic al chiuso all'interno della galleria utilizzando erba sintetica, tessuti a quadretti vichy, cesti intrecciati e tag digitali interattivi. Portare materiali legati al tempo libero all'aperto dentro uno spazio espositivo invita i visitatori a salire su una superficie tattile condivisa, sedersi insieme ed esplorare come le trame sensoriali e gli stimoli digitali accendano la conversazione, la nostalgia e la connessione tra sconosciuti."),
      specs: S.tgrass,
      cta: L('View Installation Documentation →', 'Ver Documentación de la Instalación →', "Visualizza la Documentazione dell'Installazione →"),
    },
    {
      slug: 'amerihcc-licc', index: '07', preview: 'alicc-pink.jpg',
      title: L('<em>Amerihcc Licc</em>: Bio-Ethics and Chimerical Metaphors', '<em>Amerihcc Licc</em>: Bioética y Metáforas Quiméricas', '<em>Amerihcc Licc</em>: Bioetica e Metafore Chimeriche'),
      body: L(
        '<em>Amerihcc Licc</em> examines genetic identity and cultural heritage through projection mapping and generative visual patterns. This single-channel video installation blends organic biomaterial imagery with woven textile structures, creating a luminous visual surface that explores biological hybridity and material memory.',
        '<em>Amerihcc Licc</em> examina la identidad genética y la herencia cultural mediante mapeo de proyección y patrones visuales generativos. Esta videoinstalación monocanal fusiona imágenes de biomateriales orgánicos con estructuras textiles tejidas, creando una superficie visual luminosa que explora la hibridez biológica y la memoria material.',
        "<em>Amerihcc Licc</em> esamina l'identità genetica e il patrimonio culturale attraverso il projection mapping e pattern visivi generativi. Questa videoinstallazione a canale singolo fonde immagini di biomateriali organici con strutture tessili intrecciate, creando una superficie visiva luminosa che esplora l'ibridazione biologica e la memoria materiale."),
      specs: S.alicc,
      cta: L('Watch Video Excerpt and View Stills →', 'Ver Extracto de Video y Fotogramas →', "Guarda l'Estratto Video e i Fotogrammi →"),
    },
  ],
  systems: {
    label: L('Language and Platforms: Scaling Linguistic and Educational Infrastructure', 'Lenguaje y Plataformas: Escalando Infraestructuras Lingüísticas y Educativas', 'Linguaggio e Piattaforme: Scalare le Infrastrutture Linguistiche ed Educative'),
    body: L(
      "Language has run through my professional work as both a linguistic system and a social practice. At Amazon Alexa, I built localization workflows for the platform's inaugural Spanish and Italian launches, mapping regional colloquialisms to standardized intent categories for natural language understanding. At Versay Solutions, I directed bilingual design for conversational voice interfaces. At Vista Higher Learning, I served as a Developmental Editor for European Languages, guiding the transformation of print language textbooks into interactive virtual learning platforms. My work with NRI focused on interactivity and government-to-public communication, while my work at Red Trig examined AI platform governance. Together, these roles revealed how linguistic taxonomies, interfaces, and communication systems shape who can learn, speak, and participate across digital environments.",
      'El lenguaje ha atravesado mi trabajo profesional como sistema lingüístico y como práctica social. En Amazon Alexa, desarrollé flujos de localización para los lanzamientos inaugurales de la plataforma en español e italiano, vinculando expresiones coloquiales regionales con categorías de intención estandarizadas para la comprensión del lenguaje natural. En Versay Solutions, dirigí el diseño bilingüe de interfaces conversacionales de voz. En Vista Higher Learning, trabajé como editor de desarrollo para lenguas europeas y guié la transformación de libros de texto impresos en plataformas virtuales de aprendizaje interactivo. Mi trabajo con NRI se centró en la interactividad y la comunicación del gobierno con el público, mientras que en Red Trig investigué la gobernanza de plataformas de inteligencia artificial. En conjunto, estas experiencias mostraron cómo las taxonomías lingüísticas, las interfaces y los sistemas de comunicación determinan quién puede aprender, hablar y participar en los entornos digitales.',
      "Il linguaggio ha attraversato il mio lavoro professionale come sistema linguistico e come pratica sociale. In Amazon Alexa ho sviluppato flussi di localizzazione per i lanci iniziali della piattaforma in spagnolo e italiano, collegando espressioni colloquiali regionali a categorie di intento standardizzate per la comprensione del linguaggio naturale. Presso Versay Solutions ho diretto la progettazione bilingue di interfacce vocali conversazionali. Presso Vista Higher Learning ho lavorato come Developmental Editor per le lingue europee, seguendo la trasformazione dei libri di testo cartacei in piattaforme virtuali di apprendimento interattivo. Il mio lavoro con NRI si è concentrato sull'interattività e sulla comunicazione del governo rivolta al pubblico, mentre presso Red Trig mi sono occupato della governance delle piattaforme di intelligenza artificiale. Nel complesso, queste esperienze hanno mostrato come le tassonomie linguistiche, le interfacce e i sistemi di comunicazione determinino chi può apprendere, parlare e partecipare negli ambienti digitali."),
    // linguistic marginalia: a small typographic study, not a project claim
    terms: [
      ['VOICE', 'VOZ', 'VOCE'],
      ['TEXT', 'TEXTO', 'TESTO'],
      ['NARRATIVE', 'NARRATIVA', 'NARRAZIONE'],
      ['TRANSLATION', 'TRADUCCIÓN', 'TRADUZIONE'],
    ],
    figs: [
      { src: 'misc-amazon-alexa.png', cap: L('Natural language data and localization workflows for Amazon Alexa.', 'Datos de lenguaje natural y flujos de localización para Amazon Alexa.', 'Dati sul linguaggio naturale e flussi di localizzazione per Amazon Alexa.') },
      { src: 'misc-language-textbooks.png', cap: L('Published language textbooks and interactive digital curricula developed at Vista Higher Learning.', 'Libros de texto publicados y currículos digitales interactivos desarrollados en Vista Higher Learning.', 'Libri di testo pubblicati e programmi digitali interattivi sviluppati presso Vista Higher Learning.') },
      { src: 'misc-nri-app.png', cap: L('Interactivity and government-to-public communication work for NRI.', 'Trabajo de interactividad y comunicación del gobierno con el público para NRI.', 'Progetti di interattività e comunicazione del governo rivolta al pubblico per NRI.') },
    ],
  },
  ludology: {
    label: L('Platforms and Play: Ludology, Narrative, and Spatial Interaction', 'Plataformas y Juego: Ludología, Narrativa e Interacción Espacial', 'Piattaforme e Gioco: Ludologia, Narrazione e Interazione Spaziale'),
    body: L(
      "My Erasmus Mundus Joint Master's thesis, <em>Pokémon Phenomenon: Game Mechanics and its Effect on Narratives</em>, is interdisciplinary research connecting game mechanics with narrative structures. It analyzed how interactive rules steer storytelling and social exchange as the Pokémon universe moves across media and popular culture. By examining how location-locked assets and structural rules guide player behavior and community collaboration, this research establishes the theoretical foundation for my current practice: treating room-scale installations as spatial games where aesthetics, sensors, and physical boundaries invite people to play and connect.",
      'Mi tesis de Maestría Conjunta Erasmus Mundus, <em>Pokémon Phenomenon: Game Mechanics and its Effect on Narratives</em>, es una investigación interdisciplinaria que conecta las mecánicas de juego con las estructuras narrativas. Analizó cómo las reglas interactivas dirigen la narrativa y el intercambio social a medida que el universo Pokémon se desplaza entre distintos medios y la cultura popular. Al examinar cómo los elementos vinculados a ubicaciones y las reglas estructurales guían el comportamiento de los jugadores y la colaboración comunitaria, esta investigación establece la base teórica de mi práctica actual: concebir las instalaciones a escala de sala como juegos espaciales donde la estética, los sensores y los límites físicos invitan al público a jugar y conectarse.',
      "La mia tesi di Laurea Magistrale Congiunta Erasmus Mundus, <em>Pokémon Phenomenon: Game Mechanics and its Effect on Narratives</em>, è una ricerca interdisciplinare che collega le meccaniche di gioco alle strutture narrative. Ha analizzato come le regole interattive guidino la narrazione e lo scambio sociale mentre l'universo Pokémon attraversa media diversi e la cultura popolare. Esaminando come le risorse legate alla posizione geografica e le regole strutturali orientino il comportamento dei giocatori e la collaborazione della comunità, questa ricerca stabilisce la base teorica per la mia pratica attuale: trattare le installazioni su scala ambientale come giochi spaziali in cui estetica, sensori e confini fisici invitano le persone a giocare e connettersi."),
  },
  publications: {
    label: L('Written Work and Academic Publications', 'Obra Escrita y Publicaciones Académicas', 'Opere Scritte e Pubblicazioni Accademiche'),
    intro: L(
      'My writing moves between media art history, cultural history, and theory, approaching computational aesthetics and digital culture as subjects of interpretation and critique as well as of design. The following selected works anchor my research practice:',
      'Mi escritura transita entre la historia del arte de los medios, la historia cultural y la teoría, y aborda la estética computacional y la cultura digital como objetos de interpretación y de crítica, además de diseño. Los siguientes trabajos seleccionados sustentan mi práctica investigadora:',
      "La mia scrittura si muove tra la storia della media art, la storia culturale e la teoria, affrontando l'estetica computazionale e la cultura digitale come oggetti di interpretazione e di critica, oltre che di progettazione. I seguenti lavori selezionati sostengono la mia pratica di ricerca:"),
    // PDF links intentionally omitted for now. Add `href` to an item to link it.
    items: [
      {
        kind: L("Master's Thesis (2024)", 'Tesis de Maestría (2024)', 'Tesi di Laurea Magistrale (2024)'),
        text: L(
          '<em>Pokémon Phenomenon: Game Mechanics and its Effect on Narratives and Entertainment Ludology Across Media Universes</em> (University of Łódź / Danube University Krems / Aalborg University).',
          '<em>Pokémon Phenomenon: Game Mechanics and its Effect on Narratives and Entertainment Ludology Across Media Universes</em> (Universidad de Łódź / Universidad del Danubio Krems / Universidad de Aalborg).',
          '<em>Pokémon Phenomenon: Game Mechanics and its Effect on Narratives and Entertainment Ludology Across Media Universes</em> (Università di Łódź / Università del Danubio Krems / Università di Aalborg).'),
      },
      {
        kind: L('Conference Paper and Proposal (MAH 2027)', 'Ponencia y Propuesta de Congreso (MAH 2027)', 'Articolo e Proposta per Conferenza (MAH 2027)'),
        text: L(
          '<em>Epistemologies of the Grid: Maya Weaving and the Relational Architecture of Computation</em> (Media Art Histories Conference).',
          '<em>Epistemologies of the Grid: Maya Weaving and the Relational Architecture of Computation</em> (Media Art Histories Conference).',
          '<em>Epistemologies of the Grid: Maya Weaving and the Relational Architecture of Computation</em> (Media Art Histories Conference).'),
      },
      {
        kind: L('Essay and Manuscript (NOEMA)', 'Ensayo y Manuscrito (NOEMA)', 'Saggio e Manoscritto (NOEMA)'),
        text: L(
          '<em>The Luminescent Wound: Arte Povera, Spatial Media, and the Epistemology of Algorithmic Light</em>.',
          '<em>The Luminescent Wound: Arte Povera, Spatial Media, and the Epistemology of Algorithmic Light</em>.',
          '<em>The Luminescent Wound: Arte Povera, Spatial Media, and the Epistemology of Algorithmic Light</em>.'),
      },
      {
        kind: L('Historical and Policy Analysis', 'Análisis Histórico y Político', 'Analisi Storica e Politica'),
        text: L(
          '<em>The Budapest Memorandum: Sovereignty, Security Assurances, and International Treaty Frameworks</em>.',
          '<em>The Budapest Memorandum: Sovereignty, Security Assurances, and International Treaty Frameworks</em>.',
          '<em>The Budapest Memorandum: Sovereignty, Security Assurances, and International Treaty Frameworks</em>.'),
      },
      {
        kind: L('Doctoral Research Proposal (2026)', 'Propuesta de Investigación Doctoral (2026)', 'Proposta di Ricerca di Dottorato (2026)'),
        text: L(
          '<em>The Architecture of Play: Tactile Curation and the Social Mechanics of Immersive Environments</em>.',
          '<em>The Architecture of Play: Tactile Curation and the Social Mechanics of Immersive Environments</em>.',
          '<em>The Architecture of Play: Tactile Curation and the Social Mechanics of Immersive Environments</em>.'),
        href: `mailto:${EMAIL}?subject=Research%20Dossier%20Request`,
        link: L('Request Research Dossier via Email →', 'Solicitar Dossier de Investigación por Correo →', 'Richiedi il Dossier di Ricerca via Email →'),
      },
    ],
  },
  coda: {
    label: L('Coda', 'Coda', 'Coda'),
    body: L(
      'I study computation through the human encounters it shapes: walking into a room, hearing a familiar voice, finding a word in another language, touching a luminous textile, and coordinating movement with a stranger. By turning digital rules into tactile, sonic, and spatial experiences, my work explores how immersive environments can foster curiosity, wonder, and shared human connection.',
      'Estudio la computación a través de los encuentros humanos que configura: entrar en una sala, escuchar una voz familiar, encontrar una palabra en otro idioma, tocar un textil luminoso y coordinar el movimiento con un desconocido. Al transformar las reglas digitales en experiencias táctiles, sonoras y espaciales, mi obra explora cómo los entornos inmersivos pueden despertar la curiosidad, el asombro y la conexión humana compartida.',
      "Studio la computazione attraverso gli incontri umani che modella: entrare in una stanza, ascoltare una voce familiare, trovare una parola in un'altra lingua, toccare un tessuto luminoso e coordinare il movimento con uno sconosciuto. Trasformando le regole digitali in esperienze tattili, sonore e spaziali, il mio lavoro esplora come gli ambienti immersivi possano favorire la curiosità, la meraviglia e la connessione umana condivisa."),
  },
};

// ---------------------------------------------------------------------
// PROJECT PAGES
// fig: { src, cap }  (an .mp4 src becomes a looping silent video)
// ---------------------------------------------------------------------
export const projects = [
  // ------------------------------------------------------------- 02
  {
    slug: 'off-the-gaze', index: '02',
    title: L('<em>OF(F) THE GAZE</em>: Machine Perception as Spatial Encounter', '<em>OF(F) THE GAZE</em>: La Percepción de la Máquina como Encuentro Espacial', '<em>OF(F) THE GAZE</em>: La Percezione della Macchina come Incontro Spaziale'),
    kicker: L('Robotic Installation and Spatial Visualization', 'Instalación Robótica y Visualización Espacial', 'Installazione Robotica e Visualizzazione Spaziale'),
    description: L(
      'A Boston Dynamics Spot robot beneath a canopy of reflective tiles: machine vision as a shared physical encounter. Ars Electronica Festival, 2023.',
      'Un robot Spot de Boston Dynamics bajo una estructura de paneles reflectantes: la visión artificial como encuentro físico compartido. Festival Ars Electronica, 2023.',
      'Un robot Spot di Boston Dynamics sotto una copertura di pannelli riflettenti: la visione artificiale come incontro fisico condiviso. Ars Electronica Festival, 2023.'),
    hero: { src: 'otg-installation.jpg', cap: L('Final robotic installation view at Ars Electronica Festival, Linz, 2023.', 'Vista final de la instalación robótica en el Festival Ars Electronica, Linz, 2023.', "Veduta finale dell'installazione robotica all'Ars Electronica Festival, Linz, 2023.") },
    sections: [
      {
        num: '02.1', heading: about, specs: S.otg,
        body: L(
          "<em>OF(F) THE GAZE</em> stages machine vision as a shared physical encounter. A Boston Dynamics Spot robot navigates an overhead canopy of tensioned reflective tiles, folding the shifting reflections of visitors directly into the robot's live camera feeds. By placing human bodies and autonomous robotics inside the same mirrored environment, the installation prompts strangers to coordinate their movements, observe one another in the overhead grid, and collectively test how an automated system tracks group presence.",
          '<em>OF(F) THE GAZE</em> presenta la visión artificial como un encuentro físico compartido. Un robot Spot de Boston Dynamics recorre una estructura superior de paneles reflectantes tensados, integrando los reflejos cambiantes de los visitantes directamente en las cámaras en vivo del robot. Al situar cuerpos humanos y robótica autónoma dentro del mismo entorno espejado, la instalación impulsa a desconocidos a coordinar sus movimientos, observarse mutuamente en la retícula superior y poner a prueba cómo un sistema automatizado rastrea la presencia grupal.',
          "<em>OF(F) THE GAZE</em> mette in scena la visione artificiale come un incontro fisico condiviso. Un robot Spot di Boston Dynamics si muove sotto una copertura sospesa di pannelli riflettenti tesi, integrando i riflessi mutevoli dei visitatori direttamente nei flussi video dal vivo del robot. Collocando corpi umani e robotica autonoma all'interno dello stesso ambiente specchiante, l'installazione invita gli sconosciuti a coordinare i propri movimenti, osservarsi a vicenda nella griglia superiore e verificare collettivamente come un sistema automatizzato traccia la presenza di gruppo."),
      },
      {
        num: '02.2',
        heading: L('System Logic and Feedback Loops: From Sensing to Interaction', 'Lógica del Sistema y Ciclos de Retroalimentación: De la Detección a la Interacción', "Logica di Sistema e Cicli di Feedback: Dalla Rilevazione all'Interazione"),
        body: L(
          'The system architecture for <em>OF(F) THE GAZE</em> connects robotic camera sensing, live video feeds, and physical room geometry into a continuous feedback loop. Bringing that pipeline into an architectural environment allows visitors to see how their physical proximity and group movement alter what the machine captures. As viewers look up at the reflective tile grid and adjust their positions together, the space turns machine observation into an active, collaborative social encounter.',
          'La arquitectura del sistema de <em>OF(F) THE GAZE</em> conecta la detección por cámara robótica, las transmisiones de video en vivo y la geometría física de la sala en un ciclo continuo de retroalimentación. Llevar ese flujo a un entorno arquitectónico permite a los visitantes observar cómo su proximidad física y su movimiento grupal alteran lo que captura la máquina. Cuando los espectadores miran hacia la retícula de paneles reflectantes y ajustan sus posiciones juntos, el espacio convierte la observación de la máquina en un encuentro social activo y colaborativo.',
          "L'architettura di sistema di <em>OF(F) THE GAZE</em> collega il rilevamento delle telecamere robotiche, i flussi video dal vivo e la geometria fisica della stanza in un ciclo continuo di feedback. Portare tale processo dentro un ambiente architettonico consente ai visitatori di vedere come la propria prossimità fisica e il movimento di gruppo modifichino ciò che la macchina cattura. Mentre gli spettatori alzano lo sguardo verso la griglia di pannelli riflettenti e regolano insieme la propria posizione, lo spazio trasforma l'osservazione della macchina in un incontro sociale attivo e collaborativo."),
      },
    ],
    gallery: [
      { src: 'otg-concept-drawing.jpg', cap: L('System schematic of robotic tracking and reflection loops.', 'Esquema del sistema de seguimiento robótico y ciclos de reflexión.', 'Schema di sistema del tracciamento robotico e dei cicli di riflessione.') },
      { src: 'otg-architecture.png', cap: L('Technical system architecture and live video routing.', 'Arquitectura técnica del sistema y enrutamiento de video en vivo.', 'Architettura tecnica del sistema e instradamento video dal vivo.') },
      { src: 'otg-spot-vision-screen.jpg', cap: L('Recording the Boston Dynamics Spot robot in the exhibition space.', 'Grabación del robot Spot de Boston Dynamics en el espacio expositivo.', 'Registrazione del robot Spot di Boston Dynamics nello spazio espositivo.') },
      { src: 'otg-refractive-tiles.jpg', cap: L('Overhead reflective tile canopy installation in progress.', 'Montaje en curso de la estructura superior de paneles reflectantes.', 'Allestimento in corso della copertura superiore di pannelli riflettenti.') },
      { src: 'otg-spot-closeup.jpg', cap: L('Close-up detail of the tensioned reflective ceiling grid.', 'Detalle en primer plano de la retícula reflectante tensada en el techo.', 'Dettaglio ravvicinato della griglia riflettente tesa a soffitto.') },
      { src: 'otg-team.png', cap: L('Collaborative installation team on site in Linz.', 'Equipo colaborativo de la instalación en Linz.', "Il gruppo di lavoro collaborativo dell'installazione a Linz.") },
      { src: 'otg-spot-walkthrough.mp4', cap: L('Spot walking through the mirrored installation.', 'Spot recorriendo la instalación espejada.', "Spot mentre attraversa l'installazione specchiante.") },
      { src: 'otg-spot-vision.mp4', cap: L("Live feed from Spot's onboard cameras.", 'Transmisión en vivo de las cámaras integradas de Spot.', 'Flusso dal vivo delle telecamere di bordo di Spot.') },
      { src: 'otg-spot-code.mp4', cap: L("Point-cloud rendering of a visitor captured by the robot's depth sensors.", 'Nube de puntos de un visitante captada por los sensores de profundidad del robot.', 'Nuvola di punti di un visitatore acquisita dai sensori di profondità del robot.') },
      { src: 'otg-spot-drawing.jpg', cap: L('Technical drawing of the Spot robot projected during a design review.', 'Dibujo técnico del robot Spot proyectado durante una revisión de diseño.', 'Disegno tecnico del robot Spot proiettato durante una revisione progettuale.') },
      { src: 'otg-initial-brainstorm.jpg', cap: L('Initial concept brainstorm and reference board.', 'Lluvia de ideas inicial y tablero de referencias.', 'Brainstorming iniziale e tavola di riferimenti.') },
      { src: 'otg-team-skills.jpg', cap: L('Team skills mapping from the opening workshop.', 'Mapa de habilidades del equipo en el taller inicial.', 'Mappatura delle competenze del gruppo durante il workshop iniziale.') },
    ],
  },
  // ------------------------------------------------------------- 03
  {
    slug: 'the-agent', index: '03',
    title: L('<em>The Agent</em>: Acoustic Automation and Biological Voice', '<em>The Agent</em>: Automatización Acústica y Voz Biológica', '<em>The Agent</em>: Automazione Acustica e Voce Biologica'),
    kicker: L('Acoustic Performance and Scenography', 'Performance Acústica y Escenografía', 'Performance Acustica e Scenografia'),
    description: L(
      'A site-specific spoken-word performance with reactive lighting and spatial scenography. Ars Electronica Festival, 2023.',
      'Una performance de palabra hablada específica para el espacio, con iluminación reactiva y escenografía espacial. Festival Ars Electronica, 2023.',
      'Una performance spoken word site-specific con illuminazione reattiva e scenografia spaziale. Ars Electronica Festival, 2023.'),
    video: {
      href: 'https://youtu.be/7LVGnghey94?t=130',
      label: L('▶ Watch Performance Video ↗', '▶ Ver Video de la Performance ↗', '▶ Guarda il Video della Performance ↗'),
    },
    hero: { src: 'agent-performance.png', cap: L('Live spoken-word performance at Ars Electronica Festival, Linz, 2023.', 'Performance de palabra hablada en vivo en el Festival Ars Electronica, Linz, 2023.', "Performance spoken word dal vivo all'Ars Electronica Festival, Linz, 2023.") },
    sections: [
      {
        num: '03.1', heading: about, specs: S.agent, voice: AGENT_VOICE,
        body: AGENT_BODY,
      },
    ],
    gallery: [
      { src: 'agent-narrative.png', cap: L('Narrative structure mapping biological voice against algorithmic prompts.', 'Estructura narrativa que vincula la voz biológica con los estímulos algorítmicos.', 'Struttura narrativa che mette in relazione la voce biologica con gli input algoritmici.') },
      { src: 'agent-timeline.png', cap: L('Scenographic timeline draft for lighting and acoustic cues.', 'Borrador de línea de tiempo escenográfica para señales lumínicas y acústicas.', 'Bozza della sequenza temporale scenografica per i segnali luminosi e acustici.') },
      { src: 'agent-rehearsal.mp4', cap: L('Rehearsal on the festival stage.', 'Ensayo en el escenario del festival.', 'Prova sul palco del festival.') },
      { src: 'agent-venue.jpg', cap: L('The performance venue before the audience arrives.', 'El espacio escénico antes de la llegada del público.', "Lo spazio della performance prima dell'arrivo del pubblico.") },
      { src: 'agent-stage-map.jpg', cap: L('Floor plan of the stage and audience seating.', 'Plano de planta del escenario y la platea.', 'Pianta del palco e della platea.') },
      { src: 'agent-notes.png', cap: L('Handwritten keyword notes for the spoken-word script.', 'Notas manuscritas de palabras clave para el guion de palabra hablada.', 'Appunti manoscritti di parole chiave per il testo spoken word.') },
      { src: 'agent-background.jpg', cap: L('Projected background visuals for the performance.', 'Visuales de fondo proyectados para la performance.', 'Visual di sfondo proiettati per la performance.') },
    ],
  },
  // ------------------------------------------------------------- 04
  {
    slug: 'kynd', index: '04',
    title: L('<em>Kynd</em>: Familiarity, Orientation, and Spatial Audio', '<em>Kynd</em>: Familiaridad, Orientación y Audio Espacial', '<em>Kynd</em>: Familiarità, Orientamento e Audio Spaziale'),
    kicker: L('Augmented Reality and Spatial Audio', 'Realidad Aumentada y Audio Espacial', 'Realtà Aumentata e Audio Spaziale'),
    description: L(
      'An augmented-reality and spatial audio prototype supporting orientation for people navigating memory loss. MIT Reality Hack 2026, Honorable Mention.',
      'Un prototipo de realidad aumentada y audio espacial que apoya la orientación de personas con pérdida de memoria. MIT Reality Hack 2026, Mención Honorífica.',
      "Un prototipo in realtà aumentata e audio spaziale che supporta l'orientamento delle persone con perdita di memoria. MIT Reality Hack 2026, Menzione d'Onore."),
    hero: { src: 'kynd-journey-map.png', cap: L('User journey mapping localized audio whispers in daily space.', 'Mapa de experiencia del usuario con susurros de audio localizados en el espacio cotidiano.', 'Mappa del percorso utente con sussurri audio localizzati nello spazio quotidiano.') },
    sections: [
      {
        num: '04.1', heading: about, specs: S.kynd,
        body: L(
          "<em>Kynd</em> explores how augmented reality and directional spatial audio can support spatial orientation for people navigating memory loss. Built on smart glasses, the prototype pairs computer vision with localized audio whispers that deliver familiar voices and context cues within the user's immediate surroundings. Treating acoustic timing and spatial placement as primary design materials allows the system to guide physical movement and preserve human agency in everyday environments.",
          '<em>Kynd</em> explora cómo la realidad aumentada y el audio espacial direccional pueden apoyar la orientación espacial de personas con pérdida de memoria. Desarrollado sobre gafas inteligentes, el prototipo combina visión artificial con susurros de audio localizados que transmiten voces familiares y señales contextuales en el entorno inmediato del usuario. Tratar el tiempo acústico y la ubicación espacial como materiales primordiales de diseño permite guiar el movimiento físico y preservar la autonomía humana en entornos cotidianos.',
          "<em>Kynd</em> esplora come la realtà aumentata e l'audio spaziale direzionale possano supportare l'orientamento spaziale per le persone che affrontano la perdita di memoria. Sviluppato su smart glasses, il prototipo abbina la visione artificiale a sussurri audio localizzati che trasmettono voci familiari e indicazioni contestuali nell'ambiente immediato dell'utente. Trattare il tempo acustico e la disposizione spaziale come materiali progettuali primari consente al sistema di guidare il movimento fisico e preservare l'autonomia umana negli ambienti quotidiani."),
      },
      {
        num: '04.2',
        heading: L('Relational Pathways: Trigger, Cue, Result', 'Rutas Relacionales: Estímulo, Señal y Resultado', 'Percorsi Relazionali: Attivazione, Segnale e Risultato'),
        body: L(
          '<em>Kynd</em> structures interaction around three stages: Trigger, Cue, and Result. When the glasses detect a recognized person, the system delivers a brief, localized audio whisper in a familiar voice to orient the wearer in physical space. Prototyping this loop allowed our team to test how acoustic timing, physical proximity, and subtle audio cues affect cognitive comfort, interpersonal trust, and fluid social interaction.',
          '<em>Kynd</em> estructura la interacción en tres etapas: Estímulo, Señal y Resultado. Cuando las gafas detectan a una persona reconocida, el sistema emite un breve susurro de audio localizado con una voz familiar para orientar al usuario en el espacio físico. Prototipar esta secuencia permitió a nuestro equipo evaluar cómo el tiempo acústico, la proximidad física y las señales sonoras sutiles influyen en la comodidad cognitiva, la confianza interpersonal y la fluidez social.',
          "<em>Kynd</em> organizza l'interazione in tre fasi: Attivazione, Segnale e Risultato. Quando gli occhiali rilevano una persona riconosciuta, il sistema emette un breve sussurro audio localizzato con una voce familiare per orientare chi li indossa nello spazio fisico. La prototipazione di questo ciclo ha permesso al nostro gruppo di verificare come il tempo acustico, la prossimità fisica e i segnali sonori discreti influenzino il comfort cognitivo, la fiducia interpersonale e la fluidità dell'interazione sociale."),
      },
      {
        num: '04.3',
        heading: L('Methods and Tools', 'Métodos y Herramientas', 'Metodi e Strumenti'),
        specs: [
          ['methods', L('Participatory prototyping, spatial audio mapping, cognitive load evaluation', 'Prototipado participativo, mapeo de audio espacial, evaluación de carga cognitiva', 'Prototipazione partecipativa, mappatura dell\'audio spaziale, valutazione del carico cognitivo')],
          ['tools', L('Ray-Ban Meta smart glasses platform, Figma, spatial audio synthesis', 'Plataforma de gafas inteligentes Ray-Ban Meta, Figma, síntesis de audio espacial', 'Piattaforma smart glasses Ray-Ban Meta, Figma, sintesi di audio spaziale')],
          ['recognition', L('MIT Reality Hack 2026, Honorable Mention, Community Hack', 'MIT Reality Hack 2026, Mención Honorífica, Community Hack', "MIT Reality Hack 2026, Menzione d'Onore, Community Hack")],
        ],
      },
    ],
    gallery: [
      { src: 'kynd-machine-learning.png', cap: L('Machine-learning pipeline connecting computer vision to spatial audio.', 'Flujo de aprendizaje automático que conecta la visión artificial con el audio espacial.', "Pipeline di machine learning che collega la visione artificiale all'audio spaziale.") },
      { src: 'kynd-logo.png', cap: L('Visual identity and interface system for Kynd.', 'Identidad visual y sistema de interfaz para Kynd.', 'Identità visiva e sistema di interfaccia per Kynd.') },
      { src: 'kynd-team.png', cap: L('Interdisciplinary development team at MIT Reality Hack 2026.', 'Equipo interdisciplinario de desarrollo en el MIT Reality Hack 2026.', 'Gruppo di sviluppo interdisciplinare al MIT Reality Hack 2026.') },
    ],
  },
  // ------------------------------------------------------------- 05
  {
    slug: 're-create', index: '05',
    title: L('<em>Re-CREATE</em>: Participatory Environmental Modeling', '<em>Re-CREATE</em>: Modelado Ambiental Participativo', '<em>Re-CREATE</em>: Modellazione Ambientale Partecipativa'),
    kicker: L('Participatory Installation', 'Instalación Participativa', 'Installazione Partecipativa'),
    description: L(
      'A participatory studio where visitors build miniature rooms with programmable lighting for a collective digital house. Aalborg University, 2023.',
      'Un estudio participativo donde los visitantes construyen habitaciones en miniatura con iluminación programable para una casa digital colectiva. Universidad de Aalborg, 2023.',
      'Uno studio partecipativo in cui i visitatori costruiscono stanze in miniatura con illuminazione programmabile per una casa digitale collettiva. Università di Aalborg, 2023.'),
    hero: { src: 'recreate-complete.jpg', cap: L('Final participatory installation at the Art and Science Symposium, Aalborg University, 2023.', 'Instalación participativa final en el Simposio de Arte y Ciencia, Universidad de Aalborg, 2023.', "Installazione partecipativa finale all'Art and Science Symposium, Università di Aalborg, 2023.") },
    sections: [
      {
        num: '05.1', heading: about, specs: S.recreate,
        body: L(
          '<em>Re-CREATE</em> turns the gallery into a collaborative studio where visitors arrange physical objects inside a light-controlled miniature box to design shared environments. Participants pair their physical arrangements with an AI-generated background and custom programmable LED lighting before photographing their room to join a collective digital house. Combining hands-on miniature making with responsive lighting turns environmental design into a playful, social activity across gallery visitors.',
          '<em>Re-CREATE</em> transforma la galería en un estudio colaborativo donde los visitantes disponen objetos físicos dentro de una caja en miniatura con iluminación controlada para diseñar entornos compartidos. Los participantes combinan sus composiciones físicas con un fondo generado por inteligencia artificial e iluminación LED programable antes de fotografiar su habitación para integrarla en una casa digital colectiva. Unir la creación manual de miniaturas con la iluminación reactiva convierte el diseño ambiental en una actividad lúdica y social entre los visitantes.',
          "<em>Re-CREATE</em> trasforma la galleria in uno studio collaborativo in cui i visitatori dispongono oggetti fisici all'interno di una scatola in miniatura a luce controllata per progettare ambienti condivisi. I partecipanti abbinano le proprie composizioni fisiche a uno sfondo generato dall'intelligenza artificiale e a un'illuminazione LED programmabile prima di fotografare la propria stanza per unirla a una casa digitale collettiva. Unire la creazione manuale di miniature all'illuminazione reattiva trasforma il design ambientale in un'attività ludica e sociale tra i visitatori della galleria."),
      },
    ],
    gallery: [
      { src: 'recreate-storyboard.png', cap: L('Interaction storyboard for visitor room assembly.', 'Guion gráfico de interacción para el armado de habitaciones por los visitantes.', 'Storyboard di interazione per la composizione della stanza da parte dei visitatori.') },
      { src: 'recreate-schematic.jpg', cap: L('Hardware and lighting schematic for the miniature studio.', 'Esquema de hardware e iluminación para el estudio en miniatura.', 'Schema hardware e di illuminazione per lo studio in miniatura.') },
      { src: 'recreate-blank-canvas.jpg', cap: L('The empty light-controlled box awaiting participant objects.', 'Caja con iluminación controlada lista para recibir objetos de los participantes.', 'La scatola a luce controllata vuota in attesa degli oggetti dei partecipanti.') },
      { src: 'recreate-finish-room.jpg', cap: L('Sample miniature room with custom programmable LED lighting.', 'Habitación en miniatura de muestra con iluminación LED programable personalizada.', 'Stanza in miniatura di esempio con illuminazione LED programmabile personalizzata.') },
      { src: 'recreate-toy-artifacts.jpg', cap: L('Exhibition table setup with tactile modeling artifacts.', 'Mesa de exposición con artefactos táctiles de modelado.', 'Allestimento del tavolo espositivo con manufatti tattili di modellazione.') },
      { src: 'recreate-entrance.jpg', cap: L('Gallery entrance framing the participatory studio space.', 'Entrada de la galería que enmarca el espacio del estudio participativo.', "Ingresso della galleria che inquadra lo spazio dello studio partecipativo.") },
      { src: 'recreate-audience.jpg', cap: L('Visitors collaborating around the exhibition station.', 'Visitantes colaborando alrededor de la estación expositiva.', 'Visitatori che collaborano attorno alla postazione espositiva.') },
      { src: 'recreate-various-rooms.png', cap: L('Collective digital archive of rooms created by visitors.', 'Archivo digital colectivo de habitaciones creadas por los visitantes.', 'Archivio digitale collettivo delle stanze create dai visitatori.') },
      { src: 'recreate-outcome.png', cap: L('Final shared architectural outcome compiled from public submissions.', 'Resultado arquitectónico compartido compilado a partir de las contribuciones del público.', 'Risultato architettonico condiviso compilato a partire dai contributi del pubblico.') },
      { src: 'recreate-team.png', cap: L('Collaborative project team at Aalborg University.', 'Equipo colaborativo del proyecto en la Universidad de Aalborg.', "Gruppo di progetto collaborativo presso l'Università di Aalborg.") },
      { src: 'recreate-interaction.jpg', cap: L('The interactive room station lit in green.', 'La estación de la habitación interactiva iluminada en verde.', 'La postazione della stanza interattiva illuminata di verde.') },
      { src: 'recreate-full-view.jpg', cap: L('Full view of the installation with poster, screen, and room archive.', 'Vista completa de la instalación con el póster, la pantalla y el archivo de habitaciones.', "Veduta completa dell'installazione con il poster, lo schermo e l'archivio delle stanze.") },
      { src: 'recreate-final-look.jpg', cap: L('Visitors browsing the collective room archive.', 'Visitantes recorriendo el archivo colectivo de habitaciones.', "Visitatori che consultano l'archivio collettivo delle stanze.") },
      { src: 'recreate-board.jpg', cap: L('Concept planning notes on realities, tensions, and limitations.', 'Notas de planificación conceptual sobre realidades, tensiones y limitaciones.', 'Appunti di pianificazione concettuale su realtà, tensioni e limiti.') },
      { src: 'recreate-survey.png', cap: L('Visitor survey results on color and card choices.', 'Resultados de la encuesta a visitantes sobre colores y cartas.', 'Risultati del sondaggio tra i visitatori su colori e carte.') },
      { src: 'recreate-poster.jpg', cap: L('Exhibition poster, AAU CREATE, May 2023.', 'Póster de la exposición, AAU CREATE, mayo de 2023.', 'Poster della mostra, AAU CREATE, maggio 2023.') },
    ],
  },
  // ------------------------------------------------------------- 06
  {
    slug: 'touch-grass', index: '06',
    title: L('<em>Touch Grass</em>: A Nostalgic Picnic and the Reclamation of Space', '<em>Touch Grass</em>: Un Picnic Nostálgico y la Recuperación del Espacio', '<em>Touch Grass</em>: Un Picnic Nostalgico e la Riconquista dello Spazio'),
    kicker: L('Experimental Installation and Spatial Media', 'Instalación Experimental y Medios Espaciales', 'Installazione Sperimentale e Media Spaziali'),
    description: L(
      'An indoor picnic of synthetic turf, gingham, woven baskets, and digital tags that invites strangers to sit together. Tropical Lab, Singapore, 2023.',
      'Un picnic interior de césped sintético, cuadros vichy, cestas tejidas y etiquetas digitales que invita a desconocidos a sentarse juntos. Tropical Lab, Singapur, 2023.',
      'Un picnic al chiuso di erba sintetica, quadretti vichy, cesti intrecciati e tag digitali che invita gli sconosciuti a sedersi insieme. Tropical Lab, Singapore, 2023.'),
    hero: { src: 'tgrass-outside.jpg', cap: L('Indoor picnic installation at Tropical Lab, Singapore, 2023.', 'Instalación de picnic interior en Tropical Lab, Singapur, 2023.', 'Installazione di picnic al chiuso presso Tropical Lab, Singapore, 2023.') },
    sections: [
      {
        num: '06.1', heading: about, specs: S.tgrass,
        body: L(
          '<em>Touch Grass</em> stages an indoor picnic inside the gallery using synthetic turf, gingham textiles, woven baskets, and interactive digital tags. Bringing outdoor leisure materials into an exhibition setting invites visitors to step onto a shared tactile surface, sit together, and explore how sensory textures and digital prompts spark conversation, nostalgia, and connection among strangers.',
          '<em>Touch Grass</em> escenifica un picnic interior dentro de la galería utilizando césped sintético, telas de cuadros vichy, cestas tejidas y etiquetas digitales interactivas. Trasladar materiales de ocio al aire libre a un espacio expositivo invita a los visitantes a pisar una superficie táctil compartida, sentarse juntos y explorar cómo las texturas sensoriales y los estímulos digitales despiertan la conversación, la nostalgia y la conexión entre desconocidos.',
          "<em>Touch Grass</em> allestisce un picnic al chiuso all'interno della galleria utilizzando erba sintetica, tessuti a quadretti vichy, cesti intrecciati e tag digitali interattivi. Portare materiali legati al tempo libero all'aperto dentro uno spazio espositivo invita i visitatori a salire su una superficie tattile condivisa, sedersi insieme ed esplorare come le trame sensoriali e gli stimoli digitali accendano la conversazione, la nostalgia e la connessione tra sconosciuti."),
      },
    ],
    gallery: [
      { src: 'tgrass-night.jpg', cap: L('Tactile staging evoking outdoor leisure and sensory nostalgia.', 'Puesta en escena táctil que evoca el ocio al aire libre y la nostalgia sensorial.', "Allestimento tattile che evoca il tempo libero all'aperto e la nostalgia sensoriale.") },
      { src: 'tgrass-basket.png', cap: L('Woven picnic basket containing interactive tactile objects.', 'Cesta de picnic tejida con objetos táctiles interactivos.', 'Cesto da picnic intrecciato contenente oggetti tattili interattivi.') },
      { src: 'tgrass-hashtag.jpg', cap: L('Embedded digital tags linking physical fabrics to archival prompts.', 'Etiquetas digitales integradas que vinculan las telas físicas con estímulos de archivo.', "Tag digitali integrati che collegano i tessuti fisici agli stimoli d'archivio.") },
      { src: 'tgrass-project-map.jpg', cap: L('Spatial layout map of the gallery picnic zone.', 'Mapa de distribución espacial de la zona de picnic en la galería.', "Mappa della disposizione spaziale dell'area picnic nella galleria.") },
      { src: 'tgrass-in-progress.png', cap: L('Synthetic turf and gingham textile installation in progress.', 'Montaje en curso con césped sintético y textiles de cuadros vichy.', 'Allestimento in corso con erba sintetica e tessuti a quadretti vichy.') },
      { src: 'tgrass-picnic.png', cap: L('Visitors gathering on the synthetic turf.', 'Visitantes reunidos sobre el césped sintético.', "Visitatori riuniti sull'erba sintetica.") },
      { src: 'tgrass-birds-eye.jpg', cap: L("Bird's-eye view of the picnic zone.", 'Vista aérea de la zona de picnic.', "Veduta dall'alto dell'area picnic.") },
      { src: 'tgrass-colors.jpg', cap: L('Overhead view of the dressed picnic table.', 'Vista cenital de la mesa de picnic vestida.', 'Veduta zenitale del tavolo da picnic allestito.') },
      { src: 'tgrass-bench-chassis.jpg', cap: L('The bare picnic bench before dressing.', 'El banco de picnic desnudo antes de vestirlo.', "La panca da picnic spoglia prima dell'allestimento.") },
      { src: 'tgrass-inside.jpg', cap: L('Studio test of the dressed picnic table.', 'Prueba en estudio de la mesa de picnic vestida.', 'Prova in studio del tavolo da picnic allestito.') },
      { src: 'tgrass-gingham-patterns.jpg', cap: L('Gingham textiles dressing the table on the turf.', 'Telas de cuadros vichy vistiendo la mesa sobre el césped.', "Tessuti a quadretti vichy che rivestono il tavolo sull'erba.") },
      { src: 'tgrass-culinary-artifacts.jpg', cap: L('Colorful picnic utensils used as tactile props.', 'Utensilios de picnic de colores utilizados como objetos táctiles.', 'Utensili da picnic colorati usati come oggetti tattili.') },
      { src: 'tgrass-glowing.jpg', cap: L('The illuminated basket after dark.', 'La cesta iluminada al anochecer.', 'Il cesto illuminato dopo il tramonto.') },
      { src: 'tgrass-glowing-reflective-inside.jpg', cap: L('Reflective lining inside the illuminated basket.', 'Revestimiento reflectante dentro de la cesta iluminada.', "Rivestimento riflettente all'interno del cesto illuminato.") },
    ],
  },
  // ------------------------------------------------------------- 07
  {
    slug: 'amerihcc-licc', index: '07',
    title: L('<em>Amerihcc Licc</em>: Bio-Ethics and Chimerical Metaphors', '<em>Amerihcc Licc</em>: Bioética y Metáforas Quiméricas', '<em>Amerihcc Licc</em>: Bioetica e Metafore Chimeriche'),
    kicker: L('Video Installation and Projection Mapping', 'Videoinstalación y Mapeo de Proyección', 'Videoinstallazione e Projection Mapping'),
    description: L(
      'A single-channel video installation blending biomaterial imagery with woven textile patterns through projection mapping. TTTLabs, Crete, 2024.',
      'Una videoinstalación monocanal que fusiona imágenes de biomateriales con patrones textiles mediante mapeo de proyección. TTTLabs, Creta, 2024.',
      'Una videoinstallazione a canale singolo che fonde immagini di biomateriali con pattern tessili attraverso il projection mapping. TTTLabs, Creta, 2024.'),
    video: {
      href: 'https://youtu.be/sPbt8ZL-V7s',
      label: L('▶ Watch Video Excerpt ↗', '▶ Ver Extracto de Video ↗', "▶ Guarda l'Estratto Video ↗"),
    },
    hero: { src: 'alicc-pink.jpg', cap: L('Projection-mapped video still blending biomaterial and textile patterns.', 'Fotograma de video proyectado que fusiona biomateriales y patrones textiles.', 'Fotogramma video mappato che fonde biomateriali e trame tessili.') },
    sections: [
      {
        num: '07.1', heading: about, specs: S.alicc,
        body: L(
          '<em>Amerihcc Licc</em> examines genetic identity and cultural heritage through projection mapping and generative visual patterns. This single-channel video installation blends organic biomaterial imagery with woven textile structures, creating a luminous visual surface that explores biological hybridity and material memory.',
          '<em>Amerihcc Licc</em> examina la identidad genética y la herencia cultural mediante mapeo de proyección y patrones visuales generativos. Esta videoinstalación monocanal fusiona imágenes de biomateriales orgánicos con estructuras textiles tejidas, creando una superficie visual luminosa que explora la hibridez biológica y la memoria material.',
          "<em>Amerihcc Licc</em> esamina l'identità genetica e il patrimonio culturale attraverso il projection mapping e pattern visivi generativi. Questa videoinstallazione a canale singolo fonde immagini di biomateriali organici con strutture tessili intrecciate, creando una superficie visiva luminosa che esplora l'ibridazione biologica e la memoria materiale."),
      },
    ],
    gallery: [
      { src: 'alicc-vision.png', cap: L('Spatial projection study examining biological heritage and surface texture.', 'Estudio de proyección espacial sobre herencia biológica y textura superficial.', 'Studio di proiezione spaziale sul patrimonio biologico e sulla trama superficiale.') },
      { src: 'alicc-cow-still.jpg', cap: L('Generative hide-pattern study.', 'Estudio de patrón generativo de piel animal.', 'Studio di pattern generativo a manto animale.') },
      { src: 'alicc-brown.jpg', cap: L('Leopard-print still with a hand-drawn creature outline.', 'Fotograma con estampado de leopardo y la silueta dibujada de una criatura.', 'Fotogramma con stampa leopardata e la sagoma disegnata di una creatura.') },
      { src: 'alicc-green.jpg', cap: L('Houndstooth and hide patterns with a green chimera figure.', 'Pata de gallo y patrones de piel con una figura quimérica verde.', 'Pied-de-poule e pattern di manto con una figura chimerica verde.') },
      { src: 'alicc-inverted.jpg', cap: L('Inverted hide-pattern still.', 'Fotograma con patrón de piel invertido.', 'Fotogramma con pattern di manto invertito.') },
      { src: 'alicc-purple.jpg', cap: L('Chimera figure over woven and organic textures.', 'Figura quimérica sobre texturas tejidas y orgánicas.', 'Figura chimerica su texture intrecciate e organiche.') },
    ],
  },
];
