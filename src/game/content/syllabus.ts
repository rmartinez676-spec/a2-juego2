// Contenido oficial del temario para el Cuerpo de Gestión de la Administración Civil del Estado (A2).
// Programa oficial aprobado por el INAP y publicado en el BOE.
// Incluye referencias y texto literal del ordenamiento jurídico para cada pregunta.

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
      "Este juego cubre los 6 bloques oficiales del programa de Gestión de la Administración Civil del Estado (A2).",
      "Cada mundo es un bloque de estudio con sus temas oficiales: dentro encontrarás a los preparadores y letrados.",
      "Golpea con la cabeza los bloques '?' para poner a prueba tus conocimientos y ganar sellos de oro.",
    ],
  },
  {
    name: "Doña Elena",
    role: "Presidenta de la CPS",
    lines: [
      "Al final de cada tema deberás superar una prueba oficial ante la puerta del ministerio.",
      "Al término de cada bloque te espera el Jefe Final: responde sus preguntas jurídicas para avanzar.",
      "Cada fallo en el nivel de examen oficial resta puntuación conforme a la convocatoria del INAP (-0.33). ¡Mucho ánimo!",
    ],
  },
];

export const TUTORIAL_TITLE = "Plaza de la Administración · Tutorial";

const q = (
  prompt: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
  reference?: string,
  legalArticle?: string,
  legalText?: string,
): SyllabusQuestion => ({ prompt, options, answer, explanation, reference, legalArticle, legalText });

