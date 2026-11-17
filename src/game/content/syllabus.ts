// Contenido inicial del temario (editable después desde /admin).
// Referencias verificadas con el BOE; revisa siempre la convocatoria oficial.

export interface SyllabusQuestion {
  prompt: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
  reference?: string;
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
  { boeId: "BOE-A-2003-23186", shortName: "LGT (Ley 58/2003)" },
  { boeId: "BOE-A-2017-12902", shortName: "LCSP (Ley 9/2017)" },
  { boeId: "BOE-A-2013-12887", shortName: "Transparencia (Ley 19/2013)" },
  { boeId: "BOE-A-2018-16673", shortName: "LOPDGDD (LO 3/2018)" },
  { boeId: "BOE-A-2007-6115", shortName: "Igualdad (LO 3/2007)" },
  { boeId: "BOE-A-1985-5392", shortName: "LBRL (Ley 7/1985)" },
  { boeId: "BOE-A-2022-7191", shortName: "ENS (RD 311/2022)" },
];

// Personajes de la Plaza (mundo inicial / tutorial)
export const HUB_NPCS: { name: string; role: string; lines: string[] }[] = [
  {
    name: "Don Ramón",
    role: "Conserje de la Plaza",
    lines: [
      "¡Bienvenida a la Plaza de la Administración, Lucía!",
      "Cada mundo es un bloque del temario. Dentro hay temas: en cada tema encontrarás personajes que te lo explican.",
      "Salta con ESPACIO o ↑ y pulsa X (PUÑO) para romper rocas y golpear papeleos. Puedes pisarles la cabeza.",
      "Los bloques '?' guardan preguntas: acierta para ganar sellos. Al final de cada tema hay una prueba: necesitas 3 de 5.",
    ],
  },
  {
    name: "Marta",
    role: "Opositora veterana",
    lines: [
      "Al final de cada bloque te espera un jefe. Responde sus preguntas para derrotarlo.",
      "Cada acierto le quita energía; cada fallo te cuesta una vida. ¡Estudia con calma!",
      "Al final de todo está el Examen Final, que mezcla el temario completo. ¡Mucha suerte!",
    ],
  },
];

const q = (
  prompt: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
  reference?: string,
): SyllabusQuestion => ({ prompt, options, answer, explanation, reference });

