import { calcularJurosCompostos } from './calculation';
import type { ISimulator, SimulationParams } from './isimulator';
import type { FullSimulationOutput } from './types';


export class SimuladorInvestimentos implements ISimulator {
  
  calcular(params: SimulationParams): FullSimulationOutput {
    return calcularJurosCompostos(params); 
  }
}