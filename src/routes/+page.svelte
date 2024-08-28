<script>
	import { fade, fly } from 'svelte/transition';
	import { SimuladorInvestimentos } from '../api/main';
    import Input from './../components/input.svelte'
    import { IconMoneybag } from '@tabler/icons-svelte';
	import { FirebaseConfig } from '../api/firebase';
	
    let initialInvestment = '';
    let monthlyInvestment = '';
    let yearlytax = '';
    let period = '';
    let brokerageFee = '';
    let isComeCotas = false;
    let isSuccess = false;
    export let data;
    const firebaseInit = new FirebaseConfig(data.apiKey, data.authDomain, data.projectId,data.storageBucket,data.messagingSenderId, data.appId, data.measurementId);
    firebaseInit.logEvents
    /**
	 * @type {{ ""?: any; montante: string; rendimento: string; valorInvestido: string; montanteDepoisIR: string; valorRetidoIR?: string; aliquota: string; valorRetidoComeCotas: string; tabelaDetalhada?: { meses: string[]; montantes: string[]; rendimentosMensais: string[]; valoresInvestidos: string[]; }; jurosRealAliquotaAnual: string; rendimentoMensal: string; montanteDepoisIPCA: string; }}
	 */
    let result;
     const handleSubmit = () => {
        const customSegments = {
            brokerageFee: brokerageFee,
            period: period,
            yearlytax: yearlytax,
            initialInvestment: initialInvestment,
            monthlyInvestment: monthlyInvestment,
            isComeCotas: isComeCotas,
        }
        firebaseInit.logEvents("calc_button_tapped");
        if(brokerageFee == ''){
            brokerageFee = '0';
        }
        if(parseFloat(brokerageFee) > 0){
            firebaseInit.logEvents("brokerageFee_provided", {segments: customSegments}); 
        }
        if(isComeCotas){
            firebaseInit.logEvents("comecotas_provided", {segments: customSegments}); 
        }

        const simulator = new SimuladorInvestimentos(parseFloat(initialInvestment),parseFloat(monthlyInvestment),parseFloat(yearlytax),parseFloat(period),parseFloat(brokerageFee), isComeCotas)
        try{
            result = simulator.calcularJurosCompostos();
            isSuccess = true;
            firebaseInit.logEvents("simulation_successful", {segments: customSegments});
        }catch (e){
            firebaseInit.logEvents("simulation_failed", {error: e, segments: customSegments});
        }
        
        
     }  
     // @ts-ignore
    function scrollIntoView({ target }) {
        handleSubmit();

		window.setTimeout(() => {
            const el = document.querySelector(target.getAttribute('href'));
            if (!el) return;
            el.scrollIntoView({
            behavior: 'smooth'
            });
        }, 50)
  }
  // @ts-ignore
  function scrollToTopAndCleanFields({ target }) {
    firebaseInit.logEvents("clearFields_button_tapped");
    isSuccess = false;
    initialInvestment = '';
    monthlyInvestment = '';
    yearlytax = '';
    period = '';
    brokerageFee= '';
    isComeCotas = false;
    const el = document.querySelector(target.getAttribute('href'));
            if (!el) return;
            el.scrollIntoView({
            behavior: 'smooth'
            });
  }
 
