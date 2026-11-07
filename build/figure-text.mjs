// Accessible figure text, keyed by media file name.
//
//   alt     what the image shows, for people who cannot see it. It does not
//           repeat the visible caption: screen readers announce both.
//   detail  optional, for diagrams, notes, plans and charts whose text matters.
//           Shown under the caption in an expandable "Accessible Image Text and
//           Detail" panel. Visible text is transcribed as written (in its
//           original language); anything illegible is said to be illegible.
//
// Written from the images themselves. Videos keep their caption as their label.
import { L } from './content.mjs';

export const figureText = {
  // ---------- 08 Language and Platforms ----------
  'misc-amazon-alexa.png': {
    alt: L(
      'An Amazon Echo Show smart display showing the time 9:05, the date Wed, May 1, 70 degrees, and a photo of a small dog on a beach.',
      'Una pantalla inteligente Amazon Echo Show que muestra la hora 9:05, la fecha Wed, May 1, 70 grados y la foto de un perrito en una playa.',
      'Uno smart display Amazon Echo Show che mostra le 9:05, la data Wed, May 1, 70 gradi e la foto di un cagnolino su una spiaggia.'),
  },
  'misc-language-textbooks.png': {
    alt: L(
      'Two textbook covers titled Mosaik 1 and Mosaik 2, each with a colourful collage of half-timbered houses.',
      'Dos portadas de libros de texto, Mosaik 1 y Mosaik 2, cada una con un colorido collage de casas con entramado de madera.',
      'Due copertine di libri di testo, Mosaik 1 e Mosaik 2, ciascuna con un collage colorato di case a graticcio.'),
  },
  'misc-nri-app.png': {
    alt: L(
      'A map of the contiguous United States divided into counties, shaded mostly blue with clusters of yellow, orange and red, densest along the West Coast and in Florida.',
      'Un mapa de los Estados Unidos continentales dividido en condados, sombreado sobre todo en azul con grupos en amarillo, naranja y rojo, más densos en la costa oeste y en Florida.',
      "Una mappa degli Stati Uniti continentali divisa in contee, ombreggiata soprattutto in blu con gruppi gialli, arancioni e rossi, più fitti lungo la costa occidentale e in Florida."),
  },

  // ---------- 02 OF(F) THE GAZE ----------
  'otg-installation.jpg': {
    alt: L(
      'Mirrored panels mounted at an angle on a steel scaffold inside an industrial hall, with lamps set into the base of the frame.',
      'Paneles espejados montados en ángulo sobre un andamio de acero dentro de una nave industrial, con lámparas en la base de la estructura.',
      "Pannelli specchiati montati inclinati su un ponteggio d'acciaio all'interno di un capannone industriale, con lampade inserite alla base della struttura."),
  },
  'otg-concept-drawing.jpg': {
    alt: L(
      'A grey three-dimensional scan of the exhibition room with red construction lines tracing the reflective panels and an X, Y, Z axis diagram.',
      'Un escaneo tridimensional en gris de la sala de exposición, con líneas rojas que trazan los paneles reflectantes y un diagrama de ejes X, Y, Z.',
      "Una scansione tridimensionale grigia della sala espositiva, con linee rosse che tracciano i pannelli riflettenti e uno schema degli assi X, Y, Z."),
    detail: L(
      '<p>A point-cloud scan of the room, rendered in grey, labelled "[INSTALLATION DRAWING]" in the top left corner. Dotted red lines run from a single viewpoint on the left to the outline of two mirrored panels at the centre: one upright, one tilted toward the floor. Small red arrows mark directions on each panel. At the lower right, a red cube diagram labels its axes [X], [Y] and [Z].</p>',
      '<p>Un escaneo de nube de puntos de la sala, en gris, rotulado "[INSTALLATION DRAWING]" en la esquina superior izquierda. Líneas rojas punteadas parten de un único punto de vista a la izquierda hacia el contorno de dos paneles espejados en el centro: uno vertical y otro inclinado hacia el suelo. Pequeñas flechas rojas indican direcciones en cada panel. Abajo a la derecha, un diagrama de cubo rojo rotula sus ejes [X], [Y] y [Z].</p>',
      '<p>Una scansione a nuvola di punti della sala, in grigio, con la scritta "[INSTALLATION DRAWING]" in alto a sinistra. Linee rosse tratteggiate partono da un unico punto di vista a sinistra verso il contorno di due pannelli specchiati al centro: uno verticale, uno inclinato verso il pavimento. Piccole frecce rosse indicano direzioni su ciascun pannello. In basso a destra, uno schema a cubo rosso indica gli assi [X], [Y] e [Z].</p>'),
  },
  'otg-architecture.png': {
    alt: L(
      'A circular diagram linking three nodes with arrows: Spot, Algo. and User.',
      'Un diagrama circular que une tres nodos con flechas: Spot, Algo. y User.',
      'Un diagramma circolare che collega tre nodi con frecce: Spot, Algo. e User.'),
    detail: L(
      '<p>Three circles connected clockwise by arrows form a loop.</p><ul><li>Top: a camera icon labelled "Spot", with the heading "Robot Sensor (Machine)".</li><li>Lower right: a gear icon labelled "Algo.", with the heading "Data Processing".</li><li>Lower left: an eye icon labelled "User", with the heading "Human".</li></ul><p>Arrow labels: from Spot to Algo., "Action and Feedback", with "Analysis and Response" above it; from User back to Spot, "Action and Feedback". "Visual Input" is written inside the loop.</p>',
      '<p>Tres círculos unidos en sentido horario por flechas forman un ciclo.</p><ul><li>Arriba: un icono de cámara rotulado "Spot", con el encabezado "Robot Sensor (Machine)".</li><li>Abajo a la derecha: un icono de engranaje rotulado "Algo.", con el encabezado "Data Processing".</li><li>Abajo a la izquierda: un icono de ojo rotulado "User", con el encabezado "Human".</li></ul><p>Rótulos de las flechas: de Spot a Algo., "Action and Feedback", con "Analysis and Response" encima; de User de vuelta a Spot, "Action and Feedback". Dentro del ciclo se lee "Visual Input".</p>',
      '<p>Tre cerchi collegati in senso orario da frecce formano un ciclo.</p><ul><li>In alto: un\'icona di fotocamera con la scritta "Spot" e il titolo "Robot Sensor (Machine)".</li><li>In basso a destra: un\'icona a ingranaggio con la scritta "Algo." e il titolo "Data Processing".</li><li>In basso a sinistra: un\'icona a forma di occhio con la scritta "User" e il titolo "Human".</li></ul><p>Etichette delle frecce: da Spot ad Algo., "Action and Feedback", con sopra "Analysis and Response"; da User di nuovo a Spot, "Action and Feedback". All\'interno del ciclo si legge "Visual Input".</p>'),
  },
  'otg-spot-vision-screen.jpg': {
    alt: L(
      'A flat screen in a black frame showing several round, fisheye camera views of the exhibition hall, under mirrored panels lit with green reflections.',
      'Una pantalla plana con marco negro que muestra varias vistas circulares de cámara ojo de pez de la nave, bajo paneles espejados con reflejos verdes.',
      'Uno schermo piatto con cornice nera che mostra diverse viste circolari fisheye della sala, sotto pannelli specchiati con riflessi verdi.'),
  },
  'otg-refractive-tiles.jpg': {
    alt: L(
      'A grid of nine rippled mirror panels on a tilted frame, reflecting distorted light, beside a printed exhibition text panel.',
      'Una cuadrícula de nueve paneles espejados ondulados sobre un bastidor inclinado, que reflejan luz distorsionada, junto a un panel impreso de la exposición.',
      "Una griglia di nove pannelli specchiati ondulati su un telaio inclinato, che riflettono luce distorta, accanto a un pannello di testo della mostra."),
  },
  'otg-spot-closeup.jpg': {
    alt: L(
      'Looking down at a screen on the floor that shows eight round camera views, with a mirrored panel above it carrying a green line of light and floating numbers.',
      'Vista desde arriba de una pantalla en el suelo con ocho vistas circulares de cámara; encima, un panel espejado con una línea de luz verde y números superpuestos.',
      "Vista dall'alto di uno schermo a terra con otto viste circolari di telecamera; sopra, un pannello specchiato con una linea di luce verde e numeri sovrapposti."),
  },
  'otg-team.png': {
    alt: L(
      'Thirteen people photographed from directly above, looking up at the camera as they stand on a gridded floor, with a robot at the lower right.',
      'Trece personas fotografiadas desde arriba, mirando a la cámara de pie sobre un suelo cuadriculado, con un robot abajo a la derecha.',
      "Tredici persone fotografate dall'alto mentre guardano verso l'obiettivo, in piedi su un pavimento a griglia, con un robot in basso a destra."),
  },
  'otg-spot-drawing.jpg': {
    alt: L(
      'A labelled line drawing of the four-legged Spot robot projected on a white wall, with a person partly visible at the left edge.',
      'Un dibujo lineal con rótulos del robot cuadrúpedo Spot proyectado en una pared blanca, con una persona parcialmente visible en el borde izquierdo.',
      'Un disegno al tratto con etichette del robot quadrupede Spot proiettato su una parete bianca, con una persona in parte visibile sul bordo sinistro.'),
  },
  'otg-initial-brainstorm.jpg': {
    alt: L(
      'A concept board titled Spot-On: a paragraph of text, a paw-and-bone pattern, photos of show dogs, agility courses, a prize ribbon and an LED leash, and lists of dog commands and sounds.',
      'Un panel de concepto titulado Spot-On: un párrafo de texto, un patrón de huellas y huesos, fotos de perros de exposición, pistas de agilidad, una escarapela de premio y una correa LED, y listas de órdenes y sonidos de perro.',
      "Una tavola di concept intitolata Spot-On: un paragrafo di testo, un motivo di zampe e ossi, foto di cani da esposizione, percorsi di agility, una coccarda e un guinzaglio LED, ed elenchi di comandi e versi di cane."),
    detail: L(
      '<p>The paragraph at the top left reads: "Spot-On challenges traditional notions of ownership and authority through a lifelike robotic dog (Spot) prompts visitor to ponder whether the dog or its master truly holds the title (symbolic of truth). Just as the show dog gazes to its path and follows it, the audience and the judges gaze upon the canine. The exhibit\'s play of lights and patterns (paws, bones, balls), along with the incorporation of prize ribbons and a top hat, transforms the spectacle into a show, emphasizing the performative aspects of authority. The leashed machine follows a dog show path. Through a harmonizing soundscape of authentic dog sounds and human commands, the exhibit delves into the intricate interplay between human and machine, inviting the audience to reflect on the complex dynamics of truth it is presented as a show, but who is truly the owner of it? There is a dual projection. One is showing a visualization along with music/sounds based on Spot\'s movements. The second is a film of what Spot \'sees\', as it endlessly shows off its autowalk."</p><p>Two lists at the right. In brown: "Roll Over, Fetch, Shake Hands, Play Dead, Sit". In blue: "Bark, Woof, Howl, Whimper, Yelp".</p><p>Images: a white dog in a top hat, a border collie weaving through agility poles, a dog jumping through a hoop, an empty indoor turf field marked with a dashed circle, the same field marked with a dashed triangle, a red fire hydrant, a dog catching a frisbee, a purple prize ribbon, a dog with a glowing LED leash, and glowing balloon-dog sculptures.</p>',
      '<p>El párrafo de arriba a la izquierda, en inglés, dice: "Spot-On challenges traditional notions of ownership and authority through a lifelike robotic dog (Spot) prompts visitor to ponder whether the dog or its master truly holds the title (symbolic of truth). Just as the show dog gazes to its path and follows it, the audience and the judges gaze upon the canine. The exhibit\'s play of lights and patterns (paws, bones, balls), along with the incorporation of prize ribbons and a top hat, transforms the spectacle into a show, emphasizing the performative aspects of authority. The leashed machine follows a dog show path. Through a harmonizing soundscape of authentic dog sounds and human commands, the exhibit delves into the intricate interplay between human and machine, inviting the audience to reflect on the complex dynamics of truth it is presented as a show, but who is truly the owner of it? There is a dual projection. One is showing a visualization along with music/sounds based on Spot\'s movements. The second is a film of what Spot \'sees\', as it endlessly shows off its autowalk."</p><p>Dos listas a la derecha. En marrón: "Roll Over, Fetch, Shake Hands, Play Dead, Sit". En azul: "Bark, Woof, Howl, Whimper, Yelp".</p><p>Imágenes: un perro blanco con sombrero de copa, un border collie entre postes de agilidad, un perro que salta a través de un aro, un campo de césped interior vacío marcado con un círculo discontinuo, el mismo campo con un triángulo discontinuo, una boca de incendios roja, un perro que atrapa un frisbi, una escarapela morada, un perro con una correa LED luminosa y esculturas luminosas de perros de globo.</p>',
      '<p>Il paragrafo in alto a sinistra, in inglese, recita: "Spot-On challenges traditional notions of ownership and authority through a lifelike robotic dog (Spot) prompts visitor to ponder whether the dog or its master truly holds the title (symbolic of truth). Just as the show dog gazes to its path and follows it, the audience and the judges gaze upon the canine. The exhibit\'s play of lights and patterns (paws, bones, balls), along with the incorporation of prize ribbons and a top hat, transforms the spectacle into a show, emphasizing the performative aspects of authority. The leashed machine follows a dog show path. Through a harmonizing soundscape of authentic dog sounds and human commands, the exhibit delves into the intricate interplay between human and machine, inviting the audience to reflect on the complex dynamics of truth it is presented as a show, but who is truly the owner of it? There is a dual projection. One is showing a visualization along with music/sounds based on Spot\'s movements. The second is a film of what Spot \'sees\', as it endlessly shows off its autowalk."</p><p>Due elenchi a destra. In marrone: "Roll Over, Fetch, Shake Hands, Play Dead, Sit". In blu: "Bark, Woof, Howl, Whimper, Yelp".</p><p>Immagini: un cane bianco con cilindro, un border collie tra i paletti di agility, un cane che salta in un cerchio, un campo in erba sintetica al coperto segnato da un cerchio tratteggiato, lo stesso campo con un triangolo tratteggiato, un idrante rosso, un cane che afferra un frisbee, una coccarda viola, un cane con un guinzaglio LED luminoso e sculture luminose a forma di cane palloncino.</p>'),
  },
  'otg-team-skills.jpg': {
    alt: L(
      'About fifty paper circles in blue, yellow and white pinned to a wall under three green circles reading Wall of Skills, each handwritten with a skill.',
      'Unos cincuenta círculos de papel azules, amarillos y blancos clavados en una pared bajo tres círculos verdes que dicen Wall of Skills, cada uno con una habilidad escrita a mano.',
      "Una cinquantina di cerchi di carta blu, gialli e bianchi appuntati a una parete sotto tre cerchi verdi con la scritta Wall of Skills, ciascuno con un'abilità scritta a mano."),
    detail: L(
      '<p>Legible handwritten skills include: "Law", "Visual Arts", "Merging natural and artificial materials", "Micro controllers", "Physical Computing", "Some coding skills", "Coding/Programming, Chelsi", "Coding/Programming", "Robotics, Chelsi", "Basic Robot Movement programming", "Creative Coding", "UX", "lingx", "Market research", "Building Creating", "Rapid prototyping", "Numerical Manufacture: CNC, Laser Cutting, 3D Print", "Installation making", "Visual aesthetic (UI)", "Speculative World Building", "Convo design", "Design User Research", "Spatial Curation", "Concept Analysis", "Curation", "Sculpting with natural materials", "3D Modeling", "Sound Recording / Music Software (novice!)", "Animation", "Sculptural Installations", "Manual Work", "Design Thinking", "Economics and Business", "Journalism", "Video Making (casual/vlog)", "Ecology", "Making (w materials)" and "Sculpture". Several circles carry fine pencil writing that is too faint to read.</p>',
      '<p>Entre las habilidades escritas a mano que se leen, en inglés: "Law", "Visual Arts", "Merging natural and artificial materials", "Micro controllers", "Physical Computing", "Some coding skills", "Coding/Programming, Chelsi", "Coding/Programming", "Robotics, Chelsi", "Basic Robot Movement programming", "Creative Coding", "UX", "lingx", "Market research", "Building Creating", "Rapid prototyping", "Numerical Manufacture: CNC, Laser Cutting, 3D Print", "Installation making", "Visual aesthetic (UI)", "Speculative World Building", "Convo design", "Design User Research", "Spatial Curation", "Concept Analysis", "Curation", "Sculpting with natural materials", "3D Modeling", "Sound Recording / Music Software (novice!)", "Animation", "Sculptural Installations", "Manual Work", "Design Thinking", "Economics and Business", "Journalism", "Video Making (casual/vlog)", "Ecology", "Making (w materials)" y "Sculpture". Varios círculos llevan escritura a lápiz demasiado tenue para leerla.</p>',
      '<p>Tra le abilità scritte a mano leggibili, in inglese: "Law", "Visual Arts", "Merging natural and artificial materials", "Micro controllers", "Physical Computing", "Some coding skills", "Coding/Programming, Chelsi", "Coding/Programming", "Robotics, Chelsi", "Basic Robot Movement programming", "Creative Coding", "UX", "lingx", "Market research", "Building Creating", "Rapid prototyping", "Numerical Manufacture: CNC, Laser Cutting, 3D Print", "Installation making", "Visual aesthetic (UI)", "Speculative World Building", "Convo design", "Design User Research", "Spatial Curation", "Concept Analysis", "Curation", "Sculpting with natural materials", "3D Modeling", "Sound Recording / Music Software (novice!)", "Animation", "Sculptural Installations", "Manual Work", "Design Thinking", "Economics and Business", "Journalism", "Video Making (casual/vlog)", "Ecology", "Making (w materials)" e "Sculpture". Diversi cerchi hanno una scrittura a matita troppo tenue per essere letta.</p>'),
  },

  // ---------- 03 The Agent ----------
  'agent-performance.png': {
    alt: L(
      'Five performers with microphones on a dark stage lit in red and green, in front of a projected synthesizer diagram with labels such as OSC Modulation and Waveform.',
      'Cinco intérpretes con micrófonos en un escenario oscuro con luz roja y verde, ante la proyección de un diagrama de sintetizador con rótulos como OSC Modulation y Waveform.',
      'Cinque performer con microfoni su un palco buio illuminato di rosso e verde, davanti alla proiezione di uno schema di sintetizzatore con etichette come OSC Modulation e Waveform.'),
  },
  'agent-narrative.png': {
    alt: L(
      'A colour-coded spreadsheet cue sheet with a countdown from 05:00 along the top and rows for visuals, five voices, effects, audio and lights.',
      'Una hoja de cues en una hoja de cálculo con códigos de color, una cuenta atrás desde 05:00 en la parte superior y filas para visuales, cinco voces, efectos, audio y luces.',
      'Un foglio di cue in un foglio di calcolo con codici colore, un conto alla rovescia da 05:00 in alto e righe per visual, cinque voci, effetti, audio e luci.'),
    detail: L(
      '<p>A spreadsheet. The top row, "TIME", counts down: 05:00, 04:40, 04:39, 04:38, 04:30, 03:55, 03:30, 03:10, 02:40. The table is cut off on the right.</p><ul><li>"VISUALS: LETTA + CRISTO": thumbnails of projection screens at several cues.</li><li>"06 KAITO": "Light Chords, going lighter until it fades", then "SILENCE", "Low Rumble, rhythmic", "Low Rumble, active".</li><li>"01 CYAN", "02 CHELSIE", "03 MIYU", "05 BRIAN", "04 PRITHA": each voice enters in turn with "Question" (Cyan\'s first entry reads "Question in Eng."). Then, for all five: "Everybody together, question with impro(?) speech", followed by "Everybody together LOUDER, script+free verse". Later: Cyan "MONOLOGUE, clear text"; Chelsie, Miyu and Brian "Low volume, rhythmic, illegible"; Pritha "Clearer voice for 15-20 sec", then "Body movement dance".</li><li>"EFFECTS: AUG.": "All 6 channels in", "Balance volume", "VCA up", "some grain", "Cyan up and clean; others low, isol. gra…" (cut off).</li><li>"AUDIO: NICO": "INTRO SAMPLE", "Reverb ECHO".</li><li>"LIGHTS: HOTTI": "Black", "room: cold blue to red (duration…" (partly cut off), "spot" four times, "spot on/off manually", "broken light fx / single…" (cut off).</li></ul>',
      '<p>Una hoja de cálculo. La fila superior, "TIME", cuenta hacia atrás: 05:00, 04:40, 04:39, 04:38, 04:30, 03:55, 03:30, 03:10, 02:40. La tabla está cortada a la derecha.</p><ul><li>"VISUALS: LETTA + CRISTO": miniaturas de las pantallas de proyección en varios cues.</li><li>"06 KAITO": "Light Chords, going lighter until it fades", luego "SILENCE", "Low Rumble, rhythmic", "Low Rumble, active".</li><li>"01 CYAN", "02 CHELSIE", "03 MIYU", "05 BRIAN", "04 PRITHA": cada voz entra por turno con "Question" (la primera entrada de Cyan dice "Question in Eng."). Después, para las cinco: "Everybody together, question with impro(?) speech", seguido de "Everybody together LOUDER, script+free verse". Más tarde: Cyan "MONOLOGUE, clear text"; Chelsie, Miyu y Brian "Low volume, rhythmic, illegible"; Pritha "Clearer voice for 15-20 sec" y luego "Body movement dance".</li><li>"EFFECTS: AUG.": "All 6 channels in", "Balance volume", "VCA up", "some grain", "Cyan up and clean; others low, isol. gra…" (cortado).</li><li>"AUDIO: NICO": "INTRO SAMPLE", "Reverb ECHO".</li><li>"LIGHTS: HOTTI": "Black", "room: cold blue to red (duration…" (parcialmente cortado), "spot" cuatro veces, "spot on/off manually", "broken light fx / single…" (cortado).</li></ul>',
      '<p>Un foglio di calcolo. La riga superiore, "TIME", conta alla rovescia: 05:00, 04:40, 04:39, 04:38, 04:30, 03:55, 03:30, 03:10, 02:40. La tabella è tagliata a destra.</p><ul><li>"VISUALS: LETTA + CRISTO": miniature degli schermi di proiezione in diversi cue.</li><li>"06 KAITO": "Light Chords, going lighter until it fades", poi "SILENCE", "Low Rumble, rhythmic", "Low Rumble, active".</li><li>"01 CYAN", "02 CHELSIE", "03 MIYU", "05 BRIAN", "04 PRITHA": ogni voce entra a turno con "Question" (il primo intervento di Cyan dice "Question in Eng."). Poi, per tutte e cinque: "Everybody together, question with impro(?) speech", seguito da "Everybody together LOUDER, script+free verse". Più avanti: Cyan "MONOLOGUE, clear text"; Chelsie, Miyu e Brian "Low volume, rhythmic, illegible"; Pritha "Clearer voice for 15-20 sec", poi "Body movement dance".</li><li>"EFFECTS: AUG.": "All 6 channels in", "Balance volume", "VCA up", "some grain", "Cyan up and clean; others low, isol. gra…" (tagliato).</li><li>"AUDIO: NICO": "INTRO SAMPLE", "Reverb ECHO".</li><li>"LIGHTS: HOTTI": "Black", "room: cold blue to red (duration…" (in parte tagliato), "spot" quattro volte, "spot on/off manually", "broken light fx / single…" (tagliato).</li></ul>'),
  },
  'agent-timeline.png': {
    alt: L(
      'A whiteboard sketch of a horizontal timeline from 0:00 to 4:20, with a question mark beside 5:00, and handwritten notes in blue, green and red.',
      'Un boceto en pizarra blanca de una línea de tiempo horizontal de 0:00 a 4:20, con un signo de interrogación junto a 5:00, y notas manuscritas en azul, verde y rojo.',
      'Uno schizzo su lavagna bianca di una linea del tempo orizzontale da 0:00 a 4:20, con un punto interrogativo accanto a 5:00, e note scritte a mano in blu, verde e rosso.'),
    detail: L(
      '<p>The photo is small, so some writing is uncertain. A horizontal line runs from "0:00" at the left to "4:20", with "5:00?" further right. A rising red line labelled "tension" (reading uncertain) climbs toward 4:20, where the line is cross-hatched. Notes under the start read "All people … ", "Ambient sound", "Piano" and "6 ppl on stage" (partly legible). A hatched bar under the middle is divided into "Questions", "Sum…" (uncertain) and "Frustration, Anger". Lower left: a sketch of a screen with a face and the words "Sound" and "Phrase … Synth" (partly legible), with a red note beginning "to discuss with the graphics…". Near the right, "1 voice". A small drawing sits at the far right.</p>',
      '<p>La foto es pequeña, así que parte de la escritura es incierta. Una línea horizontal va de "0:00" a la izquierda hasta "4:20", con "5:00?" más a la derecha. Una línea roja ascendente rotulada "tension" (lectura incierta) sube hacia 4:20, donde la línea está sombreada con tramas. Las notas bajo el inicio dicen "All people … ", "Ambient sound", "Piano" y "6 ppl on stage" (parcialmente legibles). Una barra rayada bajo el centro se divide en "Questions", "Sum…" (incierto) y "Frustration, Anger". Abajo a la izquierda: el boceto de una pantalla con una cara y las palabras "Sound" y "Phrase … Synth" (parcialmente legibles), con una nota roja que empieza "to discuss with the graphics…". Cerca de la derecha, "1 voice". Un pequeño dibujo aparece en el extremo derecho.</p>',
      '<p>La foto è piccola, quindi parte della scrittura è incerta. Una linea orizzontale va da "0:00" a sinistra fino a "4:20", con "5:00?" più a destra. Una linea rossa ascendente con la scritta "tension" (lettura incerta) sale verso 4:20, dove la linea è tratteggiata a reticolo. Le note sotto l\'inizio dicono "All people … ", "Ambient sound", "Piano" e "6 ppl on stage" (in parte leggibili). Una barra tratteggiata sotto il centro è divisa in "Questions", "Sum…" (incerto) e "Frustration, Anger". In basso a sinistra: lo schizzo di uno schermo con un volto e le parole "Sound" e "Phrase … Synth" (in parte leggibili), con una nota rossa che inizia "to discuss with the graphics…". Verso destra, "1 voice". Un piccolo disegno compare all\'estrema destra.</p>'),
  },
  'agent-venue.jpg': {
    alt: L(
      'A large hall with rows of empty seats, a lighting truss being rigged and a blue-lit screen at the front, with crew members at work.',
      'Una gran sala con filas de asientos vacíos, una estructura de iluminación en montaje y una pantalla iluminada en azul al frente, con técnicos trabajando.',
      'Una grande sala con file di posti vuoti, una struttura per le luci in allestimento e uno schermo illuminato di blu in fondo, con tecnici al lavoro.'),
  },
  'agent-stage-map.jpg': {
    alt: L(
      'An architectural floor plan in German showing a stage, a 15-metre screen, a central seating block flanked by two angled blocks, and red triangles marking emergency exits.',
      'Un plano arquitectónico en alemán con un escenario, una pantalla de 15 metros, un bloque central de asientos entre dos bloques en ángulo y triángulos rojos que marcan las salidas de emergencia.',
      "Una pianta architettonica in tedesco con un palco, uno schermo di 15 metri, un blocco centrale di posti tra due blocchi angolati e triangoli rossi che segnano le uscite di emergenza."),
    detail: L(
      '<p>Labels in German: an orange rectangle at the top reads "Plattform 20/4m, Steg 2/4m" (platform 20 by 4 m, walkway 2 by 4 m). Below it, "Leinwand = 15m" (screen) and "Bühne" (stage). The seating area is shaded green; at its centre, small text reads "Bestuhlung max. 1000 Pers." (seating, maximum 1,000 people; the small print is hard to read). Red triangles mark exits, with labels such as "50 Personen Fluchttür", "100 Personen Fluchtweg", "250 Fluchttür Personen", "240 Fluchtweg Personen" and "200 Fluchtweg Personen" (Fluchtweg, escape route; Fluchttür, emergency door).</p>',
      '<p>Rótulos en alemán: un rectángulo naranja arriba dice "Plattform 20/4m, Steg 2/4m" (plataforma de 20 por 4 m, pasarela de 2 por 4 m). Debajo, "Leinwand = 15m" (pantalla) y "Bühne" (escenario). La zona de asientos está sombreada en verde; en su centro, un texto pequeño dice "Bestuhlung max. 1000 Pers." (asientos, máximo 1000 personas; la letra pequeña es difícil de leer). Triángulos rojos marcan las salidas, con rótulos como "50 Personen Fluchttür", "100 Personen Fluchtweg", "250 Fluchttür Personen", "240 Fluchtweg Personen" y "200 Fluchtweg Personen" (Fluchtweg, vía de evacuación; Fluchttür, puerta de emergencia).</p>',
      '<p>Etichette in tedesco: un rettangolo arancione in alto dice "Plattform 20/4m, Steg 2/4m" (piattaforma di 20 per 4 m, passerella di 2 per 4 m). Sotto, "Leinwand = 15m" (schermo) e "Bühne" (palco). L\'area dei posti è ombreggiata in verde; al centro, un testo piccolo dice "Bestuhlung max. 1000 Pers." (posti a sedere, massimo 1000 persone; la stampa piccola è difficile da leggere). Triangoli rossi segnano le uscite, con etichette come "50 Personen Fluchttür", "100 Personen Fluchtweg", "250 Fluchttür Personen", "240 Fluchtweg Personen" e "200 Fluchtweg Personen" (Fluchtweg, via di fuga; Fluchttür, porta di emergenza).</p>'),
  },
  'agent-notes.png': {
    alt: L(
      'Words handwritten in rainbow, red and gold ink on a white background, including technology, humanity, agency, loud/quiet and human/machine.',
      'Palabras escritas a mano en tinta arcoíris, roja y dorada sobre fondo blanco, entre ellas technology, humanity, agency, loud/quiet y human/machine.',
      "Parole scritte a mano con inchiostro arcobaleno, rosso e oro su fondo bianco, tra cui technology, humanity, agency, loud/quiet e human/machine."),
    detail: L(
      '<p>The handwritten words, grouped as they appear:</p><ul><li>In gold, top left: "spotlight", followed by "truth".</li><li>In rainbow colours: "technology", "representation", "humanity", "agency".</li><li>In dark red: "loud/quiet", "far/near", "true/false", "human/machine".</li><li>In gold, top right: "Sending", an illegible symbol, "artist", "curator".</li><li>In gold, bottom left: "want" crossed out, then "yearn", "heard", a small heart, "acknowledgement".</li></ul>',
      '<p>Las palabras manuscritas, agrupadas como aparecen:</p><ul><li>En dorado, arriba a la izquierda: "spotlight", seguido de "truth".</li><li>En colores del arcoíris: "technology", "representation", "humanity", "agency".</li><li>En rojo oscuro: "loud/quiet", "far/near", "true/false", "human/machine".</li><li>En dorado, arriba a la derecha: "Sending", un símbolo ilegible, "artist", "curator".</li><li>En dorado, abajo a la izquierda: "want" tachado, luego "yearn", "heard", un pequeño corazón, "acknowledgement".</li></ul>',
      '<p>Le parole scritte a mano, raggruppate come appaiono:</p><ul><li>In oro, in alto a sinistra: "spotlight", seguito da "truth".</li><li>Nei colori dell\'arcobaleno: "technology", "representation", "humanity", "agency".</li><li>In rosso scuro: "loud/quiet", "far/near", "true/false", "human/machine".</li><li>In oro, in alto a destra: "Sending", un simbolo illeggibile, "artist", "curator".</li><li>In oro, in basso a sinistra: "want" cancellato, poi "yearn", "heard", un piccolo cuore, "acknowledgement".</li></ul>'),
  },
  'agent-background.jpg': {
    alt: L(
      'Four stacked black bands of white imagery: wisps of smoke, the words truth and agency among scattered letters, a mirrored stage plan with numbered circles, and a dim scene of figures.',
      'Cuatro franjas negras apiladas con imágenes en blanco: volutas de humo, las palabras truth y agency entre letras dispersas, un plano de escenario invertido con círculos numerados y una escena tenue con figuras.',
      "Quattro fasce nere sovrapposte con immagini bianche: volute di fumo, le parole truth e agency tra lettere sparse, una pianta di palco specchiata con cerchi numerati e una scena scura con figure."),
  },

  // ---------- 04 Kynd ----------
  'kynd-journey-map.png': {
    alt: L(
      'A three-panel illustrated storyboard in which smart glasses help an older woman recognise her grandson.',
      'Un guion gráfico ilustrado de tres viñetas en el que unas gafas inteligentes ayudan a una mujer mayor a reconocer a su nieto.',
      "Uno storyboard illustrato in tre riquadri in cui degli occhiali smart aiutano una donna anziana a riconoscere il nipote."),
    detail: L(
      '<p>The image is small; the main labels are legible.</p><ol><li>"1. The Trigger (Recognition)": an older woman in glasses looks at a young man, with a thought bubble holding a question mark. A camera icon and the note "Face Detected. Recognizing \'David\' (Grandson)…". Timer: "00:01 sec".</li><li>"2. The Cue (Anchoring)": the glasses lens shows a photo of the two together, captioned "David – Grandson" and "Recency: 3 years ago". An ear icon: "Audio Whisper: \'It\'s David, Grandma.\'" A brain icon: "Emotional Memory Triggered. Bypassing Cognitive Block." Timer: "00:02 sec".</li><li>"3. The Result (Connection)": the woman smiles and touches the young man\'s shoulder; her thought bubble now shows his face and a heart. Notes: "User feels safe. Present moment anchored. Anxiety reduced." and "Transformation: From \'Who is this?\' to \'Oh, it\'s David.\'"</li></ol>',
      '<p>La imagen es pequeña; los rótulos principales se leen.</p><ol><li>"1. The Trigger (Recognition)": una mujer mayor con gafas mira a un joven, con un bocadillo de pensamiento que contiene un signo de interrogación. Un icono de cámara y la nota "Face Detected. Recognizing \'David\' (Grandson)…". Temporizador: "00:01 sec".</li><li>"2. The Cue (Anchoring)": la lente de las gafas muestra una foto de ambos, con el pie "David – Grandson" y "Recency: 3 years ago". Un icono de oreja: "Audio Whisper: \'It\'s David, Grandma.\'" Un icono de cerebro: "Emotional Memory Triggered. Bypassing Cognitive Block." Temporizador: "00:02 sec".</li><li>"3. The Result (Connection)": la mujer sonríe y toca el hombro del joven; su bocadillo muestra ahora la cara de él y un corazón. Notas: "User feels safe. Present moment anchored. Anxiety reduced." y "Transformation: From \'Who is this?\' to \'Oh, it\'s David.\'"</li></ol>',
      '<p>L\'immagine è piccola; le etichette principali sono leggibili.</p><ol><li>"1. The Trigger (Recognition)": una donna anziana con gli occhiali guarda un giovane, con una nuvoletta di pensiero che contiene un punto interrogativo. Un\'icona di fotocamera e la nota "Face Detected. Recognizing \'David\' (Grandson)…". Timer: "00:01 sec".</li><li>"2. The Cue (Anchoring)": la lente degli occhiali mostra una foto dei due insieme, con la didascalia "David – Grandson" e "Recency: 3 years ago". Un\'icona a forma di orecchio: "Audio Whisper: \'It\'s David, Grandma.\'" Un\'icona a forma di cervello: "Emotional Memory Triggered. Bypassing Cognitive Block." Timer: "00:02 sec".</li><li>"3. The Result (Connection)": la donna sorride e tocca la spalla del giovane; la sua nuvoletta ora mostra il volto di lui e un cuore. Note: "User feels safe. Present moment anchored. Anxiety reduced." e "Transformation: From \'Who is this?\' to \'Oh, it\'s David.\'"</li></ol>'),
  },
  'kynd-machine-learning.png': {
    alt: L(
      'Three phone screenshots of a Compare Photos screen: two empty slots marked A and B, the same slots filled with photos, and a result reporting a match.',
      'Tres capturas de pantalla de un teléfono con la pantalla Compare Photos: dos casillas vacías marcadas A y B, las mismas casillas con fotos y un resultado que indica coincidencia.',
      "Tre schermate di telefono della schermata Compare Photos: due caselle vuote segnate A e B, le stesse caselle con delle foto e un risultato che segnala una corrispondenza."),
    detail: L(
      '<p>Each screen is headed "Compare Photos" and "Select two photos (A and B)", with buttons "Pick A (Photos)" and "Pick B (Photos)", a note "No App Gallery photos found. Take a photo → Save to App Gallery.", and buttons "Reset" and "Compare".</p><ol><li>The A and B slots are empty; the status reads "Idle".</li><li>Both slots hold a photo of a person; a status line below begins "Roboflow detecting in B…" (small and partly legible).</li><li>The same photos, with a green check and "MATCH (distance: 0.000)".</li></ol>',
      '<p>Cada pantalla lleva el encabezado "Compare Photos" y "Select two photos (A and B)", con los botones "Pick A (Photos)" y "Pick B (Photos)", la nota "No App Gallery photos found. Take a photo → Save to App Gallery." y los botones "Reset" y "Compare".</p><ol><li>Las casillas A y B están vacías; el estado dice "Idle".</li><li>Ambas casillas contienen la foto de una persona; una línea de estado debajo empieza "Roboflow detecting in B…" (pequeña y parcialmente legible).</li><li>Las mismas fotos, con una marca verde y "MATCH (distance: 0.000)".</li></ol>',
      '<p>Ogni schermata ha il titolo "Compare Photos" e "Select two photos (A and B)", con i pulsanti "Pick A (Photos)" e "Pick B (Photos)", la nota "No App Gallery photos found. Take a photo → Save to App Gallery." e i pulsanti "Reset" e "Compare".</p><ol><li>Le caselle A e B sono vuote; lo stato indica "Idle".</li><li>Entrambe le caselle contengono la foto di una persona; una riga di stato sotto inizia con "Roboflow detecting in B…" (piccola e in parte leggibile).</li><li>Le stesse foto, con un segno di spunta verde e "MATCH (distance: 0.000)".</li></ol>'),
  },
  'kynd-logo.png': {
    alt: L(
      'The Kynd logo: two outlined figures sharing a pair of glasses beneath a small heart, above the word Kynd, with the Ray-Ban and Meta logos below.',
      'El logotipo de Kynd: dos figuras delineadas que comparten unas gafas bajo un pequeño corazón, sobre la palabra Kynd, con los logotipos de Ray-Ban y Meta debajo.',
      'Il logo di Kynd: due figure stilizzate che condividono un paio di occhiali sotto un piccolo cuore, sopra la parola Kynd, con i loghi Ray-Ban e Meta in basso.'),
  },
  'kynd-team.png': {
    alt: L(
      'Three people standing arm in arm and smiling in a modern building lobby.',
      'Tres personas de pie, abrazadas y sonrientes, en el vestíbulo de un edificio moderno.',
      "Tre persone in piedi, abbracciate e sorridenti, nell'atrio di un edificio moderno."),
  },

  // ---------- 05 Re-CREATE ----------
  'recreate-complete.jpg': {
    alt: L(
      'A dark room where a miniature furnished room glows under two desk lamps on a table, in front of a chalkboard with five numbered instructions.',
      'Una sala oscura donde una habitación en miniatura amueblada brilla bajo dos lámparas sobre una mesa, frente a una pizarra con cinco instrucciones numeradas.',
      'Una sala buia in cui una stanza in miniatura arredata brilla sotto due lampade su un tavolo, davanti a una lavagna con cinque istruzioni numerate.'),
    detail: L(
      '<p>The chalkboard instructions, written in capitals and partly faint: "1. Pick the background. 2. Clip it to the back of the box. 3. Pick the light using the cellphone. 4. Use the objects to make your space. 5. Leave your creation (we will take a picture)." Chalk arrows numbered 1 and 3 point down toward the table.</p>',
      '<p>Las instrucciones de la pizarra, en mayúsculas y en parte tenues, en inglés: "1. Pick the background. 2. Clip it to the back of the box. 3. Pick the light using the cellphone. 4. Use the objects to make your space. 5. Leave your creation (we will take a picture)." (1. Elige el fondo. 2. Sujétalo al fondo de la caja. 3. Elige la luz con el móvil. 4. Usa los objetos para crear tu espacio. 5. Deja tu creación: le haremos una foto.) Flechas de tiza numeradas 1 y 3 apuntan hacia la mesa.</p>',
      '<p>Le istruzioni sulla lavagna, in maiuscolo e in parte sbiadite, in inglese: "1. Pick the background. 2. Clip it to the back of the box. 3. Pick the light using the cellphone. 4. Use the objects to make your space. 5. Leave your creation (we will take a picture)." (1. Scegli lo sfondo. 2. Fissalo sul retro della scatola. 3. Scegli la luce con il cellulare. 4. Usa gli oggetti per creare il tuo spazio. 5. Lascia la tua creazione: le scatteremo una foto.) Frecce di gesso numerate 1 e 3 puntano verso il tavolo.</p>'),
  },
  'recreate-storyboard.png': {
    alt: L(
      'A six-panel stick-figure storyboard of a visitor building and photographing a room in a box.',
      'Un guion gráfico de seis viñetas con figuras de palitos en el que un visitante construye y fotografía una habitación dentro de una caja.',
      "Uno storyboard in sei riquadri con figure stilizzate in cui un visitatore costruisce e fotografa una stanza dentro una scatola."),
    detail: L(
      '<p>Headed "The visitor…", the panels read:</p><ol><li>"enters blank box."</li><li>"selects AI- background." (the figure taps a tablet)</li><li>"customizes LEDS."</li><li>"chooses DK artifacts." (a hand places small objects in the box)</li><li>"takes room photograph."</li><li>"views it in online house." (the figure looks at a house drawing with a framed picture in it)</li></ol>',
      '<p>Con el encabezado "The visitor…", las viñetas dicen:</p><ol><li>"enters blank box." (entra en la caja vacía)</li><li>"selects AI- background." (elige un fondo generado con IA; la figura toca una tableta)</li><li>"customizes LEDS." (personaliza los LED)</li><li>"chooses DK artifacts." (elige objetos daneses; una mano coloca pequeños objetos en la caja)</li><li>"takes room photograph." (fotografía la habitación)</li><li>"views it in online house." (la ve en la casa en línea; la figura mira el dibujo de una casa con un cuadro dentro)</li></ol>',
      '<p>Con il titolo "The visitor…", i riquadri dicono:</p><ol><li>"enters blank box." (entra nella scatola vuota)</li><li>"selects AI- background." (sceglie uno sfondo generato con l\'IA; la figura tocca un tablet)</li><li>"customizes LEDS." (personalizza i LED)</li><li>"chooses DK artifacts." (sceglie oggetti danesi; una mano posa piccoli oggetti nella scatola)</li><li>"takes room photograph." (fotografa la stanza)</li><li>"views it in online house." (la guarda nella casa online; la figura osserva il disegno di una casa con un quadro all\'interno)</li></ol>'),
  },
  'recreate-schematic.jpg': {
    alt: L(
      'A rendering of an empty white room annotated by hand in colour to plan a projector, screen, camera, controls, windows and object areas.',
      'Una representación de una sala blanca vacía anotada a mano en color para planificar proyector, pantalla, cámara, controles, ventanas y zonas de objetos.',
      "Un rendering di una stanza bianca vuota annotata a mano a colori per pianificare proiettore, schermo, telecamera, comandi, finestre e aree per gli oggetti."),
    detail: L(
      '<p>Hand annotations over a plain white room:</p><ul><li>Red, at the top: a rectangle labelled "proj."</li><li>Green: a large rectangle across the back wall, labelled "gs" (reading uncertain).</li><li>Blue: a rectangle on each side wall, one labelled "ts windows" (first word uncertain).</li><li>Red, at the front: small rectangles on two stools labelled "controls" and "comp + screen", and a line to a third stool labelled "cam".</li><li>Orange, under the stools: "change me" and "see me".</li><li>Yellow: many small crosses around the room, with the label "items".</li></ul>',
      '<p>Anotaciones a mano sobre una sala blanca vacía:</p><ul><li>En rojo, arriba: un rectángulo rotulado "proj." (proyector).</li><li>En verde: un gran rectángulo en la pared del fondo, rotulado "gs" (lectura incierta).</li><li>En azul: un rectángulo en cada pared lateral, uno rotulado "ts windows" (primera palabra incierta).</li><li>En rojo, delante: pequeños rectángulos sobre dos taburetes rotulados "controls" y "comp + screen", y una línea hacia un tercer taburete rotulada "cam".</li><li>En naranja, bajo los taburetes: "change me" y "see me".</li><li>En amarillo: muchas cruces pequeñas por la sala, con el rótulo "items".</li></ul>',
      '<p>Annotazioni a mano su una stanza bianca vuota:</p><ul><li>In rosso, in alto: un rettangolo con la scritta "proj." (proiettore).</li><li>In verde: un grande rettangolo sulla parete di fondo, con la scritta "gs" (lettura incerta).</li><li>In blu: un rettangolo su ciascuna parete laterale, uno con la scritta "ts windows" (prima parola incerta).</li><li>In rosso, davanti: piccoli rettangoli su due sgabelli con le scritte "controls" e "comp + screen", e una linea verso un terzo sgabello con la scritta "cam".</li><li>In arancione, sotto gli sgabelli: "change me" e "see me".</li><li>In giallo: molte piccole croci nella stanza, con l\'etichetta "items".</li></ul>'),
  },
  'recreate-blank-canvas.jpg': {
    alt: L(
      'An empty open-fronted white box glowing with pale blue light between two gooseneck lamps in a dark room, with a colour remote control beside it.',
      'Una caja blanca vacía, abierta por delante, que brilla con luz azul pálida entre dos lámparas de cuello flexible en una sala oscura, con un mando de color al lado.',
      'Una scatola bianca vuota, aperta sul davanti, illuminata di azzurro tenue tra due lampade a collo flessibile in una sala buia, con un telecomando dei colori accanto.'),
  },
  'recreate-finish-room.jpg': {
    alt: L(
      'A miniature room with a cloud backdrop, a swing holding a croissant, a white shelf with a birdcage and basketball, a traffic light, a toy horse in a deck chair and clear teal building bricks.',
      'Una habitación en miniatura con fondo de nubes, un columpio con un cruasán, una estantería blanca con una jaula y un balón, un semáforo, un caballo de juguete en una tumbona y bloques de construcción turquesa translúcidos.',
      "Una stanza in miniatura con sfondo di nuvole, un'altalena con un croissant, uno scaffale bianco con una gabbietta e un pallone, un semaforo, un cavallino in una sdraio e mattoncini da costruzione color turchese trasparente."),
  },
  'recreate-toy-artifacts.jpg': {
    alt: L(
      'A table crowded with miniature furniture, toys and building bricks, with handwritten sticky notes, in a dim room lit in blue and teal.',
      'Una mesa llena de muebles en miniatura, juguetes y bloques de construcción, con notas adhesivas manuscritas, en una sala tenue con luz azul y turquesa.',
      'Un tavolo pieno di mobili in miniatura, giocattoli e mattoncini, con foglietti adesivi scritti a mano, in una sala in penombra illuminata di blu e turchese.'),
  },
  'recreate-entrance.jpg': {
    alt: L(
      'A dark room lit in purple, with a Re-CREATE poster on the left and a projection on the back wall reading Enter Here and Interactive Room above a table with a projector.',
      'Una sala oscura con luz morada, un póster de Re-CREATE a la izquierda y una proyección en la pared del fondo que dice Enter Here e Interactive Room sobre una mesa con un proyector.',
      "Una sala buia illuminata di viola, con un poster di Re-CREATE a sinistra e una proiezione sulla parete di fondo con le scritte Enter Here e Interactive Room sopra un tavolo con un proiettore."),
  },
  'recreate-audience.jpg': {
    alt: L(
      'Visitors seen from behind in a dark room, gathered around a small illuminated box on a table in front of a chalkboard.',
      'Visitantes vistos de espaldas en una sala oscura, reunidos alrededor de una pequeña caja iluminada sobre una mesa frente a una pizarra.',
      'Visitatori visti di spalle in una sala buia, raccolti attorno a una piccola scatola illuminata su un tavolo davanti a una lavagna.'),
  },
  'recreate-various-rooms.png': {
    alt: L(
      'A grid of four miniature rooms with painted backdrops of a lake, a starry sky and clouds, furnished with tiny swings, plants, chairs and toys.',
      'Una cuadrícula de cuatro habitaciones en miniatura con fondos pintados de un lago, un cielo estrellado y nubes, amuebladas con columpios, plantas, sillas y juguetes diminutos.',
      "Una griglia di quattro stanze in miniatura con sfondi dipinti di un lago, un cielo stellato e nuvole, arredate con minuscole altalene, piante, sedie e giocattoli."),
  },
  'recreate-outcome.png': {
    alt: L(
      'A pixel-art drawing of a tall gabled brick house against a night sky, its windows filled with twelve photos of miniature rooms.',
      'Un dibujo en pixel art de una casa alta de ladrillo con tejado a dos aguas sobre un cielo nocturno, con doce fotos de habitaciones en miniatura en sus ventanas.',
      "Un disegno in pixel art di un'alta casa di mattoni con tetto a capanna contro un cielo notturno, con dodici foto di stanze in miniatura nelle finestre."),
  },
  'recreate-team.png': {
    alt: L(
      'Three people standing beside a large Re-CREATE poster, two on the left and one on the right.',
      'Tres personas de pie junto a un gran póster de Re-CREATE, dos a la izquierda y una a la derecha.',
      'Tre persone in piedi accanto a un grande poster di Re-CREATE, due a sinistra e una a destra.'),
  },
  'recreate-interaction.jpg': {
    alt: L(
      'The installation bathed in green light: a Re-CREATE poster, a green screen, a projection reading Interactive Room and a monitor showing a grid of room photos.',
      'La instalación bañada en luz verde: un póster de Re-CREATE, una pantalla verde, una proyección que dice Interactive Room y un monitor con una cuadrícula de fotos de habitaciones.',
      "L'installazione immersa nella luce verde: un poster di Re-CREATE, un green screen, una proiezione con la scritta Interactive Room e un monitor con una griglia di foto di stanze."),
  },
  'recreate-full-view.jpg': {
    alt: L(
      'The installation under red and violet light: a Re-CREATE poster at left, a projection reading Interactive Room, Follow the arrows on the floor, and an upright screen showing the room archive.',
      'La instalación bajo luz roja y violeta: un póster de Re-CREATE a la izquierda, una proyección que dice Interactive Room, Follow the arrows on the floor, y una pantalla vertical con el archivo de habitaciones.',
      "L'installazione sotto luce rossa e viola: un poster di Re-CREATE a sinistra, una proiezione con la scritta Interactive Room, Follow the arrows on the floor, e uno schermo verticale con l'archivio delle stanze."),
  },
  'recreate-final-look.jpg': {
    alt: L(
      'Three visitors standing at an upright screen, one pointing at the grid of room photos.',
      'Tres personas de pie ante una pantalla vertical; una señala la cuadrícula de fotos de habitaciones.',
      'Tre persone in piedi davanti a uno schermo verticale; una indica la griglia di foto di stanze.'),
  },
  'recreate-board.jpg': {
    alt: L(
      'A whiteboard of handwritten planning notes under the headings Description, Tensions, Limitations and Framing.',
      'Una pizarra blanca con notas de planificación manuscritas bajo los encabezados Description, Tensions, Limitations y Framing.',
      'Una lavagna bianca con appunti di progettazione scritti a mano sotto i titoli Description, Tensions, Limitations e Framing.'),
    detail: L(
      '<p>Left column: "Description (naming)", "Realities coexist w/ Dreams (TBD)", and, in a bracket, "[Exploring the Mind]". Below: "Tensions (conflicts)", "Show realities", "Prevent polarization/misunderstanding", and a last line cut off at the bottom ("…within realities", uncertain).</p><p>Right column: "Limitations", "Subjectiveness", then a list: "(All) Truths Present", "Experiences", "Standardization of Life", with a note "not every truth is valid" (with "every" underlined). Then "Framing (How can we create a design that…)" followed by three faint lines: "Creating a space with game mechanics" (partly legible), "Play with sense of perception" (partly legible), "Playing with reality, dreams", and "[Mulholland Drive]". A faint erased heading near the top centre and a pink sticky note are not legible.</p>',
      '<p>Columna izquierda: "Description (naming)", "Realities coexist w/ Dreams (TBD)" y, entre corchetes, "[Exploring the Mind]". Debajo: "Tensions (conflicts)", "Show realities", "Prevent polarization/misunderstanding" y una última línea cortada abajo ("…within realities", incierto).</p><p>Columna derecha: "Limitations", "Subjectiveness" y una lista: "(All) Truths Present", "Experiences", "Standardization of Life", con la nota "not every truth is valid" ("every" subrayado). Después, "Framing (How can we create a design that…)" seguido de tres líneas tenues: "Creating a space with game mechanics" (parcialmente legible), "Play with sense of perception" (parcialmente legible), "Playing with reality, dreams" y "[Mulholland Drive]". Un encabezado borrado cerca del centro superior y una nota adhesiva rosa no se leen.</p>',
      '<p>Colonna sinistra: "Description (naming)", "Realities coexist w/ Dreams (TBD)" e, tra parentesi quadre, "[Exploring the Mind]". Sotto: "Tensions (conflicts)", "Show realities", "Prevent polarization/misunderstanding" e un\'ultima riga tagliata in basso ("…within realities", incerto).</p><p>Colonna destra: "Limitations", "Subjectiveness", poi un elenco: "(All) Truths Present", "Experiences", "Standardization of Life", con la nota "not every truth is valid" ("every" sottolineato). Poi "Framing (How can we create a design that…)" seguito da tre righe sbiadite: "Creating a space with game mechanics" (in parte leggibile), "Play with sense of perception" (in parte leggibile), "Playing with reality, dreams" e "[Mulholland Drive]". Un titolo cancellato in alto al centro e un foglietto adesivo rosa non sono leggibili.</p>'),
  },
  'recreate-survey.png': {
    alt: L(
      'Two pie charts from an online form under the heading Mood and Ambience: Pick a color and Pick a card suit, 92 responses each.',
      'Dos gráficos circulares de un formulario en línea bajo el encabezado Mood and Ambience: Pick a color y Pick a card suit, con 92 respuestas cada uno.',
      'Due grafici a torta di un modulo online sotto il titolo Mood and Ambience: Pick a color e Pick a card suit, con 92 risposte ciascuno.'),
    detail: L(
      '<p>"Pick a color." (92 responses): Green 22.8%, Blue 19.6%, Red 14.1%, White 10.9%, Purple 9.8%, Yellow 8.7%. Orange and Black have smaller slices with no percentage shown. The chart\'s swatch colours do not match the colour names (the "Red" slice is drawn in blue, for example).</p><p>"Pick a card suit." (92 responses): spades 32.6%, hearts 28.3%, clubs 25%, diamonds 14.1%.</p>',
      '<p>"Pick a color." (92 respuestas): verde 22,8 %, azul 19,6 %, rojo 14,1 %, blanco 10,9 %, morado 9,8 %, amarillo 8,7 %. Naranja y negro tienen porciones más pequeñas sin porcentaje visible. Los colores del gráfico no coinciden con los nombres (la porción "Red" está dibujada en azul, por ejemplo).</p><p>"Pick a card suit." (92 respuestas): picas 32,6 %, corazones 28,3 %, tréboles 25 %, diamantes 14,1 %.</p>',
      '<p>"Pick a color." (92 risposte): verde 22,8%, blu 19,6%, rosso 14,1%, bianco 10,9%, viola 9,8%, giallo 8,7%. Arancione e nero hanno spicchi più piccoli senza percentuale indicata. I colori del grafico non corrispondono ai nomi (lo spicchio "Red" è disegnato in blu, per esempio).</p><p>"Pick a card suit." (92 risposte): picche 32,6%, cuori 28,3%, fiori 25%, quadri 14,1%.</p>'),
  },
  'recreate-poster.jpg': {
    alt: L(
      'A dark poster with a rainbow burst of light at the top and the title Re-CREATE in large white letters, over faint pixel-art scenes.',
      'Un póster oscuro con un destello de luz arcoíris arriba y el título Re-CREATE en grandes letras blancas, sobre escenas tenues en pixel art.',
      "Un poster scuro con un'esplosione di luce arcobaleno in alto e il titolo Re-CREATE in grandi lettere bianche, su tenui scene in pixel art."),
    detail: L(
      '<p>Poster text: "An Interactive Design", "Re-CREATE", "May 2 - 4 2023 @ AAU CREATE", "Exhibition 12: Room 5.125", "A MediaAC Installation by Brian Contreras, Magdalena Hartmann, Claudia Silva, Aimen Malik, Mahsa Sheydani". Two QR codes at the right are labelled "Scan for live site" and "Scan for Instagram".</p>',
      '<p>Texto del póster: "An Interactive Design", "Re-CREATE", "May 2 - 4 2023 @ AAU CREATE", "Exhibition 12: Room 5.125", "A MediaAC Installation by Brian Contreras, Magdalena Hartmann, Claudia Silva, Aimen Malik, Mahsa Sheydani". Dos códigos QR a la derecha llevan los rótulos "Scan for live site" y "Scan for Instagram".</p>',
      '<p>Testo del poster: "An Interactive Design", "Re-CREATE", "May 2 - 4 2023 @ AAU CREATE", "Exhibition 12: Room 5.125", "A MediaAC Installation by Brian Contreras, Magdalena Hartmann, Claudia Silva, Aimen Malik, Mahsa Sheydani". Due codici QR a destra hanno le etichette "Scan for live site" e "Scan for Instagram".</p>'),
  },

  // ---------- 06 Touch Grass ----------
  'tgrass-outside.jpg': {
    alt: L(
      'A picnic table dressed in green velvet and gingham on a raised lawn of artificial turf, on a covered terrace beneath a glass building with the word Critique on its facade.',
      'Una mesa de pícnic vestida con terciopelo verde y cuadros vichy sobre un césped artificial elevado, en una terraza cubierta bajo un edificio de vidrio con la palabra Critique en la fachada.',
      "Un tavolo da picnic rivestito di velluto verde e tessuto a quadretti su un prato sintetico rialzato, in una terrazza coperta sotto un edificio di vetro con la parola Critique sulla facciata."),
  },
  'tgrass-night.jpg': {
    alt: L(
      'The dressed picnic table at night on the terrace, glowing green from a light beneath it, with city lights and trees behind.',
      'La mesa de pícnic vestida, de noche en la terraza, con un brillo verde que sale de una luz bajo ella, y luces de la ciudad y árboles detrás.',
      'Il tavolo da picnic allestito, di notte sulla terrazza, illuminato di verde da una luce sottostante, con le luci della città e gli alberi sullo sfondo.'),
  },
  'tgrass-basket.png': {
    alt: L(
      'A colourful harlequin-patterned picnic basket on a wicker tray, with a card clipped to it reading #touchgrass, surrounded by drinking straws and folded cloths on a gingham tablecloth.',
      'Una cesta de pícnic de colores con motivo de arlequín sobre una bandeja de mimbre, con una tarjeta sujeta que dice #touchgrass, rodeada de pajitas y paños doblados sobre un mantel de cuadros.',
      "Un cestino da picnic colorato a motivo arlecchino su un vassoio di vimini, con un cartoncino fissato con la scritta #touchgrass, circondato da cannucce e panni piegati su una tovaglia a quadretti."),
  },
  'tgrass-hashtag.jpg': {
    alt: L(
      'Close-up of the harlequin-patterned basket on a bench, with a handwritten #touchgrass card held on by clothes pegs and a silver insulated lining showing at the top.',
      'Primer plano de la cesta con motivo de arlequín sobre un banco, con una tarjeta manuscrita #touchgrass sujeta con pinzas y un forro aislante plateado asomando arriba.',
      "Primo piano del cestino a motivo arlecchino su una panca, con un cartoncino scritto a mano #touchgrass fissato con mollette e una fodera isolante argentata visibile in alto."),
  },
  'tgrass-project-map.jpg': {
    alt: L(
      'A simple layout diagram in blue, peach and green bands, with labels for plates, basket, blanket and folded cloths, grass and light.',
      'Un diagrama de distribución sencillo en franjas azul, melocotón y verde, con rótulos para platos, cesta, manta y paños doblados, hierba y luz.',
      "Un semplice schema di disposizione a fasce blu, pesca e verde, con etichette per piatti, cestino, coperta e panni piegati, erba e luce."),
    detail: L(
      '<p>Seen from above. A wide blue band holds three circles (one labelled "Plates") and a box labelled "Blanket + Folded Cloths". A peach band across its upper right is labelled "Basket". Below, a green band is labelled "\'Grass\'", with a box labelled "Light" on the line between the blue and green bands.</p>',
      '<p>Vista desde arriba. Una ancha franja azul contiene tres círculos (uno rotulado "Plates", platos) y un recuadro rotulado "Blanket + Folded Cloths" (manta y paños doblados). Una franja melocotón en su parte superior derecha lleva el rótulo "Basket" (cesta). Debajo, una franja verde lleva el rótulo "\'Grass\'" (hierba), con un recuadro "Light" (luz) en la línea entre la franja azul y la verde.</p>',
      '<p>Vista dall\'alto. Un\'ampia fascia blu contiene tre cerchi (uno con la scritta "Plates", piatti) e un riquadro con la scritta "Blanket + Folded Cloths" (coperta e panni piegati). Una fascia color pesca in alto a destra ha l\'etichetta "Basket" (cestino). Sotto, una fascia verde ha l\'etichetta "\'Grass\'" (erba), con un riquadro "Light" (luce) sulla linea tra la fascia blu e quella verde.</p>'),
  },
  'tgrass-in-progress.png': {
    alt: L(
      'A table on artificial turf covered with gingham cloths in blue, white and peach, a basket of folded fabric, red and blue napkins, cups and twisted drinking straws.',
      'Una mesa sobre césped artificial cubierta con telas de cuadros azules, blancas y melocotón, una cesta de tela doblada, servilletas rojas y azules, vasos y pajitas retorcidas.',
      "Un tavolo sul prato sintetico coperto da tessuti a quadretti blu, bianchi e pesca, un cestino di stoffa piegata, tovaglioli rossi e blu, bicchieri e cannucce ritorte."),
  },
  'tgrass-picnic.png': {
    alt: L(
      'Three young people sitting and talking on the turf beside a glass railing, with the dressed table and tree ferns behind them.',
      'Tres jóvenes sentados conversando sobre el césped junto a una barandilla de vidrio, con la mesa vestida y helechos arborescentes detrás.',
      "Tre giovani seduti a chiacchierare sul prato accanto a una ringhiera di vetro, con il tavolo allestito e le felci arboree alle spalle."),
  },
  'tgrass-birds-eye.jpg': {
    alt: L(
      'A high view down onto a turf-covered terrace with tree ferns, the dressed picnic table on a raised platform, and three people sitting near a railing hung with bunting.',
      'Una vista desde lo alto de una terraza cubierta de césped con helechos arborescentes, la mesa de pícnic vestida sobre una plataforma elevada y tres personas sentadas junto a una barandilla con banderines.',
      "Una vista dall'alto su una terrazza coperta di prato con felci arboree, il tavolo da picnic allestito su una pedana rialzata e tre persone sedute vicino a una ringhiera con bandierine."),
  },
  'tgrass-colors.jpg': {
    alt: L(
      'Looking straight down at the picnic table on green turf: pastel cloths, plates, the harlequin basket and a round white light.',
      'Vista cenital de la mesa de pícnic sobre el césped verde: telas pastel, platos, la cesta de arlequín y una luz blanca redonda.',
      'Vista zenitale del tavolo da picnic sul prato verde: tessuti pastello, piatti, il cestino arlecchino e una luce bianca rotonda.'),
  },
  'tgrass-bench-chassis.jpg': {
    alt: L(
      'A bare dark metal picnic table with attached benches on artificial turf, with trees and buildings beyond a glass railing.',
      'Una mesa de pícnic de metal oscuro sin vestir, con bancos unidos, sobre césped artificial, con árboles y edificios más allá de una barandilla de vidrio.',
      "Un tavolo da picnic in metallo scuro, spoglio, con panche unite, su un prato sintetico, con alberi ed edifici oltre una ringhiera di vetro."),
  },
  'tgrass-inside.jpg': {
    alt: L(
      'The picnic table dressed in green velvet and gingham with the harlequin basket on top, standing on a tiled floor against a plain wall.',
      'La mesa de pícnic vestida con terciopelo verde y cuadros, con la cesta de arlequín encima, sobre un suelo de baldosas junto a una pared lisa.',
      'Il tavolo da picnic rivestito di velluto verde e quadretti, con il cestino arlecchino sopra, su un pavimento piastrellato contro una parete liscia.'),
  },
  'tgrass-gingham-patterns.jpg': {
    alt: L(
      'A wrinkled white tablecloth with a fine blue and peach check laid over green crushed velvet, with plain blue and peach cloths at either end.',
      'Un mantel blanco arrugado con un fino cuadriculado azul y melocotón sobre terciopelo verde arrugado, con telas lisas azul y melocotón en cada extremo.',
      "Una tovaglia bianca stropicciata a quadretti fini blu e pesca stesa su velluto verde, con tessuti azzurro e pesca alle due estremità."),
  },
  'tgrass-culinary-artifacts.jpg': {
    alt: L(
      'Inside the basket, a tangle of brightly coloured plastic forks, spoons and knives, beside a card with handwriting ending in the word Topic.',
      'Dentro de la cesta, una maraña de tenedores, cucharas y cuchillos de plástico de colores vivos, junto a una tarjeta manuscrita que termina con la palabra Topic.',
      'Dentro il cestino, un groviglio di forchette, cucchiai e coltelli di plastica dai colori vivaci, accanto a un cartoncino scritto a mano che termina con la parola Topic.'),
  },
  'tgrass-glowing.jpg': {
    alt: L(
      'The harlequin basket glowing with white light from inside after dark, its #touchgrass card lit up, with straws and paper cups around it.',
      'La cesta de arlequín brillando con luz blanca desde dentro al anochecer, con su tarjeta #touchgrass iluminada y pajitas y vasos de papel alrededor.',
      "Il cestino arlecchino illuminato di bianco dall'interno dopo il tramonto, con il cartoncino #touchgrass in luce e cannucce e bicchieri di carta intorno."),
  },
  'tgrass-glowing-reflective-inside.jpg': {
    alt: L(
      'Looking into the basket: silver insulated lining, a glowing white orb and a pile of folded white paper notes.',
      'Vista del interior de la cesta: forro aislante plateado, una esfera blanca luminosa y un montón de notas de papel blanco dobladas.',
      "Vista dell'interno del cestino: fodera isolante argentata, una sfera bianca luminosa e un mucchio di biglietti di carta bianca piegati."),
  },

  // ---------- 07 Amerihcc Licc ----------
  'alicc-pink.jpg': {
    alt: L(
      'A pink circle of cow-hide spots with a simple hand-drawn cow face, set against black and white zebra stripes.',
      'Un círculo rosa con manchas de piel de vaca y una sencilla cara de vaca dibujada a mano, sobre rayas de cebra en blanco y negro.',
      'Un cerchio rosa a macchie di mucca con un semplice muso di mucca disegnato a mano, su strisce zebrate bianche e nere.'),
  },
  'alicc-vision.png': {
    alt: L(
      'A style board: a row of six colour swatches with names and hex codes, the typeface name Cooper Black, and four pattern tiles of cow print, digital camouflage, houndstooth and hide.',
      'Un panel de estilo: una fila de seis muestras de color con nombres y códigos hexadecimales, el nombre de la tipografía Cooper Black y cuatro muestras de estampado de vaca, camuflaje digital, pata de gallo y piel.',
      "Una tavola di stile: una fila di sei campioni di colore con nomi e codici esadecimali, il nome del carattere Cooper Black e quattro riquadri con stampa mucca, mimetica digitale, pied-de-poule e pelle."),
    detail: L(
      '<p>Colour swatches, left to right: "Pure Black #000000", "Pure White #FFFFFF", "Digital Blue #4A90E2", "Bright Green #50E3C2", "Soft Purple #D080FF", "Beige #F5F5DC". Beside them, the words "Cooper Black" set in that typeface. Below, four pattern tiles: black and white cow spots, grey digital camouflage, black and white houndstooth, and a black, beige and white hide pattern.</p>',
      '<p>Muestras de color, de izquierda a derecha: "Pure Black #000000", "Pure White #FFFFFF", "Digital Blue #4A90E2", "Bright Green #50E3C2", "Soft Purple #D080FF", "Beige #F5F5DC". Al lado, las palabras "Cooper Black" compuestas en esa tipografía. Debajo, cuatro muestras de estampado: manchas de vaca en blanco y negro, camuflaje digital gris, pata de gallo en blanco y negro, y una piel en negro, beige y blanco.</p>',
      '<p>Campioni di colore, da sinistra a destra: "Pure Black #000000", "Pure White #FFFFFF", "Digital Blue #4A90E2", "Bright Green #50E3C2", "Soft Purple #D080FF", "Beige #F5F5DC". Accanto, le parole "Cooper Black" composte in quel carattere. Sotto, quattro riquadri di motivi: macchie di mucca bianche e nere, mimetica digitale grigia, pied-de-poule bianco e nero, e una pelle nera, beige e bianca.</p>'),
  },
  'alicc-cow-still.jpg': {
    alt: L(
      'A full-frame mottled pattern of black, white and beige patches, like a cowhide.',
      'Un estampado moteado a toda la imagen de manchas negras, blancas y beige, como una piel de vaca.',
      "Un motivo screziato a tutto campo di macchie nere, bianche e beige, come una pelle di mucca."),
  },
  'alicc-brown.jpg': {
    alt: L(
      'Leopard print on the left and cow spots on the right, overlaid with brown hand-drawn outlines of two cows, one large and one small.',
      'Estampado de leopardo a la izquierda y manchas de vaca a la derecha, con contornos marrones dibujados a mano de dos vacas, una grande y una pequeña.',
      "Stampa leopardata a sinistra e macchie di mucca a destra, con i contorni marroni disegnati a mano di due mucche, una grande e una piccola."),
  },
  'alicc-green.jpg': {
    alt: L(
      'Black and white houndstooth beside cow spots, overlaid with a green hand-drawn creature outline that is partly filled in violet blue.',
      'Pata de gallo en blanco y negro junto a manchas de vaca, con el contorno verde de una criatura dibujada a mano, rellena en parte de azul violáceo.',
      "Pied-de-poule bianco e nero accanto a macchie di mucca, con il contorno verde di una creatura disegnata a mano, in parte riempita di blu violaceo."),
  },
  'alicc-inverted.jpg': {
    alt: L(
      'A mottled hide pattern of mostly white ground with black and dark grey patches.',
      'Un estampado moteado de piel con fondo mayormente blanco y manchas negras y gris oscuro.',
      'Un motivo screziato di pelle su fondo prevalentemente bianco con macchie nere e grigio scuro.'),
  },
  'alicc-purple.jpg': {
    alt: L(
      'A purple hand-drawn winged creature with blue accents over a panel of cow spots, layered on grey camouflage and soft grey hills against a dark blue sky.',
      'Una criatura alada dibujada a mano en morado con detalles azules sobre un panel de manchas de vaca, superpuesto a un camuflaje gris y suaves colinas grises bajo un cielo azul oscuro.',
      "Una creatura alata disegnata a mano in viola con dettagli blu su un pannello a macchie di mucca, sovrapposto a una mimetica grigia e morbide colline grigie sotto un cielo blu scuro."),
  },
};
