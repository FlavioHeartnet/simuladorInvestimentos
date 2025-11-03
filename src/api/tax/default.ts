import { obterTaxaTributacaoTradicional } from "../tax";
import type { TaxStrategy } from "./strategy";

export class DefaultTaxStrategy implements TaxStrategy {
    calculate(rendimento: number, periodoAnos: number, montante: number) {
        const aliquota = obterTaxaTributacaoTradicional(periodoAnos);
        const valorRetidoIR = rendimento * aliquota;
        const montanteDepoisIR = montante - valorRetidoIR;

        return {
            montanteDepoisIR,
            valorRetidoIR,
            aliquota: aliquota * 100
        };
    }
}
