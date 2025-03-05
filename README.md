# Gerenciador de Tarefas - Projeto para Faculdade

Este projeto foi desenvolvido para atender aos requisitos de um trabalho acadêmico na faculdade. A aplicação **"Gerenciador de Tarefas"** foi criada com o objetivo de permitir que os usuários adicionem, editem, marquem como concluídas e filtrem tarefas.

## Requisitos Atendidos

O projeto foi construído com base nos seguintes requisitos:

- **Adicionar Tarefas**: Há um campo de entrada onde os usuários podem digitar o nome da tarefa e um botão para adicionar a tarefa à lista.
- **Lista de Tarefas**: As tarefas adicionadas são listadas na tela, e ao lado de cada tarefa, há uma caixa de seleção (*checkbox*) que o usuário pode marcar quando a tarefa for concluída.
- **Filtragem**: Foram implementados botões para permitir que o usuário filtre as tarefas por seu status: **Todas, Concluídas e Pendentes**.
- **Estado Global**: O estado global da aplicação é gerenciado com o **React Context API**, utilizando o `useContext` combinado com `useReducer` para gerenciar o estado das tarefas.

## Funcionalidades Extras

- **Persistência de dados**: Para garantir que as tarefas persistam mesmo após a atualização da página, foi utilizado o **LocalStorage** para armazenar as informações no navegador.
- **Chakra UI**: A interface foi desenvolvida utilizando a biblioteca **Chakra UI**, que facilita a criação de componentes acessíveis e responsivos.
- **Tema Claro e Escuro**: O Chakra UI foi configurado para alternar entre os modos **Claro e Escuro** (*Dark/Light*), permitindo que o usuário alterne entre os modos conforme sua preferência.
- **Editar Tarefas**: Agora é possível editar o nome das tarefas já adicionadas.
- **Login Simples**: Na primeira vez que o usuário acessa a aplicação, um login simples é solicitado para personalizar a experiência do usuário.

## Endpoints

A aplicação possui dois endpoints principais:

- `/`: Exibe a tela inicial e solicita o nome do usuário para um login simples.
- `/todo`: Exibe a lista de tarefas, permitindo interações como adicionar, editar, marcar como concluída e filtrar tarefas.

## Deploy na Vercel

O deploy do projeto foi realizado na **Vercel**, tornando-o acessível online.

[Acesse o projeto online](https://todo-kappa-inky.vercel.app/)


## Começando

Para rodar o projeto localmente, siga os seguintes passos:

1. Clone o repositório ou baixe o código.
2. Instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Abra o navegador e acesse `http://localhost:3000` para visualizar o projeto em funcionamento.

## Tecnologias Utilizadas

- **Next.js**: Framework React para a construção de aplicações web modernas.
- **Chakra UI**: Biblioteca de componentes para criar interfaces responsivas e acessíveis.
- **React Context API**: Para gerenciar o estado global da aplicação.
- **LocalStorage**: Para persistir os dados localmente no navegador.
- **Vercel**: Para realizar o deploy da aplicação.

## Como Usar

- **Adicionar Tarefas**: No campo de entrada, digite o nome da tarefa e clique no botão de adicionar.
- **Marcar Tarefas Como Concluídas**: Clique na caixa de seleção ao lado de uma tarefa para marcá-la como concluída.
- **Filtrar Tarefas**: Use os botões para filtrar as tarefas por status (**Todas, Concluídas, Pendentes**).
- **Alternar Tema Claro/Escuro**: Utilize o controle de tema fornecido pelo **Chakra UI**.
- **Editar Tarefas**: Clique em uma tarefa para editar seu nome e salvar a alteração.
- **Login Simples**: Será solicitado o nome do usuário na primeira vez que acessar o aplicativo.

## Imagens do Projeto

- **Tela Inicial - Exibição de Tarefas**
- **Adicionando Tarefas**
- **Filtros de Tarefas**
- **Editando Tarefa**

## Dicas e Considerações

- O gerenciamento de estado global foi implementado com `useContext` e `useReducer`.
- Todas as atualizações no estado das tarefas foram feitas de forma **imutável**.

## Links Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [GitHub do Next.js](https://github.com/vercel/next.js)
