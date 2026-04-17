[English version below](#petmatch-english)

# PetMatch

O **PetMatch** é um aplicativo para aproximar animais disponíveis para adoção e pessoas que querem adotar, tornando o processo mais simples, humano e transparente.

Este repositório é um app **React Native** com **Expo**, usando roteamento baseado em arquivos (**Expo Router**).

## Ambiente de desenvolvimento

O projeto foi configurado e testado num **PC Linux (Ubuntu 24)**; o app é executado no **iPhone** (com **Expo Go**), na mesma rede que o computador.

## Começar

1. Instale as dependências: `pnpm install`
2. Inicie o servidor de desenvolvimento: `pnpm start`
3. No iPhone, instale o **Expo Go** e leia o QR code do terminal com a câmera do telefone (PC e telefone tem que estar na mesma rede Wi‑Fi).

Instruções detalhadas, pré-requisitos e scripts úteis estão na [versão em inglês](#petmatch-english) abaixo.

---

<a id="petmatch-english"></a>

# PetMatch

**PetMatch** is an app that connects animals looking for a home with people who want to adopt — making adoption easier, kinder, and clearer.

This repo is a **React Native** app built with **Expo** and file-based routing (**Expo Router**).

## Development setup

The app is developed on **Linux (Ubuntu 24)** and run on an **iPhone** (with **Expo Go**), on the **same Wi‑Fi network** as your machine.

## Get started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/installation)
- On your smartphone: install [Expo Go](https://expo.dev/go) from the App Store (or Play Store)

### Install and run

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start the dev server**

   ```bash
   pnpm start
   ```

3. **Open on your iPhone**
   - Scan the QR code from the terminal with the **Expo Go Camera** (for Android) or **iPhone Camera** (for iOS).
   - Ensure the phone and your machine are on the **same network**; if the connection fails, try tunnel mode in the Expo CLI when prompted.

### Useful scripts

| Command        | Description             |
| -------------- | ----------------------- |
| `pnpm start`   | Start Expo (dev server) |
| `pnpm android` | Start for Android       |
| `pnpm ios`     | Start for iOS (macOS)   |
| `pnpm web`     | Start for web           |
| `pnpm lint`    | Run ESLint              |

### Project layout

Screens and navigation under the **`app`** directory, this project uses [Expo Router](https://docs.expo.dev/router/introduction/).

### Reset to a blank app (optional)

When you want a clean slate:

```bash
pnpm run reset-project
```

This moves the starter code to **`app-example`** and creates a fresh **`app`** folder.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)
