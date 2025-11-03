import { obterTaxaTributacaoProgressiva, obterTaxaTributacaoRegressiva } from "../tax";
import type { TaxStrategy } from "./strategy";

export class PGBLProgressivaStrategy implements TaxStrategy {
    calculate(rendimento: number, periodoAnos: number, montante: number) {
        const aliquota = obterTaxaTributacaoProgressiva(rendimento); // This might need adjustment based on business rule for renda
        const valorRetidoIR = montante * aliquota;
        const montanteDepoisIR = montante - valorRetidoIR;

        return {
            montanteDepoisIR,
            valorRetidoIR,
            aliquota: aliquota * 100
        };
    }
}

export class PGBLRegressivaStrategy implements TaxStrategy {
    calculate(rendimento: number, periodoAnos: number, montante: number) {
        const aliquota = obterTaxaTributacaoRegressiva(periodoAnos);
        const valorRetidoIR = montante * aliquota;
        const montanteDepoisIR = montante - valorRetidoIR;

        return {
            montanteDepoisIR,
            valorRetidoIR,
            aliquota: aliquota * 100
        };
    }
}
