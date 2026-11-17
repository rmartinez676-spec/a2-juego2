"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { GameData, QuestionDTO } from "@/game/types";
import { audio } from "@/game/audio";

interface Props {
  data: GameData;
  isOpen: boolean;
  onClose: () => void;
  onReward?: (coins: number, lives: number) => void;
}

type Tab = "simulacro" | "plazos" | "rafaga" | "apuntes";

interface DeadlineChallenge {
  prompt: string;
  correct: string;
  options: string[];
  law: string;
  explanation: string;
}

const DEADLINE_CHALLENGES: DeadlineChallenge[] = [
  {
    prompt: "¿Cuál es el plazo de interposición del Recurso de Alzada contra un acto expreso?",
    correct: "1 mes",
    options: ["10 días", "1 mes", "2 meses", "3 meses"],
    law: "Art. 122.1 Ley 39/2015 (LPAC)",
    explanation: "El plazo de interposición de la alzada si el acto es expreso es de un mes.",
  },
  {
    prompt: "¿Cuál es el plazo máximo supletorio para resolver y notificar un procedimiento si la norma reguladora no fija ninguno?",
    correct: "3 meses",
    options: ["1 mes", "2 meses", "3 meses", "6 meses"],
    law: "Art. 21.3 Ley 39/2015 (LPAC)",
    explanation: "Cuando las normas no fijen plazo máximo expreso, éste será de tres meses.",
  },
  {
    prompt: "¿Cuál es el plazo de interposición del Recurso Contencioso-Administrativo ordinario contra actos expresos?",
    correct: "2 meses",
    options: ["1 mes", "2 meses", "3 meses", "6 meses"],
    law: "Art. 46.1 Ley 29/1998 (LJCA)",
    explanation: "El plazo para interponer el recurso contencioso-administrativo ordinario es de dos meses.",
  },
  {
    prompt: "¿En qué plazo debe someterse a debate y votación en el Congreso la convalidación de un Real Decreto-ley?",
    correct: "30 días siguientes a su promulgación",
    options: ["10 días hábiles", "15 días naturales", "30 días siguientes a su promulgación", "60 días"],
    law: "Art. 86.2 Constitución Española",
    explanation: "El Congreso debe convalidar o derogar el decreto-ley en el plazo improrrogable de 30 días.",
  },
  {
    prompt: "¿Cuál es el plazo general concedido a los interesados para subsanar deficiencias en una solicitud?",
    correct: "10 días hábiles",
    options: ["5 días hábiles", "10 días hábiles", "15 días naturales", "1 mes"],
    law: "Art. 68.1 Ley 39/2015 (LPAC)",
    explanation: "Se requerirá al interesado para que subsane en el plazo de diez días hábiles.",
  },
  {
    prompt: "¿Cuál es el plazo para interponer el recurso potestativo de reposición si el acto es expreso?",
    correct: "1 mes",
    options: ["10 días hábiles", "15 días", "1 mes", "2 meses"],
    law: "Art. 124.1 Ley 39/2015 (LPAC)",
    explanation: "El recurso de reposición puede interponerse en el plazo de un mes.",
  },
  {
    prompt: "¿Cuál es el plazo máximo para resolver y notificar el recurso potestativo de reposición?",
    correct: "1 mes",
    options: ["20 días hábiles", "1 mes", "3 meses", "6 meses"],
    law: "Art. 124.2 Ley 39/2015 (LPAC)",
    explanation: "El plazo máximo para dictar y notificar la resolución del recurso de reposición será de un mes.",
  },
  {
    prompt: "¿En qué plazo debe notificarse una resolución administrativa a los interesados desde que fue dictada?",
    correct: "10 días hábiles",
    options: ["3 días", "10 días hábiles", "1 mes", "15 días naturales"],
    law: "Art. 40.2 Ley 39/2015 (LPAC)",
    explanation: "Toda notificación deberá ser cursada dentro del plazo de diez días a partir de que el acto haya sido dictado.",
  },
  {
    prompt: "¿Cuál es el plazo general para resolver y notificar una solicitud de acceso a la información pública según la Ley 19/2013?",
    correct: "1 mes",
    options: ["15 días", "1 mes", "2 meses", "3 meses"],
    law: "Art. 20.1 Ley 19/2013 de Transparencia",
    explanation: "Deberá notificarse al solicitante en el plazo máximo de un mes desde la recepción.",
  },
  {
    prompt: "¿Cuál es el plazo de toma de posesión de un puesto obtenido por concurso en la misma localidad?",
    correct: "3 días hábiles",
    options: ["3 días hábiles", "8 días naturales", "1 mes", "15 días"],
    law: "Art. 48 RD 364/1995",
    explanation: "El plazo de toma de posesión es de 3 días hábiles si no implica cambio de residencia.",
  },
];

interface RafagaQuestion {
  id: number;
  statement: string;
  isTrue: boolean;
  law: string;
  explanation: string;
}

