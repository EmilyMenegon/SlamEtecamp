import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import {
  getUsuarioLogado,
  salvarUsuarioLogado,
  logout,
  apiFetch,
} from "../../../utils/auth";

import {
  GlobalStyle,
  Page,
  BackButton,
  PixelArea,
  Pixel01,
  Pixel02,
  Pixel03,
  Container,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  ProfileCard,
  AvatarArea,
  AvatarWrapper,
  Avatar,
  CameraButton,
  ProfileInfo,
  UserName,
  UserEmail,
  Form,
  Section,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  SectionDescription,
  FieldsGrid,
  Field,
  Label,
  InputWrapper,
  InputIcon,
  Input,
  SaveButton,
  CancelButton,
  LogoutLink,
  Aviso,
  AvisoSucesso,
  ModalOverlay,
  Modal,
  ModalIcon,
  ModalButtons,
  ConfirmButton,
} from "./style";

export default function Profileadm() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [nome, setNome] = useState("");
  const [emailAtual, setEmailAtual] = useState("");
  const [photo, setPhoto] = useState("/perfil.png");
  const [fotoBase64, setFotoBase64] = useState(null);

  useEffect(() => {
    const usuarioLogado = getUsuarioLogado();

    if (!usuarioLogado?.email) {
      navigate("/login", { replace: true });
      return;
    }

    apiFetch(
      `http://localhost:3001/perfil/${encodeURIComponent(
        usuarioLogado.email
      )}`
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.erro || "Não foi possível carregar o perfil.");
        }

        setNome(data.nome || "");
        setEmailAtual(data.email || usuarioLogado.email);

        if (data.foto) {
          setPhoto(data.foto);
        }
      })
      .catch((err) => {
        setErro(err.message || "Não foi possível carregar o perfil.");
      });
  }, [navigate]);

  const handleButtonMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErro("Selecione uma imagem válida.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
      setFotoBase64(reader.result);
      setErro("");
      setSucesso("");
    };

    reader.onerror = () => {
      setErro("Não foi possível carregar a imagem.");
    };

    reader.readAsDataURL(file);
  };

  async function handleSalvar(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (!nome.trim()) {
      setErro("Preencha o nome.");
      return;
    }

    try {
      const res = await apiFetch(
        `http://localhost:3001/perfil/${encodeURIComponent(emailAtual)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome.trim(),
            foto: fotoBase64,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Não foi possível atualizar o perfil.");
        return;
      }

      const usuario = getUsuarioLogado();

      salvarUsuarioLogado({
        ...usuario,
        nome: data.nome || nome.trim(),
        email: emailAtual,
        foto: data.foto || fotoBase64 || photo,
      });

      setNome(data.nome || nome.trim());

      if (data.foto) {
        setPhoto(data.foto);
      }

      setFotoBase64(null);
      setSucesso("Perfil atualizado com sucesso!");
    } catch {
      setErro("Não foi possível atualizar o perfil.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <GlobalStyle />

      <Page>
        <BackButton
          to="/adm/inicioadm"
          aria-label="Voltar"
          onMouseMove={handleButtonMouseMove}
        >
          <FaArrowLeft />
        </BackButton>

        <PixelArea>
          <Pixel01 src="/pixel01.png" alt="" />
          <Pixel02 src="/pixel02.png" alt="" />
          <Pixel03 src="/pixel03.png" alt="" />
        </PixelArea>

        <Container>
          <Header>
            <HeaderTitle>Meu perfil</HeaderTitle>

            <HeaderSubtitle>
              Gerencie suas informações pessoais e sua conta.
            </HeaderSubtitle>
          </Header>

          <ProfileCard>
            <AvatarArea>
              <AvatarWrapper>
                <Avatar src={photo} alt="Foto de perfil" />

                <CameraButton
                  htmlFor="fotoPerfil"
                  onMouseMove={handleButtonMouseMove}
                  aria-label="Alterar foto de perfil"
                >
                  <FaCamera />

                  <input
                    id="fotoPerfil"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </CameraButton>
              </AvatarWrapper>
            </AvatarArea>

            <ProfileInfo>
              <UserName>{nome || "Administrador"}</UserName>

              <UserEmail>{emailAtual || "Carregando email..."}</UserEmail>
            </ProfileInfo>
          </ProfileCard>

          <Form onSubmit={handleSalvar}>
            <Section>
              <SectionHeader>
                <SectionIcon>
                  <FaUser />
                </SectionIcon>

                <div>
                  <SectionTitle>Informações pessoais</SectionTitle>

                  <SectionDescription>
                    Atualize as informações básicas do seu perfil.
                  </SectionDescription>
                </div>
              </SectionHeader>

              <FieldsGrid>
                <Field>
                  <Label htmlFor="nome">Nome</Label>

                  <InputWrapper>
                    <InputIcon>
                      <FaUser />
                    </InputIcon>

                    <Input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => {
                        setNome(e.target.value);
                        setErro("");
                        setSucesso("");
                      }}
                      placeholder="Digite seu nome"
                      autoComplete="name"
                    />
                  </InputWrapper>
                </Field>

                <Field>
                  <Label htmlFor="email">Email</Label>

                  <InputWrapper disabled>
                    <InputIcon>
                      <FaEnvelope />
                    </InputIcon>

                    <Input
                      id="email"
                      type="email"
                      value={emailAtual}
                      disabled
                      readOnly
                    />
                  </InputWrapper>

                  <small>Este é o email vinculado à conta.</small>
                </Field>
              </FieldsGrid>
            </Section>

            {erro && (
              <Aviso>
                <span>{erro}</span>
              </Aviso>
            )}

            {sucesso && (
              <AvisoSucesso>
                <span>{sucesso}</span>
              </AvisoSucesso>
            )}

            <SaveButton type="submit" onMouseMove={handleButtonMouseMove}>
              <span className="buttonContent">
                <FaCheck />
                Salvar alterações
              </span>
            </SaveButton>
          </Form>

          <LogoutLink
            type="button"
            onClick={() => setShowLogoutModal(true)}
            onMouseMove={handleButtonMouseMove}
          >
            <FaSignOutAlt />
            Sair da conta
          </LogoutLink>
        </Container>

        {showLogoutModal && (
          <ModalOverlay>
            <Modal>
              <ModalIcon>
                <FaSignOutAlt />
              </ModalIcon>

              <h3>Sair da conta?</h3>

              <p>
                Tem certeza que deseja sair da sua conta? Você precisará fazer
                login novamente para acessar seu perfil.
              </p>

              <ModalButtons>
                <CancelButton
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  onMouseMove={handleButtonMouseMove}
                >
                  <span className="buttonContent">
                    <FaTimes />
                    Cancelar
                  </span>
                </CancelButton>

                <ConfirmButton
                  type="button"
                  onClick={handleLogout}
                  onMouseMove={handleButtonMouseMove}
                >
                  <span className="buttonContent">
                    <FaSignOutAlt />
                    Sim, sair
                  </span>
                </ConfirmButton>
              </ModalButtons>
            </Modal>
          </ModalOverlay>
        )}
      </Page>
    </>
  );
}