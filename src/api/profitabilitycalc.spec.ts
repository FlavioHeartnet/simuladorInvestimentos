import { describe, expect, test } from "vitest";
import { calculoAporteMensal } from "./profitabilitycalc";

describe('test profitability', ()=> {
    test('Deve receber rendimento, juros anual e periodo em anos e retornar aporte mensal ', () => {
        const aporte = calculoAporteMensal(1763.55,13,20);
        console.log(aporte.toFixed(2));
        expect(aporte).not.toBe(0);
    });
});