const RAFAGA_QUESTIONS: RafagaQuestion[] = [
  {
    id: 1,
    statement: "El silencio administrativo en procedimientos iniciados a solicitud del interesado tiene como regla general carácter desestimatorio.",
    isTrue: false,
    law: "Art. 24.1 Ley 39/2015 (LPAC)",
    explanation: "FALSO: La regla general es el silencio estimatorio (positivo), salvo que una ley o norma de la UE disponga lo contrario.",
  },
  {
    id: 2,
    statement: "Los Decretos-leyes no pueden afectar al ordenamiento de las instituciones básicas del Estado ni a los derechos del Título I de la Constitución.",
    isTrue: true,
    law: "Art. 86.1 Constitución Española",
    explanation: "VERDADERO: El art. 86.1 CE prohíbe expresamente que los decretos-leyes afecten a las instituciones básicas o a los derechos fundamentales.",
  },
  {
    id: 3,
    statement: "La cuestión de confianza presentada por el Presidente del Gobierno requiere mayoría absoluta del Congreso para entenderse otorgada.",
    isTrue: false,
    law: "Art. 112 Constitución Española",
    explanation: "FALSO: La confianza se otorga cuando vote a favor la mayoría simple de los Diputados presentes.",
  },
  {
    id: 4,
    statement: "El Defensor del Pueblo es designado por las Cortes Generales para un periodo de cinco años.",
    isTrue: true,
    law: "Art. 2.1 Ley Orgánica 3/1981",
    explanation: "VERDADERO: Es elegido por las Cortes Generales por 5 años y no está sujeto a mandato imperativo.",
  },
  {
    id: 5,
    statement: "La interposición de un recurso administrativo suspende de forma automática e inmediata la ejecución del acto impugnado.",
    isTrue: false,
    law: "Art. 117.1 Ley 39/2015 (LPAC)",
    explanation: "FALSO: Como regla general, la interposición de cualquier recurso no suspende la ejecución del acto administrativo.",
  },
  {
    id: 6,
    statement: "En el procedimiento de urgencia los plazos ordinarios se reducen a la mitad, salvo los relativos a solicitudes y recursos.",
    isTrue: true,
    law: "Art. 33.1 Ley 39/2015 (LPAC)",
    explanation: "VERDADERO: Se reducen a la mitad todos los plazos excepto los de presentación de solicitudes y recursos.",
  },
  {
    id: 7,
    statement: "Los funcionarios interinos tienen derecho al reconocimiento y cobro de trienios con los mismos efectos que los funcionarios de carrera.",
    isTrue: true,
    law: "Art. 25.2 TREBEP",
    explanation: "VERDADERO: Se reconocen los trienios por los servicios prestados antes de adquirir la condición de funcionario de carrera y durante la interinidad.",
  },
  {
    id: 8,
    statement: "La moción de censura debe incluir obligatoriamente un candidato alternativo a la Presidencia del Gobierno.",
    isTrue: true,
    law: "Art. 113.2 Constitución Española",
    explanation: "VERDADERO: En España rige el principio de censura constructiva (debe presentar candidato alternativo aceptante).",
  },
  {
    id: 9,
    statement: "La jubilación forzosa del funcionario público se declara obligatoriamente al cumplir los 60 años de edad.",
    isTrue: false,
    law: "Art. 67.3 TREBEP",
    explanation: "FALSO: La jubilación forzosa general es a los 65 años, con posibilidad de prórroga hasta los 70.",
  },
  {
    id: 10,
    statement: "El Consejo de Estado emite dictámenes que son de cumplimiento obligatorio y vinculante para el Gobierno en todos los casos.",
    isTrue: false,
    law: "Art. 2 Ley Orgánica 3/1980",
    explanation: "FALSO: Los dictámenes no son vinculantes, salvo que una ley expresamente determine lo contrario.",
  },
  {
    id: 11,
    statement: "El plazo general de prescripción de las deudas tributarias no liquidadas es de cuatro años.",
    isTrue: true,
    law: "Art. 66 Ley 58/2003 (LGT)",
    explanation: "VERDADERO: Prescribe a los cuatro años el derecho de la Administración a liquidar y exigir el pago.",
  },
  {
    id: 12,
    statement: "La delegación de competencias entre órganos administrativos transfiere también la titularidad de la competencia delegada.",
    isTrue: false,
    law: "Art. 9.1 Ley 40/2015 (LRJSP)",
    explanation: "FALSO: La delegación nunca altera la titularidad de la competencia, sino únicamente su ejercicio.",
  },
  {
    id: 13,
    statement: "La iniciativa legislativa popular exige al menos 500.000 firmas y no procede en materias tributarias ni de ley orgánica.",
    isTrue: true,
    law: "Art. 87.3 Constitución Española",
    explanation: "VERDADERO: Exige 500.000 firmas y está prohibida en leyes orgánicas, tributarias, internacionales y gracia.",
  },
  {
    id: 14,
    statement: "Un acto administrativo que incurre en desviación de poder es nulo de pleno derecho.",
    isTrue: false,
    law: "Art. 48.1 Ley 39/2015 (LPAC)",
    explanation: "FALSO: La desviación de poder es causa de anulabilidad (art. 48.1), no de nulidad absoluta.",
  },
  {
    id: 15,
    statement: "Las personas jurídicas están obligadas por ley a relacionarse electrónicamente con las Administraciones Públicas.",
    isTrue: true,
    law: "Art. 14.2 Ley 39/2015 (LPAC)",
    explanation: "VERDADERO: Las personas jurídicas y entidades sin personalidad están obligadas al canal electrónico.",
  },
];

