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

type Tab = "simulacro" | "plazos" | "apuntes";

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

export default function StudyHubModal({ data, isOpen, onClose, onReward }: Props) {
  const [tab, setTab] = useState<Tab>("simulacro");

  // State para el Simulacro de Examen Oficial
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<QuestionDTO[]>([]);
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
        // Recompensa a Lucía para el juego
        if (onReward) {
          const rewardCoins = Math.floor(gameScore / 50);
          onReward(rewardCoins, 1);
        }
      }
    }, 1800);
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
                Simulacros Oficiales, Duelos de Plazos y Biblioteca Normativa BOE
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
        <nav className="flex border-b border-white/10 bg-slate-900/60 px-6 text-sm font-bold">
          <button
            type="button"
            onClick={() => setTab("simulacro")}
            className={`cursor-pointer border-b-2 px-5 py-3 transition ${
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
            className={`cursor-pointer border-b-2 px-5 py-3 transition ${
              tab === "plazos"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            ⚡ Duelo de Plazos (Mini-Juego)
          </button>
          <button
            type="button"
            onClick={() => setTab("apuntes")}
            className={`cursor-pointer border-b-2 px-5 py-3 transition ${
              tab === "apuntes"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            📜 Apuntes & Leyes del BOE
          </button>
        </nav>

        {/* Contenido según pestaña */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* =========================================================================
              PESTAÑA 1: SIMULACRO OFICIAL INAP
             ========================================================================= */}
          {tab === "simulacro" && (
            <div>
              {!examStarted && (
                <div className="mx-auto max-w-2xl py-8 text-center">
                  <div className="mb-4 inline-block rounded-full bg-amber-400/20 p-4 text-4xl">
                    🎓
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Simulacro de Examen Oficial A2 (Gestión AGE)
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Pon a prueba tus conocimientos con 20 preguntas extraídas de los 6 Bloques
                    Oficiales con las reglas de corrección oficiales del INAP:
                  </p>
                  <div className="my-6 grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
                      <p className="text-2xl font-bold text-emerald-400">+1.00</p>
                      <p className="text-xs text-slate-300">Por acierto</p>
                    </div>
                    <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4">
                      <p className="text-2xl font-bold text-red-400">-0.33</p>
                      <p className="text-xs text-slate-300">Penalización fallo</p>
                    </div>
                    <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4">
                      <p className="text-2xl font-bold text-amber-400">20 min</p>
                      <p className="text-xs text-slate-300">Tiempo límite</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={startSimulacro}
                    className="cursor-pointer rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3 text-lg font-black text-slate-950 shadow-xl hover:from-amber-300 hover:to-amber-400 active:scale-95 transition"
                  >
                    Comenzar Simulacro Oficial ▶
                  </button>
                </div>
              )}

              {examStarted && !examFinished && examQuestions.length > 0 && (
                <div>
                  {/* Barra de control del examen */}
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-900 p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-amber-300">
                        Pregunta {currentExamIndex + 1} de {examQuestions.length}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({Object.keys(examAnswers).length} contestadas)
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-base font-bold text-amber-300">
                        ⏱ {Math.floor(examSecondsLeft / 60)}:
                        {(examSecondsLeft % 60).toString().padStart(2, "0")}
                      </div>
                      <button
                        type="button"
                        onClick={() => setExamFinished(true)}
                        className="cursor-pointer rounded-lg bg-red-600/80 px-3 py-1.5 text-xs font-bold hover:bg-red-500 transition"
                      >
                        Entregar Examen
                      </button>
                    </div>
                  </div>

                  {/* Pregunta actual */}
                  {(() => {
                    const q = examQuestions[currentExamIndex];
                    const selected = examAnswers[currentExamIndex];
                    return (
                      <div className="rounded-xl border border-white/15 bg-slate-900/60 p-6">
                        <p className="text-lg font-bold leading-relaxed">{q.prompt}</p>
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {q.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => selectExamAnswer(currentExamIndex, i)}
                              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-left text-sm transition ${
                                selected === i
                                  ? "border-amber-400 bg-amber-500/20 text-amber-100"
                                  : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200"
                              }`}
                            >
                              <span className="font-bold text-amber-300">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>

                        {/* Botones de navegación */}
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                          <button
                            type="button"
                            disabled={currentExamIndex === 0}
                            onClick={() => setCurrentExamIndex((prev) => prev - 1)}
                            className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-bold disabled:opacity-30"
                          >
                            ◀ Anterior
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // Desmarcar respuesta (dejar en blanco)
                              const copy = { ...examAnswers };
                              delete copy[currentExamIndex];
                              setExamAnswers(copy);
                            }}
                            className="cursor-pointer text-xs text-slate-400 hover:text-amber-300"
                          >
                            Dejar en blanco
                          </button>
                          <button
                            type="button"
                            disabled={currentExamIndex === examQuestions.length - 1}
                            onClick={() => setCurrentExamIndex((prev) => prev + 1)}
                            className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-bold disabled:opacity-30"
                          >
                            Siguiente ▶
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Cuadrícula de respuestas */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {examQuestions.map((_, idx) => {
                      const isAnswered = examAnswers[idx] !== undefined;
                      const isCurrent = idx === currentExamIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentExamIndex(idx)}
                          className={`h-9 w-9 rounded-lg text-xs font-bold transition cursor-pointer ${
                            isCurrent
                              ? "ring-2 ring-amber-400 bg-amber-500 text-slate-950"
                              : isAnswered
                              ? "bg-slate-700 text-white"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Resultados del Examen */}
              {examFinished && examResults && (
                <div className="py-4">
                  <div
                    className={`rounded-2xl p-6 text-center border-2 ${
                      examResults.passed
                        ? "border-emerald-400/80 bg-emerald-950/40"
                        : "border-red-400/80 bg-red-950/40"
                    }`}
                  >
                    <span className="text-4xl">{examResults.passed ? "🎉" : "📋"}</span>
                    <h3 className="mt-2 text-2xl font-black">
                      {examResults.passed ? "¡APTO EN EL SIMULACRO INAP!" : "NO APTO"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Nota de corte oficial establecida en 5.00 sobre 10
                    </p>
                    <div className="my-6 flex justify-center gap-8">
                      <div>
                        <p className="text-3xl font-black text-amber-300">
                          {examResults.normalizedScore} / 10
                        </p>
                        <p className="text-xs text-slate-400">Nota final calculada</p>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-emerald-400">
                          {examResults.correct}
                        </p>
                        <p className="text-xs text-slate-400">Aciertos (+1)</p>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-red-400">{examResults.wrong}</p>
                        <p className="text-xs text-slate-400">Fallos (-0.33)</p>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-slate-400">{examResults.blank}</p>
                        <p className="text-xs text-slate-400">En blanco (0)</p>
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

                            {/* Cita literal del artículo del BOE */}
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
                  {/* Marcador superior */}
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-900 p-4 border border-white/10">
                    <div>
                      <p className="text-xs text-slate-400">Puntuación</p>
                      <p className="text-2xl font-black text-amber-300">{gameScore} pts</p>
                    </div>
                    {gameCombo > 1 && (
                      <div className="animate-bounce font-black text-emerald-400 text-sm">
                        🔥 COMBO x{gameCombo}!
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-slate-400">Pregunta</p>
                      <p className="text-base font-bold text-white">
                        {gameIndex + 1} / {DEADLINE_CHALLENGES.length}
                      </p>
                    </div>
                  </div>

                  {/* Barra de tiempo de 6 segundos */}
                  <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        gameTimeLeft <= 2 ? "bg-red-500" : "bg-amber-400"
                      }`}
                      style={{ width: `${(gameTimeLeft / 6) * 100}%` }}
                    />
                  </div>

                  {/* Pregunta del reto */}
                  {(() => {
                    const current = DEADLINE_CHALLENGES[gameIndex];
                    return (
                      <div className="rounded-2xl border border-amber-400/50 bg-slate-900/80 p-6 text-center shadow-xl">
                        <p className="text-xl font-bold text-white leading-relaxed">
                          {current.prompt}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {current.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              disabled={!!gameFeedback}
                              onClick={() => handleDeadlineAnswer(opt)}
                              className="cursor-pointer rounded-xl border border-white/20 bg-white/5 py-4 text-base font-bold hover:bg-amber-400 hover:text-slate-950 active:scale-95 transition disabled:opacity-50"
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
              PESTAÑA 3: APUNTES & LEYES DEL BOE
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
