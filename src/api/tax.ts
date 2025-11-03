export function obterTaxaTributacaoRegressiva(anos: number): number {
    if (anos <= 2) {
      return 0.35; // 35%
    } else if (anos > 2 && anos <= 4) {
      return 0.30; // 30%
    } else if (anos > 4 && anos <= 6) {
      return 0.25; // 25%
    } else if (anos > 6 && anos <= 8) {
      return 0.20; // 20%
    } else if (anos > 8 && anos <= 10) {
      return 0.15; // 15%
    } else {
      return 0.10; // 10% para acima de 10 anos
    }
  }

  export function obterTaxaTributacaoProgressiva(renda: number): number {
    if (renda <= 2112) {
      return 0.0; // 0% isento
    } else if (renda > 2112.01 && renda <= 2826.65) {
      return 0.075; // 7,5%
    } else if (renda > 2826.66 && renda <= 3751.05) {
      return 0.15; // 15%
    } else if (renda > 3751.06 && renda <= 4664.68 ) {
      return 0.225; // 22.5%
    } else {
      return 0.275; // 27.5%
    }
  }

  export function obterTaxaTributacaoTradicional(anos: number){
    let aliquota = 0.225; // 22,5%
    if(anos > 0.6 && anos <= 1) {
        aliquota = 0.20; // 20%
      }
      if(anos > 1 && anos <= 2) {
        aliquota = 0.175; // 17,5%
      }
      if(anos > 2) {
        aliquota = 0.15; // 15%
      }

      return aliquota;
  }

  export function obterAliquotaComeCotas(diasInvestidos: number): number {
    if (diasInvestidos <= 180) {
      return 0.225; // 22,5%
    } else if (diasInvestidos <= 360) {
      return 0.20; // 20%
    } else if (diasInvestidos <= 720) {
      return 0.175; // 17,5%
    } else {
      return 0.15; // 15%
    }
  }
