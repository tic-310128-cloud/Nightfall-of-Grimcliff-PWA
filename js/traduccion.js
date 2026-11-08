// ===== Traducción ES / ENG =====
// Cada par es [inicio del texto en español, traducción al inglés].
// - Normal: coincide si el texto EMPIEZA con esa frase.
// - Con "=" al inicio: coincide solo si el texto es EXACTAMENTE esa palabra/frase.
// Para traducir más texto, solo agrega una línea nueva a esta lista.
// Si cambias un texto del index.html, cambia también su línea aquí
// (si no coincide, esa parte simplemente se queda en español).

// ---------- 1. LISTA DE TRADUCCIONES ----------
const EN = [
    // --- Menú y títulos ---
    ["Personajes involucrados:", "Characters involved:"],
    ["Acerca De", "About"], ["Mundos y niveles", "Worlds and levels"], ["Mundos", "Worlds"],
    ["Manual", "Manual"], ["Premios y logros", "Awards and achievements"], ["Premios", "Awards"],
    ["Personajes", "Characters"],

    // --- Portada ---
    ["El reino ha caído bajo la tiranía", "The kingdom has fallen under the tyranny of King Malakor the Corrupt. Take the role of Kaelen, a humble bounty hunter who must venture into the shadows to claim the mystic sword"],
    ["y devolver la luz al reino.", "and bring light back to the kingdom."],
    ["Descargar app (APK Android)", "Download app (Android APK)"],
    ["Instalar PWA", "Install PWA"],
    ["Género", "Genre"], ["Hack and Slash 2D", "2D Hack and Slash"],
    ["Plataforma", "Platform"], ["Clasificación", "Rating"], ["Estilo", "Style"],
    ["Juego: PC · App: Android", "Game: PC · App: Android"],

    // --- Historia y objetivo ---
    ["— La Travesía por Grimcliff —", "— The Journey Through Grimcliff —"],
    ["Historia", "Story"],
    ["Capítulo I: La Caída", "Chapter I: The Fall of the Kingdom and the Awakening of Vengeance"],
    ["Las runas grabadas en la roca ancestral", "The runes carved into the ancient rock and worn down by the relentless passing of millennia had already foretold it: a nameless shadow would loom over the lands of Grimcliff. What the prophecies did not make clear was that the seed of ruin would sprout in the very heart of the crown. The kingdom, once a vibrant bastion of prosperity and justice, tragically fell under the yoke of Malakor. Born and raised within the unmovable walls of the imperial castle, Malakor was taught to firmly believe that his divine blood placed him above the sorrows of mortals."],
    ["Aunque durante las primeras décadas", "Although he ruled with benevolence during the first decades, the paranoia and isolation of absolute power corrupted his judgment. Frightened by the inevitable fragility of his life and the decline of his empire, he made a pact with the dark forces lying beneath the earth, surrendering his people's hope to feed an insatiable greed and a devastating black magic."],
    ["Continuar leyendo...", "Keep reading..."], ["Mostrar menos", "Show less"],
    ["Objetivo", "Objective"],
    ["Guiar a Kaelen por los tres niveles", "Guide Kaelen through the three levels of the game (the Dark Forest, Grimcliff Castle and the Throne of Eternal Night), gathering allies to obtain the sword"],
    [", superando enemigos", ", overcoming enemies, traps and puzzles, and defeating Malakor in a three-phase battle to restore light to the kingdom."],

    // --- Personajes (textos comunes) ---
    ["Conoce al Héroe de la Luz", "Meet the Hero of Light, the Tyrant King and the Allies of the Gloom who will guide you on your journey."],
    ["Descripción:", "Description:"], ["Descripción", "Description"],
    ["Vestuarios (toca", "Outfits (tap one to view it)"],
    ["Animaciones y sprites (toca", "Animations and sprites (tap one to view it)"],
    ["Vestuarios", "Outfits"], ["Imágenes y animaciones", "Images and animations"], ["Icono", "Icon"],
    ["=Malakor el Corrupto", "Malakor the Corrupt"],

    // --- NPC sin sprites (Thorne, Kogan, Zephyrus y Elara) ---
    ["=Sprites y animaciones", "Sprites and animations"],
    ["Este personaje es un NPC", "This character is an NPC who guides the player through dialogue, so it has no sprites or animations."],

    // --- Visor del carrusel (imagen o video) ---
    ["=Vestuario", "Outfit"], ["=Animación", "Animation"],
    ["Imagen o video pendiente", "Image or video pending"],
    ["Video pendiente", "Video pending"],
    ["Video de Kaelen", "Video of Kaelen"],
    ["Video de Malakor el Corrupto", "Video of Malakor the Corrupt"],
    ["Video de Thorne", "Video of Thorne"],
    ["Video de Kogan", "Video of Kogan"],
    ["Video de Zephyrus", "Video of Zephyrus"],
    ["Video de Elara", "Video of Elara"],

    // --- Personaje: Kaelen ---
    ["Kaelen — El Caballero del Amanecer", "Kaelen — The Knight of Dawn"],
    ["Protagonista y héroe controlado", "Protagonist and player-controlled hero. Knight of Dawn; after receiving Alborada, the Hero of Light."],
    ["Huérfano que creció", "An orphan raised in the suburbs of the capital who became a bounty hunter. He retired to a remote village to live in peace with his family, but Malakor's campaign razed his home. As the sole survivor, he takes up arms again, driven by a thirst for justice."],
    ["Atuendo de viajero (inicio)", "Traveler's outfit (start)"],
    ["Armadura arcana (Héroe", "Arcane armor (Hero of Light)"],
    ["Ataque con espada", "Sword attack"],
    ["Ataque potenciado con Alborada", "Alborada-powered attack"],
    ["=Golpear", "Hit"], ["=Muerte", "Death"],

    // --- Personaje: Malakor ---
    ["Malakor — Rey tirano", "Malakor — Tyrant King"],
    ["Jefe final y rey tirano", "Final boss and tyrant king of Grimcliff."],
    ["Monarca que gobernó", "A monarch who ruled with benevolence for decades, but paranoia, the isolation of power and the fear of old age and death corrupted him. He sealed a pact with beings of shadow that plunged the kingdom into eternal night."],
    ["Atuendo real", "Royal attire (before the corruption)"],
    ["Forma final alada", "Final winged form (corruption)"],
    ["Ataques con mandoble", "Greatsword attacks"],
    ["Ondas de choque (Volar)", "Shockwaves (Fly)"],
    ["Invocación de esbirros", "Summoning minions"],
    ["Garras y magia oscura", "Claws and dark magic"],
    ["Derrota (golpe final", "Defeat (Alborada's final blow)"],

    // --- Personaje: Thorne ---
    ["Thorne — Comandante traicionado", "Thorne — Betrayed Commander"],
    ["Aliado, comandante y mentor", "Ally, commander and combat mentor."],
    ["Antiguo comandante supremo", "Former supreme commander of Grimcliff's army, betrayed by Malakor with a suicidal ambush. He took refuge in the Dark Forest and trains Kaelen in combat."],
    ["Armadura de comandante", "Commander's armor: wine-red plates, black breastplate and teal helmet"],
    ["Combate con espada", "Sword combat"],
    ["Enseñanza de técnicas", "Teaching techniques"],

    // --- Personaje: Kogan ---
    ["Kogan — Herrero arcano", "Kogan — Arcane Blacksmith"],
    ["Aliado y herrero arcano", "Ally and arcane blacksmith; he forged the sword Alborada."],
    ["Último heredero", "Last heir of a line of arcane blacksmiths who fused metal with elemental properties. He hid as an ordinary armorer and forged the sword Alborada."],
    ["Atuendo de armero común", "Ordinary armorer's outfit: fitted red tunic, high black collar and dark gloves"],
    ["=Forja", "Forging"],
    ["Refuerzo de la armadura", "Armor reinforcement"],
    ["Entrega de la espada", "Handing over the sword"],

    // --- Personaje: Zephyrus ---
    ["Zephyrus — Mago exiliado", "Zephyrus — Exiled Mage"],
    ["Aliado y mago exiliado", "Ally and exiled mage."],
    ["Antiguo prodigio", "Former prodigy of the Imperial Academy, banished for warning of the catastrophe the king's pact would bring."],
    ["Túnica de mago exiliado", "Exiled mage's robe: gray and violet with golden runes, hood and staff"],
    ["Conjuros de repulsión", "Repulsion spells"],
    ["Grabado de runas protectoras", "Engraving protective runes"],
    ["Disipación de niebla y barreras", "Dispelling fog and barriers"],

    // --- Personaje: Elara ---
    ["Elara — Sanadora", "Elara — Healer"],
    ["Aliada y sanadora", "Ally and healer."],
    ["Antigua sanadora real", "Former royal healer who led a humanitarian team and fled the castle to secretly heal the kingdom's survivors."],
    ["Atuendo de sanadora errante", "Wandering healer's outfit: dark gray with blue details and combat boots"],
    ["Canalización de vitalidad", "Channeling vitality"],
    ["Medicina botánica arcana", "Arcane botanical medicine"],
    ["Entrega de elixires y ungüentos", "Delivering elixirs and ointments"],

    // --- Mundos y niveles ---
    ["El recorrido es lineal", "The route is linear, from west to east: the first level teaches, the second challenges and the third tests everything you have learned."],
    ["=El Bosque Oscuro", "The Dark Forest"],
    ["=El Castillo de Grimcliff", "Grimcliff Castle"],
    ["=El Trono de la Noche Eterna", "The Throne of Eternal Night"],
    ["Nivel 1: El Bosque Oscuro", "Level 1: The Dark Forest (The Gloom)"],
    ["Nivel 2: El Castillo", "Level 2: Grimcliff Castle"],
    ["Nivel 3: El Trono", "Level 3: The Throne of Eternal Night"],
    ["Objetivos:", "Objectives:"], ["Zonas:", "Zones:"],
    // Nivel 1
    ["Bosque de árboles retorcidos", "Twisted trees, dense fog and moss-covered ruins, barely lit by a dim moon. It is the tutorial level: exploration, stealth and outdoor puzzles."],
    ["Aprender las mecánicas", "Learn the mechanics, find the four allies to get the map and items, and obtain the sword"],
    ["entrada del bosque", "forest entrance, Thorne's path, Kogan's refuge and the edge of the forest."],
    ["Kaelen, Thorne, Kogan", "Kaelen, Thorne, Kogan, Zephyrus, Elara and the spawn of the forest."],
    // Nivel 2
    ["Fortaleza gótica", "Gothic fortress of dark stone, with multi-story halls, torn tapestries and torches that create pools of warm light. A closed space of infiltration and combat, with fire and spike traps."],
    ["Superar los obstáculos", "Overcome the obstacles and defeat the king's guard, room by room, until reaching the throne room doors."],
    ["patio, salones", "courtyard, halls and corridors, forbidden library and the tower ascent."],
    ["Kaelen, guardias corruptos", "Kaelen, corrupted guards and ranged enemies."],
    // Nivel 3
    ["Tras recorrer algunos pasillos", "After walking through some of the castle's corridors, Kaelen reaches a single room with platforms, a red throne, chandeliers, banners and huge columns. The floor and walls crack as the battle progresses."],
    ["Recorrer los últimos pasillos", "Walk the final corridors to the throne room and defeat Malakor in a three-phase battle (the warrior king, the king's shadows and the winged creature) to restore light to the kingdom."],
    ["pasillos finales", "final corridors, throne room doors and throne room."],
    ["Kaelen, Malakor el Corrupto", "Kaelen, Malakor the Corrupt and the shadow minions."],

    // --- Premios ---
    ["Los logros reconocen", "Achievements recognize your progress in the story, your combat skill and your best times."],
    ["Hitos y logros", "Milestones and achievements"],
    ["Reconocimientos por avanzar", "Recognition for progressing through the story."],
    ["Obtener la espada Alborada", "Obtain the sword Alborada"],
    ["Recíbela de Kogan", "Receive it from Kogan in the Dark Forest and become the Hero of Light."],
    ["Conocer a los cuatro aliados", "Meet the four allies"],
    ["Encuentra a Thorne", "Find Thorne, Kogan, Zephyrus and Elara."],
    ["Llegar al Castillo", "Reach Grimcliff Castle"],
    ["Sal del bosque", "Leave the forest and cross the bridge to the courtyard."],
    ["Derribar las puertas", "Break down the black iron doors"],
    ["Abre el paso", "Open the way to the throne room."],
    ["Devolver la luz al reino", "Bring light back to the kingdom"],
    ["Derrota a Malakor y haz", "Defeat Malakor and make dawn rise over Grimcliff."],
    ["Desafíos especiales", "Special challenges"],
    ["Logros opcionales", "Optional achievements for players who want to test their skill."],
    ["Vencer a Malakor sin recibir daño", "Defeat Malakor without taking damage"],
    ["Supera el combate final", "Beat the three-phase final battle without losing any health."],
    ["Reunir todos los fragmentos", "Collect all the light fragments"],
    ["Encuentra los coleccionables", "Find the hidden collectibles in all three levels."],
    ["Sombra del bosque", "Shadow of the forest"],
    ["Cruza el Bosque Oscuro", "Cross the Dark Forest using stealth without being detected."],
    ["Sin elixires", "No elixirs"],
    ["Completa el juego sin", "Complete the game without using Elara's elixirs."],
    ["Recompensas", "Rewards"],
    ["Récords de tiempo", "Time records and recognitions you earn as you progress."],
    ["Récord en el Bosque Oscuro", "Dark Forest record"],
    ["Registra tu mejor tiempo al completar", "Log your best time on completing the first level."],
    ["Récord en el Castillo", "Castle record"],
    ["Registra tu mejor tiempo al llegar", "Log your best time on reaching the throne room doors."],
    ["Récord contra Malakor", "Malakor record"],
    ["Registra tu mejor tiempo en el combate", "Log your best time in the final battle."],
    ["Héroe de la Luz", "Hero of Light"],
    ["Reconocimiento por completar", "Recognition for completing the adventure and restoring the dawn."],

    // --- Manual: títulos, pestañas y teclado ---
    ["Es un juego de acción", "It is a 2D action platformer with a side view and a linear route through three levels: you advance in order and cannot return to previous zones. The Dark Forest works as a tutorial and teaches each mechanic by zone; the Castle challenges you with combat and exploration; and the Throne of Eternal Night tests everything you have learned against Malakor."],
    ["=Controles", "Controls"], ["=Interfaz", "Interface"], ["=Combate", "Combat"],
    ["=Ítems", "Items"], ["=Enemigos", "Enemies"],
    ["Controles (PC)", "Controls (PC)"],
    ["Toca una tecla", "Tap a key or press it on your keyboard to see what it does."],
    ["=Movimiento", "Movement"], ["=Acciones", "Actions"],
    ["=Sigilo", "Stealth"], ["=Izquierda", "Left"], ["=Derecha", "Right"],
    ["=Esquiva", "Dodge"], ["=Salto", "Jump"], ["Espacio", "Space"],
    ["=Ataque", "Attack"], ["=Guardia", "Guard"], ["=Potenciado", "Powered"], ["=Hablar", "Talk"],

    // --- Manual: interfaz ---
    ["Vida y HUD", "Health and HUD"],
    ["Barra de vida, contador", "Health bar, elixir counter, level and zone indicators, and the boss health bar in the final battle. With Alborada, the powered-attack charge bar is added."],
    ["=Barra de vida", "Health bar"], ["=Contador de elixires", "Elixir counter"],
    ["=Nivel y zona", "Level and zone"], ["=Vida del jefe", "Boss health"],
    ["=Carga de Alborada", "Alborada charge"],

    // --- Manual: transformación ---
    ["Transformación", "Transformation"],
    ["Al recibir Alborada", "On receiving Alborada from Kogan, Kaelen becomes the Hero of Light."],
    ["=Armadura arcana", "Arcane armor"], ["Aumenta tu vida máxima", "Increases your maximum health and your resistance."],
    ["=Espada Alborada", "Alborada sword"], ["Mayor daño y alcance", "More damage and reach."],
    ["=Brillo", "Glow"], ["Se intensifica con cada", "Intensifies with every enemy defeated."],

    // --- Manual: combate ---
    ["Rotura de guardia", "Guard break"],
    ["Técnica de Thorne", "A technique from Thorne that breaks the defense of shielded enemies and of Malakor."],

    // --- Manual: ítems ---
    ["Gestión de ítems", "Item management"],
    ["Los ítems son limitados", "Items are limited, use them carefully."],
    ["=Elixires de Elara", "Elara's elixirs"], ["Restauran salud", "Restore health."],
    ["=Runas de Zephyrus", "Zephyrus's runes"], ["De un solo uso", "Single-use: they dispel a magical barrier or absorb a dark magic hit."],
    ["=Llaves", "Keys"], ["Abren las puertas del castillo", "Open the castle doors."],
    ["=Mapa del bosque", "Forest map"], ["Muestra la ruta", "Shows the route to the allies."],
    ["=Fragmentos de luz", "Light fragments"], ["Coleccionables ocultos", "Hidden collectibles that reward exploration."],

    // --- Manual: enemigos y obstáculos ---
    ["Enemigos y escenarios", "Enemies and environments"],
    ["=Obstáculos", "Obstacles"],
    ["=Engendros del bosque", "Forest spawn"], ["=Guardias con lanza o escudo", "Guards with spear or shield"],
    ["=Enemigos a distancia", "Ranged enemies"], ["=Esbirros de sombra", "Shadow minions"],
    ["=Estacas", "Stakes"], ["=Lodo", "Mud"], ["=Barreras mágicas", "Magical barriers"],
    ["=Trampas de fuego (marcadas en rojo)", "Fire traps (marked in red)"],
    ["=Columnas que caen", "Falling columns"], ["=Ondas de choque", "Shockwaves"],

    // --- Descargar ---
    ["Descargar", "Download"],
    ["La app complementaria", "The Nightfall of Grimcliff companion app: check your score, meet the characters, compete in the ranking and connect with the community."],
    ["PUNTAJE", "SCORE"],
    ["Mejores Jugadores", "Top Players"],
    ["1. Jugador1", "1. Player1"], ["2. Jugador2", "2. Player2"], ["3. Jugador3", "3. Player3"],
    ["4. Jugador4", "4. Player4"], ["5. Jugador5", "5. Player5"],
    ["Descubre la oscuridad", "Discover the darkness that rules Grimcliff"],
    ["Foto del personaje", "Character photo"],
    ["Edad: --", "Age: --"],
    ["Puntos fuertes: --", "Strengths: --"],
    ["Puntos débiles: --", "Weaknesses: --"],
    ["Historia: texto provisional.", "Story: placeholder text."],
    ["← Anterior", "← Previous"], ["Siguiente →", "Next →"],
    ["Inicio", "Home"], ["Puntaje", "Score"],
    ["Pantallas de la app móvil", "Mobile app screens."],
    ["Características", "Features"],
    ["Crea tu cuenta", "Create your account and log in with your email."],
    ["Consulta tu puntaje", "Check your score in a dynamic chart."],
    ["Ranking con los 10", "Ranking of the top 10 highest-scoring players."],
    ["Comunidad", "Community: share tips and scores, and send suggestions."],
    ["Fichas de personajes", "Character sheets with age, strengths, weaknesses and story."],
    ["Video promocional", "Promotional game video."],
    ["Acceso directo", "Direct access to this website."],
    ["Ficha de la APK", "APK details"],
    ["Versión", "Version"],
    ["Tamaño", "Size"], ["~50 MB (provisional)", "~50 MB (placeholder)"],
    ["Requiere", "Requires"], ["Android 8.0+ (provisional)", "Android 8.0+ (placeholder)"],
    ["Tipo", "Type"], ["App complementaria", "Companion app"],
    ["Cómo instalar", "How to install"],
    ["Descarga el archivo APK.", "Download the APK file."],
    ["Permite instalar apps", "Allow installing apps from unknown sources when the system asks."],
    ["Abre el archivo descargado", "Open the downloaded file and tap “Install”."],
    ["Crea tu cuenta y comienza", "Create your account and begin the journey."],

    // --- Acerca de ---
    ["Acerca de", "About"],
    ["Equipo desarrollador", "Development team"],
    ["Narrativa y selección", "Narrative and asset selection"],
    ["Programación del videojuego", "Game programming"],
    ["Storyboard e identidad", "Storyboard and visual identity"],
    ["Estructura HTML", "HTML structure, sections and wireframes"],
    ["Aplicación móvil", "Mobile app"],
    ["Maquetación general", "Overall site layout"],

    // --- Aviso de conexión (PWA) ---
    ["Sin conexión: estás viendo", "Offline: you are viewing the saved version."],

    // --- Pie de página ---
    ["© 2026 Nightfall of Grimcliff", "© 2026 Nightfall of Grimcliff - Technological University of Nayarit"],

    // --- Atributos (alt / aria-label / title) ---
    ["Cambiar idioma", "Change language"],
    ["Abrir menú", "Open menu"],
    ["Personaje anterior", "Previous character"],
    ["Personaje siguiente", "Next character"],
    ["Logo de Nightfall", "Nightfall of Grimcliff logo"],
    ["Kaelen frente al castillo", "Kaelen in front of Grimcliff Castle"],

    // --- Historia completa (al presionar "Continuar leyendo...") ---
    ["La tierra entera se sumió", "The entire land sank into a perpetual twilight. The sky was covered by a purplish-gray veil that blocked the sun's rays, and the grief of the villages ravaged by the king's monsters echoed in every corner like an endless echo of despair."],
    ["En una de esas aldeas remotas", "In one of those remote villages, Kaelen was trying to rebuild his life. After a miserable childhood as an orphan in the suburbs of the capital, Kaelen had survived by perfecting the arts of tracking, tactical combat and the use of weapons as a feared bounty hunter on distant frontiers. Tired of violence, he had laid down his arms to farm the land, tend livestock and raise a family in peace. Yet fate dealt him its most brutal blow: Malakor's eradication campaign destroyed his home, reducing his meadows to ashes and taking his loved ones from him."],
    ["Como único sobreviviente, Kaelen desenterró", "As the sole survivor, Kaelen dug up his old hunting tools. Armed at first with modest reinforced leather armor and an unbreakable will, he was reborn not as a mercenary for hire, but as the legendary Knight of Dawn. Determined to wrest the future from tyranny, he ventured into the realms of fear, driven by an unquenchable thirst for justice."],
    ["Capítulo II: Los Aliados", "Chapter II: The Allies of the Gloom"],
    ["El primer paso de su odisea", "The first step of his odyssey led him to the Dark Forest, an inhospitable land where withered vegetation hid hordes of corrupted creatures and ancient secrets waiting to be revealed. Yet Kaelen was not destined to march entirely alone. Along that path steeped in darkness, he crossed paths with outcasts betrayed by the king, noble souls who had chosen to defy fate."],
    ["El primer encuentro crucial", "The first crucial encounter in the forest was with Thorne, the legendary former supreme commander of the imperial army. Thorne, a brilliant strategist whose loyalty to the crown had been legendary, had fallen victim to Malakor's betrayal; the king sent him and his battalion into a suicidal ambush to wipe out any moral opposition in his ranks. With his armor splintered, notched by a thousand battles and covered in ash, a reminder of his fallen men, Thorne wandered like a ghost warrior. Seeing the relentless determination in Kaelen's eyes, the old commander recognized the fire he himself lacked. Thorne shared his fiercest combat techniques with the traveler, teaching him to predict the minions' formations, break impenetrable guards and endure fatigue in the clash of steel against steel."],
    ["Más adelante, en el corazón cavernoso", "Further on, in the cavernous heart of the forest, lay Kogan's hidden lair. In the eyes of the world, Kogan had been a humble armorer from the capital who sold common daggers and shields to adventurers and soldiers. In truth, he was the last heir of an extinct line of arcane blacksmiths, able to channel elemental magic through the anvil. Seeing the kingdom crumble, and having served in his younger years as a bounty hunter alongside hardened men, Kogan decided to reveal his supreme legacy. Working day and night in his mystic forge, he not only reinforced Kaelen's protection with arcane metals resistant to beast claws, but also handed him the masterpiece of his life: Alborada, a majestic sword charged with the mystic essence of the sun the tyrant sought to extinguish. As he wielded it, light coursed through his body and his modest traveler's outfit became dark plate armor, with a great black cape and orange glints on the shoulders and legs. Thus was born the Hero of Light."],
    ["A medida que el Caballero", "As the Knight of Dawn approached the edge of the forest, the dark energies of the castle began to erode Kaelen's sanity. It was then that Zephyrus appeared, a former prodigy of the Imperial Academy of Magic. Zephyrus had been banished into exile by Malakor when his astrological calculations and rune studies warned of the catastrophe the king's demonic pact would bring. After years wandering forgotten ruins and studying ancient carvings, Zephyrus mastered the magic of repulsion. With the wisdom of a wandering sage, he engraved powerful enchantments on Kaelen's equipment, able to deflect cursed energy projectiles and dispel the nightmare mists surrounding the fortress."],
    ["Finalmente, en un refugio oculto", "Finally, in a refuge hidden among the roots of a millennial oak, Kaelen found the comfort of Elara. She had been the palace's chief healer, a compassionate woman who led humanitarian commissions to ease the suffering of epidemics and wars. Unable to be complicit in the massacres committed by Malakor's monsters, Elara had fled to secretly heal dying peasants. With patience and devotion, Elara taught Kaelen the secrets of arcane botanical medicine and the channeling of inner vitality, giving him potions and ointments essential to restore his strength and keep his spirit intact in the hardest battles."],
    ["Unido el saber", "With the strategist's knowledge, the blacksmith's metal, the mage's spell and the healer's blessing united, the Knight of Dawn emerged from the withered forest and stood before the imposing, macabre walls of Grimcliff Castle."],
    ["Capítulo III: El Asedio", "Chapter III: The Siege of Grimcliff and the Ultimate Light"],
    ["Atravesar las pesadas puertas", "Passing through the heavy castle gates marked the start of a war without truce. Inside the fortress, Kaelen was caught in a fierce, relentless struggle, room by room. Thorne's teachings let him cut through legions of demons and corrupted guards; Kogan's armor deflected mortal blows; Zephyrus's enchantments neutralized the magical traps of the royal hallway, and Elara's remedies gave him back his breath when his strength threatened to fade. Every step climbed in the great tower was a tribute to the memory of his village and to the freedom of Grimcliff."],
    ["Por fin, tras derribar", "At last, after breaking down the double doors of oak and black iron, Kaelen burst into the throne room."],
    ["En el corazón del mal", "At the heart of evil, the regent awaited. Malakor still wore the crown and the blue cape of his lineage, but he no longer looked human; armed with a greatsword imbued with abyssal fire, his mere presence withered the marble tiles. The final fight was of titanic proportions. The corrupt king raised his hand and unleashed the energy of the withered land, summoning waves of tormented souls from the depths and launching long-range dark magic attacks. The violence of his attacks unleashed devastating shockwaves that cracked the walls of the hall, demanding from the hero agility and razor-sharp instinct so as not to be consumed by tyranny."],
    ["En medio del duelo", "In the midst of the duel, the king's minions kept emerging from the shadowy corners, keeping Kaelen under suffocating pressure. Losing control of his own darkness, Malakor dropped the greatsword and his body transformed into a winged creature of claws and beak, hovering over the arena. Yet in the darkest hour, the sword Alborada began to pulse with a golden warmth. Kaelen remembered the lessons of his mentors, the suffering of the innocent and the smile of his lost family. Gathering the courage of an entire kingdom, Kaelen blocked a mortal blow from the tyrant, broke Malakor's guard with the technique Thorne had taught him, and drove the radiant blade of Alborada straight into the dark core of the king's chest."],
    ["Un destello cegador", "A blinding flash of pure sunlight burst from the wound, spreading in a shockwave that pulverized the shadows of the throne, destroyed the summoned demons and pierced the roof of the fortress, tearing the purple sky."],
    ["El velo de tinieblas", "The veil of darkness covering Grimcliff vanished instantly. The chains of oppression that had choked the cities broke at once, and the warm glow of the sun bathed the meadows again, making life and peace bloom in every corner of the land."]
].sort((a, b) => b[0].length - a[0].length);   // las claves más largas se prueban primero


