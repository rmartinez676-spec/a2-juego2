// Contenido oficial del temario para el Cuerpo de Gestión de la Administración Civil del Estado (A2).
// Aprobado por el INAP y publicado en el BOE (58 temas oficiales distribuidos en 6 bloques).

export interface SyllabusQuestion {
  prompt: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
  reference?: string;
  legalArticle?: string;
  legalText?: string;
}

export interface SyllabusTopic {
  title: string;
  summary: string;
  npcName: string;
  npcRole: string;
  npcLines: string[];
  tipName: string;
  tipRole: string;
  tipLines: string[];
  boeIds: string[];
  questions: SyllabusQuestion[];
}

export interface SyllabusBlock {
  number: number;
  title: string;
  ministry: string;
  worldName: string;
  description: string;
  theme: string;
  bossName: string;
  bossIntro: string;
  bossStyle: string;
  topics: SyllabusTopic[];
}

export interface BoeSourceSeed {
  boeId: string;
  shortName: string;
}

export const BOE_SOURCES: BoeSourceSeed[] = [
  { boeId: "BOE-A-1978-31229", shortName: "Constitución 1978" },
  { boeId: "BOE-A-2015-10565", shortName: "Ley 39/2015 (LPAC)" },
  { boeId: "BOE-A-2015-10566", shortName: "Ley 40/2015 (LRJSP)" },
  { boeId: "BOE-A-2015-11719", shortName: "TREBEP (RDL 5/2015)" },
  { boeId: "BOE-A-2003-21614", shortName: "LGP (Ley 47/2003)" },
  { boeId: "BOE-A-2017-12902", shortName: "LCSP (Ley 9/2017)" },
  { boeId: "BOE-A-2013-12887", shortName: "Transparencia (Ley 19/2013)" },
  { boeId: "BOE-A-2018-16673", shortName: "LOPDGDD (LO 3/2018)" },
  { boeId: "BOE-A-2007-6115", shortName: "Igualdad (LO 3/2007)" },
  { boeId: "BOE-A-1984-28229", shortName: "Incompatibilidades (Ley 53/1984)" },
  { boeId: "BOE-A-2015-11724", shortName: "LGSS (RDL 8/2015)" },
  { boeId: "BOE-A-1985-5392", shortName: "LBRL (Ley 7/1985)" },
];

export const HUB_NPCS: { name: string; role: string; lines: string[] }[] = [
  {
    name: "Don Ramón",
    role: "Conserje Mayor del INAP",
    lines: [
      "¡Bienvenida a la Plaza de la Administración, Lucía!",
      "Este juego cubre los 6 bloques y los 58 temas oficiales de Gestión Civil del Estado (A2).",
      "Cada tema del temario oficial es ahora un mini mundo completo con sus preguntas oficiales.",
      "Golpea los bloques ? para poner a prueba tu conocimiento y ganar sellos de oro.",
    ],
  },
  {
    name: "Doña Elena",
    role: "Presidenta de la CPS",
    lines: [
      "Al final de cada tema te espera la prueba del ministerio para abrir la siguiente fase.",
      "Al terminar el bloque te enfrentarás al Tribunal Calificador.",
      "¡Mucho éxito en tu preparación para el Cuerpo de Gestión!",
    ],
  },
];

export const TUTORIAL_TITLE = "Plaza de la Administración · Tutorial";

