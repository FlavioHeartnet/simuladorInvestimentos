export function calculoAporteMensal(rendimentomensal: number, taxaJurosAnual: number, periodoAnos: number){
    const taxaJurosMensal = taxaJurosAnual/100 / 12;
    const montanteFuturo = (rendimentomensal/taxaJurosMensal).toFixed(2);
    console.log('montante: '+ montanteFuturo)
    const depositomensal = (parseFloat(montanteFuturo) * taxaJurosMensal) / Math.pow(1 + taxaJurosMensal,getMeses(periodoAnos).length)-1;
    return depositomensal;
}

export function getMeses(periodoAnos:number){
    const meses: string[] = [];
    for (let i = 1; i <= periodoAnos * 12; i++) {
      meses.push(`${i}`);
    }
    return meses;
}