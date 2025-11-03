import { obterTaxaTributacaoRegressiva, obterTaxaTributacaoTradicional } from "../tax";
import type { TaxStrategy } from "./strategy";

export class VGBLProgressivaStrategy implements TaxStrategy {
    calculate(rendimento: number, periodoAnos: number, montante: number) {
        const aliquota = obterTaxaTributacaoTradicional(periodoAnos); // VGBL Progressiva follows the traditional table
        const valorRetidoIR = rendimento * aliquota;
        const montanteDepoisIR = montante - valorRetidoIR;

        return {
            montanteDepoisIR,
            valorRetidoIR,
            aliquota: aliquota * 100
        };
    }
}

export class VGBLRegressivaStrategy implements TaxStrategy {
    calculate(rendimento: number, periodoAnos: number, montante: number) {
        const aliquota = obterTaxaTributacaoRegressiva(periodoAnos);
        const valorRetidoIR = rendimento * aliquota;
        const montanteDepoisIR = montante - valorRetidoIR;

        return {
            montanteDepoisIR,
            valorRetidoIR,
            aliquota: aliquota * 100
        };
    }
}
