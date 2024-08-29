import { calcularMediaIpca, obterTaxaTributacaoRegressiva, obterTaxaTributacaoTradicional } from "./constants";

export function formatarNumero(numero: number): string {
    return numero.toFixed(2).replace(/\./g, ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
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
export type RendimentoAliquota = {
  rendimento: number;
  aliquota: number
}
export function calcImpostoSobrerendimento(rendimento: number, periodoAnos: number, isTributacaoRegressiva: boolean = false): RendimentoAliquota  {
    let aliquota = 0;
    if(isTributacaoRegressiva){
      aliquota = obterTaxaTributacaoRegressiva(periodoAnos);
    }else{
      aliquota = obterTaxaTributacaoTradicional(periodoAnos)
    }
    console.log(rendimento);
    const rendimentoDeduzidoImposto = rendimento - (aliquota * rendimento);
    console.log(rendimentoDeduzidoImposto);
    return {
      aliquota: aliquota * 100,
      rendimento: rendimentoDeduzidoImposto
    }
  }

  export function calculaComeCotas(){
    return 0;
  }
  export type SimulacaoOutPut = {
    montante: string;
    rendimento: string;
    rendimentoMensal:string;
    valorInvestido: string;
    montanteDepoisIR: string;
    valorRetidoIR: string;
    aliquota: string;
    valorRetidoComeCotas: string;
    jurosRealAliquotaAnual: string;
    montanteDepoisIPCA:string;
    tabelaDetalhada: {
      meses: string[];
      montantes: string[];
      rendimentosMensais: string[];
      valoresInvestidos: string[];
    };
  }

 export function calcularJurosCompostos(
    valorInicial: number,
    aporteMensal: number,
    taxaJurosAnual: number,
    periodoAnos: number,
    taxacorretagemAnual: number,
    temComeCotas: boolean,
    previdencia: string = '',
    tributacaoPrevidencia: string = ''
  ): SimulacaoOutPut {
    const taxaJurosDecimal = taxaJurosAnual / 12 / 100;
    const numeroPeriodos = periodoAnos < 1 ? periodoAnos * 10 : periodoAnos * 12;
    let montante = valorInicial;
    let rendimento = 0;
    const taxaCorretagemMensal = taxacorretagemAnual / 12 / 100; // Taxa de corretagem mensal
    let  impostoPagoComeCotas = 0; // Valor total de impostos pagos no come cotas
    let montanteDepoisIPCA =0;
    const mediaIPCA = (calcularMediaIpca(periodoAnos)/100);
    //guardar valores mensais
    const montantes: string[] = [];
    const rendimentosMensais: string[] = [];
    const valoresInvestidos: string[] = [];
    console.log(numeroPeriodos)
    for (let i = 1; i <= numeroPeriodos; i++) {
      montante = montante * (1 + taxaJurosDecimal); // juros do mês anterior
      montante = montante * (1 - taxaCorretagemMensal); // Deduz a taxa de corretagem
      montante += aporteMensal; // Adiciona o aporte mensal ao mês atual.
      montanteDepoisIPCA -= (montante * mediaIPCA)// ! isso esta errado precisa ser por anos e somar tudo no final
      montantes.push(formatarNumero(montante));
      rendimento = montante - valorInicial - aporteMensal * (i - 1);
      rendimentosMensais.push(formatarNumero(rendimento - aporteMensal));
      valoresInvestidos.push(formatarNumero(montante - rendimento));
      
      if(temComeCotas){
        if ((i + 1) % 6 === 0) {
          // Aplica o come-cotas a cada 6 meses
          const diasInvestidos = (i + 1) * 30; // Aproximadamente assumindo 30 dias por mês
          const aliquotaComeCotas = obterAliquotaComeCotas(diasInvestidos);
          const rendimentoSemImposto = montante - valorInicial - (aporteMensal * i);
          const impostoComeCotas = rendimentoSemImposto * aliquotaComeCotas;
          montante -= impostoComeCotas; impostoPagoComeCotas += impostoComeCotas;
        }
      }
    }
    let aliquota: number = 0;
    let valorRetidoIR = 0;
    let rendimentoMensal = 0;
    let montanteDepoisIR = 0
    if (previdencia == 'PGBL'){
      switch(tributacaoPrevidencia){
        case 'progressiva': aliquota = obterTaxaTributacaoTradicional(periodoAnos);
          break;
        case 'regressiva': aliquota = aliquota = obterTaxaTributacaoRegressiva(periodoAnos);
          break;
        default: aliquota = 0.15  
      }
      valorRetidoIR = montante * aliquota;
      montanteDepoisIR = montante - valorRetidoIR;
      aliquota*= 100;
      
    }else{
      const investimentoDeduzidoImposto = calcImpostoSobrerendimento(rendimento - aporteMensal, periodoAnos, tributacaoPrevidencia == 'regressiva');
      montanteDepoisIR = ((montante - rendimento) + aporteMensal) + investimentoDeduzidoImposto.rendimento;
      aliquota = investimentoDeduzidoImposto.aliquota;
      valorRetidoIR = rendimento - investimentoDeduzidoImposto.rendimento
    }
    const meses: string[] = [];
    for (let i = 1; i <= periodoAnos * 12; i++) {
      meses.push(`${i}`);
    }
    const taxaJurosMensal = taxaJurosAnual/100 / 12;
    rendimentoMensal = montanteDepoisIR * taxaJurosMensal;


    
    const valorInvestido = (montante - rendimento) + aporteMensal;
    const jurosrealAnual = (((Math.pow((montante/valorInvestido), 1/numeroPeriodos)) - 1) * 100) * 12;
  return {
      montante: formatarNumero(montante), 
      rendimento: formatarNumero(rendimento - aporteMensal), 
      valorInvestido: formatarNumero(valorInvestido), 
      montanteDepoisIR: formatarNumero(montanteDepoisIR), 
      aliquota: aliquota.toFixed(1),
      valorRetidoIR: formatarNumero(valorRetidoIR),
      valorRetidoComeCotas: formatarNumero(impostoPagoComeCotas),
      jurosRealAliquotaAnual: jurosrealAnual.toFixed(2),
      montanteDepoisIPCA: formatarNumero(montanteDepoisIPCA),
      tabelaDetalhada: {
        montantes: montantes,
        meses: meses,
        rendimentosMensais: rendimentosMensais,
        valoresInvestidos: valoresInvestidos,
      },
      rendimentoMensal: formatarNumero(rendimentoMensal),
      
    }
  }

  export function imprimirTabela(meses: string[], montantes: string[], totais: string[], valoresInvestidos: string[]): void {
    console.log('Mês\tMontante\tRendimento Mensal\tValor Mensal Investido');
    for (let i = 0; i < meses.length; i++) { console.log(`${meses[i]}\tR$${montantes[i]}\tR$${totais[i]}\t\tR$${valoresInvestidos[i]}`); } }
