import { DefaultTaxStrategy } from "./default";
import { PGBLProgressivaStrategy, PGBLRegressivaStrategy } from "./pgbl";
import type { TaxStrategy } from "./strategy";
import { VGBLProgressivaStrategy, VGBLRegressivaStrategy } from "./vgbl";

export function getTaxStrategy(previdencia: string, tributacao: string): TaxStrategy {
    if (previdencia === 'PGBL') {
        if (tributacao === 'progressiva') {
            return new PGBLProgressivaStrategy();
        }
        if (tributacao === 'regressiva') {
            return new PGBLRegressivaStrategy();
        }
    }

    if (previdencia === 'VGBL') {
        if (tributacao === 'progressiva') {
            return new VGBLProgressivaStrategy();
        }
        if (tributacao === 'regressiva') {
            return new VGBLRegressivaStrategy();
        }
    }

    return new DefaultTaxStrategy();
}
