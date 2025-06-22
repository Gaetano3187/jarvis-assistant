export interface ScorteResult {
  consumoStimato: number;
  tempoRimanente: number;
}

export function calcolaScorte(
  data_acquisto: Date,
  quantita: number,
  scadenza: Date,
  data_attuale: Date
): ScorteResult {
  const total = scadenza.getTime() - data_acquisto.getTime();
  if (total <= 0) {
    return { consumoStimato: 100, tempoRimanente: 0 };
  }
  const elapsed = data_attuale.getTime() - data_acquisto.getTime();
  const consumo = Math.min(100, Math.max(0, (elapsed / total) * 100));
  const remaining = Math.max(0, Math.min(100, (scadenza.getTime() - data_attuale.getTime()) / total * 100));
  return {
    consumoStimato: parseFloat(consumo.toFixed(2)),
    tempoRimanente: parseFloat(remaining.toFixed(2)),
  };
}
