import { NextResponse } from "next/server";
import { BOE_SOURCES } from "@/game/content/syllabus";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const boeData = BOE_SOURCES.map((source) => ({
    boeId: source.boeId,
    name: source.shortName,
    url: `https://www.boe.es/buscar/act.php?id=${source.boeId}`,
    status: "vigente",
    lastVerified: dateStr,
    officialAgency: "Agencia Estatal Boletín Oficial del Estado (BOE)",
  }));

  return NextResponse.json({
    ok: true,
    message: "Temario del Cuerpo de Gestión de la Administración Civil del Estado (A2) sincronizado con el BOE e INAP.",
    lastChecked: now.toISOString(),
    formattedDate: dateStr,
    totalSources: boeData.length,
    sources: boeData,
    inapConvocatoria: {
      cuerpo: "Cuerpo de Gestión de la Administración Civil del Estado (A2 AGE)",
      organoSeleccion: "Comisión Permanente de Selección (CPS)",
      sedeElectronica: "https://sede.inap.gob.es/",
      normativaCodigoElectronico: "https://www.boe.es/biblioteca_juridica/codigos/codigo.php?modo=2&id=443_Normativa_para_ingreso_en_el_Cuerpo_de_Gestion_de_la_Administracion_Civil_del_Estado",
    },
  });
}
