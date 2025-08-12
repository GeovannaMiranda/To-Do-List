# To Do List App - Aplicação de Gerenciamento de Tarefas

Uma aplicação completa de gerenciamento de tarefas (To-Do List) desenvolvida com **ASP.NET Core Web API** no backend e **React TypeScript** no frontend, incluindo sistema de autenticação JWT e categorização de tarefas.

## 📋 Funcionalidades

### Backend (ASP.NET Core Web API)
- ✅ API RESTful completa para gerenciamento de tarefas
- ✅ Sistema de autenticação JWT
- ✅ Registro e login de usuários
- ✅ CRUD completo de tarefas
- ✅ Filtragem de tarefas por categoria
- ✅ Validações nos modelos e endpoints
- ✅ Integração com PostgreSQL via Entity Framework Core
- ✅ Documentação automática com Swagger

### Frontend (React TypeScript)
- ✅ Interface moderna e responsiva com Material-UI
- ✅ Autenticação de usuários (login/registro)
- ✅ Listagem de tarefas com filtros por categoria
- ✅ Criação, edição e exclusão de tarefas
- ✅ Marcação de tarefas como concluídas
- ✅ Categorização de tarefas
- ✅ Validações no frontend
- ✅ Design responsivo para desktop e mobile

## 🛠️ Tecnologias Utilizadas

### Backend
- **ASP.NET Core 8.0** - Framework web
- **Entity Framework Core** - ORM para acesso a dados
- **PostgreSQL** - Banco de dados
- **JWT Bearer Authentication** - Autenticação
- **Swagger/OpenAPI** - Documentação da API

### Frontend
- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **Axios** - Cliente HTTP
- **React Router** - Roteamento (se necessário)

## 📁 Estrutura do Projeto

```
todo-app/
├── backend/                    # Backend ASP.NET Core
│   ├── Controllers/           # Controllers da API
│   ├── Data/                  # Contexto do banco de dados
│   ├── Models/                # Modelos de dados
│   ├── Services/              # Serviços (autenticação, etc.)
│   ├── Program.cs             # Configuração da aplicação
│   ├── appsettings.json       # Configurações
│   └── TodoApp.csproj         # Arquivo do projeto
├── frontend/                   # Frontend React TypeScript
│   ├── public/                # Arquivos públicos
│   ├── src/                   # Código fonte
│   │   ├── components/        # Componentes React
│   │   ├── contexts/          # Contextos (autenticação)
│   │   ├── services/          # Serviços de API
│   │   ├── types/             # Tipos TypeScript
│   │   ├── App.tsx            # Componente principal
│   │   └── index.tsx          # Ponto de entrada
│   ├── package.json           # Dependências do projeto
│   └── tsconfig.json          # Configuração TypeScript
├── setup-database.sql         # Script de configuração do banco
├── setup-backend.sh/.bat      # Scripts de setup do backend
├── setup-frontend.sh/.bat     # Scripts de setup do frontend
├── run-app.sh/.bat           # Scripts para executar a aplicação
└── README.md                  # Esta documentação
```

## 🚀 Como Executar

### Pré-requisitos

1. **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download)
2. **Node.js 18+** - [Download](https://nodejs.org/)
3. **PostgreSQL** - [Download](https://www.postgresql.org/download/)

### Configuração do Banco de Dados

1. Instale e configure o PostgreSQL
2. Execute o script de configuração:
   ```sql
   -- No psql ou pgAdmin
   \i setup-database.sql
   ```
3. Atualize a string de conexão em `backend/appsettings.json`

### Configuração Automática

#### Windows
```bash
# Setup do backend
setup-backend.bat

# Setup do frontend
setup-frontend.bat

# Executar aplicação completa
run-app.bat
```

#### Linux/Mac
```bash
# Setup do backend
./setup-backend.sh

# Setup do frontend
./setup-frontend.sh

# Executar aplicação completa
./run-app.sh
```

### Configuração Manual

#### Backend
```bash
cd backend

# Restaurar pacotes
dotnet restore

# Instalar EF CLI (se não tiver)
dotnet tool install --global dotnet-ef

# Criar migração
dotnet ef migrations add InitialCreate

# Aplicar migração
dotnet ef database update

# Executar
dotnet run
```

#### Frontend
```bash
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Executar
npm start
```

## 🔧 Configuração

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=todoappdb;Username=postgres;Password=sua_senha"
  },
  "Jwt": {
    "Key": "SuaChaveSecretaAqui",
    "Issuer": "TodoAppIssuer",
    "Audience": "TodoAppAudience"
  }
}
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login do usuário

### Tarefas
- `GET /api/tasks` - Listar tarefas (com filtro opcional por categoria)
- `GET /api/tasks/{id}` - Obter tarefa específica
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/{id}` - Atualizar tarefa
- `DELETE /api/tasks/{id}` - Deletar tarefa
- `GET /api/tasks/categories` - Listar categorias

## 🔒 Autenticação

A aplicação utiliza JWT (JSON Web Tokens) para autenticação:

1. O usuário faz login com username/password
2. O servidor retorna um JWT token
3. O token é armazenado no localStorage do navegador
4. Todas as requisições subsequentes incluem o token no header Authorization
5. O token expira em 7 dias

## 📱 Interface do Usuário

### Tela de Login/Registro
- Formulários de login e registro
- Validação de campos
- Alternância entre modos

### Dashboard Principal
- Lista de tarefas dividida em "Pendentes" e "Concluídas"
- Filtro por categoria
- Contadores de tarefas
- Botão para adicionar nova tarefa

### Formulário de Tarefas
- Campos: Título, Descrição, Categoria
- Validações em tempo real
- Modo de criação e edição

## 🎨 Design e UX

- **Material Design** - Interface moderna e consistente
- **Responsivo** - Funciona em desktop, tablet e mobile
- **Animações suaves** - Transições e hover effects
- **Feedback visual** - Estados de loading, erro e sucesso
- **Acessibilidade** - Componentes acessíveis do Material-UI

## 🧪 Validações

### Backend
- Validação de modelos com Data Annotations
- Validação de business rules nos controllers
- Tratamento de erros e exceções

### Frontend
- Validação de formulários em tempo real
- Validação de tipos com TypeScript
- Feedback visual de erros

## 🔄 Estado da Aplicação

- **Context API** - Gerenciamento de estado de autenticação
- **Local Storage** - Persistência de token e dados do usuário
- **Axios Interceptors** - Tratamento automático de autenticação

## 📈 Possíveis Melhorias

- [ ] Testes unitários e de integração
- [ ] Paginação de tarefas
- [ ] Busca por texto
- [ ] Notificações push
- [ ] Drag & drop para reordenar tarefas
- [ ] Temas claro/escuro
- [ ] Exportação de dados
- [ ] Compartilhamento de tarefas
- [ ] Lembretes e datas de vencimento

## 🐛 Solução de Problemas

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme a string de conexão no appsettings.json
- Execute as migrações: `dotnet ef database update`

### Erro de CORS
- Verifique a configuração de CORS no Program.cs
- Confirme se a URL do frontend está correta

### Erro 401 (Unauthorized)
- Verifique se o token JWT está sendo enviado
- Confirme se o token não expirou
- Verifique a configuração JWT no backend

## 📄 Licença

Este projeto é para fins educacionais e de demonstração.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando ASP.NET Core e React TypeScript**

