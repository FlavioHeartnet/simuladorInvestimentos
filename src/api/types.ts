export type SimulationCoreResult = {
  montante: string;
  rendimento: string;
  valorInvestido: string;
};

export type TaxResult = {
  montanteDepoisIR: string;
  valorRetidoIR: string;
  aliquota: string;
};

export type ComeCotasResult = {
  valorRetidoComeCotas: string;
  jurosRealAliquotaAnual: string;
};

export type FullSimulationOutput = SimulationCoreResult & TaxResult & ComeCotasResult & {
  rendimentoMensal: string;
  montanteDepoisIPCA:string;
  aporteMensais: string;
  tabelaDetalhada: {
    meses: string[];
    montantes: string[];
    rendimentosMensais: string[];
    valoresInvestidos: string[];
  };
};
