export const ipcaData = [
    { ano: "1981", ipca: "67.55" },
    { ano: "1982", ipca: "73.15" },
    { ano: "1983", ipca: "101.45" },
    { ano: "1984", ipca: "118.37" },
    { ano: "1985", ipca: "127.04" },
    { ano: "1986", ipca: "59.91" },
    { ano: "1987", ipca: "164.79" },
    { ano: "1988", ipca: "264.11" },
    { ano: "1989", ipca: "354.09" },
    { ano: "1990", ipca: "350.35" },
    { ano: "1991", ipca: "189.82" },
    { ano: "1992", ipca: "278.23" },
    { ano: "1993", ipca: "373.79" },
    { ano: "1994", ipca: "275.84" },
    { ano: "1995", ipca: "20.41" },
    { ano: "1996", ipca: "9.18" },
    { ano: "1997", ipca: "5.11" },
    { ano: "1998", ipca: "1.65" },
    { ano: "1999", ipca: "8.60" },
    { ano: "2000", ipca: "5.83" },
    { ano: "2001", ipca: "7.42" },
    { ano: "2002", ipca: "11.90" },
    { ano: "2003", ipca: "8.95" },
    { ano: "2004", ipca: "7.35" },
    { ano: "2005", ipca: "5.55" },
    { ano: "2006", ipca: "3.10" },
    { ano: "2007", ipca: "4.37" },
    { ano: "2008", ipca: "5.75" },
    { ano: "2009", ipca: "4.23" },
    { ano: "2010", ipca: "5.76" },
    { ano: "2011", ipca: "6.32" },
    { ano: "2012", ipca: "5.69" },
    { ano: "2013", ipca: "5.76" },
    { ano: "2014", ipca: "6.23" },
    { ano: "2015", ipca: "10.19" },
    { ano: "2016", ipca: "6.12" },
    { ano: "2017", ipca: "2.91" },
    { ano: "2018", ipca: "3.69" },
    { ano: "2019", ipca: "4.23" },
    { ano: "2020", ipca: "4.44" },
    { ano: "2021", ipca: "9.63" },
    { ano: "2022", ipca: "5.66" },
    { ano: "2023", ipca: "4.53" }
  ];

  export function calcularMediaIpca(anos: number): number {
    if (anos > ipcaData.length || anos <= 0) {
      throw new Error("Número de anos inválido");
    }
  
    // Obter os últimos 'n' anos de dados de IPCA
    const dadosRecentes = ipcaData.slice(-anos);
  
    // Calcular a soma dos valores de IPCA
    const soma = dadosRecentes.reduce((total, dado) => total + parseFloat(dado.ipca), 0);
  
    // Retornar a média
    return soma / anos;
  }