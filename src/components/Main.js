import { useEffect, useState } from 'react';
import BarChart from 'react-bar-chart';

var count = 0;
const Main = () => {
    const [listaPrimavera, setListaPrimavera] = useState([]);
    const [listaVerao, setListaVerao] = useState([]);
    const [listaOutono, setListaOutono] = useState([]);
    const [listaInverno, setListaInverno] = useState([]);
    const [reload, setReload] = useState(true);
    const qntRandomNuns = 90;
    const [data, setData] = useState([
        { text: 'Verão', value: 0 },
        { text: 'Outono', value: 0 },
        { text: 'Inverno', value: 0 },
        { text: 'Primavera', value: 0 }
    ]);

    useEffect(() => {
        primavera();
        verao();
        outono();
        inverno();
    }, []);

    useEffect(() => {
        let dados = [
            { text: 'Verão', value: quantidadeTotal(listaVerao) },
            { text: 'Outono', value: quantidadeTotal(listaOutono) },
            { text: 'Inverno', value: quantidadeTotal(listaInverno) },
            { text: 'Primavera', value: quantidadeTotal(listaPrimavera) }
        ];
        setData(dados);
    }, [listaPrimavera, listaVerao, listaOutono, listaInverno]);

    const primavera = () => {
        let list = geraProspeccao(7, 30, 3, 14, 2, 10, 70, 40);
        setListaPrimavera(list);
        setReload(!reload);
    }

    const verao = () => {
        let list = geraProspeccao(15, 50, 10, 30, 5, 20, 60, 30);
        setListaVerao(list);
        setReload(!reload);
    }

    const outono = () => {
        let list = geraProspeccao(5, 25, 2, 10, 0, 5, 70, 40);
        setListaOutono(list);
        setReload(!reload);
    }

    const inverno = () => {
        let list = geraProspeccao(0, 15, 0, 8, 0, 4, 90, 70);
        setListaInverno(list);
        setReload(!reload);
    }

    const geraProspeccao = (minSol, maxSol, minNuvem, maxNuvem, minChuva, maxChuva, chanceSol, chanceNuvem) => {
        let list = [];
        for (let i = 0; i < qntRandomNuns; i++) {
            let randomDay = parseInt(Math.random() * (100 - 1 + 1) + 1);
            let typeDay = 3;
            if (randomDay > chanceSol) {
                typeDay = 1;
            } else if (randomDay > chanceNuvem) {
                typeDay = 2;
            }

            switch (typeDay) {
                case 1: // Ensolarado
                    list.push(parseInt(Math.random() * (maxSol - minSol + 1) + minSol));
                    break;
                case 2: // Sol entre nuvens
                    list.push(parseInt(Math.random() * (maxNuvem - minNuvem + 1) + minNuvem));
                    break;
                case 3: // Chuva
                    list.push(parseInt(Math.random() * (maxChuva - minChuva + 1) + minChuva));
                    break;
            }
            count = count + 1;
        }
        return list;
    }

    const quantidadeTotal = (list) => {
        if (list?.length > 0) {
            return list.reduce((accumulator, currentValue) => accumulator + currentValue);
        }
        return 0;
    }

    const numberParaReal = (numero) => {
        var formatado = 'R$ ' + numero.toLocaleString('pt-BR') + ',00';
        return formatado;
    }

    const getDados = (nome, lista) => {
        return <div>
            <h2>{nome}</h2>
            <h3>
                Quantidade de sorvetes vendidos totais:
                {
                    ' ' + quantidadeTotal(lista)
                } 🍨🍧🍦
            </h3>
            <h3>
                Lucro:
                {
                    numberParaReal(quantidadeTotal(lista) * 20)
                }
            </h3>
        </div>
    }

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Simulação de monte carlo para venda de sorvete</h1>
            {getDados('Totais', [...listaVerao, ...listaOutono, ...listaInverno, ...listaPrimavera])}
            <hr />
            {getDados('Verão', listaVerao)}
            <hr />
            {getDados('Outono', listaOutono)}
            <hr />
            {getDados('Inverno', listaInverno)}
            <hr />
            {getDados('Primavera', listaPrimavera)}
            <hr />
            <div style={{ width: '100%' }}>
                <BarChart ylabel='R$'
                    width={1000}
                    height={500}
                    margin={margin}
                    data={data} />
            </div>
        </div>
    );
}

export default Main;
