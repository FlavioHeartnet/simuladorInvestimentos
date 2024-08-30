import { describe, expect, test } from "vitest";
import { calculoAporteMensal, obterMontanteFuturoNoTempo } from "./profitabilitycalc";

describe('test profitability', ()=> {
    test('Deve receber rendimento, juros anual e periodo em anos e retornar aporte mensal ', () => {
        const aporte = calculoAporteMensal(2271.20,13,20);
        console.log(aporte);
        expect(aporte).toEqual(170.07);
    });
    test('Deve receber aporte mensal, juros anual e periodo em anos e retornar montante futuro ', () => {
        const aporte = obterMontanteFuturoNoTempo(185,13,20);
        console.log(aporte);
        expect(aporte).not.toBe(0)
    });
});