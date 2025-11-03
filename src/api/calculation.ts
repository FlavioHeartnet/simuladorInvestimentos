import { calculoAporteMensal } from "./profitabilitycalc";
import { formatarNumero } from "./formatting";
import { calcularMediaIpca } from "./ipca";
import { obterAliquotaComeCotas } from "./tax";
import { getTaxStrategy } from "./tax/factory";
import type { FullSimulationOutput } from "./types";
import type { SimulationParams } from "./isimulator";

 export function calcularJurosCompostos(params: SimulationParams): FullSimulationOutput {
    const {
        valorInicial,
        aporteMensal: initialAporteMensal,
        taxaJurosAnual,
        periodoAnos,
        taxacorretagemAnual,
        temComeCotas,
        previdencia,
        tributacaoPrevidencia,
        aposentadoria
    } = params;

    let aporteMensal = initialAporteMensal;
    const taxaJurosDecimal = taxaJurosAnual / 12 / 100;
    const numeroPeriodos = periodoAnos < 1 ? periodoAnos * 10 : periodoAnos * 12;
    let montante = valorInicial;
    let rendimento = 0;
    const taxaCorretagemMensal = taxacorretagemAnual / 12 / 100;
    let impostoPagoComeCotas = 0;
    let montanteDepoisIPCA = 0;
    const mediaIPCA = (calcularMediaIpca(periodoAnos) / 100);
    
    const montantes: string[] = [];
    const rendimentosMensais: string[] = [];
    const valoresInvestidos: string[] = [];

    if (aposentadoria > 0) {
        const aposentadoriaInfo = calculoAporteMensal(aposentadoria, taxaJurosAnual, periodoAnos);
        montante = aposentadoriaInfo.montanteFuturo;
        rendimento = aposentadoria;
        aporteMensal = aposentadoriaInfo.depositoMensal;
    } else {
        for (let i = 1; i <= numeroPeriodos; i++) {
            montante *= (1 + taxaJurosDecimal);
            montante *= (1 - taxaCorretagemMensal);
            montante += aporteMensal;
            montanteDepoisIPCA -= (montante * mediaIPCA);
            
            montantes.push(formatarNumero(montante));
            rendimento = montante - valorInicial - aporteMensal * (i - 1);
            rendimentosMensais.push(formatarNumero(rendimento - aporteMensal));
            valoresInvestidos.push(formatarNumero(montante - rendimento));

            if (temComeCotas) {
                if ((i + 1) % 6 === 0) {
                    const diasInvestidos = (i + 1) * 30;
                    const aliquotaComeCotas = obterAliquotaComeCotas(diasInvestidos);
                    const rendimentoSemImposto = montante - valorInicial - (aporteMensal * i);
                    const impostoComeCotas = rendimentoSemImposto * aliquotaComeCotas;
                    montante -= impostoComeCotas;
                    impostoPagoComeCotas += impostoComeCotas;
                }
            }
        }
    }

    const taxStrategy = getTaxStrategy(previdencia, tributacaoPrevidencia);
    const { montanteDepoisIR, valorRetidoIR, aliquota } = taxStrategy.calculate(rendimento - aporteMensal, periodoAnos, montante);

    const meses: string[] = [];
    for (let i = 1; i <= periodoAnos * 12; i++) {
        meses.push(`${i}`);
    }
    
    const taxaJurosMensal = taxaJurosAnual / 100 / 12;
    const rendimentoMensal = montanteDepoisIR * taxaJurosMensal;
    const valorInvestido = (montante - rendimento) + aporteMensal;
    const jurosrealAnual = (((Math.pow((montante / valorInvestido), 1 / numeroPeriodos)) - 1) * 100) * 12;

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
        aporteMensais: formatarNumero(aporteMensal),
        tabelaDetalhada: {
            montantes: montantes,
            meses: meses,
            rendimentosMensais: rendimentosMensais,
            valoresInvestidos: valoresInvestidos,
        },
        rendimentoMensal: formatarNumero(rendimentoMensal),
    };
}