// ---------- 2. FUNCIONES AUXILIARES ----------

// Quita espacios y saltos de línea repetidos
const norm = (s) => s.replace(/\s+/g, " ").trim();

// Busca la traducción de un texto (con "=" = coincidencia exacta, sin "=" = empieza con)
const buscar = (t) => EN.find(([es]) => es[0] === "=" ? t === es.slice(1) : t.startsWith(es));


// ---------- 3. RECOLECTAR TEXTOS A TRADUCIR ----------

// Nodos de texto
// Lo marcado con data-no-i18n se traduce por su cuenta (p. ej. el detalle de teclas del Manual).
const nodosTexto = [];
const caminante = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (!n.nodeValue.trim() || n.parentElement.closest("script, style, #btn-idioma, [data-no-i18n]"))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
});
while (caminante.nextNode()) {
    const n = caminante.currentNode;
    const par = buscar(norm(n.nodeValue));
    if (par) nodosTexto.push({ nodo: n, es: n.nodeValue, en: par[1] });
}

// Atributos (alt, aria-label, title)
const nodosAttr = [];
document.querySelectorAll("[alt], [aria-label], [title]").forEach((el) => {
    ["alt", "aria-label", "title"].forEach((a) => {
        if (!el.hasAttribute(a)) return;
        const v = el.getAttribute(a);
        const par = buscar(norm(v));
        if (par) nodosAttr.push({ el, a, es: v, en: par[1] });
    });
});


