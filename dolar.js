const dados = fetch('https://economia.awesomeapi.com.br/last/USD-BRL').then(resposta => {

    return resposta.json()

}).then(corpo => {
   const name = corpo.USDBRL.name
   const hoje = corpo.USDBRL.ask
   
   var nomeMoeda = document.getElementById('moeda')
   var valorMoeda = document.getElementById('valoragora')
   nomeMoeda.textContent = name
   valorMoeda.textContent = `U$ 1,00 = R$ ${Math.abs(hoje).toFixed(2)}`   
   
})
