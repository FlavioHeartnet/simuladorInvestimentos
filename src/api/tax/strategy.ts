export interface TaxStrategy {
  calculate(rendimento: number, periodoAnos: number, montante: number): {
    montanteDepoisIR: number;
    valorRetidoIR: number;
    aliquota: number;
  };
}
