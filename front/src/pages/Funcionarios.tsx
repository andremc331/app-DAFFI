import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const funcionariosLista = [
    "Antônio", "Denis", "Erivaldo", "Jorge", "Marcelo", "Rafael", "Pereira", "José"
];

const diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

const getDatasDaSemana = () => {
    const hoje = new Date();
    const primeiroDia = new Date(hoje);
    const diaSemana = hoje.getDay();
    const ajuste = diaSemana === 0 ? -6 : 1 - diaSemana;
    primeiroDia.setDate(hoje.getDate() + ajuste);

    return diasDaSemana.map((dia, index) => {
        const data = new Date(primeiroDia);
        data.setDate(primeiroDia.getDate() + index);
        return {
            dia,
            dataFormatada: data.toLocaleDateString("pt-BR"),
        };
    });
};

type Presencas = {
    [funcionario: string]: boolean;
};

type RegistroDia = {
    dia: string;
    dataFormatada: string;
    presencas: Presencas;
};

const Funcionarios = () => {
    const [registro, setRegistro] = useState<RegistroDia[][]>([]);

    useEffect(() => {
        const dadosSalvos = localStorage.getItem("registroPresenca");
        const semanaAnteriores: RegistroDia[][] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

        const semanaAtual = getDatasDaSemana();
        const primeiraDataAtual = semanaAtual[0].dataFormatada;
        const semanaJaExiste = semanaAnteriores.some(semana => semana[0]?.dataFormatada === primeiraDataAtual);

        if (!semanaJaExiste) {
            const novaSemana = semanaAtual.map(({ dia, dataFormatada }) => ({
                dia,
                dataFormatada,
                presencas: {},
            }));
            const novoHistorico = [...semanaAnteriores, novaSemana];
            setRegistro(novoHistorico);
            localStorage.setItem("registroPresenca", JSON.stringify(novoHistorico));
        } else {
            setRegistro(semanaAnteriores);
        }
    }, []);

    useEffect(() => {
        if (registro.length > 0) {
            localStorage.setItem("registroPresenca", JSON.stringify(registro));
        }
    }, [registro]);

    const togglePresenca = (semanaIndex: number, diaIndex: number, funcionario: string) => {
        setRegistro(prevRegistro =>
            prevRegistro.map((semana, sIndex) =>
                sIndex === semanaIndex
                    ? semana.map((dia, dIndex) =>
                        dIndex === diaIndex
                            ? {
                                ...dia,
                                presencas: {
                                    ...dia.presencas,
                                    [funcionario]: !dia.presencas[funcionario],
                                },
                            }
                            : dia
                    )
                    : semana
            )
        );
    };

    const editarData = (semanaIndex: number, diaIndex: number) => {
        const novaData = prompt("Digite a nova data (DD/MM/AAAA):");
        if (novaData) {
            setRegistro(prevRegistro =>
                prevRegistro.map((semana, sIndex) =>
                    sIndex === semanaIndex
                        ? semana.map((dia, dIndex) =>
                            dIndex === diaIndex
                                ? { ...dia, dataFormatada: novaData }
                                : dia
                        )
                        : semana
                )
            );
        }
    };

    const excluirSemana = (semanaIndex: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta semana?")) {
            setRegistro(prevRegistro => prevRegistro.filter((_, sIndex) => sIndex !== semanaIndex));
        }
    };

    const gerarPDF = () => {
        const doc = new jsPDF();
        doc.text("Relatório Semanal de Presença", 14, 10);
        let startY = 20;
    
        registro.forEach((semana) => {
            semana.forEach((dia) => {
                const dados = funcionariosLista.map((funcionario) => [
                    funcionario,
                    dia.presencas[funcionario] ? "Presente" : "Ausente"
                ]);
    
                autoTable(doc, {
                    head: [[`${dia.dia} - ${dia.dataFormatada}`, "Status"]],
                    body: dados,
                    startY: startY,
                    didParseCell: (data) => {
                        if (data.section === "body" && data.column.index === 1) {
                            const status = data.cell.text[0];
                            if (status === "Ausente") {
                                data.cell.styles.textColor = [255, 0, 0]; // Texto vermelho
                            }
                        }
                    },
                });
    
                const lastY = (doc as any).lastAutoTable.finalY;
                startY = lastY + 10;
            });
        });
    
        doc.save("Relatório_Semanal.pdf");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Registro de Presença de Funcionários</h1>
            {registro.length > 0 && registro.map((semana, semanaIndex) => (
                <div key={semanaIndex} className="mb-4 p-4 border rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Semana {semanaIndex + 1}</h2>
                    <button onClick={() => excluirSemana(semanaIndex)} className="bg-red-500 text-white p-2 rounded ml-4">Excluir Semana</button>
                    {semana.map((dia, diaIndex) => (
                        <div key={diaIndex} className="mt-4">
                            <h3 className="text-xl font-medium">{dia.dia} - {dia.dataFormatada}</h3>
                            <button onClick={() => editarData(semanaIndex, diaIndex)} className="ml-4 bg-yellow-500 text-white p-2 rounded">Editar Data</button>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {funcionariosLista.map((funcionario) => (
                                    <label key={funcionario} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={dia.presencas[funcionario] || false}
                                            onChange={() => togglePresenca(semanaIndex, diaIndex, funcionario)}
                                            className="w-5 h-5"
                                        />
                                        <span>{funcionario}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={gerarPDF} className="mt-4 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">Gerar Relatório PDF</button>
        </div>
    );
};

export default Funcionarios;
