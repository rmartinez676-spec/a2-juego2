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
    "number": 1,
    "title": "Organización del Estado y de la Administración Pública",
    "ministry": "Congreso de los Diputados y Cortes Generales",
    "worldName": "Mundo 1 · Las Cortes y Órganos Constitucionales",
    "description": "Constitución de 1978, Derechos Fundamentales, Cortes Generales, Gobierno, Poder Judicial, AGE y Organización Territorial.",
    "theme": "congreso",
    "bossName": "Señor Quórum",
    "bossIntro": "¡Sin quórum no hay sesión y sin dominar la Constitución no hay plaza en el Cuerpo de Gestión! ¡Demuestra tu conocimiento!",
    "bossStyle": "quorum",
    "topics": [
      {
        "title": "Tema 1. La Constitución Española de 1978 y reforma constitucional",
        "summary": "Estructura, valores superiores y vías de reforma (arts. 167 y 168 CE).",
        "npcName": "Doña Carmen",
        "npcRole": "Catedrática de Derecho Constitucional",
        "npcLines": [
          "La Constitución tiene 169 artículos y 10 Títulos.",
          "El art. 1.1 proclama el Estado social y democrático de Derecho.",
          "La reforma agravada exige 2/3 de cada Cámara."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 167 y 168 CE."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "¿Qué mayoría exige el principio de reforma agravada del art. 168 CE en cada Cámara?",
            "options": [
              "Mayoría absoluta",
              "Mayoría de dos tercios",
              "Mayoría de tres quintos",
              "Mayoría simple"
            ],
            "answer": 1,
            "explanation": "El art. 168.1 CE exige mayoría de 2/3 de cada Cámara y disolución inmediata de las Cortes.",
            "reference": "Art. 168.1 CE",
            "legalArticle": "Art. 168.1 CE",
            "legalText": "Si se propusiere la revisión total o de partes protegidas, se procederá a la aprobación del principio por mayoría de dos tercios de cada Cámara y disolución de Cortes."
          },
          {
            "prompt": "En la reforma constitucional ordinaria (art. 167 CE), ¿qué plazo y quórum se exige para solicitar referéndum potestativo?",
            "options": [
              "15 días siguientes a su aprobación por la décima parte de los miembros de cualquiera de las Cámaras",
              "30 días por la quinta parte de los Diputados",
              "20 días por la mayoría absoluta del Senado",
              "60 días por 500.000 ciudadanos"
            ],
            "answer": 0,
            "explanation": "El art. 167.3 CE establece que aprobada la reforma se someterá a referéndum si lo solicita una décima parte de cualquier Cámara en 15 días.",
            "reference": "Art. 167.3 CE",
            "legalArticle": "Art. 167.3 CE",
            "legalText": "Aprobada la reforma por las Cortes, será sometida a referéndum dentro de los quince días siguientes a su aprobación, si lo solicita una décima parte de los miembros de cualquiera de las Cámaras."
          },
          {
            "prompt": "¿Puede ejercerse la iniciativa popular para la reforma constitucional en España?",
            "options": [
              "Sí, aportando un mínimo de 500.000 firmas acreditadas",
              "No, la iniciativa popular no procede en materia de reforma constitucional",
              "Sí, si la avalan tres parlamentos autonómicos",
              "Solo para la reforma ordinaria del art. 167 CE"
            ],
            "answer": 1,
            "explanation": "El art. 166 remite a los apartados 1 y 2 del art. 87 (Gobierno, Congreso, Senado y CCAA), excluyendo expresamente la iniciativa popular del art. 87.3.",
            "reference": "Arts. 166 y 87 CE",
            "legalArticle": "Art. 166 CE",
            "legalText": "La iniciativa de reforma constitucional se ejercerá en los términos previstos en los apartados 1 y 2 del artículo 87."
          },
          {
            "prompt": "Según el art. 169 de la Constitución, ¿cuándo NO puede iniciarse la reforma constitucional?",
            "options": [
              "Durante los seis meses previos a elecciones generales",
              "En tiempo de guerra o bajo la vigencia de los estados de alarma, excepción o sitio",
              "Durante la tramitación de una moción de censura",
              "Cuando el Gobierno se encuentre en funciones"
            ],
            "answer": 1,
            "explanation": "El art. 169 CE prohíbe taxativamente iniciar reformas constitucionales en tiempo de guerra o estados de crisis del art. 116.",
            "reference": "Art. 169 CE",
            "legalArticle": "Art. 169 CE",
            "legalText": "No podrá iniciarse la reforma constitucional en tiempo de guerra o de vigencia de alguno de los estados previstos en el artículo 116."
          }
        ]
      },
      {
        "title": "Tema 2. Derechos y deberes fundamentales y Defensor del Pueblo",
        "summary": "Garantías constitucionales, recurso de amparo y Ley Orgánica 3/1981.",
        "npcName": "Letrado Javier",
        "npcRole": "Letrado de las Cortes",
        "npcLines": [
          "Los arts. 14 a 29 y el 30.2 gozan de recurso de amparo ante el TC.",
          "El Defensor del Pueblo es comisionado de las Cortes.",
          "Su mandato es de 5 años."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Art. 53.2 CE y Ley 3/1981."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "¿Qué preceptos constitucionales gozan de tutela mediante recurso de amparo ante el Tribunal Constitucional?",
            "options": [
              "Todo el Título I",
              "Los arts. 14 a 29 y la objeción de conciencia del 30.2",
              "Solo los derechos fundamentales de participación política del art. 23",
              "Los principios rectores de la política social y económica del Cap. III"
            ],
            "answer": 1,
            "explanation": "El art. 53.2 CE consagra el recurso de amparo ante el TC para el art. 14, la Sección 1ª del Cap. II (arts. 15-29) y el art. 30.2.",
            "reference": "Art. 53.2 CE",
            "legalArticle": "Art. 53.2 CE",
            "legalText": "Cualquier ciudadano podrá recabar la tutela de las libertades y derechos reconocidos en el artículo 14 y la Sección primera del Capítulo II ante el Tribunal Constitucional por recurso de amparo."
          },
          {
            "prompt": "¿Por qué periodo es designado el Defensor del Pueblo y ante quién es responsable?",
            "options": [
              "Por 5 años y es responsable ante el Presidente del Gobierno",
              "Por 5 años y no está sujeto a mandato imperativo, rindiendo cuentas ante las Cortes Generales",
              "Por 4 años renovables por el Consejo de Ministros",
              "Por 9 años coincidentes con el Tribunal Constitucional"
            ],
            "answer": 1,
            "explanation": "Según la Ley Orgánica 3/1981, el mandato del Defensor del Pueblo es de 5 años y no recibe instrucciones de ninguna autoridad.",
            "reference": "Arts. 2 y 6 LO 3/1981",
            "legalArticle": "Art. 2.1 LO 3/1981",
            "legalText": "El Defensor del Pueblo será elegido por las Cortes Generales para un periodo de cinco años."
          },
          {
            "prompt": "¿Qué derechos pueden ser suspendidos de forma individual en investigaciones de bandas armadas o terrorismo (art. 55.2 CE)?",
            "options": [
              "El derecho a la vida y a la integridad física",
              "El plazo máximo de detención preventiva, la inviolabilidad del domicilio y el secreto de las comunicaciones",
              "El derecho de reunión y manifestación",
              "El derecho de huelga y libertad sindical"
            ],
            "answer": 1,
            "explanation": "El art. 55.2 CE permite suspender de forma individual los arts. 17.2 (detención), 18.2 (domicilio) y 18.3 (comunicaciones).",
            "reference": "Art. 55.2 CE",
            "legalArticle": "Art. 55.2 CE",
            "legalText": "Una ley orgánica podrá determinar la forma y los casos en los que los derechos de los arts. 17.2, 18.2 y 18.3 pueden ser suspendidos para personas determinadas."
          },
          {
            "prompt": "El Defensor del Pueblo está legitimado por la Constitución para interponer:",
            "options": [
              "Solo recursos de amparo ante el Tribunal Constitucional",
              "El recurso de inconstitucionalidad y el recurso de amparo",
              "La cuestión de inconstitucionalidad promovida por jueces",
              "El recurso de casación contencioso-administrativo"
            ],
            "answer": 1,
            "explanation": "El art. 162.1 CE legitima expresamente al Defensor del Pueblo para interponer tanto el recurso de inconstitucionalidad como el recurso de amparo.",
            "reference": "Art. 162.1 CE",
            "legalArticle": "Art. 162.1 CE",
            "legalText": "Están legitimados para interponer el recurso de inconstitucionalidad y de amparo el Defensor del Pueblo."
          }
        ]
      },
      {
        "title": "Tema 3. El Tribunal Constitucional. Composición y competencias",
        "summary": "Composición (12 miembros), designación y recursos de inconstitucionalidad.",
        "npcName": "Magistrado Soto",
        "npcRole": "Letrado del Tribunal Constitucional",
        "npcLines": [
          "El TC se compone de 12 miembros nombrados por el Rey.",
          "El mandato es de 9 años y se renuevan por terceras partes.",
          "Están legitimados para el recurso 50 Diputados o 50 Senadores."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Art. 159 CE y LOTC."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "¿Por cuánto tiempo son nombrados los magistrados del Tribunal Constitucional y cómo se renuevan?",
            "options": [
              "Por 4 años coincidentes con la legislatura",
              "Por 9 años, renovándose por terceras partes (4 miembros) cada 3 años",
              "Por 5 años renovables una sola vez",
              "Con carácter vitalicio e inamovible"
            ],
            "answer": 1,
            "explanation": "El art. 159.3 CE establece que los magistrados son nombrados por 9 años y se renuevan por terceras partes cada 3 años.",
            "reference": "Art. 159.3 CE",
            "legalArticle": "Art. 159.3 CE",
            "legalText": "Los miembros del Tribunal Constitucional serán designados por un período de nueve años y se renovarán por terceras partes cada tres."
          },
          {
            "prompt": "¿Quiénes proponen a los 12 magistrados del Tribunal Constitucional según el art. 159.1 CE?",
            "options": [
              "4 por el Congreso (3/5), 4 por el Senado (3/5), 2 por el Gobierno y 2 por el CGPJ (3/5)",
              "6 por el Congreso y 6 por el Senado por mayoría absoluta",
              "12 por el Rey a propuesta libre del Consejo de Ministros",
              "8 por el CGPJ y 4 por las Cortes Generales"
            ],
            "answer": 0,
            "explanation": "El art. 159.1 CE dispone 4 a propuesta del Congreso (3/5), 4 del Senado (3/5), 2 del Gobierno y 2 del CGPJ.",
            "reference": "Art. 159.1 CE",
            "legalArticle": "Art. 159.1 CE",
            "legalText": "El Tribunal Constitucional se compone de 12 miembros: cuatro a propuesta del Congreso, cuatro del Senado, dos del Gobierno y dos del CGPJ."
          },
          {
            "prompt": "¿Quiénes están legitimados para interponer el recurso de inconstitucionalidad contra leyes?",
            "options": [
              "Cualquier ciudadano español en ejercicio de la acción popular",
              "El Presidente del Gobierno, el Defensor del Pueblo, 50 Diputados, 50 Senadores y órganos ejecutivos/asambleas de CCAA",
              "Solo los jueces y tribunales ordinarios",
              "Los colegios profesionales y sindicatos más representativos"
            ],
            "answer": 1,
            "explanation": "El art. 162.1.a) CE enumera taxativamente los legitimados para el recurso de inconstitucionalidad.",
            "reference": "Art. 162.1.a CE",
            "legalArticle": "Art. 162.1.a CE",
            "legalText": "Están legitimados para el recurso de inconstitucionalidad: el Presidente del Gobierno, el Defensor del Pueblo, 50 Diputados, 50 Senadores y los órganos colegiados ejecutivos y las Asambleas de las CCAA."
          },
          {
            "prompt": "¿Cuál es el plazo ordinario de interposición del recurso de inconstitucionalidad desde la publicación de la ley en el BOE?",
            "options": [
              "1 mes improrrogable",
              "3 meses, ampliable a 9 meses si se inicia acuerdo en Comisión Bilateral de Cooperación",
              "2 meses conforme a la Ley de la Jurisdicción Contenciosa",
              "1 año natural"
            ],
            "answer": 1,
            "explanation": "El art. 33 LOTC fija 3 meses, ampliable a 9 meses en supuestos de discrepancias Estado-CCAA tratadas en Comisión Bilateral.",
            "reference": "Art. 33 LOTC",
            "legalArticle": "Art. 33 LOTC",
            "legalText": "El recurso de inconstitucionalidad se interpondrá en el plazo de tres meses a partir de la publicación, ampliable a nueve meses para evitar el conflicto."
          }
        ]
      },
      {
        "title": "Tema 4. La Corona. Funciones constitucionales del Rey y refrendo",
        "summary": "Título II CE. Inviolabilidad, orden sucesorio, regencia y refrendo de actos.",
        "npcName": "Cronista Real",
        "npcRole": "Historiador Constitucional",
        "npcLines": [
          "El Rey es el Jefe del Estado y su persona es inviolable.",
          "Sus actos son siempre refrendados por el Gobierno o Cortes.",
          "De los actos del Rey responden las personas que los refrendan."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 56 a 65 CE."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "¿Quién refrenda la propuesta y el nombramiento del Presidente del Gobierno (art. 64.1 in fine CE)?",
            "options": [
              "El Rey personalmente bajo su fe",
              "El Presidente del Congreso de los Diputados",
              "El Ministro de la Presidencia en funciones",
              "El Presidente del Tribunal Constitucional"
            ],
            "answer": 1,
            "explanation": "El art. 64.1 CE reserva el refrendo de la propuesta y nombramiento del Presidente del Gobierno y disolución del art. 99 al Presidente del Congreso.",
            "reference": "Art. 64.1 CE",
            "legalArticle": "Art. 64.1 CE",
            "legalText": "La propuesta y el nombramiento del Presidente del Gobierno, y la disolución prevista en el artículo 99, serán refrendados por el Presidente del Congreso."
          },
          {
            "prompt": "¿De qué actos del Rey NO se requiere refrendo ministerial según la Constitución?",
            "options": [
              "El nombramiento de los Ministros",
              "El nombramiento y relevo de los miembros civiles y militares de su Casa",
              "La sanción y promulgación de las leyes",
              "El mando supremo de las Fuerzas Armadas"
            ],
            "answer": 1,
            "explanation": "El art. 65.2 CE establece que el Rey nombra y releva libremente a los miembros de su Casa sin refrendo.",
            "reference": "Art. 65.2 CE",
            "legalArticle": "Art. 65.2 CE",
            "legalText": "El Rey nombra y releva libremente a los miembros civiles y militares de su Casa."
          },
          {
            "prompt": "En caso de minoría de edad del Rey, ¿quién entra a ejercer la Regencia según el art. 59.1 CE?",
            "options": [
              "El Presidente del Senado",
              "El padre o la madre del Rey y, en su defecto, el pariente mayor de edad más próximo a suceder",
              "El Consejo de Ministros colegiadamente",
              "Un tutor designado por testamento"
            ],
            "answer": 1,
            "explanation": "El art. 59.1 CE llama inmediatamente a la Regencia al padre o madre del Rey y pariente más próximo.",
            "reference": "Art. 59.1 CE",
            "legalArticle": "Art. 59.1 CE",
            "legalText": "Cuando el Rey fuere menor de edad, el padre o la madre del Rey y, en su defecto, el pariente mayor de edad más próximo a suceder en la Corona, entrará a ejercer la Regencia."
          },
          {
            "prompt": "Respecto a la responsabilidad y actos del Rey, la Constitución determina que:",
            "options": [
              "El Rey responde penalmente ante la Sala Segunda del Tribunal Supremo",
              "La persona del Rey es inviolable y no está sujeta a responsabilidad; de sus actos responden quienes los refrendan",
              "El Rey responde civilmente pero no penalmente",
              "El Rey comparte responsabilidad solidaria con el Ministro del ramo"
            ],
            "answer": 1,
            "explanation": "El art. 56.3 CE consagra la inviolabilidad absoluta y el traslado de responsabilidad al refrendante.",
            "reference": "Art. 56.3 CE",
            "legalArticle": "Art. 56.3 CE",
            "legalText": "La persona del Rey es inviolable y no está sujeta a responsabilidad. Sus actos estarán siempre refrendados, careciendo de validez sin dicho refrendo."
          }
        ]
      },
      {
        "title": "Tema 5. Las Cortes Generales: Congreso, Senado y procedimiento legislativo",
        "summary": "Bicameralismo, estatuto parlamentario y tramitación de leyes orgánicas y ordinarias.",
        "npcName": "Don Anselmo",
        "npcRole": "Oficial Mayor de las Cortes",
        "npcLines": [
          "Las Cortes Generales ejercen la potestad legislativa del Estado.",
          "El Congreso cuenta con 350 Diputados conforme a la LOREG.",
          "Las Leyes Orgánicas exigen mayoría absoluta del Congreso."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 66 a 92 CE."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "La aprobación, modificación o derogación de una Ley Orgánica exige en el Congreso de los Diputados:",
            "options": [
              "Mayoría simple de los presentes",
              "Mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto",
              "Mayoría de dos tercios de ambas Cámaras",
              "Mayoría de tres quintos del Congreso y del Senado"
            ],
            "answer": 1,
            "explanation": "El art. 81.2 CE exige mayoría absoluta de los miembros del Congreso en votación final sobre el texto global.",
            "reference": "Art. 81.2 CE",
            "legalArticle": "Art. 81.2 CE",
            "legalText": "La aprobación, modificación o derogación de las leyes orgánicas exigirá mayoría absoluta del Congreso, en una votación final sobre el conjunto del proyecto."
          },
          {
            "prompt": "El Senado dispone para vetar o enmendar un proyecto de ley ordinaria remitido por el Congreso de un plazo de:",
            "options": [
              "15 días hábiles",
              "2 meses naturales (reducido a 20 días naturales en proyectos declarados urgentes)",
              "3 meses improrrogables",
              "30 días naturales en todo caso"
            ],
            "answer": 1,
            "explanation": "El art. 90.2 y 90.3 CE fija dos meses como regla general y 20 días naturales en casos de urgencia.",
            "reference": "Art. 90 CE",
            "legalArticle": "Art. 90.2 CE",
            "legalText": "El Senado en el plazo de dos meses puede vetar o enmendar el proyecto. El plazo de dos meses se reducirá al de veinte días naturales en los proyectos urgentes."
          },
          {
            "prompt": "Para levantar un veto interpuesto por el Senado a un proyecto de ley, el Congreso necesita ratificar el texto por:",
            "options": [
              "Mayoría absoluta, o por mayoría simple una vez transcurridos dos meses",
              "Mayoría de 3/5 en todo caso",
              "Mayoría simple inmediata",
              "Mayoría de dos tercios de los Diputados"
            ],
            "answer": 0,
            "explanation": "El art. 90.2 CE permite levantar el veto por mayoría absoluta inicial o transcurridos dos meses por mayoría simple.",
            "reference": "Art. 90.2 CE",
            "legalArticle": "Art. 90.2 CE",
            "legalText": "El veto deberá ser aprobado por mayoría absoluta. El proyecto no podrá ser sometido al Rey sin que el Congreso lo ratifique por mayoría absoluta, o por mayoría simple dos meses después."
          },
          {
            "prompt": "Respecto a la inmunidad parlamentaria (art. 71 CE), los Diputados y Senadores durante su mandato:",
            "options": [
              "No pueden ser detenidos bajo ninguna circunstancia",
              "Solo podrán ser detenidos en caso de flagrante delito y no podrán ser inculpados sin previa autorización de la Cámara (suplicatorio)",
              "Solo responden ante los tribunales de su circunscripción",
              "Gozan de inmunidad absoluta que impide cualquier enjuiciamiento de por vida"
            ],
            "answer": 1,
            "explanation": "El art. 71.2 CE protege a los parlamentarios frente a detenciones salvo flagrante delito y exige suplicatorio para procesar.",
            "reference": "Art. 71.2 CE",
            "legalArticle": "Art. 71.2 CE",
            "legalText": "Durante el período de su mandato los Diputados y Senadores gozarán de inmunidad y sólo podrán ser detenidos en caso de flagrante delito. No podrán ser inculpados ni procesados sin la previa autorización de la Cámara."
          }
        ]
      },
      {
        "title": "Tema 6. El Poder Ejecutivo. Gobierno y relaciones con las Cortes",
        "summary": "Ley 50/1997 del Gobierno. Consejo de Ministros, moción de censura y cuestión de confianza.",
        "npcName": "Doña Beatriz",
        "npcRole": "Secretaria General de Coordinación",
        "npcLines": [
          "El Gobierno dirige la política interior y exterior y la Administración.",
          "La moción de censura es constructiva y requiere mayoría absoluta.",
          "La cuestión de confianza se aprueba por mayoría simple."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 97 a 115 CE y Ley 50/1997."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "La aprobación de una moción de censura contra el Gobierno exige en el Congreso de los Diputados:",
            "options": [
              "Mayoría simple de los presentes",
              "Mayoría absoluta e inclusión de un candidato a la Presidencia del Gobierno",
              "Mayoría de tres quintos",
              "Aprobación conjunta por Congreso y Senado"
            ],
            "answer": 1,
            "explanation": "El art. 113 CE exige mayoría absoluta y candidato alternativo; si se aprueba, el candidato se entiende investido.",
            "reference": "Art. 113 CE",
            "legalArticle": "Art. 113.1 y 2 CE",
            "legalText": "El Congreso puede exigir responsabilidad política al Gobierno mediante moción de censura adoptada por mayoría absoluta, que deberá incluir un candidato a la Presidencia."
          },
          {
            "prompt": "¿Qué mayoría se exige para otorgar la confianza al Presidente del Gobierno en la cuestión de confianza (art. 112 CE)?",
            "options": [
              "Mayoría simple de los Diputados presentes",
              "Mayoría absoluta de los miembros del Congreso",
              "Mayoría de 3/5 del Congreso",
              "Mayoría absoluta de Congreso y Senado"
            ],
            "answer": 0,
            "explanation": "El art. 112 CE señala que la confianza se entenderá otorgada cuando vote a favor la mayoría simple de los Diputados.",
            "reference": "Art. 112 CE",
            "legalArticle": "Art. 112 CE",
            "legalText": "La confianza se entenderá otorgada cuando vote a favor de la misma la mayoría simple de los Diputados."
          },
          {
            "prompt": "Según la Ley 50/1997 del Gobierno, ¿quiénes componen preceptivamente el Gobierno?",
            "options": [
              "El Presidente, los Vicepresidentes, los Ministros y los Secretarios de Estado",
              "El Presidente, el o los Vicepresidentes en su caso, y los Ministros",
              "El Presidente, los Ministros y los Subsecretarios",
              "El Consejo de Ministros ampliado con los Delegados del Gobierno"
            ],
            "answer": 1,
            "explanation": "El art. 1.2 de la Ley 50/1997 establece que el Gobierno se compone del Presidente, de los Vicepresidentes cuando existan y de los Ministros.",
            "reference": "Art. 1.2 Ley 50/1997",
            "legalArticle": "Art. 1.2 Ley 50/1997",
            "legalText": "El Gobierno se compone del Presidente, del Vicepresidente o Vicepresidentes, en su caso, y de los Ministros."
          },
          {
            "prompt": "¿Puede el Presidente del Gobierno en funciones disolver las Cortes Generales?",
            "options": [
              "Sí, previa deliberación del Consejo de Ministros",
              "No, el Presidente en funciones no puede proponer la disolución de las Cortes, ni plantear la cuestión de confianza",
              "Solo en caso de catástrofe nacional",
              "Sí, con autorización del Rey"
            ],
            "answer": 1,
            "explanation": "El art. 21.4 de la Ley 50/1997 prohíbe expresamente al Presidente en funciones disolver las Cortes o plantear cuestión de confianza.",
            "reference": "Art. 21.4 Ley 50/1997",
            "legalArticle": "Art. 21.4 Ley 50/1997",
            "legalText": "El Presidente del Gobierno en funciones no podrá proponer al Rey la disolución de alguna de las Cámaras, ni plantear la cuestión de confianza."
          }
        ]
      },
      {
        "title": "Tema 7. El Poder Judicial. El CGPJ y el Ministerio Fiscal",
        "summary": "Principio de unidad jurisdiccional, gobierno de los jueces y principios del Ministerio Fiscal.",
        "npcName": "Don Fernando",
        "npcRole": "Magistrado Judicial",
        "npcLines": [
          "La justicia emana del pueblo y se administra en nombre del Rey.",
          "El CGPJ se compone de 20 miembros más el Presidente del TS por 5 años.",
          "El Ministerio Fiscal actúa bajo unidad de actuación y dependencia jerárquica."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 117 a 127 CE y LOPJ."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "¿Por cuántos miembros se compone el Consejo General del Poder Judicial y cuál es su mandato?",
            "options": [
              "12 miembros nombrados por 4 años",
              "20 miembros (12 entre Jueces/Magistrados y 8 juristas de reconocida competencia) más el Presidente por 5 años",
              "15 miembros designados por 6 años",
              "21 miembros renovados por tercios cada 3 años"
            ],
            "answer": 1,
            "explanation": "El art. 122.3 CE fija 20 miembros elegidos por 5 años: 12 entre jueces y magistrados y 8 juristas, presididos por el Presidente del TS.",
            "reference": "Art. 122.3 CE",
            "legalArticle": "Art. 122.3 CE",
            "legalText": "El CGPJ estará integrado por el Presidente del Tribunal Supremo, que lo presidirá, y por veinte miembros nombrados por el Rey por un periodo de cinco años."
          },
          {
            "prompt": "Los principios constitucionales que rigen la actuación del Ministerio Fiscal (art. 124.2 CE) son:",
            "options": [
              "Independencia absoluta y sumisión exclusiva a la ley",
              "Unidad de actuación y dependencia jerárquica, con sujeción a los principios de legalidad e imparcialidad",
              "Autonomía orgánica y descentralización territorial",
              "Inamovilidad e inmunidad parlamentaria"
            ],
            "answer": 1,
            "explanation": "El art. 124.2 CE consagra expresamente los principios de unidad de actuación, dependencia jerárquica, legalidad e imparcialidad.",
            "reference": "Art. 124.2 CE",
            "legalArticle": "Art. 124.2 CE",
            "legalText": "El Ministerio Fiscal ejerce sus funciones conforme a los principios de unidad de actuación y dependencia jerárquica y con sujeción, en todo caso, a los de legalidad e imparcialidad."
          },
          {
            "prompt": "¿Quién nombra al Fiscal General del Estado según el art. 124.4 de la Constitución?",
            "options": [
              "Las Cortes Generales por mayoría de tres quintos",
              "El Rey, a propuesta del Gobierno, oído el Consejo General del Poder Judicial",
              "El pleno del Tribunal Supremo",
              "La Junta de Fiscales de Sala"
            ],
            "answer": 1,
            "explanation": "El art. 124.4 CE establece que el Fiscal General del Estado es nombrado por el Rey, a propuesta del Gobierno, oído el CGPJ.",
            "reference": "Art. 124.4 CE",
            "legalArticle": "Art. 124.4 CE",
            "legalText": "El Fiscal General del Estado será nombrado por el Rey, a propuesta del Gobierno, oído el Consejo General del Poder Judicial."
          },
          {
            "prompt": "El principio constitucional de exclusividad de la jurisdicción (art. 117.3 CE) implica que:",
            "options": [
              "Los jueces solo pueden dedicarse a la judicatura y no percibir ningún otro sueldo",
              "El ejercicio de la potestad jurisdiccional corresponde exclusivamente a los Juzgados y Tribunales determinados por las leyes",
              "No pueden existir tribunales fuera de la capital del Estado",
              "Las sentencias judiciales no admiten recurso de casación"
            ],
            "answer": 1,
            "explanation": "El art. 117.3 CE reserva la potestad jurisdiccional juzgando y haciendo ejecutar lo juzgado exclusivamente a los Juzgados y Tribunales.",
            "reference": "Art. 117.3 CE",
            "legalArticle": "Art. 117.3 CE",
            "legalText": "El ejercicio de la potestad jurisdiccional en todo tipo de procesos, juzgando y haciendo ejecutar lo juzgado, corresponde exclusivamente a los Juzgados y Tribunales determinados por las leyes."
          }
        ]
      },
      {
        "title": "Tema 8. La Administración General del Estado: órganos centrales y territoriales",
        "summary": "Ley 40/2015. Ministros, Secretarios de Estado, Subsecretarios, Directores Generales y Delegados del Gobierno.",
        "npcName": "Don Teodoro",
        "npcRole": "Subsecretario Emérito",
        "npcLines": [
          "Los Ministros y Secretarios de Estado son órganos superiores.",
          "Subsecretarios y Directores Generales son órganos directivos.",
          "Los Delegados del Gobierno representan al Gobierno en las CCAA."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 55 a 79 Ley 40/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10566"
        ],
        "questions": [
          {
            "prompt": "En la organización central de la AGE (art. 55 Ley 40/2015), ¿cuáles son órganos superiores?",
            "options": [
              "Los Subsecretarios y los Directores Generales",
              "Los Ministros y los Secretarios de Estado",
              "Los Secretarios Generales Técnicos",
              "Los Subdirectores Generales"
            ],
            "answer": 1,
            "explanation": "El art. 55.2 Ley 40/2015 clasifica como órganos superiores exclusivamente a los Ministros y Secretarios de Estado.",
            "reference": "Art. 55.2 Ley 40/2015",
            "legalArticle": "Art. 55.2 Ley 40/2015",
            "legalText": "Son órganos superiores los Ministros y los Secretarios de Estado."
          },
          {
            "prompt": "Los Subsecretarios y los Secretarios Generales Técnicos deben ser nombrados necesariamente entre:",
            "options": [
              "Cualquier ciudadano con titulación de grado universitario",
              "Funcionarios de carrera del Estado, de las CCAA o de Entidades Locales del Subgrupo A1",
              "Diputados o Senadores de la legislatura",
              "Profesionales con más de 10 años de ejercicio en el sector privado"
            ],
            "answer": 1,
            "explanation": "El art. 63.2 y 65.2 de la Ley 40/2015 exige obligatoriamente ser funcionario de carrera A1.",
            "reference": "Arts. 63 y 65 Ley 40/2015",
            "legalArticle": "Art. 63.2 Ley 40/2015",
            "legalText": "Los Subsecretarios habrán de ser nombrados entre funcionarios de carrera del Estado, de las CCAA o de las Entidades locales, pertenecientes al Subgrupo A1."
          },
          {
            "prompt": "¿Qué rango tienen los Delegados del Gobierno en las Comunidades Autónomas?",
            "options": [
              "Rango de Director General",
              "Rango de Subsecretario",
              "Rango de Secretario de Estado",
              "Rango de Ministro sin cartera"
            ],
            "answer": 1,
            "explanation": "El art. 72.2 Ley 40/2015 establece que los Delegados del Gobierno tienen rango de Subsecretario.",
            "reference": "Art. 72.2 Ley 40/2015",
            "legalArticle": "Art. 72.2 Ley 40/2015",
            "legalText": "Los Delegados del Gobierno serán nombrados y separados por Real Decreto del Consejo de Ministros y tendrán rango de Subsecretario."
          },
          {
            "prompt": "El nombramiento de un Subdirector General se efectúa por:",
            "options": [
              "Real Decreto del Consejo de Ministros",
              "Resolución del Ministro o Secretario de Estado del que dependa, entre funcionarios A1",
              "Acuerdo de la Comisión General de Secretarios de Estado y Subsecretarios",
              "Orden ministerial publicada en el BOE tras concurso de méritos ordinario"
            ],
            "answer": 1,
            "explanation": "El art. 67.2 Ley 40/2015 dispone que los Subdirectores Generales son nombrados por el Ministro, Secretario de Estado o Subsecretario.",
            "reference": "Art. 67.2 Ley 40/2015",
            "legalArticle": "Art. 67.2 Ley 40/2015",
            "legalText": "Los Subdirectores Generales serán nombrados y cesados por el Ministro, Secretario de Estado o Subsecretario del que dependan."
          }
        ]
      },
      {
        "title": "Tema 9. Organización territorial del Estado: Comunidades Autónomas",
        "summary": "Título VIII CE. Distribución de competencias, Estatutos de Autonomía y financiación.",
        "npcName": "Profesora Leire",
        "npcRole": "Especialista en Derecho Autonómico",
        "npcLines": [
          "El Estado se organiza en municipios, provincias y CCAA.",
          "El art. 148 fija competencias de CCAA y el 149 las exclusivas del Estado.",
          "La cláusula residual favorece al Estado si la CA no asumió la competencia."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 148, 149 y 155 CE."
        ],
        "boeIds": [
          "BOE-A-1978-31229"
        ],
        "questions": [
          {
            "prompt": "En caso de conflicto de competencias sobre materias no asumidas expresamente por los Estatutos de Autonomía (art. 149.3 CE):",
            "options": [
              "Se declarará la competencia compartida al 50%",
              "La competencia corresponderá al Estado, cuyas normas prevalecerán en caso de conflicto",
              "Resolverá la Comisión Mixta de Transferencias",
              "Quedará en suspenso hasta pronunciamiento del Senado"
            ],
            "answer": 1,
            "explanation": "El art. 149.3 CE contiene la cláusula residual: las competencias no asumidas por los Estatutos corresponden al Estado.",
            "reference": "Art. 149.3 CE",
            "legalArticle": "Art. 149.3 CE",
            "legalText": "Las materias no atribuidas expresamente al Estado por esta Constitución podrán corresponder a las CCAA en virtud de sus Estatutos. La competencia sobre las materias que no se hayan asumido corresponderá al Estado."
          },
          {
            "prompt": "Para adoptar las medidas de ejecución forzosa del artículo 155 CE contra una Comunidad Autónoma se requiere:",
            "options": [
              "Autorización previa del Congreso de los Diputados por mayoría absoluta",
              "Requerimiento previo al Presidente de la CA y, de no ser atendido, aprobación por mayoría absoluta del Senado",
              "Dictamen preceptivo y vinculante del Consejo de Estado",
              "Sentencia firme previa de la Sala de lo Contencioso del Tribunal Supremo"
            ],
            "answer": 1,
            "explanation": "El art. 155.1 CE exige previo requerimiento al Presidente autonómico y la aprobación por mayoría absoluta del Senado.",
            "reference": "Art. 155.1 CE",
            "legalArticle": "Art. 155.1 CE",
            "legalText": "Si una CA no cumpliere las obligaciones constitucionales, el Gobierno, previo requerimiento al Presidente de la CA y con la aprobación por mayoría absoluta del Senado, podrá adoptar las medidas necesarias."
          },
          {
            "prompt": "Las leyes marco (art. 150.1 CE) permiten a las Cortes Generales en materias de competencia estatal:",
            "options": [
              "Transferir fondos sin control parlamentario",
              "Atribuir a todas o a alguna de las CCAA la facultad de dictar para sí mismas normas legislativas en el marco de principios y directrices fijados por ley estatal",
              "Suspender los Estatutos de Autonomía",
              "Delegar el ejercicio de la potestad reglamentaria en los municipios"
            ],
            "answer": 1,
            "explanation": "El art. 150.1 CE define las leyes marco de delegación de facultades legislativas a las CCAA.",
            "reference": "Art. 150.1 CE",
            "legalArticle": "Art. 150.1 CE",
            "legalText": "Las Cortes Generales, en materias de competencia estatal, podrán atribuir a todas o a alguna de las CCAA la facultad de dictar para sí normas legislativas en el marco de principios y directrices fijados por ley estatal."
          },
          {
            "prompt": "¿Qué recurso procede ante el Tribunal Constitucional frente a disposiciones y resoluciones adoptadas por órganos de las CCAA?",
            "options": [
              "Recurso de súplica autonómico",
              "Conflicto positivo o negativo de competencias y la impugnación del art. 161.2 CE por el Gobierno",
              "Recurso de lesividad ministerial",
              "Recurso directo de amparo parlamentario"
            ],
            "answer": 1,
            "explanation": "Los conflictos de competencia y la impugnación del art. 161.2 CE permiten al Gobierno suspender de inmediato normas autonómicas.",
            "reference": "Art. 161.2 CE",
            "legalArticle": "Art. 161.2 CE",
            "legalText": "El Gobierno podrá impugnar ante el Tribunal Constitucional las disposiciones y resoluciones adoptadas por los órganos de las CCAA, produciendo la suspensión de la disposición impugnada."
          }
        ]
      },
      {
        "title": "Tema 10. La Administración Local: municipio, provincia y otras entidades",
        "summary": "Ley 7/1985 (LBRL). Autonomía local, competencias municipales y órganos de gobierno.",
        "npcName": "Don Eloy",
        "npcRole": "Secretario de Ayuntamiento",
        "npcLines": [
          "El municipio es la entidad básica de organización territorial.",
          "El gobierno municipal corresponde al Ayuntamiento (Alcalde y Concejales).",
          "La provincia coordina servicios municipales y presta asistencia."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 140 a 142 CE y Ley 7/1985."
        ],
        "boeIds": [
          "BOE-A-1985-5392"
        ],
        "questions": [
          {
            "prompt": "Según la Ley 7/1985 (LBRL), ¿en qué municipios existe obligatoriamente Junta de Gobierno Local?",
            "options": [
              "En todos los municipios de España",
              "En los municipios con población superior a 5.000 habitantes y en los de menor si lo dispone su reglamento o lo acuerda el Pleno",
              "Solo en las capitales de provincia",
              "En los municipios de más de 50.000 habitantes exclusivamente"
            ],
            "answer": 1,
            "explanation": "El art. 20.1.b) LBRL exige Junta de Gobierno Local en municipios con población superior a 5.000 habitantes.",
            "reference": "Art. 20.1.b LBRL",
            "legalArticle": "Art. 20.1.b LBRL",
            "legalText": "La Junta de Gobierno Local existe en todos los municipios con población superior a 5.000 habitantes y en los de menos cuando así lo disponga su reglamento orgánico o lo acuerde el Pleno."
          },
          {
            "prompt": "El servicio de protección civil, evaluación e información de situaciones de necesidad social y prevención y extinción de incendios es obligatorio en:",
            "options": [
              "Todos los municipios con más de 1.000 habitantes",
              "Municipios con población superior a 20.000 habitantes",
              "Exclusivamente en municipios de más de 50.000 habitantes",
              "Solo en capitales de provincia"
            ],
            "answer": 1,
            "explanation": "El art. 26.1.c) LBRL fija estos servicios como obligatorios a partir de 20.000 habitantes.",
            "reference": "Art. 26.1.c LBRL",
            "legalArticle": "Art. 26.1.c LBRL",
            "legalText": "En los municipios con población superior a 20.000 habitantes, además: protección civil, evaluación e información de situaciones de necesidad social y prevención y extinción de incendios."
          },
          {
            "prompt": "La moción de censura al Alcalde (art. 197 LOREG) debe ser suscrita por:",
            "options": [
              "Al menos la mayoría absoluta del número legal de miembros de la corporación",
              "La tercera parte de los concejales",
              "El 10% del censo electoral municipal",
              "Cualquier grupo político municipal con representación"
            ],
            "answer": 0,
            "explanation": "El art. 197.1.a) LOREG exige que la moción de censura sea propuesta por al menos la mayoría absoluta de los concejales.",
            "reference": "Art. 197 LOREG",
            "legalArticle": "Art. 197.1 LOREG",
            "legalText": "La moción de censura al Alcalde deberá ser propuesta, al menos, por la mayoría absoluta del número legal de miembros de la Corporación y habrá de incluir un candidato a la Alcaldía."
          },
          {
            "prompt": "¿A quién corresponde la alteración de los términos municipales y la fijación de límites territoriales?",
            "options": [
              "Al Estado mediante Ley Orgánica",
              "A las Comunidades Autónomas de acuerdo con sus Estatutos y la legislación básica del Estado",
              "A la Diputación Provincial correspondiente",
              "Al Pleno de los Ayuntamientos afectados por mayoría simple"
            ],
            "answer": 1,
            "explanation": "El art. 13 LBRL atribuye la creación, supresión y alteración de términos municipales a las CCAA.",
            "reference": "Art. 13 LBRL",
            "legalArticle": "Art. 13.1 LBRL",
            "legalText": "La creación o supresión de municipios, así como la alteración de términos municipales, se regularán por la legislación de las CCAA sobre régimen local."
          }
        ]
      },
      {
        "title": "Tema 11. La Administración electrónica y acceso digital de los ciudadanos",
        "summary": "Leyes 39/2015 y 40/2015. Sedes electrónicas, identificación (Cl@ve), registro y archivo digital.",
        "npcName": "Ingeniera Rocío",
        "npcRole": "Directora de Transformación Digital",
        "npcLines": [
          "El Punto de Acceso General electrónico es el portal único de entrada.",
          "El art. 14 de la Ley 39/2015 regula el derecho y deber de relacionarse electrónicamente.",
          "El Esquema Nacional de Seguridad (ENS) garantiza la ciberseguridad."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 9, 10, 14, 16 y 27 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Según el art. 14.2 de la Ley 39/2015, ¿quiénes están obligados a relacionarse a través de medios electrónicos con las AAPP?",
            "options": [
              "Todos los ciudadanos mayores de edad empadronados",
              "Las personas jurídicas, entidades sin personalidad, quienes ejerzan actividad profesional colegiada y los empleados públicos",
              "Únicamente las grandes empresas del IBEX 35",
              "Solo las empresas con facturación superior a 2 millones de euros"
            ],
            "answer": 1,
            "explanation": "El art. 14.2 LPAC establece el listado de sujetos obligados a relacionarse por medios electrónicos.",
            "reference": "Art. 14.2 Ley 39/2015",
            "legalArticle": "Art. 14.2 Ley 39/2015",
            "legalText": "Estarán obligados a relacionarse a través de medios electrónicos: a) Las personas jurídicas. b) Las entidades sin personalidad jurídica. c) Quienes ejerzan una actividad profesional que requiera colegiación obligatoria. d) Los empleados públicos."
          },
          {
            "prompt": "El Registro Electrónico General de cada Administración Pública se rige por la fecha y hora oficial de:",
            "options": [
              "El servidor local donde resida físicamente el interesado",
              "La sede electrónica de acceso, permitiendo la presentación de documentos todos los días del año durante las 24 horas",
              "El huso horario del meridiano de Greenwich en todo caso",
              "El horario de oficina de 9:00 a 14:00 horas exclusivamente"
            ],
            "answer": 1,
            "explanation": "El art. 31.1 y 31.2 LPAC dispone que el registro electrónico estará abierto 24 horas todos los días del año regido por la fecha y hora de la sede.",
            "reference": "Art. 31 Ley 39/2015",
            "legalArticle": "Art. 31.2 Ley 39/2015",
            "legalText": "El Registro Electrónico de cada Administración u Organismo se regirá a efectos de cómputo de los plazos por la fecha y hora oficial de la sede electrónica de acceso."
          },
          {
            "prompt": "Para que un documento electrónico administrativo tenga validez (art. 26 Ley 39/2015) debe contener al menos:",
            "options": [
              "Firma manuscrita escaneada y sello físico",
              "Información de cualquier naturaleza, datos de identificación, referencia temporal y metadatos mínimos, junto con firma electrónica",
              "Impresión en papel con sello en seco del Ministerio",
              "Aprobación individual por el Subsecretario del departamento"
            ],
            "answer": 1,
            "explanation": "El art. 26.2 LPAC fija los componentes técnicos del documento administrativo electrónico.",
            "reference": "Art. 26.2 Ley 39/2015",
            "legalArticle": "Art. 26.2 Ley 39/2015",
            "legalText": "Los documentos electrónicos administrativos deberán incorporar los metadatos mínimos exigidos, firma electrónica y constancia de su autenticidad e integridad."
          },
          {
            "prompt": "El Esquema Nacional de Interoperabilidad (ENI) y el Esquema Nacional de Seguridad (ENS) son regulados en:",
            "options": [
              "Los arts. 156 y 157 de la Ley 40/2015 (LRJSP)",
              "El Código Civil y la Ley Hipotecaria",
              "El Reglamento de la Unión Europea eIDAS exclusivamente",
              "Las normas forales de régimen local"
            ],
            "answer": 0,
            "explanation": "Los arts. 156 y 157 de la Ley 40/2015 regulan el ENS y el ENI para toda la Administración Pública.",
            "reference": "Arts. 156 y 157 Ley 40/2015",
            "legalArticle": "Art. 156 Ley 40/2015",
            "legalText": "El Esquema Nacional de Seguridad tiene por objeto establecer la política de seguridad en la utilización de medios electrónicos en el ámbito de la presente Ley."
          }
        ]
      }
    ]
  },
  {
    "number": 2,
    "title": "Unión Europea",
    "ministry": "Ministerio de Asuntos Exteriores y Comisión Europea",
    "worldName": "Mundo 2 · El Eurodistrito y las Instituciones Europeas",
    "description": "Tratados de la UE, instituciones comunitarias, fuentes del Derecho de la Unión, mercado interior y políticas comunes.",
    "theme": "bruselas",
    "bossName": "Comisario Klaus",
    "bossIntro": "¡Bienvenida a Bruselas! El ordenamiento jurídico comunitario prevalece sobre el Derecho interno. ¡Demuestra que dominas los Tratados!",
    "bossStyle": "comisario",
    "topics": [
      {
        "title": "Tema 1. Los Tratados de la Unión Europea y evolución histórica",
        "summary": "De Roma a Lisboa. Estructura de los Tratados (TUE y TFUE), personalidad jurídica y valores.",
        "npcName": "Profesor Schuman",
        "npcRole": "Catedrático de Derecho Europeo",
        "npcLines": [
          "El Tratado de Lisboa de 2007 unificó la personalidad jurídica de la UE.",
          "El TUE y el TFUE tienen el mismo valor jurídico.",
          "El art. 2 TUE proclama los valores de dignidad, libertad y democracia."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 1 a 6 TUE y Tratado de Lisboa."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Qué Tratado atribuyó por primera vez personalidad jurídica única a la Unión Europea suprimiendo la estructura de pilares?",
            "options": [
              "El Tratado de Maastricht de 1992",
              "El Tratado de Lisboa de 2007 (en vigor en 2009)",
              "El Tratado de Ámsterdam de 1997",
              "El Acta Única Europea de 1986"
            ],
            "answer": 1,
            "explanation": "El Tratado de Lisboa de 2007 dotó a la Unión de personalidad jurídica única expresa (art. 47 TUE).",
            "reference": "Art. 47 TUE",
            "legalArticle": "Art. 47 TUE",
            "legalText": "La Unión tiene personalidad jurídica."
          },
          {
            "prompt": "El procedimiento de retirada voluntaria de un Estado miembro de la Unión Europea está regulado en:",
            "options": [
              "El artículo 50 del Tratado de la Unión Europea (TUE)",
              "El artículo 7 del Tratado de Funcionamiento de la UE",
              "El Convenio de Viena sobre el Derecho de los Tratados",
              "El Protocolo 1 anexo a la Carta de Derechos Fundamentales"
            ],
            "answer": 0,
            "explanation": "El art. 50 TUE introducido por Lisboa regula la notificación de retirada y negociación del acuerdo.",
            "reference": "Art. 50 TUE",
            "legalArticle": "Art. 50.1 TUE",
            "legalText": "Todo Estado miembro podrá decidir, de conformidad con sus normas constitucionales, retirarse de la Unión."
          },
          {
            "prompt": "La Carta de los Derechos Fundamentales de la Unión Europea tiene el siguiente valor jurídico tras el Tratado de Lisboa:",
            "options": [
              "Es una mera declaración política no vinculante",
              "Tiene el mismo valor jurídico que los Tratados constitutivos",
              "Está subordinada jerárquicamente a las Directivas",
              "Solo vincula a la Comisión Europea pero no a los Estados miembros"
            ],
            "answer": 1,
            "explanation": "El art. 6.1 TUE otorga a la Carta el mismo valor jurídico vinculante que los Tratados.",
            "reference": "Art. 6.1 TUE",
            "legalArticle": "Art. 6.1 TUE",
            "legalText": "La Unión reconoce los derechos, libertades y principios enunciados en la Carta de los Derechos Fundamentales, la cual tendrá el mismo valor jurídico que los Tratados."
          },
          {
            "prompt": "Para que un Estado europeo pueda solicitar su adhesión a la Unión Europea (art. 49 TUE) debe respetar:",
            "options": [
              "Un PIB per cápita superior a 20.000 euros",
              "Los valores contemplados en el artículo 2 del TUE y comprometerse a promoverlos",
              "Pertenecer a la zona euro con carácter previo",
              "Tener frontera terrestre directa con un Estado fundador"
            ],
            "answer": 1,
            "explanation": "El art. 49 TUE exige el respeto a los valores del art. 2 TUE (democracia, Estado de Derecho y derechos humanos).",
            "reference": "Art. 49 TUE",
            "legalArticle": "Art. 49 TUE",
            "legalText": "Cualquier Estado europeo que respete los valores del artículo 2 y se comprometa a promoverlos podrá solicitar el ingreso como miembro en la Unión."
          }
        ]
      },
      {
        "title": "Tema 2. Las instituciones de la UE: Consejo Europeo y Consejo de la UE",
        "summary": "Composición, presidencia rotatoria, quórum de mayoría cualificada y funciones decisorias.",
        "npcName": "Consejero Paul",
        "npcRole": "Diplomático de la Representación Permanente",
        "npcLines": [
          "El Consejo Europeo define las orientaciones políticas generales de la UE.",
          "El Consejo ejerce la función legislativa y presupuestaria con el Parlamento.",
          "La mayoría cualificada exige 55% de Estados que representen el 65% de población."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 15 y 16 TUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Cómo se define el quórum de mayoría cualificada ordinaria en el Consejo según el art. 16.4 TUE?",
            "options": [
              "Mayoría absoluta de Estados miembros que sumen el 50% de la población",
              "Al menos el 55% de los miembros del Consejo que incluya al menos a 15 de ellos y represente al menos el 65% de la población de la UE",
              "Dos tercios de los Estados miembros sin requisito de población",
              "Tres quintos de los votos ponderados del Tratado de Niza"
            ],
            "answer": 1,
            "explanation": "El sistema de doble mayoría exige el 55% de Estados miembros (mínimo 15) que sumen el 65% de la población.",
            "reference": "Art. 16.4 TUE",
            "legalArticle": "Art. 16.4 TUE",
            "legalText": "La mayoría cualificada se definirá como un mínimo del 55% de los miembros del Consejo que incluya al menos a quince de ellos y represente a Estados miembros que reúnan al menos el 65% de la población."
          },
          {
            "prompt": "El Presidente del Consejo Europeo es elegido por:",
            "options": [
              "Sufragio universal directo de los ciudadanos europeos",
              "El Consejo Europeo por mayoría cualificada para un mandato de dos años y medio, renovable una sola vez",
              "El Parlamento Europeo a propuesta de la Comisión",
              "Rotación semestral obligatoria de los Jefes de Estado"
            ],
            "answer": 1,
            "explanation": "El art. 15.5 TUE establece que el Consejo Europeo elige a su Presidente por mayoría cualificada por 2 años y medio.",
            "reference": "Art. 15.5 TUE",
            "legalArticle": "Art. 15.5 TUE",
            "legalText": "El Consejo Europeo elegirá a su Presidente por mayoría cualificada para un mandato de dos años y medio, que podrá renovarse una sola vez."
          },
          {
            "prompt": "¿Ejerce el Consejo Europeo funciones legislativas en la Unión Europea?",
            "options": [
              "Sí, aprueba los Reglamentos en lectura única",
              "No, el Consejo Europeo no ejercerá función legislativa alguna",
              "Solo en materia de política fiscal comunitaria",
              "Sí, conjuntamente con el Tribunal de Justicia"
            ],
            "answer": 1,
            "explanation": "El art. 15.1 TUE prohíbe expresamente al Consejo Europeo ejercer función legislativa.",
            "reference": "Art. 15.1 TUE",
            "legalArticle": "Art. 15.1 TUE",
            "legalText": "El Consejo Europeo dará a la Unión los impulsos necesarios para su desarrollo y definirá sus orientaciones y prioridades políticas generales. No ejercerá función legislativa alguna."
          },
          {
            "prompt": "La minoría de bloqueo en las votaciones del Consejo por mayoría cualificada debe incluir al menos:",
            "options": [
              "A dos Estados miembros fundadores",
              "A cuatro miembros del Consejo; de lo contrario, la mayoría cualificada se considerará alcanzada",
              "Al 40% de los votos del Parlamento Europeo",
              "A tres Estados medianos o pequeños"
            ],
            "answer": 1,
            "explanation": "El art. 16.4 TUE exige que la minoría de bloqueo esté compuesta por al menos cuatro Estados del Consejo.",
            "reference": "Art. 16.4 TUE",
            "legalArticle": "Art. 16.4 TUE",
            "legalText": "Una minoría de bloqueo debe incluir al menos a cuatro miembros del Consejo, a falta de lo cual la mayoría cualificada se considerará alcanzada."
          }
        ]
      },
      {
        "title": "Tema 3. La Comisión Europea: composición, funciones y monopolio de iniciativa",
        "summary": "Mandato de 5 años, colegio de comisarios, guardiana de los Tratados y ejecución presupuestaria.",
        "npcName": "Comisaria Helga",
        "npcRole": "Directora General de la Comisión Europea",
        "npcLines": [
          "La Comisión promueve el interés general de la Unión.",
          "Tiene el cuasi-monopolio de la iniciativa legislativa.",
          "Vela por la aplicación de los Tratados supervisando a los Estados."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Art. 17 TUE y arts. 244 a 250 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Quién elige al Presidente de la Comisión Europea según el art. 17.7 del TUE?",
            "options": [
              "El Consejo Europeo por unanimidad de los Jefes de Estado",
              "El Parlamento Europeo por mayoría de los miembros que lo componen, a propuesta del Consejo Europeo por mayoría cualificada",
              "Los ciudadanos de la UE mediante listas transnacionales",
              "El Colegio de Comisarios saliente por cooptación"
            ],
            "answer": 1,
            "explanation": "El Consejo Europeo propone por mayoría cualificada y el Parlamento elige por mayoría de miembros (art. 17.7 TUE).",
            "reference": "Art. 17.7 TUE",
            "legalArticle": "Art. 17.7 TUE",
            "legalText": "El Parlamento Europeo elegirá al Presidente de la Comisión por mayoría de los miembros que lo componen, a propuesta del Consejo Europeo por mayoría cualificada."
          },
          {
            "prompt": "En el ejercicio de sus funciones, los miembros de la Comisión Europea:",
            "options": [
              "Representan las instrucciones formales de sus respectivos Gobiernos nacionales",
              "Son completamente independientes y no solicitarán ni aceptarán instrucciones de ningún Gobierno u organismo",
              "Deben comparecer semanalmente ante los parlamentos de sus países de origen",
              "Pueden ser cesados unilateralmente por su Estado de nacionalidad"
            ],
            "answer": 1,
            "explanation": "El art. 17.3 TUE consagra la independencia absoluta de la Comisión respecto a intereses nacionales.",
            "reference": "Art. 17.3 TUE",
            "legalArticle": "Art. 17.3 TUE",
            "legalText": "En el cumplimiento de sus funciones, la Comisión será plenamente independiente. Los miembros de la Comisión no solicitarán ni aceptarán instrucciones de ningún gobierno ni de ningún organismo."
          },
          {
            "prompt": "¿Qué mayoría requiere el Parlamento Europeo para aprobar una moción de censura contra la Comisión Europea?",
            "options": [
              "Mayoría simple de los votos emitidos",
              "Mayoría de dos tercios de los votos emitidos que represente a la mayoría de los diputados que componen el Parlamento",
              "Mayoría absoluta de ambas Cámaras de la Unión",
              "Tres quintos de los eurodiputados presentes"
            ],
            "answer": 1,
            "explanation": "El art. 234 TFUE exige mayoría de 2/3 de los votos emitidos que represente la mayoría de los eurodiputados.",
            "reference": "Art. 234 TFUE",
            "legalArticle": "Art. 234 TFUE",
            "legalText": "Si la moción de censura es aprobada por mayoría de dos tercios de los votos emitidos que represente a la mayoría de los miembros del Parlamento Europeo, los miembros de la Comisión deberán dimitir colectivamente."
          },
          {
            "prompt": "El monopolio de la iniciativa legislativa atribuido a la Comisión Europea significa que:",
            "options": [
              "Ningún acto legislativo de la Unión puede adoptarse salvo a propuesta de la Comisión, salvo que los Tratados dispongan otra cosa",
              "La Comisión aprueba y promulga las leyes europeas por sí sola",
              "Solo la Comisión puede recurrir ante el Tribunal de Justicia",
              "Los Estados miembros no pueden transponer directivas sin autorización previa"
            ],
            "answer": 0,
            "explanation": "El art. 17.2 TUE establece que los actos legislativos solo pueden adoptarse a propuesta de la Comisión como regla general.",
            "reference": "Art. 17.2 TUE",
            "legalArticle": "Art. 17.2 TUE",
            "legalText": "Los actos legislativos de la Unión sólo podrán adoptarse a propuesta de la Comisión, excepto cuando los Tratados dispongan otra cosa."
          }
        ]
      },
      {
        "title": "Tema 4. El Parlamento Europeo: elección, competencias legislativas y de control",
        "summary": "Sufragio universal, 705 eurodiputados, codecisión (procedimiento legislativo ordinario) y presupuesto.",
        "npcName": "Eurodiputado Marc",
        "npcRole": "Portavoz de la Comisión Mixta UE",
        "npcLines": [
          "El Parlamento representa a los ciudadanos de la Unión Europea.",
          "El procedimiento legislativo ordinario sitúa al Parlamento en pie de igualdad con el Consejo.",
          "Aprueba el presupuesto anual de la UE."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Art. 14 TUE y arts. 223 a 234 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "El número máximo de miembros del Parlamento Europeo establecido en el art. 14.2 del TUE es de:",
            "options": [
              "650 diputados más el Presidente",
              "750 diputados más el Presidente, con un mínimo de 6 y un máximo de 96 por Estado miembro",
              "800 diputados repartidos de forma proporcional estricta",
              "100 diputados por cada gran Estado de la Unión"
            ],
            "answer": 1,
            "explanation": "El art. 14.2 TUE fija el tope en 750 más el Presidente y principio de proporcionalidad decreciente.",
            "reference": "Art. 14.2 TUE",
            "legalArticle": "Art. 14.2 TUE",
            "legalText": "El Parlamento Europeo estará compuesto por representantes de los ciudadanos de la Unión. Su número no excederá de setecientos cincuenta, más el Presidente. La representación será decrecientemente proporcional, con un mínimo de seis y un máximo de noventa y seis diputados."
          },
          {
            "prompt": "En el Procedimiento Legislativo Ordinario (antigua codecisión, art. 294 TFUE), ¿en qué posición se encuentran el Parlamento y el Consejo?",
            "options": [
              "El Consejo decide unilateralmente y el Parlamento emite dictamen consultivo",
              "En pie de perfecta igualdad, siendo necesario el acuerdo de ambas instituciones para aprobar el acto legislativo",
              "El Parlamento aprueba y el Consejo solo puede vetar por unanimidad",
              "La Comisión tiene el voto de calidad en caso de empate"
            ],
            "answer": 1,
            "explanation": "El art. 294 TFUE consagra la adopción conjunta de Reglamentos, Directivas y Decisiones por el Parlamento y el Consejo.",
            "reference": "Art. 294 TFUE",
            "legalArticle": "Art. 294 TFUE",
            "legalText": "El procedimiento legislativo ordinario consiste en la adopción conjunta por el Parlamento Europeo y el Consejo de un reglamento, una directiva o una decisión, a propuesta de la Comisión."
          },
          {
            "prompt": "¿Por cuánto tiempo son elegidos los diputados al Parlamento Europeo por sufragio universal directo?",
            "options": [
              "Por 4 años coincidentes con las elecciones generales españolas",
              "Por 5 años para una legislatura europea",
              "Por 6 años con renovación trienal por mitades",
              "Por 3 años improrrogables"
            ],
            "answer": 1,
            "explanation": "El art. 14.3 TUE establece que los diputados son elegidos por sufragio universal directo y libre por cinco años.",
            "reference": "Art. 14.3 TUE",
            "legalArticle": "Art. 14.3 TUE",
            "legalText": "Los diputados al Parlamento Europeo serán elegidos por sufragio universal, directo, libre y secreto, para un mandato de cinco años."
          },
          {
            "prompt": "Si en la tramitación del presupuesto anual de la UE no hay acuerdo entre el Parlamento y el Consejo, ¿qué órgano se convoca?",
            "options": [
              "El Tribunal de Cuentas Europeo",
              "Un Comité de Conciliación paritario entre miembros del Consejo y del Parlamento",
              "La Cumbre Extraordinaria del Consejo Europeo",
              "El Pleno del Tribunal de Justicia"
            ],
            "answer": 1,
            "explanation": "El art. 314 TFUE regula el Comité de Conciliación presupuestario para buscar un texto conjunto en 21 días.",
            "reference": "Art. 314 TFUE",
            "legalArticle": "Art. 314.5 TFUE",
            "legalText": "El Comité de Conciliación reunirá a los miembros del Consejo o sus representantes y a un número igual de representantes del Parlamento Europeo."
          }
        ]
      },
      {
        "title": "Tema 5. El Tribunal de Justicia de la Unión Europea y el recurso por incumplimiento",
        "summary": "TJUE y Tribunal General. Recurso de anulación, cuestión prejudicial (art. 267 TFUE) e incumplimiento.",
        "npcName": "Jueza Claire",
        "npcRole": "Letrada del TJUE en Luxemburgo",
        "npcLines": [
          "El TJUE garantiza el respeto del Derecho en la interpretación de los Tratados.",
          "La cuestión prejudicial garantiza la aplicación uniforme del Derecho de la UE.",
          "El recurso por incumplimiento sanciona a los Estados infractores."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 258, 263 y 267 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Qué órgano jurisdiccional nacional está obligado preceptivamente a plantear una cuestión prejudicial al TJUE (art. 267 TFUE)?",
            "options": [
              "Cualquier juzgado de primera instancia",
              "Aquel tribunal nacional cuyas decisiones no sean susceptibles de ulterior recurso judicial en el Derecho interno",
              "Solo la Sala de lo Contencioso-Administrativo de la Audiencia Nacional",
              "Únicamente el Tribunal Constitucional en recursos de amparo"
            ],
            "answer": 1,
            "explanation": "El art. 267 párrafo tercero TFUE impone la obligación de reenvío a los órganos jurisdiccionales de última instancia.",
            "reference": "Art. 267 TFUE",
            "legalArticle": "Art. 267 TFUE",
            "legalText": "Cuando se plantee una cuestión en un asunto pendiente ante un órgano jurisdiccional cuyas decisiones no sean susceptibles de ulterior recurso, dicho órgano estará obligado a someter la cuestión al Tribunal."
          },
          {
            "prompt": "El recurso por incumplimiento contra un Estado miembro (art. 258 TFUE) puede ser interpuesto ante el TJUE por:",
            "options": [
              "Cualquier ciudadano europeo que resida en dicho Estado",
              "La Comisión Europea (tras un dictamen motivado previo) o por otro Estado miembro (art. 259 TFUE)",
              "El Parlamento Europeo en votación plenaria",
              "El Defensor del Pueblo Europeo en defensa de los consumidores"
            ],
            "answer": 1,
            "explanation": "El art. 258 TFUE faculta a la Comisión a demandar al Estado infractor tras la fase precontenciosa y dictamen motivado.",
            "reference": "Art. 258 TFUE",
            "legalArticle": "Art. 258 TFUE",
            "legalText": "Si la Comisión estima que un Estado miembro ha incumplido una de las obligaciones que le incumben, emitirá un dictamen motivado y podrá recurrir al Tribunal de Justicia de la UE."
          },
          {
            "prompt": "El plazo para interponer el recurso de anulación contra actos legislativos de la UE (art. 263 TFUE) es de:",
            "options": [
              "1 mes a partir de la firma del acto",
              "2 meses a partir de la publicación del acto, o de su notificación al recurrente",
              "6 meses improrrogables",
              "1 año según el Código Civil europeo"
            ],
            "answer": 1,
            "explanation": "El art. 263 párrafo sexto TFUE establece un plazo de caducidad de dos meses.",
            "reference": "Art. 263 TFUE",
            "legalArticle": "Art. 263 TFUE",
            "legalText": "Los recursos previstos en el presente artículo deberán interponerse en el plazo de dos meses a partir de la publicación de la medida, o de su notificación al recurrente."
          },
          {
            "prompt": "Las sentencias del Tribunal de Justicia de la Unión Europea que declaran la nulidad de un acto de una institución tienen efectos:",
            "options": [
              "Solo inter partes entre los litigantes directos",
              "Efectos erga omnes con carácter retroactivo (ex tunc), considerándose el acto nulo de pleno derecho",
              "Meramente declarativos sin fuerza ejecutiva",
              "Efectos que deben ser convalidados por los tribunales supremos nacionales"
            ],
            "answer": 1,
            "explanation": "El art. 264 TFUE dispone que si el recurso es fundado, el Tribunal declarará el acto nulo y sin valor alguno erga omnes.",
            "reference": "Art. 264 TFUE",
            "legalArticle": "Art. 264 TFUE",
            "legalText": "Si el recurso fuera fundado, el Tribunal de Justicia de la Unión Europea declarará nulo y sin valor ni efecto alguno el acto impugnado."
          }
        ]
      },
      {
        "title": "Tema 6. Fuentes del Derecho de la Unión Europea y relaciones con el Derecho interno",
        "summary": "Derecho originario y derivado. Reglamentos, directivas, primacía (Costa c. ENEL) y efecto directo.",
        "npcName": "Letrado Van Gend",
        "npcRole": "Profesor de Derecho Comunitario",
        "npcLines": [
          "El Reglamento tiene alcance general, es obligatorio y directamente aplicable.",
          "La Directiva obliga al Estado en el resultado pero deja libertad de forma y medios.",
          "El principio de primacía desplaza la norma nacional contraria."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Art. 288 TFUE y sentencias Costa c. ENEL y Simmenthal."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 288 del TFUE, ¿qué instrumento jurídico tiene alcance general, es obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro?",
            "options": [
              "La Directiva",
              "El Reglamento",
              "La Recomendación",
              "El Dictamen motivado"
            ],
            "answer": 1,
            "explanation": "El art. 288 TFUE define el Reglamento como la norma de alcance general, obligatoria y directamente aplicable sin transposición.",
            "reference": "Art. 288 TFUE",
            "legalArticle": "Art. 288 TFUE",
            "legalText": "El reglamento tendrá un alcance general. Será obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro."
          },
          {
            "prompt": "La Directiva comunitaria (art. 288 TFUE) se caracteriza porque:",
            "options": [
              "Se aplica inmediatamente sin necesidad de ninguna ley nacional",
              "Obliga al Estado miembro destinatario en cuanto al resultado que deba conseguirse, dejando a las autoridades nacionales la elección de la forma y de los medios",
              "No tiene carácter vinculante",
              "Solo produce efectos si la ratifica el Parlamento nacional"
            ],
            "answer": 1,
            "explanation": "La Directiva exige transposición nacional respetando el resultado fijado por la Unión.",
            "reference": "Art. 288 TFUE",
            "legalArticle": "Art. 288 TFUE",
            "legalText": "La directiva obligará al Estado miembro destinatario en cuanto al resultado que deba conseguirse, dejando a las autoridades nacionales la elección de la forma y de los medios."
          },
          {
            "prompt": "El principio de primacía del Derecho de la Unión Europea sobre el Derecho nacional fue consagrado jurisprudencialmente en la histórica sentencia:",
            "options": [
              "Sentencia Marbury contra Madison de 1803",
              "Sentencia Costa contra ENEL de 1964 del TJUE",
              "Sentencia Roe contra Wade de 1973",
              "Sentencia Blanco de 1873 del Tribunal de Conflictos"
            ],
            "answer": 1,
            "explanation": "El asunto 6/64 Costa c. ENEL estableció que el Derecho comunitario no puede ser invalidado por normas de Derecho interno.",
            "reference": "Sentencia Costa c. ENEL (1964)",
            "legalArticle": "Jurisprudencia TJUE",
            "legalText": "El Derecho nacido del Tratado no podría encontrar judicialmente un límite en una norma interna cualquiera que sea sin perder su carácter comunitario."
          },
          {
            "prompt": "El principio de efecto directo del Derecho comunitario (asunto Van Gend en Loos) significa que:",
            "options": [
              "Las normas europeas claras, precisas e incondicionales engendran derechos que los particulares pueden invocar directamente ante sus tribunales nacionales",
              "Las normas europeas derogan físicamente la Constitución",
              "Los jueces nacionales son suspendidos de empleo y sueldo si dudan de la ley",
              "Solo los Estados miembros pueden acudir al Tribunal de Justicia"
            ],
            "answer": 0,
            "explanation": "El efecto directo faculta a los ciudadanos para hacer valer las normas comunitarias directamente ante sus jueces.",
            "reference": "Sentencia Van Gend en Loos (1963)",
            "legalArticle": "Jurisprudencia TJUE",
            "legalText": "El Derecho de la Unión engendra derechos en el patrimonio de los particulares que las jurisdicciones nacionales deben proteger."
          }
        ]
      },
      {
        "title": "Tema 7. El mercado interior y las cuatro libertades fundamentales",
        "summary": "Libre circulación de mercancías, personas, servicios y capitales. Espacio Schengen y aduanas.",
        "npcName": "Inspectora Astrid",
        "npcRole": "Auditora del Mercado Único",
        "npcLines": [
          "El mercado interior implica un espacio sin fronteras interiores.",
          "Están prohibidos los derechos de aduana y las medidas de efecto equivalente.",
          "Los ciudadanos de la Unión tienen derecho a circular y residir libremente."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 26 a 66 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿En qué consiste la libre circulación de mercancías en el seno de la Unión Europea (arts. 28 y 30 TFUE)?",
            "options": [
              "En la fijación de aranceles reducidos para productos nacionales",
              "En la unión aduanera con prohibición de derechos de aduana de importación y exportación y exacciones de efecto equivalente entre Estados",
              "En el libre comercio exclusivo de productos agrícolas",
              "En la fijación obligatoria de precios mínimos idénticos en toda Europa"
            ],
            "answer": 1,
            "explanation": "La Unión Aduanera prohíbe todo arancel interno e introduce un arancel aduanero común exterior.",
            "reference": "Art. 28 TFUE",
            "legalArticle": "Art. 28.1 TFUE",
            "legalText": "La Unión comprenderá una unión aduanera, que abarcará la totalidad del comercio de mercancías y que implicará la prohibición de los derechos de aduana de importación y de exportación entre Estados miembros."
          },
          {
            "prompt": "La libre circulación de trabajadores (art. 45 TFUE) incluye el derecho a:",
            "options": [
              "Ocupar cualquier puesto de alta dirección política en el Estado de acogida",
              "Aceptar ofertas efectivas de trabajo, desplazarse libremente y residir en el Estado para ejercer el empleo sin discriminación por nacionalidad",
              "Exención de tributos locales en el país de destino",
              "Percibir subsidios de desempleo vitalicios inmediatos sin cotización previa"
            ],
            "answer": 1,
            "explanation": "El art. 45 TFUE garantiza la igualdad de trato y suprime toda discriminación por nacionalidad en el empleo.",
            "reference": "Art. 45 TFUE",
            "legalArticle": "Art. 45.2 TFUE",
            "legalText": "La libre circulación de los trabajadores supondrá la abolición de toda discriminación por razón de la nacionalidad entre los trabajadores de los Estados miembros, con respecto al empleo, la retribución y las demás condiciones de trabajo."
          },
          {
            "prompt": "La excepción a la libre circulación de trabajadores prevista en el art. 45.4 del TFUE se refiere a:",
            "options": [
              "Los trabajadores de la agricultura y pesca",
              "Los empleos en la administración pública que impliquen el ejercicio de potestades públicas y la salvaguardia de intereses generales",
              "Los contratos temporales en el sector de la construcción",
              "Los empleos en el sector del transporte internacional"
            ],
            "answer": 1,
            "explanation": "El art. 45.4 TFUE excluye los empleos en la Administración pública vinculados a la soberanía del Estado.",
            "reference": "Art. 45.4 TFUE",
            "legalArticle": "Art. 45.4 TFUE",
            "legalText": "Las disposiciones del presente artículo no serán aplicables a los empleos en la administración pública."
          },
          {
            "prompt": "La libertad de establecimiento (art. 49 TFUE) faculta a los nacionales de un Estado miembro para:",
            "options": [
              "Comprar inmuebles sin pagar el IVA comunitario",
              "Acceder a actividades no asalariadas y su ejercicio, así como constituir y gestionar empresas en otro Estado miembro en las mismas condiciones que los nacionales",
              "Votar en las elecciones legislativas del país de acogida",
              "Ignorar la normativa medioambiental del país donde se instalan"
            ],
            "answer": 1,
            "explanation": "El art. 49 TFUE consagra el derecho a instalar empresas y ejercer actividades autónomas en pie de igualdad.",
            "reference": "Art. 49 TFUE",
            "legalArticle": "Art. 49 TFUE",
            "legalText": "La libertad de establecimiento comprenderá el acceso a las actividades no asalariadas y su ejercicio, así como la constitución y gestión de empresas, en las condiciones fijadas por la legislación del país de establecimiento para sus propios nacionales."
          }
        ]
      },
      {
        "title": "Tema 8. La Unión Económica y Monetaria y el Banco Central Europeo",
        "summary": "El Euro, Pacto de Estabilidad y Crecimiento, BCE y el Sistema Europeo de Bancos Centrales (SEBC).",
        "npcName": "Banquero Julien",
        "npcRole": "Economista del Eurosistema",
        "npcLines": [
          "El BCE tiene como objetivo principal la estabilidad de precios.",
          "El BCE goza de total independencia orgánica y financiera.",
          "El Pacto de Estabilidad fija límites de déficit (3%) y deuda (60%)."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 119 a 133 y 282 a 284 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "El objetivo principal del Sistema Europeo de Bancos Centrales y del Banco Central Europeo (art. 127.1 TFUE) es:",
            "options": [
              "Maximizar el crecimiento económico a cualquier coste de inflación",
              "Mantener la estabilidad de precios en la zona euro",
              "Financiar directamente los déficits de los Estados miembros mediante emisión de deuda",
              "Fijar los tipos impositivos del impuesto sobre la renta"
            ],
            "answer": 1,
            "explanation": "El art. 127.1 TFUE establece como misión primordial del SEBC mantener la estabilidad de precios.",
            "reference": "Art. 127.1 TFUE",
            "legalArticle": "Art. 127.1 TFUE",
            "legalText": "El objetivo principal del Sistema Europeo de Bancos Centrales será mantener la estabilidad de precios."
          },
          {
            "prompt": "La cláusula de no corresponsabilidad financiera o prohibición de rescate ('no bail-out', art. 125 TFUE) prohíbe que:",
            "options": [
              "La Unión o los Estados miembros asuman los compromisos de las autoridades públicas de otro Estado miembro",
              "Los bancos presten dinero a tipos de interés inferiores al 1%",
              "Los Estados miembros emitan letras del tesoro a corto plazo",
              "El FMI intervenga en la economía comunitaria"
            ],
            "answer": 0,
            "explanation": "El art. 125 TFUE prohíbe asumir deudas ajenas para garantizar la disciplina presupuestaria nacional.",
            "reference": "Art. 125 TFUE",
            "legalArticle": "Art. 125.1 TFUE",
            "legalText": "La Unión no responderá de los compromisos de los gobiernos centrales, autoridades regionales ni locales de los Estados miembros, ni los asumirá."
          },
          {
            "prompt": "Los valores de referencia del Protocolo sobre el Procedimiento de Déficit Excesivo del Tratado de Maastricht son:",
            "options": [
              "Déficit público máximo del 3% del PIB y deuda pública máxima del 60% del PIB",
              "Déficit del 0% y deuda del 20% del PIB",
              "Déficit del 5% y deuda del 100% del PIB",
              "Superávit obligatorio del 1% anual"
            ],
            "answer": 0,
            "explanation": "El Protocolo nº 12 fija el 3% de déficit y el 60% de deuda respecto al PIB como umbrales clave.",
            "reference": "Protocolo 12 anexo al TFUE",
            "legalArticle": "Art. 1 Protocolo 12 TFUE",
            "legalText": "Los valores de referencia a que se refiere el apartado 2 del artículo 126 del Tratado son: 3% para la proporción entre el déficit público y el PIB; 60% para la proporción entre la deuda pública y el PIB."
          },
          {
            "prompt": "El Comité Ejecutivo del Banco Central Europeo está compuesto por:",
            "options": [
              "Los Ministros de Economía del Eurogrupo",
              "El Presidente, el Vicepresidente y otros cuatro miembros nombrados por el Consejo Europeo por mayoría cualificada por 8 años no renovables",
              "Los 27 gobernadores de los bancos centrales nacionales",
              "Los directores de las principales entidades bancarias privadas"
            ],
            "answer": 1,
            "explanation": "El art. 283.2 TFUE regula la composición y mandato de 8 años no renovable del Comité Ejecutivo.",
            "reference": "Art. 283.2 TFUE",
            "legalArticle": "Art. 283.2 TFUE",
            "legalText": "El Comité Ejecutivo comprenderá al Presidente, al Vicepresidente y a otros cuatro miembros, nombrados por el Consejo Europeo por mayoría cualificada para un mandato de ocho años no renovable."
          }
        ]
      },
      {
        "title": "Tema 9. La cohesión económica, social y territorial y los Fondos Estructurales",
        "summary": "FEDER, FSE+, Fondo de Cohesión, principio de adicionalidad y marco Next Generation EU.",
        "npcName": "Inspectora Elena",
        "npcRole": "Gestora de Fondos Comunitarios",
        "npcLines": [
          "La política de cohesión reduce las disparidades entre regiones de la UE.",
          "El FEDER financia infraestructuras e innovación regional.",
          "Next Generation EU impulsa la transición verde y digital tras la pandemia."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 174 a 178 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "El objetivo de la política de cohesión económica, social y territorial de la UE (art. 174 TFUE) es:",
            "options": [
              "Financiar exclusivamente a las regiones insulares ultraperiféricas",
              "Reducir las diferencias entre los niveles de desarrollo de las diversas regiones y el retraso de las regiones menos desfavorecidas",
              "Subvencionar el déficit de las grandes empresas multinacionales",
              "Fijar salarios mínimos idénticos en todas las provincias"
            ],
            "answer": 1,
            "explanation": "El art. 174 TFUE encomienda a la Unión reducir las disparidades regionales prestando especial atención a las zonas rurales.",
            "reference": "Art. 174 TFUE",
            "legalArticle": "Art. 174 TFUE",
            "legalText": "La Unión se propondrá, en particular, reducir las diferencias entre los niveles de desarrollo de las diversas regiones y el retraso de las regiones menos favorecidas."
          },
          {
            "prompt": "El Fondo Social Europeo Plus (FSE+) tiene como misión prioritaria:",
            "options": [
              "Construir autopistas y líneas ferroviarias de alta velocidad",
              "Fomentar el empleo de calidad, la educación, la formación profesional y la inclusión social",
              "Financiar la compra de armamento defensivo",
              "Subvencionar la producción agrícola de cereales"
            ],
            "answer": 1,
            "explanation": "El FSE+ es el principal instrumento financiero de la UE para invertir en las personas y promover la cohesión social.",
            "reference": "Art. 162 TFUE",
            "legalArticle": "Art. 162 TFUE",
            "legalText": "El Fondo Social Europeo tendrá por objeto mejorar las oportunidades de empleo de los trabajadores en el mercado interior y contribuir a elevar el nivel de vida."
          },
          {
            "prompt": "El Mecanismo de Recuperación y Resiliencia (MRR) de los fondos Next Generation EU se basa en:",
            "options": [
              "El reembolso de gastos corrientes sin justificación",
              "El desembolso condicionado al cumplimiento estricto de hitos y objetivos de reformas e inversiones previamente acordados",
              "Préstamos sin intereses de duración centenaria",
              "La absorción automática de fondos sin auditoría previa"
            ],
            "answer": 1,
            "explanation": "El MRR no abona facturas tradicionales sino que vincula los pagos al logro verificado de hitos y objetivos.",
            "reference": "Reglamento (UE) 2021/241",
            "legalArticle": "Art. 24 Reglamento MRR",
            "legalText": "Los pagos de la contribución financiera a los Estados miembros se supeditarán al cumplimiento satisfactorio de los hitos y objetivos pertinentes."
          },
          {
            "prompt": "El principio de adicionalidad en la gestión de los fondos estructurales europeos exige que:",
            "options": [
              "Los fondos de la UE sustituyan íntegramente a las inversiones del Estado miembro",
              "Las ayudas de la UE no sustituyan a los gastos estructurales públicos o asimilables de un Estado miembro, sino que se sumen a ellos",
              "Los Estados miembros aporten un 90% a fondo perdido",
              "Solo se financien proyectos que no tengan ningún coste nacional"
            ],
            "answer": 1,
            "explanation": "La adicionalidad garantiza que los fondos europeos sumen a la inversión nacional y no la reemplacen.",
            "reference": "Reglamento sobre disposiciones comunes UE",
            "legalArticle": "Principio de Adicionalidad",
            "legalText": "La financiación comunitaria no reemplazará el gasto público del Estado miembro, asegurando un esfuerzo inversor nacional real y adicional."
          }
        ]
      },
      {
        "title": "Tema 10. La Política Exterior y de Seguridad Común (PESC)",
        "summary": "Alto Representante, Servicio Europeo de Acción Exterior (SEAE), defensa común y misiones PSDC.",
        "npcName": "Embajador Borrell",
        "npcRole": "Diplomático de Acción Exterior",
        "npcLines": [
          "La PESC se rige por reglas y procedimientos específicos intergubernamentales.",
          "El Alto Representante dirige la PESC y preside el Consejo de Asuntos Exteriores.",
          "La cláusula de solidaridad asiste a Estados ante catástrofes o terrorismo."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 21 a 46 TUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Quién preside el Consejo de Asuntos Exteriores de la Unión Europea?",
            "options": [
              "El Ministro de Asuntos Exteriores del Estado que ostenta la presidencia semestral",
              "El Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad",
              "El Presidente del Consejo Europeo",
              "El Secretario General de la OTAN"
            ],
            "answer": 1,
            "explanation": "El art. 18.3 TUE dispone que el Alto Representante presidirá el Consejo de Asuntos Exteriores.",
            "reference": "Art. 18.3 TUE",
            "legalArticle": "Art. 18.3 TUE",
            "legalText": "El Alto Representante presidirá el Consejo de Asuntos Exteriores y contribuirá con sus propuestas a la elaboración de la política exterior."
          },
          {
            "prompt": "En el ámbito de la Política Exterior y de Seguridad Común (PESC), la adopción de decisiones se rige por la regla general de:",
            "options": [
              "Mayoría simple del Parlamento Europeo",
              "Unanimidad en el Consejo Europeo y en el Consejo, salvo en los casos en que los Tratados dispongan lo contrario",
              "Mayoría cualificada automática",
              "Voto secreto del Colegio de Comisarios"
            ],
            "answer": 1,
            "explanation": "El art. 24.1 y 31.1 TUE consagran la unanimidad como principio rector de la PESC, excluyendo actos legislativos.",
            "reference": "Art. 31.1 TUE",
            "legalArticle": "Art. 31.1 TUE",
            "legalText": "Las decisiones en el marco de la PESC serán adoptadas por el Consejo Europeo y por el Consejo por unanimidad, salvo en los casos en que el presente Capítulo disponga otra cosa."
          },
          {
            "prompt": "La cláusula de defensa mutua del artículo 42.7 del TUE establece que si un Estado miembro es objeto de una agresión armada en su territorio:",
            "options": [
              "Debe esperar una resolución expresa del Consejo de Seguridad de la ONU",
              "Los demás Estados miembros tendrán la obligación de prestarle ayuda y asistencia con todos los medios a su alcance",
              "El Estado agredido es suspendido temporalmente de la Unión",
              "Solo se prestará ayuda económica pero nunca militar"
            ],
            "answer": 1,
            "explanation": "El art. 42.7 TUE contiene la obligación vinculante de asistencia y socorro mutuo con todos los medios disponibles.",
            "reference": "Art. 42.7 TUE",
            "legalArticle": "Art. 42.7 TUE",
            "legalText": "Si un Estado miembro es objeto de una agresión armada en su territorio, los demás Estados miembros le deberán ayuda y asistencia con todos los medios a su alcance, de conformidad con el artículo 51 de la Carta de Naciones Unidas."
          },
          {
            "prompt": "El Servicio Europeo de Acción Exterior (SEAE) está compuesto por:",
            "options": [
              "Funcionarios de los servicios competentes de la Secretaría General del Consejo y de la Comisión, y personal en comisión de servicios de los ministerios de exteriores nacionales",
              "Militares de carrera de los ejércitos de tierra europeos exclusivamente",
              "Miembros del Parlamento Europeo en excedencia",
              "Jueces y magistrados del Tribunal de Justicia"
            ],
            "answer": 0,
            "explanation": "El art. 27.3 TUE define la composición tripartita del cuerpo diplomático del SEAE.",
            "reference": "Art. 27.3 TUE",
            "legalArticle": "Art. 27.3 TUE",
            "legalText": "El Servicio Europeo de Acción Exterior estará compuesto por funcionarios de los servicios competentes del Consejo y de la Comisión y por personal en comisión de servicios de los servicios diplomáticos nacionales."
          }
        ]
      },
      {
        "title": "Tema 11. El Espacio de Libertad, Seguridad y Justicia: cooperación policial y judicial",
        "summary": "Eurojust, Europol, Fiscalía Europea (EPPO), orden de detención europea y asilo.",
        "npcName": "Fiscal Laura",
        "npcRole": "Fiscal Delegada Europea",
        "npcLines": [
          "La Fiscalía Europea investiga delitos contra los intereses financieros de la Unión.",
          "Europol apoya la cooperación policial entre Estados miembros.",
          "La euroorden agilizó la entrega de sospechosos suprimiendo la extradición."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 67 a 89 TFUE."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "La Fiscalía Europea (EPPO, art. 86 TFUE) es competente para investigar, procesar y llevar a juicio:",
            "options": [
              "Cualquier falta administrativa de tráfico transfronterizo",
              "Los delitos que perjudiquen a los intereses financieros de la Unión (fraude, corrupción, blanqueo y fraude grave del IVA)",
              "Los litigios laborales entre funcionarios comunitarios",
              "Las disputas territoriales entre Estados miembros"
            ],
            "answer": 1,
            "explanation": "La EPPO es el órgano judicial independiente de la UE para perseguir delitos contra el presupuesto de la Unión (Directiva PIF).",
            "reference": "Art. 86 TFUE",
            "legalArticle": "Art. 86.2 TFUE",
            "legalText": "La Fiscalía Europea será competente para investigar, procesar y llevar a juicio a los autores y cómplices de delitos contra los intereses financieros de la Unión."
          },
          {
            "prompt": "La Orden Europea de Detención y Entrega (Euroorden) se fundamenta en el principio de:",
            "options": [
              "Extradición diplomática tradicional con control gubernativo",
              "Reconocimiento mutuo de resoluciones judiciales entre Estados miembros, eliminando la intervención del poder ejecutivo",
              "Soberanía absoluta sin auxilio judicial internacional",
              "Autorización previa del Ministerio de Asuntos Exteriores de ambos países"
            ],
            "answer": 1,
            "explanation": "La Euroorden sustituyó la extradición política por un mecanismo 100% judicial basado en el reconocimiento mutuo.",
            "reference": "Decisión Marco 2002/584/JAI",
            "legalArticle": "Art. 1 Decisión Marco",
            "legalText": "La orden de detención europea es una resolución judicial dictada en un Estado miembro con vistas a la detención y entrega por otro Estado miembro sobre la base del principio de reconocimiento mutuo."
          },
          {
            "prompt": "La misión de Europol (Agencia de la Unión Europea para la Cooperación Policial, art. 88 TFUE) es:",
            "options": [
              "Detener directamente a sospechosos en territorio soberano de los Estados miembros sin avisar",
              "Apoyar y reforzar la actuación de las autoridades policiales de los Estados miembros y su cooperación mutua en la lucha contra la delincuencia grave y el terrorismo",
              "Dictar sentencias penales condenatorias",
              "Conceder visados de entrada en el Espacio Schengen"
            ],
            "answer": 1,
            "explanation": "Europol apoya la inteligencia y coordinación policial entre Estados sin facultades ejecutivas directas coercitivas autónomas.",
            "reference": "Art. 88 TFUE",
            "legalArticle": "Art. 88.1 TFUE",
            "legalText": "Europol tendrá como misión apoyar y reforzar la actuación de las autoridades policiales de los Estados miembros y su colaboración mutua en la prevención de la delincuencia grave y el terrorismo."
          },
          {
            "prompt": "El Acuerdo de Schengen y su acervo normativo conllevan fundamentalmente:",
            "options": [
              "La creación de una moneda única",
              "La supresión de los controles en las fronteras interiores entre los Estados participantes y el refuerzo de las fronteras exteriores comunes",
              "El establecimiento de una policía única comunitaria armada",
              "La libre fijación de visados sin base de datos compartida"
            ],
            "answer": 1,
            "explanation": "El espacio Schengen suprime los controles fronterizos interiores apoyado en el Sistema de Información de Schengen (SIS).",
            "reference": "Art. 77 TFUE",
            "legalArticle": "Art. 77.1 TFUE",
            "legalText": "La Unión desarrollará una política que garantice la ausencia de controles sobre las personas en las fronteras interiores, y un control eficaz de las fronteras exteriores."
          }
        ]
      }
    ]
  },
  {
    "number": 3,
    "title": "Políticas Públicas",
    "ministry": "Ministerio para la Transformación Digital y Función Pública",
    "worldName": "Mundo 3 · Políticas Públicas y Modernización",
    "description": "Políticas sociales, empleo, igualdad efectiva, violencia de género, Agenda 2030, transparencia, buen gobierno y protección de datos.",
    "theme": "inap",
    "bossName": "Directora General de Políticas",
    "bossIntro": "¡Las políticas públicas transforman la sociedad! Del Gobierno Abierto a la igualdad efectiva: ¿sabes aplicar la normativa?",
    "bossStyle": "tribunal",
    "topics": [
      {
        "title": "Tema 1. El ciclo de las políticas públicas y su evaluación",
        "summary": "Diseño, formulación, implementación y evaluación. La Agencia Estatal de Evaluación (AEVAL/evaluación pública).",
        "npcName": "Dra. Nuria",
        "npcRole": "Analista de Políticas Públicas",
        "npcLines": [
          "El ciclo abarca definición del problema, diseño, implementación y evaluación.",
          "La evaluación de impacto mide los efectos reales en la ciudadanía.",
          "La Ley 27/2022 institucionaliza la evaluación de políticas públicas en la AGE."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Ley 27/2022 y ciclo de políticas."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Según la Ley 27/2022, de institucionalización de la evaluación de políticas públicas, ¿cuál es el objeto de la evaluación ex post?",
            "options": [
              "Estimar los costes antes de redactar el anteproyecto de ley",
              "Analizar la eficacia, eficiencia, sostenibilidad e impacto real de la política pública una vez ejecutada",
              "Sancionar a los funcionarios encargados del programa",
              "Aprobar la dotación presupuestaria en los PGE"
            ],
            "answer": 1,
            "explanation": "La evaluación ex post analiza los resultados y el impacto efectivo de la intervención pública una vez concluida o avanzada su ejecución.",
            "reference": "Ley 27/2022",
            "legalArticle": "Art. 3 Ley 27/2022",
            "legalText": "La evaluación de políticas públicas es el proceso sistemático de observación, análisis e interpretación para valorar el diseño, la puesta en práctica, los efectos y los resultados de las políticas públicas."
          },
          {
            "prompt": "En el análisis de políticas públicas, la fase de 'inclusión en la agenda' (agenda-setting) se refiere a:",
            "options": [
              "La publicación de la ley en el Boletín Oficial del Estado",
              "El proceso mediante el cual una demanda o problema social capta la atención de los decisores y se convierte en objeto de acción gubernamental",
              "La fiscalización previa del gasto por la IGAE",
              "El debate de totalidad en el Pleno del Congreso"
            ],
            "answer": 1,
            "explanation": "La formación de la agenda determina qué problemas sociales son reconocidos por el Gobierno como prioritarios para intervenir.",
            "reference": "Teoría de Políticas Públicas",
            "legalArticle": "Fases de Política Pública",
            "legalText": "La entrada en la agenda política implica que un problema colectivo es seleccionado y priorizado por los poderes públicos para formular alternativas de actuación."
          },
          {
            "prompt": "La evaluación de impacto de una política pública se diferencia de la evaluación de resultados en que:",
            "options": [
              "El impacto mide los efectos causales a medio y largo plazo atribuibles específicamente a la política pública, aislando factores externos",
              "El impacto solo cuenta el número de beneficiarios atendidos en ventanilla",
              "El resultado es cualitativo y el impacto es cuantitativo",
              "El impacto se realiza siempre antes de comenzar el proyecto"
            ],
            "answer": 0,
            "explanation": "La evaluación de impacto utiliza métodos cuantitativos y contrafactuales para aislar el efecto neto de la política.",
            "reference": "Metodología de Evaluación",
            "legalArticle": "Evaluación de Impacto",
            "legalText": "La evaluación de impacto persigue determinar de forma causal los cambios observados en la población objetivo atribuibles exclusivamente a la intervención evaluada."
          },
          {
            "prompt": "El Plan de Evaluación de Políticas Públicas de la Administración General del Estado tiene carácter:",
            "options": [
              "Decenal y vinculante para el sector privado",
              "Plurianual y es aprobado por el Consejo de Ministros",
              "Secreto y reservado a la Presidencia del Gobierno",
              "Exclusivo de los ministerios económicos"
            ],
            "answer": 1,
            "explanation": "La Ley 27/2022 establece que el Consejo de Ministros aprobará el Plan Plurianual de Evaluación de Políticas Públicas de la AGE.",
            "reference": "Art. 9 Ley 27/2022",
            "legalArticle": "Art. 9 Ley 27/2022",
            "legalText": "El Consejo de Ministros aprobará, con periodicidad plurianual, el Plan de Evaluaciones de la Administración General del Estado."
          }
        ]
      },
      {
        "title": "Tema 2. Las políticas de servicios sociales y el Sistema de Dependencia",
        "summary": "Ley 39/2006 (SAAD). Grados de dependencia, catálogo de prestaciones y copago.",
        "npcName": "Trabajadora Lucía",
        "npcRole": "Coordinadora del SAAD",
        "npcLines": [
          "La Ley 39/2006 creó el Sistema para la Autonomía y Atención a la Dependencia.",
          "Existen 3 grados de dependencia: moderada, severa y gran dependencia.",
          "Prioriza los servicios profesionales sobre las prestaciones económicas."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 14, 15 y 26 Ley 39/2006."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Cuántos grados de dependencia reconoce la Ley 39/2006 (SAAD)?",
            "options": [
              "Cinco grados clasificados por porcentajes de minusvalía",
              "Tres grados: Grado I (dependencia moderada), Grado II (dependencia severa) y Grado III (gran dependencia)",
              "Dos grados: leve y grave",
              "Cuatro niveles fijados anualmente por la Ley de Presupuestos"
            ],
            "answer": 1,
            "explanation": "El art. 26 de la Ley 39/2006 clasifica la dependencia en tres grados: moderada, severa y gran dependencia.",
            "reference": "Art. 26 Ley 39/2006",
            "legalArticle": "Art. 26.1 Ley 39/2006",
            "legalText": "La situación de dependencia se clasificará en los siguientes grados: Grado I. Dependencia moderada. Grado II. Dependencia severa. Grado III. Gran dependencia."
          },
          {
            "prompt": "Según la Ley 39/2006, la prestación económica para cuidados en el entorno familiar tiene carácter:",
            "options": [
              "Preferente y prioritario sobre cualquier servicio",
              "Excepcional, cuando no sea posible la atención mediante servicios acreditados de la red pública",
              "Incompatible con cualquier pensión de la Seguridad Social",
              "Automático sin necesidad de valoración técnica"
            ],
            "answer": 1,
            "explanation": "El art. 18 de la Ley 39/2006 establece la prestación económica como excepcional frente a los servicios residenciales y de teleasistencia.",
            "reference": "Art. 18 Ley 39/2006",
            "legalArticle": "Art. 18.1 Ley 39/2006",
            "legalText": "El beneficiario podrá, excepcionalmente, recibir una prestación económica para ser atendido por cuidadores no profesionales, siempre que se den condiciones adecuadas de convivencia."
          },
          {
            "prompt": "La financiación del Sistema para la Autonomía y Atención a la Dependencia se estructura en:",
            "options": [
              "Financiación 100% municipal con cargo al IBI",
              "Nivel mínimo de protección garantizado por la AGE, nivel acordado entre la AGE y CCAA, y aportación de las CCAA y usuarios (copago)",
              "Cuotas directas descontadas en la nómina de todos los trabajadores",
              "Una tasa estatal finalista sobre hidrocarburos"
            ],
            "answer": 1,
            "explanation": "El art. 32 de la Ley 39/2006 estructura los niveles de financiación del SAAD garantizados por el Estado y CCAA.",
            "reference": "Art. 32 Ley 39/2006",
            "legalArticle": "Art. 32 Ley 39/2006",
            "legalText": "La financiación del Sistema comprenderá las aportaciones de la Administración General del Estado, de las CCAA y la participación de los beneficiarios en función de su capacidad económica."
          },
          {
            "prompt": "El Programa Individual de Atención (PIA) en el marco de la Ley de Dependencia tiene por objeto:",
            "options": [
              "Inscribir al dependiente en el censo electoral",
              "Determinar las modalidades de intervención y los servicios y prestaciones más adecuados a las necesidades del beneficiario",
              "Eximir al beneficiario del pago del IRPF",
              "Asignar plaza escolar obligatoria a los hijos menores"
            ],
            "answer": 1,
            "explanation": "El art. 29 Ley 39/2006 regula el PIA como el plan individualizado acordado con la persona en situación de dependencia.",
            "reference": "Art. 29 Ley 39/2006",
            "legalArticle": "Art. 29.1 Ley 39/2006",
            "legalText": "El Programa Individual de Atención determinará las modalidades de intervención más adecuadas a sus necesidades de entre los servicios y prestaciones económicas previstos."
          }
        ]
      },
      {
        "title": "Tema 3. Las políticas de empleo y el Sistema Nacional de Empleo",
        "summary": "Ley 3/2023 de Empleo. SEPE, políticas activas y pasivas, intermediación y formación.",
        "npcName": "Orientador Javier",
        "npcRole": "Técnico del SEPE",
        "npcLines": [
          "La Ley 3/2023 transformó el marco del Sistema Nacional de Empleo.",
          "El SEPE gestiona las prestaciones pasivas por desempleo.",
          "Las CCAA ejecutan las políticas activas de empleo y formación."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Ley 3/2023 de Empleo."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Según la Ley 3/2023 de Empleo, el Sistema Nacional de Empleo está integrado por:",
            "options": [
              "Los sindicatos mayoritarios y las patronales exclusivamente",
              "La Agencia Española de Empleo (SEPE) y los servicios públicos de empleo de las Comunidades Autónomas",
              "Las empresas de trabajo temporal y las agencias privadas de colocación",
              "El Ministerio de Trabajo y la Inspección de Trabajo"
            ],
            "answer": 1,
            "explanation": "El art. 7 de la Ley 3/2023 define el SNE como el conjunto de estructuras y servicios estatales y autonómicos.",
            "reference": "Art. 7 Ley 3/2023",
            "legalArticle": "Art. 7.1 Ley 3/2023",
            "legalText": "El Sistema Nacional de Empleo está integrado por la Agencia Española de Empleo y por los servicios públicos de empleo de las Comunidades Autónomas."
          },
          {
            "prompt": "La diferencia fundamental entre políticas activas y políticas pasivas de empleo radica en que:",
            "options": [
              "Las activas orientan, forman e insertan laboralmente, mientras que las pasivas cubren económicamente la contingencia de desempleo",
              "Las activas son de competencia estatal y las pasivas de los ayuntamientos",
              "Las activas se pagan en metálico y las pasivas en especie",
              "Las pasivas no exigen estar inscrito como demandante de empleo"
            ],
            "answer": 0,
            "explanation": "Las políticas activas buscan la inserción (intermediación, formación), mientras las pasivas son prestaciones por desempleo del SEPE.",
            "reference": "Ley 3/2023 de Empleo",
            "legalArticle": "Art. 21 Ley 3/2023",
            "legalText": "Son políticas activas de empleo el conjunto de servicios y programas dirigidos a mejorar las posibilidades de acceso al empleo de las personas demandantes."
          },
          {
            "prompt": "La Cartera Común de Servicios del Sistema Nacional de Empleo garantiza:",
            "options": [
              "Un puesto de trabajo fijo garantizado por ley a los 3 meses de la inscripción",
              "Un conjunto básico de servicios garantizados y homogéneos a todas las personas y empresas en cualquier territorio del Estado",
              "El cobro del subsidio de desempleo indefinido",
              "La exención de cotizaciones a la Seguridad Social a todas las pymes"
            ],
            "answer": 1,
            "explanation": "El art. 60 de la Ley 3/2023 establece la Cartera Común de Servicios para garantizar la igualdad de oportunidades en todo el territorio.",
            "reference": "Art. 60 Ley 3/2023",
            "legalArticle": "Art. 60.1 Ley 3/2023",
            "legalText": "La Cartera Común de Servicios del Sistema Nacional de Empleo garantiza el acceso a servicios de empleo en condiciones de igualdad en todo el Estado."
          },
          {
            "prompt": "Las Agencias de Colocación públicas o privadas autorizadas colaboran con los Servicios Públicos de Empleo mediante:",
            "options": [
              "La potestad sancionadora a los parados",
              "La intermediación laboral para valorar perfiles y facilitar la colocación de demandantes",
              "El pago directo de las nóminas de los trabajadores",
              "La inspección de fraudes tributarios"
            ],
            "answer": 1,
            "explanation": "El art. 42 de la Ley 3/2023 regula las agencias de colocación como entidades colaboradoras de intermediación laboral.",
            "reference": "Art. 42 Ley 3/2023",
            "legalArticle": "Art. 42.1 Ley 3/2023",
            "legalText": "Son agencias de colocación aquellas entidades públicas o privadas que realicen actividades de intermediación laboral para proporcionar un trabajo adecuado a las personas demandantes."
          }
        ]
      },
      {
        "title": "Tema 4. Igualdad de género y principio de no discriminación",
        "summary": "Ley Orgánica 3/2007 (LOIEMH). Planes de igualdad, principio de transversalidad y lenguaje no sexista.",
        "npcName": "Delegada Beatriz",
        "npcRole": "Técnica de Igualdad de la AGE",
        "npcLines": [
          "El principio de transversalidad (gender mainstreaming) impregna toda la actuación pública.",
          "Las empresas de 50 o más trabajadores deben tener Plan de Igualdad.",
          "El informe de impacto de género es preceptivo en los proyectos normativos."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 14, 19, 45 y 46 LO 3/2007."
        ],
        "boeIds": [
          "BOE-A-2007-6115"
        ],
        "questions": [
          {
            "prompt": "Según la Ley Orgánica 3/2007 (LOIEMH), ¿a partir de qué número de personas trabajadoras es obligatorio el Plan de Igualdad en las empresas?",
            "options": [
              "Empresas de más de 250 trabajadores",
              "Empresas de 50 o más personas trabajadoras",
              "Empresas de 100 trabajadores exclusivamente",
              "Solo en las empresas del sector público"
            ],
            "answer": 1,
            "explanation": "Tras la reforma del RDL 6/2019, el art. 45.2 LO 3/2007 fija la obligatoriedad del Plan de Igualdad a partir de 50 trabajadores.",
            "reference": "Art. 45.2 LO 3/2007",
            "legalArticle": "Art. 45.2 LO 3/2007",
            "legalText": "Las empresas de cincuenta o más personas trabajadoras deberán elaborar y aplicar un plan de igualdad con el alcance y contenido previstos en este capítulo."
          },
          {
            "prompt": "El principio de transversalidad del principio de igualdad de trato y de oportunidades (art. 15 LO 3/2007) exige que:",
            "options": [
              "Se cree un ministerio exclusivo que concentre todas las competencias de gasto",
              "La igualdad de género informe de forma activa la actuación de todos los poderes públicos en todas sus fases y políticas",
              "Haya paridad del 50% exacta en todos los cuerpos de funcionarios sin excepción",
              "Se reserven el 30% de los contratos menores a empresas dirigidas por mujeres"
            ],
            "answer": 1,
            "explanation": "El art. 15 LO 3/2007 consagra la integración de la perspectiva de género en todas las políticas públicas.",
            "reference": "Art. 15 LO 3/2007",
            "legalArticle": "Art. 15 LO 3/2007",
            "legalText": "El principio de igualdad de trato y de oportunidades entre mujeres y hombres informará, con carácter transversal, la actuación de todos los Poderes Públicos."
          },
          {
            "prompt": "En los órganos colegiados de la AGE y comités de selección, el principio de presencia equilibrada (D.A. 1ª LO 3/2007) significa que:",
            "options": [
              "El 100% de los miembros deben ser mujeres durante los próximos 5 años",
              "Las personas de cada sexo no superen el sesenta por ciento ni sean menos del cuarenta por ciento",
              "Debe haber el mismo número de hombres que de mujeres más un presidente neutral",
              "Se aplique solo si el tribunal calificador lo decide por mayoría"
            ],
            "answer": 1,
            "explanation": "La D.A. 1ª LO 3/2007 define presencia equilibrada como el intervalo entre el 40% y el 60% para cada sexo.",
            "reference": "D.A. 1ª LO 3/2007",
            "legalArticle": "Disposición Adicional Primera LO 3/2007",
            "legalText": "Se entenderá por composición equilibrada la presencia de mujeres y hombres de forma que las personas de cada sexo no superen el sesenta por ciento ni sean menos del cuarenta por ciento."
          },
          {
            "prompt": "La discriminación indirecta por razón de sexo se produce cuando (art. 6.2 LO 3/2007):",
            "options": [
              "Una norma o criterio aparentemente neutro sitúa a personas de un sexo en desventaja particular con respecto a personas del otro",
              "Se insulta verbalmente a una persona por su condición sexual",
              "Se despide a una trabajadora con motivo de su embarazo",
              "Se abona un salario inferior a una mujer por realizar idéntico trabajo"
            ],
            "answer": 0,
            "explanation": "El art. 6.2 LO 3/2007 define la discriminación indirecta ante criterios formalmente neutros pero con impacto desproporcionado.",
            "reference": "Art. 6.2 LO 3/2007",
            "legalArticle": "Art. 6.2 LO 3/2007",
            "legalText": "Constituye discriminación indirecta por razón de sexo la situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular con respecto a personas del otro."
          }
        ]
      },
      {
        "title": "Tema 5. La política contra la violencia de género y tutela institucional",
        "summary": "Ley Orgánica 1/2004. Derechos de las víctimas, medidas judiciales, Juzgados de Violencia sobre la Mujer.",
        "npcName": "Fiscal Patricia",
        "npcRole": "Fiscal de la Sección de Violencia de Género",
        "npcLines": [
          "La LO 1/2004 aborda la violencia ejercida por quien sea o haya sido cónyuge o pareja.",
          "Crea los Juzgados de Violencia sobre la Mujer especializados.",
          "Las trabajadoras víctimas tienen derechos de reducción de jornada y traslado."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 1, 17, 21 y 43 LO 1/2004."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "El ámbito de aplicación de la Ley Orgánica 1/2004 de Medidas de Protección Integral contra la Violencia de Género se define como:",
            "options": [
              "Cualquier agresión física entre familiares de hasta cuarto grado",
              "La violencia que ejercen sobre las mujeres quienes sean o hayan sido sus cónyuges o quienes estén o hayan estado ligados a ellas por relaciones similares de afectividad, aun sin convivencia",
              "La violencia escolar y laboral en centros de trabajo",
              "Los delitos de odio motivados por orientación sexual exclusivamente"
            ],
            "answer": 1,
            "explanation": "El art. 1.1 LO 1/2004 circunscribe su objeto a la violencia ejercida por cónyuges o parejas/exparejas masculinas.",
            "reference": "Art. 1.1 LO 1/2004",
            "legalArticle": "Art. 1.1 LO 1/2004",
            "legalText": "La presente Ley tiene por objeto actuar contra la violencia que se ejerce sobre las mujeres por parte de quienes sean o hayan sido sus cónyuges o de quienes estén o hayan estado ligados a ellas por relaciones similares de afectividad."
          },
          {
            "prompt": "En el orden jurisdiccional penal, la LO 1/2004 introdujo en los partidos judiciales:",
            "options": [
              "Los Juzgados de lo Mercantil",
              "Los Juzgados de Violencia sobre la Mujer",
              "Los Tribunales de Honor militares",
              "La Sala Quinta de lo Social del Tribunal Supremo"
            ],
            "answer": 1,
            "explanation": "El art. 43 LO 1/2004 creó los Juzgados de Violencia sobre la Mujer con competencias penales y civiles conexas.",
            "reference": "Art. 43 LO 1/2004",
            "legalArticle": "Art. 43 LO 1/2004",
            "legalText": "Se crean los Juzgados de Violencia sobre la Mujer en cada partido judicial, que conocerán de la instrucción de los procesos penales y materias de derecho de familia conexas."
          },
          {
            "prompt": "La funcionaria pública víctima de violencia de género tiene derecho (art. 49 TREBEP y art. 24 LO 1/2004) a:",
            "options": [
              "Ascenso automático al Grupo A1 sin oposición",
              "La reducción o reordenación del tiempo de trabajo, traslado a otra localidad y excedencia por violencia de género con reserva de puesto",
              "Jubilación anticipada con el 100% de la pensión a cualquier edad",
              "Inmunidad judicial frente a infracciones disciplinarias"
            ],
            "answer": 1,
            "explanation": "El Estatuto Básico del Empleado Público reconoce el derecho al traslado forzoso protegido, adaptación horaria y excedencia.",
            "reference": "Art. 49 y 89 TREBEP",
            "legalArticle": "Art. 89.5 TREBEP",
            "legalText": "Las funcionarias víctimas de violencia de género tendrán derecho a solicitar la situación de excedencia por violencia de género sin necesidad de haber prestado un tiempo mínimo de servicios previos."
          },
          {
            "prompt": "La Orden de Protección integral para las víctimas de violencia doméstica y de género (art. 544 ter LECrim) confiere:",
            "options": [
              "Medidas cautelares penales (alejamiento, prohibición de comunicación) y civiles (custodia, atribución de vivienda), y medidas de asistencia social",
              "Solo una ayuda económica de 300 euros al mes",
              "El divorcio automático en 24 horas sin juicio",
              "La pérdida de la nacionalidad del agresor"
            ],
            "answer": 0,
            "explanation": "El art. 544 ter LECrim unifica en un estatuto cautelar integral medidas de seguridad penal, régimen civil y asistencia pública.",
            "reference": "Art. 544 ter LECrim",
            "legalArticle": "Art. 544 ter LECrim",
            "legalText": "El Juez de Instrucción dictará orden de protección para las víctimas de violencia cuando existan indicios fundados de comisión de un delito, confiriendo un estatuto integral de protección."
          }
        ]
      },
      {
        "title": "Tema 6. La Agenda 2030, Objetivos de Desarrollo Sostenible y cambio climático",
        "summary": "17 ODS. Transición ecológica justa, Ley 7/2021 de cambio climático y economía circular.",
        "npcName": "Ambientólogo David",
        "npcRole": "Asesor de Transición Ecológica",
        "npcLines": [
          "La Agenda 2030 fue aprobada por la Asamblea General de la ONU en 2015.",
          "Cuenta con 17 Objetivos de Desarrollo Sostenible (ODS) y 169 metas.",
          "La Ley 7/2021 fija la neutralidad climática en España para 2050."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Ley 7/2021 de Cambio Climático y 17 ODS."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "La Ley 7/2021, de cambio climático y transición energética, establece como objetivo vinculante que España alcance la neutralidad climática a más tardar en el año:",
            "options": [
              "2030",
              "2040",
              "2050",
              "2070"
            ],
            "answer": 2,
            "explanation": "El art. 3.1 de la Ley 7/2021 fija el año 2050 como fecha límite para alcanzar la neutralidad climática cero emisiones netas.",
            "reference": "Art. 3 Ley 7/2021",
            "legalArticle": "Art. 3.1 Ley 7/2021",
            "legalText": "A más tardar en el año 2050, España deberá alcanzar la neutralidad climática y el sistema eléctrico deberá estar basado exclusivamente en fuentes de generación de origen renovable."
          },
          {
            "prompt": "¿Cuántos Objetivos de Desarrollo Sostenible (ODS) integran la Agenda 2030 aprobada por Naciones Unidas?",
            "options": [
              "8 Objetivos",
              "10 Metas del Milenio",
              "17 Objetivos con 169 Metas asociadas",
              "25 Directrices globales"
            ],
            "answer": 2,
            "explanation": "La Resolución 70/1 de la Asamblea General de la ONU estableció los 17 ODS estructurados en las 5P (Personas, Planeta, Prosperidad, Paz y Alianzas).",
            "reference": "Agenda 2030 ONU",
            "legalArticle": "Resolución 70/1 AG ONU",
            "legalText": "La Agenda 2030 contiene 17 Objetivos de Desarrollo Sostenible y 169 metas de carácter integrado e indivisible que abarcan las esferas económica, social y ambiental."
          },
          {
            "prompt": "El principio de 'no causar un perjuicio significativo al medio ambiente' (principio DNSH) en el marco de la UE y de la Ley 7/2021 exige que:",
            "options": [
              "No se gaste más del 10% en obras públicas",
              "Ninguna medida o inversión pública financiada cause un daño apreciable a los objetivos ambientales de mitigación, adaptación, agua o biodiversidad",
              "Se prohíba el uso de papel en toda la Administración a partir de mañana",
              "Se cierren todas las centrales hidráulicas"
            ],
            "answer": 1,
            "explanation": "El principio DNSH (Do No Significant Harm) es vinculante para todas las inversiones financiadas con fondos europeos y estatales.",
            "reference": "Reglamento (UE) 2020/852 (Taxonomía)",
            "legalArticle": "Principio DNSH",
            "legalText": "Las actividades económicas e inversiones no deben causar un perjuicio significativo a ninguno de los seis objetivos medioambientales fijados por la Unión Europea."
          },
          {
            "prompt": "El Plan Nacional Integrado de Energía y Clima (PNIEC) es el instrumento que articula:",
            "options": [
              "Los tratados de extradición en materia ambiental",
              "La planificación estratégica española para la reducción de emisiones de gases de efecto invernadero y fomento de energías renovables",
              "La fijación de los precios de la gasolina en gasolineras",
              "La contratación de personal funcionario de meteorología"
            ],
            "answer": 1,
            "explanation": "El PNIEC es el documento director de compromisos climáticos y energéticos de España remitido a la Comisión Europea.",
            "reference": "Art. 4 Ley 7/2021",
            "legalArticle": "Art. 4.1 Ley 7/2021",
            "legalText": "El Plan Nacional Integrado de Energía y Clima es la herramienta de planificación estratégica nacional que integra la política de energía y clima del Estado."
          }
        ]
      },
      {
        "title": "Tema 7. La transparencia, acceso a la información y buen gobierno",
        "summary": "Ley 19/2013. Publicidad activa, derecho de acceso a la información y Consejo de Transparencia (CTBG).",
        "npcName": "Comisionado Tomás",
        "npcRole": "Vocal del Consejo de Transparencia",
        "npcLines": [
          "La Ley 19/2013 garantiza la publicidad activa y el derecho de acceso.",
          "El plazo general para resolver la solicitud de información es de 1 mes.",
          "El silencio administrativo ante solicitudes de acceso es desestimatorio."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 12 a 24 Ley 19/2013."
        ],
        "boeIds": [
          "BOE-A-2013-12887"
        ],
        "questions": [
          {
            "prompt": "Según la Ley 19/2013 de Transparencia, ¿cuál es el plazo general máximo para resolver y notificar una solicitud de acceso a la información pública?",
            "options": [
              "10 días hábiles",
              "1 mes desde la recepción de la solicitud por el órgano competente, prorrogable por otro mes en casos de volumen o complejidad",
              "3 meses improrrogables",
              "15 días naturales"
            ],
            "answer": 1,
            "explanation": "El art. 20.1 Ley 19/2013 fija un mes, ampliable por un mes más motivadamente si la información es voluminosa o compleja.",
            "reference": "Art. 20.1 Ley 19/2013",
            "legalArticle": "Art. 20.1 Ley 19/2013",
            "legalText": "La resolución en la que se conceda o deniegue el acceso deberá notificarse al solicitante en el plazo máximo de un mes desde la recepción de la solicitud por el órgano competente."
          },
          {
            "prompt": "¿Qué sentido tiene el silencio administrativo transcurrido el plazo máximo para resolver una solicitud de acceso a la información (art. 20.4 Ley 19/2013)?",
            "options": [
              "Estimatorio (se entiende concedido el acceso)",
              "Desestimatorio (se entiende denegada la solicitud)",
              "Caducidad automática del procedimiento",
              "Suspensión hasta informe de la Abogacía del Estado"
            ],
            "answer": 1,
            "explanation": "A diferencia de la LPAC, el art. 20.4 Ley 19/2013 establece que el silencio ante peticiones de información es desestimatorio negativo.",
            "reference": "Art. 20.4 Ley 19/2013",
            "legalArticle": "Art. 20.4 Ley 19/2013",
            "legalText": "Transcurrido el plazo máximo para resolver sin que se haya dictado y notificado resolución expresa se entenderá que la solicitud ha sido desestimada."
          },
          {
            "prompt": "Frente a la denegación expresa o tácita del acceso a la información pública, cabe interponer con carácter potestativo y previo a la vía contenciosa:",
            "options": [
              "Recurso de alzada ante el Ministro del Interior",
              "Reclamación ante el Consejo de Transparencia y Buen Gobierno (CTBG)",
              "Recurso extraordinario de revisión",
              "Denuncia ante el Tribunal de Cuentas"
            ],
            "answer": 1,
            "explanation": "El art. 24 Ley 19/2013 prevé la reclamación independiente y gratuita ante el Consejo de Transparencia en plazo de un mes.",
            "reference": "Art. 24 Ley 19/2013",
            "legalArticle": "Art. 24.1 Ley 19/2013",
            "legalText": "Frente a toda resolución expresa o presunta en materia de acceso podrá interponerse una reclamación ante el Consejo de Transparencia y Buen Gobierno, con carácter potestativo y previo a su impugnación contencioso-administrativa."
          },
          {
            "prompt": "¿Exige la Ley 19/2013 que el solicitante motive o acredite un interés legítimo para pedir información pública?",
            "options": [
              "Sí, es obligatorio acreditar un interés directo y personal",
              "No, el solicitante no está obligado a motivar su solicitud, aunque puede exponer los motivos que no serán causa de denegación",
              "Solo si la información afecta a contratos públicos",
              "Debe ser siempre colegiado o pertenecer a una asociación de prensa"
            ],
            "answer": 1,
            "explanation": "El art. 17.3 Ley 19/2013 dispone que el solicitante no está obligado a motivar su solicitud de acceso a la información.",
            "reference": "Art. 17.3 Ley 19/2013",
            "legalArticle": "Art. 17.3 Ley 19/2013",
            "legalText": "El solicitante no está obligado a motivar su solicitud de acceso a la información. Sin embargo, podrá exponer las razones por las que solicita la información y que podrán ser tenidas en cuenta al dictar la resolución."
          }
        ]
      },
      {
        "title": "Tema 8. La protección de datos personales y garantía de los derechos digitales",
        "summary": "RGPD (UE) 2016/679 y Ley Orgánica 3/2018 (LOPDGDD). AEPD, principios y derechos ARSOPOL.",
        "npcName": "Delegada Sonia",
        "npcRole": "Delegada de Protección de Datos (DPD)",
        "npcLines": [
          "El RGPD y la LO 3/2018 consagran los principios de licitud, lealtad y transparencia.",
          "Los derechos ARSOPOL incluyen acceso, rectificación, supresión y oposición.",
          "El Delegado de Protección de Datos es obligatorio en todas las AAPP."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 5, 6, 12 a 22 RGPD y LO 3/2018."
        ],
        "boeIds": [
          "BOE-A-2018-16673"
        ],
        "questions": [
          {
            "prompt": "El plazo general del responsable del tratamiento para responder a una solicitud de ejercicio de derechos ARSOPOL (art. 12.3 RGPD) es de:",
            "options": [
              "10 días hábiles",
              "Un mes a partir de la recepción de la solicitud, prorrogable otros dos meses en caso de complejidad",
              "Tres meses improrrogables",
              "24 horas bajo apercibimiento de sanción"
            ],
            "answer": 1,
            "explanation": "El art. 12.3 del RGPD establece un plazo de un mes para dar respuesta a los derechos de los interesados.",
            "reference": "Art. 12.3 RGPD",
            "legalArticle": "Art. 12.3 RGPD (UE) 2016/679",
            "legalText": "El responsable del tratamiento facilitará al interesado información relativa a sus actuaciones en el plazo de un mes a partir de la recepción de la solicitud."
          },
          {
            "prompt": "¿Es obligatoria la designación de un Delegado de Protección de Datos (DPD) en las Administraciones Públicas?",
            "options": [
              "No, solo es obligatorio en empresas tecnológicas multinacionales",
              "Sí, siempre que el tratamiento lo lleve a cabo una autoridad u organismo público, salvo los tribunales en el ejercicio de su función judicial",
              "Solo en ministerios que gestionen fondos reservados",
              "Es una figura voluntaria que sustituye al Subsecretario"
            ],
            "answer": 1,
            "explanation": "El art. 37.1.a) del RGPD y art. 34 LOPDGDD imponen la designación preceptiva de un DPD a todas las Administraciones Públicas.",
            "reference": "Art. 37 RGPD y Art. 34 LO 3/2018",
            "legalArticle": "Art. 37.1.a RGPD",
            "legalText": "El responsable y el encargado del tratamiento designarán un delegado de protección de datos cuando el tratamiento lo lleve a cabo una autoridad u organismo público, excepto los tribunales."
          },
          {
            "prompt": "El principio de responsabilidad proactiva ('accountability', art. 5.2 RGPD) exige al responsable del tratamiento:",
            "options": [
              "Subcontratar toda la custodia de ficheros en servidores extranjeros",
              "Ser capaz de demostrar en todo momento el cumplimiento efectivo de los principios y medidas de protección de datos",
              "Pedir autorización previa al juez para cada tratamiento",
              "Pagar un canon anual a la Agencia Española de Protección de Datos"
            ],
            "answer": 1,
            "explanation": "La responsabilidad proactiva impone al responsable aplicar medidas técnicas y acreditar documentalmente su cumplimiento.",
            "reference": "Art. 5.2 RGPD",
            "legalArticle": "Art. 5.2 RGPD",
            "legalText": "El responsable del tratamiento será responsable del cumplimiento de lo dispuesto en el apartado 1 y capaz de demostrarlo (responsabilidad proactiva)."
          },
          {
            "prompt": "En caso de producirse una brecha o violación de la seguridad de los datos personales (art. 33 RGPD), el responsable debe notificarla a la AEPD en:",
            "options": [
              "Un plazo máximo de 72 horas después de que haya tenido constancia de ella, a menos que sea improbable que entrañe riesgo para los derechos",
              "15 días hábiles",
              "1 mes natural",
              "El informe anual de gestión al cierre del ejercicio"
            ],
            "answer": 0,
            "explanation": "El art. 33.1 RGPD exige notificar la brecha a la autoridad de control en un máximo de 72 horas.",
            "reference": "Art. 33 RGPD",
            "legalArticle": "Art. 33.1 RGPD",
            "legalText": "En caso de violación de la seguridad de los datos personales, el responsable del tratamiento la notificará a la autoridad de control competente sin dilación indebida y, de ser posible, a más tardar 72 horas después de que haya tenido constancia."
          }
        ]
      },
      {
        "title": "Tema 9. La gobernanza pública, innovación y ética en el servicio público",
        "summary": "Gobierno Abierto, integridad pública, prevención de la corrupción y cartas de servicios.",
        "npcName": "Profesor Aranzadi",
        "npcRole": "Catedrático de Ética Pública",
        "npcLines": [
          "El Gobierno Abierto se basa en transparencia, participación y colaboración.",
          "Las Cartas de Servicios informan a los ciudadanos sobre los compromisos de calidad.",
          "La integridad pública es la garantía esencial contra la corrupción."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Real Decreto 951/2005 y Planes de Gobierno Abierto."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Los tres pilares esenciales que definen el modelo de 'Gobierno Abierto' (Open Government) son:",
            "options": [
              "Fiscalización, inspección y sanción",
              "Transparencia, participación ciudadana y rendición de cuentas / colaboración",
              "Digitalización, teletrabajo y reducción de plantillas",
              "Jerarquía, secreto de actuaciones y centralización"
            ],
            "answer": 1,
            "explanation": "El Gobierno Abierto se fundamenta internacionalmente en los pilares de transparencia, participación ciudadana y rendición de cuentas.",
            "reference": "Alianza para el Gobierno Abierto (OGP)",
            "legalArticle": "Fundamentos Gobierno Abierto",
            "legalText": "El Gobierno Abierto promueve la transparencia gubernamental, la rendición de cuentas, la participación de la sociedad y la colaboración institucional."
          },
          {
            "prompt": "Según el Real Decreto 951/2005 de calidad de los servicios en la AGE, las Cartas de Servicios son:",
            "options": [
              "Contratos mercantiles con empresas de mensajería",
              "Documentos mediante los cuales los órganos y organismos informan a los ciudadanos sobre los servicios encomendados y los compromisos de calidad en su gestión",
              "Listados de precios de los servicios públicos",
              "Reglamentos de régimen disciplinario interno"
            ],
            "answer": 1,
            "explanation": "El art. 8 del RD 951/2005 define las Cartas de Servicios como el instrumento de información pública y compromisos de calidad.",
            "reference": "Art. 8 RD 951/2005",
            "legalArticle": "Art. 8 RD 951/2005",
            "legalText": "Las cartas de servicios son documentos que tienen por objeto informar al ciudadano sobre los servicios que gestionan, las condiciones en que se prestan y los compromisos de calidad asumidos."
          },
          {
            "prompt": "Los buzones o canales éticos de denuncia interna en el sector público regulados por la Ley 2/2023 garantizan:",
            "options": [
              "La publicación inmediata del nombre del denunciado en redes sociales",
              "La protección adecuada de las personas que informen sobre infracciones normativas y de lucha contra la corrupción, garantizando la confidencialidad y el anonimato",
              "El cobro de una gratificación del 10% del fraude denunciado",
              "La suspensión de empleo y sueldo sin trámite de alegaciones"
            ],
            "answer": 1,
            "explanation": "La Ley 2/2023 transpone la Directiva Whistleblowing protegiendo al informante y prohibiendo represalias.",
            "reference": "Ley 2/2023 de Protección del Informante",
            "legalArticle": "Art. 1 Ley 2/2023",
            "legalText": "La finalidad de la ley es proteger a las personas que en un contexto laboral o profesional detecten infracciones penales o administrativas graves y las comuniquen."
          },
          {
            "prompt": "En el marco de la calidad en la gestión pública, el modelo europeo de excelencia EFQM evalúa:",
            "options": [
              "Solo el beneficio financiero al cierre de balance",
              "Tanto los agentes facilitadores (liderazgo, personas, estrategia, alianzas) como los resultados en personas, clientes, sociedad y rendimiento global",
              "Únicamente el cumplimiento horario de los empleados",
              "El número de multas impuestas en el ejercicio"
            ],
            "answer": 1,
            "explanation": "El modelo EFQM es un marco integral de calidad que equilibra agentes facilitadores y resultados en clientes y sociedad.",
            "reference": "Marco de Calidad AGE",
            "legalArticle": "Modelo EFQM en la AGE",
            "legalText": "El modelo EFQM evalúa la gestión integral mediante criterios de liderazgo, personas, estrategia y alianzas, correlacionándolos con resultados sostenibles en la sociedad."
          }
        ]
      }
    ]
  },
  {
    "number": 4,
    "title": "Derecho Administrativo General",
    "ministry": "Ministerio de la Presidencia, Justicia y Relaciones con las Cortes",
    "worldName": "Mundo 4 · El Palacio de Justicia y los Tribunales",
    "description": "Fuentes, acto administrativo, procedimiento común (LPAC 39/2015), recursos, contratación pública (LCSP 9/2017) y responsabilidad patrimonial.",
    "theme": "justicia",
    "bossName": "Jueza de Alzada",
    "bossIntro": "¡El acto administrativo que vulnere el ordenamiento es nulo de pleno derecho! ¿Conoces la Ley 39/2015 al dedillo?",
    "bossStyle": "jueza",
    "topics": [
      {
        "title": "Tema 1. El Derecho Administrativo y las fuentes. El principio de legalidad",
        "summary": "Fuentes del Derecho Administrativo, jerarquía normativa, reglamento y potestad reglamentaria.",
        "npcName": "Profesor Gómez",
        "npcRole": "Catedrático de Derecho Administrativo",
        "npcLines": [
          "El principio de legalidad vincula a toda la Administración.",
          "La potestad reglamentaria está subordinada a la ley.",
          "El art. 128 LPAC fija los límites de los reglamentos."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 128 y 129 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Según el art. 128.2 de la Ley 39/2015, los reglamentos administrativos NO pueden:",
            "options": [
              "Desarrollar una ley previa",
              "Tipificar delitos, faltas o infracciones administrativas, ni establecer tributos o cánones",
              "Regular la estructura orgánica interna de un ministerio",
              "Fijar criterios de atención al público"
            ],
            "answer": 1,
            "explanation": "El art. 128.2 LPAC consagra la reserva de ley estricta en materia sancionadora y tributaria.",
            "reference": "Art. 128.2 Ley 39/2015",
            "legalArticle": "Art. 128.2 Ley 39/2015",
            "legalText": "Los reglamentos no podrán tipificar delitos, faltas o infracciones administrativas, establecer penas o sanciones, ni tributos o cargas."
          },
          {
            "prompt": "El principio de inderogabilidad singular de los reglamentos (art. 37 Ley 39/2015) significa que:",
            "options": [
              "Un reglamento solo puede derogarse por una ley posterior",
              "Las resoluciones administrativas de carácter particular no pueden vulnerar lo establecido en una disposición general, aunque procedan de órganos de igual o superior jerarquía",
              "Los reglamentos autonómicos prevalecen sobre las leyes estatales",
              "Ningún reglamento puede modificarse en período electoral"
            ],
            "answer": 1,
            "explanation": "El art. 37.1 LPAC prohíbe que actos singulares exceptúen disposiciones reglamentarias generales.",
            "reference": "Art. 37.1 Ley 39/2015",
            "legalArticle": "Art. 37.1 Ley 39/2015",
            "legalText": "Las resoluciones administrativas de carácter particular no podrán vulnerar lo establecido en una disposición de carácter general."
          },
          {
            "prompt": "La potestad reglamentaria originaria atribuida por el artículo 97 de la Constitución corresponde a:",
            "options": [
              "A los Ministros individualmente",
              "Al Gobierno de la Nación",
              "A los Directores Generales de la AGE",
              "Al Consejo de Estado"
            ],
            "answer": 1,
            "explanation": "El art. 97 CE atribuye expresamente al Gobierno la potestad reglamentaria de acuerdo con la Constitución y las leyes.",
            "reference": "Art. 97 CE",
            "legalArticle": "Art. 97 CE",
            "legalText": "El Gobierno ejerce la potestad reglamentaria de acuerdo con la Constitución y las leyes."
          },
          {
            "prompt": "La costumbre en el Derecho Administrativo español tiene valor como fuente:",
            "options": [
              "Idéntico al de una ley orgánica",
              "Muy limitado, únicamente cuando no haya ley o reglamento aplicable y no sea contraria a la moral o al orden público",
              "Pleno en materia de contratos y sanciones",
              "Derogatorio de los reglamentos ministeriales"
            ],
            "answer": 1,
            "explanation": "En Derecho público el principio de legalidad reduce la costumbre a un papel estrictamente subsidiario.",
            "reference": "Art. 1 Código Civil y Derecho Administrativo",
            "legalArticle": "Fuentes del Derecho",
            "legalText": "La costumbre solo regirá en defecto de ley aplicable, siempre que no sea contraria a la moral y resulte probada."
          }
        ]
      },
      {
        "title": "Tema 2. El acto administrativo: concepto, elementos y clases",
        "summary": "Validez, eficacia, presunción de legalidad y motivación (art. 35 Ley 39/2015).",
        "npcName": "Doña Mercedes",
        "npcRole": "Instructora de Procedimiento",
        "npcLines": [
          "Los actos se presumen válidos y producen efectos desde que se dictan.",
          "La motivación es obligatoria en actos que limitan derechos o resuelven recursos.",
          "La ejecutividad permite la ejecución forzosa."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 34 a 39 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Cuáles de los siguientes actos administrativos deben ser motivados obligatoriamente según el art. 35.1 de la Ley 39/2015?",
            "options": [
              "Todos los actos de mero trámite de impulso",
              "Los actos que limiten derechos subjetivos o intereses legítimos, los que resuelvan recursos y los que se separen del criterio de precedentes",
              "Únicamente las sanciones de cuantía superior a 100.000 euros",
              "Ninguno, la motivación es una facultad discrecional potestativa"
            ],
            "answer": 1,
            "explanation": "El art. 35.1 LPAC enumera los actos sujetos a motivación obligatoria con sucinta referencia de hechos y fundamentos.",
            "reference": "Art. 35.1 Ley 39/2015",
            "legalArticle": "Art. 35.1 Ley 39/2015",
            "legalText": "Serán motivados los actos que limiten derechos subjetivos o intereses legítimos, resuelvan recursos y los que se separen del criterio seguido en actuaciones precedentes."
          },
          {
            "prompt": "La presunción de validez y ejecutividad de los actos administrativos (art. 39.1 Ley 39/2015) significa que:",
            "options": [
              "Son válidos para siempre sin posibilidad de recurso judicial",
              "Los actos de las AAPP sujetos al Derecho Administrativo se presumirán válidos y producirán efectos desde la fecha en que se dicten, salvo que en ellos se disponga otra cosa",
              "Solo producen efectos tras sentencia judicial firme",
              "Exigen el visto bueno previo del Defensor del Pueblo"
            ],
            "answer": 1,
            "explanation": "El art. 39.1 LPAC consagra la presunción iuris tantum de validez y eficacia inmediata de los actos.",
            "reference": "Art. 39.1 Ley 39/2015",
            "legalArticle": "Art. 39.1 Ley 39/2015",
            "legalText": "Los actos de las Administraciones Públicas sujetos al Derecho Administrativo se presumirán válidos y producirán efectos desde la fecha en que se dicten."
          },
          {
            "prompt": "¿Cuándo queda demorada la eficacia de un acto administrativo según el art. 39.2 de la Ley 39/2015?",
            "options": [
              "Cuando el funcionario instructor cambie de destino",
              "Cuando así lo exija el contenido del acto o esté supeditada a su notificación, publicación o aprobación superior",
              "Cuando se presente cualquier queja informal ciudadana",
              "Solo durante el mes de agosto"
            ],
            "answer": 1,
            "explanation": "El art. 39.2 LPAC regula las causas legales de eficacia demorada del acto administrativo.",
            "reference": "Art. 39.2 Ley 39/2015",
            "legalArticle": "Art. 39.2 Ley 39/2015",
            "legalText": "La eficacia quedará demorada cuando así lo exija el contenido del acto o esté supeditada a su notificación, publicación o aprobación superior."
          },
          {
            "prompt": "La retroactividad de los actos administrativos (art. 39.3 Ley 39/2015) es admisible con carácter excepcional cuando:",
            "options": [
              "El acto imponga sanciones pecuniarias más graves",
              "Se dicten en sustitución de actos anulados y produzcan efectos favorables al interesado, existiendo los supuestos de hecho en la fecha retroactiva",
              "Lo solicite un tercero opositor",
              "Haya transcurrido más de una década desde el hecho originario"
            ],
            "answer": 1,
            "explanation": "El art. 39.3 LPAC solo permite efectos retroactivos excepcionales si son favorables y no lesionan derechos de terceros.",
            "reference": "Art. 39.3 Ley 39/2015",
            "legalArticle": "Art. 39.3 Ley 39/2015",
            "legalText": "Excepcionalmente podrá otorgarse eficacia retroactiva a los actos cuando se dicten en sustitución de actos anulados y produzcan efectos favorables al interesado."
          }
        ]
      },
      {
        "title": "Tema 3. Invalidez del acto administrativo: nulidad y anulabilidad",
        "summary": "Arts. 47 y 48 Ley 39/2015. Vicios de forma, convalidación y transmisibilidad.",
        "npcName": "Letrado Salgado",
        "npcRole": "Letrado del Consejo de Estado",
        "npcLines": [
          "La nulidad radical es imprescriptible e insubsanable.",
          "La anulabilidad es la regla general para cualquier infracción del ordenamiento.",
          "El defecto de forma solo vicia si genera indefensión material."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 47, 48, 51 y 52 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "¿Cuál de las siguientes causas determina la NULIDAD DE PLENO DERECHO de un acto administrativo (art. 47.1 Ley 39/2015)?",
            "options": [
              "Cualquier infracción leve del ordenamiento jurídico",
              "Los que lesionen los derechos y libertades susceptibles de amparo constitucional o sean dictados por órgano manifiestamente incompetente por razón de la materia o del territorio",
              "La falta de motivación en una propuesta no vinculante",
              "El retraso de 3 días en la emisión de un informe facultativo"
            ],
            "answer": 1,
            "explanation": "El art. 47.1 LPAC fija las causas tasadas de nulidad absoluta de pleno derecho.",
            "reference": "Art. 47.1 Ley 39/2015",
            "legalArticle": "Art. 47.1 Ley 39/2015",
            "legalText": "Los actos de las Administraciones son nulos de pleno derecho en los casos que lesionen derechos y libertades susceptibles de amparo constitucional o sean dictados por órgano manifiestamente incompetente por materia o territorio."
          },
          {
            "prompt": "El defecto de forma en un acto administrativo determina su anulabilidad ÚNICAMENTE cuando (art. 48.2 Ley 39/2015):",
            "options": [
              "Falte el número de registro en el encabezado",
              "El acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a la indefensión de los interesados",
              "No se cite el Boletín Oficial del Estado",
              "El sello institucional no sea en color azul"
            ],
            "answer": 1,
            "explanation": "El art. 48.2 LPAC consagra el principio antiformalista: el defecto de forma solo anula si produce indefensión real.",
            "reference": "Art. 48.2 Ley 39/2015",
            "legalArticle": "Art. 48.2 Ley 39/2015",
            "legalText": "El defecto de forma sólo determinará la anulabilidad cuando el acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a la indefensión de los interesados."
          },
          {
            "prompt": "La convalidación de los actos administrativos (art. 52 Ley 39/2015) es aplicable a:",
            "options": [
              "Los actos nulos de pleno derecho por vulnerar derechos fundamentales",
              "Los actos anulables, subsanando los vicios de que adolezcan",
              "Los actos inexistentes o constitutivos de delito",
              "Las disposiciones de carácter general reglamentarias"
            ],
            "answer": 1,
            "explanation": "El art. 52 LPAC permite convalidar actos anulables, produciendo efectos desde la fecha de convalidación salvo excepciones.",
            "reference": "Art. 52 Ley 39/2015",
            "legalArticle": "Art. 52.1 Ley 39/2015",
            "legalText": "La Administración podrá convalidar los actos anulables, subsanando los vicios de que adolezcan."
          },
          {
            "prompt": "Si el vicio del acto anulable consistiera en incompetencia no determinante de nulidad, la convalidación se realizará por:",
            "options": [
              "El Consejo de Ministros por Real Decreto",
              "El órgano competente cuando sea superior jerárquico del que dictó el acto viciado",
              "El funcionario instructor del expediente",
              "El Defensor del Pueblo"
            ],
            "answer": 1,
            "explanation": "El art. 52.2 LPAC establece que si el vicio es incompetencia jerárquica, convalida el superior competente.",
            "reference": "Art. 52.2 Ley 39/2015",
            "legalArticle": "Art. 52.2 Ley 39/2015",
            "legalText": "Si el vicio consistiera en incompetencia no determinante de nulidad, la convalidación podrá ser realizada por el órgano competente cuando sea superior jerárquico del que dictó el acto."
          }
        ]
      },
      {
        "title": "Tema 4. El procedimiento administrativo común: fases de iniciación e instrucción",
        "summary": "Iniciación de oficio y a solicitud. Alegaciones, prueba, informes y participación de interesados.",
        "npcName": "Instructora Julia",
        "npcRole": "Jefa de Servicio de Tramitación",
        "npcLines": [
          "El procedimiento puede iniciarse de oficio o a solicitud del interesado.",
          "El trámite de audiencia es esencial antes de redactar la propuesta.",
          "Los informes son facultativos y no vinculantes como regla general."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 54 a 83 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "Como regla general en el procedimiento administrativo (art. 80.1 Ley 39/2015), los informes emitidos por otros órganos son:",
            "options": [
              "Preceptivos y vinculantes",
              "Facultativos y no vinculantes",
              "Vinculantes en todo caso para el órgano decisor",
              "Secretos para los interesados"
            ],
            "answer": 1,
            "explanation": "El art. 80.1 LPAC dispone que salvo disposición expresa en contrario, los informes serán facultativos y no vinculantes.",
            "reference": "Art. 80.1 Ley 39/2015",
            "legalArticle": "Art. 80.1 Ley 39/2015",
            "legalText": "Salvo disposición expresa en contrario, los informes serán facultativos y no vinculantes."
          },
          {
            "prompt": "El plazo legal general para emitir los informes en el procedimiento administrativo común (art. 80.2 Ley 39/2015) es de:",
            "options": [
              "5 días hábiles",
              "10 días hábiles",
              "1 mes natural",
              "15 días hábiles"
            ],
            "answer": 1,
            "explanation": "El art. 80.2 LPAC fija un plazo supletorio general de 10 días para la emisión de informes administrativos.",
            "reference": "Art. 80.2 Ley 39/2015",
            "legalArticle": "Art. 80.2 Ley 39/2015",
            "legalText": "Los informes serán emitidos a través de medios electrónicos en el plazo de diez días, salvo que una disposición o el resto de los plazos autorice otro plazo mayor o menor."
          },
          {
            "prompt": "El trámite de audiencia a los interesados (art. 82 Ley 39/2015) se realiza:",
            "options": [
              "Al iniciarse el expediente antes de admitir a trámite la solicitud",
              "Instruidos los procedimientos e inmediatamente antes de redactar la propuesta de resolución, por un plazo no inferior a 10 ni superior a 15 días",
              "Solo en caso de recurso judicial de alzada",
              "Exclusivamente si hay más de 50 interesados comparecidos"
            ],
            "answer": 1,
            "explanation": "El art. 82 LPAC fija el trámite de audiencia previo a la propuesta por plazo de entre 10 y 15 días hábiles.",
            "reference": "Art. 82 Ley 39/2015",
            "legalArticle": "Art. 82.2 Ley 39/2015",
            "legalText": "Los interesados, en un plazo no inferior a diez días ni superior a quince, podrán alegar y presentar los documentos y justificaciones que estimen pertinentes."
          },
          {
            "prompt": "¿Puede prescindirse del trámite de audiencia en el procedimiento administrativo común?",
            "options": [
              "Bajo ningún concepto, su omisión siempre anula el acto",
              "Se podrá prescindir cuando no figuren en el procedimiento ni sean tenidos en cuenta otros hechos ni alegaciones que las aducidas por el interesado",
              "Cuando el procedimiento dure más de 6 meses",
              "A criterio discrecional del instructor sin motivación"
            ],
            "answer": 1,
            "explanation": "El art. 82.4 LPAC permite prescindir de la audiencia si solo constan los hechos alegados por el propio interesado.",
            "reference": "Art. 82.4 Ley 39/2015",
            "legalArticle": "Art. 82.4 Ley 39/2015",
            "legalText": "Se podrá prescindir del trámite de audiencia cuando no figuren en el procedimiento ni sean tenidos en cuenta en la resolución otros hechos ni otras alegaciones y pruebas que las aducidas por el interesado."
          }
        ]
      },
      {
        "title": "Tema 5. Finalización del procedimiento y el silencio administrativo",
        "summary": "Resolución, desistimiento, renuncia y caducidad. Régimen del silencio positivo y negativo (art. 24 LPAC).",
        "npcName": "Letrada Sonsoles",
        "npcRole": "Jefa del Gabinete Técnico",
        "npcLines": [
          "La resolución expresa debe decidir todas las cuestiones planteadas.",
          "La regla general del silencio a solicitud del interesado es estimatoria.",
          "El certificado de silencio se expide en el plazo de 15 días."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 21, 24, 25 y 84 a 95 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "En los procedimientos iniciados a solicitud del interesado, ¿cuál es la regla general del silencio administrativo (art. 24.1 Ley 39/2015)?",
            "options": [
              "El silencio desestimatorio o negativo",
              "El silencio estimatorio o positivo, salvo que una norma con rango de ley o de Derecho de la UE establezca lo contrario",
              "La caducidad automática con archivo del expediente",
              "La suspensión de plazos por 6 meses"
            ],
            "answer": 1,
            "explanation": "El art. 24.1 LPAC consagra el silencio estimatorio como regla general salvo excepciones legales tasadas.",
            "reference": "Art. 24.1 Ley 39/2015",
            "legalArticle": "Art. 24.1 Ley 39/2015",
            "legalText": "En los procedimientos iniciados a solicitud del interesado, el vencimiento del plazo máximo sin haberse notificado resolución expresa legitima al interesado para entenderla estimada por silencio administrativo."
          },
          {
            "prompt": "¿En cuáles de los siguientes supuestos el silencio administrativo es obligatoriamente DESESTIMATORIO según el art. 24.1 de la Ley 39/2015?",
            "options": [
              "Procedimientos de concesión de subvenciones generales",
              "Procedimientos de ejercicio del derecho de petición (art. 29 CE), los que transfieran facultades sobre el dominio público o servicios públicos y los de responsabilidad patrimonial",
              "Solicitudes de acceso a la función pública",
              "Peticiones de copia simple de documentos"
            ],
            "answer": 1,
            "explanation": "El art. 24.1 LPAC lista como excepciones de silencio negativo: derecho de petición, dominio público, actividades con daños al medio ambiente y responsabilidad patrimonial.",
            "reference": "Art. 24.1 Ley 39/2015",
            "legalArticle": "Art. 24.1 Ley 39/2015",
            "legalText": "El silencio tendrá efecto desestimatorio en los procedimientos relativos al ejercicio del derecho de petición, aquellos cuya estimación transfiera facultades relativas al dominio público o al servicio público, y los de responsabilidad patrimonial."
          },
          {
            "prompt": "La estimación por silencio administrativo tiene a todos los efectos la consideración de:",
            "options": [
              "Mera ficción jurídica para interponer recurso contencioso",
              "Acto administrativo finalizador del procedimiento, eficaz desde el vencimiento del plazo máximo",
              "Propuesta no vinculante pendiente de confirmación",
              "Acto provisional sometido a condición suspensiva"
            ],
            "answer": 1,
            "explanation": "El art. 24.2 LPAC otorga al silencio positivo la consideración de verdadero acto administrativo firme.",
            "reference": "Art. 24.2 Ley 39/2015",
            "legalArticle": "Art. 24.2 Ley 39/2015",
            "legalText": "La estimación por silencio administrativo tiene a todos los efectos la consideración de acto administrativo finalizador del procedimiento."
          },
          {
            "prompt": "En los procedimientos iniciados de oficio de los que pudiera derivarse el reconocimiento de derechos (art. 25.1.a Ley 39/2015), el silencio produce:",
            "options": [
              "La caducidad del expediente",
              "Efectos desestimatorios (los interesados pueden entender desestimadas sus pretensiones)",
              "La estimación automática con devengo de intereses",
              "La anulación de pleno derecho"
            ],
            "answer": 1,
            "explanation": "El art. 25.1.a) LPAC dispone que si es un procedimiento de oficio favorable, el silencio es desestimatorio.",
            "reference": "Art. 25.1.a Ley 39/2015",
            "legalArticle": "Art. 25.1.a Ley 39/2015",
            "legalText": "En los procedimientos de los que pudiera derivarse el reconocimiento o constitución de derechos, los interesados podrán entender desestimadas sus pretensiones por silencio administrativo."
          }
        ]
      },
      {
        "title": "Tema 6. La revisión de actos y los recursos administrativos ordinarios",
        "summary": "Revisión de oficio, lesividad, recurso de alzada y recurso potestativo de reposición.",
        "npcName": "Jueza Doña Laura",
        "npcRole": "Magistrada de lo Contencioso",
        "npcLines": [
          "El recurso de alzada se interpone ante el superior jerárquico en el plazo de 1 mes.",
          "La reposición cabe contra actos que agotan la vía administrativa.",
          "La revisión de oficio de actos nulos no tiene límite temporal."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 106 a 126 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10565"
        ],
        "questions": [
          {
            "prompt": "El plazo para interponer el recurso de alzada contra un acto administrativo EXPRESO es de:",
            "options": [
              "10 días hábiles",
              "Un mes",
              "Dos meses",
              "Tres meses"
            ],
            "answer": 1,
            "explanation": "El art. 122.1 LPAC fija un mes de plazo para interponer la alzada contra actos expresos.",
            "reference": "Art. 122.1 Ley 39/2015",
            "legalArticle": "Art. 122.1 Ley 39/2015",
            "legalText": "El plazo para la interposición del recurso de alzada será de un mes, si el acto fuera expreso."
          },
          {
            "prompt": "El recurso potestativo de reposición procede exclusivamente contra:",
            "options": [
              "Cualquier acto de trámite sin cualificar",
              "Los actos administrativos que pongan fin a la vía administrativa",
              "Los actos dictados por órganos que tengan superior jerárquico",
              "Los reglamentos del Consejo de Ministros"
            ],
            "answer": 1,
            "explanation": "El art. 123.1 LPAC establece la reposición contra actos que agotan la vía administrativa ante el mismo órgano que los dictó.",
            "reference": "Art. 123.1 Ley 39/2015",
            "legalArticle": "Art. 123.1 Ley 39/2015",
            "legalText": "Los actos administrativos que pongan fin a la vía administrativa podrán ser recurridos potestativamente en reposición ante el mismo órgano que los hubiera dictado o ser impugnados directamente ante el orden jurisdiccional contencioso-administrativo."
          },
          {
            "prompt": "¿Cuál es el plazo máximo para dictar y notificar la resolución del recurso de alzada (art. 122.2 Ley 39/2015)?",
            "options": [
              "Un mes",
              "Tres meses",
              "Seis meses",
              "Veinte días"
            ],
            "answer": 1,
            "explanation": "El art. 122.2 LPAC establece que el plazo máximo para resolver y notificar la alzada es de tres meses.",
            "reference": "Art. 122.2 Ley 39/2015",
            "legalArticle": "Art. 122.2 Ley 39/2015",
            "legalText": "El plazo máximo para dictar y notificar la resolución será de tres meses. Transcurrido este plazo sin que recaiga resolución, se podrá entender desestimado el recurso."
          },
          {
            "prompt": "La revisión de oficio de los actos nulos de pleno derecho (art. 106.1 Ley 39/2015):",
            "options": [
              "Caduca en el plazo improrrogable de 4 años",
              "Puede incoarse en cualquier momento, de oficio o a solicitud de interesado, previo dictamen favorable del Consejo de Estado u órgano consultivo autonómico",
              "Requiere declaración previa de lesividad para el interés público",
              "Solo puede instarse por la Abogacía del Estado ante el juez ordinario"
            ],
            "answer": 1,
            "explanation": "La acción de nulidad es imprescriptible y exige el dictamen favorable del Consejo de Estado.",
            "reference": "Art. 106.1 Ley 39/2015",
            "legalArticle": "Art. 106.1 Ley 39/2015",
            "legalText": "Las Administraciones Públicas, en cualquier momento, por iniciativa propia o a solicitud de interesado, declararán de oficio la nulidad de los actos nulos, previo dictamen favorable del Consejo de Estado."
          }
        ]
      },
      {
        "title": "Tema 7. Los contratos del sector público: tipología y principios",
        "summary": "Ley 9/2017 (LCSP). Obras, concesión de obras, concesión de servicios, suministros y servicios.",
        "npcName": "Interventor Don Manuel",
        "npcRole": "Vocal de la Junta Consultiva de Contratación",
        "npcLines": [
          "La LCSP transpone las directivas europeas de contratación.",
          "Los principios rectores son libertad de acceso, publicidad y transparencia.",
          "Los contratos menores exigen umbrales económicos estrictos."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 12 a 18 y 118 Ley 9/2017."
        ],
        "boeIds": [
          "BOE-A-2017-12902"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 118 de la Ley 9/2017 (LCSP), se consideran contratos menores los contratos de valor estimado inferior a:",
            "options": [
              "50.000 euros en obras y 18.000 euros en servicios o suministros",
              "40.000 euros en obras y 15.000 euros en contratos de suministro o de servicios",
              "100.000 euros en todos los tipos contractuales",
              "30.000 euros para cualquier contrato financiado con fondos europeos"
            ],
            "answer": 1,
            "explanation": "El art. 118.1 LCSP fija los umbrales de contratos menores en 40.000 € (obras) y 15.000 € (servicios y suministros).",
            "reference": "Art. 118.1 Ley 9/2017",
            "legalArticle": "Art. 118.1 Ley 9/2017",
            "legalText": "Se consideran contratos menores los contratos de valor estimado inferior a 40.000 euros, cuando se trate de contratos de obras, o a 15.000 euros, cuando se trate de contratos de suministro o de servicios."
          },
          {
            "prompt": "El contrato que tiene por objeto la adquisición, el arrendamiento financiero, o el arrendamiento con o sin opción de compra de productos o bienes muebles es un:",
            "options": [
              "Contrato de servicios",
              "Contrato de suministro",
              "Contrato de gestión de servicios públicos",
              "Contrato de colaboración público-privada"
            ],
            "answer": 1,
            "explanation": "El art. 16.1 LCSP define el contrato de suministro como la adquisición o arrendamiento de bienes muebles.",
            "reference": "Art. 16.1 Ley 9/2017",
            "legalArticle": "Art. 16.1 Ley 9/2017",
            "legalText": "Son contratos de suministro los que tienen por objeto la adquisición, el arrendamiento financiero, o el arrendamiento, con o sin opción de compra, de productos o bienes muebles."
          },
          {
            "prompt": "La diferencia fundamental entre el contrato de servicios y la concesión de servicios radica en que:",
            "options": [
              "En la concesión el riesgo operacional se transfiere al concesionario",
              "El contrato de servicios solo dura 3 meses",
              "En la concesión el pago se hace siempre en lingotes de oro",
              "Los servicios no admiten subcontratación"
            ],
            "answer": 0,
            "explanation": "El art. 15 LCSP define la concesión por la transferencia del riesgo operacional derivado de la explotación.",
            "reference": "Art. 15 Ley 9/2017",
            "legalArticle": "Art. 15 LCSP",
            "legalText": "El contrato de concesión de servicios es aquel en cuya virtud el concesionario asume el riesgo operacional derivado de la explotación de los servicios."
          },
          {
            "prompt": "El recurso especial en materia de contratación (art. 44 LCSP) es competente ante el Tribunal Administrativo Central de Recursos Contractuales (TACRC) frente a:",
            "options": [
              "Cualquier contrato menor de papelería de menos de 1.000 euros",
              "Contratos de obras de valor estimado superior a 3.000.000 euros y contratos de suministros o servicios superiores a 100.000 euros",
              "Decisiones discrecionales de nombramiento de personal eventual",
              "Multas impuestas por la Dirección General de Tráfico"
            ],
            "answer": 1,
            "explanation": "El art. 44 LCSP fija los umbrales para el recurso especial: 3 millones en obras y 100.000 € en servicios y suministros.",
            "reference": "Art. 44.1 Ley 9/2017",
            "legalArticle": "Art. 44.1 Ley 9/2017",
            "legalText": "Serán susceptibles de recurso especial los contratos de obras de valor estimado superior a tres millones de euros y de suministro y servicios de valor estimado superior a cien mil euros."
          }
        ]
      },
      {
        "title": "Tema 8. Procedimientos de adjudicación y ejecución de contratos públicos",
        "summary": "Abierto, restringido, licitación con negociación, diálogo competitivo y modificación contractual.",
        "npcName": "Interventor Don Carlos",
        "npcRole": "Jefe del Área de Contratación",
        "npcLines": [
          "El procedimiento abierto y el restringido son los ordinarios generales.",
          "En el abierto cualquier empresario puede presentar una proposición.",
          "La modificación contractual está limitada al 20% en supuestos previstos."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 131, 156 y 203 a 207 Ley 9/2017."
        ],
        "boeIds": [
          "BOE-A-2017-12902"
        ],
        "questions": [
          {
            "prompt": "En el procedimiento abierto de adjudicación de contratos públicos (art. 156 LCSP):",
            "options": [
              "Solo pueden licitar empresas previamente invitadas por el Ministro",
              "Cualquier empresario interesado podrá presentar una proposición, quedando excluida toda negociación de los términos del contrato",
              "Se negocia el precio a la baja mediante subasta secreta",
              "Se adjudica por sorteo ante notario"
            ],
            "answer": 1,
            "explanation": "El procedimiento abierto garantiza la libre concurrencia universal y prohíbe la negociación previa.",
            "reference": "Art. 156 LCSP",
            "legalArticle": "Art. 156 Ley 9/2017",
            "legalText": "En el procedimiento abierto todo empresario interesado podrá presentar una proposición, quedando excluida toda negociación de los términos del contrato con los licitadores."
          },
          {
            "prompt": "La garantía definitiva exigible con carácter general al adjudicatario (art. 107 LCSP) es de un importe del:",
            "options": [
              "2% del presupuesto base de licitación",
              "5% del precio final ofertado, excluido el IVA",
              "10% del valor estimado del contrato",
              "15% retenido en la primera factura"
            ],
            "answer": 1,
            "explanation": "El art. 107.1 LCSP fija el 5% del importe de adjudicación como garantía definitiva ordinaria.",
            "reference": "Art. 107.1 Ley 9/2017",
            "legalArticle": "Art. 107.1 Ley 9/2017",
            "legalText": "Los licitadores que presenten la mejor oferta deberán constituir a disposición del órgano de contratación una garantía de un 5 por ciento del precio final ofertado, excluido el IVA."
          },
          {
            "prompt": "Las modificaciones de los contratos administrativos basadas en circunstancias imprevistas (art. 205 LCSP) no pueden superar:",
            "options": [
              "El 50% del precio inicial del contrato",
              "El 20% del precio inicial del contrato, IVA excluido",
              "El 5% de la fianza depositada",
              "Cualquier cuantía si la autoriza el interventor"
            ],
            "answer": 1,
            "explanation": "El art. 205.2 LCSP limita al 20% las modificaciones no previstas para no alterar la naturaleza global del contrato.",
            "reference": "Art. 205.2 Ley 9/2017",
            "legalArticle": "Art. 205.2 Ley 9/2017",
            "legalText": "La modificación del contrato no podrá superar el 20 por ciento de su precio inicial, IVA excluido, y no podrá alterar las condiciones esenciales de la licitación."
          },
          {
            "prompt": "El pago del precio por la Administración en la ejecución del contrato (art. 198.4 LCSP) debe realizarse dentro de:",
            "options": [
              "Los 30 días siguientes a la fecha de aprobación de las certificaciones de obra o documentos de conformidad",
              "60 días hábiles bancarios",
              "90 días naturales",
              "1 año presupuestario"
            ],
            "answer": 0,
            "explanation": "El art. 198.4 LCSP obliga a la Administración a abonar las facturas en 30 días, devengando intereses de demora si se retrasa.",
            "reference": "Art. 198.4 Ley 9/2017",
            "legalArticle": "Art. 198.4 Ley 9/2017",
            "legalText": "La Administración tendrá la obligación de abonar el precio dentro de los treinta días siguientes a la fecha de aprobación de las certificaciones de obra o de los documentos de conformidad."
          }
        ]
      },
      {
        "title": "Tema 9. La responsabilidad patrimonial de las Administraciones Públicas",
        "summary": "Leyes 39/2015 y 40/2015. Requisitos de la lesión, nexo causal, fuerza mayor y plazo de prescripción.",
        "npcName": "Abogada Doña Carmen",
        "npcRole": "Abogada del Estado en la Audiencia Nacional",
        "npcLines": [
          "El daño debe ser efectivo, evaluable económicamente e individualizado.",
          "La Administración responde por el funcionamiento normal o anormal de los servicios.",
          "El plazo para reclamar prescribe al año de producirse el hecho o secuelas."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 32 a 35 Ley 40/2015 y arts. 67 y 91 Ley 39/2015."
        ],
        "boeIds": [
          "BOE-A-2015-10566"
        ],
        "questions": [
          {
            "prompt": "¿Cuál es el plazo de prescripción del derecho a reclamar la responsabilidad patrimonial a la Administración (art. 67.1 Ley 39/2015)?",
            "options": [
              "6 meses desde que ocurrió el hecho",
              "Un año desde que se produjo el hecho o acto que motive la indemnización o se manifieste su efecto lesivo (o determinación del alcance de secuelas)",
              "Cuatro años conforme al Código Civil",
              "Cinco años improrrogables"
            ],
            "answer": 1,
            "explanation": "El art. 67.1 LPAC fija la prescripción en 1 año computado desde la curación o fijación definitiva de secuelas.",
            "reference": "Art. 67.1 Ley 39/2015",
            "legalArticle": "Art. 67.1 Ley 39/2015",
            "legalText": "El derecho a reclamar prescribirá al año de producido el hecho o el acto que motive la indemnización o se manifieste su efecto lesivo. En caso de daños personales, desde la curación o determinación del alcance de las secuelas."
          },
          {
            "prompt": "Para que proceda la indemnización por responsabilidad patrimonial (art. 32 Ley 40/2015), la lesión debe ser:",
            "options": [
              "Hipotética y calculada sobre beneficios futuros inciertos",
              "Efectiva, evaluable económicamente e individualizada con relación a una persona o grupo de personas, sin el deber jurídico de soportarla",
              "Concebida siempre mediando dolo o culpa gravísima del funcionario",
              "Superior a 10.000 euros en todo caso"
            ],
            "answer": 1,
            "explanation": "La responsabilidad de la Administración es objetiva y exige que el daño sea real, cuantificable e individualizado antijurídico.",
            "reference": "Art. 32.2 Ley 40/2015",
            "legalArticle": "Art. 32.2 Ley 40/2015",
            "legalText": "El daño alegado habrá de ser efectivo, evaluable económicamente e individualizado con relación a una persona o grupo de personas."
          },
          {
            "prompt": "¿Qué causa exime a la Administración del deber de indemnizar en materia de responsabilidad patrimonial?",
            "options": [
              "El funcionamiento normal de los servicios públicos",
              "La fuerza mayor",
              "La falta de presupuesto en el ejercicio en curso",
              "La renuncia previa del contratista"
            ],
            "answer": 1,
            "explanation": "El art. 32.1 Ley 40/2015 exonera a la Administración en supuestos de fuerza mayor inimputable e imprevisible.",
            "reference": "Art. 32.1 Ley 40/2015",
            "legalArticle": "Art. 32.1 Ley 40/2015",
            "legalText": "Los particulares tendrán derecho a ser indemnizados de toda lesión que sufran en sus bienes y derechos, salvo en los casos de fuerza mayor."
          },
          {
            "prompt": "El procedimiento abreviado de responsabilidad patrimonial (art. 96.4 Ley 39/2015) puede tramitarse cuando:",
            "options": [
              "El reclamante sea un cargo electo",
              "Sean inequívocos la relación de causalidad entre el funcionamiento del servicio y la lesión, la valoración del daño y la cuantía indemnizatoria",
              "Lo ordene el Ministro por providencia urgente",
              "La cuantía no exceda de 500 euros"
            ],
            "answer": 1,
            "explanation": "El art. 96.4 LPAC permite resolver en 30 días si el nexo causal y la cuantía son indiscutibles e inequívocos.",
            "reference": "Art. 96.4 Ley 39/2015",
            "legalArticle": "Art. 96.4 Ley 39/2015",
            "legalText": "Se podrá acordar la tramitación simplificada cuando sean inequívocos la relación de causalidad entre el funcionamiento del servicio público y la lesión, así como la valoración del daño y el cálculo de la cuantía de la indemnización."
          }
        ]
      }
    ]
  },
  {
    "number": 5,
    "title": "Administración de Recursos Humanos",
    "ministry": "Ministerio para la Transformación Digital y Función Pública",
    "worldName": "Mundo 5 · Función Pública y Recursos Humanos",
    "description": "Estatuto Básico del Empleado Público (TREBEP), carrera administrativa, provisión, retribuciones, situaciones, incompatibilidades y régimen disciplinario.",
    "theme": "inap",
    "bossName": "Tribunal Calificador de Personal",
    "bossIntro": "¡El TREBEP es la Biblia del gestor civil! ¿Conoces las faltas muy graves, las situaciones administrativas y la Ley 53/1984?",
    "bossStyle": "tribunal",
    "topics": [
      {
        "title": "Tema 1. El personal al servicio de las AAPP y el estatuto del TREBEP",
        "summary": "Ámbito del RDL 5/2015. Clases de personal: funcionarios de carrera, interinos, laborales y eventuales.",
        "npcName": "Don Rodrigo",
        "npcRole": "Jefe de Recursos Humanos de la AGE",
        "npcLines": [
          "El TREBEP distingue funcionarios de carrera, interinos, laborales y eventuales.",
          "Los funcionarios de carrera desempeñan puestos reservados a funciones públicas.",
          "El personal eventual realiza funciones de confianza o asesoramiento especial."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 8 a 12 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 9.2 del TREBEP, el ejercicio de las funciones que impliquen la participación directa o indirecta en el ejercicio de las potestades públicas está reservado exclusivamente a:",
            "options": [
              "Los funcionarios públicos de carrera",
              "El personal laboral fijo de alta dirección",
              "El personal directivo profesional y eventual",
              "Cualquier empleado público previa superación de un curso selectivo"
            ],
            "answer": 0,
            "explanation": "El art. 9.2 TREBEP reserva en exclusiva a los funcionarios públicos el ejercicio de potestades públicas y salvaguardia de intereses generales.",
            "reference": "Art. 9.2 TREBEP",
            "legalArticle": "Art. 9.2 TREBEP",
            "legalText": "El ejercicio de las funciones que impliquen la participación directa o indirecta en el ejercicio de las potestades públicas o en la salvaguardia de los intereses generales del Estado corresponden exclusivamente a los funcionarios públicos."
          },
          {
            "prompt": "El personal eventual (art. 12 TREBEP) se caracteriza porque:",
            "options": [
              "Accede mediante oposición libre con temario oficial",
              "Realiza funciones expresamente calificadas como de confianza o asesoramiento especial, siendo su nombramiento y cese libres",
              "Adquiere la condición de funcionario de carrera a los 3 años",
              "Ocupa puestos permanentes de la relación de puestos de trabajo"
            ],
            "answer": 1,
            "explanation": "El art. 12 TREBEP define al personal eventual como asesor de confianza política con cese automático al cesar la autoridad.",
            "reference": "Art. 12 TREBEP",
            "legalArticle": "Art. 12.1 TREBEP",
            "legalText": "Es personal eventual el que, en virtud de nombramiento y con carácter no permanente, sólo realiza funciones expresamente calificadas como de confianza o asesoramiento especial."
          },
          {
            "prompt": "Tras la reforma de la Ley 20/2021, el nombramiento de personal funcionario interino por vacante (art. 10.1.a TREBEP) no puede exceder de:",
            "options": [
              "Un año improrrogable",
              "Tres años, debiendo ofertarse la plaza en la OPE correspondiente a menos que se amortice",
              "Cinco años con prórroga automática",
              "Indefinidamente hasta que el titular se jubile"
            ],
            "answer": 1,
            "explanation": "El art. 10.4 TREBEP limita a un máximo de tres años la duración de la interinidad por vacante.",
            "reference": "Art. 10.4 TREBEP",
            "legalArticle": "Art. 10.4 TREBEP",
            "legalText": "Las plazas vacantes desempeñadas por personal funcionario interino deberán ser objeto de cobertura mediante cualquiera de los mecanismos de provisión o de movilidad en el plazo máximo de tres años."
          },
          {
            "prompt": "La pérdida de la condición de funcionario de carrera (art. 63 TREBEP) se produce por:",
            "options": [
              "Baja médica prolongada superior a 6 meses",
              "Renuncia, pérdida de la nacionalidad, jubilación total, sanción firme de separación del servicio o inhabilitación absoluta o especial para cargo público",
              "Cambio de domicilio sin autorización previa",
              "Suspensión provisional de funciones en expediente disciplinario"
            ],
            "answer": 1,
            "explanation": "El art. 63 TREBEP enumera de forma cerrada las causas de pérdida de la condición funcionarial.",
            "reference": "Art. 63 TREBEP",
            "legalArticle": "Art. 63 TREBEP",
            "legalText": "Son causas de pérdida de la condición de funcionario de carrera: la renuncia, la pérdida de la nacionalidad, la jubilación total, la sanción de separación del servicio y la inhabilitación absoluta o especial."
          }
        ]
      },
      {
        "title": "Tema 2. La planificación de recursos humanos y la Oferta de Empleo Público",
        "summary": "Planes de ordenación, RPT, Oferta de Empleo Público (art. 70 TREBEP) y tasa de reposición.",
        "npcName": "Subdirectora Irene",
        "npcRole": "Planificadora de la Función Pública",
        "npcLines": [
          "La Oferta de Empleo Público debe ejecutarse en el plazo de 3 años.",
          "La RPT es el instrumento técnico básico de ordenación de puestos.",
          "La tasa de reposición limita las nuevas incorporaciones según bajas."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 69 a 74 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 70.1 del TREBEP, la ejecución de la Oferta de Empleo Público (OPE) debe desarrollarse dentro del plazo improrrogable de:",
            "options": [
              "Un año natural",
              "Dos años",
              "Tres años",
              "Cinco años"
            ],
            "answer": 2,
            "explanation": "El art. 70.1 TREBEP establece que la ejecución de la OPE deberá desarrollarse en el plazo improrrogable de tres años.",
            "reference": "Art. 70.1 TREBEP",
            "legalArticle": "Art. 70.1 TREBEP",
            "legalText": "En todo caso, la ejecución de la oferta de empleo público o instrumento similar deberá desarrollarse dentro del plazo improrrogable de tres años."
          },
          {
            "prompt": "La Relación de Puestos de Trabajo (RPT, art. 74 TREBEP) es pública y debe comprender al menos:",
            "options": [
              "El nombre y apellidos del funcionario que ocupa la plaza y su afiliación sindical",
              "La denominación de los puestos, los grupos de clasificación profesional, los cuerpos o escalas, los sistemas de provisión y las retribuciones complementarias",
              "El historial médico de los trabajadores",
              "El balance financiero de la Dirección General de Costes de Personal"
            ],
            "answer": 1,
            "explanation": "El art. 74 TREBEP fija los contenidos mínimos preceptivos de las relaciones de puestos de trabajo.",
            "reference": "Art. 74 TREBEP",
            "legalArticle": "Art. 74 TREBEP",
            "legalText": "Las Administraciones Públicas estructurarán su organización a través de relaciones de puestos de trabajo que comprenderán la denominación de los puestos, grupos, cuerpos, sistemas de provisión y retribuciones complementarias."
          },
          {
            "prompt": "La tasa de reposición de efectivos fijada en las Leyes de Presupuestos Generales del Estado determina:",
            "options": [
              "El número máximo de jubilaciones voluntarias en un año",
              "El porcentaje máximo de nuevas incorporaciones de personal respecto a las bajas definitivas producidas en el ejercicio anterior",
              "La cuantía de las pagas extraordinarias",
              "El porcentaje de incremento del complemento específico"
            ],
            "answer": 1,
            "explanation": "La tasa de reposición limita la reposición de vacantes para controlar el crecimiento de la plantilla pública.",
            "reference": "Ley de Presupuestos Generales del Estado",
            "legalArticle": "Tasa de Reposición",
            "legalText": "La tasa de reposición fija el límite de plazas de nuevo ingreso en función de las bajas definitivas producidas en el ejercicio anterior."
          },
          {
            "prompt": "En las Ofertas de Empleo Público se reservará un cupo para personas con discapacidad (art. 59 TREBEP) no inferior al:",
            "options": [
              "3 por ciento de las vacantes",
              "7 por ciento de las vacantes, reservando al menos un dos por ciento para personas con discapacidad intelectual",
              "10 por ciento en los cuerpos administrativos exclusivamente",
              "5 por ciento sin distinción de tipo de discapacidad"
            ],
            "answer": 1,
            "explanation": "El art. 59.1 TREBEP fija el 7% de reserva, con al menos el 2% para personas con discapacidad intelectual.",
            "reference": "Art. 59.1 TREBEP",
            "legalArticle": "Art. 59.1 TREBEP",
            "legalText": "En las ofertas de empleo público se reservará un cupo no inferior al siete por ciento de las vacantes para ser cubiertas entre personas con discapacidad, reservando al menos el dos por ciento para discapacidad intelectual."
          }
        ]
      },
      {
        "title": "Tema 3. El acceso al empleo público: principios rectores y procesos selectivos",
        "summary": "Igualdad, mérito, capacidad y publicidad (art. 55 TREBEP). Oposición, concurso-oposición y concurso.",
        "npcName": "Presidenta Dña. Adela",
        "npcRole": "Presidenta del Tribunal Calificador",
        "npcLines": [
          "El acceso se rige por mérito y capacidad.",
          "La oposición es el sistema ordinario para funcionarios.",
          "Los órganos de selección son colegiados e imparciales."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 55 a 62 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "Los sistemas selectivos para funcionarios de carrera según el artículo 61.6 del TREBEP son:",
            "options": [
              "La libre designación y la entrevista personal",
              "La oposición y el concurso-oposición, siendo el concurso un sistema estrictamente excepcional que exige ley habilitante",
              "El sorteo público entre titulados universitarios",
              "La cooptación por el colegio profesional"
            ],
            "answer": 1,
            "explanation": "El art. 61.6 TREBEP establece la oposición y concurso-oposición como ordinarios, reservando el concurso a supuestos excepcionales por ley.",
            "reference": "Art. 61.6 TREBEP",
            "legalArticle": "Art. 61.6 TREBEP",
            "legalText": "Los sistemas selectivos de funcionarios de carrera serán los de oposición y concurso-oposición. Sólo en virtud de ley podrá aplicarse, con carácter excepcional, el sistema de concurso."
          },
          {
            "prompt": "¿Quiénes NO pueden formar parte de los órganos de selección del personal funcionario según el art. 60.2 del TREBEP?",
            "options": [
              "Los funcionarios pertenecientes a cuerpos del mismo o superior nivel de titulación",
              "El personal de elección o de designación política, los funcionarios interinos y el personal eventual",
              "Los catedráticos de universidad",
              "Los vocales propuestos por el Instituto Nacional de Administración Pública"
            ],
            "answer": 1,
            "explanation": "El art. 60.2 TREBEP prohíbe que formen parte de tribunales políticos, interinos o personal eventual para garantizar la imparcialidad.",
            "reference": "Art. 60.2 TREBEP",
            "legalArticle": "Art. 60.2 TREBEP",
            "legalText": "El personal de elección o de designación política, los funcionarios interinos y el personal eventual no podrán formar parte de los órganos de selección."
          },
          {
            "prompt": "En el sistema de concurso-oposición, la fase de concurso (art. 61.3 TREBEP):",
            "options": [
              "Puede determinar por sí sola la superación del proceso sin aprobar la oposición",
              "Consiste en la valoración de méritos, pero no podrá otorgar una puntuación que dispense de la necesidad de superar las pruebas selectivas de la oposición",
              "Pondera obligatoriamente el 80% de la nota final",
              "Es previa y eliminatoria antes de poder examinarse"
            ],
            "answer": 1,
            "explanation": "Los méritos nunca pueden suplir el aprobado en los exámenes eliminatorios de conocimiento de la oposición.",
            "reference": "Art. 61.3 TREBEP",
            "legalArticle": "Art. 61.3 TREBEP",
            "legalText": "En el concurso-oposición, la puntuación obtenida en la fase de concurso no podrá aplicarse para superar los ejercicios de la fase de oposición."
          },
          {
            "prompt": "Los miembros de los órganos de selección deben actuar con:",
            "options": [
              "Obediencia debida a las instrucciones del Ministro convocante",
              "Imparcialidad y profesionalidad, y su composición tenderá a la paridad entre mujeres y hombres",
              "Representación corporativa de los sindicatos con derecho a veto",
              "Discrecionalidad absoluta sin sujeción a las bases de la convocatoria"
            ],
            "answer": 1,
            "explanation": "El art. 60.1 TREBEP consagra la imparcialidad, profesionalidad y presencia equilibrada en los tribunales de oposición.",
            "reference": "Art. 60.1 TREBEP",
            "legalArticle": "Art. 60.1 TREBEP",
            "legalText": "Los órganos de selección serán colegiados y su composición responderá a los principios de imparcialidad y profesionalidad de sus miembros, y se tenderá a la paridad entre mujer y hombre."
          }
        ]
      },
      {
        "title": "Tema 4. La carrera profesional y la provisión de puestos de trabajo",
        "summary": "Carrera horizontal y vertical. Concurso de méritos y libre designación (arts. 78 a 84 TREBEP).",
        "npcName": "Jefe de Servicio Don Álvaro",
        "npcRole": "Responsable de Provisión",
        "npcLines": [
          "El concurso es el sistema general de provisión de puestos.",
          "La libre designación se reserva a puestos de especial responsabilidad.",
          "La carrera horizontal reconoce méritos sin cambiar de puesto."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 78 a 84 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "El procedimiento ordinario y general de provisión de puestos de trabajo del personal funcionario de carrera (art. 79.1 TREBEP) es:",
            "options": [
              "La libre designación por convocatoria pública",
              "El concurso de méritos",
              "La adscripción provisional discrecional",
              "La permuta voluntaria entre compañeros"
            ],
            "answer": 1,
            "explanation": "El art. 79.1 TREBEP establece que el concurso es el sistema normal de provisión de puestos.",
            "reference": "Art. 79.1 TREBEP",
            "legalArticle": "Art. 79.1 TREBEP",
            "legalText": "El concurso, como procedimiento normal de provisión de puestos de trabajo, consistirá en la valoración de los méritos y capacidades por órganos colegiados."
          },
          {
            "prompt": "La provisión de puestos por el sistema de libre designación con convocatoria pública (art. 80.1 TREBEP) se reserva a:",
            "options": [
              "Todos los puestos de nivel 20 hacia arriba",
              "Puestos de especial responsabilidad y confianza, directivos y secretarías de altos cargos señalados en las RPT",
              "Cualquier puesto a propuesta del Subsecretario sin motivación",
              "Puestos interinos en comisión de servicios"
            ],
            "answer": 1,
            "explanation": "El art. 80.1 TREBEP restringe la libre designación a puestos cualificados de confianza y dirección.",
            "reference": "Art. 80.1 TREBEP",
            "legalArticle": "Art. 80.1 TREBEP",
            "legalText": "La libre designación consiste en la apreciación discrecional de la idoneidad para puestos que se determinen en las relaciones de puestos de trabajo en atención a su especial responsabilidad y confianza."
          },
          {
            "prompt": "La carrera profesional horizontal del personal funcionario (art. 16.2.a TREBEP) consiste en:",
            "options": [
              "El ascenso en la estructura de puestos mediante concurso a otra provincia",
              "La progresión de grado, categoría o escalón sin necesidad de cambiar de puesto de trabajo y previa evaluación del desempeño",
              "El paso del Grupo A2 al Grupo A1 por oposición",
              "El cobro de horas extraordinarias en festivos"
            ],
            "answer": 1,
            "explanation": "La carrera horizontal premia la competencia y evaluación sin alterar el puesto desempeñado.",
            "reference": "Art. 16.2.a TREBEP",
            "legalArticle": "Art. 16.2.a TREBEP",
            "legalText": "Carrera horizontal: progresión de grado, categoría, escalón u otros conceptos análogos, sin necesidad de cambiar de puesto de trabajo."
          },
          {
            "prompt": "El cese de los funcionarios nombrados en puestos de libre designación (art. 80.4 TREBEP) es:",
            "options": [
              "Imposible sin expediente disciplinario previo",
              "Discrecional, debiendo motivarse la pérdida de confianza",
              "Competencia exclusiva del Tribunal Supremo",
              "Sancionable con pérdida de la condición de funcionario"
            ],
            "answer": 1,
            "explanation": "El cese es discrecional pero la jurisprudencia exige motivar las razones de pérdida de confianza.",
            "reference": "Art. 80.4 TREBEP",
            "legalArticle": "Art. 80.4 TREBEP",
            "legalText": "Los funcionarios que ocupen puestos por libre designación podrán ser cesados con carácter discrecional."
          }
        ]
      },
      {
        "title": "Tema 5. Situaciones administrativas de los funcionarios públicos",
        "summary": "Servicio activo, servicios especiales, excedencias (voluntaria, cuidado familiares) y suspensión.",
        "npcName": "Inspectora Doña Isabel",
        "npcRole": "Jefa de Situaciones Administrativas",
        "npcLines": [
          "En servicio activo se disfrutan todos los derechos del puesto.",
          "Los servicios especiales computan a efectos de trienios y ascensos.",
          "La excedencia por cuidado de familiares reserva el puesto de trabajo."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 85 a 92 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "¿En qué situación administrativa se declara a un funcionario cuando es elegido Diputado o Senador o nombrado Ministro o Secretario de Estado (art. 87.1 TREBEP)?",
            "options": [
              "Excedencia voluntaria por interés particular",
              "Servicios especiales",
              "Suspensión provisional de funciones",
              "Servicio en otras Administraciones Públicas"
            ],
            "answer": 1,
            "explanation": "El art. 87.1 TREBEP declara en servicios especiales a los parlamentarios y miembros del Gobierno.",
            "reference": "Art. 87.1 TREBEP",
            "legalArticle": "Art. 87.1 TREBEP",
            "legalText": "Los funcionarios de carrera serán declarados en situación de servicios especiales cuando sean designados miembros del Gobierno, o elegidos Diputados o Senadores de las Cortes Generales."
          },
          {
            "prompt": "Durante la situación de servicios especiales (art. 87.2 TREBEP), el funcionario público:",
            "options": [
              "Pierde el derecho a reingresar en su Administración de origen",
              "Percibe las retribuciones del puesto o cargo que desempeñe, computándose el tiempo a efectos de trienios, carrera y derechos pasivos",
              "Sigue cobrando el sueldo base y el complemento de destino de su plaza funcionarial",
              "Pasa a causar baja definitiva en la Seguridad Social"
            ],
            "answer": 1,
            "explanation": "En servicios especiales se percibe la retribución del cargo ocupado, garantizando reserva de plaza y cómputo de trienios.",
            "reference": "Art. 87.2 TREBEP",
            "legalArticle": "Art. 87.2 TREBEP",
            "legalText": "Quienes se encuentren en servicios especiales percibirán las retribuciones del puesto que desempeñen y se les computará el tiempo a efectos de ascensos, trienios y derechos pasivos."
          },
          {
            "prompt": "La excedencia para el cuidado de familiares (art. 89.4 TREBEP) tiene una duración máxima de:",
            "options": [
              "Un año",
              "Tres años para el cuidado de cada hijo y tres años para el cuidado de un familiar hasta el segundo grado que no pueda valerse por sí mismo",
              "Cinco años continuados sin derecho a reingreso",
              "Seis meses prorrogables"
            ],
            "answer": 1,
            "explanation": "El art. 89.4 TREBEP fija hasta tres años para hijos y familiares a cargo hasta segundo grado.",
            "reference": "Art. 89.4 TREBEP",
            "legalArticle": "Art. 89.4 TREBEP",
            "legalText": "Los funcionarios tendrán derecho a un período de excedencia de duración no superior a tres años para atender al cuidado de cada hijo o de un familiar hasta el segundo grado."
          },
          {
            "prompt": "Para poder solicitar la excedencia voluntaria por interés particular (art. 89.2 TREBEP) se exige haber prestado servicios efectivos durante:",
            "options": [
              "Al menos 6 meses consecutivos",
              "Un periodo mínimo de cinco años inmediatamente anteriores",
              "Diez años en el mismo ministerio",
              "No se exige ningún tiempo mínimo de servicio"
            ],
            "answer": 1,
            "explanation": "El art. 89.2 TREBEP exige haber prestado servicios efectivos durante un periodo mínimo de 5 años previos.",
            "reference": "Art. 89.2 TREBEP",
            "legalArticle": "Art. 89.2 TREBEP",
            "legalText": "La concesión de excedencia voluntaria por interés particular estará subordinada a las necesidades del servicio y requerirá haber prestado servicios efectivos durante un periodo mínimo de cinco años."
          }
        ]
      },
      {
        "title": "Tema 6. Derechos, deberes y código de conducta del empleado público",
        "summary": "Principios éticos y de conducta (arts. 52 a 54 TREBEP). Jornada, permisos, vacaciones y conciliación.",
        "npcName": "Profesor Méndez",
        "npcRole": "Tutor de Ética Pública",
        "npcLines": [
          "El Código de Conducta contiene principios éticos y de conducta.",
          "Los funcionarios tienen derecho a vacaciones retribuidas de 22 días hábiles.",
          "El deber de secreto profesional perdura tras el cese."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 52 a 54 y arts. 48 a 50 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "Las vacaciones anuales retribuidas de los empleados públicos según el art. 50 del TREBEP son de al menos:",
            "options": [
              "15 días naturales",
              "Veintidós días hábiles por año completo de servicios, o de los días que correspondan proporcionalmente si el tiempo es menor",
              "Treinta días hábiles sin contar festivos",
              "Un mes natural ininterrumpido en agosto obligatoriamente"
            ],
            "answer": 1,
            "explanation": "El art. 50 TREBEP fija 22 días hábiles de vacaciones anuales mínimas garantizadas.",
            "reference": "Art. 50 TREBEP",
            "legalArticle": "Art. 50 TREBEP",
            "legalText": "Los empleados públicos tendrán derecho a disfrutar de las vacaciones anuales retribuidas de, al menos, veintidós días hábiles por año completo de servicios."
          },
          {
            "prompt": "El permiso por asuntos particulares ('moscosos', art. 48.k TREBEP) confiere a los funcionarios cada año natural:",
            "options": [
              "Dos días",
              "Seis días al año sin necesidad de justificación médica",
              "Diez días hábiles acumulables",
              "Quince días no retribuidos"
            ],
            "answer": 1,
            "explanation": "El art. 48.k) TREBEP reconoce seis días por asuntos particulares por año completo de servicio.",
            "reference": "Art. 48.k TREBEP",
            "legalArticle": "Art. 48.k TREBEP",
            "legalText": "Por asuntos particulares, seis días al año."
          },
          {
            "prompt": "Los principios de conducta del artículo 54 del TREBEP obligan a los empleados públicos a:",
            "options": [
              "Aceptar regalos y dádivas de cortesía de empresas contratistas",
              "Tratar con atención y respeto a los ciudadanos y desempeñar con diligencia las tareas asignadas resolviendo en plazo",
              "Revelar información confidencial a los medios de comunicación",
              "Afiliarse obligatoriamente a un sindicato representativo"
            ],
            "answer": 1,
            "explanation": "El art. 54 TREBEP establece los principios de conducta: diligencia, trato respetuoso y resolución en plazo.",
            "reference": "Art. 54 TREBEP",
            "legalArticle": "Art. 54 TREBEP",
            "legalText": "Tratarán con atención y respeto a los ciudadanos, a sus superiores y a los restantes empleados públicos, desempeñando con diligencia las tareas que tengan asignadas."
          },
          {
            "prompt": "Respecto al uso de los recursos públicos, el Código de Conducta del TREBEP prohíbe:",
            "options": [
              "El teletrabajo con equipos de la Administración",
              "Utilizar los recursos y bienes públicos para fines particulares y personales",
              "Compartir impresoras entre diferentes departamentos",
              "Pedir dietas de desplazamiento justificado"
            ],
            "answer": 1,
            "explanation": "El art. 54.7 TREBEP prohíbe estrictamente destinar recursos públicos al uso propio o de allegados.",
            "reference": "Art. 54.7 TREBEP",
            "legalArticle": "Art. 54.7 TREBEP",
            "legalText": "Administrarán los recursos y bienes públicos con austeridad y no utilizarán los mismos en provecho propio o de personas allegadas."
          }
        ]
      },
      {
        "title": "Tema 7. El sistema retributivo de los funcionarios y derechos económicos",
        "summary": "Retribuciones básicas (sueldo y trienios) y complementarias (destino y específico). Pagas extraordinarias.",
        "npcName": "Interventor Don Pedro",
        "npcRole": "Jefe de Nóminas y Retribuciones",
        "npcLines": [
          "Las retribuciones básicas son fijadas en la Ley de Presupuestos.",
          "El sueldo se asigna según el Subgrupo de titulación.",
          "El complemento específico retribuye la dificultad y responsabilidad del puesto."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 21 a 29 TREBEP y Ley de Presupuestos."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 22.2 del TREBEP, son RETRIBUCIONES BÁSICAS del personal funcionario de carrera exclusivamente:",
            "options": [
              "El complemento de destino y el complemento de productividad",
              "El sueldo asignado a cada Subgrupo o Grupo de clasificación profesional y los trienios",
              "El complemento específico y las gratificaciones por servicios extraordinarios",
              "Las dietas y gastos de kilometraje"
            ],
            "answer": 1,
            "explanation": "El art. 22.2 TREBEP define las retribuciones básicas como el sueldo y los trienios (más componentes básicos de pagas extras).",
            "reference": "Art. 22.2 TREBEP",
            "legalArticle": "Art. 22.2 TREBEP",
            "legalText": "Son retribuciones básicas el sueldo asignado a cada Subgrupo o Grupo de clasificación profesional y los trienios, consistentes en una cantidad igual para cada Subgrupo por cada tres años de servicio."
          },
          {
            "prompt": "El complemento de destino (art. 24.a TREBEP) retribuye:",
            "options": [
              "El rendimiento o dedicación extraordinaria del funcionario",
              "La progresión alcanzada por el funcionario dentro del sistema de carrera administrativa y el nivel del puesto que desempeñe",
              "La especial dificultad técnica, penosidad o peligro del puesto",
              "Los servicios extraordinarios prestados fuera de la jornada normal"
            ],
            "answer": 1,
            "explanation": "El complemento de destino está vinculado al nivel del puesto asignado en la RPT.",
            "reference": "Art. 24.a TREBEP",
            "legalArticle": "Art. 24.a TREBEP",
            "legalText": "El complemento de destino retribuirá la progresión alcanzada por el funcionario dentro del sistema de carrera administrativa y las condiciones del puesto."
          },
          {
            "prompt": "El complemento específico (art. 24.b TREBEP) está destinado a retribuir:",
            "options": [
              "La antigüedad acumulada por trienios",
              "La especial dificultad técnica, dedicación, responsabilidad, incompatibilidad, peligrosidad o penosidad del puesto",
              "El desplazamiento diario de la vivienda al trabajo",
              "La superación de cursos voluntarios de idiomas"
            ],
            "answer": 1,
            "explanation": "El complemento específico retribuye las condiciones singulares de dificultad, dedicación y responsabilidad del puesto.",
            "reference": "Art. 24.b TREBEP",
            "legalArticle": "Art. 24.b TREBEP",
            "legalText": "El complemento específico está destinado a retribuir las condiciones particulares de algunos puestos en atención a su especial dificultad técnica, dedicación, responsabilidad, incompatibilidad, peligrosidad o penosidad."
          },
          {
            "prompt": "Las pagas extraordinarias de los funcionarios públicos (art. 22.4 TREBEP):",
            "options": [
              "Se abonan una sola vez al año en Navidad",
              "Serán dos al año, cada una por el importe de una mensualidad de retribuciones básicas y de la totalidad de las retribuciones complementarias (salvo productividad y gratificaciones)",
              "Dependen exclusivamente de que el Estado alcance superávit presupuestario",
              "Solo las cobran los funcionarios del Grupo A1"
            ],
            "answer": 1,
            "explanation": "El art. 22.4 TREBEP garantiza dos pagas extras al año en los meses de junio y diciembre.",
            "reference": "Art. 22.4 TREBEP",
            "legalArticle": "Art. 22.4 TREBEP",
            "legalText": "Las pagas extraordinarias serán dos al año, cada una por el importe de una mensualidad de retribuciones básicas y de la totalidad de las retribuciones complementarias."
          }
        ]
      },
      {
        "title": "Tema 8. El régimen de incompatibilidades del personal público",
        "summary": "Ley 53/1984. Principio de dedicación a un solo puesto, actividades públicas y privadas prohibidas y autorizadas.",
        "npcName": "Inspectora Doña Gloria",
        "npcRole": "Instructora de Incompatibilidades",
        "npcLines": [
          "El principio general es la dedicación a un solo puesto en el sector público.",
          "Está prohibido un segundo puesto retribuido en el sector público.",
          "Las actividades privadas exigen reconocimiento previo de compatibilidad."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 1 a 19 Ley 53/1984."
        ],
        "boeIds": [
          "BOE-A-1984-28229"
        ],
        "questions": [
          {
            "prompt": "El principio general establecido en el artículo 1.1 de la Ley 53/1984 de Incompatibilidades es:",
            "options": [
              "La total libertad de pluriempleo en empresas del sector",
              "El desempeño de la función pública será incompatible con el ejercicio de cualquier cargo, profesión o actividad que impida o menoscabe el estricto cumplimiento de sus deberes",
              "La compatibilidad automática sin necesidad de comunicación",
              "La prohibición de dar conferencias docentes retribuidas"
            ],
            "answer": 1,
            "explanation": "El art. 1.1 Ley 53/1984 consagra la incompatibilidad de actividades que menoscaben la imparcialidad del servicio público.",
            "reference": "Art. 1.1 Ley 53/1984",
            "legalArticle": "Art. 1.1 Ley 53/1984",
            "legalText": "El personal comprendido en el ámbito de aplicación de esta Ley no podrá compatibilizar sus actividades con el desempeño de un segundo puesto de trabajo, cargo o actividad en el sector público."
          },
          {
            "prompt": "El ejercicio de actividades privadas por parte de un empleado público (art. 14 Ley 53/1984) requiere:",
            "options": [
              "Simple notificación informal al compañero de mesa",
              "El previo y expreso reconocimiento de compatibilidad, que no podrá concederse si la actividad se relaciona con asuntos de los que conozca en su puesto",
              "La autorización de la Agencia Tributaria",
              "Ningún trámite si se realiza en fin de semana"
            ],
            "answer": 1,
            "explanation": "El art. 14 Ley 53/1984 exige resolución expresa y previa de compatibilidad antes de iniciar la actividad privada.",
            "reference": "Art. 14 Ley 53/1984",
            "legalArticle": "Art. 14 Ley 53/1984",
            "legalText": "El ejercicio de actividades profesionales, laborales, mercantiles o industriales fuera de las Administraciones Públicas requerirá el previo reconocimiento de compatibilidad."
          },
          {
            "prompt": "¿Cuáles de las siguientes actividades se hallan EXCEPTUADAS del régimen de incompatibilidades (art. 19 Ley 53/1984)?",
            "options": [
              "La gerencia de una empresa constructora adjudicataria de obras del propio ministerio",
              "La producción y creación literaria, artística, científica y técnica, las publicaciones y la colaboración en medios de difusión",
              "El asesoramiento jurídico retribuido a empresas licitadoras",
              "El ejercicio de la abogacía frente a la Administración donde trabaja"
            ],
            "answer": 1,
            "explanation": "El art. 19 Ley 53/1984 exceptúa la creación cultural, conferencias y participación en tribunales de examen.",
            "reference": "Art. 19 Ley 53/1984",
            "legalArticle": "Art. 19 Ley 53/1984",
            "legalText": "Quedan exceptuadas del régimen de incompatibilidades: a) La producción y creación literaria, artística, científica y técnica y las publicaciones. b) La participación en coloquios y programas en medios de comunicación."
          },
          {
            "prompt": "El incumplimiento de las normas sobre incompatibilidades tiene la consideración disciplinaria (art. 95.2.n TREBEP) de:",
            "options": [
              "Falta leve subsanable",
              "Falta muy grave sancionable con separación del servicio o suspensión de funciones",
              "Mera falta de puntualidad",
              "Causa de condecoración ministerial"
            ],
            "answer": 1,
            "explanation": "El art. 95.2.n) TREBEP califica de falta muy grave el incumplimiento de la normativa sobre incompatibilidades.",
            "reference": "Art. 95.2.n TREBEP",
            "legalArticle": "Art. 95.2.n TREBEP",
            "legalText": "Son faltas muy graves: El incumplimiento de las normas sobre incompatibilidades cuando dé lugar a situaciones de incompatibilidad."
          }
        ]
      },
      {
        "title": "Tema 9. El régimen disciplinario de los funcionarios públicos",
        "summary": "Faltas muy graves, graves y leves (art. 95 TREBEP). Sanciones, procedimiento y prescripción.",
        "npcName": "Instructor Don Gabriel",
        "npcRole": "Instructor de Expedientes Disciplinarios",
        "npcLines": [
          "Las faltas se clasifican en muy graves, graves y leves.",
          "Las muy graves prescriben a los 3 años y las sanciones a los 3 años.",
          "La separación del servicio tiene carácter definitivo."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: Arts. 93 a 98 TREBEP."
        ],
        "boeIds": [
          "BOE-A-2015-11719"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 97 del TREBEP, las faltas disciplinarias MUY GRAVES prescriben:",
            "options": [
              "A los 6 meses",
              "A los 3 años",
              "A los 2 años",
              "Al año de haberse cometido"
            ],
            "answer": 1,
            "explanation": "El art. 97.1 TREBEP fija la prescripción en 3 años para faltas muy graves, 2 años para graves y 6 meses para leves.",
            "reference": "Art. 97.1 TREBEP",
            "legalArticle": "Art. 97.1 TREBEP",
            "legalText": "Las infracciones muy graves prescribirán a los 3 años, las graves a los 2 años y las leves a los 6 meses."
          },
          {
            "prompt": "La sanción de suspensión firme de funciones por falta muy grave (art. 96.1.c TREBEP) tendrá una duración máxima de:",
            "options": [
              "Un año",
              "Seis años",
              "Dos años",
              "Tres meses"
            ],
            "answer": 1,
            "explanation": "El art. 96.1.c) TREBEP establece que la suspensión firme de funciones no podrá exceder de 6 años.",
            "reference": "Art. 96.1.c TREBEP",
            "legalArticle": "Art. 96.1.c TREBEP",
            "legalText": "Suspensión firme de funciones, o de empleo y sueldo en el caso del personal laboral, que no podrá exceder de seis años."
          },
          {
            "prompt": "Durante la tramitación de un expediente disciplinario, la suspensión provisional de funciones (art. 98.3 TREBEP) no podrá exceder de:",
            "options": [
              "Un mes",
              "Seis meses, salvo en caso de paralización del procedimiento imputable al interesado",
              "Dos años coincidentes con la instrucción",
              "15 días hábiles"
            ],
            "answer": 1,
            "explanation": "El art. 98.3 TREBEP limita la medida cautelar de suspensión provisional a un máximo de 6 meses.",
            "reference": "Art. 98.3 TREBEP",
            "legalArticle": "Art. 98.3 TREBEP",
            "legalText": "La suspensión provisional como medida cautelar en la tramitación de un expediente disciplinario no podrá exceder de 6 meses, salvo en caso de paralización del procedimiento imputable al interesado."
          },
          {
            "prompt": "¿Cuál de las siguientes conductas está tipificada taxativamente como FALTA MUY GRAVE en el art. 95.2 del TREBEP?",
            "options": [
              "La falta de asistencia injustificada durante un solo día",
              "El acoso laboral, el acoso sexual y el acoso por razón de origen racial, religión, discapacidad o sexo",
              "El retraso reiterado en el horario de entrada de menos de 10 minutos",
              "El extravío involuntario de una grapadora de oficina"
            ],
            "answer": 1,
            "explanation": "El art. 95.2.b) TREBEP tipifica expresamente cualquier forma de acoso como falta muy grave.",
            "reference": "Art. 95.2.b TREBEP",
            "legalArticle": "Art. 95.2.b TREBEP",
            "legalText": "Son faltas muy graves: El acoso moral, sexual y por razón de sexo y el acoso por razón de origen racial o étnico, religión o convicciones, discapacidad, edad u orientación sexual."
          }
        ]
      },
      {
        "title": "Tema 10. La Seguridad Social de los funcionarios: Régimen General y Clases Pasivas",
        "summary": "MUFACE, Clases Pasivas (RDL 670/1987) e integración de nuevos funcionarios en el Régimen General.",
        "npcName": "Inspectora Doña Elena",
        "npcRole": "Directora Provincial de MUFACE",
        "npcLines": [
          "Los funcionarios ingresados a partir del 1 de enero de 2011 están en el Régimen General.",
          "MUFACE sigue prestando la asistencia sanitaria y farmacéutica.",
          "Clases Pasivas gestiona las pensiones del personal anterior a 2011."
        ],
        "tipName": "Preparador INAP",
        "tipRole": "Tutor GACE",
        "tipLines": [
          "Clave de examen: RDL 13/2010 y RDL 4/2000 MUFACE."
        ],
        "boeIds": [
          "BOE-A-2015-11724"
        ],
        "questions": [
          {
            "prompt": "Los funcionarios de carrera de la AGE ingresados a partir del 1 de enero de 2011 (RDL 13/2010) quedan obligatoriamente integrados a efectos de pensiones en:",
            "options": [
              "El Régimen Especial de Clases Pasivas del Estado",
              "El Régimen General de la Seguridad Social",
              "Un plan de pensiones privado obligatorio",
              "La Mutualidad General Judicial (MUGEJU)"
            ],
            "answer": 1,
            "explanation": "El RDL 13/2010 integró a todos los nuevos funcionarios a partir del 01/01/2011 en el Régimen General a efectos de pensiones.",
            "reference": "RDL 13/2010",
            "legalArticle": "Art. 20 RDL 13/2010",
            "legalText": "El personal que ingrese a partir del 1 de enero de 2011 en los Cuerpos de funcionarios de la AGE quedará integrado a efectos de pensiones en el Régimen General de la Seguridad Social."
          },
          {
            "prompt": "La Mutualidad General de Funcionarios Civiles del Estado (MUFACE) cubre para sus mutualistas:",
            "options": [
              "Solo las pensiones de jubilación",
              "La asistencia sanitaria, farmacéutica y prestaciones sociales complementarias (subsidio de incapacidad temporal, etc.)",
              "Las prestaciones por desempleo",
              "Los seguros de responsabilidad civil obligatorios de automóviles"
            ],
            "answer": 1,
            "explanation": "MUFACE gestiona el mutualismo administrativo (sanidad y subsidios de IT) mientras la Seguridad Social gestiona la pensión.",
            "reference": "RDL 4/2000 (Ley sobre Seguridad Social de los Funcionarios)",
            "legalArticle": "Art. 12 RDL 4/2000",
            "legalText": "El Régimen del Mutualismo Administrativo comprende la asistencia sanitaria y farmacéutica, así como las prestaciones económicas derivadas de incapacidad temporal."
          },
          {
            "prompt": "En el Régimen de Clases Pasivas del Estado, la pensión de jubilación forzosa de un funcionario se calcula en función de:",
            "options": [
              "Las últimas 24 nóminas reales percibidas",
              "El haber regulador del Cuerpo o Escala y los años de servicios efectivos prestados al Estado",
              "El valor medio del IBEX 35 en el año de cese",
              "Un porcentaje fijo idéntico para todos los empleados de 1.000 euros"
            ],
            "answer": 1,
            "explanation": "En Clases Pasivas la pensión resulta de aplicar el porcentaje de años de servicio al haber regulador fijado en los PGE.",
            "reference": "RDL 670/1987 (Texto Refundido Clases Pasivas)",
            "legalArticle": "Art. 31 RDL 670/1987",
            "legalText": "La cuantía de las pensiones de jubilación se determinará aplicando al haber regulador que corresponda el porcentaje según el número de años de servicio efectivo al Estado."
          },
          {
            "prompt": "La edad legal de jubilación forzosa en el Régimen de Clases Pasivas del Estado (art. 67.3 TREBEP) se declara de oficio al cumplir:",
            "options": [
              "Los 60 años",
              "Los 65 años de edad, pudiendo solicitar la prolongación de la permanencia en el servicio activo como máximo hasta los 70 años",
              "Los 67 años sin posibilidad de prórroga",
              "Los 55 años para funcionarios con más de 30 años de servicio"
            ],
            "answer": 1,
            "explanation": "El art. 67.3 TREBEP fija la jubilación forzosa a los 65 años, permitiendo prolongar hasta los 70 años.",
            "reference": "Art. 67.3 TREBEP",
            "legalArticle": "Art. 67.3 TREBEP",
            "legalText": "La jubilación forzosa se declarará de oficio al cumplir el funcionario los 65 años de edad. No obstante, se podrá solicitar la prolongación de la permanencia en el servicio activo como máximo hasta que se cumplan setenta años."
          }
        ]
      }
    ]
  },
  {
    "number": 6,
    "title": "Gestión Financiera y Seguridad Social",
    "ministry": "Ministerio de Hacienda y Función Pública",
    "worldName": "Mundo 6 · La Real Casa de la Moneda y Hacienda",
    "description": "Ley General Presupuestaria (LGP 47/2003), ciclo presupuestario, fases del gasto ADOP, subvenciones (LGS 38/2003), control IGAE y nóminas.",
    "theme": "hacienda",
    "bossName": "Gran Interventor",
    "bossIntro": "¡Ni un céntimo sale del Tesoro sin crédito adecuado y fiscalización previa! ¿Superarás las fases contables ADOP?",
    "bossStyle": "interventor",
    "topics": [
      {
        "title": "Tema 1. El presupuesto del Estado y la Ley de Estabilidad Presupuestaria",
        "summary": "Principios presupuestarios en la CE y la Ley 47/2003 (LGP). La Ley Orgánica 2/2012 de Estabilidad Presupuestaria y Sostenibilidad Financiera.",
        "npcName": "Don Aurelio",
        "npcRole": "Interventor Delegado de Hacienda",
        "npcLines": [
          "El principio de estabilidad presupuestaria vincula a todas las Administraciones Públicas.",
          "La Ley 47/2003 (LGP) regula el régimen presupuestario y económico-financiero del sector público estatal.",
          "La regla de gasto limita la variación del gasto computable al tipo de referencia del PIB."
        ],
        "tipName": "Preparadora Financiera",
        "tipRole": "Técnica de Auditoría",
        "tipLines": [
          "Pregunta clásica de examen: arts. 26 a 31 LGP y arts. 11 a 13 LO 2/2012."
        ],
        "boeIds": [
          "BOE-A-2003-21614",
          "BOE-A-2012-5730"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 135 de la Constitución y la LO 2/2012, el principio de estabilidad presupuestaria de las Administraciones Públicas se define como una situación de:",
            "options": [
              "Equilibrio o superávit estructural de las cuentas públicas",
              "Déficit moderado siempre que no supere el 5% del PIB",
              "Gasto público expansivo acorde con los ciclos económicos",
              "Endeudamiento ilimitado destinado a inversiones de capital"
            ],
            "answer": 0,
            "explanation": "El art. 3 de la LO 2/2012 define la estabilidad presupuestaria como la situación de equilibrio o superávit estructural.",
            "reference": "Art. 3 LO 2/2012",
            "legalArticle": "Art. 3 LO 2/2012",
            "legalText": "La elaboración, aprobación y ejecución de los presupuestos y demás actuaciones que afecten a los gastos o ingresos de las Administraciones Públicas se someterá al principio de estabilidad presupuestaria, entendida como equilibrio o superávit estructural."
          },
          {
            "prompt": "Conforme a la Ley 47/2003 (LGP), el principio de no afectación de los ingresos implica que:",
            "options": [
              "Los recursos de la Hacienda Pública estatal se destinan a financiar la totalidad de los gastos, sin afectación a fines concretos salvo ley expresa",
              "Cada ministerio puede retener los ingresos derivados de sus tasas para financiar sus propios gastos",
              "Los ingresos por sanciones de tráfico quedan afectados automáticamente a la construcción de carreteras",
              "No se pueden recaudar tributos que no figuren en los Presupuestos Generales del Estado"
            ],
            "answer": 0,
            "explanation": "El art. 27.3 LGP consagra que los recursos del Estado se destinan a satisfacer el conjunto de sus obligaciones, salvo afectación establecida por ley.",
            "reference": "Art. 27.3 LGP",
            "legalArticle": "Art. 27.3 Ley 47/2003",
            "legalText": "Los recursos del Estado, los de cada uno de sus organismos autónomos y los de las entidades integrantes del sector público estatal con presupuesto limitativo se destinarán a satisfacer el conjunto de sus respectivas obligaciones, salvo que por ley se establezca su afectación a fines determinados."
          },
          {
            "prompt": "¿Qué establece el principio de especialidad cualitativa regulado en el artículo 42 de la LGP?",
            "options": [
              "Los créditos para gastos se destinarán exclusivamente a la finalidad específica para la que hayan sido autorizados",
              "Los créditos solo pueden ejecutarse en el ejercicio presupuestario en que fueron aprobados",
              "No podrán adquirirse compromisos de gasto por cuantía superior al importe de los créditos autorizados",
              "Los gastos plurianuales deben ajustarse a porcentajes fijos en ejercicios futuros"
            ],
            "answer": 0,
            "explanation": "La especialidad cualitativa (art. 42 LGP) obliga a destinar los créditos únicamente al fin específico para el que fueron autorizados en los presupuestos.",
            "reference": "Art. 42 LGP",
            "legalArticle": "Art. 42 Ley 47/2003",
            "legalText": "Los créditos para gastos se destinarán exclusivamente a la finalidad específica para la que hayan sido autorizados por la Ley de Presupuestos Generales del Estado o por las modificaciones realizadas conforme a esta ley."
          },
          {
            "prompt": "El principio de especialidad temporal de los créditos presupuestarios (art. 49 LGP) determina que:",
            "options": [
              "Con cargo a los créditos de cada presupuesto sólo podrán contraerse obligaciones derivadas de gastos realizados en el año natural del propio ejercicio",
              "Los créditos no gastados el 31 de diciembre se trasladan automáticamente al ejercicio posterior",
              "Las facturas pendientes pueden imputarse al ejercicio siguiente sin limitación alguna",
              "Los presupuestos tienen una vigencia obligatoria de cuatro años prorrogables"
            ],
            "answer": 0,
            "explanation": "El art. 49 LGP establece que con cargo a los créditos del ejercicio solo pueden contraerse obligaciones de gastos realizados en el año natural del presupuesto.",
            "reference": "Art. 49.1 LGP",
            "legalArticle": "Art. 49.1 Ley 47/2003",
            "legalText": "Con cargo a los créditos del estado de gastos de cada presupuesto sólo podrán contraerse obligaciones derivadas de adquisiciones, obras, servicios y demás prestaciones o gastos en general que se realicen en el año natural del propio ejercicio presupuestario."
          }
        ]
      },
      {
        "title": "Tema 2. El ciclo presupuestario y las Leyes anuales de PGE",
        "summary": "Estructura de los Presupuestos Generales del Estado. Fases de elaboración, aprobación parlamentaria y régimen de prórroga presupuestaria.",
        "npcName": "Doña Beatriz",
        "npcRole": "Directora General de Presupuestos",
        "npcLines": [
          "El Gobierno debe remitir el proyecto de PGE al Congreso antes del 1 de octubre.",
          "Si el 1 de enero no está aprobada la nueva ley, se prorrogan automáticamente los del ejercicio anterior.",
          "La estructura presupuestaria clasifica los gastos por programas, económica y orgánica."
        ],
        "tipName": "Letrado de Presupuestos",
        "tipRole": "Asesor de la Comisión de Presupuestos",
        "tipLines": [
          "Recuerda la fecha límite constitucional del art. 134.3 CE: al menos tres meses antes de la expiración de los del año anterior."
        ],
        "boeIds": [
          "BOE-A-2003-21614"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 134.3 de la Constitución, el Gobierno debe presentar el proyecto de Presupuestos Generales del Estado ante el Congreso de los Diputados al menos:",
            "options": [
              "Tres meses antes de la expiración de los del año anterior (antes del 1 de octubre)",
              "Dos meses antes de finalizar el año (antes del 1 de noviembre)",
              "Seis meses antes de iniciar el ejercicio",
              "Cuatro meses antes de expirar el ejercicio previo"
            ],
            "answer": 0,
            "explanation": "El art. 134.3 CE fija la fecha límite en al menos tres meses antes de finalizar el ejercicio anterior, lo que equivale al 1 de octubre.",
            "reference": "Art. 134.3 CE",
            "legalArticle": "Art. 134.3 CE",
            "legalText": "El Gobierno deberá presentar ante el Congreso de los Diputados los Presupuestos Generales del Estado al menos tres meses antes de la expiración de los del año anterior."
          },
          {
            "prompt": "Si la Ley de Presupuestos Generales del Estado no se aprueba antes del primer día del ejercicio económico correspondiente:",
            "options": [
              "Se consideran automáticamente prorrogados los presupuestos del ejercicio anterior hasta la aprobación de los nuevos",
              "El Estado debe paralizar todos sus pagos y contrataciones hasta que se apruebe la ley",
              "El Gobierno queda disuelto y se convocan elecciones generales inmediatas",
              "Se prorrogan únicamente los créditos de gastos de personal y deuda pública"
            ],
            "answer": 0,
            "explanation": "El art. 134.4 CE y art. 38 LGP prevén la prórroga automática de los presupuestos del año anterior hasta que se aprueben los nuevos.",
            "reference": "Art. 134.4 CE y Art. 38 LGP",
            "legalArticle": "Art. 134.4 CE",
            "legalText": "Si la Ley de Presupuestos no se aprobara antes del primer día del ejercicio económico correspondiente, se considerarán automáticamente prorrogados los Presupuestos del ejercicio anterior hasta la aprobación de los nuevos."
          },
          {
            "prompt": "En la clasificación económica del estado de gastos de los PGE, el Capítulo 2 corresponde a:",
            "options": [
              "Gastos corrientes en bienes y servicios",
              "Gastos de personal",
              "Gastos financieros",
              "Inversiones reales"
            ],
            "answer": 0,
            "explanation": "En la clasificación económica del gasto, el Capítulo 1 es Gastos de personal, el Capítulo 2 es Gastos corrientes en bienes y servicios, el Capítulo 3 Gastos financieros y el Capítulo 6 Inversiones reales.",
            "reference": "Orden EHA de estructura presupuestaria",
            "legalArticle": "Art. 41 Ley 47/2003",
            "legalText": "Los créditos se clasificarán con arreglo a una triple clasificación: orgánica, por programas y económica (desglosada en capítulos, artículos, conceptos y subconceptos)."
          },
          {
            "prompt": "La clasificación orgánica del presupuesto de gastos agrupa los créditos en función de:",
            "options": [
              "Los centros gestores y departamentos ministeriales que disponen de los fondos",
              "Los objetivos y políticas públicas que se pretenden alcanzar",
              "La naturaleza económica del gasto (personal, bienes corrientes o inversiones)",
              "El territorio de la Comunidad Autónoma en el que se ejecuta el gasto"
            ],
            "answer": 0,
            "explanation": "La clasificación orgánica asigna los créditos a las distintas secciones presupuestarias correspondientes a ministerios y órganos constitucionales.",
            "reference": "Art. 40 LGP",
            "legalArticle": "Art. 40 Ley 47/2003",
            "legalText": "La clasificación orgánica agrupará por secciones y servicios los créditos asignados a los distintos centros gestores de gasto."
          }
        ]
      },
      {
        "title": "Tema 3. Las modificaciones presupuestarias",
        "summary": "Créditos extraordinarios, suplementos de crédito, ampliaciones, transferencias e incorporaciones de crédito. Competencias para su autorización.",
        "npcName": "Don Vicente",
        "npcRole": "Jefe de Área de Modificaciones Presupuestarias",
        "npcLines": [
          "Las modificaciones presupuestarias permiten adaptar el presupuesto a necesidades sobrevenidas.",
          "Los créditos extraordinarios y suplementos en el Estado exigen aprobación por Ley de Cortes si se financian con Deuda.",
          "Las transferencias de crédito no pueden minorar créditos para gastos de personal ni extraordinarios."
        ],
        "tipName": "Vocal Asesor de Hacienda",
        "tipRole": "Especialista Presupuestario",
        "tipLines": [
          "Fíjate en las competencias: Consejo de Ministros vs. Ministro de Hacienda vs. Ministros del departamento."
        ],
        "boeIds": [
          "BOE-A-2003-21614"
        ],
        "questions": [
          {
            "prompt": "Cuando haya de realizarse con cargo al Presupuesto del Estado algún gasto urgente y no exista crédito consignado para el mismo, debe tramitarse:",
            "options": [
              "Un crédito extraordinario",
              "Un suplemento de crédito",
              "Una transferencia de crédito positiva",
              "Una ampliación de crédito del Capítulo 2"
            ],
            "answer": 0,
            "explanation": "El art. 55 LGP establece que cuando deba realizarse un gasto específico y urgente y no exista crédito, se tramitará un crédito extraordinario (si el crédito es insuficiente, es suplemento).",
            "reference": "Art. 55 LGP",
            "legalArticle": "Art. 55.1 Ley 47/2003",
            "legalText": "Cuando haya de realizarse con cargo al Presupuesto del Estado algún gasto que no pueda demorarse hasta el ejercicio siguiente, y no exista crédito adecuado, el Ministro de Hacienda elevará al Consejo de Ministros el oportuno proyecto de ley de crédito extraordinario."
          },
          {
            "prompt": "¿A qué órgano compete autorizar las transferencias de crédito entre distintas secciones presupuestarias (entre ministerios distintos)?",
            "options": [
              "Al Consejo de Ministros, a propuesta del Ministro de Hacienda",
              "A los Ministros de los departamentos afectados de mutuo acuerdo",
              "Al Director General de Presupuestos en todo caso",
              "Al Tribunal de Cuentas"
            ],
            "answer": 0,
            "explanation": "El art. 62 LGP reserva al Consejo de Ministros la autorización de transferencias entre créditos de distintas secciones presupuestarias.",
            "reference": "Art. 62.1 LGP",
            "legalArticle": "Art. 62.1.a Ley 47/2003",
            "legalText": "Corresponde al Consejo de Ministros autorizar las transferencias de crédito entre distintas secciones presupuestarias."
          },
          {
            "prompt": "Las incorporaciones de crédito al ejercicio corriente (art. 58 LGP) son posibles de forma tasada cuando proceden de:",
            "options": [
              "Créditos extraordinarios y suplementos concedidos en el último mes del ejercicio anterior",
              "Cualquier crédito sobrante de gastos corrientes en bienes y servicios",
              "Créditos de libre disposición no ejecutados al cierre",
              "Cualquier partida que solicite el titular del departamento"
            ],
            "answer": 0,
            "explanation": "El art. 58 LGP permite incorporar créditos extraordinarios y suplementos aprobados en el último mes del ejercicio presupuestario anterior.",
            "reference": "Art. 58 LGP",
            "legalArticle": "Art. 58.2 Ley 47/2003",
            "legalText": "Podrán incorporarse a los créditos del ejercicio los créditos extraordinarios y suplementos de crédito que hayan sido concedidos en el último mes del ejercicio anterior."
          },
          {
            "prompt": "Según el artículo 52 de la LGP, las transferencias de crédito tienen como límite general que:",
            "options": [
              "No podrán minorar créditos extraordinarios ni suplementos concedidos durante el ejercicio",
              "Solo pueden realizarse entre partidas del Capítulo 1",
              "Pueden incrementar gastos corrientes minorando gastos de capital sin límite",
              "Deben ser ratificadas por las Cortes Generales en 30 días"
            ],
            "answer": 0,
            "explanation": "El art. 52 LGP prohíbe que las transferencias minoren créditos extraordinarios, suplementos o créditos incorporados.",
            "reference": "Art. 52 LGP",
            "legalArticle": "Art. 52.1 Ley 47/2003",
            "legalText": "Las transferencias de crédito no podrán minorar créditos que hayan sido incrementados con suplementos o transferencias, ni créditos incorporados, ni créditos extraordinarios."
          }
        ]
      },
      {
        "title": "Tema 4. El procedimiento de ejecución del gasto público",
        "summary": "Fases contables: Aprobación (A), Compromiso/Disposición (D), Reconocimiento de la obligación (O), Ordenación del pago (P) y Pago material.",
        "npcName": "Doña Mercedes",
        "npcRole": "Jefa de Servicio de Gestión Contable (SIC'3)",
        "npcLines": [
          "La gestión del gasto sigue un riguroso orden sucesivo: A, D, O y P.",
          "El reconocimiento de la obligación (O) acredita documentalmente la realización del servicio o entrega del bien.",
          "Pueden acumularse fases en un solo acto administrativo (documentos mixtos AD u ADOK)."
        ],
        "tipName": "Interventora Habilitada",
        "tipRole": "Especialista en Control Previo",
        "tipLines": [
          "Clave esencial para los supuestos prácticos: Art. 73 LGP y la regla de la prestación efectiva para el reconocimiento de obligaciones."
        ],
        "boeIds": [
          "BOE-A-2003-21614"
        ],
        "questions": [
          {
            "prompt": "En el procedimiento de gestión presupuestaria del gasto del Estado (art. 73 LGP), el acto mediante el cual se acuerda la realización de un gasto previamente aprobado, por un importe determinado o determinable y vinculado a un tercero, se denomina:",
            "options": [
              "Compromiso de gasto o Disposición (Fase D)",
              "Aprobación del gasto (Fase A)",
              "Reconocimiento de la obligación (Fase O)",
              "Ordenación del pago (Fase P)"
            ],
            "answer": 0,
            "explanation": "El compromiso o disposición del gasto (fase D) vincula a la Administración con un tercero para la realización del gasto cuantificado.",
            "reference": "Art. 73.3 LGP",
            "legalArticle": "Art. 73.3 Ley 47/2003",
            "legalText": "El compromiso es el acto mediante el cual se acuerda con un tercero, tras el cumplimiento de los trámites legalmente establecidos, la realización de gastos previamente aprobados, por un importe determinado o determinable."
          },
          {
            "prompt": "El reconocimiento de la obligación (Fase O, art. 73.4 LGP) exige inexcusablemente que:",
            "options": [
              "Se acredite documentalmente ante el órgano competente la realización de la prestación o el derecho del acreedor conforme a la ley",
              "El contratista haya solicitado expresamente un anticipo a cuenta",
              "El ejercicio presupuestario no haya concluido el plazo del 30 de junio",
              "Haya sido publicado en el Boletín Oficial del Estado"
            ],
            "answer": 0,
            "explanation": "El art. 73.4 LGP exige que el reconocimiento de la obligación derive de la acreditación documental de la prestación efectivamente realizada por el acreedor.",
            "reference": "Art. 73.4 LGP",
            "legalArticle": "Art. 73.4 Ley 47/2003",
            "legalText": "El reconocimiento de la obligación es el acto mediante el que se declara la existencia de un crédito exigible contra la Hacienda Pública estatal, derivado de un gasto aprobado y comprometido y que comporta la propuesta de pago, previa acreditación documental de la prestación."
          },
          {
            "prompt": "En la Administración General del Estado, las funciones de Ordenación de Pagos (art. 75 LGP) corresponden a:",
            "options": [
              "El Director General del Tesoro y Política Financiera, bajo la superior autoridad del Ministro de Hacienda",
              "El Interventor General de la Administración del Estado (IGAE)",
              "Cada uno de los Subsecretarios departamentales de forma independiente",
              "El Gobernador del Banco de España"
            ],
            "answer": 0,
            "explanation": "El art. 75.1 LGP atribuye al Director General del Tesoro y Política Financiera la ordenación general de pagos del Estado.",
            "reference": "Art. 75.1 LGP",
            "legalArticle": "Art. 75.1 Ley 47/2003",
            "legalText": "Bajo la superior autoridad del Ministro de Hacienda, competen al Director General del Tesoro y Política Financiera las funciones de Ordenador general de pagos del Estado."
          },
          {
            "prompt": "¿Qué es un documento contable mixto ADOK en la ejecución del gasto público?",
            "options": [
              "Un documento que acumula en un solo acto las fases de Aprobación, Disposición, Reconocimiento de la Obligación y propuesta de Pago",
              "Una anulación masiva de créditos concedidos a organismos autónomos",
              "Un informe previo vinculante emitido por el Consejo de Estado",
              "Un certificado bancario de apertura de cuenta corriente restringida"
            ],
            "answer": 0,
            "explanation": "Los documentos contables mixtos como el ADOK permiten acumular la autorización, el compromiso, el reconocimiento de la obligación y la ordenación de pago en un único trámite contable.",
            "reference": "Art. 73.5 LGP y Orden de Contabilidad",
            "legalArticle": "Art. 73.5 Ley 47/2003",
            "legalText": "En los casos en que la naturaleza de las operaciones lo justifique, se podrán acumular en un solo acto dos o más fases de la ejecución presupuestaria."
          }
        ]
      },
      {
        "title": "Tema 5. Pagos a justificar y Anticipos de Caja Fija",
        "summary": "Procedimientos especiales del gasto. Real Decreto 640/1987 y Real Decreto 725/1989. Cajas pagadoras, rendición de cuentas y límites.",
        "npcName": "Don Salvador",
        "npcRole": "Cajero Pagador del Ministerio",
        "npcLines": [
          "Los anticipos de caja fija son provisiones de fondos extrapresupuestarias para atenciones corrientes periódicas o repetitivas.",
          "Los libramientos a justificar son excepciones a la regla de la justificación documental previa.",
          "Las cuentas justificativas de 'a justificar' deben rendirse en un plazo general de tres meses."
        ],
        "tipName": "Habilitada Pagadora",
        "tipRole": "Técnica de Tesorería",
        "tipLines": [
          "Diferencia clave de examen: el ACF es extrapresupuestario y para gastos periódicos menores; el pago a justificar es presupuestario y excepcional."
        ],
        "boeIds": [
          "BOE-A-2003-21614",
          "BOE-A-1987-11116",
          "BOE-A-1989-14197"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 79 de la LGP, tendrán el carácter de 'a justificar' las órdenes de pago:",
            "options": [
              "Cuyos justificantes de gasto no se puedan aportar con carácter previo a la expedición del libramiento de pago",
              "Destinadas a financiar proyectos de investigación de más de diez años",
              "Que se emiten a favor de organismos internacionales sin sede en España",
              "Que corresponden a la nómina del personal funcionario"
            ],
            "answer": 0,
            "explanation": "El art. 79.1 LGP define los pagos a justificar como aquellos en los que los justificantes no pueden adjuntarse con carácter previo al libramiento.",
            "reference": "Art. 79.1 LGP",
            "legalArticle": "Art. 79.1 Ley 47/2003",
            "legalText": "Tendrán el carácter de a justificar las órdenes de pago cuyos documentos justificativos no puedan acompañarse en el momento de su expedición."
          },
          {
            "prompt": "De acuerdo con el artículo 79.4 de la LGP, el plazo general de que disponen los perceptores de órdenes a justificar para rendir la cuenta justificativa es de:",
            "options": [
              "Tres meses, excepcionalmente ampliable a seis meses por el órgano competente",
              "Un mes natural improrrogable",
              "Doce meses contados desde el abono en cuenta bancaria",
              "Quince días hábiles desde el libramiento"
            ],
            "answer": 0,
            "explanation": "El art. 79.4 LGP fija un plazo general de tres meses para rendir las cuentas de libramientos a justificar, ampliable a seis.",
            "reference": "Art. 79.4 LGP",
            "legalArticle": "Art. 79.4 Ley 47/2003",
            "legalText": "Los perceptores de órdenes de pago a justificar deberán rendir cuenta justificativa de la aplicación de las cantidades percibidas en el plazo de tres meses, salvo en gastos de misiones en el exterior que podrá ser de hasta seis meses."
          },
          {
            "prompt": "Los Anticipos de Caja Fija (RD 640/1987 y art. 78 LGP) se definen como:",
            "options": [
              "Provisiones de fondos extrapresupuestarias y de carácter permanente a cajas pagadoras para gastos corrientes periódicos o repetitivos",
              "Préstamos reintegrables concedidos a los empleados públicos para compra de vivienda",
              "Subvenciones directas del Tesoro a empresas en quiebra",
              "Fondos de reserva obligatorios para imprevistos bélicos"
            ],
            "answer": 0,
            "explanation": "El art. 78 LGP y RD 640/1987 definen el ACF como provisión extrapresupuestaria permanente para gastos periódicos o repetitivos.",
            "reference": "Art. 78 LGP y RD 640/1987",
            "legalArticle": "Art. 78.1 Ley 47/2003",
            "legalText": "Se entienden por anticipos de caja fija las provisiones de fondos de carácter permanente que se realicen a pagadurías, cajas y habilitaciones para la atención inmediata y posterior aplicación al capítulo de gastos corrientes."
          },
          {
            "prompt": "En el régimen de Anticipos de Caja Fija, la cuantía total de los anticipos concedidos a cada departamento ministerial no puede superar generalmente:",
            "options": [
              "El 7 por 100 del total de créditos del Capítulo 2 (Gastos corrientes) del departamento ministerial",
              "El 25 por 100 de todos los gastos del presupuesto del ministerio",
              "El 50 por 100 del Capítulo 1 de personal",
              "Un millón de euros por cada Dirección General"
            ],
            "answer": 0,
            "explanation": "El RD 640/1987 establece como límite cuantitativo máximo global del anticipo de caja fija el 7% de los créditos del capítulo de gastos corrientes del ministerio.",
            "reference": "Art. 2 RD 640/1987",
            "legalArticle": "Art. 2 RD 640/1987",
            "legalText": "La cuantía global de los anticipos de caja fija concedidos no podrá superar el 7 por 100 del total de los créditos del capítulo correspondiente a gastos corrientes en bienes y servicios del presupuesto del departamento."
          }
        ]
      },
      {
        "title": "Tema 6. La Ley General de Subvenciones",
        "summary": "Ámbito de la Ley 38/2003. Principios generales, beneficiarios, planes estratégicos, procedimientos de concesión ordinario y directo, y reintegro.",
        "npcName": "Doña Lucila",
        "npcRole": "Instructora de Concesión de Subvenciones",
        "npcLines": [
          "Toda subvención requiere la previa aprobación de un Plan Estratégico de Subvenciones.",
          "El procedimiento ordinario de concesión es la concurrencia competitiva.",
          "El falseamiento de condiciones o el incumplimiento del fin motivan el reintegro con intereses de demora."
        ],
        "tipName": "Asesora de la Base de Datos Nacional",
        "tipRole": "Especialista BDNS",
        "tipLines": [
          "Repasa los supuestos de concesión directa (art. 22.2 LGS) y las causas de reintegro (art. 37 LGS)."
        ],
        "boeIds": [
          "BOE-A-2003-20977"
        ],
        "questions": [
          {
            "prompt": "Según la Ley 38/2003 General de Subvenciones (art. 8.1), con carácter previo a la concesión de subvenciones los órganos competentes deberán:",
            "options": [
              "Aprobar un plan estratégico de subvenciones en el que se concreten los objetivos y efectos que se pretenden conseguir",
              "Solicitar autorización preceptiva a las Cortes Generales para cada convocatoria",
              "Realizar un referéndum sectorial entre los potenciales beneficiarios",
              "Depositar una fianza bancaria en la Caja General de Depósitos por el 50% del importe"
            ],
            "answer": 0,
            "explanation": "El art. 8.1 LGS obliga a la aprobación previa de un plan estratégico de subvenciones antes de conceder cualquier ayuda.",
            "reference": "Art. 8.1 LGS",
            "legalArticle": "Art. 8.1 Ley 38/2003",
            "legalText": "Los órganos de las Administraciones públicas o cualesquiera entes que propongan el establecimiento de subvenciones, con carácter previo, deberán concretar en un plan estratégico de subvenciones los objetivos y efectos que se pretenden con su aplicación."
          },
          {
            "prompt": "El procedimiento ordinario de concesión de subvenciones según el artículo 22 de la Ley 38/2003 se tramitará en régimen de:",
            "options": [
              "Concurrencia competitiva mediante comparación de solicitudes conforme a criterios de valoración prefijados",
              "Concesión directa por orden de entrada de la solicitud en registro sin baremación",
              "Asignación nominativa discrecional por el titular del órgano directivo",
              "Sorteo público ante notario entre todos los inscritos"
            ],
            "answer": 0,
            "explanation": "El art. 22.1 LGS dispone que el procedimiento ordinario de concesión de subvenciones se tramitará en régimen de concurrencia competitiva.",
            "reference": "Art. 22.1 LGS",
            "legalArticle": "Art. 22.1 Ley 38/2003",
            "legalText": "El procedimiento ordinario de concesión de subvenciones se tramitará en régimen de concurrencia competitiva, a través de la comparación de las solicitudes presentadas a fin de establecer una prelación entre las mismas de acuerdo con los criterios de valoración fijados en las bases."
          },
          {
            "prompt": "¿En cuál de los siguientes casos procede la concesión directa de subvenciones conforme al artículo 22.2 de la Ley 38/2003?",
            "options": [
              "Las previstas nominativamente en los Presupuestos Generales del Estado, las impuestas por ley y las que tengan razones de interés público o social acreditadas",
              "Todas aquellas cuyo importe sea inferior a 50.000 euros",
              "Las destinadas a financiar campañas electorales de partidos políticos sin representación",
              "Cualquiera que solicite una entidad sin ánimo de lucro registrada"
            ],
            "answer": 0,
            "explanation": "El art. 22.2 LGS permite la concesión directa de subvenciones nominativas en PGE, las impuestas por rango legal y las excepcionales por interés público, social o humanitario.",
            "reference": "Art. 22.2 LGS",
            "legalArticle": "Art. 22.2 Ley 38/2003",
            "legalText": "Podrán concederse de forma directa: las previstas nominativamente en los Presupuestos Generales, aquellas cuyo otorgamiento venga impuesto por una norma legal y, con carácter excepcional, aquellas en que se acrediten razones de interés público, social, económico o humanitario."
          },
          {
            "prompt": "El plazo de prescripción del derecho de la Administración a exigir el reintegro de las subvenciones (art. 39 LGS) es de:",
            "options": [
              "Cuatro años, a contar desde el momento en que venció el plazo para presentar la justificación",
              "Dos años desde la fecha de notificación de la resolución de concesión",
              "Cinco años conforme al régimen civil general de prescripción de deudas",
              "Diez años si los fondos proceden de la Unión Europea"
            ],
            "answer": 0,
            "explanation": "El art. 39 LGS fija en cuatro años el plazo de prescripción para reclamar el reintegro de subvenciones indebidas.",
            "reference": "Art. 39 LGS",
            "legalArticle": "Art. 39.1 Ley 38/2003",
            "legalText": "Prescribirá a los cuatro años el derecho de la Administración a reconocer o liquidar el reintegro, a contar desde el momento en que venció el plazo para presentar la justificación por parte del beneficiario o entidad colaboradora."
          }
        ]
      },
      {
        "title": "Tema 7. El control del gasto público: IGAE y Tribunal de Cuentas",
        "summary": "Control interno por la Intervención General de la Administración del Estado: función interventora, control financiero permanente y auditoría pública. Control externo por el Tribunal de Cuentas.",
        "npcName": "Doña Gregoria",
        "npcRole": "Interventora Delegada de la IGAE",
        "npcLines": [
          "La IGAE es el órgano directivo del control interno y de la contabilidad pública del Estado.",
          "La función interventora fiscaliza previamente todos los actos con contenido económico.",
          "El Tribunal de Cuentas es el supremo órgano fiscalizador de las cuentas y de la gestión económica del sector público."
        ],
        "tipName": "Auditor del Tribunal de Cuentas",
        "tipRole": "Fiscalizador Estatal",
        "tipLines": [
          "Memoriza los tipos de reparo suspensivo de la función interventora (art. 154 LGP) y el papel del art. 136 CE."
        ],
        "boeIds": [
          "BOE-A-2003-21614",
          "BOE-A-1982-11442"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 142 de la Ley 47/2003 (LGP), el control interno de la gestión económico-financiera del sector público estatal se ejerce por:",
            "options": [
              "La Intervención General de la Administración del Estado (IGAE)",
              "El Tribunal de Cuentas en sesión plenaria",
              "El Ministerio de Economía, Comercio y Empresa mediante orden ministerial",
              "La Abogacía General del Estado"
            ],
            "answer": 0,
            "explanation": "El art. 142 LGP atribuye a la IGAE el ejercicio en exclusiva del control interno del sector público estatal.",
            "reference": "Art. 142 LGP",
            "legalArticle": "Art. 142 Ley 47/2003",
            "legalText": "La Intervención General de la Administración del Estado ejercerá con plena autonomía respecto de los órganos y entidades sujetas a control las funciones de control interno de la gestión económico-financiera del sector público estatal."
          },
          {
            "prompt": "En el ejercicio de la función interventora (art. 154 LGP), si la intervención fiscalizadora manifiesta su desacuerdo con el fondo o la forma de un acto con repercusión económica, deberá formular:",
            "options": [
              "Un reparo por escrito, con efectos suspensivos de la tramitación si concurren causas tasadas",
              "Una sanción de cese cautelar del funcionario gestor del gasto",
              "Una querella ante la Sala de lo Contencioso-Administrativo de la Audiencia Nacional",
              "Un informe no vinculante que no interrumpe el expediente bajo ningún concepto"
            ],
            "answer": 0,
            "explanation": "El art. 154 LGP regula el reparo por escrito, que suspende la tramitación del expediente en los supuestos legalmente previstos.",
            "reference": "Art. 154 LGP",
            "legalArticle": "Art. 154.1 Ley 47/2003",
            "legalText": "Si la Intervención se manifestase en desacuerdo con el fondo o con la forma de los actos, documentos o expedientes examinados, formulará sus reparos por escrito."
          },
          {
            "prompt": "El Tribunal de Cuentas (art. 136 CE y LO 2/1982) ejerce dos funciones primordiales:",
            "options": [
              "La fiscalizadora externa y la de enjuiciamiento de la responsabilidad contable",
              "La potestad legislativa en materia tributaria y la fijación de tipos de interés",
              "El control interno de las empresas privadas y la liquidación del IRPF",
              "La dirección de la policía judicial y el orden público económico"
            ],
            "answer": 0,
            "explanation": "El Tribunal de Cuentas tiene constitucionalmente encomendadas la función fiscalizadora y la función jurisdiccional o de enjuiciamiento contable.",
            "reference": "Art. 136 CE y LO 2/1982",
            "legalArticle": "Art. 136.1 CE",
            "legalText": "El Tribunal de Cuentas es el supremo órgano fiscalizador de las cuentas y de la gestión económica del Estado, así como del sector público, y ejerce la jurisdicción contable respecto de quienes tengan a su cargo el manejo de caudales públicos."
          },
          {
            "prompt": "¿A quién reporta y depende directamente el Tribunal de Cuentas en el ejercicio de su función fiscalizadora externa?",
            "options": [
              "Directamente de las Cortes Generales, ejerciendo sus funciones por delegación de ellas",
              "Del Presidente del Gobierno y del Consejo de Ministros",
              "Del Consejo General del Poder Judicial en grado jerárquico",
              "Del Banco Central Europeo"
            ],
            "answer": 0,
            "explanation": "El art. 136.1 CE dispone expresamente que el Tribunal de Cuentas depende directamente de las Cortes Generales y ejerce sus funciones por delegación de ellas.",
            "reference": "Art. 136.1 CE",
            "legalArticle": "Art. 136.1 CE",
            "legalText": "El Tribunal de Cuentas depende directamente de las Cortes Generales y ejerce sus funciones por delegación de ellas en el examen y comprobación de la Cuenta General del Estado."
          }
        ]
      },
      {
        "title": "Tema 8. Retribuciones de los empleados públicos y gestión de nóminas",
        "summary": "Conceptos retributivos básicos y complementarios (TREBEP y LPGE). Nómina, devengo, cotizaciones a la Seguridad Social y retenciones a cuenta del IRPF.",
        "npcName": "Don Teodoro",
        "npcRole": "Jefe de la Sección de Habilitación de Personal",
        "npcLines": [
          "Las retribuciones básicas son iguales en todas las AAPP para cada subgrupo: sueldo y trienios.",
          "Las retribuciones complementarias atienden al puesto: complemento de destino y específico.",
          "El IRPF y las cuotas a la Seguridad Social son deducciones legales obligatorias en nómina."
        ],
        "tipName": "Especialista en Nóminas de la AGE",
        "tipRole": "Gestor de NEDAES",
        "tipLines": [
          "Aprende de memoria la distinción entre retribuciones básicas (art. 23 TREBEP) y complementarias (art. 24 TREBEP)."
        ],
        "boeIds": [
          "BOE-A-2015-11719",
          "BOE-A-1984-17387"
        ],
        "questions": [
          {
            "prompt": "Según el artículo 23 del TREBEP, son retribuciones básicas de los funcionarios públicos de carrera:",
            "options": [
              "El sueldo asignado a cada subgrupo o grupo de clasificación profesional y los trienios",
              "El complemento de destino y el complemento específico",
              "El complemento de productividad y las gratificaciones por servicios extraordinarios",
              "La indemnización por residencia y las dietas de manutención"
            ],
            "answer": 0,
            "explanation": "El art. 23 TREBEP define como retribuciones básicas exclusivamente el sueldo asignado al subgrupo y los trienios, así como las pagas extraordinarias en sus componentes básicos.",
            "reference": "Art. 23 TREBEP",
            "legalArticle": "Art. 23 TREBEP",
            "legalText": "Son retribuciones básicas las que retribuyen al funcionario según la adscripción de su cuerpo o escala a un determinado subgrupo o grupo de clasificación profesional y por su antigüedad en el mismo: el sueldo y los trienios."
          },
          {
            "prompt": "El complemento de destino (art. 24 TREBEP y art. 23 Ley 30/1984) retribuye:",
            "options": [
              "El nivel del puesto de trabajo que se desempeña",
              "La especial dificultad técnica, dedicación o peligrosidad del puesto de trabajo",
              "El especial rendimiento y la actividad extraordinaria del funcionario",
              "El número de años de servicio prestados a la Administración"
            ],
            "answer": 0,
            "explanation": "El complemento de destino retribuye el nivel asignado al puesto de trabajo en la relación de puestos de trabajo (del 1 al 30).",
            "reference": "Art. 24.b TREBEP",
            "legalArticle": "Art. 24.b TREBEP",
            "legalText": "El complemento de destino retribuye la progresión alcanzada por el funcionario dentro del sistema de carrera administrativa y el nivel del puesto que desempeñe."
          },
          {
            "prompt": "El complemento específico retribuye:",
            "options": [
              "La especial dificultad técnica, dedicación, responsabilidad, incompatibilidad o peligrosidad del puesto de trabajo",
              "El nivel numérico consolidado del grado personal",
              "La antigüedad acumulada por cada tres años de servicio activo",
              "Los servicios extraordinarios prestados fuera de la jornada normal"
            ],
            "answer": 0,
            "explanation": "El complemento específico retribuye las condiciones particulares del puesto: dificultad técnica, dedicación, responsabilidad e incompatibilidad.",
            "reference": "Art. 24.c TREBEP",
            "legalArticle": "Art. 24.c TREBEP",
            "legalText": "El complemento específico está destinado a retribuir las condiciones particulares de algunos puestos de trabajo en atención a su especial dificultad técnica, dedicación, responsabilidad, incompatibilidad, peligrosidad o penosidad."
          },
          {
            "prompt": "¿En qué momento se devengan las pagas extraordinarias de los funcionarios de la AGE según la normativa presupuestaria?",
            "options": [
              "En los meses de junio y diciembre, devengándose proporcionalmente durante los periodos de diciembre a mayo y de junio a noviembre",
              "En el mes de agosto como paga de vacaciones exclusivamente",
              "El primer día de cada trimestre natural de forma prorrateada",
              "Solo en caso de que el Estado alcance superávit presupuestario anual"
            ],
            "answer": 0,
            "explanation": "Las pagas extraordinarias se perciben en junio y diciembre, calculadas sobre el tiempo de servicios prestados durante los seis meses anteriores.",
            "reference": "Leyes anuales de Presupuestos Generales del Estado",
            "legalArticle": "Ley de Presupuestos Generales del Estado",
            "legalText": "Las pagas extraordinarias de los funcionarios en servicio activo serán dos al año y se devengarán el primer día de los meses de junio y de diciembre con referencia a la situación y derechos del funcionario en dichas fechas."
          }
        ]
      }
    ]
  }
];
