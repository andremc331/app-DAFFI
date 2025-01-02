from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def gerar_pdf(dados):
    if not dados.get('data') or not dados.get('obra'):
        raise ValueError("Dados essenciais ausentes: data ou obra.")

    nome_arquivo = f"Diario_de_Obra_{dados['data']}.pdf"
    c = canvas.Canvas(nome_arquivo, pagesize=letter)
    
    # Configurações básicas
    _, altura = letter  # Removido a variável 'largura'
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, altura - 50, "DIÁRIO DE OBRA")

    # Dados da obra
    c.setFont("Helvetica", 12)
    c.drawString(50, altura - 100, f"OBRA: {dados['obra']}")
    c.drawString(50, altura - 120, f"RESP. TÉCNICO: {dados.get('responsavel_tecnico', 'Não informado')}")
    c.drawString(50, altura - 140, f"DATA: {dados['data']}")
    c.drawString(50, altura - 160, f"ENDEREÇO: {dados.get('endereco', 'Não informado')}")

    # Clima
    c.drawString(50, altura - 200, "CLIMA:")
    c.drawString(100, altura - 220, f"{dados.get('clima', 'Não informado')}")

    # Mão de Obra
    c.drawString(50, altura - 260, "MÃO DE OBRA:")
    y_pos = altura - 280
    for funcao, qtde in dados.get('mao_de_obra', {}).items():
        c.drawString(100, y_pos, f"{funcao}: {qtde}")
        y_pos -= 20

    # Observações
    c.drawString(50, y_pos - 40, "OBSERVAÇÕES:")
    c.drawString(100, y_pos - 60, f"{dados.get('observacoes', 'Nenhuma observação')}")

    # Finalizar PDF
    c.save()
    return nome_arquivo