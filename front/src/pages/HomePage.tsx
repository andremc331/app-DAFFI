import React, { useState } from "react";
import styled from "styled-components";

const HomePageContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

const Slogan = styled.h1`
  font-size: 2.5rem;
  color: #d1cc36;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0 30px;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ProjectCard = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Footer = styled.footer`
  margin-top: 40px;
  font-size: 0.9rem;
  color: #777;
`;

const UploadForm = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #d1cc36;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c4bc32;
  }
`;

const HomePage: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files) {
      alert("Por favor, selecione um arquivo para enviar.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("https://backend-daffi-production.up.railway.app", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Arquivos enviados com sucesso!");
      } else {
        alert("Falha ao enviar os arquivos.");
      }
    } catch (error) {
      console.error("Erro ao enviar os arquivos:", error);
    }
  };

  return (
    <HomePageContainer>
      <Slogan>Construindo o futuro, tijolo por tijolo</Slogan>
      <Description>
        Nossa empresa transforma sonhos em realidade com projetos personalizados e de alta qualidade.
      </Description>

      <UploadForm onSubmit={handleFileUpload}>
        <h3>Upload de Fotos e Vídeos</h3>
        <FileInput
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />
        <SubmitButton type="submit">Enviar</SubmitButton>
      </UploadForm>

      <ProjectsContainer>
        <ProjectCard>
          <ProjectImage
            src="https://via.placeholder.com/300x200.png?text=Projeto+1"
            alt="Projeto 1"
          />
          <h3>Casa Residencial</h3>
        </ProjectCard>
      </ProjectsContainer>

      <Footer>
        © 2025 Empresa de Construção Civil. Todos os direitos reservados.
      </Footer>
    </HomePageContainer>
  );
};

export default HomePage;