export const SYLLABUS: SyllabusBlock[] = [
  {
    number: 1,
    title: "Constitución y organización del Estado",
    ministry: "Congreso de los Diputados",
    worldName: "Mundo 1 · Las Cortes Generales",
    description: "Constitución de 1978, Cortes Generales, Gobierno, Poder Judicial, Tribunal Constitucional y Comunidades Autónomas.",
    theme: "congreso",
    bossName: "Señor Quórum",
    bossIntro: "Sin quórum no hay pleno, y sin Constitución no hay Estado. ¿Sabes lo que dice mi Carta Magna?",
    bossStyle: "quorum",
    topics: [
      {
        title: "La Constitución de 1978",
        summary: "Estructura, Título Preliminar, derechos fundamentales y reforma constitucional.",
        npcName: "Doña Carmen",
        npcRole: "Catedrática de Derecho Constitucional",
        npcLines: [
          "La Constitución se aprobó en referéndum el 6 de diciembre de 1978 y es la norma suprema del ordenamiento.",
          "El artículo 1.1 CE define España como un Estado social y democrático de Derecho.",
          "Los derechos fundamentales y libertades públicas están en el Capítulo II del Título I (arts. 14 a 38).",
        ],
        tipName: "Julián",
        tipRole: "Opositor veterano",
        tipLines: [
          "Reforma: art. 167 (ordinaria, 3/5 de cada Cámara) y art. 168 (agravada: 2/3, disolución de Cortes y referéndum).",
        ],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          q("¿En qué año se aprobó en referéndum la Constitución Española?", ["1975", "1978", "1982", "1986"], 1, "Se ratificó en referéndum el 6 de diciembre de 1978.", "Constitución 1978"),
          q("Según el artículo 1.1 CE, España se constituye en un Estado…", ["Federal y plurinacional", "Social y democrático de Derecho", "Confederal y autonómico", "Unitario y centralizado"], 1, "El art. 1.1 CE proclama el Estado social y democrático de Derecho.", "Art. 1.1 CE"),
          q("¿Qué mayoría se exige para la reforma constitucional ordinaria?", ["Mayoría simple del Congreso", "3/5 de cada Cámara", "Referéndum obligatorio siempre", "Dos tercios del Senado"], 1, "El art. 167 exige 3/5 de cada Cámara.", "Art. 167 CE"),
          q("La reforma total de la Constitución requiere:", ["3/5 de las Cámaras", "2/3 de cada Cámara, disolución de las Cortes y referéndum", "Solo aprobación del Gobierno", "Mayoría absoluta del Senado"], 1, "El art. 168 prevé el procedimiento agravado.", "Art. 168 CE"),
          q("¿Qué artículo establece que la forma política del Estado es la Monarquía parlamentaria?", ["Art. 1.3", "Art. 2", "Art. 56", "Art. 9"], 0, "Art. 1.3 CE: la forma política del Estado español es la Monarquía parlamentaria.", "Art. 1.3 CE"),
          q("El artículo 9.3 CE garantiza, entre otros, los principios de:", ["Legalidad, jerarquía normativa y seguridad jurídica", "Unidad de caja", "Especialidad presupuestaria", "Descentralización administrativa"], 0, "Art. 9.3: legalidad, jerarquía normativa, publicidad, irretroactividad, seguridad jurídica e interdicción de la arbitrariedad.", "Art. 9.3 CE"),
        ],
      },
      {
        title: "Cortes Generales y Gobierno",
        summary: "Congreso, Senado, investidura, moción de censura y decretos-leyes.",
        npcName: "Marta del Pino",
        npcRole: "Letrada de las Cortes Generales",
        npcLines: [
          "Las Cortes Generales representan al pueblo español y se componen del Congreso y del Senado (art. 66 CE).",
          "El Congreso tiene 350 diputados elegidos por sufragio universal, libre, igual, directo y secreto (art. 68 CE).",
          "El Gobierno dirige la política interior y exterior y la Administración civil y militar (art. 97 CE).",
        ],
        tipName: "Pablo",
        tipRole: "Opositor de Hacienda",
        tipLines: [
          "La moción de censura exige mayoría absoluta del Congreso (art. 113 CE).",
          "Los decretos-leyes deben convalidarse en el Congreso en los 30 días siguientes a su promulgación (art. 86 CE).",
        ],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          q("¿Cuántos diputados componen el Congreso de los Diputados?", ["250", "300", "350", "400"], 2, "El art. 68.1 CE fija 350 diputados.", "Art. 68.1 CE"),
          q("¿Qué mayoría se exige para aprobar una moción de censura?", ["Mayoría simple", "Mayoría absoluta del Congreso", "Tres quintos del Senado", "Unanimidad"], 1, "Art. 113 CE: mayoría absoluta del Congreso.", "Art. 113 CE"),
          q("¿Cuánto dura el mandato de diputados y senadores?", ["2 años", "4 años", "5 años", "6 años"], 1, "Cuatro años, salvo disolución anticipada.", "Arts. 68.4 y 69.6 CE"),
          q("Las leyes orgánicas requieren para su aprobación:", ["Mayoría simple en el Senado", "Mayoría absoluta del Congreso en una votación de conjunto", "Referéndum", "Dos tercios del Congreso"], 1, "Art. 81.2 CE: mayoría absoluta del Congreso en votación de conjunto.", "Art. 81.2 CE"),
          q("En la investidura del Presidente del Gobierno:", ["Lo elige directamente el Senado", "El Rey propone un candidato tras consultar a los grupos y el Congreso lo invista", "Lo designa el Tribunal Supremo", "Se elige por sorteo"], 1, "Art. 99 CE: consultas del Rey, propuesta de candidato e investidura por el Congreso.", "Art. 99 CE"),
          q("¿En qué plazo deben convalidarse los decretos-leyes?", ["7 días hábiles", "30 días siguientes a su promulgación", "60 días naturales", "3 meses"], 1, "Art. 86.2 CE: en el plazo de 30 días siguientes a su promulgación.", "Art. 86.2 CE"),
        ],
      },
      {
        title: "Poder Judicial, Tribunal Constitucional y CCAA",
        summary: "Independencia judicial, CGPJ, TC y organización territorial del Estado.",
        npcName: "Ana Ruiz",
        npcRole: "Magistrada suplente",
        npcLines: [
          "El Poder Judicial es independiente y lo ejercen jueces y magistrados integrantes del Poder Judicial (arts. 117 a 127 CE).",
          "El Consejo General del Poder Judicial es el órgano de gobierno del Poder Judicial (art. 122 CE).",
          "El Tribunal Constitucional garantiza la supremacía de la Constitución y lo integran 12 magistrados (art. 159 CE).",
        ],
        tipName: "Hugo",
        tipRole: "Opositor de Justicia",
        tipLines: [
          "Vía del art. 143 (acceso ordinario) y vía del art. 151 (acceso reforzado, con referéndum).",
          "El art. 155 permite al Gobierno adoptar medidas ante incumplimientos graves de una CCAA, previo requerimiento y con autorización del Senado.",
        ],
        boeIds: ["BOE-A-1978-31229"],
        questions: [
          q("¿Cuántos magistrados componen el Tribunal Constitucional?", ["9", "10", "12", "15"], 2, "El art. 159.1 CE fija 12 magistrados.", "Art. 159.1 CE"),
          q("¿Cuál es el órgano de gobierno del Poder Judicial?", ["El Tribunal Supremo", "El Consejo General del Poder Judicial", "La Fiscalía General del Estado", "El Ministerio de Justicia"], 1, "El CGPJ es el órgano de gobierno del Poder Judicial.", "Art. 122 CE"),
          q("El Tribunal Constitucional se ocupa, entre otras cosas, de:", ["Recursos de amparo y conflictos constitucionales", "Aprobar los presupuestos", "Nombrar al Presidente del Gobierno", "Gestionar la Seguridad Social"], 0, "Art. 161 CE: recursos de inconstitucionalidad, amparo y conflictos.", "Art. 161 CE"),
          q("La vía del artículo 151 CE para constituir una Comunidad Autónoma se caracteriza por:", ["Ser la vía lenta de cinco años", "Ser una vía reforzada que exige referéndum", "No existir", "Ser exclusiva de Ceuta y Melilla"], 1, "Art. 151 CE: acceso reforzado (referéndum).", "Art. 151 CE"),
          q("El artículo 155 CE permite:", ["Declarar el estado de alarma", "Adoptar medidas ante incumplimiento grave de obligaciones por una CCAA", "Disolver el Congreso", "Suspender el Estatuto del Presidente"], 1, "Art. 155 CE: medidas ante incumplimiento grave de una CCAA.", "Art. 155 CE"),
          q("¿Qué artículo de la CE establece la organización territorial en municipios, provincias y CCAA?", ["Art. 137", "Art. 1.2", "Art. 56", "Art. 99"], 0, "Art. 137 CE: el Estado se organiza territorialmente en municipios, provincias y CCAA.", "Art. 137 CE"),
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Derecho administrativo y procedimiento",
    ministry: "Ministerio de la Presidencia",
    worldName: "Mundo 2 · Ventanilla del Procedimiento",
    description: "Régimen jurídico del sector público, procedimiento administrativo común, recursos, silencio y responsabilidad patrimonial.",
    theme: "ministerio",
    bossName: "Ministro del Silencio",
    bossIntro: "Callar también es una respuesta administrativa… ¿o no? Demuéstrame que conoces el procedimiento.",
    bossStyle: "stamp",
    topics: [
      {
        title: "Régimen jurídico del sector público (Ley 40/2015)",
        summary: "Principios de actuación, organización, relaciones interadministrativas y responsabilidad patrimonial.",
        npcName: "Sonia Ortega",
        npcRole: "Jefa de Servicio de Régimen Jurídico",
        npcLines: [
          "La Ley 40/2015 regula el régimen jurídico de las Administraciones Públicas y del sector público institucional.",
          "Principios de actuación: eficacia, jerarquía, descentralización, desconcentración y coordinación (art. 3).",
          "La responsabilidad patrimonial de las Administraciones se regula en los arts. 32 y siguientes.",
        ],
        tipName: "Ramón",
        tipRole: "Opositor de Gestión",
        tipLines: [
          "Las relaciones entre Administraciones se rigen por la lealtad institucional y la colaboración (Título III).",
        ],
        boeIds: ["BOE-A-2015-10566"],
        questions: [
          q("Según la Ley 40/2015, ¿cuál NO es un principio de actuación de las AAPP?", ["Eficacia", "Jerarquía", "Improvisación", "Coordinación"], 2, "El art. 3 enumera eficacia, jerarquía, descentralización, desconcentración y coordinación, entre otros.", "Art. 3 Ley 40/2015"),
          q("La responsabilidad patrimonial de las AAPP es de carácter:", ["Subjetivo y solo por dolo", "Directo (objetivo), por lesiones antijurídicas", "Subsidiario de los funcionarios", "Inexistente"], 1, "Responsabilidad directa de la Administración por lesiones que el particular no tenga el deber jurídico de soportar.", "Arts. 32 y ss. Ley 40/2015"),
          q("¿Qué figura transfiere competencias a otra entidad con personalidad jurídica propia?", ["Desconcentración", "Descentralización", "Avocación", "Encomienda de gestión"], 1, "La descentralización implica personalidad jurídica propia de la entidad receptora.", "Art. 3 Ley 40/2015"),
          q("¿Qué ley regula la organización de la Administración General del Estado y del Gobierno?", ["Ley 50/1997, del Gobierno", "Ley 39/2015", "Ley 19/2013", "Ley 9/2017"], 0, "La Ley 50/1997, del Gobierno, regula su organización y funcionamiento.", "Ley 50/1997"),
          q("El sector público institucional comprende, entre otros:", ["Solo los ministerios", "Organismos autónomos, entidades públicas empresariales y consorcios", "Solo las CCAA", "Empresas privadas concesionarias"], 1, "Tipología del sector público institucional (Ley 40/2015).", "Ley 40/2015"),
          q("Las relaciones entre Administraciones se rigen principalmente por:", ["Lealtad institucional", "Mayoría absoluta", "Silencio positivo", "Autonomía federal"], 0, "Principios de lealtad institucional, colaboración, coordinación y cooperación.", "Título III Ley 40/2015"),
        ],
      },
      {
        title: "Procedimiento administrativo común (Ley 39/2015)",
        summary: "Iniciación, registros, subsanación, plazos, obligación de relacionarse electrónicamente y notificación.",
        npcName: "Iván Castro",
        npcRole: "Jefe del Registro General",
        npcLines: [
          "La Ley 39/2015 regula el procedimiento administrativo común y los derechos de las personas en sus relaciones con la Administración.",
          "Las solicitudes pueden presentarse en el registro electrónico, en Correos o en las oficinas de asistencia en materia de registro (art. 16).",
          "Si la solicitud tiene defectos, se requiere la subsanación en 10 días (art. 68).",
        ],
        tipName: "Berta",
        tipRole: "Letrada de recursos",
        tipLines: [
          "Las personas jurídicas y los profesionales colegiados están obligados a relacionarse electrónicamente (art. 14).",
          "Las notificaciones se practicarán en el plazo máximo de diez días desde que el acto fue dictado (art. 40.3).",
        ],
        boeIds: ["BOE-A-2015-10565"],
        questions: [
          q("¿En qué plazo debe subsanarse una solicitud defectuosa según la Ley 39/2015?", ["5 días", "10 días", "15 días hábiles", "1 mes"], 1, "Art. 68: diez días para subsanar.", "Art. 68 Ley 39/2015"),
          q("¿Cuál es el plazo máximo para resolver si la norma no lo fija?", ["1 mes", "3 meses", "6 meses", "1 año"], 1, "Art. 21.3: tres meses salvo que la norma establezca otro.", "Art. 21.3 Ley 39/2015"),
          q("El procedimiento administrativo puede iniciarse:", ["Siempre de oficio", "A solicitud del interesado o de oficio", "Únicamente por denuncia", "Solo por silencio"], 1, "Puede iniciarse de oficio o a solicitud del interesado.", "Ley 39/2015"),
          q("La obligación de relacionarse electrónicamente con la Administración afecta a:", ["Todos los ciudadanos sin excepción", "Personas jurídicas, profesionales colegiados y otros colectivos", "Solo a los funcionarios", "A nadie"], 1, "Art. 14: colectivos obligados a relacionarse por medios electrónicos.", "Art. 14 Ley 39/2015"),
          q("Para qué sirve la notificación de un acto administrativo:", ["Para surtir efectos y dar conocimiento al interesado", "Solo para informar al público", "Para publicarse siempre en el BOE", "No tiene efecto alguno"], 0, "La notificación produce efectos y da conocimiento del acto.", "Art. 40 Ley 39/2015"),
          q("¿En qué plazo se practicarán las notificaciones desde que se dicta el acto?", ["10 días", "1 mes", "3 meses", "30 días hábiles"], 0, "Art. 40.3: plazo máximo de diez días.", "Art. 40.3 Ley 39/2015"),
        ],
      },
      {
        title: "Recursos, silencio y responsabilidad patrimonial",
        summary: "Alzada, reposición, silencio administrativo, nulidad y reclamaciones por daños.",
        npcName: "Teresa Vidal",
        npcRole: "Subdirectora de Recursos",
        npcLines: [
          "Los recursos administrativos son la alzada y la reposición. La reposición es potestativa y previa a la vía judicial (arts. 121 y 124).",
          "En procedimientos iniciados a solicitud del interesado, el silencio es con carácter general estimatorio (art. 24).",
          "Los actos nulos de pleno derecho están tasados en el art. 47 de la Ley 39/2015.",
        ],
        tipName: "Gonzalo",
        tipRole: "Técnico de la Administración",
        tipLines: [
          "Plazo de alzada y reposición: un mes (arts. 122 y 124).",
          "La responsabilidad patrimonial prescribe al año de producirse el hecho (art. 67).",
        ],
        boeIds: ["BOE-A-2015-10565", "BOE-A-2015-10566"],
        questions: [
          q("El plazo para interponer recurso de alzada es de:", ["10 días", "1 mes", "2 meses", "6 meses"], 1, "Art. 122: un mes.", "Art. 122 Ley 39/2015"),
          q("El silencio administrativo en procedimientos iniciados a solicitud del interesado es, con carácter general:", ["Desestimatorio", "Estimatorio (positivo), salvo excepciones legales", "Nulo", "Irrelevante"], 1, "Art. 24: silencio positivo con excepciones.", "Art. 24 Ley 39/2015"),
          q("¿Cuál de estos actos es NULO de pleno derecho?", ["El dictado por órgano manifiestamente incompetente por razón de la materia", "Un acto con defecto formal leve", "Un acto anulable por plazo", "Un acto irregular"], 0, "Art. 47.1.b: órgano manifiestamente incompetente por razón de la materia.", "Art. 47.1 Ley 39/2015"),
          q("La reposición es un recurso:", ["Judicial", "Potestativo y previo al contencioso-administrativo", "Obligatorio siempre", "Ante el Tribunal Constitucional"], 1, "Recurso potestativo; puede optarse por acudir directamente a la jurisdicción.", "Art. 124 Ley 39/2015"),
          q("Para reconocer responsabilidad patrimonial se exige:", ["Lesión real, efectiva, evaluable económicamente e individualizada, sin deber de soportarla", "Culpa grave", "Denuncia previa obligatoria", "Sentencia penal condenatoria"], 0, "Requisitos del art. 32 de la Ley 40/2015.", "Art. 32 Ley 40/2015"),
          q("El plazo para reclamar responsabilidad patrimonial es de:", ["1 año desde que se produjo el hecho o se manifestaron sus efectos", "3 meses", "5 años", "No tiene plazo"], 0, "Prescripción al año del hecho o de la manifestación del daño.", "Art. 67 Ley 39/2015"),
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Función pública y empleo público",
    ministry: "INAP · Escuela de la Función Pública",
    worldName: "Mundo 3 · Escuela de la Función Pública",
    description: "Estatuto Básico del Empleado Público, clases de personal, derechos, deberes, acceso y carrera profesional.",
    theme: "inap",
    bossName: "Tribunal de Oposiciones",
    bossIntro: "Silencio en la sala. Estudiante, el mérito y la capacidad son los únicos principios que aquí se evalúan.",
    bossStyle: "judge",
    topics: [
      {
        title: "Personal al servicio de las AAPP (TREBEP)",
        summary: "Clases de personal, funcionarios de carrera e interinos, personal laboral y principios de acceso.",
        npcName: "Elena Serrano",
        npcRole: "Profesora del INAP",
        npcLines: [
          "El TREBEP (RDL 5/2015) aprueba el Texto Refundido del Estatuto Básico del Empleado Público.",
          "Hay funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual.",
          "Los funcionarios de carrera se vinculan con la Administración por una relación estatutaria regulada por Derecho Administrativo.",
        ],
        tipName: "Luis",
        tipRole: "Opositor de Gestión",
        tipLines: [
          "El acceso se rige por los principios de igualdad, mérito, capacidad y publicidad (art. 55 TREBEP).",
        ],
        boeIds: ["BOE-A-2015-11719"],
        questions: [
          q("¿Qué norma aprueba el Texto Refundido del Estatuto Básico del Empleado Público?", ["Ley 39/2015", "RDL 5/2015", "Ley 19/2013", "LO 3/2007"], 1, "Real Decreto Legislativo 5/2015.", "RDL 5/2015"),
          q("¿Cuál es una clase de personal al servicio de las AAPP?", ["Becarios sin contrato", "Funcionarios de carrera", "Personal autónomo", "Consultores externos sin vinculación"], 1, "Funcionarios de carrera, interinos, personal laboral y eventual.", "Art. 8 TREBEP"),
          q("El acceso a la función pública se rige por los principios de:", ["Igualdad, mérito, capacidad y publicidad", "Discrecionalidad y amiguismo", "Antigüedad", "Libre designación"], 0, "Principios constitucionales de acceso (art. 55 TREBEP).", "Art. 55 TREBEP"),
          q("Los funcionarios interinos se nombran:", ["Para siempre, tras oposición", "Por razones de necesidad y urgencia para plazas vacantes o sustituciones", "Por elección popular", "Por sorteo"], 1, "Nombramiento temporal por necesidad y urgencia.", "Art. 10 TREBEP"),
          q("El personal laboral se rige por:", ["Derecho administrativo exclusivamente", "La legislación laboral y el convenio colectivo aplicable, según el TREBEP", "Solo la Constitución", "El Código Civil"], 1, "Se rige por la legislación laboral, con las especialidades del TREBEP.", "Art. 11 TREBEP"),
          q("¿Qué institución imparte formación para el acceso y carrera de los funcionarios de la AGE?", ["INAP (Instituto Nacional de Administración Pública)", "Agencia Tributaria", "CIS", "AEPD"], 0, "El INAP es el centro de formación de la Administración General del Estado.", "INAP"),
        ],
      },
      {
        title: "Derechos, deberes y código de conducta",
        summary: "Derechos individuales, deberes, principios éticos, código de conducta y responsabilidades.",
        npcName: "Rosa Lázaro",
        npcRole: "Delegada de personal",
        npcLines: [
          "Los empleados públicos tienen derechos como la carrera profesional, la retribución, la jornada, los permisos y el respeto a su intimidad (art. 14 TREBEP).",
          "Entre sus deberes está cumplir con diligencia las tareas asignadas y velar por los intereses generales (art. 52 TREBEP).",
          "Los principios éticos incluyen objetividad, integridad, neutralidad, responsabilidad e imparcialidad (art. 53 TREBEP).",
        ],
        tipName: "Sara",
        tipRole: "Opositora de Auxilio",
        tipLines: [
          "El código de conducta recoge conductas concretas que el empleado debe respetar (art. 54 TREBEP).",
          "Puede exigirse responsabilidad disciplinaria, penal y civil o patrimonial, según el caso.",
        ],
        boeIds: ["BOE-A-2015-11719"],
        questions: [
          q("¿Cuál es un deber de los empleados públicos?", ["Cumplir órdenes sin valorar su legalidad", "Cumplir con diligencia las tareas asignadas y velar por los intereses generales", "Atender solo a sus amigos", "Ocultar la información pública"], 1, "Art. 52 TREBEP: deberes del empleado público.", "Art. 52 TREBEP"),
          q("Los principios éticos del empleado público incluyen:", ["Objetividad, integridad, neutralidad e imparcialidad", "Lealtad al partido", "Arbitrariedad controlada", "Discrecionalidad total"], 0, "Art. 53 TREBEP.", "Art. 53 TREBEP"),
          q("Los derechos de los funcionarios incluyen:", ["Carrera profesional, retribuciones, jornada y permisos", "Solo el sueldo", "Ninguno en vacaciones", "Ser despedido sin causa"], 0, "Art. 14 TREBEP: derechos individuales.", "Art. 14 TREBEP"),
          q("Una situación administrativa de un funcionario es, por ejemplo:", ["Servicio activo", "Estar prohibido por ley", "Solo para interinos", "Equivalente al despido"], 0, "El servicio activo es una de las situaciones administrativas del TREBEP.", "TREBEP"),
          q("¿Quién ostenta la potestad disciplinaria sobre los funcionarios?", ["El Parlamento", "La Administración, mediante procedimiento disciplinario regulado", "El ciudadano denunciante", "La Fiscalía de forma exclusiva"], 1, "La Administración ejerce la potestad disciplinaria con procedimiento reglado.", "TREBEP"),
          q("Un principio ético que obliga a no favorecer a nadie por motivos personales es:", ["Imparcialidad", "Parcialidad", "Afinidad", "Sumisión"], 0, "La imparcialidad es un principio ético del empleado público.", "Art. 53 TREBEP"),
        ],
      },
      {
        title: "Acceso, carrera y procesos selectivos",
        summary: "Sistemas selectivos, tribunales calificadores, grupos de clasificación y carrera profesional.",
        npcName: "Miguel Ángel Prado",
        npcRole: "Presidente de tribunal (simulado)",
        npcLines: [
          "El TREBEP prevé oposición, concurso y concurso-oposición como sistemas selectivos (art. 61).",
          "Los órganos de selección o tribunales calificadores valoran los ejercicios y deben ser de composición especializada (art. 60).",
          "Los funcionarios se clasifican en grupos: A1, A2, C1 y C2 según la titulación exigida (art. 76).",
        ],
        tipName: "Clara",
        tipRole: "Opositora de Gestión",
        tipLines: [
          "La carrera profesional puede ser horizontal o vertical (art. 16 TREBEP).",
          "Requisitos generales de acceso: nacionalidad, edad y capacidad funcional, entre otros (art. 56).",
        ],
        boeIds: ["BOE-A-2015-11719"],
        questions: [
          q("¿Qué sistemas selectivos prevé el TREBEP?", ["Oposición, concurso y concurso-oposición", "Sorteo", "Designación libre", "Solo entrevista"], 0, "Art. 61 TREBEP.", "Art. 61 TREBEP"),
          q("¿Qué órgano valora los ejercicios de un proceso selectivo?", ["Órgano de selección o tribunal calificador", "El Consejo de Ministros", "Un notario", "El Congreso"], 0, "Art. 60 TREBEP: órganos de selección.", "Art. 60 TREBEP"),
          q("La carrera profesional de los funcionarios se estructura en:", ["Carrera horizontal y carrera vertical", "Solo grados", "Solo trienios", "Carrera militar"], 0, "Art. 16 TREBEP.", "Art. 16 TREBEP"),
          q("Para acceder a empleo público se exigen, entre otros requisitos:", ["Nacionalidad, edad y capacidad funcional", "Ser cargo político", "Pertenecer a un partido", "Tener 60 años"], 0, "Art. 56 TREBEP: requisitos generales.", "Art. 56 TREBEP"),
          q("Los grupos de clasificación profesional de los funcionarios son:", ["A1, A2, C1 y C2", "1, 2 y 3", "I, II y III", "Solo A y B"], 0, "Art. 76 TREBEP: grupos de clasificación.", "Art. 76 TREBEP"),
          q("Si un aspirante no supera un ejercicio de la oposición:", ["Puede seguir en el proceso", "Queda eliminado del proceso selectivo", "Pasa automáticamente a la siguiente fase", "Se le da otra oportunidad automática"], 1, "La no superación de un ejercicio de carácter eliminatorio supone la eliminación.", "Bases de la convocatoria"),
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Hacienda pública y contratación",
    ministry: "Ministerio de Hacienda · Torre de la Hacienda",
    worldName: "Mundo 4 · Torre de Hacienda",
    description: "Presupuestos Generales del Estado, Ley General Presupuestaria, subvenciones, contratación pública y tributos.",
    theme: "hacienda",
    bossName: "Inspector Tributario",
    bossIntro: "Todo se paga, todo se justifica. ¿Sabes cuánto dura la prescripción tributaria o cómo se aprueba un presupuesto?",
    bossStyle: "inspector",
    topics: [
      {
        title: "Presupuestos y Ley General Presupuestaria",
        summary: "Carácter anual, aprobación por Cortes, prórroga y control del gasto público.",
        npcName: "Gregorio Lamas",
        npcRole: "Interventor General",
        npcLines: [
          "Los Presupuestos Generales del Estado tienen carácter anual y su aprobación corresponde a las Cortes (art. 134 CE).",
          "La Ley General Presupuestaria (Ley 47/2003) regula el régimen presupuestario, la contabilidad y el control del sector público estatal.",
          "El Tribunal de Cuentas fiscaliza la gestión económico-financiera del sector público (art. 136 CE).",
        ],
        tipName: "Luisa",
        tipRole: "Analista presupuestaria",
        tipLines: [
          "Si no se aprueban los presupuestos al inicio del ejercicio, se prorrogan los del año anterior (art. 134.4 CE).",
        ],
        boeIds: ["BOE-A-2003-21614"],
        questions: [
          q("Los Presupuestos Generales del Estado tienen carácter:", ["Plurianual", "Anual", "Bienal", "Permanente"], 1, "Art. 134.2 CE: carácter anual.", "Art. 134.2 CE"),
          q("Si no se aprueban los presupuestos al inicio del ejercicio, se:", ["Suspenden los servicios públicos", "Prorrogan los del ejercicio anterior", "Aplican los del año siguiente", "Los decide el Presidente"], 1, "Art. 134.4 CE: prórroga presupuestaria.", "Art. 134.4 CE"),
          q("¿Qué principio presupuestario impide destinar un crédito a fines distintos de los previstos?", ["Especialidad", "Universalidad", "Unidad de caja", "Estabilidad"], 0, "Principio de especialidad cuantitativa y cualitativa.", "Ley 47/2003"),
          q("¿Qué órgano fiscaliza la gestión económico-financiera del sector público?", ["Tribunal de Cuentas", "Tribunal Constitucional", "Consejo de Estado", "Defensor del Pueblo"], 0, "Art. 136 CE.", "Art. 136 CE"),
          q("El ciclo presupuestario comprende:", ["Elaboración, aprobación, ejecución y control", "Solo la aprobación", "Solo la contabilidad", "Solo la ejecución del gasto"], 0, "Fases del ciclo presupuestario.", "Ley 47/2003"),
          q("¿Quién elabora y remite a las Cortes el proyecto de Presupuestos Generales del Estado?", ["El Gobierno", "El Tribunal de Cuentas", "La Agencia Tributaria", "El Senado"], 0, "El Gobierno elabora el proyecto y lo presenta a las Cortes.", "Art. 134 CE"),
        ],
      },
      {
        title: "Subvenciones y contratación pública",
        summary: "Concurrencia competitiva, procedimientos de licitación, contratos menores y control de subvenciones.",
        npcName: "Pilar Gómez",
        npcRole: "Jefa de Contratación",
        npcLines: [
          "La LCSP (Ley 9/2017) regula la contratación del sector público y busca la eficiencia y la libre concurrencia.",
          "Procedimientos de adjudicación: abierto, restringido, negociado, diálogo competitivo y asociación para la innovación.",
          "El contrato menor tiene tramitación simplificada, por debajo de umbrales (art. 118 LCSP).",
        ],
        tipName: "Adrián",
        tipRole: "Becario de subvenciones",
        tipLines: [
          "Las subvenciones se rigen por la Ley 38/2003, General de Subvenciones.",
          "Como regla general, la concesión de subvenciones se realiza mediante concurrencia competitiva.",
        ],
        boeIds: ["BOE-A-2017-12902"],
        questions: [
          q("¿Qué ley regula la contratación del sector público?", ["Ley 9/2017 (LCSP)", "Ley 58/2003", "Ley 38/2003", "Ley 47/2003"], 0, "La LCSP es la Ley 9/2017.", "Ley 9/2017"),
          q("Como regla general, la concesión de subvenciones se realiza mediante:", ["Concurrencia competitiva", "Adjudicación directa siempre", "Sorteo", "Decisión discrecional sin criterios"], 0, "Procedimiento general de concurrencia competitiva.", "Art. 22 Ley 38/2003"),
          q("Un procedimiento de contratación en el que cualquier empresa interesada puede presentar oferta es:", ["Abierto", "Negociado sin publicidad", "Menor", "Restringido"], 0, "El procedimiento abierto permite la presentación de ofertas por cualquier interesado.", "LCSP"),
          q("El contrato menor se caracteriza por:", ["Importe inferior a los umbrales de la LCSP y tramitación simplificada", "Ser siempre plurianual", "Requerir publicación en el DOUE", "Superar 1 millón de euros"], 0, "Contratos menores: umbrales económicos y tramitación simplificada.", "Art. 118 LCSP"),
          q("La Ley General de Subvenciones es:", ["Ley 38/2003", "Ley 9/2017", "RDL 5/2015", "Ley 39/2015"], 0, "Ley 38/2003, General de Subvenciones.", "Ley 38/2003"),
          q("El beneficiario de una subvención debe:", ["Cumplir la finalidad y justificar la aplicación de los fondos", "No justificar nada", "Pagar un canon anual", "Devolverla en 24 horas"], 0, "Obligaciones del beneficiario: cumplir la finalidad y justificar.", "Ley 38/2003"),
        ],
      },
      {
        title: "Tributos y Ley General Tributaria",
        summary: "Principios tributarios, tipos de tributos, prescripción y los impuestos principales.",
        npcName: "Vicente Montes",
        npcRole: "Inspector de Hacienda",
        npcLines: [
          "La Ley 58/2003, General Tributaria, regula la aplicación de los tributos y sus principios generales.",
          "Los tributos son tasas, impuestos y contribuciones especiales (art. 2 LGT).",
          "El plazo general de prescripción de los derechos tributarios es de cuatro años (art. 66 LGT).",
        ],
        tipName: "Nerea",
        tipRole: "Asesora fiscal",
        tipLines: [
          "El sistema tributario se inspira en los principios de capacidad económica, igualdad, progresividad y no confiscatoriedad (art. 31 CE).",
        ],
        boeIds: ["BOE-A-2003-23186"],
        questions: [
          q("¿Qué ley regula los principios generales de aplicación de los tributos?", ["Ley 58/2003, General Tributaria", "Ley 9/2017", "Ley 40/2015", "Ley 19/2013"], 0, "Ley 58/2003, LGT.", "Ley 58/2003"),
          q("¿Cuál es el plazo general de prescripción de los derechos tributarios?", ["1 año", "4 años", "10 años", "Imprescriptible"], 1, "Art. 66 LGT: cuatro años.", "Art. 66 LGT"),
          q("Según el art. 31 CE, el sistema tributario se inspira en:", ["Capacidad económica, igualdad, progresividad y no confiscatoriedad", "Partidismo", "Redistribución por sorteo", "Recaudación máxima"], 0, "Art. 31.1 CE.", "Art. 31.1 CE"),
          q("Las tasas son tributos que se exigen por:", ["Utilización del dominio público o prestación de servicios públicos", "Ingresos de una empresa privada", "Herencias", "Rentas de capital"], 0, "Art. 2 LGT: tasas por servicios o uso del dominio público.", "Art. 2 LGT"),
          q("El IRPF es un:", ["Impuesto directo sobre la renta personal", "Impuesto indirecto sobre el consumo", "Tasa municipal", "Contribución especial"], 0, "El IRPF grava la renta de las personas físicas (impuesto directo).", "Ley 35/2006"),
          q("El IVA es un:", ["Impuesto directo sobre el patrimonio", "Impuesto indirecto sobre el consumo", "Tasa local", "Multa"], 1, "El IVA grava el consumo: es un impuesto indirecto.", "Ley 37/1992"),
        ],
      },
    ],
  },
  {
    number: 5,
    title: "Administración digital, transparencia e igualdad",
    ministry: "Ministerio para la Transformación Digital",
    worldName: "Mundo 5 · Ciudad Digital",
    description: "Administración electrónica, Esquema Nacional de Seguridad, transparencia, protección de datos e igualdad efectiva.",
    theme: "digital",
    bossName: "Señor Ciberpapeleo",
    bossIntro: "¡Todo digital, todo en la nube, nada en papel! Veamos si dominas los registros, la transparencia y los datos.",
    bossStyle: "cyber",
    topics: [
      {
        title: "Administración electrónica y registros",
        summary: "Registros electrónicos, Esquema Nacional de Seguridad, interoperabilidad y firma electrónica.",
        npcName: "Óscar Mena",
        npcRole: "Técnico de Administración Electrónica",
        npcLines: [
          "La Administración electrónica se regula, sobre todo, en las leyes 39/2015 y 40/2015.",
          "El Esquema Nacional de Seguridad (RD 311/2022) fija los requisitos de seguridad de los sistemas electrónicos de las AAPP.",
          "El Reglamento eIDAS (UE) 910/2014 regula la identificación y la firma electrónica en la Unión Europea.",
        ],
        tipName: "Carla",
        tipRole: "Desarrolladora",
        tipLines: [
          "El Esquema Nacional de Interoperabilidad (Real Decreto 4/2010) regula el intercambio de datos entre Administraciones.",
          "Los registros electrónicos deben estar disponibles de forma permanente (art. 16 Ley 39/2015).",
        ],
        boeIds: ["BOE-A-2015-10565", "BOE-A-2022-7191"],
        questions: [
          q("¿Qué esquema regula los requisitos de seguridad de los sistemas electrónicos de las AAPP?", ["ENS (Esquema Nacional de Seguridad)", "ENI solamente", "Cl@ve", "RGPD"], 0, "Real Decreto 311/2022 (ENS).", "RD 311/2022"),
          q("El reglamento europeo sobre identificación y firma electrónica es:", ["eIDAS (Reglamento UE 910/2014)", "RGPD", "DSA", "AI Act"], 0, "Reglamento (UE) 910/2014, eIDAS.", "Reglamento eIDAS"),
          q("Las AAPP deben facilitar la presentación de documentos mediante:", ["Registro electrónico general", "Solo papel", "Fax", "Correo postal únicamente"], 0, "Art. 16 Ley 39/2015: registros electrónicos.", "Art. 16 Ley 39/2015"),
          q("¿Qué esquema regula la interoperabilidad entre Administraciones?", ["ENI (Esquema Nacional de Interoperabilidad)", "ENS", "RGPD", "LOPDGDD"], 0, "Real Decreto 4/2010: ENI.", "RD 4/2010"),
          q("Los documentos administrativos electrónicos deben garantizar:", ["Autenticidad, integridad y conservación", "Solo la fecha", "Firma manuscrita escaneada siempre", "Ningún requisito"], 0, "Garantías de autenticidad, integridad y conservación.", "Ley 39/2015"),
          q("La copia auténtica de un documento tiene:", ["Igual valor que el original", "Valor de simple copia", "Valor nulo", "Solo valor informativo"], 0, "La copia auténtica tiene la misma validez que el original.", "Ley 39/2015"),
        ],
      },
      {
        title: "Transparencia y acceso a la información",
        summary: "Publicidad activa, derecho de acceso, límites, plazos y buen gobierno.",
        npcName: "Jaime Ferrer",
        npcRole: "Responsable de Transparencia",
        npcLines: [
          "La Ley 19/2013 regula la publicidad activa, el derecho de acceso a la información pública y el buen gobierno.",
          "La Administración debe resolver las solicitudes de acceso en un mes, ampliable en otro mes (art. 20).",
          "El Consejo de Transparencia y Buen Gobierno es el órgano de control de la transparencia en la AGE.",
        ],
        tipName: "Lorena",
        tipRole: "Opositora de Igualdad",
        tipLines: [
          "Límites al acceso: seguridad nacional, defensa, intimidad y protección de datos (arts. 14 y 15).",
        ],
        boeIds: ["BOE-A-2013-12887"],
        questions: [
          q("El plazo para resolver una solicitud de acceso a la información es de:", ["15 días hábiles", "1 mes, ampliable en otro mes", "3 meses", "6 meses"], 1, "Art. 20 Ley 19/2013.", "Art. 20 Ley 19/2013"),
          q("Un límite al derecho de acceso es:", ["La seguridad nacional", "Solicitar información sin motivo", "El tamaño del archivo", "La lengua del solicitante"], 0, "Art. 14 Ley 19/2013: límites.", "Art. 14 Ley 19/2013"),
          q("El órgano estatal de control en materia de transparencia es:", ["Consejo de Transparencia y Buen Gobierno", "Tribunal de Cuentas", "Defensor del Menor", "INE"], 0, "CTBG, órgano de control.", "Ley 19/2013"),
          q("La publicidad activa obliga a:", ["Publicar de oficio información institucional, organizativa, de planificación y económica", "Solo responder a peticiones", "No publicar nada", "Publicar solo en inglés"], 0, "Art. 5 Ley 19/2013: publicidad activa.", "Art. 5 Ley 19/2013"),
          q("El derecho de acceso se ejerce:", ["Sin necesidad de motivar la solicitud", "Solo por abogados", "Mediante carta notarial", "Previo pago de una tasa obligatoria"], 0, "Art. 17.3 Ley 19/2013: no es necesario motivar la solicitud (con excepciones).", "Art. 17 Ley 19/2013"),
          q("Los principios de buen gobierno aplican a:", ["Los altos cargos y responsables públicos", "Solo a los ciudadanos", "Nadie", "Solo a las empresas privadas"], 0, "Título II Ley 19/2013: buen gobierno de altos cargos.", "Título II Ley 19/2013"),
        ],
      },
      {
        title: "Protección de datos e igualdad efectiva",
        summary: "RGPD, LOPDGDD, brechas de seguridad, derechos de los interesados y LO 3/2007.",
        npcName: "Amparo Ruiz",
        npcRole: "Delegada de Protección de Datos",
        npcLines: [
          "El RGPD (Reglamento UE 2016/679) y la LO 3/2018 (LOPDGDD) regulan el tratamiento de datos personales.",
          "Las Administraciones públicas deben designar un Delegado de Protección de Datos (art. 37 RGPD).",
          "Las brechas de seguridad deben notificarse a la autoridad de control en un plazo de 72 horas (art. 33 RGPD).",
        ],
        tipName: "Álvaro",
        tipRole: "Técnico de igualdad",
        tipLines: [
          "La LO 3/2007 tiene por objeto hacer efectiva la igualdad entre mujeres y hombres.",
          "El principio de igualdad y no discriminación está en el art. 14 CE.",
        ],
        boeIds: ["BOE-A-2018-16673", "BOE-A-2007-6115"],
        questions: [
          q("El plazo para notificar una brecha de seguridad a la autoridad de control es de:", ["24 horas", "72 horas", "7 días", "1 mes"], 1, "Art. 33 RGPD: 72 horas.", "Art. 33 RGPD"),
          q("El RGPD es un reglamento de la UE que se aplica:", ["Directamente en todos los Estados miembros", "Solo si lo aprueba la CCAA", "Solo al sector privado", "Como directiva"], 0, "Los reglamentos europeos son directamente aplicables.", "RGPD"),
          q("¿Cuál es el plazo para responder a un ejercicio de derechos (acceso, rectificación…) según el RGPD?", ["1 mes (prorrogable en 2 meses si es complejo)", "1 año", "24 horas", "No tiene plazo"], 0, "Art. 12.3 RGPD.", "Art. 12.3 RGPD"),
          q("La LO 3/2007 tiene por objeto:", ["Hacer efectiva la igualdad entre mujeres y hombres", "Regular el IVA", "Regular la caza", "Regular las carreteras"], 0, "Art. 1 LO 3/2007.", "LO 3/2007"),
          q("La LOPDGDD fue aprobada por:", ["Ley Orgánica 3/2018", "Ley 9/2017", "RD 4/2010", "Ley 58/2003"], 0, "LO 3/2018, de Protección de Datos Personales y garantía de los derechos digitales.", "LO 3/2018"),
          q("¿Qué autoridad supervisa la aplicación del RGPD en España?", ["Agencia Española de Protección de Datos (AEPD)", "Agencia Tributaria", "Tribunal de Cuentas", "Consejo de Estado"], 0, "La AEPD es la autoridad de control en España.", "LOPDGDD"),
        ],
      },
    ],
  },
  {
    number: 6,
    title: "Unión Europea y Administración local",
    ministry: "Unión Europea · Bruselas y Estrasburgo",
    worldName: "Mundo 6 · Bruselas",
    description: "Instituciones y fuentes del Derecho de la UE, y régimen local y autonómico.",
    theme: "europa",
    bossName: "Comisario de Bruselas",
    bossIntro: "Veintisiete países, un solo mercado y un montón de normas. ¿Sabes quién propone las leyes europeas?",
    bossStyle: "stars",
    topics: [
      {
        title: "Instituciones de la Unión Europea",
        summary: "Parlamento, Consejo, Consejo Europeo, Comisión, TJUE y BCE.",
        npcName: "Helena Ibáñez",
        npcRole: "Funcionaria del Parlamento Europeo",
        npcLines: [
          "Las instituciones de la UE son el Parlamento Europeo, el Consejo Europeo, el Consejo, la Comisión, el TJUE, el BCE y el Tribunal de Cuentas (art. 13 TUE).",
          "El Parlamento Europeo es elegido por sufragio universal directo cada cinco años.",
          "La Comisión tiene, con carácter general, la iniciativa legislativa.",
        ],
        tipName: "Mateo",
        tipRole: "Becario en Bruselas",
        tipLines: [
          "El Consejo Europeo define las orientaciones políticas generales y no ejerce función legislativa (art. 15 TUE).",
        ],
        boeIds: [],
        questions: [
          q("¿Qué institución ostenta, con carácter general, la iniciativa legislativa en la UE?", ["Comisión Europea", "Parlamento Europeo", "Consejo Europeo", "TJUE"], 0, "La Comisión tiene la iniciativa legislativa ordinaria.", "Art. 17 TUE"),
          q("El Parlamento Europeo se elige cada:", ["4 años", "5 años", "6 años", "7 años"], 1, "Elecciones cada cinco años.", "Art. 14 TUE"),
          q("¿Cuál es el órgano judicial de la Unión Europea?", ["Tribunal de Justicia de la UE (TJUE)", "Tribunal Supremo", "Tribunal de Cuentas", "Tribunal Europeo de Derechos Humanos"], 0, "El TJUE garantiza la interpretación uniforme del Derecho de la UE.", "Art. 19 TUE"),
          q("¿Qué institución gestiona la política monetaria del euro?", ["Banco Central Europeo (BCE)", "Consejo de Europa", "Comisión Europea", "Parlamento Europeo"], 0, "El BCE gestiona la política monetaria de la zona euro.", "Art. 282 TFUE"),
          q("El Consejo Europeo está formado por:", ["Jefes de Estado o de Gobierno de los Estados miembros y su Presidente", "Diputados europeos", "Comisarios", "Juristas"], 0, "Art. 15 TUE.", "Art. 15 TUE"),
          q("Las instituciones de la UE se enumeran en:", ["Art. 13 TUE", "Art. 1 CE", "Art. 9 CE", "Art. 1 RGPD"], 0, "Art. 13 TUE.", "Art. 13 TUE"),
        ],
      },
      {
        title: "Fuentes del Derecho de la Unión Europea",
        summary: "Derecho originario y derivado: reglamentos, directivas, decisiones y recomendaciones.",
        npcName: "Jan Van Dijk",
        npcRole: "Abogado de asuntos europeos",
        npcLines: [
          "El Derecho originario lo forman los Tratados (TUE y TFUE) y la Carta de los Derechos Fundamentales de la UE.",
          "Los reglamentos son obligatorios y directamente aplicables en todos los Estados miembros.",
          "Las directivas obligan en cuanto al resultado y deben transponerse por los Estados dentro del plazo fijado.",
        ],
        tipName: "Irene",
        tipRole: "Experta en transposición",
        tipLines: [
          "Las decisiones obligan a sus destinatarios concretos; las recomendaciones y dictámenes no son vinculantes.",
        ],
        boeIds: [],
        questions: [
          q("Un reglamento de la UE:", ["Requiere transposición obligatoria", "Es obligatorio y directamente aplicable en todos los Estados", "Solo obliga a los Estados que lo voten", "Es una recomendación"], 1, "Art. 288 TFUE: alcance general y obligatorio.", "Art. 288 TFUE"),
          q("Una directiva se caracteriza por:", ["Obligar en cuanto al resultado, con transposición en plazo", "Ser siempre directamente aplicable", "No vincular a los Estados", "Ser un acuerdo internacional sin efectos"], 0, "Art. 288 TFUE: obligatoria en cuanto al resultado.", "Art. 288 TFUE"),
          q("¿Qué tipo de norma es una decisión de la UE?", ["Obligatoria para sus destinatarios", "Recomendación sin fuerza", "Tratado internacional", "Norma nacional"], 0, "Art. 288 TFUE.", "Art. 288 TFUE"),
          q("Los Tratados constitutivos forman parte del Derecho:", ["Originario", "Derivado", "Consuetudinario nacional", "Penal"], 0, "Derecho originario de la UE.", "TUE y TFUE"),
          q("En la jerarquía básica del Derecho de la UE, en primer lugar se sitúan:", ["Los Tratados", "Las directivas", "Los reglamentos", "La jurisprudencia nacional"], 0, "Los Tratados son la norma primaria de la UE.", "TUE y TFUE"),
          q("Las recomendaciones de la UE:", ["No son vinculantes", "Son obligatorias", "Son reglamentos", "Son sanciones"], 0, "Art. 288 TFUE: las recomendaciones no son vinculantes.", "Art. 288 TFUE"),
        ],
      },
      {
        title: "Administración local y autonómica",
        summary: "Bases del régimen local, órganos municipales, Diputaciones y Estatutos de Autonomía.",
        npcName: "Teresa Gil",
        npcRole: "Secretaria municipal",
        npcLines: [
          "La Ley 7/1985 (LBRL) regula las bases del régimen local: municipios, provincias e islas.",
          "Órganos necesarios del municipio: el alcalde, el pleno y, en su caso, la junta de gobierno local.",
          "La Secretaría municipal es un puesto de habilitación de carácter nacional.",
        ],
        tipName: "Gonzalo",
        tipRole: "Técnico de Comunidad Autónoma",
        tipLines: [
          "Las CCAA asumen competencias según lo previsto en sus Estatutos de Autonomía (art. 147 CE).",
        ],
        boeIds: ["BOE-A-1985-5392"],
        questions: [
          q("¿Qué ley regula las bases del régimen local?", ["Ley 7/1985 (LBRL)", "Ley 39/2015", "Ley 50/1997", "Ley 9/2017"], 0, "LBRL, Ley 7/1985.", "Ley 7/1985"),
          q("El pleno del Ayuntamiento lo integran:", ["Los concejales electos, presidido por el alcalde", "Solo el alcalde", "Diputados provinciales", "Vecinos elegidos por sorteo"], 0, "El pleno está formado por concejales electos.", "LBRL"),
          q("¿En qué artículo de la CE se prevén los Estatutos de Autonomía?", ["Art. 147", "Art. 9", "Art. 56", "Art. 81"], 0, "Art. 147 CE: contenido de los Estatutos.", "Art. 147 CE"),
          q("El alcalde es elegido por:", ["Los concejales del Ayuntamiento", "El Gobierno de España", "Los vecinos por sorteo", "El presidente de la Diputación"], 0, "Lo eligen los concejales (LOREG).", "LOREG"),
          q("¿Qué entidad local agrupa municipios de una provincia y presta asistencia a los pequeños?", ["La Diputación Provincial", "El Gobierno autonómico", "Un ministerio", "Un tribunal"], 0, "Las Diputaciones prestan asistencia y cooperación a municipios.", "LBRL"),
          q("Las Comunidades Autónomas se organizan, entre otros, en:", ["Parlamento, Gobierno y Tribunal Superior de Justicia", "Ministerios estatales", "Un único poder", "Tribunales militares"], 0, "Art. 152 CE: órganos institucionales de la CCAA.", "Art. 152 CE"),
        ],
      },
    ],
  },
];

export const TUTORIAL_TITLE = "Llegada a la Plaza";