// ---------- 4. CAMBIO DE IDIOMA ----------

const btnIdioma = document.getElementById("btn-idioma");
let idioma = "es";   // idioma actual (también lo usa index.html)
try { idioma = localStorage.getItem("idioma") || "es"; } catch (e) {}

// Aplica el idioma "es" o "en" a toda la página
function aplicarIdioma(l) {
    nodosTexto.forEach((o) => {
        if (!o.nodo.isConnected) return;   // el visor del carrusel reemplaza algunos textos: se ignoran
        if (l === "en") {
            const ini = o.es.match(/^\s*/)[0], fin = o.es.match(/\s*$/)[0];
            o.nodo.nodeValue = ini + o.en + fin;
        } else {
            o.nodo.nodeValue = o.es;
        }
    });
    nodosAttr.forEach((o) => o.el.setAttribute(o.a, l === "en" ? o.en : o.es));
    document.documentElement.lang = l;
    btnIdioma.textContent = l === "es" ? "ES / ENG" : "ENG / ES";
    try { localStorage.setItem("idioma", l); } catch (e) {}
    // Avisa a los scripts con contenido dinámico (teclado del Manual y visor del carrusel)
    document.dispatchEvent(new Event("idioma-cambiado"));
}

// Botón ES / ENG
btnIdioma.addEventListener("click", () => {
    idioma = idioma === "es" ? "en" : "es";
    aplicarIdioma(idioma);
});

// Al cargar la página, aplica el idioma guardado
aplicarIdioma(idioma);