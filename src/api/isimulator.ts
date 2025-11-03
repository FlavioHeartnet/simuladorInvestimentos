import type { FullSimulationOutput } from './types';

export interface ISimulator {
  calcular(params: SimulationParams): FullSimulationOutput;
}

export type SimulationParams = {
    valorInicial: number;
    aporteMensal: number;
    taxaJurosAnual: number;
    periodoAnos: number;
    taxacorretagemAnual: number;
    temComeCotas: boolean;
    previdencia: string;
    tributacaoPrevidencia: string;
    aposentadoria: number;
};
