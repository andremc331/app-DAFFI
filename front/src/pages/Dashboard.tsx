import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StyledComponents from "../styled/GlobalStyles";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from "react-router-dom";
import DAFFI from "../images/DAFFI logo.jpg"

const Dashboard = () => {
      const navigate = useNavigate();
    // Carrega os dados do localStorage ou usa valores padrão
    const [dados, setDados] = useState(() => {
        const dadosSalvos = localStorage.getItem("dashboard");
        return dadosSalvos ? JSON.parse(dadosSalvos) : {
            obras: { emAndamento: 3, concluidas: 5 },
            orcamentos: { aprovados: 10, pendentes: 4 },
            horasTrabalhadas: [
                { nome: "Carlos", horas: 40 },
                { nome: "João", horas: 35 },
                { nome: "Maria", horas: 45 }
            ],
            gastosObras: { gasto: 50000, planejado: 80000 }
        };
    });

    // Atualiza o localStorage sempre que os dados mudam
    useEffect(() => {
        localStorage.setItem("dashboard", JSON.stringify(dados));
    }, [dados]);

    // Função para atualizar os dados dinamicamente
    const atualizarDados = (campo: string, subcampo: string, valor: number) => {
        setDados((prev: { [x: string]: any; }) => ({
            ...prev,
            [campo]: {
                ...prev[campo],
                [subcampo]: valor
            }
        }));
    };

    const calcularDiasTrabalhados = () => {
        const registroPresenca = localStorage.getItem("registroPresenca");
        if (!registroPresenca) return [];

        const semanas = JSON.parse(registroPresenca); // Array de semanas
        const semanaAtual = semanas[semanas.length - 1]; // Última semana salva

        const diasComPresenca = semanaAtual.map((dia: any) => {
            const funcionariosPresentes = Object.entries(dia.presencas)
                .filter(([_, presente]) => presente)
                .map(([funcionario]) => funcionario); // Apenas o nome do funcionário
            return { dia: dia.data, funcionarios: funcionariosPresentes }; // Retorna o dia e os funcionários
        });

        // Contagem de dias trabalhados por funcionário
        const diasPorFuncionario: any = {};

        diasComPresenca.forEach((dia: any) => {
            dia.funcionarios.forEach((funcionario: string) => {
                diasPorFuncionario[funcionario] = (diasPorFuncionario[funcionario] || 0) + 1;
            });
        });

        // Agora retorna os funcionários com a quantidade de dias trabalhados
        return Object.entries(diasPorFuncionario).map(([funcionario, dias]) => ({
            funcionario,
            diasTrabalhados: dias
        }));
    };

    useEffect(() => {
        setDados((prev: any) => ({
            ...prev,
            diasTrabalhados: calcularDiasTrabalhados(), // Atualiza com os dias e os funcionários presentes
        }));
    }, []);


    return (
        <StyledComponents.Container>

            <StyledComponents.MainWrapper>
            
                    {/* Barra Lateral */}
                    <StyledComponents.Sidebar>
                      <StyledComponents.SidebarItem onClick={() => navigate('/orcamentos')}>Orçamentos</StyledComponents.SidebarItem>
                      <StyledComponents.SidebarItem onClick={() => navigate('/gerar-contrato')}>Contratos</StyledComponents.SidebarItem>
                      <StyledComponents.SidebarItem onClick={() => navigate('/relatorios')}>Relatórios</StyledComponents.SidebarItem>
                      <StyledComponents.SidebarItem onClick={() => navigate('/funcionarios')}>Funcionários</StyledComponents.SidebarItem>
                      <StyledComponents.SidebarItem onClick={() => navigate('/dashboard')}>Dashboard</StyledComponents.SidebarItem>
                      <StyledComponents.SidebarItem>      <LogoutButton />
                      </StyledComponents.SidebarItem>
                    </StyledComponents.Sidebar>
            
                    <StyledComponents.Content>

{/* logo daffi dentro do cabeçalho */}
          <StyledComponents.Header>
            <StyledComponents.ImageContainer>
              <img src={DAFFI} alt="Logo DAFFI" />
            </StyledComponents.ImageContainer>
            📊 Dashboard de Indicadores
          </StyledComponents.Header>

        <div style={{ padding: "20px" }}>

            {/* Obras em Andamento vs Concluídas */}
            <div>
                <h3>🏗️ Obras</h3>
                <label>Em Andamento:</label>
                <input
                    type="number"
                    value={dados.obras.emAndamento}
                    onChange={(e) => atualizarDados("obras", "emAndamento", Number(e.target.value))}
                />
                <label>Concluídas:</label>
                <input
                    type="number"
                    value={dados.obras.concluidas}
                    onChange={(e) => atualizarDados("obras", "concluidas", Number(e.target.value))}
                />
            </div>

            <PieChart width={300} height={250}>
                <Pie data={[
                    { name: "Em Andamento", value: dados.obras.emAndamento || 1 },
                    { name: "Concluídas", value: dados.obras.concluidas || 1 }
                ]} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                    <Cell fill="#ffcc00" />
                    <Cell fill="#00cc66" />
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>

            {/* Orçamentos Aprovados x Pendentes */}
            <h3>📑 Orçamentos</h3>
            <label>Aprovados:</label>
            <input
                type="number"
                value={dados.orcamentos.aprovados}
                onChange={(e) => atualizarDados("orcamentos", "aprovados", Number(e.target.value))}
            />
            <label>Pendentes:</label>
            <input
                type="number"
                value={dados.orcamentos.pendentes}
                onChange={(e) => atualizarDados("orcamentos", "pendentes", Number(e.target.value))}
            />

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                    { tipo: "Aprovados", valor: dados.orcamentos.aprovados },
                    { tipo: "Pendentes", valor: dados.orcamentos.pendentes }
                ]}>
                    <XAxis dataKey="tipo" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill="#0088cc" />
                </BarChart>
            </ResponsiveContainer>

            {/* Funcionários X Dias Trabalhados*/}
            <h3>⏳ Dias Trabalhados por Funcionário</h3>
            {dados.diasTrabalhados && Array.isArray(dados.diasTrabalhados) && dados.diasTrabalhados.length > 0 ? (
                dados.diasTrabalhados.map((dia: any, index: number) => (
                    <div key={index}>
                        <h4>{dia.funcionario}</h4> {/* Nome do funcionário */}
                        <p>{dia.diasTrabalhados} dia(s) trabalhado(s)</p> {/* Total de dias trabalhados */}
                    </div>
                ))
            ) : (
                <p>Nenhum dia trabalhado encontrado.</p>
            )}

            {/* Gastos vs Orçamento Planejado */}
            <h3>💰 Gastos vs Orçamento Planejado</h3>
            <label>Gasto:</label>
            <input
                type="number"
                value={dados.gastosObras.gasto}
                onChange={(e) => atualizarDados("gastosObras", "gasto", Number(e.target.value))}
            />
            <label>Planejado:</label>
            <input
                type="number"
                value={dados.gastosObras.planejado}
                onChange={(e) => atualizarDados("gastosObras", "planejado", Number(e.target.value))}
            />

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <div style={{
                    backgroundColor: "#ff6666", padding: "10px", borderRadius: "5px", minWidth: "150px"
                }}>
                    Gasto: R$ {dados.gastosObras.gasto.toLocaleString("pt-BR")}
                </div>
                <div style={{
                    backgroundColor: "#66ccff", padding: "10px", borderRadius: "5px", minWidth: "150px"
                }}>
                    Planejado: R$ {dados.gastosObras.planejado.toLocaleString("pt-BR")}
                </div>
            </div>
        </div>
        </StyledComponents.Content>
        </StyledComponents.MainWrapper>
        </StyledComponents.Container>
    );
};

export default Dashboard;