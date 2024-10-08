import { calcularJurosCompostos, type SimulacaoOutPut } from './helper';


export class SimuladorInvestimentos {
  valorInicial: number = 0;
  aporteMensal: number = 0;
  taxaJurosAnual: number = 0;
  periodoAnos: number = 0;
  taxacorretagemAnual: number = 0;
  temComeCotas: boolean = false;
  previdencia: string = '';
  tributacaoPrevidencia: string = '';
  retirement: number = 0;

  constructor(valorInicial: number, aporteMensal: number, taxaJurosMensal: number, periodoAnos:number, taxacorretagemAnual: number, retirement: number,temComeCotas: boolean, previdencia: string = '', tributacaoPrevidencia: string = ''){
    this.valorInicial = valorInicial;
    this.aporteMensal = aporteMensal;
    this.taxaJurosAnual = taxaJurosMensal;
    this.periodoAnos = periodoAnos;
    this.taxacorretagemAnual = taxacorretagemAnual;
    this.temComeCotas = temComeCotas;
    this.previdencia = previdencia;
    this.tributacaoPrevidencia = tributacaoPrevidencia
    this.retirement = retirement
  }

  calcularJurosCompostos(): SimulacaoOutPut {
    return calcularJurosCompostos(this.valorInicial, this.aporteMensal, this.taxaJurosAnual, this.periodoAnos, this.taxacorretagemAnual, this.temComeCotas, this.previdencia, this. tributacaoPrevidencia, this.retirement); 
  }
}
