export function calculoAporteMensal(rendimentomensal: number, taxaJurosAnual: number, periodoAnos: number){
    const taxaJurosMensal = (taxaJurosAnual/100) / 12;
    const montanteFuturo = rendimentomensal/taxaJurosMensal;
    console.log('montante: '+ montanteFuturo.toFixed(2));
    const periodoMeses = getMeses(periodoAnos).length;
    // ! Esta formula abaixo esta dando um valor menor do que o serio realmente o necessario para o montante futuro
    const depositomensal = rendimentomensal / ((1 + taxaJurosMensal)**periodoMeses)-1 ;//formula de aporte futuro FV*i/(1+i)**n - 1
    return {
      depositoMensal: parseFloat(depositomensal.toFixed(2)),
      montanteFuturo: montanteFuturo
    }
}

export function obterMontanteFuturoNoTempo(aporteMensal: number, taxaJurosAnual: number, periodoAnos: number){
  const taxaJurosMensal = (taxaJurosAnual/100) / 12;
  const periodoMeses = getMeses(periodoAnos).length;
  const montanteFuturo = aporteMensal * ((1+taxaJurosMensal)**periodoMeses - 1)/taxaJurosMensal;
  return parseFloat(montanteFuturo.toFixed(2));
}

export function getMeses(periodoAnos:number){
    const meses: string[] = [];
    for (let i = 1; i <= periodoAnos * 12; i++) {
      meses.push(`${i}`);
    }
    return meses;
}