</script>
<div id="begin" class="min-h-screen w-full md:h-full md:flex md:items-center md:place-content-center">
<div class="container p-4">
    <div transition:fly={{
        delay: 300,
        duration: 2000
    }} class="flex items-center justify-center">
        <IconMoneybag size={80}/>
    </div>
    <h1 transition:fly={{
        delay: 400,
        duration: 2000
    }} class="text-2xl mt-1">Simulador de Investimentos</h1>
    <p transition:fly={{
        delay: 500,
        duration: 2000
    }}>Faça projeções sobre quanto seu dinheiro irá render, calculo de impostos e taxas de corretagens e rendimento mensal para aposentadoria(baseado no valor deduzido imposto de renda e levando em consideração o juros informado abaixo).</p>
    <br/>
    <form transition:fly={{
        delay: 600,
        duration: 2000
    }}>
        <Input type='number'bind:value={initialInvestment} name='initialInvestment' label='Valor Inicial' placeholder='Digite o valor inicial' required />
        <Input type='number' bind:value={monthlyInvestment} name='monthlyInvestment' label='Aporte mensal' placeholder='Digite o valor mensal' required />
        <Input type='number' bind:value={yearlytax} name='yearlytax' mask='00,0000' label='Juros anual (Ex: 11.28)' placeholder='Taxa de juros anual ' required />
        <Input type='number' bind:value={period} name='period' mask='0000' label='Quantos anos? (para meses: 0.7 -> mes 7)' placeholder='Periodo do investimento' required />
        <Input type='number' bind:value={brokerageFee} name='brokerageFee' mask='0,0000' label='Taxa de custodia anual (Opcional) (Ex: 0.7)' placeholder='Taxa de custodia do banco ou instituição financeira ' />
        <label class="font-bold">
            <input type="checkbox" bind:checked={isComeCotas} />
            Seu investimento esta sujeito ao come cotas?(renda fixa, cambiais ou multimercados)
        </label>

        <div transition:fly={{
            delay: 700,
            duration: 2000
        }}
         class="mx-auto text-center mt-5 flex gap-4">
            <a href="#success" 
            on:click|preventDefault={scrollIntoView}
            class="flex-auto w-full
            font-jakarta
            rounded-lg
            bg-blue-modernize hover:bg-blue-modernize-dark text-white 
            py-2.5
            px-4
            transition
            mb-2">Simular</a>
          <a href="#begin" 
            on:click|preventDefault={scrollToTopAndCleanFields}
            class="flex-auto w-full
            font-jakarta
            rounded-lg
            bg-slate-200 hover:bg-blue-modernize-dark hover:text-white text-blue-modernize 
            py-2.5
            px-4
            transition
            mb-2">
          Limpar
          </a>
        </div>
 
    </form>
    {#if isSuccess}
    <section id="success" transition:fade={{
        delay: 200,
        duration: 300
    }}>
        <div class="flex flex-wrap gap-4 mt-5">
            <div class="flex-auto w-full mt-5 md:w-24">
                <p class="text-xl">Montante total final:</p>
                <p class="lg:text-3xl text-xl text-green-400 font-bold">R$ {result.montante}</p>
            </div>
             <div class="flex-auto w-full mt-5 md:w-24">
                <p class="text-xl">Rendimento mensal:</p>
                <p class="lg:text-3xl text-xl text-green-600 font-bold">R$ {result.rendimentoMensal}</p>
            </div>

            <div class="flex-auto w-full mt-5  md:w-24">
                <p class="text-xl">Rendimento em juros:</p>
                <p class="lg:text-3xl text-xl text-blue-400 font-bold">R$ {result.rendimento}</p>
            </div>
            <div class="flex-auto w-full mt-5  md:w-24">
                <p class="text-xl">Valor total investido:</p>
                <p class=" lg:text-3xl text-xl text-yellow-400 font-bold">R$ {result.valorInvestido}</p>
            </div>
        </div>
        <div class="flex flex-wrap gap-4 mt-5">
            <div class="flex-auto mt-5 w-full">
                <p class="font-bold ">Caso seu investimento incida imposto de renda:</p>
            </div>
            <div class="flex-auto mt-5">
                <p class="text-xl">Valor líquido a receber:</p>
                <p class="lg:text-2xl text-xl text-red-400 font-bold">R$ {result.montanteDepoisIR}</p>
            </div>
            <div class="flex-auto mt-5  md:w-24">
                <p class="text-xl">Aliquota:</p>
                <p class="lg:text-2xl text-xl text-red-400 font-bold">{result.aliquota}%</p>
            </div>
            <div class="flex-auto mt-5  md:w-24">
                <p class="text-xl">Imposto de renda:</p>
                <p class="lg:text-2xl text-xl text-red-300 font-bold">- R$ {result.valorRetidoIR}</p>
            </div>
            <div class="flex-auto mt-5  md:w-24">
                <p class="text-xl">Quanto voce teria levando em conta a inflação</p>
                <p class="lg:text-2xl text-xl text-red-400 font-bold"> R$ {result.montanteDepoisIPCA}</p>
            </div>
            {#if parseFloat(result.valorRetidoComeCotas) > 0}
                <div class="flex-auto w-full md:w-24 mt-5">
                    <p class="text-xl">Come cotas:</p>
                    <p class="lg:text-2xl text-xl  text-red-300 font-bold">- R$ {result.valorRetidoComeCotas}</p>
                </div>
                <div class="flex-auto w-full md:w-24 mt-5">
                    <p class="text-xl">Juros Real Anual:</p>
                    <p class="lg:text-2xl text-xl text-red-300 font-bold">%{result.jurosRealAliquotaAnual}</p>
                </div>
            {/if}
        </div>
    </section>
    
    {/if}
</div>
</div>
