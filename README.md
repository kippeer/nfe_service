# Sistema de Notas Fiscais Eletrônicas (NFe)

Sistema para gerenciamento e emissão de Notas Fiscais Eletrônicas desenvolvido com Spring Boot (backend) e React (frontend).

## Tecnologias Utilizadas

### Backend
- Java 11
- Spring Boot 2.7.0
- Spring Data JPA
- H2 Database
- Flyway para migrations
- Maven

### Frontend
- React 18
- TypeScript
- Material-UI
- Axios
- Vite

### Infraestrutura
- Docker
- Docker Compose

## Estrutura do Projeto

```
.
├── nfe-service/              # Backend Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/        # Código fonte Java
│   │       └── resources/   # Configurações e migrations
│   ├── pom.xml              # Dependências Maven
│   └── Dockerfile           # Dockerfile do backend
├── src/                     # Frontend React
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entrada da aplicação
├── docker-compose.yml       # Configuração Docker Compose
├── Dockerfile.frontend      # Dockerfile do frontend
└── package.json            # Dependências npm
```

## Funcionalidades

- Listagem de Notas Fiscais
- Emissão de NFe
- Cancelamento de NFe
- Gerenciamento de itens da nota
- Interface web responsiva

## Como Executar

### Usando Docker (Recomendado)

1. Certifique-se de ter o Docker e Docker Compose instalados
2. Execute o comando:
   ```bash
   docker-compose up --build
   ```
3. Acesse:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - H2 Console: http://localhost:8080/h2-console

### Desenvolvimento Local

#### Backend

1. Entre na pasta `nfe-service`
2. Execute:
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute:
   ```bash
   npm run dev
   ```

## API Endpoints

### NFe

- `GET /api/nfe` - Lista todas as notas fiscais
- `POST /api/nfe` - Emite uma nova nota fiscal
- `GET /api/nfe/{id}` - Busca uma nota fiscal específica
- `DELETE /api/nfe/{id}` - Cancela uma nota fiscal

## Banco de Dados

O sistema utiliza H2 Database em memória para desenvolvimento. As tabelas principais são:

- `nfe` - Armazena as notas fiscais
- `item` - Armazena os itens de cada nota fiscal

## Desenvolvimento

### Migrations

As migrations do banco de dados são gerenciadas pelo Flyway e estão localizadas em:
```
nfe-service/src/main/resources/db/migration/
```

### Configuração CORS

O backend está configurado para aceitar requisições do frontend na porta 3000 através da classe `CorsConfig`.

## Próximos Passos

- Implementar autenticação de usuários
- Adicionar geração de PDF da NFe
- Implementar validações adicionais
- Adicionar testes automatizados
- Configurar ambiente de produção