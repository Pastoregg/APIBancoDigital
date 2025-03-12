# APIBancoDigital
projeto freelance de backend para Banco Digital


Neste projeto, desenvolvi uma API para um banco digital utilizando PostgreSQL como banco de dados e Node.js (com Express) para a construção da aplicação. O objetivo foi criar um sistema que gerencie usuários, categorias de transações e transações financeiras de forma simples e eficiente.

-O que foi feito-
Criação do Banco de Dados:
Foi criado um banco de dados PostgreSQL chamado dindin com três tabelas principais:
usuarios: Armazena os dados dos usuários, como nome, email e senha.
categorias: Contém as categorias de transações, associadas a um usuário.
transacoes: Registra as transações financeiras, com descrição, valor (em centavos), data, categoria e tipo de transação (entrada ou saída).

Desenvolvimento da API:
A API foi construída utilizando Node.js com o framework Express.
A aplicação permite o gerenciamento de dados de usuários, categorias e transações financeiras.
Para garantir que a API seja escalável e bem organizada, a estrutura do código foi dividida de forma clara, com:
Arquivo index.js: Responsável por iniciar o servidor e configurar as rotas.
Arquivo conexao.js: Responsável pela conexão com o banco de dados PostgreSQL.
Arquivo de rotas: Define as rotas para interagir com as entidades de usuários, categorias e transações.
Controladores: Contêm a lógica de manipulação dos dados.

Banco de Dados:
As tabelas foram criadas com o campo id como chave primária, auto incremento e não editável.
O valor monetário das transações foi tratado em centavos, para evitar problemas com a precisão de valores decimais (por exemplo, R$ 10,00 = 1000 centavos).

Organização do Código:
O código foi organizado para evitar duplicação de lógica, centralizando funções que são reutilizadas em diferentes partes da aplicação.
A arquitetura foi projetada para garantir a fácil manutenção e escalabilidade da aplicação.