export const SYLLABUS: SyllabusBlock[] = [
  // =========================================================================
  // BLOQUE I: ORGANIZACIÓN DEL ESTADO Y DE LA ADMINISTRACIÓN PÚBLICA
  // =========================================================================
  {
    number: 1,
    title: "Organización del Estado y de la Administración Pública",
    ministry: "Congreso de los Diputados y Cortes Generales",
    worldName: "Mundo 1 · Las Cortes y Órganos Constitucionales",
    description: "Constitución de 1978, Derechos Fundamentales, Cortes Generales, Gobierno, Poder Judicial, AGE y Organización Territorial.",
    theme: "congreso",
    bossName: "Señor Quórum",
    bossIntro: "¡Sin quórum no hay sesión y sin dominar la Constitución no hay plaza en el Cuerpo de Gestión! ¡A ver qué sabes de las Cortes!",
    bossStyle: "quorum",
    topics: [
      {
        title: "La Constitución de 1978 y Derechos Fundamentales",
        summary: "Estructura constitucional, valores superiores, Título I y garantías de los derechos.",
        npcName: "Doña Carmen",
        npcRole: "Catedrática de Derecho Constitucional",
        npcLines: [
          "La Constitución española de 1978 se estructura en un Título Preliminar y 10 Títulos numerados.",
          "El artículo 1.1 proclama el Estado social y democrático de Derecho.",
          "La sección primera del Capítulo II (arts. 15 a 29) goza de la máxima protección: recurso de amparo ante el TC.",
        ],
        tipName: "Julián",
        tipRole: "Opositor de A2 Estado",
        tipLines: [
          "Recuerda: la reforma ordinaria (art. 167) exige 3/5 de cada Cámara. La agravada (art. 168) exige 2/3, disolución y referéndum.",
        ],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          q(
            "Según el artículo 1.1 de la Constitución, España se constituye en un Estado…",
            ["Federal y plurinacional", "Social y democrático de Derecho", "Confederal de las Autonomías", "Unitario y centralizado"],
            1,
            "El art. 1.1 CE establece la forma de Estado social y democrático de Derecho.",
            "Constitución Española",
            "Artículo 1.1 CE",
            "«España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores de su ordenamiento jurídico la libertad, la justicia, la igualdad y el pluralismo político.»"
          ),
          q(
            "¿Qué derechos gozan del procedimiento preferente y sumario ante los tribunales ordinarios y del recurso de amparo ante el TC?",
            ["Los del Título I completo", "Los de la Sección 1.ª del Capítulo II del Título I más el artículo 14 y 30.2", "Solo los derechos políticos del artículo 23", "Los principios rectores del Capítulo III"],
            1,
            "El artículo 53.2 CE otorga tutela reforzada a los arts. 14 a 29 y a la objeción de conciencia del art. 30.2.",
            "Constitución Española",
            "Artículo 53.2 CE",
            "«Cualquier ciudadano podrá recabar la tutela de las libertades y derechos reconocidos en el artículo 14 y la Sección primera del Capítulo segundo ante los Tribunales ordinarios por un procedimiento basado en los principios de preferencia y sumariedad y, en su caso, a través del recurso de amparo ante el Tribunal Constitucional.»"
          ),
          q(
            "La reforma constitucional ordinaria regulada en el artículo 167 CE requiere la aprobación por:",
            ["Mayoría simple del Congreso", "Mayoría de tres quintos de cada una de las Cámaras", "Dos tercios del Congreso y disolución de Cortes", "Mayoría absoluta del Senado"],
            1,
            "El art. 167.1 CE exige mayoría de 3/5 de cada una de las Cámaras.",
            "Constitución Española",
            "Artículo 167.1 CE",
            "«Los proyectos de reforma constitucional deberán ser aprobados por una mayoría de tres quintos de cada una de las Cámaras. Si no hubiera acuerdo entre ambas, se intentará obtenerlo mediante la creación de una Comisión de composición paritaria de Diputados y Senadores.»"
          ),
          q(
            "¿Cuál de las siguientes materias exige el procedimiento de reforma constitucional agravado del artículo 168 CE?",
            ["La modificación del Título IV (Gobierno)", "La revisión total o la que afecte al Título Preliminar, Sección 1.ª del Cap. II del Título I o al Título II", "Cualquier reforma del Título VIII de las CCAA", "La reforma del Tribunal de Cuentas"],
            1,
            "El art. 168.1 CE reserva el procedimiento agravado a la revisión total, Título Preliminar, Sección 1.ª Cap. II Título I y Título II.",
            "Constitución Española",
            "Artículo 168.1 CE",
            "«Cuando se propusiere la revisión total de la Constitución o una parcial que afecte al Título preliminar, al Capítulo segundo, Sección primera del Título I, o al Título II, se procederá a la aprobación del principio por mayoría de dos tercios de cada Cámara, y a la disolución inmediata de las Cortes.»"
          ),
        ],
      },
      {
        title: "Cortes Generales y Órganos Constitucionales",
        summary: "Congreso, Senado, investidura, control parlamentario, Tribunal Constitucional y Defensor del Pueblo.",
        npcName: "Marta del Pino",
        npcRole: "Letrada de las Cortes Generales",
        npcLines: [
          "El Congreso se compone de un mínimo de 300 y un máximo de 400 Diputados; la LOREG fija 350.",
          "El Senado es la Cámara de representación territorial (art. 69.1 CE).",
          "El Tribunal Constitucional se compone de 12 miembros nombrados por el Rey por un período de 9 años.",
        ],
        tipName: "Pablo",
        tipRole: "Opositor veterano",
        tipLines: [
          "Fíjate en las mayorías: el TC tiene 4 magistrados a propuesta del Congreso (3/5), 4 del Senado (3/5), 2 del Gobierno y 2 del CGPJ.",
        ],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          q(
            "El Congreso de los Diputados debe convalidar o derogar un Real Decreto-ley en el plazo de:",
            ["15 días naturales", "30 días siguientes a su promulgación", "60 días hábiles", "Dos meses desde su entrada en vigor"],
            1,
            "El artículo 86.2 CE establece el plazo perentorio de 30 días para su debate y votación en el Congreso.",
            "Constitución Española",
            "Artículo 86.2 CE",
            "«Los Decretos-leyes deberán ser inmediatamente sometidos a debate y votación de totalidad al Congreso de los Diputados, convocado al efecto si no estuviere reunido, en el plazo de los treinta días siguientes a su promulgación.»"
          ),
          q(
            "La moción de censura debe ser propuesta al menos por:",
            ["La décima parte de los Diputados", "La mayoría absoluta del Senado", "Una cuarta parte del Congreso", "50 Diputados o 50 Senadores"],
            0,
            "El artículo 113.2 CE exige que la moción sea propuesta al menos por la décima parte de los Diputados.",
            "Constitución Española",
            "Artículo 113.2 CE",
            "«La moción de censura deberá ser propuesta al menos por la décima parte de los Diputados, y habrá de incluir un candidato a la Presidencia del Gobierno.»"
          ),
          q(
            "El Defensor del Pueblo es designado por las Cortes Generales para un mandato de:",
            ["3 años", "5 años", "4 años", "9 años"],
            1,
            "El artículo 2.2 de la Ley Orgánica 3/1981 del Defensor del Pueblo fija el mandato en 5 años.",
            "Ley Orgánica 3/1981",
            "Artículo 2.2 LO 3/1981",
            "«El Defensor del Pueblo será elegido por las Cortes Generales para un periodo de cinco años, y podrá ser reelegido.»"
          ),
        ],
      },
      {
        title: "Gobierno, Poder Judicial y Organización Territorial",
        summary: "Gobierno, Ley 50/1997, CGPJ, Comunidades Autónomas y Administración Local (Ley 7/1985).",
        npcName: "Don Fernando",
        npcRole: "Magistrado de la Sala de lo Contencioso",
        npcLines: [
          "El Gobierno se compone del Presidente, de los Vicepresidentes, en su caso, y de los Ministros (art. 98.1 CE).",
          "La justicia emana del pueblo y se administra en nombre del Rey por Jueces y Magistrados independientes (art. 117.1 CE).",
          "El municipio es la entidad básica de la organización territorial del Estado (art. 137 CE).",
        ],
        tipName: "Lucía Preparadora",
        tipRole: "Funcionaria de Carrera A2",
        tipLines: [
          "Distingue: los órganos superiores de la AGE son Ministros y Secretarios de Estado; los directivos son Subsecretarios, Secretarios Generales y Directores Generales (art. 55 Ley 40/2015).",
        ],
        boeIds: ["BOE-A-1978-31229", "BOE-A-2015-10566", "BOE-A-1985-5392"],
        questions: [
          q(
            "Según el artículo 55 de la Ley 40/2015 (LRJSP), son órganos superiores de los ministerios:",
            ["Los Subsecretarios y Directores Generales", "Los Ministros y los Secretarios de Estado", "Los Delegados del Gobierno", "Los Secretarios Generales Técnicos"],
            1,
            "Los Ministros y Secretarios de Estado son órganos superiores; los demás son directivos.",
            "Ley 40/2015 (LRJSP)",
            "Artículo 55.2 Ley 40/2015",
            "«Son órganos superiores los Ministros y los Secretarios de Estado. Son órganos directivos los Subsecretarios y Secretarios generales; los Secretarios generales técnicos y Directores generales; y los Subdirectores generales.»"
          ),
          q(
            "El Consejo General del Poder Judicial se compone del Presidente del Tribunal Supremo y de:",
            ["12 Vocales", "20 Vocales nombrados por el Rey por un período de cinco años", "15 Magistrados vitalicios", "25 miembros elegidos por los jueces"],
            1,
            "El artículo 122.3 CE fija la composición en 20 vocales por un período de 5 años.",
            "Constitución Española",
            "Artículo 122.3 CE",
            "«El Consejo General del Poder Judicial estará integrado por el Presidente del Tribunal Supremo, que lo presidirá, y por veinte miembros nombrados por el Rey por un periodo de cinco años.»"
          ),
          q(
            "El gobierno y la administración municipal corresponde al Ayuntamiento, integrado por:",
            ["El Alcalde y el Secretario municipal", "El Alcalde y los Concejales", "El Pleno y la Junta de Portavoces", "El Presidente de la Diputación y el Alcalde"],
            1,
            "El artículo 140 CE y el art. 19 LBRL atribuyen el gobierno municipal al Alcalde y los Concejales.",
            "Constitución Española",
            "Artículo 140 CE",
            "«La Constitución garantiza la autonomía de los municipios. Estos gozarán de personalidad jurídica plena. Su gobierno y administración corresponde a sus respectivos Ayuntamientos, integrados por los Alcaldes y los Concejales.»"
          ),
        ],
      },
    ],
  },

  // =========================================================================
  // BLOQUE II: UNIÓN EUROPEA
  // =========================================================================
  {
    number: 2,
    title: "Unión Europea",
    ministry: "Comisión Europea y Consejo de la Unión Europea",
    worldName: "Mundo 2 · Bruselas y las Instituciones Comunitarias",
    description: "Tratados de la UE, Instituciones (Consejo, Comisión, Parlamento, TJUE), Fuentes del Derecho Europeo, Presupuesto y Fondos.",
    theme: "europa",
    bossName: "El Comisario Europeo",
    bossIntro: "¡El Derecho de la Unión tiene efecto directo y primacía sobre el derecho nacional! ¡Veamos si conoces el TFUE!",
    bossStyle: "cyber",
    topics: [
      {
        title: "Tratados y Proceso de Construcción Europea",
        summary: "De Roma a Lisboa, personalidad jurídica de la UE, valores y adhesión (art. 49 TUE).",
        npcName: "Monique Dupont",
        npcRole: "Consejera Jurídica en Bruselas",
        npcLines: [
          "El Tratado de Lisboa dotó a la Unión Europea de personalidad jurídica única.",
          "La Unión se fundamenta en el Tratado de la Unión Europea (TUE) y el Tratado de Funcionamiento de la Unión Europea (TFUE).",
          "El artículo 5 TUE consagra los principios de atribución, subsidiariedad y proporcionalidad.",
        ],
        tipName: "Lucas",
        tipRole: "Preparador de Derecho UE",
        tipLines: [
          "El principio de subsidiariedad rige en los ámbitos que no sean de competencia exclusiva de la Unión.",
        ],
        boeIds: ["BOE-A-2015-10565"],
        questions: [
          q(
            "El principio en virtud del cual la Unión actúa solo dentro de los límites de las competencias que le atribuyen los Estados miembros se denomina:",
            ["Principio de subsidiariedad", "Principio de atribución", "Principio de proporcionalidad", "Principio de cooperación leal"],
            1,
            "El art. 5.2 TUE define el principio de atribución.",
            "Tratado de la Unión Europea",
            "Artículo 5.2 TUE",
            "«En virtud del principio de atribución, la Unión actúa exclusivamente dentro de los límites de las competencias que le han atribuido los Estados miembros en los Tratados para lograr los objetivos que éstos determinan.»"
          ),
          q(
            "¿Qué Tratado suprimió formalmente la estructura de pilares de Maastricht y dotó de personalidad jurídica única a la UE?",
            ["Tratado de Ámsterdam", "Tratado de Niza", "Tratado de Lisboa", "Tratado de Roma"],
            2,
            "El Tratado de Lisboa (en vigor el 1 de diciembre de 2009) otorgó personalidad jurídica única.",
            "Tratado de Lisboa",
            "Artículo 47 TUE",
            "«La Unión tiene personalidad jurídica.»"
          ),
        ],
      },
      {
        title: "Instituciones de la Unión Europea",
        summary: "Consejo Europeo, Consejo de la UE, Comisión Europea, Parlamento Europeo y Tribunal de Justicia (TJUE).",
        npcName: "Hans Weber",
        npcRole: "Administrador del Consejo Europeo",
        npcLines: [
          "El Consejo Europeo define las orientaciones y prioridades políticas generales, pero no ejerce función legislativa (art. 15 TUE).",
          "La Comisión Europea ostenta el monopolio casi exclusivo de la iniciativa legislativa y vela por los Tratados.",
          "El TJUE garantiza el respeto del Derecho en la interpretación y aplicación de los Tratados.",
        ],
        tipName: "Sara",
        tipRole: "Especialista en Fondos Europeos",
        tipLines: [
          "Recuerda la mayoría cualificada en el Consejo: 55% de los Estados miembros que representen al menos el 65% de la población de la UE.",
        ],
        boeIds: [],
        questions: [
          q(
            "¿Cuál de las siguientes instituciones de la UE NO ejerce funciones legislativas?",
            ["El Parlamento Europeo", "El Consejo de la Unión Europea", "El Consejo Europeo", "La Comisión Europea"],
            2,
            "El artículo 15.1 TUE prohíbe expresamente que el Consejo Europeo ejerza función legislativa.",
            "Tratado de la Unión Europea",
            "Artículo 15.1 TUE",
            "«El Consejo Europeo dará a la Unión los impulsos necesarios para su desarrollo y definirá sus orientaciones y prioridades políticas generales. No ejercerá función legislativa alguna.»"
          ),
          q(
            "El Tribunal de Justicia de la Unión Europea (TJUE) tiene su sede en:",
            ["Bruselas", "Estrasburgo", "Luxemburgo", "La Haya"],
            2,
            "La sede oficial del TJUE y del Tribunal General está establecida en Luxemburgo.",
            "Protocolo sobre las sedes de las instituciones",
            "Protocolo n.º 6 anexo a los Tratados",
            "«El Tribunal de Justicia de la Unión Europea tendrá su sede en Luxemburgo.»"
          ),
        ],
      },
      {
        title: "Fuentes del Derecho UE y Presupuesto Comunitario",
        summary: "Reglamentos, directivas, decisiones, efecto directo, primacía y Marco Financiero Plurianual (MFP).",
        npcName: "Laura Benítez",
        npcRole: "Letrada experta en Derecho Comunitario",
        npcLines: [
          "El Reglamento tiene alcance general, es obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro.",
          "La Directiva obliga al Estado miembro en cuanto al resultado, dejando a las autoridades nacionales la forma y medios (transposición).",
          "El principio de primacía fue proclamado por el TJUE en la célebre sentencia Costa c. ENEL (1964).",
        ],
        tipName: "Álvaro",
        tipRole: "Gestor del PRTR",
        tipLines: [
          "Las Decisiones son obligatorias en todos sus elementos: si designan destinatarios, solo son obligatorias para éstos.",
        ],
        boeIds: [],
        questions: [
          q(
            "El acto legislativo europeo que tiene alcance general, es obligatorio en todos sus elementos y directamente aplicable es:",
            ["La Directiva", "El Reglamento", "La Decisión", "El Dictamen"],
            1,
            "El artículo 288 del TFUE define el Reglamento con eficacia directa e inmediata.",
            "Tratado de Funcionamiento de la UE",
            "Artículo 288 TFUE",
            "«El reglamento tendrá un alcance general. Será obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro.»"
          ),
          q(
            "Una Directiva europea se caracteriza por:",
            ["Ser directamente aplicable sin necesidad de norma interna", "Obligar al Estado en cuanto al resultado, requiriendo transposición nacional", "Carecer de valor vinculante alguno", "Aplicarse únicamente a los particulares"],
            1,
            "El art. 288 párrafo 3 TFUE establece la obligación de resultado de las directivas.",
            "Tratado de Funcionamiento de la UE",
            "Artículo 288 TFUE",
            "«La directiva obligará al Estado miembro destinatario en cuanto al resultado que deba conseguirse, dejando, sin embargo, a las autoridades nacionales la elección de la forma y de los medios.»"
          ),
        ],
      },
    ],
  },

  // =========================================================================
  // BLOQUE III: POLÍTICAS PÚBLICAS
  // =========================================================================
  {
    number: 3,
    title: "Políticas Públicas",
    ministry: "Ministerio de la Presidencia, Justicia y Relaciones con las Cortes",
    worldName: "Mundo 3 · Moncloa y Transformación Pública",
    description: "Ciclo de políticas, Gobierno Abierto, Transparencia (Ley 19/2013), Administración Digital, Protección de Datos, Igualdad y Agenda 2030.",
    theme: "ministerio",
    bossName: "Directora de Políticas Públicas",
    bossIntro: "¡Una política pública que no se evalúa es una política ciega! ¡Demuestra que conoces la Ley 19/2013 y las políticas de Igualdad!",
    bossStyle: "stamp",
    topics: [
      {
        title: "Ciclo de las Políticas Públicas y Gobierno Abierto",
        summary: "Formulación, diseño, implementación y evaluación. Participación ciudadana y rendición de cuentas.",
        npcName: "Clara Méndez",
        npcRole: "Analista de Políticas Públicas de la AGE",
        npcLines: [
          "El ciclo de las políticas consta de: definición del problema, inclusión en agenda, formulación, implementación y evaluación.",
          "El Gobierno Abierto descansa sobre tres pilares: transparencia, participación y colaboración.",
          "España forma parte de la Alianza para el Gobierno Abierto (OGP) desde 2011.",
        ],
        tipName: "David",
        tipRole: "Evaluador de Políticas en el INAP",
        tipLines: [
          "No confundas eficacia (logro de objetivos) con eficiencia (relación coste-beneficio o recursos empleados).",
        ],
        boeIds: ["BOE-A-2013-12887"],
        questions: [
          q(
            "¿Cuáles son los tres pilares fundamentales sobre los que se asienta el modelo de Gobierno Abierto?",
            ["Jerarquía, obediencia y discrecionalidad", "Transparencia, participación ciudadana y colaboración", "Privacidad, secreto y celeridad", "Fiscalización, sanción y recaudación"],
            1,
            "El Gobierno Abierto promueve la transparencia, la participación activa y la colaboración intersectorial.",
            "Alianza para el Gobierno Abierto",
            "Declaración de Gobierno Abierto",
            "«Nos comprometemos a aumentar la disponibilidad de información, apoyar la participación ciudadana y aplicar los más altos estándares de integridad profesional en nuestras administraciones.»"
          ),
          q(
            "En la evaluación de políticas públicas, la relación entre los resultados alcanzados y los recursos utilizados mide la:",
            ["Eficacia", "Eficiencia", "Equidad", "Legalidad"],
            1,
            "La eficiencia compara el resultado obtenido con el consumo de recursos públicos.",
            "Principios de Buena Gestión",
            "Art. 3.1 Ley 40/2015",
            "«Las Administraciones Públicas deberán respetar en su actuación los principios de eficacia, economía y eficiencia en la asignación y utilización de los recursos públicos.»"
          ),
        ],
      },
      {
        title: "Transparencia y Administración Digital",
        summary: "Ley 19/2013 de Transparencia, publicidad activa, derecho de acceso, España Digital y ENS (RD 311/2022).",
        npcName: "Ignacio Soto",
        npcRole: "Consejero del Consejo de Transparencia y Buen Gobierno",
        npcLines: [
          "La Ley 19/2013 regula la publicidad activa en el Portal de Transparencia y el derecho de acceso a la información pública.",
          "El plazo general para resolver las solicitudes de acceso a la información es de 1 mes (art. 20.1).",
          "El silencio administrativo en solicitudes de información de la Ley 19/2013 tiene sentido desestimatorio.",
        ],
        tipName: "Marina",
        tipRole: "Delegada de Protección de Datos",
        tipLines: [
          "Contra la resolución expresa o presunta de acceso cabe reclamación potestativa ante el Consejo de Transparencia previa a la vía contenciosa.",
        ],
        boeIds: ["BOE-A-2013-12887", "BOE-A-2018-16673", "BOE-A-2022-7191"],
        questions: [
          q(
            "Según la Ley 19/2013 de Transparencia, la resolución de una solicitud de acceso a la información debe notificarse en el plazo máximo de:",
            ["10 días hábiles", "Un mes desde la recepción de la solicitud por el órgano competente", "Tres meses", "Quince días prorrogables por otros quince"],
            1,
            "El artículo 20.1 de la Ley 19/2013 fija el plazo general de un mes.",
            "Ley 19/2013 de Transparencia",
            "Artículo 20.1 Ley 19/2013",
            "«La resolución en la que se conceda o deniegue el acceso deberá notificarse al solicitante y a los terceros afectados que así lo hayan solicitado en el plazo máximo de un mes desde la recepción de la solicitud por el órgano competente para resolver.»"
          ),
          q(
            "Transcurrido el plazo máximo para resolver una solicitud de acceso a la información pública sin notificación expresa, se entenderá:",
            ["Estimada por silencio positivo", "Desestimada por silencio negativo", "Caducado el procedimiento", "Suspendido el plazo"],
            1,
            "El artículo 20.4 de la Ley 19/2013 establece expresamente el silencio desestimatorio.",
            "Ley 19/2013 de Transparencia",
            "Artículo 20.4 Ley 19/2013",
            "«Transcurrido el plazo máximo para resolver sin que se haya dictado y notificado resolución expresa se entenderá que la solicitud ha sido desestimada.»"
          ),
        ],
      },
      {
        title: "Igualdad Efectiva, Violencia de Género y Agenda 2030",
        summary: "LO 3/2007 para la igualdad efectiva, LO 1/2004 contra la violencia de género y los 17 Objetivos de Desarrollo Sostenible (ODS).",
        npcName: "Patricia Rivas",
        npcRole: "Vocal Asesora de Políticas de Igualdad",
        npcLines: [
          "El principio de transversalidad de género (mainstreaming) obliga a todos los poderes públicos.",
          "Las empresas de 50 o más trabajadores están obligadas a elaborar y aplicar un Plan de Igualdad.",
          "La Agenda 2030 aprobada por la ONU en 2015 contiene 17 ODS y 169 metas universales.",
        ],
        tipName: "Carlos",
        tipRole: "Coordinador de Sostenibilidad",
        tipLines: [
          "El ODS 5 está dedicado expresamente a lograr la igualdad de género y empoderar a todas las mujeres y niñas.",
        ],
        boeIds: ["BOE-A-2007-6115", "BOE-A-2004-21760"],
        questions: [
          q(
            "A partir de cuántas personas trabajadoras es obligatorio para las empresas disponer de un Plan de Igualdad según la LO 3/2007:",
            ["25 trabajadoras", "50 trabajadoras", "100 trabajadoras", "250 trabajadoras"],
            1,
            "El artículo 45.2 de la Ley Orgánica 3/2007 (tras el RDL 6/2019) fija el umbral en 50 o más personas trabajadoras.",
            "Ley Orgánica 3/2007 de Igualdad",
            "Artículo 45.2 LO 3/2007",
            "«En el caso de las empresas de cincuenta o más personas trabajadoras, las medidas de igualdad a que se refiere el apartado anterior deberán dirigirse a la elaboración y aplicación de un plan de igualdad.»"
          ),
          q(
            "¿Cuál es el Objetivo de Desarrollo Sostenible (ODS) de la Agenda 2030 dedicado a promover instituciones eficaces, responsables e inclusivas?",
            ["ODS 3", "ODS 8", "ODS 16", "ODS 10"],
            2,
            "El ODS 16 promueve la paz, la justicia y las instituciones sólidas.",
            "Agenda 2030 de la ONU",
            "Meta ODS 16",
            "«Promover sociedades pacíficas e inclusivas para el desarrollo sostenible, facilitar el acceso a la justicia para todos y crear instituciones eficaces, responsables e inclusivas a todos los niveles.»"
          ),
        ],
      },
    ],
  },

  // =========================================================================
  // BLOQUE IV: DERECHO ADMINISTRATIVO GENERAL
  // =========================================================================
  {
    number: 4,
    title: "Derecho Administrativo General",
    ministry: "Ministerio de Justicia y Salas de lo Contencioso-Administrativo",
    worldName: "Mundo 4 · Palacio de Justicia y Procedimiento",
    description: "Ley 39/2015 (LPAC), Ley 40/2015 (LRJSP), Acto Administrativo, Fases del Procedimiento, Términos y Plazos, Recursos y Contratos (LCSP).",
    theme: "procedimiento",
    bossName: "Doña Procedimiento / Jueza de Alzada",
    bossIntro: "¡Silencio administrativo, plazos improrrogables y nulidad de pleno derecho! ¡Si dudas en un solo artículo te deniego la plaza!",
    bossStyle: "judge",
    topics: [
      {
        title: "Ley 39/2015 (LPAC): Acto Administrativo y Eficacia",
        summary: "Eficacia de los actos, ejecutividad, nulidad de pleno derecho (art. 47) y anulabilidad (art. 48).",
        npcName: "Don Alberto",
        npcRole: "Abogado del Estado",
        npcLines: [
          "Los actos administrativos se presumen válidos y producen efectos desde la fecha en que se dicten (art. 39.1 LPAC).",
          "Los supuestos de nulidad de pleno derecho son tasados e imprescriptibles (art. 47.1 LPAC).",
          "La anulabilidad es la regla general para cualquier otra infracción del ordenamiento (art. 48.1 LPAC).",
        ],
        tipName: "Beatriz",
        tipRole: "Opositora de Gestión",
        tipLines: [
          "Apréndete de memoria el art. 47.1: lesión de derechos fundamentales, incompetencia manifiesta por razón de materia o territorio, contenido imposible, delito...",
        ],
        boeIds: ["BOE-A-2015-10565"],
        questions: [
          q(
            "Los actos administrativos dictados por órgano manifiestamente incompetente por razón de la materia o del territorio son:",
            ["Anulables", "Nulos de pleno derecho", "Convalidables", "Meramente irregulares"],
            1,
            "El artículo 47.1.b de la Ley 39/2015 sanciona con nulidad de pleno derecho la incompetencia manifiesta material o territorial.",
            "Ley 39/2015 (LPAC)",
            "Artículo 47.1.b Ley 39/2015",
            "«Los actos de las Administraciones Públicas son nulos de pleno derecho en los casos siguientes: [...] b) Los dictados por órgano manifiestamente incompetente por razón de la materia o del territorio.»"
          ),
          q(
            "La convalidación de un acto administrativo anulable produce efectos desde:",
            ["La fecha en que se dictó el acto original con efectos retroactivos plenos", "La fecha en que tenga lugar la convalidación, salvo excepciones", "Siempre con efectos retroactivos de 3 meses", "El momento de la notificación del acto viciado"],
            1,
            "El art. 52.1 LPAC dispone que el acto convalidado produce efectos desde su fecha.",
            "Ley 39/2015 (LPAC)",
            "Artículo 52.1 Ley 39/2015",
            "«La Administración podrá convalidar los actos anulables, subsanando los vicios de que adolezcan. El acto de convalidación producirá efecto desde su fecha, salvo lo dispuesto en el artículo 39.3 para la retroactividad de los actos administrativos.»"
          ),
        ],
      },
      {
        title: "Fases del Procedimiento, Términos y Silencio Administrativo",
        summary: "Iniciación, ordenación, instrucción y finalización. Cómputo de plazos (art. 30) y silencio (art. 24).",
        npcName: "Rosa María",
        npcRole: "Jefa de Servicio de Procedimiento",
        npcLines: [
          "Si los plazos se fijan en días, se entienden hábiles, excluyéndose sábados, domingos y festivos (art. 30.2 LPAC).",
          "El plazo de resolución y notificación general si la norma no fija uno es de 3 meses (art. 21.3 LPAC).",
          "La regla general en procedimientos iniciados a solicitud del interesado es el silencio positivo, salvo excepciones legales.",
        ],
        tipName: "Guillermo",
        tipRole: "Preparador de Administrativo",
        tipLines: [
          "Cuidado: en recursos administrativos el silencio es siempre desestimatorio, excepto el 'doble silencio' en recurso de alzada (art. 24.1 párrafo 3).",
        ],
        boeIds: ["BOE-A-2015-10565"],
        questions: [
          q(
            "Cuando los plazos se señalan por días en la Ley 39/2015, se entiende que estos son:",
            ["Siempre naturales", "Hábiles, excluyéndose los sábados, los domingos y los declarados festivos", "Hábiles incluyendo los sábados", "Laborables según el convenio de la empresa"],
            1,
            "El artículo 30.2 de la Ley 39/2015 establece que los plazos por días son hábiles y excluyen los sábados.",
            "Ley 39/2015 (LPAC)",
            "Artículo 30.2 Ley 39/2015",
            "«Siempre que por Ley o en el Derecho de la Unión Europea no se exprese otro cómputo, cuando los plazos se señalen por días, se entiende que éstos son hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos.»"
          ),
          q(
            "Cuando las normas reguladoras de los procedimientos no fijen el plazo máximo para resolver y notificar, este será de:",
            ["Un mes", "Tres meses", "Seis meses", "Veinte días"],
            1,
            "El artículo 21.3 de la Ley 39/2015 establece el plazo supletorio general de tres meses.",
            "Ley 39/2015 (LPAC)",
            "Artículo 21.3 Ley 39/2015",
            "«Cuando las normas reguladoras de los procedimientos no fijen el plazo máximo, éste será de tres meses. Este plazo y los previstos en las normas reguladoras de los procedimientos se contarán [...] desde la fecha en que la solicitud haya tenido entrada en el registro electrónico.»"
          ),
        ],
      },
      {
        title: "Recursos Administrativos y Contratos del Sector Público",
        summary: "Recursos de alzada, potestativo de reposición y extraordinario de revisión. Contratos típicos de la Ley 9/2017 (LCSP).",
        npcName: "Don Gonzalo",
        npcRole: "Vocal del Tribunal Administrativo Central de Recursos Contractuales",
        npcLines: [
          "El recurso de alzada se interpone ante el superior jerárquico en el plazo de 1 mes si el acto es expreso (art. 122 LPAC).",
          "El recurso de reposición cabe contra actos que agoten la vía administrativa en el plazo de 1 mes (art. 124 LPAC).",
          "Los contratos del sector público son: obras, concesión de obras, concesión de servicios, suministro y servicios (art. 12 LCSP).",
        ],
        tipName: "Helena",
        tipRole: "Especialista en Contratación Pública",
        tipLines: [
          "El contrato menor tiene límites de valor estimado: obras < 40.000 €; suministros y servicios < 15.000 € (art. 118 LCSP).",
        ],
        boeIds: ["BOE-A-2015-10565", "BOE-A-2017-12902"],
        questions: [
          q(
            "El plazo para interponer recurso de alzada si el acto administrativo fuera expreso es de:",
            ["Diez días", "Un mes", "Dos meses", "Tres meses"],
            1,
            "El artículo 122.1 de la Ley 39/2015 fija en un mes el plazo de interposición de la alzada.",
            "Ley 39/2015 (LPAC)",
            "Artículo 122.1 Ley 39/2015",
            "«El plazo para la interposición del recurso de alzada será de un mes, si el acto fuera expreso. Transcurrido dicho plazo sin haberse interpuesto el recurso, el acto será firme a todos los efectos.»"
          ),
          q(
            "Según el artículo 118 de la Ley 9/2017 (LCSP), se consideran contratos menores los contratos de valor estimado inferior a:",
            ["50.000 € en obras y 18.000 € en servicios", "40.000 euros en contratos de obras y 15.000 euros en suministros o servicios", "30.000 € en todo tipo de contratos", "100.000 € en obras públicas"],
            1,
            "El art. 118.1 LCSP establece los umbrales de 40.000 € para obras y 15.000 € para suministros y servicios.",
            "Ley 9/2017 de Contratos del Sector Público",
            "Artículo 118.1 Ley 9/2017",
            "«Se consideran contratos menores los contratos de valor estimado inferior a 40.000 euros, cuando se trate de contratos de obras, o a 15.000 euros, cuando se trate de contratos de suministro o de servicios.»"
          ),
        ],
      },
    ],
  },

  // =========================================================================
  // BLOQUE V: ADMINISTRACIÓN DE RECURSOS HUMANOS
  // =========================================================================
  {
    number: 5,
    title: "Administración de Recursos Humanos",
    ministry: "Ministerio para la Transformación Digital y la Función Pública",
    worldName: "Mundo 5 · Ciudad del Empleo Público",
    description: "TREBEP (RDL 5/2015), Clases de Personal, Selección, Situaciones Administrativas, Retribuciones, Código de Conducta e Incompatibilidades.",
    theme: "inap",
    bossName: "Jefe de Personal y Recursos Humanos",
    bossIntro: "¡El TREBEP es la Biblia del gestor civil del Estado! ¿Conoces las situaciones administrativas, las faltas muy graves y la Ley 53/1984?",
    bossStyle: "stamp",
    topics: [
      {
        title: "El TREBEP: Clases de Personal y Procesos Selectivos",
        summary: "RDL 5/2015, funcionarios de carrera, interinos, personal laboral y eventual. Principios constitucionales de acceso.",
        npcName: "Don Valeriano",
        npcRole: "Director General de la Función Pública",
        npcLines: [
          "Los empleados públicos se clasifican en: funcionarios de carrera, interinos, personal laboral y personal eventual (art. 8 TREBEP).",
          "Los órganos de selección son colegiados y su composición responderá al principio de profesionalidad y paridad (art. 60 TREBEP).",
          "El personal eventual solo realiza funciones de confianza o asesoramiento especial (art. 12 TREBEP).",
        ],
        tipName: "Fernando",
        tipRole: "Opositor del Cuerpo de Gestión",
        tipLines: [
          "El personal funcionario interino es nombrado por razones expresamente justificadas de necesidad y urgencia (art. 10 TREBEP).",
        ],
        boeIds: ["BOE-A-2015-11719"],
        questions: [
          q(
            "Según el artículo 8.2 del TREBEP, los empleados públicos se clasifican en:",
            ["Funcionarios de carrera y personal contratado", "Funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual", "Personal fijo y personal temporal", "Cuerpos generales y cuerpos especiales"],
            1,
            "El artículo 8.2 del TREBEP establece las cuatro clases tasadas de empleados públicos.",
            "TREBEP (RDL 5/2015)",
            "Artículo 8.2 TREBEP",
            "«Los empleados públicos se clasifican en: a) Funcionarios de carrera. b) Funcionarios interinos. c) Personal laboral, ya sea fijo, por tiempo indefinido o temporal. d) Personal eventual.»"
          ),
          q(
            "El nombramiento como funcionario interino para la ejecución de programas de carácter temporal no podrá tener una duración superior a:",
            ["Un año", "Tres años, ampliable hasta doce meses más por ley", "Seis meses en un período de doce", "Cinco años improrrogables"],
            1,
            "El artículo 10.1.c del TREBEP fija el límite máximo de tres años ampliable doce meses.",
            "TREBEP (RDL 5/2015)",
            "Artículo 10.1.c TREBEP",
            "«La ejecución de programas de carácter temporal [...] no podrán tener una duración superior a tres años, ampliable hasta doce meses más por las leyes de Función Pública que se dicten en desarrollo de este Estatuto.»"
          ),
        ],
      },
      {
        title: "Derechos, Carrera Profesional y Situaciones Administrativas",
        summary: "Carrera horizontal y vertical, retribuciones básicas y complementarias, excedencias y servicios especiales (art. 85 y ss.).",
        npcName: "Pilar Guzmán",
        npcRole: "Subdirectora de Gestión de Retribuciones",
        npcLines: [
          "Las retribuciones básicas son el sueldo y los trienios, fijados en la Ley de Presupuestos (art. 23 TREBEP).",
          "Las situaciones administrativas son: servicio activo, servicios especiales, servicio en otras AAPP, excedencia y suspensión (art. 85).",
          "En servicios especiales se perciben las retribuciones del puesto de destino y se reserva la plaza.",
        ],
        tipName: "Lorena",
        tipRole: "Gestora de Personal en Delegación",
        tipLines: [
          "La excedencia voluntaria por interés particular exige haber prestado servicios efectivos durante un período mínimo de 5 años.",
        ],
        boeIds: ["BOE-A-2015-11719"],
        questions: [
          q(
            "Son retribuciones básicas de los funcionarios públicos según el TREBEP:",
            ["El sueldo, los trienios y las pagas extraordinarias en lo referente a sueldo y trienios", "El complemento de destino y el complemento específico", "La productividad y las gratificaciones por servicios extraordinarios", "El sueldo y el complemento de productividad"],
            0,
            "El artículo 23 del TREBEP define taxativamente las retribuciones básicas.",
            "TREBEP (RDL 5/2015)",
            "Artículo 23 TREBEP",
            "«Son retribuciones básicas: a) El sueldo asignado a cada Subgrupo o Grupo [...] b) Los trienios, que consisten en una cantidad, que será igual para cada Subgrupo o Grupo [...] Las pagas extraordinarias serán dos al año [...] por un importe, cada una de ellas, de las retribuciones básicas y, de la totalidad de las retribuciones complementarias, salvo [...]»"
          ),
          q(
            "¿En qué situación administrativa se declarará a un funcionario que sea elegido Diputado o Senador de las Cortes Generales?",
            ["Excedencia por interés particular", "Servicios especiales", "Suspensión de funciones", "Servicio en otras Administraciones Públicas"],
            1,
            "El artículo 87.1.c del TREBEP declara los servicios especiales al adquirir la condición de parlamentario.",
            "TREBEP (RDL 5/2015)",
            "Artículo 87.1.c TREBEP",
            "«Los funcionarios de carrera serán declarados en situación de servicios especiales: [...] c) Cuando sean elegidos miembros de las Cortes Generales o de las asambleas legislativas de las comunidades autónomas [...]»"
          ),
        ],
      },
      {
        title: "Deberes, Código de Conducta e Incompatibilidades",
        summary: "Principios éticos y de conducta (arts. 52-54 TREBEP), régimen disciplinario y Ley 53/1984 de Incompatibilidades.",
        npcName: "Ignacio Carvajal",
        npcRole: "Inspector General de Servicios",
        npcLines: [
          "El Código de Conducta se divide en principios éticos (art. 53) y principios de conducta (art. 54).",
          "Las faltas disciplinarias se tipifican en muy graves, graves y leves (art. 95 TREBEP).",
          "La Ley 53/1984 prohíbe el desempeño de un segundo puesto o actividad en el sector público, salvo las excepciones tasadas.",
        ],
        tipName: "Manuel",
        tipRole: "Preparador de Recursos Humanos",
        tipLines: [
          "La separación del servicio para funcionarios de carrera solo puede imponerse por la comisión de faltas muy graves.",
        ],
        boeIds: ["BOE-A-2015-11719", "BOE-A-1984-28229"],
        questions: [
          q(
            "La sanción disciplinaria de separación del servicio solo puede imponerse por la comisión de:",
            ["Faltas leves reiteradas", "Faltas graves", "Faltas muy graves", "Cualquier falta que cause daño patrimonial"],
            2,
            "El artículo 96.1.a del TREBEP reserva la separación del servicio exclusivamente a faltas muy graves.",
            "TREBEP (RDL 5/2015)",
            "Artículo 96.1.a TREBEP",
            "«Por razón de las faltas cometidas podrán imponerse las siguientes sanciones: a) Separación del servicio de los funcionarios, que en el caso de los funcionarios interinos comportará la revocación de su nombramiento, y que sólo podrá sancionar la comisión de faltas muy graves.»"
          ),
          q(
            "Según la Ley 53/1984 de Incompatibilidades, la autorización de compatibilidad para una segunda actividad en el sector público o privado requiere:",
            ["El visto bueno informal del superior jerárquico", "Resolución expresa previa del órgano competente antes de iniciar la actividad", "Comunicación verbal tras comenzar a ejercerla", "No requiere autorización si no supera 10 horas semanales"],
            1,
            "El artículo 1.3 de la Ley 53/1984 exige resolución expresa de reconocimiento de compatibilidad con carácter previo.",
            "Ley 53/1984 de Incompatibilidades",
            "Artículo 1.3 Ley 53/1984",
            "«En cualquier caso, el desempeño de un segundo puesto o actividad requerirá la previa y expresa autorización de compatibilidad, que no podrá suponer modificación de la jornada de trabajo y horario de los dos puestos y que se condiciona a su estricto cumplimiento en ambos.»"
          ),
        ],
      },
    ],
  },

  // =========================================================================
  // BLOQUE VI: GESTIÓN FINANCIERA Y SEGURIDAD SOCIAL
  // =========================================================================
  {
    number: 6,
    title: "Gestión Financiera y Seguridad Social",
    ministry: "Ministerio de Hacienda y Ministerio de Inclusión, Seguridad Social y Migraciones",
    worldName: "Mundo 6 · Real Casa de la Aduana y Tesoro",
    description: "Ley General Presupuestaria (Ley 47/2003 LGP), Ciclo Presupuestario, Fases del Gasto (ADOP), Control del Gasto (IGAE) y Régimen General de la Seguridad Social.",
    theme: "hacienda",
    bossName: "El Gran Interventor General",
    bossIntro: "¡Sin crédito presupuestario adecuado y suficiente todo acto es nulo de pleno derecho! ¡A ver cómo ejecutas las fases ADOP!",
    bossStyle: "inspector",
    topics: [
      {
        title: "Ley General Presupuestaria y Presupuestos del Estado",
        summary: "Ley 47/2003 (LGP), principios presupuestarios, estructura de los PGE y Ley de Estabilidad Presupuestaria.",
        npcName: "Don Bernardo",
        npcRole: "Interventor Delegado en el Ministerio de Hacienda",
        npcLines: [
          "Los Presupuestos Generales del Estado constituyen la expresión cifrada, conjunta y sistemática de los derechos y obligaciones a liquidar.",
          "El principio de legalidad financiera: no se puede asumir ningún gasto sin crédito presupuestario (art. 46 LGP).",
          "La estructura presupuestaria comprende: orgánica, por programas y económica (art. 39 LGP).",
        ],
        tipName: "Raquel",
        tipRole: "Auditora del Tribunal de Cuentas",
        tipLines: [
          "El Gobierno debe presentar los PGE en el Congreso al menos tres meses antes de la expiración de los del año anterior (antes del 1 de octubre).",
        ],
        boeIds: ["BOE-A-2003-21614", "BOE-A-1978-31229"],
        questions: [
          q(
            "Según el artículo 134.1 de la Constitución Española, a quién corresponde la elaboración de los Presupuestos Generales del Estado y a quién su examen, enmienda y aprobación:",
            ["Al Rey su elaboración y a las Cortes su aprobación", "Al Gobierno su elaboración y a las Cortes Generales su examen, enmienda y aprobación", "Al Ministerio de Hacienda exclusivamente", "Al Congreso su elaboración y al Senado su ratificación"],
            1,
            "El artículo 134.1 CE atribuye la elaboración al Gobierno y la potestad presupuestaria a las Cortes.",
            "Constitución Española",
            "Artículo 134.1 CE",
            "«Corresponde al Gobierno la elaboración de los Presupuestos Generales del Estado y a las Cortes Generales, su examen, enmienda y aprobación.»"
          ),
          q(
            "Los créditos para gastos se destinarán exclusivamente a la finalidad específica para la que hayan sido autorizados. Este principio se denomina:",
            ["Especialidad temporal", "Especialidad cualitativa", "Especialidad cuantitativa", "Unidad de caja"],
            1,
            "El artículo 42 de la LGP define el principio de especialidad cualitativa.",
            "Ley 47/2003 General Presupuestaria",
            "Artículo 42 Ley 47/2003",
            "«Los créditos para gastos se destinarán exclusivamente a la finalidad específica para la que hayan sido autorizados por la Ley de Presupuestos o por las modificaciones realizadas conforme a esta ley.»"
          ),
        ],
      },
      {
        title: "Modificaciones de Crédito y Ejecución del Gasto (Fases ADOP)",
        summary: "Transferencias, suplementos, créditos extraordinarios e incorporación de remanentes. Fases A, D, O y P.",
        npcName: "Victoria Santamaría",
        npcRole: "Jefa de Área de Gestión Presupuestaria",
        npcLines: [
          "Las fases del procedimiento de gasto son: Aprobación (A), Compromiso (D), Reconocimiento de la obligación (O) y Pago (P).",
          "El Compromiso del gasto (D) es el acto por el que se acuerda con un tercero la realización del gasto (art. 73.3 LGP).",
          "El Reconocimiento de la obligación (O) exige la previa acreditación de la prestación o derecho (regla del servicio hecho).",
        ],
        tipName: "Javier",
        tipRole: "Opositor de A2 Estado",
        tipLines: [
          "Recuerda las modificaciones de crédito: las transferencias trasladan importe entre créditos sin alterar la cuantía total del presupuesto.",
        ],
        boeIds: ["BOE-A-2003-21614"],
        questions: [
          q(
            "El acto administrativo mediante el cual se formaliza con un tercero la realización de obras o prestaciones por importe y condiciones determinadas se corresponde con la fase:",
            ["Aprobación del gasto (A)", "Compromiso del gasto (D)", "Reconocimiento de la obligación (O)", "Ordenación del pago (P)"],
            1,
            "El artículo 73.3 de la Ley 47/2003 (LGP) define el compromiso o disposición de gasto.",
            "Ley 47/2003 General Presupuestaria",
            "Artículo 73.3 Ley 47/2003",
            "«El compromiso es el acto mediante el cual se acuerda, con un tercero y tras el cumplimiento de los trámites legalmente establecidos, la realización de gastos previamente aprobados, por un importe determinado o determinable.»"
          ),
          q(
            "Para proceder al Reconocimiento de la Obligación (fase O) es requisito indispensable:",
            ["La simple previsión de que se realizará el servicio", "La acreditación documental ante el órgano competente de la realización de la prestación (servicio hecho)", "La firma del Ministro de Hacienda", "Que el ejercicio presupuestario haya concluido"],
            1,
            "El artículo 73.4 de la LGP exige la previa acreditación documental de la realización de la prestación.",
            "Ley 47/2003 General Presupuestaria",
            "Artículo 73.4 Ley 47/2003",
            "«El reconocimiento de la obligación es el acto mediante el cual se declara la existencia de un crédito exigible contra la Hacienda Pública estatal, derivado de un gasto aprobado y comprometido y que comporta la propuesta para su pago previa acreditación documental ante el órgano competente de la realización de la prestación.»"
          ),
        ],
      },
      {
        title: "Control del Gasto Público y Sistema de Seguridad Social",
        summary: "La IGAE, función interventora, control financiero permanente, auditoría pública y Régimen General de la Seguridad Social.",
        npcName: "Don Enrique",
        npcRole: "Interventor General del Estado (IGAE)",
        npcLines: [
          "La Intervención General de la Administración del Estado (IGAE) ejerce el control interno de la gestión económico-financiera.",
          "La función interventora fiscaliza previamente todos los actos de la AGE que den lugar al reconocimiento de derechos y obligaciones.",
          "El sistema de la Seguridad Social garantiza a los trabajadores y sus familias la asistencia y prestaciones ante contingencias.",
        ],
        tipName: "Silvia",
        tipRole: "Inspectora de Trabajo y Seguridad Social",
        tipLines: [
          "No confundas el control interno (ejercido por la IGAE) con el control externo del Tribunal de Cuentas (órgano supremo fiscalizador, art. 136 CE).",
        ],
        boeIds: ["BOE-A-2003-21614", "BOE-A-2015-11724"],
        questions: [
          q(
            "El control de legalidad interno previo de todos los actos de la Administración del Estado que impliquen gastos u obligaciones es ejercido por:",
            ["El Tribunal de Cuentas a posteriori", "La IGAE mediante la función interventora", "El Banco de España", "La Comisión General de Secretarios de Estado"],
            1,
            "El artículo 148 de la Ley 47/2003 atribuye la función interventora a la IGAE con carácter previo.",
            "Ley 47/2003 General Presupuestaria",
            "Artículo 148 Ley 47/2003",
            "«La función interventora tiene por objeto controlar, antes de que sean aprobados, los actos del sector público estatal que den lugar al reconocimiento de derechos o a la realización de gastos, así como los ingresos y pagos que de ellos se deriven, y la inversión o aplicación en general de sus fondos públicos, a fin de asegurar que su gestión se ajuste a las disposiciones aplicables en cada caso.»"
          ),
          q(
            "¿A qué entidad gestora de la Seguridad Social corresponde la gestión y administración de las prestaciones económicas del sistema (salvo desempleo)?",
            ["Tesorería General de la Seguridad Social (TGSS)", "Instituto Nacional de la Seguridad Social (INSS)", "Servicio Público de Empleo Estatal (SEPE)", "Instituto de Mayores y Servicios Sociales (IMSERSO)"],
            1,
            "El INSS tiene encomendada la gestión de las prestaciones económicas (jubilación, incapacidad, etc.), mientras la TGSS gestiona la caja única y cotización.",
            "Ley General de la Seguridad Social",
            "Artículo 66 RDL 8/2015",
            "«El Instituto Nacional de la Seguridad Social es una entidad gestora dotada de personalidad jurídica propia que tiene encomendada la gestión y administración de las prestaciones económicas del sistema de la Seguridad Social.»"
          ),
        ],
      },
    ],
  },
];
