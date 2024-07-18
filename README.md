# Salvus - Teste Desenvolvedor Junior

## Acesse aqui: https://salvus-teste.vercel.app/

Med + é uma aplicação fullstack desenvolvida como parte de um teste técnico para desenvolvedor júnior na Salvus. O projeto consiste em um e-commerce de produtos médicos, permitindo a criação, edição e visualização de produtos com várias imagens, preço e descrição detalhada.

![image](https://github.com/user-attachments/assets/4a0af80a-f946-472e-959b-1a8a83203161)

## Funcionalidades

- **Criação de Produtos**: Permite criar produtos com múltiplas imagens e informações detalhadas.
- **Edição de Produtos**: Funcionalidade para editar informações e imagens de produtos existentes.
- **Autenticação de requisições**: Permite aos usuários ter uma proteção maior quanto a edição de seus produtos, pois os mesmo só podem ser editados com um token de autorização válido e apenas pelo próprio criador do produto.
 ![salvus-teste vercel app_managment_product_ae4e5daf-d163-44cd-91a8-13434d66524c](https://github.com/user-attachments/assets/73655860-88af-4c41-bb83-27b14b8f36fd)

- **Visualização de Produtos**: Permite aos usuários visualizar os detalhes dos produtos, incluindo imagens em um carrossel.
- **100% responsivo**: Aplicação criada seguindo os conceitos do 'mobile first'.


- **Gerenciamento de Perfil de usuário... criação, edição e exclusão de conta**: Permite aos usuários visualizar os detalhes dos produtos, incluindo imagens em um carrossel.
![image](https://github.com/user-attachments/assets/4eca1496-d18e-42e3-9595-d420c339c241)


## Tecnologias Utilizadas

### Backend
Dica: Há um arquivo chamado 'Salvus.postman_collection.json', utilize-o para ver os exemplos das requisições no postman. Caso deseje pegar um token, faça o login na aplicação, va até o 'console do desenvolvedor' > 'aplication' > 'Cookies' > '_session'. esse é o seu token de autenticação de requisição. lembre-se, ele expira rápido, para a segurança da aplicação, então ao pegar o token, jogue-o o no postman e faça sua requisição


- **Node.js**: Plataforma de desenvolvimento para a construção do servidor backend.
- **Express**: Framework web usado para criar o servidor e gerenciar rotas.
- **Prisma**: ORM utilizado para gerenciar o banco de dados e realizar consultas eficientes.
- **AWS SDK**: Foi usado um bucket S3 da Amazon para o armazenamento de imagens, visando reduzir o armazenamento e processamento do servidor, utilizando apenas as URLs retornadas pelo serviço.
- **Clerk**: Utilizado para autenticação e autorização de usuários.
- **Multer**: Middleware para manipulação de uploads de arquivos.
- **MySql**: Banco de dados relacional. (entidades: products, assets e user)

### Frontend

- **React.js**: Biblioteca para construção de interfaces de usuário.
- **Tailwind CSS**: Framework de CSS utilitário para estilização de componentes.
- **Clerk**: Biblioteca para autenticação e gerenciamento de usuários.
- **Shadcn**: Biblioteca de componentes de interface de usuário open source.

### Serviços de deploy:
- Backend : Railway - https://salvus-teste-production.up.railway.app/health
- Banco de dados : Railway
- Frontend : Vercel - https://salvus-teste.vercel.app

### Configuração e Execução do Projeto:

Passo 1 - Clonar o Repositório
- Abra um terminal git bash
- git clone <URL_DO_REPOSITÓRIO>

Executar o backend:
- Acessar o diretório /backend (rode no terminal 'cd backend') e instalar as dependências (rode no terminal 'npm i')
- Preencher as variáveis .env que constam no .env.sample
- Rode o comando 'npm run dev' no terminal

Executar o frontend:
- Acessar o diretório /frontend (rode no terminal 'cd frontend') e instalar as dependências (rode no terminal 'npm i')
- Preencher as variáveis .env que constam no .env.sample
- Rode o comando 'npm run dev' no terminal


## Feito com carinho 💚 por MarcosTenorio &#128640;