export const SYLLABUS: SyllabusBlock[] = [
  {
    number: 1,
    title: "Organización del Estado y de la Administración Pública",
    ministry: "Congreso de los Diputados y Cortes Generales",
    worldName: "Mundo 1 · Las Cortes y Órganos Constitucionales",
    description: "Constitución de 1978, Derechos Fundamentales, Cortes Generales, Gobierno, Poder Judicial, AGE y Organización Territorial.",
    theme: "congreso",
    bossName: "Señor Quórum",
    bossIntro: "¡Sin quórum no hay sesión y sin dominar la Constitución no hay plaza en el Cuerpo de Gestión! ¡Demuestra tu conocimiento!",
    bossStyle: "quorum",
    topics: [
      {
        title: "Tema 1. La Constitución Española de 1978 y reforma constitucional",
        summary: "Estructura, valores superiores y vías de reforma (arts. 167 y 168 CE).",
        npcName: "Doña Carmen",
        npcRole: "Catedrática de Derecho Constitucional",
        npcLines: ["La Constitución tiene 169 artículos y 10 Títulos.", "El art. 1.1 proclama el Estado social y democrático de Derecho.", "La reforma agravada exige 2/3 de cada Cámara."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 168 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué mayoría exige el principio de reforma agravada del art. 168 CE en cada Cámara?",
            options: ["Mayoría absoluta", "Mayoría de dos tercios", "Mayoría de tres quintos", "Mayoría simple"],
            answer: 1,
            explanation: "El art. 168.1 CE exige 2/3 de cada Cámara y disolución inmediata de las Cortes.",
            reference: "Art. 168 CE",
            legalArticle: "Art. 168.1 CE",
            legalText: "La revisión total o de partes protegidas exige aprobación por mayoría de dos tercios de cada Cámara y disolución de Cortes.",
          }
        ]
      },
      {
        title: "Tema 2. Derechos y deberes fundamentales y Defensor del Pueblo",
        summary: "Garantías constitucionales, recurso de amparo y Ley Orgánica 3/1981.",
        npcName: "Letrado Javier",
        npcRole: "Letrado de las Cortes",
        npcLines: ["Los arts. 14 a 29 y el 30.2 gozan de recurso de amparo ante el TC.", "El Defensor del Pueblo es comisionado de las Cortes.", "Su mandato es de 5 años."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 53.2 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué preceptos constitucionales gozan de tutela mediante recurso de amparo ante el TC?",
            options: ["Todo el Título I", "Los arts. 14 a 29 y la objeción de conciencia del 30.2", "Solo los derechos políticos del art. 23", "Los principios rectores del Cap. III"],
            answer: 1,
            explanation: "El art. 53.2 CE consagra el amparo para los arts. 14 a 29 y 30.2.",
            reference: "Art. 53.2 CE",
            legalArticle: "Art. 53.2 CE",
            legalText: "Cualquier ciudadano podrá recabar la tutela de los derechos de los arts. 14 a 29 y 30 ante el TC por recurso de amparo.",
          }
        ]
      },
      {
        title: "Tema 3. El Tribunal Constitucional. Composición y competencias",
        summary: "Composición (12 miembros), designación y recursos de inconstitucionalidad.",
        npcName: "Magistrado Soto",
        npcRole: "Letrado del Tribunal Constitucional",
        npcLines: ["El TC se compone de 12 miembros nombrados por el Rey.", "El mandato es de 9 años y se renuevan por terceras partes.", "Están legitimados para el recurso de inconstitucionalidad 50 Diputados o 50 Senadores."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 159 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Por cuánto tiempo son nombrados los magistrados del Tribunal Constitucional?",
            options: ["Por 4 años", "Por 9 años con renovación por terceras partes cada 3 años", "Por 5 años renovables", "Con carácter vitalicio"],
            answer: 1,
            explanation: "El art. 159.3 CE fija el mandato de 9 años renovable por tercios cada 3 años.",
            reference: "Art. 159 CE",
            legalArticle: "Art. 159.3 CE",
            legalText: "Los miembros del Tribunal Constitucional serán designados por un período de nueve años y se renovarán por terceras partes cada tres.",
          }
        ]
      },
      {
        title: "Tema 4. La Corona. Funciones constitucionales del Rey y refrendo",
        summary: "Título II CE. Inviolabilidad, orden sucesorio, regencia y refrendo de actos.",
        npcName: "Cronista Real",
        npcRole: "Historiador Constitucional",
        npcLines: ["El Rey es el Jefe del Estado y su persona es inviolable.", "Sus actos son siempre refrendados por el Gobierno o Cortes.", "De los actos del Rey responden las personas que los refrendan."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 64 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Quién refrenda la propuesta y el nombramiento del Presidente del Gobierno?",
            options: ["El Rey personalmente", "El Presidente del Congreso de los Diputados", "El Ministro de la Presidencia", "El Presidente del Senado"],
            answer: 1,
            explanation: "El art. 64.1 in fine CE reserva el refrendo de la investidura al Presidente del Congreso.",
            reference: "Art. 64 CE",
            legalArticle: "Art. 64.1 CE",
            legalText: "La propuesta y el nombramiento del Presidente del Gobierno serán refrendados por el Presidente del Congreso.",
          }
        ]
      },
      {
        title: "Tema 5. Las Cortes Generales: Congreso, Senado y procedimiento legislativo",
        summary: "Bicameralismo, estatuto parlamentario y tramitación de leyes orgánicas y ordinarias.",
        npcName: "Don Anselmo",
        npcRole: "Oficial Mayor de las Cortes",
        npcLines: ["Las Cortes Generales ejercen la potestad legislativa del Estado.", "El Congreso cuenta con 350 Diputados conforme a la LOREG.", "Las Leyes Orgánicas exigen mayoría absoluta del Congreso."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 81.2 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La aprobación de una Ley Orgánica exige en el Congreso de los Diputados:",
            options: ["Mayoría simple", "Mayoría absoluta en una votación final sobre el conjunto del proyecto", "Mayoría de dos tercios", "Mayoría de 3/5"],
            answer: 1,
            explanation: "El art. 81.2 CE exige mayoría absoluta del Congreso para aprobar leyes orgánicas.",
            reference: "Art. 81.2 CE",
            legalArticle: "Art. 81.2 CE",
            legalText: "La aprobación, modificación o derogación de las leyes orgánicas exigirá mayoría absoluta del Congreso en votación final.",
          }
        ]
      },
      {
        title: "Tema 6. El Poder Ejecutivo. Gobierno y relaciones con las Cortes",
        summary: "Ley 50/1997 del Gobierno. Consejo de Ministros, moción de censura y cuestión de confianza.",
        npcName: "Doña Beatriz",
        npcRole: "Secretaria General de Coordinación",
        npcLines: ["El Gobierno dirige la política interior y exterior y la Administración.", "La moción de censura es constructiva y requiere mayoría absoluta.", "La cuestión de confianza se aprueba por mayoría simple."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 113 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La adopción de una moción de censura exige en el Congreso de los Diputados:",
            options: ["Mayoría simple", "Mayoría absoluta", "Mayoría de 3/5", "Mayoría de 2/3"],
            answer: 1,
            explanation: "El art. 113.1 CE establece la exigencia de mayoría absoluta para la moción de censura.",
            reference: "Art. 113 CE",
            legalArticle: "Art. 113.1 CE",
            legalText: "El Congreso de los Diputados puede exigir la responsabilidad política del Gobierno por mayoría absoluta de la moción de censura.",
          }
        ]
      },
      {
        title: "Tema 7. El Poder Judicial. El CGPJ y el Ministerio Fiscal",
        summary: "Principio de unidad jurisdiccional, gobierno de los jueces y principios del Ministerio Fiscal.",
        npcName: "Don Fernando",
        npcRole: "Magistrado Judicial",
        npcLines: ["La justicia emana del pueblo y se administra en nombre del Rey.", "El CGPJ se compone de 20 miembros más el Presidente del TS por 5 años.", "El Ministerio Fiscal actúa bajo unidad de actuación y dependencia jerárquica."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 122 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Cuántos miembros integran el Consejo General del Poder Judicial según el art. 122.3 CE?",
            options: ["12 Vocales", "20 miembros más el Presidente del Tribunal Supremo que lo preside", "15 Magistrados", "25 Vocales elegidos por el Senado"],
            answer: 1,
            explanation: "El art. 122.3 CE fija la composición en el Presidente del TS y 20 miembros por 5 años.",
            reference: "Art. 122 CE",
            legalArticle: "Art. 122.3 CE",
            legalText: "El CGPJ estará integrado por el Presidente del Tribunal Supremo, que lo presidirá, y por veinte miembros nombrados por el Rey por cinco años.",
          }
        ]
      },
      {
        title: "Tema 8. La Administración General del Estado (AGE). Órganos centrales y territoriales",
        summary: "Ley 40/2015. Órganos superiores y directivos. Delegados y Subdelegados del Gobierno.",
        npcName: "Don Valeriano",
        npcRole: "Subdirector General de Recursos",
        npcLines: ["Son órganos superiores: Ministros y Secretarios de Estado.", "Son directivos: Subsecretarios, Directores Generales y Subdirectores.", "Los Subdelegados del Gobierno son nombrados entre funcionarios del Subgrupo A1."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 55 Ley 40/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Según la Ley 40/2015, son órganos superiores de la organización central de la AGE:",
            options: ["Los Subsecretarios y Directores Generales", "Los Ministros y los Secretarios de Estado", "Los Secretarios Generales Técnicos", "Los Delegados del Gobierno"],
            answer: 1,
            explanation: "El art. 55.2 de la Ley 40/2015 clasifica como órganos superiores a Ministros y Secretarios de Estado.",
            reference: "Art. 55 Ley 40/2015",
            legalArticle: "Art. 55.2 Ley 40/2015",
            legalText: "Son órganos superiores de la Administración General del Estado los Ministros y los Secretarios de Estado.",
          }
        ]
      },
      {
        title: "Tema 9. El sector público institucional estatal",
        summary: "Organismos autónomos, entidades públicas empresariales, agencias y fundaciones públicas.",
        npcName: "Doña Irene",
        npcRole: "Auditora del Sector Público",
        npcLines: ["Los organismos autónomos se rigen íntegramente por el Derecho Administrativo.", "Las EPE aplican Derecho Privado salvo en potestades públicas.", "La creación de organismos públicos estatales requiere Ley formal."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 99 Ley 40/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Los organismos autónomos estatales se rigen principalmente por:",
            options: ["El Derecho Privado y mercantil", "El Derecho Administrativo", "El Derecho Laboral exclusivamente", "Los estatutos de sociedades anónimas"],
            answer: 1,
            explanation: "El art. 99 de la Ley 40/2015 prescribe el régimen general de Derecho Administrativo.",
            reference: "Art. 99 Ley 40/2015",
            legalArticle: "Art. 99 Ley 40/2015",
            legalText: "Los organismos autónomos son entidades de derecho público que se rigen por el Derecho administrativo.",
          }
        ]
      },
      {
        title: "Tema 10. Organización territorial (I): Comunidades Autónomas y Estatutos",
        summary: "Título VIII CE. Distribución de competencias (arts. 148 y 149 CE) y art. 155 CE.",
        npcName: "Don Salvador",
        npcRole: "Letrado Autonómico",
        npcLines: ["El Estatuto de Autonomía es la norma institucional básica de la CCAA.", "El art. 149.1 CE fija competencias exclusivas del Estado.", "La aplicación del art. 155 CE requiere autorización por mayoría absoluta del Senado."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 149 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Las materias no atribuidas expresamente al Estado por la Constitución corresponden:",
            options: ["Al Estado de forma residual", "A las CCAA en virtud de sus respectivos Estatutos de Autonomía", "A la Unión Europea", "A las Provincias"],
            answer: 1,
            explanation: "El art. 149.3 CE establece que las materias no asumidas por Estatuto corresponden al Estado.",
            reference: "Art. 149 CE",
            legalArticle: "Art. 149.3 CE",
            legalText: "Las materias no atribuidas expresamente al Estado podrán corresponder a las Comunidades Autónomas en sus Estatutos.",
          }
        ]
      },
      {
        title: "Tema 11. Organización territorial (II): La Administración Local. Municipio y Provincia",
        summary: "Ley 7/1985 (LBRL). Órganos de gobierno local, competencias municipales y provinciales.",
        npcName: "Don Justo",
        npcRole: "Secretario de Administración Local",
        npcLines: ["El Municipio es la entidad básica territorial.", "Son órganos necesarios: Alcalde, Tenientes de Alcalde y Pleno.", "La Junta de Gobierno Local es obligatoria en municipios de más de 5.000 habitantes."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 20 LBRL"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La Junta de Gobierno Local existe obligatoriamente en los municipios de población superior a:",
            options: ["1.000 habitantes", "5.000 habitantes", "20.000 habitantes", "50.000 habitantes"],
            answer: 1,
            explanation: "El art. 20.1.b) de la Ley 7/1985 fija el umbral general de 5.000 habitantes.",
            reference: "Art. 20 LBRL",
            legalArticle: "Art. 20.1.b) Ley 7/1985",
            legalText: "La Junta de Gobierno Local existe en todos los municipios con población superior a 5.000 habitantes.",
          }
        ]
      }
    ]
  },
  {
    number: 2,
    title: "Unión Europea",
    ministry: "Ministerio de Asuntos Exteriores y Comisión Europea",
    worldName: "Mundo 2 · El Eurodistrito y las Instituciones Europeas",
    description: "Tratados TUE y TFUE, Instituciones Comunitarias, Fuentes del Derecho Europeo, Presupuesto y Políticas Comunitarias.",
    theme: "bruselas",
    bossName: "Comisario Klaus",
    bossIntro: "¡Bienvenida a Bruselas! El ordenamiento jurídico comunitario prevalece sobre el Derecho interno. ¡Demuestra que dominas los Tratados!",
    bossStyle: "comisario",
    topics: [
      {
        title: "Tema 1. La Unión Europea: tratados originarios y modificativos. TUE y TFUE",
        summary: "De Roma a Lisboa. Naturaleza jurídica y el art. 50 TUE sobre retirada.",
        npcName: "Comisario Klaus",
        npcRole: "Experto Comunitario",
        npcLines: ["El Tratado de Lisboa otorgó a la UE personalidad jurídica única.", "El TUE y el TFUE tienen el mismo valor jurídico.", "El art. 50 TUE regula la retirada de un Estado miembro."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 47 TUE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué Tratado otorgó formalmente a la Unión Europea personalidad jurídica única internacional?",
            options: ["Tratado de Maastricht", "Tratado de Lisboa", "Tratado de Niza", "Acta Única Europea"],
            answer: 1,
            explanation: "El Tratado de Lisboa confirió personalidad jurídica única a la UE en el art. 47 TUE.",
            reference: "Art. 47 TUE",
            legalArticle: "Art. 47 TUE",
            legalText: "La Unión tiene personalidad jurídica.",
          }
        ]
      },
      {
        title: "Tema 2. La organización de la UE (I): Consejo Europeo, Consejo y Comisión",
        summary: "Composición, funciones y procedimiento de mayoría cualificada en el Consejo.",
        npcName: "Madame Dubois",
        npcRole: "Consejera Comunitaria",
        npcLines: ["El Consejo Europeo define orientaciones políticas y no legisla.", "La Comisión ostenta el monopolio general de la iniciativa legislativa.", "La mayoría cualificada exige 55% de Estados y 65% de la población."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 16.4 TUE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La mayoría cualificada en el Consejo de la Unión Europea requiere un mínimo de:",
            options: ["50% de Estados y 50% de población", "55% de Estados miembros que reúnan el 65% de la población de la Unión", "60% de Estados y 70% de población", "Dos tercios de Estados"],
            answer: 1,
            explanation: "El art. 16.4 TUE consagra la regla de doble mayoría del 55% de Estados y 65% de población.",
            reference: "Art. 16.4 TUE",
            legalArticle: "Art. 16.4 TUE",
            legalText: "La mayoría cualificada se definirá como un mínimo del 55% de los miembros del Consejo que representen al menos el 65% de la población.",
          }
        ]
      },
      {
        title: "Tema 3. La organización de la UE (II): Parlamento Europeo, TJUE, Tribunal de Cuentas y BCE",
        summary: "Instituciones de control y judiciales. La cuestión prejudicial del art. 267 TFUE.",
        npcName: "Letrada Van Der Berg",
        npcRole: "Letrada del TJUE",
        npcLines: ["El Parlamento Europeo se elige por sufragio directo cada 5 años.", "La cuestión prejudicial garantiza la interpretación uniforme del Derecho UE.", "El BCE emite la moneda única y conduce la política monetaria."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 267 TFUE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El mecanismo de la cuestión prejudicial ante el TJUE se regula en:",
            options: ["Art. 114 CE", "Art. 267 del TFUE", "Art. 50 del TUE", "Art. 39 LPAC"],
            answer: 1,
            explanation: "El art. 267 TFUE regula el reenvío prejudicial de los jueces nacionales al TJUE.",
            reference: "Art. 267 TFUE",
            legalArticle: "Art. 267 TFUE",
            legalText: "El Tribunal de Justicia de la Unión Europea será competente para pronunciarse con carácter prejudicial sobre la interpretación de los Tratados.",
          }
        ]
      },
      {
        title: "Tema 4. Fuentes del Derecho de la Unión Europea: primacía y efecto directo",
        summary: "Reglamentos, directivas y decisiones (art. 288 TFUE). Principios de eficacia comunitaria.",
        npcName: "Profesor Del Moral",
        npcRole: "Catedrático de Derecho Internacional",
        npcLines: ["El Reglamento tiene alcance general y es directamente aplicable.", "La Directiva obliga al resultado y requiere transposición nacional.", "El principio de primacía desplaza a la norma nacional incompatible."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 288 TFUE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El acto jurídico europeo que tiene alcance general y es directamente aplicable en cada Estado miembro es:",
            options: ["La Directiva", "El Reglamento", "El Dictamen motivado", "La Recomendación"],
            answer: 1,
            explanation: "El art. 288, párr. 2º TFUE define el Reglamento como obligatorio y directamente aplicable.",
            reference: "Art. 288 TFUE",
            legalArticle: "Art. 288 TFUE",
            legalText: "El reglamento tendrá un alcance general. Será obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro.",
          }
        ]
      },
      {
        title: "Tema 5. El presupuesto de la Unión Europea y Fondos Europeos",
        summary: "Marco Financiero Plurianual (MFP), principio de equilibrio presupuestario y Fondos Estructurales.",
        npcName: "Don Bruno",
        npcRole: "Analista Presupuestario de la UE",
        npcLines: ["En el presupuesto de la UE los ingresos y gastos deben estar equilibrados.", "El MFP se aprueba para períodos de al menos 5 años (septenal).", "FEDER y FSE+ fomentan la cohesión territorial y social."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 310 TFUE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "En virtud del principio de equilibrio presupuestario del artículo 310 del TFUE:",
            options: ["Los ingresos y los gastos del presupuesto deberán estar equilibrados", "Se permite déficit ordinario hasta el 5%", "El BCE financia déficits directamente", "No existe límite presupuestario"],
            answer: 0,
            explanation: "El art. 310.1 TFUE prohíbe el déficit formal en el presupuesto de la Unión.",
            reference: "Art. 310 TFUE",
            legalArticle: "Art. 310.1 TFUE",
            legalText: "En el presupuesto, los ingresos y los gastos deberán estar equilibrados.",
          }
        ]
      },
      {
        title: "Tema 6. Políticas de la Unión Europea: mercado interior y PESC",
        summary: "Las 4 libertades (mercancías, personas, servicios, capitales), zona euro y espacio Schengen.",
        npcName: "Embajador Rivas",
        npcRole: "Representante Permanente",
        npcLines: ["El mercado interior garantiza la libre circulación cuádruple.", "El acuerdo Schengen suprime controles en fronteras interiores.", "La PESC se decide por regla general de unanimidad."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 26 TFUE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El mercado interior implica un espacio sin fronteras interiores con libre circulación de:",
            options: ["Mercancías, personas, servicios y capitales", "Bienes muebles e inmuebles únicamente", "Empresas públicas exclusivamente", "Solo mercancías y capitales"],
            answer: 0,
            explanation: "El art. 26.2 TFUE formula las cuatro libertades fundamentales del mercado interior.",
            reference: "Art. 26 TFUE",
            legalArticle: "Art. 26.2 TFUE",
            legalText: "El mercado interior implicará un espacio sin fronteras interiores con libre circulación de mercancías, personas, servicios y capitales.",
          }
        ]
      }
    ]
  },
  {
    number: 3,
    title: "Políticas Públicas",
    ministry: "Ministerio para la Transformación Digital y Función Pública",
    worldName: "Mundo 3 · Políticas Públicas y Modernización",
    description: "Administración Electrónica, Política Económica, Transparencia Ley 19/2013, Protección de Datos e Igualdad LO 3/2007.",
    theme: "inap",
    bossName: "Directora General de Políticas",
    bossIntro: "¡Las políticas públicas transforman la sociedad! Del Gobierno Abierto a la igualdad efectiva: ¿sabes aplicar la normativa?",
    bossStyle: "tribunal",
    topics: [
      {
        title: "Tema 1. Políticas de modernización y Administración electrónica",
        summary: "Sede electrónica, firma digital y Esquema Nacional de Seguridad (RD 311/2022).",
        npcName: "Doña Clara",
        npcRole: "Directora de Modernización",
        npcLines: ["Personas jurídicas y profesionales colegiados están obligados al medio electrónico.", "El ENS fija requisitos mínimos de seguridad.", "El PAGe unifica los trámites estatales."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 14 Ley 39/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Quiénes están obligados en todo caso a relacionarse por medios electrónicos con las AAPP?",
            options: ["Todas las personas físicas", "Las personas jurídicas y entidades sin personalidad jurídica", "Solo los funcionarios A1", "Exclusivamente empresas del IBEX"],
            answer: 1,
            explanation: "El art. 14.2 de la Ley 39/2015 obliga a personas jurídicas y entidades sin personalidad.",
            reference: "Art. 14 Ley 39/2015",
            legalArticle: "Art. 14.2 Ley 39/2015",
            legalText: "Estarán obligados a relacionarse a través de medios electrónicos las personas jurídicas y entidades sin personalidad jurídica.",
          }
        ]
      },
      {
        title: "Tema 2. Política económica y presupuestaria en España y en la UE",
        summary: "Semestre Europeo y Plan de Recuperación, Transformación y Resiliencia (NextGenEU).",
        npcName: "Don Rodrigo",
        npcRole: "Economista del Estado",
        npcLines: ["El PRTR canaliza los fondos europeos Next Generation EU.", "Se articula en 4 transformaciones transversales.", "Incluye 10 políticas palanca de modernización."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: RDL 36/2020"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Los fondos europeos extraordinarios de recuperación tras la pandemia se denominan:",
            options: ["Next Generation EU", "Fondo Monetario Europeo", "Plan Marshall 2", "MEDE"],
            answer: 0,
            explanation: "Next Generation EU es el fondo temporal extraordinario de la UE para resiliencia y transición digital y verde.",
            reference: "RDL 36/2020",
            legalArticle: "Reglamento UE 2021/241",
            legalText: "El Mecanismo de Recuperación y Resiliencia financia reformas e inversiones públicas.",
          }
        ]
      },
      {
        title: "Tema 3. Política ambiental, biodiversidad y cambio climático",
        summary: "Ley 7/2021 de Cambio Climático y Transición Energética. Objetivos de descarbonización a 2050.",
        npcName: "Inspectora Verde",
        npcRole: "Técnica de Calidad Ambiental",
        npcLines: ["El art. 45 CE consagra el derecho al medio ambiente.", "España debe alcanzar la neutralidad climática antes de 2050.", "Los municipios de más de 50.000 habitantes implantan zonas de bajas emisiones."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Ley 7/2021"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Conforme a la Ley 7/2021, ¿en qué año debe alcanzar España la neutralidad climática?",
            options: ["En 2030", "A más tardar en el año 2050", "En 2040", "En 2060"],
            answer: 1,
            explanation: "El art. 3.1 de la Ley 7/2021 fija como meta vinculante la neutralidad climática antes de 2050.",
            reference: "Ley 7/2021",
            legalArticle: "Art. 3.1 Ley 7/2021",
            legalText: "Antes de 2050 España deberá alcanzar la neutralidad climática.",
          }
        ]
      },
      {
        title: "Tema 4. La Seguridad Social en España: principios, estructura y financiación",
        summary: "RDL 8/2015 (TRLGSS). Entidades gestoras: INSS, TGSS e ISM. Carencia de jubilación.",
        npcName: "Don Andrés",
        npcRole: "Interventor de la Seguridad Social",
        npcLines: ["El INSS gestiona las prestaciones económicas.", "La TGSS gestiona la caja única y cotizaciones.", "La pensión contributiva de jubilación exige 15 años de cotización."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 66 TRLGSS"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué entidad gestora tiene atribuida la gestión de las prestaciones económicas de la Seguridad Social?",
            options: ["La Tesorería General (TGSS)", "El Instituto Nacional de la Seguridad Social (INSS)", "El SEPE", "La Agencia Tributaria"],
            answer: 1,
            explanation: "El art. 66 del TRLGSS encomienda al INSS la gestión de las prestaciones económicas contributivas.",
            reference: "Art. 66 TRLGSS",
            legalArticle: "Art. 66.1 TRLGSS",
            legalText: "El Instituto Nacional de la Seguridad Social tiene atribuida la gestión y administración de las prestaciones económicas.",
          }
        ]
      },
      {
        title: "Tema 5. Políticas de empleo y Sistema Nacional de Empleo",
        summary: "Ley 3/2023 de Empleo. La Agencia Española del Empleo y la Cartera Común de Servicios.",
        npcName: "Orientadora Marta",
        npcRole: "Técnica de Empleo",
        npcLines: ["La Ley 3/2023 crea la Agencia Española del Empleo.", "La Cartera Común de Servicios garantiza atención individualizada.", "Se prioriza la empleabilidad juvenil y formación continua."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Ley 3/2023"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La norma que regula actualmente el Sistema Nacional de Empleo en España es:",
            options: ["La Ley 3/2023, de 28 de febrero, de Empleo", "La Ley 19/2013", "La Ley 58/2003", "La Ley 7/1985"],
            answer: 0,
            explanation: "La Ley 3/2023 derogó la anterior legislación ordenando las políticas activas de empleo.",
            reference: "Ley 3/2023",
            legalArticle: "Art. 1 Ley 3/2023",
            legalText: "Esta ley tiene por objeto promover y desarrollar una política de empleo integral.",
          }
        ]
      },
      {
        title: "Tema 6. Política de inmigración, extranjería y asilo",
        summary: "Ley Orgánica 4/2000. Estancia, residencia temporal, residencia de larga duración y asilo.",
        npcName: "Don Gonzalo",
        npcRole: "Jefe de Extranjería",
        npcLines: ["La estancia ampara hasta 90 días.", "La residencia temporal dura más de 90 días hasta 5 años.", "La larga duración exige 5 años de residencia legal continuada."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 32 LO 4/2000"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Para acceder a la residencia de larga duración en España se exige residencia continuada de:",
            options: ["Dos años", "Tres años", "Cinco años", "Diez años"],
            answer: 2,
            explanation: "El art. 32 de la LO 4/2000 establece el requisito general de cinco años de residencia legal continuada.",
            reference: "Art. 32 LO 4/2000",
            legalArticle: "Art. 32 LO 4/2000",
            legalText: "Tendrán derecho a residencia de larga duración quienes hayan residido temporalmente durante cinco años de forma continuada.",
          }
        ]
      },
      {
        title: "Tema 7. Gobierno Abierto y Ley 19/2013 de Transparencia",
        summary: "Publicidad activa, derecho de acceso a la información pública y Consejo de Transparencia.",
        npcName: "Comisionado Méndez",
        npcRole: "Vocal de Transparencia",
        npcLines: ["La solicitud de información se resuelve en el plazo máximo de 1 mes.", "El silencio administrativo ante solicitudes de acceso es NEGATIVO.", "El Consejo de Transparencia resuelve las reclamaciones potestativas."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 20 Ley 19/2013"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Según la Ley 19/2013, si transcurre el plazo para resolver sin notificación, la solicitud de acceso:",
            options: ["Se entiende estimada por silencio positivo", "Se entiende desestimada por silencio negativo", "Caduca de oficio", "Se prorroga 6 meses"],
            answer: 1,
            explanation: "El art. 20.4 de la Ley 19/2013 establece que la falta de resolución expresa tiene efecto desestimatorio.",
            reference: "Art. 20 Ley 19/2013",
            legalArticle: "Art. 20.4 Ley 19/2013",
            legalText: "Transcurrido el plazo máximo para resolver sin notificación se entenderá que la solicitud ha sido desestimada.",
          }
        ]
      },
      {
        title: "Tema 8. Protección de datos de carácter personal: RGPD y LO 3/2018",
        summary: "Principios del tratamiento, derechos de los interesados, Delegado de Protección (DPO) y AEPD.",
        npcName: "Delegado de Protección",
        npcRole: "DPO de la AGE",
        npcLines: ["El principio de responsabilidad proactiva exige demostrar el cumplimiento.", "El DPO es obligatorio en las Administraciones Públicas.", "La LO 3/2018 protege derechos digitales como la desconexión laboral."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 37 RGPD"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La designación de un Delegado de Protección de Datos (DPD/DPO) en las Administraciones Públicas es:",
            options: ["Optativa y voluntaria", "Obligatoria en todo caso", "Solo obligatoria si superan 1.000 empleados", "Prohibida por austeridad"],
            answer: 1,
            explanation: "El art. 37.1.a) del RGPD impone DPO obligatorio a toda autoridad u organismo público.",
            reference: "Art. 37 RGPD",
            legalArticle: "Art. 37.1.a) RGPD",
            legalText: "El responsable y el encargado del tratamiento designarán un delegado de protección de datos siempre que el tratamiento lo lleve a cabo una autoridad pública.",
          }
        ]
      },
      {
        title: "Tema 9. Políticas de igualdad efectiva (LO 3/2007) y violencia de género",
        summary: "Principio de transversalidad, composición equilibrada (40%-60%) y planes de igualdad.",
        npcName: "Doña Mercedes",
        npcRole: "Unidad de Igualdad",
        npcLines: ["La composición equilibrada sitúa la representación de cada sexo entre el 40% y el 60%.", "Todo proyecto normativo del Gobierno incluye informe de impacto de género.", "Las Administraciones aprueban planes de igualdad periódicos."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: DA 1ª LO 3/2007"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué porcentaje define la composición o presencia equilibrada según la Ley Orgánica 3/2007?",
            options: ["Exactamente 50% de cada sexo", "Que ningún sexo supere el 60% ni baje del 40%", "Al menos 30% del sexo infrarrepresentado", "Libre criterio directivo"],
            answer: 1,
            explanation: "La DA 1ª de la LO 3/2007 establece la horquilla 40%-60% para la composición equilibrada.",
            reference: "DA 1ª LO 3/2007",
            legalArticle: "DA 1ª LO 3/2007",
            legalText: "Se entenderá por composición equilibrada que ningún sexo supere el sesenta por ciento ni sea menos del cuarenta por ciento.",
          }
        ]
      },
      {
        title: "Tema 10. Otras políticas públicas: Sistema Nacional de Salud y Dependencia",
        summary: "Ley 14/1986 General de Sanidad y Ley 39/2006 de Promoción de la Autonomía y Dependencia.",
        npcName: "Doctor Casado",
        npcRole: "Director de Servicios Asistenciales",
        npcLines: ["La sanidad pública se financia por tributos y es universal.", "La Ley 39/2006 clasifica la dependencia en Grados I, II y III.", "Las Áreas de Salud son las estructuras territoriales sanitarias."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 26 Ley 39/2006"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Cómo se clasifican los grados de dependencia en el artículo 26 de la Ley 39/2006?",
            options: ["Leve, media y grave", "Grado I: Moderada; Grado II: Severa; Grado III: Gran dependencia", "Nivel 1, 2 y 3 laboral", "Grado parcial y absoluto"],
            answer: 1,
            explanation: "El art. 26 de la Ley 39/2006 establece Grado I (moderada), Grado II (severa) y Grado III (gran dependencia).",
            reference: "Art. 26 Ley 39/2006",
            legalArticle: "Art. 26.1 Ley 39/2006",
            legalText: "La situación de dependencia se clasificará en: Grado I. Dependencia moderada; Grado II. Dependencia severa; Grado III. Gran dependencia.",
          }
        ]
      }
    ]
  },
  {
    number: 4,
    title: "Derecho Administrativo General",
    ministry: "Ministerio de la Presidencia, Justicia y Relaciones con las Cortes",
    worldName: "Mundo 4 · El Palacio de Justicia y los Tribunales",
    description: "Ley 39/2015 LPAC, Ley 40/2015 LRJSP, Contratos del Sector Público LCSP 9/2017, Responsabilidad Patrimonial y Recursos.",
    theme: "justicia",
    bossName: "Jueza de Alzada",
    bossIntro: "¡El acto administrativo que vulnere el ordenamiento es nulo de pleno derecho! ¿Conoces la Ley 39/2015 al dedillo?",
    bossStyle: "jueza",
    topics: [
      {
        title: "Tema 1. Fuentes del Derecho Administrativo y principio de legalidad",
        summary: "Jerarquía normativa (art. 9.3 CE y Ley 40/2015), reserva de ley y principios generales.",
        npcName: "Doña Victoria",
        npcRole: "Magistrada de lo Contencioso",
        npcLines: ["La jerarquía de fuentes: Constitución, Leyes, Reglamentos y Principios Generales.", "El principio de legalidad vincula a la Administración a la Ley y al Derecho.", "Las costumbres solo rigen en defecto de ley aplicable."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 9.3 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El principio que garantiza la primacía de la ley y el sometimiento de los poderes públicos es:",
            options: ["Principio de legalidad y jerarquía normativa", "Principio de autonomía local", "Principio de delegación de firma", "Principio de gratuidad judicial"],
            answer: 0,
            explanation: "El art. 9.3 CE consagra el principio de legalidad y jerarquía normativa como pilares del ordenamiento.",
            reference: "Art. 9.3 CE",
            legalArticle: "Art. 9.3 CE",
            legalText: "La Constitución garantiza el principio de legalidad, la jerarquía normativa, la publicidad de las normas y la seguridad jurídica.",
          }
        ]
      },
      {
        title: "Tema 2. La Ley y normas con rango de ley: Decretos-leyes y Decretos Legislativos",
        summary: "Leyes orgánicas, ordinarias, Decretos-leyes (art. 86 CE) y Decretos Legislativos (arts. 82-85 CE).",
        npcName: "Letrado García",
        npcRole: "Letrado del Consejo de Estado",
        npcLines: ["El Decreto-ley exige extraordinaria y urgente necesidad.", "No puede afectar a instituciones del Estado, derechos del Título I ni régimen electoral.", "El Decreto Legislativo se aprueba previa delegación por Ley de Bases o refundición."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 86 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué materia NO puede ser regulada mediante Real Decreto-ley según el artículo 86.1 CE?",
            options: ["Los tipos de cotización laboral ordinarios", "El ordenamiento de las instituciones básicas del Estado y los derechos del Título I", "La prórroga presupuestaria técnica", "Las ayudas de protección civil"],
            answer: 1,
            explanation: "El art. 86.1 CE veta expresamente el decreto-ley en materias reservadas de máxima relevancia.",
            reference: "Art. 86 CE",
            legalArticle: "Art. 86.1 CE",
            legalText: "No podrán afectar al ordenamiento de las instituciones básicas del Estado, a los derechos del Título I, al régimen de las CCAA ni al Derecho electoral general.",
          }
        ]
      },
      {
        title: "Tema 3. El Reglamento: concepto, límites y potestad reglamentaria",
        summary: "Potestad reglamentaria del Gobierno y Ministros. Reglamentos ejecutivos e independientes. Control judicial.",
        npcName: "Don Ramón",
        npcRole: "Conserje Mayor del INAP",
        npcLines: ["El Gobierno ejerce la potestad reglamentaria de acuerdo con la Constitución y las leyes.", "Ningún reglamento puede vulnerar preceptos de una ley jerárquicamente superior.", "Los tribunales inaplican los reglamentos contrarios a la ley."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 128 Ley 39/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Según el principio de jerarquía normativa, los reglamentos:",
            options: ["Pueden derogar leyes anteriores en materia procedimental", "No podrán vulnerar la Constitución ni las leyes ni regular materias reservadas a la ley", "Tienen rango superior a los Decretos Legislativos", "Solo vinculan a ciudadanos registrados"],
            answer: 1,
            explanation: "El art. 128 de la Ley 39/2015 prohíbe a los reglamentos tipificar delitos o vulnerar leyes.",
            reference: "Art. 128 Ley 39/2015",
            legalArticle: "Art. 128.1 Ley 39/2015",
            legalText: "El ejercicio de la potestad reglamentaria corresponde al Gobierno... Los reglamentos no podrán vulnerar la Constitución ni las leyes.",
          }
        ]
      },
      {
        title: "Tema 4. El acto administrativo: eficacia, nulidad de pleno derecho y anulabilidad",
        summary: "Eficacia y ejecutividad (art. 39), nulidad radical (art. 47) y anulabilidad (art. 48 Ley 39/2015).",
        npcName: "Jueza de Alzada",
        npcRole: "Jueza Contencioso-Administrativa",
        npcLines: ["Los actos dictados prescindiendo del procedimiento legal son nulos de pleno derecho.", "El defecto de forma solo causa anulabilidad si produce indefensión.", "Los actos administrativos se presumen válidos desde la fecha en que se dictan."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 47 Ley 39/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Son nulos de pleno derecho los actos administrativos que:",
            options: ["Incurran en cualquier infracción del ordenamiento jurídico no invalidante", "Lesionen los derechos y libertades susceptibles de amparo constitucional", "Contengan meras erratas materiales numéricas", "Hayan sido dictados fuera de plazo sin indefensión"],
            answer: 1,
            explanation: "El art. 47.1.a) de la Ley 39/2015 sanciona con nulidad de pleno derecho la lesión de derechos fundamentales.",
            reference: "Art. 47 Ley 39/2015",
            legalArticle: "Art. 47.1.a) Ley 39/2015",
            legalText: "Los actos de las Administraciones Públicas son nulos de pleno derecho en los casos siguientes: a) Los que lesionen los derechos y libertades susceptibles de amparo constitucional.",
          }
        ]
      },
      {
        title: "Tema 5. Contratos del Sector Público (I): delimitación, tipos y preparación",
        summary: "Ley 9/2017 (LCSP). Obras, concesión, suministros y servicios. Contratos menores y umbrales.",
        npcName: "Don Teodoro",
        npcRole: "Jefe de Contratación",
        npcLines: ["Los contratos de obras mayores de 40.000 € y suministros de 15.000 € exigen procedimiento licitatorio.", "El pliego de cláusulas administrativas particulares es ley del contrato.", "El recurso especial en materia de contratación tiene efectos suspensivos automáticos."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 118 LCSP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Se consideran contratos menores en la Ley 9/2017 los contratos de obras de valor estimado inferior a:",
            options: ["15.000 euros", "40.000 euros", "100.000 euros", "50.000 euros"],
            answer: 1,
            explanation: "El art. 118.1 de la Ley 9/2017 fija en 40.000 € el umbral de obras para contratos menores.",
            reference: "Art. 118 LCSP",
            legalArticle: "Art. 118.1 Ley 9/2017",
            legalText: "Se consideran contratos menores los contratos de valor estimado inferior a 40.000 euros cuando se trate de contratos de obras.",
          }
        ]
      },
      {
        title: "Tema 6. Contratos del Sector Público (II): adjudicación, ejecución y extinción",
        summary: "Procedimientos abierto, restringido y negociado. Modificación del contrato y prerrogativas de la Administración.",
        npcName: "Letrada Alicia",
        npcRole: "Asesora de Contratación",
        npcLines: ["La Administración ostenta la prerrogativa de interpretar y resolver dudas del contrato.", "Las modificaciones sustanciales no previstas en pliegos están prohibidas.", "La demora culpable del contratista habilita la imposición de penalidades."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 190 LCSP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Dentro de los límites y con sujeción a los requisitos de la Ley 9/2017, el órgano de contratación ostenta la prerrogativa de:",
            options: ["Interpretar los contratos administrativos y resolver las dudas que ofrezca su cumplimiento", "Dictar sentencias penales al contratista", "Modificar el contrato libremente sin límite presupuestario", "Ceder el contrato a terceros de oficio"],
            answer: 0,
            explanation: "El art. 190 de la LCSP consagra las prerrogativas de interpretación, modificación y resolución contractual.",
            reference: "Art. 190 LCSP",
            legalArticle: "Art. 190 LCSP",
            legalText: "Dentro de los límites y con sujeción a los requisitos y efectos señalados en la presente Ley, el órgano de contratación ostenta la prerrogativa de interpretar los contratos administrativos.",
          }
        ]
      },
      {
        title: "Tema 7. Formas de la actividad administrativa: fomento, policía y servicio público",
        summary: "Ley 38/2003 General de Subvenciones. Principios de concurrencia y justificación de fondos.",
        npcName: "Don Evaristo",
        npcRole: "Jefe de Subvenciones",
        npcLines: ["La subvención exige plan estratégico previo y publicidad.", "El beneficiario debe cumplir los requisitos del art. 13 LGS.", "La actividad de fomento estimula iniciativas privadas de interés general."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 8 Ley 38/2003"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Los órganos de las Administraciones que propongan el establecimiento de subvenciones deben elaborar previamente un:",
            options: ["Plan Estratégico de Subvenciones", "Presupuesto mercantil cerrado", "Informe del Tribunal Constitucional", "Reglamento orgánico de bases"],
            answer: 0,
            explanation: "El art. 8.1 de la Ley 38/2003 impone la obligación del Plan Estratégico de Subvenciones.",
            reference: "Art. 8 Ley 38/2003",
            legalArticle: "Art. 8.1 Ley 38/2003",
            legalText: "Los órganos de las Administraciones públicas... que propongan el establecimiento de subvenciones, con carácter previo, deberán concretar en un plan estratégico de subvenciones los objetivos.",
          }
        ]
      },
      {
        title: "Tema 8. La potestad expropiatoria y el justiprecio",
        summary: "Ley de Expropiación Forzosa de 1954. Utilidad pública, justiprecio y procedimiento de urgencia (art. 52 LEF).",
        npcName: "Don Cipriano",
        npcRole: "Jurado Provincial de Expropiación",
        npcLines: ["La expropiación exige causa legal de utilidad pública o interés social.", "El justiprecio se fija de mutuo acuerdo o por el Jurado Provincial.", "El procedimiento de urgencia del art. 52 invierte el orden: primero ocupación, luego justiprecio."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 52 LEF"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "En el procedimiento de urgencia regulado en el artículo 52 de la Ley de Expropiación Forzosa:",
            options: ["El justiprecio se abona siempre antes de la ocupación del bien", "Se efectúa la ocupación del bien previa acta previa, fijándose el justiprecio con posterioridad", "No se abona indemnización alguna", "La expropiación la declara el Alcalde"],
            answer: 1,
            explanation: "El art. 52 LEF faculta la ocupación inmediata de los bienes previa consignación de depósito y valoración posterior.",
            reference: "Art. 52 LEF",
            legalArticle: "Art. 52 LEF",
            legalText: "Excepcionalmente... podrá declararse urgente la ocupación de los bienes afectados por la expropiación a que dé lugar la realización de una obra.",
          }
        ]
      },
      {
        title: "Tema 9. El régimen patrimonial de las Administraciones Públicas",
        summary: "Ley 33/2003 (LPAP). Bienes demaniales (inviolables, inalienables, inembargables e imprescriptibles) y bienes patrimoniales.",
        npcName: "Registrador Peña",
        npcRole: "Letrado de Patrimonio del Estado",
        npcLines: ["Los bienes de dominio público son inalienables, imprescriptibles e inembargables (art. 132 CE).", "Los bienes patrimoniales son de titularidad pública no afectos al uso o servicio público.", "La afectación y desafectación determinan el cambio de régimen jurídico."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 132 CE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Según el artículo 132.1 de la Constitución, los bienes de dominio público se rigen por los principios de:",
            options: ["Inalienabilidad, imprescriptibilidad e inembargabilidad", "Disponibilidad mercantil y libre hipoteca", "Lucro cesante y prescripción adquisitiva a los 5 años", "Enajenación mediante subasta libre"],
            answer: 0,
            explanation: "El art. 132.1 CE consagra la tríada de protección absoluta de los bienes demaniales.",
            reference: "Art. 132 CE",
            legalArticle: "Art. 132.1 CE",
            legalText: "La ley regulará el régimen jurídico de los bienes de dominio público y de los comunales, inspirándose en los principios de inalienabilidad, imprescriptibilidad e inembargabilidad.",
          }
        ]
      },
      {
        title: "Tema 10. La responsabilidad patrimonial de las Administraciones Públicas",
        summary: "Ley 40/2015 (arts. 32-37). Daño efectivo, antijurídico, relación de causalidad y prescripción de 1 año.",
        npcName: "Magistrada Lucena",
        npcRole: "Sala de lo Contencioso",
        npcLines: ["Los particulares tienen derecho a ser indemnizados de toda lesión en sus bienes o derechos por funcionamiento público.", "El derecho a reclamar prescribe al año de producido el hecho o de manifestarse sus efectos.", "La fuerza mayor excluye el deber de indemnizar."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 32 Ley 40/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El plazo de prescripción del derecho a reclamar indemnización por responsabilidad patrimonial de la Administración es de:",
            options: ["Seis meses", "Un año desde que se produjo el hecho o se determinó el alcance de las secuelas", "Tres años civiles", "Cinco años improrrogables"],
            answer: 1,
            explanation: "El art. 67.1 de la Ley 39/2015 fija el plazo de prescripción en un año.",
            reference: "Art. 32 Ley 40/2015",
            legalArticle: "Art. 67.1 Ley 39/2015",
            legalText: "El derecho a reclamar prescribirá al año de producido el hecho o el acto que motive la indemnización o de manifestarse su efecto lesivo.",
          }
        ]
      },
      {
        title: "Tema 11. El procedimiento administrativo común: iniciación, ordenación e instrucción",
        summary: "Ley 39/2015 (LPAC). Interesados, subsanación (10 días), alegaciones, prueba e informes.",
        npcName: "Don Horacio",
        npcRole: "Jefe de Servicio de Procedimiento",
        npcLines: ["El procedimiento se inicia de oficio o a solicitud del interesado.", "Si la solicitud no reúne los requisitos, se requiere subsanación en 10 días hábiles.", "Los informes son por regla general facultativos y no vinculantes."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 68 Ley 39/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El plazo general otorgado al interesado para subsanar la solicitud según el art. 68 de la Ley 39/2015 es de:",
            options: ["Cinco días naturales", "Diez días hábiles", "Un mes", "Quince días hábiles"],
            answer: 1,
            explanation: "El art. 68.1 de la Ley 39/2015 concede un plazo de 10 días hábiles con apercibimiento de desistimiento.",
            reference: "Art. 68 Ley 39/2015",
            legalArticle: "Art. 68.1 Ley 39/2015",
            legalText: "Si la solicitud de iniciación no reúne los requisitos... se requerirá al interesado para que, en un plazo de diez días, subsane la falta.",
          }
        ]
      },
      {
        title: "Tema 12. Finalización del procedimiento, términos y silencio administrativo",
        summary: "Resolución, desistimiento, renuncia y caducidad. Cómputo de plazos y silencio positivo/negativo (arts. 21 y 24 Ley 39/2015).",
        npcName: "Don Silvestre",
        npcRole: "Secretario de la Junta de Recursos",
        npcLines: ["El plazo máximo para resolver un procedimiento no puede exceder de 6 meses salvo norma legal.", "Por regla general el silencio es positivo, salvo excepciones tasadas por ley.", "Los sábados son días inhábiles para el cómputo de plazos administrativos."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 24 Ley 39/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El silencio administrativo en procedimientos iniciados a solicitud del interesado es desestimatorio cuando:",
            options: ["Se trate de procedimientos de responsabilidad patrimonial o ejercicio del derecho de petición", "En todos los procedimientos ordinarios", "Solo en solicitudes de empleo", "Nunca, siempre es positivo"],
            answer: 0,
            explanation: "El art. 24.1 de la Ley 39/2015 enumera las excepciones que conllevan silencio negativo.",
            reference: "Art. 24 Ley 39/2015",
            legalArticle: "Art. 24.1 Ley 39/2015",
            legalText: "El silencio tendrá efecto desestimatorio en los procedimientos relativos al ejercicio del derecho de petición, aquellos cuya estimación tuviera como consecuencia que se transfirieran al solicitante facultades sobre el dominio público... y en los de responsabilidad patrimonial.",
          }
        ]
      },
      {
        title: "Tema 13. Recursos administrativos y jurisdicción contencioso-administrativa",
        summary: "Recurso de alzada (1 mes ante el superior), potestativo de reposición (1 mes ante el mismo) y revisión. Ley 29/1998 LJCA.",
        npcName: "Doña Amparo",
        npcRole: "Presidenta de Sala Contenciosa",
        npcLines: ["El recurso de alzada cabe contra actos que no ponen fin a la vía administrativa.", "El plazo para interponer alzada contra resolución expresa es de 1 mes.", "El contencioso ordinario ante juzgados se interpone en 2 meses."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 122 Ley 39/2015"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El plazo para la interposición del recurso de alzada si el acto administrativo fuera expreso es de:",
            options: ["Diez días hábiles", "Un mes", "Dos meses", "Tres meses"],
            answer: 1,
            explanation: "El art. 122.1 de la Ley 39/2015 fija el plazo de 1 mes para la alzada contra acto expreso.",
            reference: "Art. 122 Ley 39/2015",
            legalArticle: "Art. 122.1 Ley 39/2015",
            legalText: "El plazo para la interposición del recurso de alzada será de un mes, si el acto fuera expreso.",
          }
        ]
      }
    ]
  },
  {
    number: 5,
    title: "Administración de Recursos Humanos",
    ministry: "Ministerio para la Transformación Digital y Función Pública",
    worldName: "Mundo 5 · Función Pública y Recursos Humanos",
    description: "TREBEP (RDL 5/2015), Selección, Carrera Administrativa, Situaciones Administrativas, Retribuciones e Incompatibilidades.",
    theme: "inap",
    bossName: "Tribunal Calificador de Personal",
    bossIntro: "¡El TREBEP es la Biblia del gestor civil! ¿Conoces las faltas muy graves, las situaciones administrativas y la Ley 53/1984?",
    bossStyle: "tribunal",
    topics: [
      {
        title: "Tema 1. El personal al servicio de las Administraciones Públicas: clases y estatuto",
        summary: "TREBEP (RDL 5/2015). Funcionarios de carrera, interinos, personal laboral y eventual. Pérdida de la condición.",
        npcName: "Doña Luisa",
        npcRole: "Jefa de Personal",
        npcLines: ["Los funcionarios de carrera desempeñan servicios profesionales permanentes.", "Los funcionarios interinos se nombran por razones de necesidad y urgencia (máximo 3 años).", "El personal eventual realiza funciones de confianza o asesoramiento especial."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 8 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Según el artículo 10 del TREBEP, son funcionarios interinos los nombrados por razones de necesidad y urgencia para:",
            options: ["Desempeño permanente de puestos directivos", "Plazas vacantes no cubiertas por funcionarios de carrera durante un máximo de tres años", "Labores manuales de oficios", "Asesoramiento personal exclusivo a Ministros"],
            answer: 1,
            explanation: "El art. 10.1.a) del TREBEP regula la interinidad por vacante con el límite temporal de 3 años.",
            reference: "Art. 8 TREBEP",
            legalArticle: "Art. 10.1.a) TREBEP",
            legalText: "Son funcionarios interinos los que, por razones expresamente justificadas de necesidad y urgencia, son nombrados como tales para la cobertura temporal de plazas vacantes.",
          }
        ]
      },
      {
        title: "Tema 2. Derechos y deberes del personal empleado público. Régimen disciplinario",
        summary: "Principios éticos y de conducta (arts. 52-54). Faltas muy graves, graves y leves (arts. 95-96 TREBEP). Prescripción.",
        npcName: "Don Bernardo",
        npcRole: "Instructor de Expedientes Disciplinarios",
        npcLines: ["El abandono del servicio es falta disciplinaria muy grave.", "La separación del servicio inhabilita para volver a la Administración.", "Las faltas muy graves prescriben a los 3 años y sus sanciones a los 3 años."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 95 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Cuál de las siguientes conductas está tipificada expresamente como falta muy grave en el art. 95 del TREBEP?",
            options: ["El retraso injustificado de un día", "El abandono del servicio y la adopción de acuerdos manifiestamente ilegales", "La falta de cortesía con los ciudadanos", "No llevar la identificación visible"],
            answer: 1,
            explanation: "El art. 95.2 del TREBEP tipifica el abandono del servicio y los acuerdos ilegales como faltas muy graves.",
            reference: "Art. 95 TREBEP",
            legalArticle: "Art. 95.2 TREBEP",
            legalText: "Son faltas muy graves: c) El abandono del servicio, así como no hacerse cargo voluntariamente de las tareas encomendadas.",
          }
        ]
      },
      {
        title: "Tema 3. Planificación de RRHH, Oferta de Empleo Público y selección",
        summary: "Planes de recursos humanos, relaciones de puestos de trabajo (RPT) y principios de igualdad, mérito y capacidad.",
        npcName: "Doña Laura",
        npcRole: "Directora de Selección del INAP",
        npcLines: ["La Oferta de Empleo Público debe ejecutarse en el plazo improrrogable de 3 años.", "Los órganos de selección son colegiados y de composición paritaria.", "Los tribunales no pueden aprobar más aspirantes que plazas convocadas."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 70 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El plazo improrrogable para la ejecución de la Oferta de Empleo Público según el art. 70 del TREBEP es de:",
            options: ["Un año", "Tres años", "Cinco años", "Seis meses"],
            answer: 1,
            explanation: "El art. 70.1 del TREBEP fija en tres años el plazo máximo improrrogable para ejecutar la OEP.",
            reference: "Art. 70 TREBEP",
            legalArticle: "Art. 70.1 TREBEP",
            legalText: "En todo caso, la ejecución de la oferta de empleo público o instrumento similar deberá desarrollarse dentro del plazo improrrogable de tres años.",
          }
        ]
      },
      {
        title: "Tema 4. Provisión de puestos de trabajo y carrera administrativa",
        summary: "Sistemas de provisión: concurso (ordinario) y libre designación (directivos). Carrera horizontal y vertical.",
        npcName: "Don Aurelio",
        npcRole: "Jefe de Servicio de Provisión",
        npcLines: ["El concurso es el procedimiento normal y ordinario de provisión de puestos.", "La libre designación consiste en la apreciación discrecional de la idoneidad.", "La carrera horizontal implica la progresión de grado sin cambiar de puesto."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 78 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El procedimiento normal y ordinario de provisión de puestos de trabajo en la Administración es:",
            options: ["La libre designación", "El concurso de méritos", "La adscripción provisional indefinida", "La permuta libre"],
            answer: 1,
            explanation: "El art. 78.2 del TREBEP establece el concurso como sistema general de provisión ordinaria.",
            reference: "Art. 78 TREBEP",
            legalArticle: "Art. 78.2 TREBEP",
            legalText: "El concurso, como procedimiento normal de provisión de puestos de trabajo, consistirá en la valoración de los méritos.",
          }
        ]
      },
      {
        title: "Tema 5. Situaciones administrativas e incompatibilidades (Ley 53/1984)",
        summary: "Servicio activo, servicios especiales, excedencias (interés particular, cuidado de familiares) e incompatibilidades.",
        npcName: "Letrado Montero",
        npcRole: "Comisión de Incompatibilidades",
        npcLines: ["La excedencia por interés particular exige 5 años de servicios previos devengados.", "Los servicios especiales permiten la reserva de puesto y cómputo de trienios.", "La Ley 53/1984 prohíbe un segundo puesto en el sector público salvo excepciones tasadas."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Ley 53/1984"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Para solicitar la excedencia voluntaria por interés particular, el funcionario de carrera debe haber prestado servicios mínimos durante:",
            options: ["Un año", "Cinco años inmediatamente anteriores", "Diez años continuados", "No se exige período previo"],
            answer: 1,
            explanation: "El art. 89.2 del TREBEP exige haber prestado servicios efectivos durante al menos cinco años continuados.",
            reference: "Ley 53/1984",
            legalArticle: "Art. 89.2 TREBEP",
            legalText: "La concesión de excedencia voluntaria por interés particular quedará subordinada a las necesidades del servicio... Deberá haber prestado servicios efectivos en cualquiera de las Administraciones Públicas durante un periodo mínimo de cinco años.",
          }
        ]
      },
      {
        title: "Tema 6. Sistema retributivo e indemnizaciones por razón del servicio",
        summary: "Retribuciones básicas (sueldo y trienios) y complementarias (destino y específico). RD 462/2002 sobre dietas.",
        npcName: "Don Mariano",
        npcRole: "Habilitado de Personal",
        npcLines: ["Las retribuciones básicas son iguales en todo el territorio para cada Subgrupo.", "El complemento de destino retribuye el nivel del puesto (del 16 al 26 en A2).", "El complemento específico retribuye dificultad técnica, responsabilidad o penosidad."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 23 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Son retribuciones básicas de los funcionarios públicos según el artículo 23 del TREBEP:",
            options: ["El sueldo y los trienios exclusivamente", "El complemento de destino y específico", "Las dietas y gastos de locomoción", "El complemento de productividad"],
            answer: 0,
            explanation: "El art. 23 del TREBEP define como retribuciones básicas el sueldo asignado al Subgrupo y los trienios.",
            reference: "Art. 23 TREBEP",
            legalArticle: "Art. 23 TREBEP",
            legalText: "Son retribuciones básicas: a) El sueldo asignado a cada Subgrupo o Grupo de clasificación. b) Los trienios, que consisten en una cantidad igual para cada Subgrupo por cada tres años de servicio.",
          }
        ]
      },
      {
        title: "Tema 7. El personal laboral al servicio de las Administraciones Públicas",
        summary: "Estatuto de los Trabajadores y el IV Convenio Único para el personal laboral de la AGE. Grupos profesionales.",
        npcName: "Inspector Roldán",
        npcRole: "Mediador Laboral",
        npcLines: ["El personal laboral se rige por la legislación laboral con las especialidades del TREBEP.", "El IV Convenio Único clasifica al personal en 5 grupos profesionales (M1 a M5).", "La selección de laborales se rige por los principios de mérito y capacidad."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: IV Convenio AGE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El marco convencional que regula las condiciones del personal laboral de la Administración General del Estado es:",
            options: ["El IV Convenio Único de la AGE", "El Código de Comercio", "La Ley de Arrendamientos Urbanos", "El Convenio Colectivo de Banca"],
            answer: 0,
            explanation: "El IV Convenio Único unifica el régimen laboral de la AGE adaptándolo al Marco Español de Cualificaciones.",
            reference: "IV Convenio AGE",
            legalArticle: "IV Convenio Único",
            legalText: "El presente Convenio colectivo tiene por objeto regular las condiciones de trabajo del personal laboral de la AGE.",
          }
        ]
      },
      {
        title: "Tema 8. Negociación colectiva, representación y derecho de huelga",
        summary: "Mesas Generales de Negociación (art. 36 TREBEP), Juntas de Personal, Delegados de Personal y servicios esenciales.",
        npcName: "Don Emilio",
        npcRole: "Secretario de Mesa de Negociación",
        npcLines: ["Las Juntas de Personal se eligen en unidades electorales de 50 o más funcionarios.", "Los acuerdos de las Mesas de Negociación vinculan a las partes tras su aprobación.", "El derecho de huelga del empleado público exige garantizar servicios esenciales."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 39 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Los órganos específicos de representación colegiada de los funcionarios públicos en unidades de al menos 50 efectivos son:",
            options: ["Los Comités de Empresa", "Las Juntas de Personal", "Los Consejos de Administración", "Los Tribunales de Honor"],
            answer: 1,
            explanation: "El art. 39.1 del TREBEP establece las Juntas de Personal para funcionarios y Comités de Empresa para laborales.",
            reference: "Art. 39 TREBEP",
            legalArticle: "Art. 39.1 TREBEP",
            legalText: "Los órganos específicos de representación de los funcionarios son los Delegados de Personal y las Juntas de Personal.",
          }
        ]
      },
      {
        title: "Tema 9. Régimen especial de Seguridad Social de los funcionarios del Estado",
        summary: "Mutualismo administrativo (MUFACE) y Régimen de Clases Pasivas del Estado. Pensiones de jubilación y viudedad.",
        npcName: "Doña Dolores",
        npcRole: "Directora Provincial de MUFACE",
        npcLines: ["MUFACE gestiona la asistencia sanitaria y farmacéutica de los funcionarios civiles.", "Los funcionarios de nuevo ingreso desde 2011 cotizan al Régimen General de la Seguridad Social para pensiones.", "El Régimen de Clases Pasivas continúa gestionando las pensiones de funcionarios ingresados antes de 2011."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: RDL 4/2004 MUFACE"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "La entidad de derecho público que gestiona el mutualismo administrativo de los funcionarios civiles del Estado es:",
            options: ["ISFAS", "MUFACE", "MUGEJU", "El INSS"],
            answer: 1,
            explanation: "El texto refundido de la Ley sobre Seguridad Social de los Funcionarios Civiles del Estado regula MUFACE.",
            reference: "RDL 4/2004 MUFACE",
            legalArticle: "Art. 1 RDL 4/2004",
            legalText: "El mutualismo administrativo es gestionado por la Mutualidad General de Funcionarios Civiles del Estado (MUFACE).",
          }
        ]
      },
      {
        title: "Tema 10. Acceso al empleo público de personas con discapacidad",
        summary: "Cupo de reserva del 7% (art. 59 TREBEP), adaptaciones de tiempo y medios y reserva del 2% para discapacidad intelectual.",
        npcName: "Doña Nieves",
        npcRole: "Coordinadora de Inclusión Social",
        npcLines: ["En las ofertas de empleo público se reservará un cupo no inferior al 7% para personas con discapacidad.", "Al menos un 2% de las plazas reservadas será para personas con discapacidad intelectual.", "Se garantizan las adaptaciones de tiempo y medios en los ejercicios."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 59 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "¿Qué porcentaje mínimo de plazas convocadas debe reservarse en las Ofertas de Empleo Público para personas con discapacidad?",
            options: ["El 2%", "El 5%", "Un cupo no inferior al 7% de las vacantes", "El 10%"],
            answer: 2,
            explanation: "El art. 59.1 del TREBEP fija el cupo global en un porcentaje no inferior al siete por ciento.",
            reference: "Art. 59 TREBEP",
            legalArticle: "Art. 59.1 TREBEP",
            legalText: "En las ofertas de empleo público se reservará un cupo no inferior al siete por ciento de las vacantes para ser cubiertas entre personas con discapacidad.",
          }
        ]
      }
    ]
  },
  {
    number: 6,
    title: "Gestión Financiera y Seguridad Social",
    ministry: "Ministerio de Hacienda y Función Pública",
    worldName: "Mundo 6 · La Real Casa de la Moneda y Hacienda",
    description: "Ley General Presupuestaria 47/2003, Estructura del Presupuesto, Modificaciones de Crédito, Fases del Gasto ADOP e Intervención.",
    theme: "hacienda",
    bossName: "Gran Interventor",
    bossIntro: "¡Ni un céntimo sale del Tesoro sin crédito adecuado y fiscalización previa! ¿Superarás las fases contables ADOP?",
    bossStyle: "interventor",
    topics: [
      {
        title: "Tema 1. El presupuesto del Estado: concepto, principios y Ley General Presupuestaria",
        summary: "Ley 47/2003 (LGP) y Ley Orgánica 2/2012 de Estabilidad Presupuestaria. Unidad, universalidad y no afectación.",
        npcName: "Gran Interventor",
        npcRole: "Interventor General",
        npcLines: ["El presupuesto del Estado es la expresión cifrada y sistemática de las obligaciones y derechos.", "El principio de no afectación prohíbe destinar ingresos específicos a gastos concretos salvo ley.", "La LGP es la norma cabecera de la hacienda pública estatal."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 27 LGP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El principio presupuestario que exige que los recursos del Estado se destinen a financiar indistintamente los gastos públicos se denomina:",
            options: ["Principio de no afectación", "Principio de anualidad", "Principio de especialidad", "Principio de devengo"],
            answer: 0,
            explanation: "El art. 27.3 de la Ley 47/2003 formula el principio de no afectación de los ingresos públicos.",
            reference: "Art. 27 LGP",
            legalArticle: "Art. 27.3 Ley 47/2003",
            legalText: "Los recursos del Estado, los de cada uno de sus organismos autónomos... se destinarán a satisfacer el conjunto de sus respectivas obligaciones, salvo que por ley se establezca su afectación.",
          }
        ]
      },
      {
        title: "Tema 2. Las leyes anuales de Presupuestos Generales del Estado",
        summary: "Estructura presupuestaria: clasificaciones orgánica, por programas y económica. Arts. 39-41 LGP.",
        npcName: "Don Pascual",
        npcRole: "Jefe de la Oficina Presupuestaria",
        npcLines: ["La clasificación orgánica informa QUIÉN gasta (Sección y Servicio).", "La clasificación por programas informa PARA QUÉ se gasta (Área, Política, Grupo y Programa).", "La clasificación económica informa EN QUÉ se gasta (Capítulo, Artículo, Concepto y Subconcepto)."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 40 LGP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "En la estructura de los Presupuestos Generales del Estado, ¿qué clasificación determina QUIÉN realiza el gasto?",
            options: ["La clasificación económica", "La clasificación orgánica", "La clasificación funcional", "La clasificación territorial"],
            answer: 1,
            explanation: "El art. 40 de la LGP establece que la clasificación orgánica agrupa los créditos por Secciones y Servicios ministeriales.",
            reference: "Art. 40 LGP",
            legalArticle: "Art. 40 Ley 47/2003",
            legalText: "La clasificación orgánica agrupará por secciones y servicios los créditos asignados a los distintos centros gestores de gasto.",
          }
        ]
      },
      {
        title: "Tema 3. Gastos plurianuales y modificaciones presupuestarias",
        summary: "Créditos extraordinarios, suplementos, ampliaciones, transferencias (arts. 50-60) y compromisos de gasto plurianual (art. 47 LGP).",
        npcName: "Doña Carmen",
        npcRole: "Inspectora Presupuestaria",
        npcLines: ["Los compromisos de gasto plurianual pueden alcanzar un máximo de 4 ejercicios futuros.", "Los créditos extraordinarios se aprueban por Ley de Cortes si no hay otro recurso.", "Las transferencias traspasan crédito entre partidas sin alterar el importe total."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 47 LGP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Conforme al artículo 47 de la Ley General Presupuestaria, el número de ejercicios a que pueden aplicarse los gastos plurianuales no será superior a:",
            options: ["Dos ejercicios", "Cuatro ejercicios posteriores", "Cinco ejercicios", "Diez ejercicios"],
            answer: 1,
            explanation: "El art. 47.2 de la Ley 47/2003 fija en cuatro ejercicios posteriores el límite general plurianual.",
            reference: "Art. 47 LGP",
            legalArticle: "Art. 47.2 Ley 47/2003",
            legalText: "El número de ejercicios a que pueden aplicarse los gastos no será superior a cuatro.",
          }
        ]
      },
      {
        title: "Tema 4. Control del gasto público en España: IGAE y Tribunal de Cuentas",
        summary: "Función interventora (fiscalización previa), control financiero permanente y auditoría pública. Arts. 140-168 LGP.",
        npcName: "Don Félix",
        npcRole: "Auditor de la IGAE",
        npcLines: ["La IGAE es el órgano directivo de control interno de la gestión económico-financiera.", "La función interventora fiscaliza previamente los actos que den lugar a derechos u obligaciones.", "El Tribunal de Cuentas es el órgano supremo fiscalizador externo dependiente de las Cortes (art. 136 CE)."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 148 LGP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "El control previo de legalidad que ejerce la IGAE antes de que se autoricen los actos con contenido económico se denomina:",
            options: ["Control financiero permanente", "Función interventora", "Auditoría pública externa", "Inspección de servicios"],
            answer: 1,
            explanation: "El art. 148 de la LGP define la función interventora como el control previo de legalidad.",
            reference: "Art. 148 LGP",
            legalArticle: "Art. 148 Ley 47/2003",
            legalText: "La función interventora tiene por objeto controlar, antes de que sean aprobados, los actos del sector público estatal que den lugar al reconocimiento de derechos o a la realización de gastos.",
          }
        ]
      },
      {
        title: "Tema 5. El procedimiento de ejecución del presupuesto de gasto (Fases ADOP)",
        summary: "Aprobación del gasto (A), Compromiso (D), Reconocimiento de la obligación (O) y Ordenación del pago (P).",
        npcName: "Don Manuel",
        npcRole: "Contable del Tesoro Público",
        npcLines: ["Fase A (Aprobación): autoriza el gasto reservando el crédito.", "Fase D (Compromiso): vincula jurídicamente a la Administración con un tercero.", "Fase O (Reconocimiento): acredita la realización de la prestación y genera la deuda."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 73 LGP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "En el procedimiento de ejecución del gasto público, ¿qué acto contable acredita la realización del servicio y genera la deuda exigible?",
            options: ["La aprobación del gasto (Fase A)", "El compromiso del gasto (Fase D)", "El reconocimiento de la obligación (Fase O)", "La propuesta de ordenación"],
            answer: 2,
            explanation: "El art. 73.4 de la LGP define el reconocimiento de la obligación como el acto que declara la deuda.",
            reference: "Art. 73 LGP",
            legalArticle: "Art. 73.4 Ley 47/2003",
            legalText: "El reconocimiento de la obligación es el acto mediante el que se declara la existencia de un crédito exigible contra la Hacienda Pública estatal derivado de un gasto aprobado.",
          }
        ]
      },
      {
        title: "Tema 6. Gastos corrientes, inversiones, subvenciones y anticipos de caja fija",
        summary: "Capítulos 2 y 6 de gasto. Anticipos de caja fija y pagos a justificar (arts. 78-79 LGP).",
        npcName: "Doña Pilar",
        npcRole: "Cajera Pagadora del Ministerio",
        npcLines: ["Los anticipos de caja fija se destinan a gastos periódicos o repetitivos de escasa cuantía.", "Los pagos a justificar se utilizan cuando no se puedan aportar los documentos justificativos previos.", "Las cuentas justificativas de anticipos de caja fija se rinden periódicamente."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 78 LGP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Los fondos librados a justificar para atenciones corrientes y periódicas en las cajas pagadoras se denominan:",
            options: ["Anticipos de caja fija", "Créditos extraordinarios", "Fondos de contingencia", "Subvenciones directas"],
            answer: 0,
            explanation: "El art. 78 de la LGP define los anticipos de caja fija como provisiones para gastos ordinarios reiterados.",
            reference: "Art. 78 LGP",
            legalArticle: "Art. 78.1 Ley 47/2003",
            legalText: "Se entienden por anticipos de caja fija las provisiones de fondos de carácter extrapresupuestario y permanente que se realicen a pagadurías... para la atención de gastos periódicos.",
          }
        ]
      },
      {
        title: "Tema 7. Los ingresos públicos y el sistema tributario español",
        summary: "Ley 58/2003 (LGT). Tributos: impuestos directos e indirectos, tasas y contribuciones especiales.",
        npcName: "Inspector Henares",
        npcRole: "Inspector de Hacienda",
        npcLines: ["Los impuestos se exigen sin contraprestación directa por manifestación de capacidad económica.", "Las tasas gravan el aprovechamiento especial del dominio público o servicios obligatorios.", "Las contribuciones especiales gravan el aumento de valor de bienes por obras públicas."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 2 LGT"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Según el artículo 2 de la Ley General Tributaria, los tributos cuyo hecho imponible está constituido por negocios que ponen de manifiesto la capacidad económica del contribuyente sin contraprestación son:",
            options: ["Las tasas", "Los precios públicos", "Los impuestos", "Las contribuciones especiales"],
            answer: 2,
            explanation: "El art. 2.2.c) de la Ley 58/2003 define los impuestos como tributos sin contraprestación directa.",
            reference: "Art. 2 LGT",
            legalArticle: "Art. 2.2.c) Ley 58/2003",
            legalText: "Impuestos son los tributos exigidos sin contraprestación cuyo hecho imponible está constituido por negocios, actos o hechos que ponen de manifiesto la capacidad económica del contribuyente.",
          }
        ]
      },
      {
        title: "Tema 8. Retribuciones de los empleados públicos y gestión de nóminas",
        summary: "Nómina de haberes: devengos (básicos y complementarios), deducciones (IRPF y cotizaciones a Seguridad Social/MUFACE/Derechos Pasivos) y justificación contable.",
        npcName: "Don Cecilio",
        npcRole: "Habilitado Mayor de Nóminas",
        npcLines: ["La nómina mensual computa devengos íntegros y practica retenciones legales.", "Las pagas extraordinarias se perciben en junio y diciembre por importe de sueldo y trienios más específicos fijados.", "La justificación de la nómina se tramita mediante documentos contables OK."],
        tipName: "Preparador INAP",
        tipRole: "Tutor GACE",
        tipLines: ["Clave de examen: Art. 22 TREBEP"],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          {
            prompt: "Las deducciones preceptivas en la nómina de un funcionario público estatal corresponden a:",
            options: ["Retención por IRPF y cuota de Seguridad Social o MUFACE y Derechos Pasivos", "Seguros privados de ahorro obligatorios", "Cuotas sindicales de oficio", "Impuesto sobre Sociedades"],
            answer: 0,
            explanation: "La normativa presupuestaria y tributaria impone en nómina las deducciones legales obligatorias de IRPF y previsión social.",
            reference: "Art. 22 TREBEP",
            legalArticle: "Art. 22.2 TREBEP",
            legalText: "Las cuantías de las retribuciones básicas y el incremento de las complementarias se fijarán anualmente en la Ley de Presupuestos Generales del Estado.",
          }
        ]
      }
    ]
  }
];
