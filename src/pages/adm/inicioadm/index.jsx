import { useEffect, useRef, useState } from "react";
import Layoutadm from "../../../components/layoutadm";

import {
  FaFileAlt,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaImages,
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaUpload,
  FaUserShield,
} from "react-icons/fa";

import {
  Page,
  Main,
  Header,
  HeaderContent,
  HeaderIcon,
  Badge,
  BadgeDot,
  Title,
  Highlight,
  Description,
  CardsGrid,
  CardLink,
  Card,
  CardHeader,
  CardIcon,
  CardInfo,
  CardTitle,
  CardDescription,
  CardStatus,
  CardBody,
  FileBox,
  FileIcon,
  FileInfo,
  FileLabel,
  FileName,
  ButtonsRow,
  CardFooter,
  CardAction,
  RegulationButton,
  GlobalStyle,
} from "./style";

const cards = [
  {
    title: "Inscrições",
    description:
      "Visualize, acompanhe e gerencie as inscrições dos participantes.",
    icon: <FaClipboardList />,
    path: "/adm/inscricaoadm",
  },
  {
    title: "Mural",
    description:
      "Publique e gerencie os avisos e informações exibidos aos usuários.",
    icon: <FaBullhorn />,
    path: "/adm/muraladm",
  },
  {
    title: "Eventos",
    description:
      "Cadastre, edite e organize os eventos do Slam Interescolar.",
    icon: <FaCalendarAlt />,
    path: "/adm/eventos",
  },
  {
    title: "Galeria",
    description:
      "Adicione e gerencie fotos e imagens dos eventos.",
    icon: <FaImages />,
    path: "/adm/galeriaadm",
  },
];

export default function Inicioadm() {
  const fileInputRef = useRef(null);

  function handleButtonMove(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    button.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    button.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  }

  const API_URL = "http://localhost:3001";
  const [nomeRegulamento, setNomeRegulamento] = useState(
    "Regulamento-Slam-Interescolar.pdf"
  );

  const [versao, setVersao] = useState(0); // força recarregar o link do PDF

  useEffect(() => {
    fetch(`${API_URL}/regulamento/info`)
      .then((r) => r.json())
      .then((d) => setNomeRegulamento(d.nome))
      .catch(() => {});
  }, []);

  const regulamento = `${API_URL}/regulamento/arquivo?v=${versao}`;

  const abrirSeletor = () => {
    fileInputRef.current?.click();
  };

  const handleRegulamentoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Selecione apenas um arquivo PDF.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const resp = await fetch(`${API_URL}/regulamento`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ nome: file.name, documento: reader.result }),
        });

        if (!resp.ok) throw new Error();

        setNomeRegulamento(file.name);
        setVersao((v) => v + 1);

        alert("Regulamento atualizado com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Não foi possível salvar o regulamento.");
      }
    };

    reader.onerror = () => {
      alert("Erro ao carregar o arquivo PDF.");
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <Page>
      <GlobalStyle />
      <Layoutadm />

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleRegulamentoChange}
        style={{ display: "none" }}
      />

      <Main>
        {/* CABEÇALHO */}

        <Header>
          <HeaderContent>
            <Badge>
              <BadgeDot />
              PAINEL ADMINISTRATIVO
            </Badge>

            <Title>
              Olá, <Highlight>Organizador!</Highlight>
            </Title>

            <Description>
              Gerencie as principais informações do{" "}
              <strong>Slam Interescolar ETECAMP</strong>
              <br />
              Escolha uma das opções abaixo para começar.
            </Description>
          </HeaderContent>

          <HeaderIcon aria-hidden="true">
            <FaUserShield />
          </HeaderIcon>
        </Header>

        {/* CARDS */}

        <CardsGrid>
          {/* REGULAMENTO */}

          <Card
            $featured
            style={{ animationDelay: "0.15s" }}
          >
            <CardHeader>
              <CardIcon>
                <FaFileAlt />
              </CardIcon>

              <CardInfo>
                <CardTitle>Regulamento</CardTitle>

                <CardDescription>
                  Veja o regulamento atual e substitua o PDF
                  disponibilizado para os usuários.
                </CardDescription>
              </CardInfo>

              <CardStatus>
                <FaCheckCircle />
                <span>Disponível para usuários</span>
              </CardStatus>
            </CardHeader>

            <CardBody>
              <FileBox>
                <FileIcon>
                  <FaFileAlt />
                </FileIcon>

                <FileInfo>
                  <FileLabel>Regulamento atual</FileLabel>

                  <FileName title={nomeRegulamento}>
                    {nomeRegulamento}
                  </FileName>
                </FileInfo>
              </FileBox>

              <ButtonsRow>
                <RegulationButton
                  as="a"
                  href={regulamento}
                  target="_blank"
                  rel="noopener noreferrer"
                  $variant="dark"
                  onPointerMove={handleButtonMove}
                >
                  <span className="button-content">
                    <FaEye />
                    Ver atual
                  </span>
                </RegulationButton>

                <RegulationButton
                  type="button"
                  $variant="yellow"
                  onClick={abrirSeletor}
                  onPointerMove={handleButtonMove}
                >
                  <span className="button-content">
                    <FaUpload />
                    Trocar PDF
                  </span>
                </RegulationButton>
              </ButtonsRow>
            </CardBody>
          </Card>

          {/* OUTROS CARDS */}

          {cards.map((card, index) => (
            <CardLink
              to={card.path}
              key={card.title}
            >
              <Card
                style={{
                  animationDelay: `${0.23 + index * 0.08}s`,
                }}
              >
                <CardHeader>
                  <CardIcon>
                    {card.icon}
                  </CardIcon>

                  <CardInfo>
                    <CardTitle>
                      {card.title}
                    </CardTitle>

                    <CardDescription>
                      {card.description}
                    </CardDescription>
                  </CardInfo>
                </CardHeader>

                <CardFooter>
                  <CardAction onPointerMove={handleButtonMove}>
                    <span>Acessar</span>
                    <FaArrowRight />
                  </CardAction>
                </CardFooter>
              </Card>
            </CardLink>
          ))}
        </CardsGrid>
      </Main>
    </Page>
  );
}
