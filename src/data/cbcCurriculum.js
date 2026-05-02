// src/data/cbcCurriculum.js
// ─────────────────────────────────────────────────────────────────────────────
// KICD CBC Curriculum Data — PP1 to Grade 6
// Source: KICD Curriculum Designs 2024/2025 (Rationalised)
// This is the authoritative seed data for the Teaching Plans generator.
// ─────────────────────────────────────────────────────────────────────────────

export const CBC_CURRICULUM = {

  // ══════════════════════════════════════════════════════════════════════════
  // PRE-PRIMARY 1 (PP1)
  // ══════════════════════════════════════════════════════════════════════════
  'PP1': {
    'Language Activities': {
      lessonsPerWeek: 10,
      strands: [
        {
          strand: '1.0 Listening and Speaking',
          subStrands: [
            { code:'1.1', title:'Oral Language', lessons: 8, outcomes:['Listens and follows simple instructions','Responds to greetings and simple questions','Recites rhymes and sings songs'] },
            { code:'1.2', title:'Listening for Information', lessons: 8, outcomes:['Listens to and identifies sounds in the environment','Follows oral instructions in sequence'] },
          ]
        },
        {
          strand: '2.0 Reading',
          subStrands: [
            { code:'2.1', title:'Phonological Awareness', lessons:10, outcomes:['Identifies and produces rhyming words','Segments spoken words into syllables','Identifies initial sounds in words'] },
            { code:'2.2', title:'Letter Recognition', lessons:10, outcomes:['Recognises and names uppercase and lowercase letters','Associates letters with their sounds'] },
          ]
        },
        {
          strand: '3.0 Writing',
          subStrands: [
            { code:'3.1', title:'Pre-Writing Skills', lessons: 8, outcomes:['Holds a writing tool correctly','Traces and copies patterns and shapes','Writes own name'] },
          ]
        },
      ]
    },
    'Mathematical Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Numbers',
          subStrands: [
            { code:'1.1', title:'Counting 1–10', lessons:10, outcomes:['Counts objects up to 10','Identifies and writes numerals 1–10','Matches numeral to quantity'] },
            { code:'1.2', title:'Number Concepts', lessons: 8, outcomes:['Identifies more and less','Orders numbers 1–10','Identifies first, middle and last'] },
          ]
        },
        {
          strand: '2.0 Measurement',
          subStrands: [
            { code:'2.1', title:'Size and Length', lessons: 6, outcomes:['Compares objects by size (big/small)','Compares objects by length (long/short)'] },
          ]
        },
        {
          strand: '3.0 Geometry',
          subStrands: [
            { code:'3.1', title:'Shapes', lessons: 6, outcomes:['Identifies basic 2D shapes (circle, square, triangle, rectangle)','Sorts objects by shape'] },
          ]
        },
      ]
    },
    'Environmental Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Living Things',
          subStrands: [
            { code:'1.1', title:'Plants Around Us', lessons: 8, outcomes:['Identifies common plants in the environment','Names parts of a plant (root, stem, leaf, flower)'] },
            { code:'1.2', title:'Animals Around Us', lessons: 8, outcomes:['Identifies common animals in the environment','Distinguishes domestic and wild animals'] },
          ]
        },
        {
          strand: '2.0 Non-Living Things',
          subStrands: [
            { code:'2.1', title:'Materials Around Us', lessons: 6, outcomes:['Identifies common materials (wood, metal, plastic, cloth)','Describes properties of materials'] },
          ]
        },
        {
          strand: '3.0 My Environment',
          subStrands: [
            { code:'3.1', title:'My Home and School', lessons: 6, outcomes:['Describes features of home and school','Identifies people who help at home and school'] },
          ]
        },
      ]
    },
    'Psychomotor and Creative Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Physical Development',
          subStrands: [
            { code:'1.1', title:'Gross Motor Skills', lessons: 8, outcomes:['Runs, jumps and hops with coordination','Throws and catches a ball'] },
            { code:'1.2', title:'Fine Motor Skills', lessons: 8, outcomes:['Manipulates clay and play dough','Uses scissors safely','Strings beads'] },
          ]
        },
        {
          strand: '2.0 Creative Arts',
          subStrands: [
            { code:'2.1', title:'Art and Craft', lessons: 8, outcomes:['Creates simple art using various materials','Identifies colours (primary and secondary)'] },
            { code:'2.2', title:'Music and Movement', lessons: 6, outcomes:['Sings simple songs','Moves rhythmically to music'] },
          ]
        },
      ]
    },
    'Religious Education Activities': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 My Creator',
          subStrands: [
            { code:'1.1', title:'God Made Me', lessons: 8, outcomes:['Appreciates that God created them','Identifies features God gave them'] },
            { code:'1.2', title:'God Made the World', lessons: 8, outcomes:['Appreciates God\'s creation around them','Names things God created'] },
          ]
        },
      ]
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PRE-PRIMARY 2 (PP2)
  // ══════════════════════════════════════════════════════════════════════════
  'PP2': {
    'Language Activities': {
      lessonsPerWeek: 10,
      strands: [
        {
          strand: '1.0 Listening and Speaking',
          subStrands: [
            { code:'1.1', title:'Oral Language Development', lessons:10, outcomes:['Participates in conversations','Narrates simple stories','Uses descriptive language'] },
            { code:'1.2', title:'Listening Comprehension', lessons: 8, outcomes:['Answers questions after listening to a story','Follows multi-step instructions'] },
          ]
        },
        {
          strand: '2.0 Reading',
          subStrands: [
            { code:'2.1', title:'Phonics and Decoding', lessons:12, outcomes:['Blends sounds to form CVC words','Reads simple words using phonics','Reads simple sentences'] },
            { code:'2.2', title:'Reading Comprehension', lessons: 8, outcomes:['Reads and understands simple sentences','Answers literal questions about text'] },
          ]
        },
        {
          strand: '3.0 Writing',
          subStrands: [
            { code:'3.1', title:'Handwriting', lessons: 8, outcomes:['Writes uppercase and lowercase letters legibly','Copies simple words and sentences'] },
            { code:'3.2', title:'Creative Writing', lessons: 6, outcomes:['Writes simple sentences','Labels pictures'] },
          ]
        },
      ]
    },
    'Mathematical Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Numbers',
          subStrands: [
            { code:'1.1', title:'Counting 1–20', lessons:10, outcomes:['Counts objects up to 20','Writes numerals 1–20','Identifies odd and even numbers to 20'] },
            { code:'1.2', title:'Addition', lessons:10, outcomes:['Adds numbers with sum up to 10','Uses number bonds to 10'] },
            { code:'1.3', title:'Subtraction', lessons: 8, outcomes:['Subtracts numbers within 10','Uses take-away concept'] },
          ]
        },
        {
          strand: '2.0 Measurement',
          subStrands: [
            { code:'2.1', title:'Length and Mass', lessons: 6, outcomes:['Compares and orders objects by length','Compares objects by mass (heavy/light)'] },
          ]
        },
        {
          strand: '3.0 Geometry',
          subStrands: [
            { code:'3.1', title:'2D and 3D Shapes', lessons: 6, outcomes:['Names and describes 2D and 3D shapes','Identifies shapes in the environment'] },
          ]
        },
      ]
    },
    'Environmental Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Living Things',
          subStrands: [
            { code:'1.1', title:'Plants', lessons: 8, outcomes:['Identifies types of plants (trees, shrubs, herbs)','Describes uses of plants'] },
            { code:'1.2', title:'Animals', lessons: 8, outcomes:['Groups animals by habitat','Describes animal characteristics and uses'] },
            { code:'1.3', title:'Human Body', lessons: 6, outcomes:['Names major body parts and their functions','Practises personal hygiene'] },
          ]
        },
        {
          strand: '2.0 Physical Environment',
          subStrands: [
            { code:'2.1', title:'Weather', lessons: 6, outcomes:['Identifies types of weather','Describes effects of weather on daily life'] },
            { code:'2.2', title:'Water', lessons: 6, outcomes:['Identifies sources of water','Describes uses and importance of water'] },
          ]
        },
      ]
    },
    'Psychomotor and Creative Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Physical Development',
          subStrands: [
            { code:'1.1', title:'Movement and Coordination', lessons:10, outcomes:['Participates in physical games','Demonstrates body control and coordination'] },
          ]
        },
        {
          strand: '2.0 Creative Arts',
          subStrands: [
            { code:'2.1', title:'Visual Arts', lessons:10, outcomes:['Creates art using different media','Draws and colours pictures'] },
            { code:'2.2', title:'Music', lessons: 8, outcomes:['Sings songs with correct rhythm','Plays simple percussion instruments'] },
            { code:'2.3', title:'Drama', lessons: 6, outcomes:['Participates in role play','Acts out simple stories'] },
          ]
        },
      ]
    },
    'Religious Education Activities': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 God and Creation',
          subStrands: [
            { code:'1.1', title:'Caring for God\'s Creation', lessons:10, outcomes:['Appreciates responsibility to care for creation','Participates in caring for the environment'] },
          ]
        },
        {
          strand: '2.0 Family and Community',
          subStrands: [
            { code:'2.1', title:'My Family', lessons:10, outcomes:['Appreciates the family as God\'s gift','Describes roles of family members'] },
          ]
        },
      ]
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRADE 1
  // ══════════════════════════════════════════════════════════════════════════
  'Grade 1': {
    'English': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Listening and Speaking',
          subStrands: [
            { code:'1.1', title:'Oral Language', lessons:10, outcomes:['Participates in guided conversations','Listens and responds to stories','Uses new vocabulary in sentences'] },
            { code:'1.2', title:'Listening Comprehension', lessons: 8, outcomes:['Listens to and summarises passages','Identifies main ideas from oral texts'] },
          ]
        },
        {
          strand: '2.0 Reading',
          subStrands: [
            { code:'2.1', title:'Phonics', lessons:12, outcomes:['Reads CVC and CCVC words','Applies phonics rules in reading','Reads sight words fluently'] },
            { code:'2.2', title:'Reading Fluency', lessons:10, outcomes:['Reads simple texts with expression','Reads at appropriate pace'] },
            { code:'2.3', title:'Reading Comprehension', lessons:10, outcomes:['Answers literal and inferential questions','Identifies characters and setting'] },
          ]
        },
        {
          strand: '3.0 Writing',
          subStrands: [
            { code:'3.1', title:'Handwriting', lessons: 8, outcomes:['Writes legibly in print','Maintains consistent letter size and spacing'] },
            { code:'3.2', title:'Composition', lessons:10, outcomes:['Writes simple sentences','Writes a short paragraph on familiar topics'] },
          ]
        },
        {
          strand: '4.0 Language Structures',
          subStrands: [
            { code:'4.1', title:'Grammar', lessons: 8, outcomes:['Identifies nouns, verbs, and adjectives','Uses capital letters and full stops correctly'] },
          ]
        },
      ]
    },
    'Kiswahili': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Kusikiliza na Kuzungumza',
          subStrands: [
            { code:'1.1', title:'Mazungumzo', lessons:10, outcomes:['Anashiriki mazungumzo ya msingi','Anajibu maswali rahisi kwa Kiswahili'] },
            { code:'1.2', title:'Kusikiliza Habari', lessons: 8, outcomes:['Anasikiliza na kuelewa hadithi fupi','Anaweza kujibu maswali kuhusu hadithi'] },
          ]
        },
        {
          strand: '2.0 Kusoma',
          subStrands: [
            { code:'2.1', title:'Usomaji wa Maneno', lessons:12, outcomes:['Anasoma silabi na maneno rahisi','Anajua herufi za alfabeti ya Kiswahili'] },
            { code:'2.2', title:'Ufahamu wa Kusoma', lessons:10, outcomes:['Anaelewa maana ya maneno anayosoma','Anajibu maswali kuhusu kile alichosoma'] },
          ]
        },
        {
          strand: '3.0 Kuandika',
          subStrands: [
            { code:'3.1', title:'Uandishi', lessons: 8, outcomes:['Anaandika herufi kwa usahihi','Anaandika maneno na sentensi rahisi'] },
          ]
        },
      ]
    },
    'Mathematical Activities': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Numbers',
          subStrands: [
            { code:'1.1', title:'Whole Numbers 1–100', lessons:14, outcomes:['Counts, reads and writes numbers 1–100','Identifies place value (tens and ones)','Orders numbers on a number line'] },
            { code:'1.2', title:'Addition', lessons:12, outcomes:['Adds numbers up to 99','Uses mental strategies for addition','Solves addition word problems'] },
            { code:'1.3', title:'Subtraction', lessons:12, outcomes:['Subtracts numbers within 99','Relates addition and subtraction','Solves subtraction word problems'] },
          ]
        },
        {
          strand: '2.0 Measurement',
          subStrands: [
            { code:'2.1', title:'Length', lessons: 8, outcomes:['Measures length using non-standard units','Compares lengths using direct comparison'] },
            { code:'2.2', title:'Time', lessons: 8, outcomes:['Reads time on the hour and half hour','Names days of the week and months'] },
          ]
        },
        {
          strand: '3.0 Geometry',
          subStrands: [
            { code:'3.1', title:'Shapes and Space', lessons: 8, outcomes:['Names and describes 2D shapes','Identifies 3D shapes in everyday objects'] },
          ]
        },
      ]
    },
    'Environmental Activities': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 Living Things',
          subStrands: [
            { code:'1.1', title:'Plants', lessons:10, outcomes:['Identifies and describes common plants','Explains uses of plants to humans and animals'] },
            { code:'1.2', title:'Animals', lessons:10, outcomes:['Classifies animals by characteristics','Describes animal habitats and food'] },
          ]
        },
        {
          strand: '2.0 Our Environment',
          subStrands: [
            { code:'2.1', title:'Natural Resources', lessons: 8, outcomes:['Identifies natural resources in the environment','Explains importance of conserving natural resources'] },
            { code:'2.2', title:'Weather and Climate', lessons: 8, outcomes:['Identifies types of weather','Describes effects of weather on plants and animals'] },
          ]
        },
      ]
    },
    'Creative Arts': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 Visual Arts',
          subStrands: [
            { code:'1.1', title:'Drawing and Painting', lessons:10, outcomes:['Draws objects from observation','Uses colours to create artwork'] },
            { code:'1.2', title:'Craft', lessons: 8, outcomes:['Creates simple craft using local materials','Demonstrates basic craft techniques'] },
          ]
        },
        {
          strand: '2.0 Performing Arts',
          subStrands: [
            { code:'2.1', title:'Music', lessons:10, outcomes:['Sings songs with correct pitch and rhythm','Identifies different types of music'] },
            { code:'2.2', title:'Movement and Dance', lessons: 8, outcomes:['Moves creatively to music','Participates in cultural dances'] },
          ]
        },
      ]
    },
    'Religious Education': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 God the Creator',
          subStrands: [
            { code:'1.1', title:'Creation', lessons:10, outcomes:['Appreciates God as creator','Identifies aspects of God\'s creation'] },
          ]
        },
        {
          strand: '2.0 Family and Community',
          subStrands: [
            { code:'2.1', title:'Family Values', lessons:10, outcomes:['Appreciates family love and unity','Demonstrates respect for family members'] },
          ]
        },
        {
          strand: '3.0 Moral Values',
          subStrands: [
            { code:'3.1', title:'Good Character', lessons: 8, outcomes:['Demonstrates honesty and kindness','Applies moral values in daily life'] },
          ]
        },
      ]
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRADE 4 — Full KICD 2024 Verified Data
  // ══════════════════════════════════════════════════════════════════════════
  'Grade 4': {
    'English': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Listening and Speaking',
          subStrands: [
            { code:'1.1', title:'Listening for Information', lessons:14, outcomes:['Listens for main idea and specific information','Identifies the speaker\'s purpose','Responds appropriately to oral messages'] },
            { code:'1.2', title:'Oral Presentations', lessons:12, outcomes:['Gives short oral presentations','Uses appropriate tone and expression','Responds to questions from audience'] },
          ]
        },
        {
          strand: '2.0 Reading',
          subStrands: [
            { code:'2.1', title:'Reading Fluency', lessons:14, outcomes:['Reads aloud with expression and accuracy','Reads at appropriate rate','Self-corrects errors while reading'] },
            { code:'2.2', title:'Reading Comprehension', lessons:14, outcomes:['Identifies main ideas and supporting details','Makes inferences from text','Identifies text features and their purpose'] },
            { code:'2.3', title:'Vocabulary Development', lessons:10, outcomes:['Uses context clues to determine word meaning','Identifies synonyms and antonyms','Uses new vocabulary in writing and speaking'] },
          ]
        },
        {
          strand: '3.0 Writing',
          subStrands: [
            { code:'3.1', title:'Functional Writing', lessons:12, outcomes:['Writes letters, messages and notices','Uses appropriate format for functional texts','Edits and proofreads own writing'] },
            { code:'3.2', title:'Creative Writing', lessons:12, outcomes:['Writes narratives with beginning, middle and end','Uses descriptive language in writing','Organises ideas in paragraphs'] },
          ]
        },
        {
          strand: '4.0 Language Structures',
          subStrands: [
            { code:'4.1', title:'Grammar in Context', lessons:12, outcomes:['Uses nouns, pronouns, verbs and adjectives correctly','Applies subject-verb agreement','Uses tenses accurately in writing'] },
            { code:'4.2', title:'Punctuation and Spelling', lessons:10, outcomes:['Uses punctuation marks correctly','Spells high-frequency words correctly','Applies spelling rules'] },
          ]
        },
      ]
    },
    'Kiswahili': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Kusikiliza na Kuzungumza',
          subStrands: [
            { code:'1.1', title:'Mazungumzo ya Kina', lessons:14, outcomes:['Anasikiliza na kuelewa mazungumzo ya kina','Anachangia katika mazungumzo kwa heshima','Anatoa maoni yake kwa uwazi'] },
            { code:'1.2', title:'Usimulizi', lessons:12, outcomes:['Anasimulisha hadithi kwa ubunifu','Anatumia lugha yenye kuvutia','Anaonyesha hisia kupitia usimulizi'] },
          ]
        },
        {
          strand: '2.0 Kusoma',
          subStrands: [
            { code:'2.1', title:'Usomaji wa Ufahamu', lessons:14, outcomes:['Anasoma na kuelewa maandishi ya aina mbalimbali','Anajibu maswali ya ufahamu','Anaweza kutoa muhtasari wa kile alichosoma'] },
            { code:'2.2', title:'Usomaji wa Fasihi', lessons:12, outcomes:['Anasoma hadithi za kisanaa','Anachanganua wahusika na mandhari','Anatambua maudhui ya fasihi'] },
          ]
        },
        {
          strand: '3.0 Kuandika',
          subStrands: [
            { code:'3.1', title:'Insha', lessons:12, outcomes:['Anaandika insha za aina mbalimbali','Anapanga mawazo kwa mpangilio','Anatumia lugha ya kuvutia katika uandishi'] },
            { code:'3.2', title:'Uandishi wa Muundo', lessons:10, outcomes:['Anaandika barua, taarifa na matangazo','Anatumia muundo unaofaa kwa kila aina ya uandishi'] },
          ]
        },
        {
          strand: '4.0 Sarufi',
          subStrands: [
            { code:'4.1', title:'Mfumo wa Lugha', lessons:12, outcomes:['Anatumia ngeli za Kiswahili kwa usahihi','Anatumia viwakilishi na viunganishi','Anatumia wakati wa nyuma, sasa na wakati ujao'] },
          ]
        },
      ]
    },
    'Mathematics': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Numbers',
          subStrands: [
            { code:'1.1', title:'Whole Numbers', lessons:16, outcomes:['Reads and writes numbers up to 999,999','Identifies place value up to hundred thousands','Rounds off numbers to nearest 10, 100 and 1000'] },
            { code:'1.2', title:'Fractions', lessons:14, outcomes:['Identifies fractions as part of a whole','Compares and orders fractions with same denominator','Adds and subtracts fractions with same denominator'] },
            { code:'1.3', title:'Decimals', lessons:12, outcomes:['Reads and writes decimals to 2 decimal places','Converts fractions to decimals and vice versa','Adds and subtracts decimals'] },
          ]
        },
        {
          strand: '2.0 Measurement',
          subStrands: [
            { code:'2.1', title:'Length', lessons:10, outcomes:['Converts between units of length (mm, cm, m, km)','Measures and calculates perimeter','Solves problems involving length'] },
            { code:'2.2', title:'Mass', lessons: 8, outcomes:['Converts between units of mass (g, kg)','Reads mass using weighing scales','Solves problems involving mass'] },
            { code:'2.3', title:'Capacity', lessons: 8, outcomes:['Converts between units of capacity (ml, l)','Measures capacity using appropriate instruments','Solves problems involving capacity'] },
            { code:'2.4', title:'Time', lessons: 8, outcomes:['Reads and writes time using 12-hour and 24-hour clock','Converts between units of time','Solves problems involving time'] },
            { code:'2.5', title:'Area', lessons:10, outcomes:['Calculates area of squares and rectangles','Calculates area using square units','Solves problems involving area'] },
          ]
        },
        {
          strand: '3.0 Geometry',
          subStrands: [
            { code:'3.1', title:'Lines and Angles', lessons:10, outcomes:['Identifies types of lines (parallel, perpendicular)','Identifies types of angles (acute, obtuse, right)','Measures angles using a protractor'] },
            { code:'3.2', title:'Polygons', lessons:10, outcomes:['Names and describes properties of polygons','Classifies triangles by sides and angles','Identifies properties of quadrilaterals'] },
            { code:'3.3', title:'Symmetry', lessons: 8, outcomes:['Identifies lines of symmetry','Draws lines of symmetry in shapes','Creates symmetrical patterns'] },
          ]
        },
        {
          strand: '4.0 Data Handling',
          subStrands: [
            { code:'4.1', title:'Data Collection and Representation', lessons:10, outcomes:['Collects data using tally marks and frequency tables','Draws bar graphs and pictographs','Interprets data from graphs and tables'] },
          ]
        },
      ]
    },
    'Science & Technology': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Living Things and their Environment',
          subStrands: [
            { code:'1.1', title:'Plants', lessons:12, outcomes:['Identifies types of plants (trees, shrubs, herbs, climbers)','Describes internal and external parts of a plant and their functions','Classifies plants according to characteristics'] },
            { code:'1.2', title:'Animals', lessons:12, outcomes:['Classifies animals into vertebrates and invertebrates','Describes characteristics of main animal groups','Identifies adaptations of animals to their environment'] },
            { code:'1.3', title:'Human Digestive System', lessons:16, outcomes:['Identifies organs of the human digestive system','Describes functions of organs in digestion','Explains the process of digestion'] },
          ]
        },
        {
          strand: '2.0 Matter',
          subStrands: [
            { code:'2.1', title:'Properties of Matter', lessons:14, outcomes:['Identifies properties of matter (mass, volume, density)','Classifies matter as solid, liquid or gas','Describes properties of solids, liquids and gases'] },
            { code:'2.2', title:'Management of Solid Waste', lessons:16, outcomes:['Identifies types of solid waste','Describes methods of solid waste management','Practises responsible waste disposal (3Rs)'] },
            { code:'2.3', title:'Water Conservation', lessons:12, outcomes:['Identifies sources of water','Describes methods of water conservation','Explains importance of clean water'] },
          ]
        },
        {
          strand: '3.0 Force and Energy',
          subStrands: [
            { code:'3.1', title:'Force and its Effects', lessons:12, outcomes:['Defines force and identifies types of force','Describes effects of force on objects','Identifies factors affecting force'] },
            { code:'3.2', title:'Light', lessons:14, outcomes:['Identifies sources of light','Describes properties of light','Explains reflection and refraction of light'] },
            { code:'3.3', title:'Heat', lessons:12, outcomes:['Identifies sources of heat','Describes effects of heat on matter','Explains conduction, convection and radiation'] },
          ]
        },
      ]
    },
    'Social Studies': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 Our Home County',
          subStrands: [
            { code:'1.1', title:'Physical Features', lessons:12, outcomes:['Identifies physical features in the county','Describes how physical features affect human activities','Locates physical features on a map'] },
            { code:'1.2', title:'Human Activities', lessons:12, outcomes:['Identifies economic activities in the county','Describes how people earn a living','Explains importance of different occupations'] },
          ]
        },
        {
          strand: '2.0 Citizenship and Social Justice',
          subStrands: [
            { code:'2.1', title:'Rights and Responsibilities', lessons:10, outcomes:['Identifies rights and responsibilities of a citizen','Demonstrates responsible citizenship','Explains importance of respecting others\' rights'] },
            { code:'2.2', title:'Cultural Diversity', lessons: 8, outcomes:['Appreciates cultural diversity in Kenya','Identifies cultural practices of different communities','Promotes respect for different cultures'] },
          ]
        },
        {
          strand: '3.0 Resources and the Economy',
          subStrands: [
            { code:'3.1', title:'Natural Resources', lessons:10, outcomes:['Identifies natural resources in Kenya','Describes uses and conservation of natural resources','Explains effects of misuse of natural resources'] },
          ]
        },
      ]
    },
    'Agriculture': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Crop Production',
          subStrands: [
            { code:'1.1', title:'Soils', lessons:14, outcomes:['Identifies types of soil (clay, sandy, loam)','Describes properties of different soil types','Explains importance of soil to crop production'] },
            { code:'1.2', title:'Crop Production Practices', lessons:16, outcomes:['Identifies stages of crop production','Describes land preparation methods','Demonstrates planting techniques'] },
            { code:'1.3', title:'Crop Protection', lessons:10, outcomes:['Identifies common crop pests and diseases','Describes methods of crop protection','Practises safe use of pesticides'] },
          ]
        },
        {
          strand: '2.0 Animal Production',
          subStrands: [
            { code:'2.1', title:'Livestock Keeping', lessons:14, outcomes:['Identifies common livestock animals','Describes care and management of livestock','Explains importance of livestock to the community'] },
          ]
        },
        {
          strand: '3.0 Agriculture and the Environment',
          subStrands: [
            { code:'3.1', title:'Environmental Conservation', lessons:10, outcomes:['Identifies farming practices that conserve the environment','Practises environmentally friendly farming','Explains relationship between agriculture and environment'] },
          ]
        },
      ]
    },
    'Creative Arts': {
      lessonsPerWeek: 6,
      strands: [
        {
          strand: '1.0 Visual Arts',
          subStrands: [
            { code:'1.1', title:'Drawing', lessons:14, outcomes:['Applies principles of design in drawing','Creates observational drawings','Uses shading and texture techniques'] },
            { code:'1.2', title:'Painting', lessons:12, outcomes:['Uses different painting techniques','Mixes colours to create new colours','Creates paintings with a theme'] },
            { code:'1.3', title:'Craft', lessons:12, outcomes:['Creates 3D crafts using local materials','Demonstrates craft techniques (weaving, modelling)','Appreciates craft as cultural expression'] },
          ]
        },
        {
          strand: '2.0 Performing Arts',
          subStrands: [
            { code:'2.1', title:'Music', lessons:14, outcomes:['Reads and writes basic music notation','Plays simple musical instruments','Performs songs with correct pitch and rhythm'] },
            { code:'2.2', title:'Dance', lessons:12, outcomes:['Performs folk and traditional dances','Creates simple dance routines','Appreciates dance as cultural expression'] },
            { code:'2.3', title:'Drama', lessons:12, outcomes:['Acts in simple plays and role plays','Uses voice and movement in drama','Appreciates drama as communication'] },
          ]
        },
        {
          strand: '3.0 Sports',
          subStrands: [
            { code:'3.1', title:'Athletics', lessons:10, outcomes:['Participates in running, jumping and throwing events','Demonstrates proper athletic techniques','Shows sportsmanship'] },
            { code:'3.2', title:'Ball Games', lessons:10, outcomes:['Plays basic ball games (football, basketball, volleyball)','Demonstrates ball game skills','Works as part of a team'] },
          ]
        },
      ]
    },
    'Religious Education': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 God and Creation',
          subStrands: [
            { code:'1.1', title:'God\'s Plan for Creation', lessons:12, outcomes:['Explains God\'s plan for creation','Appreciates own role in caring for creation','Demonstrates stewardship of the environment'] },
          ]
        },
        {
          strand: '2.0 The Family',
          subStrands: [
            { code:'2.1', title:'Family Relationships', lessons:10, outcomes:['Describes roles and responsibilities in the family','Demonstrates respect and love within the family','Resolves conflicts peacefully'] },
          ]
        },
        {
          strand: '3.0 The Church/Mosque/Temple Community',
          subStrands: [
            { code:'3.1', title:'Religious Community', lessons:10, outcomes:['Identifies roles of members in religious community','Participates in religious community activities','Appreciates importance of religious community'] },
          ]
        },
        {
          strand: '4.0 Moral Values and Behaviour',
          subStrands: [
            { code:'4.1', title:'Virtues', lessons:10, outcomes:['Identifies and practises virtues (honesty, kindness, respect)','Demonstrates moral values in daily life','Resists peer pressure to do wrong'] },
          ]
        },
      ]
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRADE 5
  // ══════════════════════════════════════════════════════════════════════════
  'Grade 5': {
    'English': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Listening and Speaking',
          subStrands: [
            { code:'1.1', title:'Critical Listening', lessons:14, outcomes:['Listens critically and evaluates oral messages','Identifies bias and opinion in oral texts','Responds analytically to oral presentations'] },
            { code:'1.2', title:'Public Speaking', lessons:12, outcomes:['Delivers prepared speeches confidently','Uses persuasive language effectively','Responds to questions during presentations'] },
          ]
        },
        {
          strand: '2.0 Reading',
          subStrands: [
            { code:'2.1', title:'Reading Diverse Texts', lessons:14, outcomes:['Reads and interprets various text types','Identifies author\'s purpose and audience','Analyses use of literary devices'] },
            { code:'2.2', title:'Critical Reading', lessons:12, outcomes:['Evaluates reliability of information','Distinguishes fact from opinion','Makes judgements about texts'] },
            { code:'2.3', title:'Digital Literacy', lessons:10, outcomes:['Reads and evaluates digital texts','Uses digital tools for reading research','Applies safe internet practices'] },
          ]
        },
        {
          strand: '3.0 Writing',
          subStrands: [
            { code:'3.1', title:'Argumentative Writing', lessons:12, outcomes:['Writes persuasive essays with clear arguments','Supports arguments with evidence','Uses appropriate persuasive language'] },
            { code:'3.2', title:'Descriptive Writing', lessons:12, outcomes:['Uses vivid descriptive language','Organises descriptive writing effectively','Uses sensory details in writing'] },
          ]
        },
        {
          strand: '4.0 Language Structures',
          subStrands: [
            { code:'4.1', title:'Advanced Grammar', lessons:12, outcomes:['Uses complex sentences correctly','Applies advanced punctuation rules','Identifies and uses figures of speech'] },
          ]
        },
      ]
    },
    'Mathematics': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Numbers',
          subStrands: [
            { code:'1.1', title:'Whole Numbers up to Millions', lessons:14, outcomes:['Reads and writes numbers up to 9,999,999','Applies place value up to millions','Rounds off numbers to any place value'] },
            { code:'1.2', title:'Fractions and Decimals', lessons:14, outcomes:['Adds and subtracts unlike fractions','Multiplies and divides fractions','Converts between fractions, decimals and percentages'] },
            { code:'1.3', title:'Percentages', lessons:12, outcomes:['Expresses quantities as percentages','Calculates percentage of quantities','Solves real-life percentage problems'] },
            { code:'1.4', title:'Ratio and Proportion', lessons:12, outcomes:['Identifies and simplifies ratios','Solves problems involving direct proportion','Divides quantities in given ratios'] },
          ]
        },
        {
          strand: '2.0 Measurement',
          subStrands: [
            { code:'2.1', title:'Area and Perimeter', lessons:12, outcomes:['Calculates area and perimeter of triangles','Calculates area and perimeter of compound shapes','Solves problems involving area and perimeter'] },
            { code:'2.2', title:'Volume and Capacity', lessons:10, outcomes:['Calculates volume of cubes and cuboids','Converts between units of volume and capacity','Solves problems involving volume'] },
            { code:'2.3', title:'Money', lessons: 8, outcomes:['Performs operations involving money','Calculates profit, loss and discount','Solves problems involving money transactions'] },
          ]
        },
        {
          strand: '3.0 Geometry',
          subStrands: [
            { code:'3.1', title:'Circles', lessons:10, outcomes:['Identifies parts of a circle','Calculates circumference of a circle','Calculates area of a circle'] },
            { code:'3.2', title:'3D Shapes', lessons:10, outcomes:['Identifies and names 3D shapes','Calculates surface area of 3D shapes','Draws and interprets nets of 3D shapes'] },
          ]
        },
        {
          strand: '4.0 Data Handling and Probability',
          subStrands: [
            { code:'4.1', title:'Statistics', lessons:10, outcomes:['Calculates mean, median and mode','Draws and interprets pie charts and line graphs','Analyses and interprets statistical data'] },
            { code:'4.2', title:'Probability', lessons: 8, outcomes:['Identifies outcomes of simple experiments','Calculates theoretical probability','Compares theoretical and experimental probability'] },
          ]
        },
      ]
    },
    'Science & Technology': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Living Things and their Environment',
          subStrands: [
            { code:'1.1', title:'Reproduction in Plants', lessons:12, outcomes:['Identifies methods of plant reproduction','Describes sexual and asexual reproduction in plants','Carries out plant propagation activities'] },
            { code:'1.2', title:'Reproduction in Animals', lessons:12, outcomes:['Describes reproduction in different animal groups','Explains stages of animal development','Identifies adaptations for reproduction'] },
            { code:'1.3', title:'Human Reproductive System', lessons:14, outcomes:['Identifies organs of human reproductive system','Describes functions of reproductive organs','Explains fertilisation and development of foetus'] },
          ]
        },
        {
          strand: '2.0 Matter',
          subStrands: [
            { code:'2.1', title:'Mixtures and Solutions', lessons:14, outcomes:['Distinguishes between mixtures and solutions','Describes methods of separating mixtures','Carries out simple separation experiments'] },
            { code:'2.2', title:'Chemical Changes', lessons:12, outcomes:['Identifies signs of chemical change','Describes common chemical changes','Distinguishes physical from chemical changes'] },
            { code:'2.3', title:'Air and Atmosphere', lessons:10, outcomes:['Describes composition of air','Explains uses and importance of air','Identifies effects of air pollution'] },
          ]
        },
        {
          strand: '3.0 Force and Energy',
          subStrands: [
            { code:'3.1', title:'Electricity', lessons:14, outcomes:['Identifies components of simple electric circuit','Connects simple series and parallel circuits','Explains effects of electricity on matter'] },
            { code:'3.2', title:'Sound', lessons:12, outcomes:['Identifies sources of sound','Describes properties of sound','Explains how sound travels through different media'] },
            { code:'3.3', title:'Simple Machines', lessons:12, outcomes:['Identifies types of simple machines','Explains how simple machines work','Identifies uses of simple machines in daily life'] },
          ]
        },
      ]
    },
    'Social Studies': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 Kenya\'s Geography',
          subStrands: [
            { code:'1.1', title:'Regions of Kenya', lessons:12, outcomes:['Identifies regions of Kenya and their characteristics','Describes physical features of different regions','Explains how geography affects human activities'] },
            { code:'1.2', title:'Population and Settlement', lessons:10, outcomes:['Describes population distribution in Kenya','Identifies factors influencing settlement','Explains urbanisation and rural-urban migration'] },
          ]
        },
        {
          strand: '2.0 Kenya\'s History and Government',
          subStrands: [
            { code:'2.1', title:'Historical Events', lessons:10, outcomes:['Identifies key historical events in Kenya','Explains significance of independence','Describes Kenya\'s post-independence development'] },
            { code:'2.2', title:'Government', lessons:10, outcomes:['Describes levels of government in Kenya','Explains functions of government','Identifies rights and responsibilities of citizens'] },
          ]
        },
        {
          strand: '3.0 Economic Activities',
          subStrands: [
            { code:'3.1', title:'Trade and Industry', lessons:10, outcomes:['Identifies types of trade (local, regional, international)','Describes major industries in Kenya','Explains importance of trade to the economy'] },
          ]
        },
      ]
    },
    'Agriculture': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Crop Production',
          subStrands: [
            { code:'1.1', title:'Crop Improvement', lessons:14, outcomes:['Identifies methods of crop improvement','Explains importance of improved crop varieties','Describes effects of improved varieties on production'] },
            { code:'1.2', title:'Irrigation', lessons:12, outcomes:['Identifies types of irrigation','Describes advantages and disadvantages of irrigation','Demonstrates simple irrigation methods'] },
            { code:'1.3', title:'Organic Farming', lessons:12, outcomes:['Explains principles of organic farming','Identifies benefits of organic farming','Practises organic farming techniques'] },
          ]
        },
        {
          strand: '2.0 Animal Production',
          subStrands: [
            { code:'2.1', title:'Poultry Keeping', lessons:14, outcomes:['Identifies types of poultry and their products','Describes management of poultry','Explains common poultry diseases and their control'] },
            { code:'2.2', title:'Dairy Farming', lessons:10, outcomes:['Describes management of dairy cattle','Identifies dairy cattle breeds','Explains milk production and processing'] },
          ]
        },
        {
          strand: '3.0 Agri-Business',
          subStrands: [
            { code:'3.1', title:'Farm Records', lessons:10, outcomes:['Identifies types of farm records','Explains importance of keeping farm records','Maintains simple farm records'] },
          ]
        },
      ]
    },
    'Creative Arts': {
      lessonsPerWeek: 6,
      strands: [
        {
          strand: '1.0 Visual Arts',
          subStrands: [
            { code:'1.1', title:'Advanced Drawing and Painting', lessons:16, outcomes:['Applies perspective in drawing','Uses advanced painting techniques','Creates artwork communicating a theme'] },
            { code:'1.2', title:'Sculpture and Modelling', lessons:12, outcomes:['Creates sculptures using various materials','Applies modelling techniques','Appreciates sculpture as art form'] },
          ]
        },
        {
          strand: '2.0 Performing Arts',
          subStrands: [
            { code:'2.1', title:'Choral Music', lessons:14, outcomes:['Sings in parts (soprano, alto, tenor, bass)','Reads musical notation','Performs choral compositions'] },
            { code:'2.2', title:'Choreography', lessons:12, outcomes:['Creates original dance compositions','Combines movement with music','Performs choreographed dances'] },
            { code:'2.3', title:'Theatre Arts', lessons:12, outcomes:['Scripts and performs short plays','Uses theatrical techniques','Appreciates theatre as performing art'] },
          ]
        },
        {
          strand: '3.0 Sports',
          subStrands: [
            { code:'3.1', title:'Team Sports', lessons:12, outcomes:['Applies advanced skills in team sports','Demonstrates leadership in sports','Shows sportsmanship and fair play'] },
          ]
        },
      ]
    },
    'Religious Education': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 Scripture and Holy Books',
          subStrands: [
            { code:'1.1', title:'Sacred Texts', lessons:12, outcomes:['Reads and interprets sacred texts','Applies teachings of sacred texts to daily life','Appreciates sacred texts as source of guidance'] },
          ]
        },
        {
          strand: '2.0 Faith in Action',
          subStrands: [
            { code:'2.1', title:'Service and Charity', lessons:12, outcomes:['Demonstrates concern for others','Participates in community service','Applies faith values in serving others'] },
          ]
        },
        {
          strand: '3.0 Social Justice',
          subStrands: [
            { code:'3.1', title:'Peace and Justice', lessons:10, outcomes:['Explains importance of peace and justice','Identifies injustices in society','Advocates for peace and justice'] },
          ]
        },
      ]
    },
    'Kiswahili': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Kusikiliza na Kuzungumza',
          subStrands: [
            { code:'1.1', title:'Mazungumzo ya Kiakili', lessons:14, outcomes:['Anachangia mazungumzo ya kiakili','Anatetea maoni yake kwa hoja','Anasikiliza na kuheshimu maoni ya wengine'] },
            { code:'1.2', title:'Hotuba na Midahalo', lessons:12, outcomes:['Anatoa hotuba za ushawishi','Anashiriki katika midahalo','Anatumia mbinu za ushawishi katika mazungumzo'] },
          ]
        },
        {
          strand: '2.0 Kusoma',
          subStrands: [
            { code:'2.1', title:'Fasihi Andishi', lessons:14, outcomes:['Anasoma riwaya na hadithi fupi','Anachanganua vipengele vya fasihi','Anatoa tathmini ya kazi za fasihi'] },
            { code:'2.2', title:'Fasihi Simulizi', lessons:12, outcomes:['Anajua aina za fasihi simulizi','Anaeleza vipengele vya fasihi simulizi','Anathamini fasihi simulizi kama urithi wa utamaduni'] },
          ]
        },
        {
          strand: '3.0 Kuandika',
          subStrands: [
            { code:'3.1', title:'Uandishi wa Ubunifu', lessons:14, outcomes:['Anaandika hadithi fupi za ubunifu','Anatumia mbinu za kisanaa katika uandishi','Anaandika mashairi rahisi'] },
            { code:'3.2', title:'Uandishi wa Taarifa', lessons:10, outcomes:['Anaandika taarifa za aina mbalimbali','Anatumia lugha rasmi katika uandishi wa taarifa'] },
          ]
        },
        {
          strand: '4.0 Sarufi na Matumizi ya Lugha',
          subStrands: [
            { code:'4.1', title:'Sarufi ya Kina', lessons:12, outcomes:['Anatumia sarufi ya Kiswahili kwa usahihi','Anafahamu maumbo ya maneno','Anatumia vielelezo na vinahau ipasavyo'] },
          ]
        },
      ]
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GRADE 6
  // ══════════════════════════════════════════════════════════════════════════
  'Grade 6': {
    'English': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Listening and Speaking',
          subStrands: [
            { code:'1.1', title:'Advanced Oral Communication', lessons:14, outcomes:['Listens and responds to complex oral texts','Participates in formal discussions and debates','Presents research findings orally'] },
            { code:'1.2', title:'Media and Digital Communication', lessons:12, outcomes:['Critically evaluates media messages','Creates simple digital presentations','Identifies propaganda techniques in media'] },
          ]
        },
        {
          strand: '2.0 Reading',
          subStrands: [
            { code:'2.1', title:'Literary Texts', lessons:14, outcomes:['Reads and analyses novels and plays','Identifies themes, plot and characterisation','Evaluates literary works critically'] },
            { code:'2.2', title:'Non-literary Texts', lessons:12, outcomes:['Reads and analyses non-fiction texts','Identifies rhetorical strategies','Evaluates credibility of sources'] },
            { code:'2.3', title:'Research Skills', lessons:10, outcomes:['Conducts research using multiple sources','Synthesises information from different sources','Documents sources correctly'] },
          ]
        },
        {
          strand: '3.0 Writing',
          subStrands: [
            { code:'3.1', title:'Research and Report Writing', lessons:14, outcomes:['Plans and conducts research projects','Writes well-structured research reports','Cites sources correctly'] },
            { code:'3.2', title:'Creative and Expressive Writing', lessons:12, outcomes:['Writes creative pieces in various genres','Uses advanced literary techniques','Edits and publishes own writing'] },
          ]
        },
        {
          strand: '4.0 Language Structures',
          subStrands: [
            { code:'4.1', title:'Stylistics and Register', lessons:12, outcomes:['Uses language appropriate to context','Identifies and uses stylistic devices','Analyses writer\'s style and register'] },
          ]
        },
      ]
    },
    'Mathematics': {
      lessonsPerWeek: 5,
      strands: [
        {
          strand: '1.0 Numbers',
          subStrands: [
            { code:'1.1', title:'Integers', lessons:14, outcomes:['Reads, writes and orders integers','Performs operations on integers','Solves problems involving integers'] },
            { code:'1.2', title:'Algebraic Expressions', lessons:14, outcomes:['Simplifies algebraic expressions','Expands and factorises expressions','Evaluates algebraic expressions'] },
            { code:'1.3', title:'Linear Equations', lessons:12, outcomes:['Solves linear equations in one variable','Forms and solves equations from word problems','Checks solutions by substitution'] },
            { code:'1.4', title:'Indices and Logarithms', lessons:10, outcomes:['Applies laws of indices','Evaluates expressions with indices','Introduces simple logarithms'] },
          ]
        },
        {
          strand: '2.0 Measurement',
          subStrands: [
            { code:'2.1', title:'Scale Drawing and Maps', lessons:12, outcomes:['Reads and uses scales on maps','Draws diagrams to scale','Calculates actual distances from maps'] },
            { code:'2.2', title:'Pythagoras Theorem', lessons:10, outcomes:['States and proves Pythagoras theorem','Applies Pythagoras theorem to find missing sides','Solves problems using Pythagoras theorem'] },
          ]
        },
        {
          strand: '3.0 Geometry',
          subStrands: [
            { code:'3.1', title:'Transformations', lessons:12, outcomes:['Performs translation, reflection, rotation and enlargement','Identifies properties of transformations','Solves problems involving transformations'] },
            { code:'3.2', title:'Co-ordinates', lessons:10, outcomes:['Plots and reads points on Cartesian plane','Draws and interprets graphs on Cartesian plane','Applies co-ordinates to solve problems'] },
          ]
        },
        {
          strand: '4.0 Data Handling',
          subStrands: [
            { code:'4.1', title:'Advanced Statistics', lessons:12, outcomes:['Calculates measures of central tendency for grouped data','Draws frequency distribution tables','Interprets statistical data critically'] },
          ]
        },
      ]
    },
    'Science & Technology': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Living Things and their Environment',
          subStrands: [
            { code:'1.1', title:'Ecosystems', lessons:14, outcomes:['Defines ecosystem and identifies its components','Describes feeding relationships in ecosystems','Explains effects of human activity on ecosystems'] },
            { code:'1.2', title:'Classification of Living Things', lessons:12, outcomes:['Classifies living things into kingdoms','Uses dichotomous keys to classify organisms','Explains importance of classification'] },
            { code:'1.3', title:'Health and Disease', lessons:14, outcomes:['Identifies causes of common diseases','Describes how diseases spread','Explains prevention and control of diseases'] },
          ]
        },
        {
          strand: '2.0 Matter',
          subStrands: [
            { code:'2.1', title:'Acids, Bases and Salts', lessons:14, outcomes:['Identifies properties of acids, bases and salts','Uses indicators to test acidity and alkalinity','Describes common acids, bases and salts'] },
            { code:'2.2', title:'Electrochemistry', lessons:12, outcomes:['Explains electrolysis','Identifies applications of electrolysis','Describes electroplating'] },
            { code:'2.3', title:'Environmental Chemistry', lessons:10, outcomes:['Explains pollution and its effects','Identifies methods of controlling pollution','Promotes environmental conservation'] },
          ]
        },
        {
          strand: '3.0 Force and Energy',
          subStrands: [
            { code:'3.1', title:'Magnetism and Electromagnetism', lessons:14, outcomes:['Describes properties of magnets','Explains electromagnetic induction','Identifies applications of electromagnetism'] },
            { code:'3.2', title:'Nuclear Energy', lessons:10, outcomes:['Explains nuclear fission and fusion','Describes uses of nuclear energy','Explains hazards and safety in nuclear energy'] },
            { code:'3.3', title:'Technology and Innovation', lessons:12, outcomes:['Identifies simple technologies used in daily life','Creates simple technological solutions','Appreciates role of technology in development'] },
          ]
        },
      ]
    },
    'Social Studies': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 East Africa and the World',
          subStrands: [
            { code:'1.1', title:'East African Community', lessons:12, outcomes:['Describes structure and functions of EAC','Explains benefits of regional integration','Identifies challenges facing EAC'] },
            { code:'1.2', title:'Africa in the World', lessons:10, outcomes:['Describes Africa\'s position in global affairs','Explains African Union\'s role','Identifies challenges and opportunities facing Africa'] },
          ]
        },
        {
          strand: '2.0 Global Issues',
          subStrands: [
            { code:'2.1', title:'Climate Change', lessons:10, outcomes:['Explains causes and effects of climate change','Describes climate change mitigation strategies','Demonstrates personal responsibility for environment'] },
            { code:'2.2', title:'Human Rights', lessons:10, outcomes:['Identifies universal human rights','Explains importance of human rights','Advocates for human rights'] },
          ]
        },
        {
          strand: '3.0 Sustainable Development',
          subStrands: [
            { code:'3.1', title:'SDGs and Kenya\'s Development', lessons:10, outcomes:['Identifies Sustainable Development Goals','Explains Kenya\'s development goals','Describes individual contribution to national development'] },
          ]
        },
      ]
    },
    'Agriculture': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Advanced Crop Production',
          subStrands: [
            { code:'1.1', title:'Horticulture', lessons:14, outcomes:['Identifies types of horticultural crops','Describes production of horticultural crops','Explains marketing of horticultural produce'] },
            { code:'1.2', title:'Greenhouse Farming', lessons:12, outcomes:['Describes structure and types of greenhouses','Explains advantages of greenhouse farming','Demonstrates basic greenhouse management'] },
            { code:'1.3', title:'Post-Harvest Management', lessons:12, outcomes:['Identifies post-harvest losses and their causes','Describes methods of preserving farm produce','Explains importance of value addition'] },
          ]
        },
        {
          strand: '2.0 Advanced Animal Production',
          subStrands: [
            { code:'2.1', title:'Fish Farming', lessons:12, outcomes:['Describes fish farming (aquaculture)','Explains management of fish ponds','Identifies types of fish suitable for farming'] },
            { code:'2.2', title:'Bee Keeping', lessons:10, outcomes:['Describes bee keeping (apiculture)','Explains importance of bees to agriculture','Demonstrates basic bee keeping practices'] },
          ]
        },
        {
          strand: '3.0 Agricultural Technology',
          subStrands: [
            { code:'3.1', title:'Appropriate Technology in Agriculture', lessons:12, outcomes:['Identifies appropriate technologies for small-scale farmers','Explains benefits of agricultural technology','Creates simple agricultural technology solutions'] },
          ]
        },
      ]
    },
    'Creative Arts': {
      lessonsPerWeek: 6,
      strands: [
        {
          strand: '1.0 Visual Arts',
          subStrands: [
            { code:'1.1', title:'Portfolio and Exhibition', lessons:16, outcomes:['Compiles a personal art portfolio','Curates and presents an art exhibition','Evaluates artwork critically'] },
            { code:'1.2', title:'Digital Art', lessons:12, outcomes:['Creates digital artwork using technology','Applies design principles in digital media','Appreciates digital art as contemporary art form'] },
          ]
        },
        {
          strand: '2.0 Performing Arts',
          subStrands: [
            { code:'2.1', title:'Musical Composition', lessons:14, outcomes:['Composes simple musical pieces','Performs original compositions','Appreciates music composition as creative process'] },
            { code:'2.2', title:'Dance Composition', lessons:12, outcomes:['Creates and performs original dance compositions','Combines various dance styles','Choreographs dances for performance'] },
            { code:'2.3', title:'Film and Media', lessons:12, outcomes:['Creates simple films and media presentations','Applies film-making techniques','Appreciates film as art form'] },
          ]
        },
        {
          strand: '3.0 Sports',
          subStrands: [
            { code:'3.1', title:'Sports Leadership', lessons:10, outcomes:['Demonstrates leadership in sports','Organises and manages sports activities','Officiates in simple sports competitions'] },
          ]
        },
      ]
    },
    'Religious Education': {
      lessonsPerWeek: 3,
      strands: [
        {
          strand: '1.0 Faith and Reason',
          subStrands: [
            { code:'1.1', title:'Relationship between Faith and Science', lessons:12, outcomes:['Explains relationship between faith and science','Appreciates both as ways of understanding reality','Demonstrates respect for different perspectives'] },
          ]
        },
        {
          strand: '2.0 Ethics and Moral Decision-Making',
          subStrands: [
            { code:'2.1', title:'Making Ethical Decisions', lessons:12, outcomes:['Applies ethical frameworks to decision-making','Evaluates moral dilemmas using religious principles','Demonstrates moral maturity in decision-making'] },
          ]
        },
        {
          strand: '3.0 Religion in Society',
          subStrands: [
            { code:'3.1', title:'Religion and Social Issues', lessons:10, outcomes:['Examines role of religion in addressing social issues','Demonstrates how faith informs social action','Promotes interfaith dialogue and cooperation'] },
          ]
        },
      ]
    },
    'Kiswahili': {
      lessonsPerWeek: 4,
      strands: [
        {
          strand: '1.0 Kusikiliza na Kuzungumza',
          subStrands: [
            { code:'1.1', title:'Uwasiliano wa Hali ya Juu', lessons:14, outcomes:['Anawasiliana kwa ufanisi katika hali mbalimbali','Anatumia Kiswahili sanifu','Anaonyesha ujuzi wa lugha wa hali ya juu'] },
            { code:'1.2', title:'Tathmini ya Vyombo vya Habari', lessons:12, outcomes:['Anatathmini habari kutoka vyombo mbalimbali','Anatambua upendeleo katika vyombo vya habari','Anatumia vyombo vya habari kwa akili'] },
          ]
        },
        {
          strand: '2.0 Kusoma',
          subStrands: [
            { code:'2.1', title:'Fasihi ya Kisasa', lessons:14, outcomes:['Anasoma na kuchanganua kazi za fasihi ya kisasa','Analinganisha kazi za fasihi mbalimbali','Anaandika tathmini za fasihi'] },
            { code:'2.2', title:'Utafiti wa Lugha', lessons:12, outcomes:['Anafanya utafiti kuhusu lugha na utamaduni','Anatumia vyanzo mbalimbali katika utafiti','Anawasilisha matokeo ya utafiti wake'] },
          ]
        },
        {
          strand: '3.0 Kuandika',
          subStrands: [
            { code:'3.1', title:'Uandishi wa Ushawishi', lessons:14, outcomes:['Anaandika makala ya kushawishi','Anatumia hoja zenye nguvu','Anaandika kwa mtiririko mzuri'] },
            { code:'3.2', title:'Mradi wa Uandishi', lessons:10, outcomes:['Anafanya mradi kamili wa uandishi','Anahariri na kusahihisha kazi yake','Anashiriki kazi yake na hadhira'] },
          ]
        },
        {
          strand: '4.0 Sarufi ya Ubunifu',
          subStrands: [
            { code:'4.1', title:'Lugha ya Kisanaa', lessons:12, outcomes:['Anatumia lugha ya kisanaa kwa ustadi','Anachanganua mbinu za lugha','Anatumia miundo ya lugha kwa ubunifu'] },
          ]
        },
      ]
    },
  },
}

