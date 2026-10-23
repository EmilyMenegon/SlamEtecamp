import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaShieldAlt,
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
  PasswordBox,
  PasswordIcon,
  CodeBox,
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

export default function Profile() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [nome, setNome] = useState("");
  const [emailAtual, setEmailAtual] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [photo, setPhoto] = useState("/perfil.png");
  const [fotoBase64, setFotoBase64] = useState(null);

  const [codigo, setCodigo] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [carregandoCodigo, setCarregandoCodigo] = useState(false);
  const [verificandoCodigo, setVerificandoCodigo] = useState(false);

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
          throw new Error(
            data.erro || "Não foi possível carregar o perfil."
          );
        }

        return data;
      })
      .then((data) => {
        setNome(data.nome || "");
        setEmailAtual(data.email || "");

        if (data.foto) {
          setPhoto(data.foto);
        }
      })
      .catch((err) => {
        console.error(err);
        setErro("Não foi possível carregar o perfil.");
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

    if (file.size > 5 * 1024 * 1024) {
      setErro("A imagem deve ter no máximo 5 MB.");
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

  async function solicitarCodigo() {
    setErro("");
    setSucesso("");
    setCarregandoCodigo(true);

    try {
      const res = await apiFetch(
        `http://localhost:3001/perfil/${encodeURIComponent(
          emailAtual
        )}/solicitar-codigo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            senha: novaSenha || undefined,
            novoEmail: novoEmail.trim() || undefined,
            foto: fotoBase64 || undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Erro ao gerar código.");
        return;
      }

      setCodigo("");
      setCodigoEnviado(true);

      setSucesso(
        "Código de confirmação gerado. Confira o terminal do backend."
      );
    } catch (err) {
      console.error(err);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregandoCodigo(false);
    }
  }

  async function verificarCodigo() {
    setErro("");
    setSucesso("");

    if (!codigo.trim()) {
      setErro("Digite o código de confirmação.");
      return;
    }

    if (codigo.length !== 6) {
      setErro("O código deve possuir 6 dígitos.");
      return;
    }

    setVerificandoCodigo(true);

    try {
      const res = await apiFetch(
        `http://localhost:3001/perfil/${encodeURIComponent(
          emailAtual
        )}/verificar-codigo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo: codigo.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Código de confirmação inválido.");
        return;
      }

      salvarUsuarioLogado({
        ...getUsuarioLogado(),
        nome: data.nome,
        email: data.email,
      });

      setNome(data.nome);
      setEmailAtual(data.email);

      setNovoEmail("");
      setNovaSenha("");
      setCodigo("");
      setCodigoEnviado(false);
      setFotoBase64(null);

      if (data.foto) {
        setPhoto(data.foto);
      }

      setSucesso("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setVerificandoCodigo(false);
    }
  }

  function cancelarCodigo() {
    setCodigo("");
    setCodigoEnviado(false);
    setErro("");
    setSucesso("");
  }

  async function handleSalvar() {
    setErro("");
    setSucesso("");

    if (!nome.trim()) {
      setErro("Preencha o nome.");
      return;
    }

    if (nome.trim().length < 2) {
      setErro("O nome precisa ter pelo menos 2 caracteres.");
      return;
    }

    if (novoEmail.trim() && !novoEmail.includes("@")) {
      setErro("Digite um email válido.");
      return;
    }

    if (novoEmail.trim() || novaSenha) {
      await solicitarCodigo();
      return;
    }

    try {
      const res = await apiFetch(
        `http://localhost:3001/perfil/${encodeURIComponent(
          emailAtual
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            foto: fotoBase64 || undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Erro ao salvar.");
        return;
      }

      salvarUsuarioLogado({
        ...getUsuarioLogado(),
        nome: data.nome,
        email: data.email,
      });

      setNome(data.nome);
      setEmailAtual(data.email);
      setFotoBase64(null);

      if (data.foto) {
        setPhoto(data.foto);
      }

      setSucesso("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível conectar ao servidor.");
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
          to="/usuario/home"
          aria-label="Voltar para a página inicial"
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
                  htmlFor="profile-photo"
                  onMouseMove={handleButtonMouseMove}
                  aria-label="Alterar foto de perfil"
                >
                  <FaCamera />

                  <input
                    id="profile-photo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoChange}
                  />
                </CameraButton>
              </AvatarWrapper>
            </AvatarArea>

            <ProfileInfo>
              <UserName>{nome || "Usuário"}</UserName>

              <UserEmail>
                {emailAtual || "Carregando email..."}
              </UserEmail>
            </ProfileInfo>
          </ProfileCard>

          <Section>
            <SectionHeader>
              <SectionIcon>
                <FaUser />
              </SectionIcon>

              <div>
                <SectionTitle>
                  Informações pessoais
                </SectionTitle>

                <SectionDescription>
                  Atualize as informações básicas do seu perfil.
                </SectionDescription>
              </div>
            </SectionHeader>

            <FieldsGrid>
              <Field>
                <Label>Nome completo</Label>

                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>

                  <Input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome"
                  />
                </InputWrapper>
              </Field>

              <Field>
                <Label>Email atual</Label>

                <InputWrapper disabled>
                  <InputIcon>
                    <FaEnvelope />
                  </InputIcon>

                  <Input
                    type="email"
                    value={emailAtual}
                    readOnly
                    disabled
                  />
                </InputWrapper>

                <small>
                  Este é o email atualmente vinculado à conta.
                </small>
              </Field>
            </FieldsGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionIcon>
                <FaShieldAlt />
              </SectionIcon>

              <div>
                <SectionTitle>
                  Segurança da conta
                </SectionTitle>

                <SectionDescription>
                  Altere seu email ou senha com segurança.
                </SectionDescription>
              </div>
            </SectionHeader>

            <FieldsGrid>
              <Field>
                <Label>Novo email</Label>

                <InputWrapper>
                  <InputIcon>
                    <FaEnvelope />
                  </InputIcon>

                  <Input
                    type="email"
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    placeholder="Digite um novo email"
                  />
                </InputWrapper>

                <small>
                  Deixe em branco para manter o email atual.
                </small>
              </Field>

              <Field>
                <Label>Nova senha</Label>

                <PasswordBox>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>

                  <Input
                    type={showPassword ? "text" : "password"}
                    value={novaSenha}
                    onChange={(e) =>
                      setNovaSenha(e.target.value)
                    }
                    placeholder="Digite uma nova senha"
                  />

                  <PasswordIcon
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Ocultar senha"
                        : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </PasswordIcon>
                </PasswordBox>

                <small>
                  Deixe em branco para manter a senha atual.
                </small>
              </Field>
            </FieldsGrid>
          </Section>

          {codigoEnviado && (
            <CodeBox>
              <div className="codeHeader">
                <div className="codeIcon">
                  <FaShieldAlt />
                </div>

                <div>
                  <h3>Confirme sua alteração</h3>

                  <p>
                    Digite o código de 6 dígitos gerado pelo
                    sistema para confirmar as alterações.
                  </p>
                </div>
              </div>

              <Field>
                <Label>Código de confirmação</Label>

                <Input
                  type="text"
                  value={codigo}
                  onChange={(e) =>
                    setCodigo(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  placeholder="000000"
                  inputMode="numeric"
                  maxLength={6}
                />
              </Field>

              <div className="codeButtons">
                <CancelButton
                  type="button"
                  onClick={cancelarCodigo}
                  onMouseMove={handleButtonMouseMove}
                >
                  <span className="buttonContent">
                    <FaTimes />
                    Cancelar
                  </span>
                </CancelButton>

                <SaveButton
                  type="button"
                  onClick={verificarCodigo}
                  onMouseMove={handleButtonMouseMove}
                  disabled={
                    verificandoCodigo ||
                    codigo.length !== 6
                  }
                >
                  <span className="buttonContent">
                    <FaCheck />

                    {verificandoCodigo
                      ? "Verificando..."
                      : "Confirmar código"}
                  </span>
                </SaveButton>
              </div>
            </CodeBox>
          )}

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

          {!codigoEnviado && (
            <SaveButton
              type="button"
              onClick={handleSalvar}
              onMouseMove={handleButtonMouseMove}
              disabled={carregandoCodigo}
            >
              <span className="buttonContent">
                <FaCheck />

                {carregandoCodigo
                  ? "Gerando código..."
                  : "Salvar alterações"}
              </span>
            </SaveButton>
          )}

          <LogoutLink
            type="button"
            onClick={() => setShowLogoutModal(true)}
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
                Tem certeza que deseja sair da sua conta?
                Você precisará fazer login novamente para
                acessar seu perfil.
              </p>

              <ModalButtons>
                <CancelButton
                  onClick={() => setShowLogoutModal(false)}
                  onMouseMove={handleButtonMouseMove}
                >
                  <span className="buttonContent">
                    <FaTimes />
                    Cancelar
                  </span>
                </CancelButton>

                <ConfirmButton
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