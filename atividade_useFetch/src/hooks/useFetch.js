import { useState, useEffect } from "react";

// 4 - Custom Hook
// Um Custom Hook é só uma função que começa com "use" e pode usar
// outros hooks (useState, useEffect) por dentro. A ideia aqui é
// "empacotar" toda a lógica de buscar dados (GET) em um único lugar,
// para não precisar repetir esse código em todo componente que precisar
// buscar algo de uma API.
export const useFetch = (url) => {
    // Guarda os dados que vierem da API. Começa como null porque,
    // no primeiro instante, a requisição ainda nem foi feita.
    const [data, setData] = useState(null)

    // 5 - Loading
    // Controla se a busca ainda está em andamento. Começa em false
    // porque, tecnicamente, a requisição só começa dentro do useEffect,
    // que roda DEPOIS da primeira renderização.
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Definimos uma função async separada aqui dentro porque o
        // useEffect não pode receber uma função async diretamente
        // (ele espera que a função passada não retorne uma Promise).
        const fetchData = async () => {

            // 5 - Loading
            // Avisamos que a busca está começando — isso é o que faz
            // o componente mostrar "Carregando..." na tela.
            setLoading(true);

            // Faz a requisição GET para a URL recebida como parâmetro.
            const res = await fetch(url);

            // Converte a resposta (que chega em formato bruto) para
            // um objeto/array JavaScript que dá pra usar no React.
            const json = await res.json();

            // Guarda os dados recebidos no state "data".
            setData(json);

            // A busca terminou (com sucesso), então desligamos o loading.
            setLoading(false);
        };

        // Só declarar a função não executa nada — precisamos chamá-la.
        fetchData();

    // O array de dependências [url] é o "gatilho" que decide quando
    // esse efeito roda de novo: ele executa na primeira montagem do
    // componente e, depois, sempre que o valor de "url" mudar.
    // Se a url nunca mudar, o efeito roda só uma vez — evitando o
    // loop infinito de requisições.
    }, [url]);

    // O hook devolve tudo que o componente pode precisar:
    // - data: os dados buscados
    // - setData: permite ao componente atualizar a lista manualmente
    //   (útil depois de um POST, por exemplo — sem precisar de um novo GET)
    // - loading: se a busca ainda está em andamento
    return { data, setData, loading };
}