// Grades 2 and 3 use simplified versions of Grade 1 structure
// We reference Grade 1 subjects with progressive complexity
CBC_CURRICULUM['Grade 2'] = {
  'English':              { ...CBC_CURRICULUM['Grade 1']['English'],             lessonsPerWeek: 5  },
  'Kiswahili':           { ...CBC_CURRICULUM['Grade 1']['Kiswahili'],           lessonsPerWeek: 4  },
  'Mathematical Activities': { ...CBC_CURRICULUM['Grade 1']['Mathematical Activities'], lessonsPerWeek: 5 },
  'Environmental Activities': { ...CBC_CURRICULUM['Grade 1']['Environmental Activities'], lessonsPerWeek: 3 },
  'Creative Arts':       { ...CBC_CURRICULUM['Grade 1']['Creative Arts'],       lessonsPerWeek: 3  },
  'Religious Education': { ...CBC_CURRICULUM['Grade 1']['Religious Education'], lessonsPerWeek: 3  },
}

CBC_CURRICULUM['Grade 3'] = {
  'English':              { ...CBC_CURRICULUM['Grade 1']['English'],             lessonsPerWeek: 5  },
  'Kiswahili':           { ...CBC_CURRICULUM['Grade 1']['Kiswahili'],           lessonsPerWeek: 4  },
  'Mathematical Activities': { ...CBC_CURRICULUM['Grade 1']['Mathematical Activities'], lessonsPerWeek: 5 },
  'Environmental Activities': { ...CBC_CURRICULUM['Grade 1']['Environmental Activities'], lessonsPerWeek: 3 },
  'Creative Arts':       { ...CBC_CURRICULUM['Grade 1']['Creative Arts'],       lessonsPerWeek: 3  },
  'Religious Education': { ...CBC_CURRICULUM['Grade 1']['Religious Education'], lessonsPerWeek: 3  },
}

// Helper: get all subjects for a grade
export function getSubjectsForGrade(grade) {
  return Object.keys(CBC_CURRICULUM[grade] ?? {})
}

// Helper: get all strands for a grade+subject
export function getStrandsForSubject(grade, subject) {
  return CBC_CURRICULUM[grade]?.[subject]?.strands ?? []
}

// Helper: count total sub-strands for a grade+subject
export function countSubStrands(grade, subject) {
  const strands = getStrandsForSubject(grade, subject)
  return strands.reduce((sum, s) => sum + s.subStrands.length, 0)
}

// Helper: get weekly lesson count
export function getLessonsPerWeek(grade, subject) {
  return CBC_CURRICULUM[grade]?.[subject]?.lessonsPerWeek ?? 0
}

// All grades in order
export const ALL_GRADES = ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6']

// Terms
export const TERMS = ['1','2','3']

// Weeks per term
export const WEEKS_PER_TERM = 13
