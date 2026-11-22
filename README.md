<div align="center">

<img src="https://raw.githubusercontent.com/Vitryne/.github/main/assets/logotipoGradiente.png" width="280" alt="Logo" />

# Mobile da plataforma Vitryne

Aplicativo destinado aos consumidores da plataforma para descoberta de produtos, realização de pedidos e acompanhamento das entregas.

[![Stack](https://skillicons.dev/icons?i=react,ts)](https://skillicons.dev)

</div>

---

## 📖 Visão Geral

O aplicativo móvel da Vitryne oferece aos consumidores uma experiência prática para descobrir lojas, explorar produtos, realizar pedidos e acompanhar todo o processo de entrega.

A aplicação consome as APIs disponibilizadas pelo backend e integra-se aos demais serviços da plataforma.

---

## 🛠️ Stack

- React Native
- Expo
- Typescript

---

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/pt-br)
- [Expo CLI](https://expo.dev/)
- [Docker e Docker Compose](https://www.docker.com/)

---

### Executando

```bash
# Clone o repositório
git clone https://github.com/Vitryne/mobile.git
cd mobile

# Instalando as depedências
npm install

# Crie o arquivo .env na raiz (veja a seção Variáveis de Ambiente)

# Executando o projeto
npx expo start
```

---

## ⚙️ Variáveis de Ambiente

As variáveis usadas pelo projeto estão listadas em `.env.example`. Copie o arquivo para `.env` e preencha com os valores do seu ambiente. O `.env` não é versionado.

| Variável | Descrição |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | URL base da API. Opcional em desenvolvimento; em dispositivo físico, informe o IP da máquina na rede local. |

Variáveis com prefixo `EXPO_PUBLIC_` são incorporadas ao aplicativo: nunca coloque segredos nelas.

---

## 📚 Documentação

A documentação da plataforma, incluindo arquitetura, regras de negócio e decisões técnicas, está disponível no repositório de documentação.

## 🌐 Ecossistema

| Repositório | Descrição |
| ------------- | ----------- |
| [Backend](https://github.com/Vitryne/backend) | API da plataforma |
| [Frontend](https://github.com/Vitryne/frontend) | Aplicação Web |
| [Mobile](https://github.com/Vitryne/mobile) | Aplicativo Mobile |
| [Docs](https://github.com/Vitryne/docs) | Documentação técnica |