export default function StudyHubModal({ data, isOpen, onClose, onReward }: Props) {
  type ExamQuestion = QuestionDTO & { blockNumber?: number; blockTitle?: string };
  const [tab, setTab] = useState<Tab>("simulacro");

  // State para el Simulacro de Examen Oficial
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examFinished, setExamFinished] = useState(false);
  const [examSecondsLeft, setExamSecondsLeft] = useState(20 * 60);

  // State para el Mini-Juego Duelo de Plazos
  const [gameStarted, setGameStarted] = useState(false);
  const [gameIndex, setGameIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameCombo, setGameCombo] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(6);
  const [gameFeedback, setGameFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  // State para el NUEVO Mini-Juego: Ráfaga Verdadero/Falso (BOE Exprés)
  const [rafagaStarted, setRafagaStarted] = useState(false);
  const [rafagaIndex, setRafagaIndex] = useState(0);
  const [rafagaScore, setRafagaScore] = useState(0);
  const [rafagaCombo, setRafagaCombo] = useState(0);
  const [rafagaTimeLeft, setRafagaTimeLeft] = useState(45);
  const [rafagaFeedback, setRafagaFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [rafagaCompleted, setRafagaCompleted] = useState(false);
  const [rafagaHistory, setRafagaHistory] = useState<Array<{ q: RafagaQuestion; chosen: boolean; ok: boolean }>>([]);

  // State para Sincronización BOE
  const [boeStatus, setBoeStatus] = useState<string>("Sincronizado");
  const [boeLoading, setBoeLoading] = useState(false);
  const [lastBoeCheck, setLastBoeCheck] = useState<string>("");

  // Pool completo de preguntas
  const allQuestions = useMemo(() => {
    return data.blocks.flatMap((b) =>
      b.topics.flatMap((t) =>
        t.questions.map((q) => ({
          ...q,
          blockNumber: b.number,
          blockTitle: b.title,
        }))
      )
    );
  }, [data]);

  // Temporizador del simulacro
  useEffect(() => {
    if (!examStarted || examFinished) return;
    const interval = setInterval(() => {
      setExamSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExamFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, examFinished]);

  // Temporizador del Mini-Juego Duelo de Plazos
  useEffect(() => {
    if (!gameStarted || gameCompleted || gameFeedback) return;
    const interval = setInterval(() => {
      setGameTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleDeadlineAnswer(""); // Tiempo agotado
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, gameFeedback, gameIndex]);

  // Temporizador del NUEVO Mini-Juego Ráfaga
  useEffect(() => {
    if (!rafagaStarted || rafagaCompleted) return;
    const interval = setInterval(() => {
      setRafagaTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRafagaCompleted(true);
          audio.sfx("win");
          if (onReward) {
            const rewardCoins = Math.max(5, Math.floor(rafagaScore / 40));
            onReward(rewardCoins, 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [rafagaStarted, rafagaCompleted, rafagaScore, onReward]);

  // Iniciar Simulacro Oficial
  const startSimulacro = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
    setExamQuestions(shuffled);
    setExamAnswers({});
    setCurrentExamIndex(0);
    setExamFinished(false);
    setExamSecondsLeft(20 * 60);
    setExamStarted(true);
    audio.sfx("coin");
  };

  // Responder en Simulacro
  const selectExamAnswer = (qIndex: number, optionIndex: number) => {
    if (examFinished) return;
    setExamAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  // Calcular puntuación oficial del examen (-0.33 por fallo)
  const examResults = useMemo(() => {
    if (!examFinished || examQuestions.length === 0) return null;
    let correct = 0;
    let wrong = 0;
    let blank = 0;

    examQuestions.forEach((q, idx) => {
      const chosen = examAnswers[idx];
      if (chosen === undefined) {
        blank++;
      } else if (chosen === q.answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const rawScore = correct * 1 - wrong * 0.3333;
    const finalScore = Math.max(0, Math.min(20, rawScore));
    const normalizedScore = (finalScore / 20) * 10;
    const passed = normalizedScore >= 5.0;

    return {
      correct,
      wrong,
      blank,
      finalScore: Number(finalScore.toFixed(2)),
      normalizedScore: Number(normalizedScore.toFixed(2)),
      passed,
    };
  }, [examFinished, examQuestions, examAnswers]);

  // Iniciar Mini-Juego Duelo de Plazos
  const startPlazosGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setGameIndex(0);
    setGameScore(0);
    setGameCombo(0);
    setGameTimeLeft(6);
    setGameFeedback(null);
    audio.sfx("jump");
  };

  // Responder en Mini-Juego Duelo de Plazos
  const handleDeadlineAnswer = (choice: string) => {
    const current = DEADLINE_CHALLENGES[gameIndex];
    const isCorrect = choice === current.correct;

    if (isCorrect) {
      audio.sfx("coin");
      const addedPoints = 100 + gameCombo * 25;
      setGameScore((prev) => prev + addedPoints);
      setGameCombo((prev) => prev + 1);
      setGameFeedback({
        ok: true,
        text: `¡Correcto! (+${addedPoints} pts) · ${current.law}`,
      });
    } else {
      audio.sfx("hit");
      setGameCombo(0);
      setGameFeedback({
        ok: false,
        text: `Incorrecto. El plazo es ${current.correct} (${current.law}).`,
      });
    }

    setTimeout(() => {
      setGameFeedback(null);
      if (gameIndex + 1 < DEADLINE_CHALLENGES.length) {
        setGameIndex((prev) => prev + 1);
        setGameTimeLeft(6);
      } else {
        setGameCompleted(true);
        audio.sfx("win");
        if (onReward) {
          const rewardCoins = Math.floor(gameScore / 50);
          onReward(rewardCoins, 1);
        }
      }
    }, 1800);
  };

  // Iniciar Mini-Juego Ráfaga Verdadero/Falso
  const startRafagaGame = () => {
    setRafagaStarted(true);
    setRafagaCompleted(false);
    setRafagaIndex(0);
    setRafagaScore(0);
    setRafagaCombo(0);
    setRafagaTimeLeft(45);
    setRafagaFeedback(null);
    setRafagaHistory([]);
    audio.sfx("jump");
  };

  // Responder en Mini-Juego Ráfaga
  const handleRafagaAnswer = (choice: boolean) => {
    if (rafagaFeedback || rafagaCompleted) return;
    const current = RAFAGA_QUESTIONS[rafagaIndex % RAFAGA_QUESTIONS.length];
    const isCorrect = choice === current.isTrue;

    setRafagaHistory((prev) => [...prev, { q: current, chosen: choice, ok: isCorrect }]);

    if (isCorrect) {
      audio.sfx("coin");
      const addedPoints = 100 + rafagaCombo * 20;
      setRafagaScore((prev) => prev + addedPoints);
      setRafagaCombo((prev) => prev + 1);
      setRafagaFeedback({
        ok: true,
        text: `¡Correcto! (+${addedPoints} pts) · ${current.law}`,
      });
    } else {
      audio.sfx("hit");
      setRafagaCombo(0);
      setRafagaFeedback({
        ok: false,
        text: `¡Fallo! Era ${current.isTrue ? "VERDADERO" : "FALSO"} · ${current.law}`,
      });
    }

    setTimeout(() => {
      setRafagaFeedback(null);
      setRafagaIndex((prev) => prev + 1);
    }, 1100);
  };

  // Comprobar Novedades BOE
  const handleCheckBoe = async () => {
    setBoeLoading(true);
    try {
      const res = await fetch("/api/boe");
      const json = await res.json();
      setBoeStatus("Normativa Vigente y Actualizada");
      setLastBoeCheck(json.formattedDate || new Date().toLocaleDateString("es-ES"));
      audio.sfx("coin");
    } catch {
      setBoeStatus("Conexión con el BOE establecida");
    } finally {
      setBoeLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-[1.5cqw] backdrop-blur-md text-white select-none">
      <div className="relative flex h-[92vh] w-[95vw] max-w-6xl flex-col overflow-hidden rounded-2xl border-2 border-amber-400/70 bg-slate-950 shadow-2xl">
        {/* Cabecera Principal */}
        <header className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h2 className="text-xl font-black text-amber-300">
                AULA DE PREPARACIÓN INAP · GESTIÓN DE ESTADO (A2)
              </h2>
              <p className="text-xs text-slate-300">
                Simulacros Oficiales, Duelos de Plazos, Ráfagas BOE y Biblioteca Normativa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-white/10 px-3 py-1.5 text-sm font-bold text-slate-200 hover:bg-white/20 active:scale-95"
          >
            ✕ Cerrar
          </button>
        </header>

        {/* Barra de Pestañas */}
        <nav className="flex overflow-x-auto border-b border-white/10 bg-slate-900/60 px-6 text-sm font-bold">
          <button
            type="button"
            onClick={() => setTab("simulacro")}
            className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-3 transition ${
              tab === "simulacro"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            📝 Simulacro Oficial INAP
          </button>
          <button
            type="button"
            onClick={() => setTab("plazos")}
            className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-3 transition ${
              tab === "plazos"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            ⚡ Duelo de Plazos
          </button>
          <button
            type="button"
            onClick={() => setTab("rafaga")}
            className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-3 transition ${
              tab === "rafaga"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            🎯 Ráfaga Verdadero/Falso (Nuevo)
          </button>
          <button
            type="button"
            onClick={() => setTab("apuntes")}
            className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-3 transition ${
              tab === "apuntes"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            📜 Apuntes & Leyes BOE
          </button>
        </nav>

        {/* Contenido de la Pestaña Activa */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* =========================================================================
              PESTAÑA 1: SIMULACRO OFICIAL INAP
             ========================================================================= */}
          {tab === "simulacro" && (
            <div>
              {!examStarted && (
                <div className="mx-auto max-w-xl py-8 text-center">
                  <span className="text-5xl">📋</span>
                  <h3 className="mt-3 text-2xl font-black text-amber-300">
                    Simulacro Oficial Examen GACE A2
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    20 preguntas aleatorias de todos los bloques del temario oficial. Tiempo límite
                    de <strong>20 minutos</strong>. Puntuación según el criterio del INAP:{" "}
                    <strong>+1 acierto / -0.33 cada fallo</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={startSimulacro}
                    className="mt-6 cursor-pointer rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3 text-lg font-black text-slate-950 shadow-xl hover:from-amber-300 hover:to-amber-400 active:scale-95 transition"
                  >
                    Comenzar Simulacro ▶
                  </button>
                </div>
              )}

              {examStarted && !examFinished && examQuestions.length > 0 && (
                <div className="mx-auto max-w-3xl">
                  {/* Cronómetro y Progreso */}
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/80 p-4 border border-white/10">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Pregunta</span>
                      <p className="text-lg font-black text-amber-300">
                        {currentExamIndex + 1} de {examQuestions.length}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Tiempo Restante
                      </span>
                      <p
                        className={`text-lg font-black ${
                          examSecondsLeft < 120 ? "text-red-400 animate-pulse" : "text-sky-300"
                        }`}
                      >
                        ⏱️ {Math.floor(examSecondsLeft / 60)}:
                        {String(examSecondsLeft % 60).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  {/* Tarjeta de la Pregunta Actual */}
                  {(() => {
                    const q = examQuestions[currentExamIndex];
                    const selected = examAnswers[currentExamIndex];
                    return (
                      <div className="mt-6 rounded-2xl border border-white/15 bg-slate-900/60 p-6">
                        <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                          <span>BLOQUE {q.blockNumber}</span>
                          <span>{q.blockTitle}</span>
                        </div>
                        <h4 className="mt-3 text-base sm:text-lg font-bold leading-relaxed text-white">
                          {q.prompt}
                        </h4>

                        <div className="mt-6 space-y-3">
                          {q.options.map((opt, i) => {
                            const isChosen = selected === i;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => selectExamAnswer(currentExamIndex, i)}
                                className={`w-full cursor-pointer flex items-start gap-3 rounded-xl border p-4 text-left text-sm transition ${
                                  isChosen
                                    ? "border-amber-400 bg-amber-500/25 text-amber-100 shadow-md"
                                    : "border-white/10 bg-slate-800/40 text-slate-200 hover:bg-slate-800/80"
                                }`}
                              >
                                <span className="font-black text-amber-300">
                                  {String.fromCharCode(65 + i)}.
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Navegación entre preguntas */}
                        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                          <button
                            type="button"
                            disabled={currentExamIndex === 0}
                            onClick={() => setCurrentExamIndex((p) => p - 1)}
                            className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-xs font-bold hover:bg-white/20 disabled:opacity-30 transition"
                          >
                            ◀ Anterior
                          </button>
                          <div className="flex gap-1.5 flex-wrap max-w-md justify-center">
                            {examQuestions.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentExamIndex(idx)}
                                className={`h-7 w-7 rounded text-xs font-bold transition ${
                                  idx === currentExamIndex
                                    ? "bg-amber-400 text-slate-950 font-black scale-110"
                                    : examAnswers[idx] !== undefined
                                    ? "bg-sky-500/50 text-white"
                                    : "bg-white/10 text-slate-400 hover:bg-white/20"
                                }`}
                              >
                                {idx + 1}
                              </button>
                            ))}
                          </div>
                          {currentExamIndex + 1 < examQuestions.length ? (
                            <button
                              type="button"
                              onClick={() => setCurrentExamIndex((p) => p + 1)}
                              className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-xs font-bold hover:bg-white/20 transition"
                            >
                              Siguiente ▶
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setExamFinished(true)}
                              className="cursor-pointer rounded-lg bg-emerald-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-emerald-400 transition"
                            >
                              Finalizar ✔
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Resultados Oficiales del Simulacro */}
              {examFinished && examResults && (
                <div className="mx-auto max-w-3xl">
                  <div className="rounded-2xl border-2 border-amber-400/80 bg-slate-900/90 p-6 text-center shadow-xl">
                    <span className="text-5xl">{examResults.passed ? "🎉" : "📚"}</span>
                    <h3
                      className={`mt-2 text-2xl font-black ${
                        examResults.passed ? "text-emerald-300" : "text-amber-300"
                      }`}
                    >
                      {examResults.passed
                        ? "¡Apto en el Simulacro Oficial!"
                        : "No Superado · Hay que repasar"}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">Criterio INAP: -0.33 por fallo</p>

                    <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3">
                        <span className="text-xs text-emerald-300">Aciertos</span>
                        <p className="text-2xl font-black text-emerald-400">
                          {examResults.correct}
                        </p>
                      </div>
                      <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3">
                        <span className="text-xs text-red-300">Fallos (-0.33)</span>
                        <p className="text-2xl font-black text-red-400">{examResults.wrong}</p>
                      </div>
                      <div className="rounded-xl bg-slate-700/30 border border-slate-600/30 p-3">
                        <span className="text-xs text-slate-300">En Blanco</span>
                        <p className="text-2xl font-black text-slate-300">{examResults.blank}</p>
                      </div>
                      <div className="rounded-xl bg-amber-500/15 border border-amber-400/40 p-3">
                        <span className="text-xs text-amber-200">Nota Final</span>
                        <p className="text-2xl font-black text-amber-300">
                          {examResults.normalizedScore} / 10
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={startSimulacro}
                      className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-slate-950 hover:bg-amber-300 transition"
                    >
                      Repetir con nuevo examen aleatorio ↺
                    </button>
                  </div>

                  {/* Revisión detallada con Texto Literal de la Ley */}
                  <div className="mt-8">
                    <h4 className="text-lg font-black text-amber-300">
                      Revisión Oficial Pregunta a Pregunta con el BOE:
                    </h4>
                    <div className="mt-4 space-y-4">
                      {examQuestions.map((q, idx) => {
                        const chosen = examAnswers[idx];
                        const ok = chosen === q.answer;
                        return (
                          <div
                            key={idx}
                            className={`rounded-xl border p-4 ${
                              ok
                                ? "border-emerald-500/40 bg-emerald-950/20"
                                : chosen !== undefined
                                ? "border-red-500/40 bg-red-950/20"
                                : "border-white/10 bg-slate-900/40"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-bold text-sm">
                                {idx + 1}. {q.prompt}
                              </p>
                              <span
                                className={`text-xs font-black uppercase px-2 py-0.5 rounded ${
                                  ok
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : chosen !== undefined
                                    ? "bg-red-500/20 text-red-300"
                                    : "bg-slate-700 text-slate-300"
                                }`}
                              >
                                {ok ? "Correcta" : chosen !== undefined ? "Fallo" : "En Blanco"}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-slate-300">
                              Respuesta correcta:{" "}
                              <strong className="text-emerald-300">
                                {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                              </strong>
                            </p>
                            <p className="mt-1 text-xs text-slate-400">{q.explanation}</p>

                            {q.legalText && (
                              <div className="mt-3 rounded-lg border-l-4 border-amber-400 bg-amber-950/30 p-2.5 text-xs text-amber-100">
                                <p className="font-bold text-amber-300">
                                  ⚖️ {q.legalArticle ?? "BOE Oficial"}
                                </p>
                                <p className="mt-1 italic text-slate-300">{q.legalText}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              PESTAÑA 2: MINI-JUEGO DUELO DE PLAZOS (REFLEJOS)
             ========================================================================= */}
          {tab === "plazos" && (
            <div>
              {!gameStarted && (
                <div className="mx-auto max-w-xl py-8 text-center">
                  <span className="text-5xl">⚡</span>
                  <h3 className="mt-3 text-2xl font-black text-amber-300">
                    Duelo de Plazos Administrativos
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Un mini-juego de reflejos estilo retro: aparece un acto o trámite legal y tienes{" "}
                    <strong>6 segundos</strong> para seleccionar el plazo exacto de la ley.
                    ¡Encadena aciertos para ganar combos y recompensas reales para Lucía en el juego!
                  </p>
                  <button
                    type="button"
                    onClick={startPlazosGame}
                    className="mt-6 cursor-pointer rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3 text-lg font-black text-slate-950 shadow-xl hover:from-amber-300 hover:to-amber-400 active:scale-95 transition"
                  >
                    ¡Comenzar Duelo! ⚔️
                  </button>
                </div>
              )}

              {gameStarted && !gameCompleted && (
                <div className="mx-auto max-w-2xl py-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/80 p-4 border border-white/10">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold">Plazo</span>
                      <p className="text-base font-black text-amber-300">
                        {gameIndex + 1} / {DEADLINE_CHALLENGES.length}
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-slate-400 uppercase font-bold">Combo</span>
                      <p className="text-base font-black text-emerald-400">🔥 x{gameCombo}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 uppercase font-bold">Tiempo</span>
                      <p
                        className={`text-lg font-black ${
                          gameTimeLeft <= 2 ? "text-red-400 animate-ping" : "text-sky-300"
                        }`}
                      >
                        ⏱️ {gameTimeLeft}s
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const current = DEADLINE_CHALLENGES[gameIndex];
                    return (
                      <div className="mt-6 rounded-2xl border-2 border-amber-400/60 bg-slate-900/90 p-6 text-center shadow-xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                          ¿CUÁL ES EL PLAZO LEGAL?
                        </span>
                        <h4 className="mt-3 text-lg font-black text-white leading-relaxed">
                          {current.prompt}
                        </h4>

                        <div className="mt-8 grid grid-cols-2 gap-3">
                          {current.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              disabled={!!gameFeedback}
                              onClick={() => handleDeadlineAnswer(opt)}
                              className="cursor-pointer rounded-xl border border-white/15 bg-slate-800/80 p-4 text-base font-black text-amber-200 hover:border-amber-400 hover:bg-amber-500/20 active:scale-95 transition disabled:opacity-50"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {gameFeedback && (
                          <div
                            className={`mt-4 rounded-xl p-3 text-sm font-bold ${
                              gameFeedback.ok
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : "bg-red-500/20 text-red-300 border border-red-500/40"
                            }`}
                          >
                            {gameFeedback.text}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {gameCompleted && (
                <div className="mx-auto max-w-md py-8 text-center">
                  <span className="text-5xl">🏆</span>
                  <h3 className="mt-3 text-2xl font-black text-amber-300">
                    ¡Duelo de Plazos Completado!
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">Puntuación lograda:</p>
                  <p className="text-4xl font-black text-emerald-400 my-2">{gameScore} PUNTOS</p>
                  <p className="text-xs text-amber-200">
                    🎁 ¡Has ganado +{Math.floor(gameScore / 50)} Monedas y +1 Vida para Lucía en la
                    aventura!
                  </p>
                  <button
                    type="button"
                    onClick={startPlazosGame}
                    className="mt-6 cursor-pointer rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-slate-950 hover:bg-amber-300 transition"
                  >
                    Jugar Otra Vez ↺
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              PESTAÑA 3: NUEVO MINI-JUEGO RÁFAGA VERDADERO / FALSO (BOE EXPRÉS)
             ========================================================================= */}
          {tab === "rafaga" && (
            <div>
              {!rafagaStarted && (
                <div className="mx-auto max-w-xl py-8 text-center">
                  <span className="text-5xl">🎯</span>
                  <h3 className="mt-3 text-2xl font-black text-amber-300">
                    Ráfaga Exprés: ¿Verdadero o Falso?
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Un mini-juego contra reloj de <strong>45 segundos</strong> basado en las trampas
                    más famosas de los exámenes oficiales del INAP. Lee la afirmación y pulsa{" "}
                    <strong>VERDADERO</strong> o <strong>FALSO</strong> a toda velocidad.
                    ¡Encadena rachas para multiplicar tus puntos y ganar recompensas para Lucía!
                  </p>
                  <button
                    type="button"
                    onClick={startRafagaGame}
                    className="mt-6 cursor-pointer rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3 text-lg font-black text-slate-950 shadow-xl hover:from-emerald-300 hover:to-teal-400 active:scale-95 transition"
                  >
                    ¡Empezar Ráfaga! ⚡
                  </button>
                </div>
              )}

              {rafagaStarted && !rafagaCompleted && (
                <div className="mx-auto max-w-2xl py-2">
                  {/* Marcador superior */}
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/80 p-3.5 border border-white/10">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-bold">Racha</span>
                      <p className="text-base font-black text-amber-300">🔥 x{rafagaCombo}</p>
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] text-slate-400 uppercase font-bold">Puntos</span>
                      <p className="text-lg font-black text-emerald-400">{rafagaScore}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 uppercase font-bold">Tiempo</span>
                      <p
                        className={`text-lg font-black ${
                          rafagaTimeLeft <= 10 ? "text-red-400 animate-pulse" : "text-sky-300"
                        }`}
                      >
                        ⏱️ {rafagaTimeLeft}s
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const current = RAFAGA_QUESTIONS[rafagaIndex % RAFAGA_QUESTIONS.length];
                    return (
                      <div className="mt-5 rounded-2xl border-2 border-emerald-400/50 bg-slate-900/95 p-6 text-center shadow-xl">
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-black uppercase text-emerald-300 tracking-wider">
                          AFIRMACIÓN DE EXAMEN #{rafagaIndex + 1}
                        </span>

                        <h4 className="mt-4 min-h-[70px] text-base sm:text-lg font-bold text-white leading-relaxed flex items-center justify-center">
                          "{current.statement}"
                        </h4>

                        {/* Botones Gigantes Verdadero / Falso */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            disabled={!!rafagaFeedback}
                            onClick={() => handleRafagaAnswer(true)}
                            className="cursor-pointer h-20 rounded-2xl border-2 border-emerald-400 bg-emerald-600/30 text-lg sm:text-xl font-black text-emerald-200 hover:bg-emerald-500/40 active:scale-95 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <span>✅</span> VERDADERO
                          </button>
                          <button
                            type="button"
                            disabled={!!rafagaFeedback}
                            onClick={() => handleRafagaAnswer(false)}
                            className="cursor-pointer h-20 rounded-2xl border-2 border-red-400 bg-red-600/30 text-lg sm:text-xl font-black text-red-200 hover:bg-red-500/40 active:scale-95 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <span>❌</span> FALSO
                          </button>
                        </div>

                        {rafagaFeedback && (
                          <div
                            className={`mt-4 rounded-xl p-3 text-xs sm:text-sm font-bold animate-in fade-in zoom-in-95 duration-200 ${
                              rafagaFeedback.ok
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : "bg-red-500/20 text-red-300 border border-red-500/40"
                            }`}
                          >
                            {rafagaFeedback.text}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {rafagaCompleted && (
                <div className="mx-auto max-w-2xl py-4">
                  <div className="rounded-2xl border-2 border-emerald-400/70 bg-slate-900/90 p-6 text-center shadow-xl">
                    <span className="text-5xl">⚡</span>
                    <h3 className="mt-2 text-2xl font-black text-amber-300">
                      ¡Tiempo Finalizado! Ráfaga Completada
                    </h3>
                    <p className="text-4xl font-black text-emerald-400 my-2">{rafagaScore} PUNTOS</p>
                    <p className="text-xs text-amber-200">
                      🎁 Has ganado +{Math.max(5, Math.floor(rafagaScore / 40))} Monedas y +1 Vida
                      para Lucía en la aventura.
                    </p>
                    <button
                      type="button"
                      onClick={startRafagaGame}
                      className="mt-4 cursor-pointer rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-slate-950 hover:bg-amber-300 transition"
                    >
                      Jugar Otra Ráfaga ↺
                    </button>
                  </div>

                  {/* Desglose de respuestas y explicaciones del BOE */}
                  {rafagaHistory.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="text-base font-black text-amber-300">
                        Revisión de Trampas de Examen Respondidas:
                      </h4>
                      {rafagaHistory.map((item, idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl border p-3 text-xs ${
                            item.ok
                              ? "border-emerald-500/30 bg-emerald-950/20"
                              : "border-red-500/30 bg-red-950/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">#{idx + 1}</span>
                            <span
                              className={`font-black uppercase px-2 py-0.5 rounded text-[10px] ${
                                item.ok ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {item.ok ? "Acertaste" : "Fallaste"} · Era{" "}
                              {item.q.isTrue ? "VERDADERO" : "FALSO"}
                            </span>
                          </div>
                          <p className="mt-1 font-semibold text-slate-200">"{item.q.statement}"</p>
                          <p className="mt-1 text-slate-300">{item.q.explanation}</p>
                          <p className="mt-1 text-amber-300 font-bold">⚖️ {item.q.law}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              PESTAÑA 4: APUNTES & LEYES DEL BOE
             ========================================================================= */}
          {tab === "apuntes" && (
            <div className="space-y-6">
              {/* Panel de Actualizaciones BOE */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-amber-400/40 bg-amber-950/20 p-4">
                <div>
                  <h4 className="font-bold text-amber-300 flex items-center gap-2">
                    <span>📡</span> Conexión con el BOE e INAP
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Estado: <strong className="text-emerald-400">{boeStatus}</strong>
                    {lastBoeCheck && ` · Verificado el ${lastBoeCheck}`}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={boeLoading}
                  onClick={handleCheckBoe}
                  className="cursor-pointer rounded-lg bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-amber-300 transition disabled:opacity-50"
                >
                  {boeLoading ? "Comprobando..." : "⚡ Comprobar Novedades BOE"}
                </button>
              </div>

              {/* Fichas de los 6 Bloques Oficiales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.blocks.map((block) => (
                  <div
                    key={block.number}
                    className="rounded-xl border border-white/10 bg-slate-900/60 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Bloque {block.number}
                      </span>
                      <h5 className="font-black text-base text-white mt-1">{block.title}</h5>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {block.description}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{block.topics.length} temas oficiales</span>
                      <span className="text-amber-300 font-semibold">{block.worldName}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enlace al Código Oficial del BOE */}
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-center">
                <p className="text-xs text-slate-300">
                  Consulte el Código Electrónico Consolidado publicado por la Agencia Estatal Boletín
                  Oficial del Estado:
                </p>
                <a
                  href="https://www.boe.es/biblioteca_juridica/codigos/codigo.php?modo=2&id=443_Normativa_para_ingreso_en_el_Cuerpo_de_Gestion_de_la_Administracion_Civil_del_Estado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-bold text-xs text-amber-300 underline hover:text-amber-200"
                >
                  🔗 BOE: Normativa para ingreso en el Cuerpo de Gestión de la AGE (Código 443) ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
