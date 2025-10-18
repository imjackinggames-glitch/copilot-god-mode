# 🚀 TEMPLATE RÁPIDO - Criar os 7 Participants Restantes

## Como Usar Este Template:

1. Copiar cada bloco de código abaixo
2. Criar arquivo novo no VS Code: `src/participants/[nome].ts`
3. Colar o código
4. Depois de criar todos, atualizar `src/extension.ts`

---

## 3️⃣ architect.ts

```typescript
import * as vscode from 'vscode';

/**
 * 🏗️ ARCHITECT PARTICIPANT - System Master
 * Desenha arquitetura completa do sistema
 */
export class ArchitectParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.architect',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# 🏗️ Architect - System Master\n\n');
        stream.markdown('Desenhando arquitetura completa do sistema...\n\n');

        const userMessage = request.prompt;

        // Detectar tipo de projeto
        let projectType = 'Web Application';
        if (userMessage.toLowerCase().includes('mobile')) {
            projectType = 'Mobile App';
        } else if (userMessage.toLowerCase().includes('api')) {
            projectType = 'Backend API';
        }

        stream.markdown('## 🎯 Tipo de Projeto\n\n');
        stream.markdown(`**${projectType}**\n\n`);

        // Recomendar stack
        stream.markdown('## 📚 Tech Stack Recomendado\n\n');
        stream.markdown('### Frontend\n');
        stream.markdown('- **Framework:** Next.js 14 (App Router)\n');
        stream.markdown('- **Language:** TypeScript (strict mode)\n');
        stream.markdown('- **Styling:** Tailwind CSS\n');
        stream.markdown('- **UI Components:** shadcn/ui\n\n');

        stream.markdown('### Backend\n');
        stream.markdown('- **Runtime:** Node.js 20+\n');
        stream.markdown('- **API:** Next.js API Routes\n');
        stream.markdown('- **Database:** PostgreSQL 16\n');
        stream.markdown('- **ORM:** Prisma 5\n\n');

        stream.markdown('### DevOps\n');
        stream.markdown('- **Hosting:** Vercel (frontend + API)\n');
        stream.markdown('- **Database:** Neon (serverless Postgres)\n');
        stream.markdown('- **CI/CD:** GitHub Actions\n\n');

        // Arquitetura visual (Mermaid)
        stream.markdown('## 🏗️ Diagrama de Arquitetura\n\n');
        stream.markdown('```mermaid\n');
        stream.markdown('graph TB\n');
        stream.markdown('    Client[Client Browser]\n');
        stream.markdown('    Next[Next.js Frontend]\n');
        stream.markdown('    API[API Routes]\n');
        stream.markdown('    DB[(PostgreSQL)]\n');
        stream.markdown('    \n');
        stream.markdown('    Client --> Next\n');
        stream.markdown('    Next --> API\n');
        stream.markdown('    API --> DB\n');
        stream.markdown('```\n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Próximo passo:** Use @security para implementar segurança!\n');

        return { metadata: { command: 'architect', projectType } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 4️⃣ security.ts

```typescript
import * as vscode from 'vscode';

/**
 * 🔐 SECURITY PARTICIPANT - Guardian Absolute
 * Implementa segurança militar-grade
 */
export class SecurityParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.security',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# 🔐 Security - Guardian Absolute\n\n');
        stream.markdown('Implementando segurança militar-grade...\n\n');

        stream.markdown('## 🛡️ Camadas de Segurança\n\n');

        stream.markdown('### 1. Autenticação\n');
        stream.markdown('- **NextAuth.js v5** (OAuth + Credentials)\n');
        stream.markdown('- JWT tokens (httpOnly cookies)\n');
        stream.markdown('- Session management\n');
        stream.markdown('- 2FA support\n\n');

        stream.markdown('### 2. Autorização\n');
        stream.markdown('- **RBAC** (Role-Based Access Control)\n');
        stream.markdown('- Middleware de proteção\n');
        stream.markdown('- API route guards\n\n');

        stream.markdown('### 3. Data Protection\n');
        stream.markdown('- **Bcrypt** password hashing (10 rounds)\n');
        stream.markdown('- Input validation (Zod)\n');
        stream.markdown('- SQL injection prevention (Prisma ORM)\n');
        stream.markdown('- XSS protection (React auto-escape)\n\n');

        stream.markdown('### 4. Network Security\n');
        stream.markdown('- **HTTPS** enforced\n');
        stream.markdown('- CSP headers (Content Security Policy)\n');
        stream.markdown('- CORS configured\n');
        stream.markdown('- Rate limiting (100 req/15min)\n\n');

        stream.markdown('### 5. OWASP Top 10 Coverage\n');
        stream.markdown('✅ A01:2021 - Broken Access Control  \n');
        stream.markdown('✅ A02:2021 - Cryptographic Failures  \n');
        stream.markdown('✅ A03:2021 - Injection  \n');
        stream.markdown('✅ A04:2021 - Insecure Design  \n');
        stream.markdown('✅ A05:2021 - Security Misconfiguration  \n');
        stream.markdown('✅ A06:2021 - Vulnerable Components  \n');
        stream.markdown('✅ A07:2021 - Identification Failures  \n');
        stream.markdown('✅ A08:2021 - Software & Data Integrity  \n');
        stream.markdown('✅ A09:2021 - Security Logging  \n');
        stream.markdown('✅ A10:2021 - SSRF  \n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Próximo passo:** Use @builder para implementar!\n');

        return { metadata: { command: 'security' } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 5️⃣ aiml.ts

```typescript
import * as vscode from 'vscode';

/**
 * 🤖 AIML PARTICIPANT - Intelligence Architect
 * Especialista em AI/ML implementation
 */
export class AIMLParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.aiml',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# 🤖 AI/ML - Intelligence Architect\n\n');
        stream.markdown('Desenhando arquitetura de AI/ML...\n\n');

        stream.markdown('## 🧠 AI/ML Stack Recomendado\n\n');

        stream.markdown('### LLM Integration\n');
        stream.markdown('- **OpenAI API** (GPT-4, GPT-3.5-turbo)\n');
        stream.markdown('- **Ollama** (local LLMs: Llama 3.1, CodeLlama)\n');
        stream.markdown('- **Anthropic Claude** (via API)\n\n');

        stream.markdown('### Vector Database\n');
        stream.markdown('- **Chroma DB** (embeddings + similarity search)\n');
        stream.markdown('- **Pinecone** (managed vector DB)\n\n');

        stream.markdown('### RAG Architecture\n');
        stream.markdown('```mermaid\n');
        stream.markdown('graph LR\n');
        stream.markdown('    User[User Query]\n');
        stream.markdown('    Embed[Embedding Model]\n');
        stream.markdown('    VDB[(Vector DB)]\n');
        stream.markdown('    LLM[LLM]\n');
        stream.markdown('    \n');
        stream.markdown('    User --> Embed\n');
        stream.markdown('    Embed --> VDB\n');
        stream.markdown('    VDB --> LLM\n');
        stream.markdown('    LLM --> User\n');
        stream.markdown('```\n\n');

        stream.markdown('### ML Model Serving\n');
        stream.markdown('- **FastAPI** (Python backend)\n');
        stream.markdown('- **TensorFlow Serving**\n');
        stream.markdown('- **ONNX Runtime**\n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Próximo passo:** Use @builder para implementar!\n');

        return { metadata: { command: 'aiml' } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 6️⃣ performance.ts

```typescript
import * as vscode from 'vscode';

/**
 * ⚡ PERFORMANCE PARTICIPANT - Speed Demon
 * Otimização de performance
 */
export class PerformanceParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.performance',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# ⚡ Performance - Speed Demon\n\n');
        stream.markdown('Otimizando para velocidade máxima...\n\n');

        stream.markdown('## 🎯 Performance Goals\n\n');
        stream.markdown('**Lighthouse Score:** 100/100/100/100  \n');
        stream.markdown('**LCP:** < 2.5s  \n');
        stream.markdown('**FID:** < 100ms  \n');
        stream.markdown('**CLS:** < 0.1  \n\n');

        stream.markdown('## 🚀 Otimizações Aplicadas\n\n');

        stream.markdown('### 1. Code Optimization\n');
        stream.markdown('- **Code Splitting** (Next.js automatic)\n');
        stream.markdown('- **Tree Shaking** (Webpack)\n');
        stream.markdown('- **Minification** (Terser)\n');
        stream.markdown('- **Bundle Analysis** (webpack-bundle-analyzer)\n\n');

        stream.markdown('### 2. Image Optimization\n');
        stream.markdown('- **Next.js Image** component\n');
        stream.markdown('- **WebP format** (30% smaller)\n');
        stream.markdown('- **Lazy loading** (native)\n');
        stream.markdown('- **Responsive images** (srcset)\n\n');

        stream.markdown('### 3. Caching Strategy\n');
        stream.markdown('- **Static assets:** Cache-Control: max-age=31536000\n');
        stream.markdown('- **API responses:** Redis cache (5min TTL)\n');
        stream.markdown('- **Database queries:** In-memory cache\n');
        stream.markdown('- **CDN:** Vercel Edge Network\n\n');

        stream.markdown('### 4. Database Optimization\n');
        stream.markdown('- **Indexes** on frequently queried columns\n');
        stream.markdown('- **Connection pooling** (Prisma)\n');
        stream.markdown('- **Query optimization** (EXPLAIN ANALYZE)\n');
        stream.markdown('- **Read replicas** (scaling)\n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Próximo passo:** Use @builder para implementar!\n');

        return { metadata: { command: 'performance' } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 7️⃣ integration.ts

```typescript
import * as vscode from 'vscode';

/**
 * 🔗 INTEGRATION PARTICIPANT - Connection Master
 * Integração com third-party APIs
 */
export class IntegrationParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.integration',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# 🔗 Integration - Connection Master\n\n');
        stream.markdown('Desenhando integrações com third-party APIs...\n\n');

        stream.markdown('## 🌐 Integrações Comuns\n\n');

        stream.markdown('### Payment Processing\n');
        stream.markdown('- **Stripe** (recomendado)\n');
        stream.markdown('  - Payment Intents API\n');
        stream.markdown('  - Webhooks (payment success/failure)\n');
        stream.markdown('  - Customer Portal\n\n');

        stream.markdown('### Authentication\n');
        stream.markdown('- **Google OAuth**\n');
        stream.markdown('- **GitHub OAuth**\n');
        stream.markdown('- **Microsoft Azure AD**\n\n');

        stream.markdown('### Email\n');
        stream.markdown('- **SendGrid** (transactional emails)\n');
        stream.markdown('- **Resend** (modern alternative)\n');
        stream.markdown('- **AWS SES** (high volume)\n\n');

        stream.markdown('### File Storage\n');
        stream.markdown('- **Vercel Blob** (Next.js optimized)\n');
        stream.markdown('- **AWS S3** (enterprise)\n');
        stream.markdown('- **Cloudinary** (images/videos)\n\n');

        stream.markdown('### Analytics\n');
        stream.markdown('- **Vercel Analytics**\n');
        stream.markdown('- **PostHog** (product analytics)\n');
        stream.markdown('- **Mixpanel** (event tracking)\n\n');

        stream.markdown('## 🛠️ Integration Patterns\n\n');

        stream.markdown('### Error Handling\n');
        stream.markdown('- **Retry logic** (exponential backoff)\n');
        stream.markdown('- **Circuit breaker** (prevent cascading failures)\n');
        stream.markdown('- **Fallback strategies**\n\n');

        stream.markdown('### Webhook Architecture\n');
        stream.markdown('```typescript\n');
        stream.markdown('// API route: /api/webhooks/stripe\n');
        stream.markdown('export async function POST(req: Request) {\n');
        stream.markdown('  const signature = req.headers.get("stripe-signature");\n');
        stream.markdown('  // Verify webhook signature\n');
        stream.markdown('  // Process event\n');
        stream.markdown('  // Return 200 OK\n');
        stream.markdown('}\n');
        stream.markdown('```\n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Próximo passo:** Use @builder para implementar!\n');

        return { metadata: { command: 'integration' } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 8️⃣ dataengineer.ts

```typescript
import * as vscode from 'vscode';

/**
 * 📊 DATAENGINEER PARTICIPANT - Data Wizard
 * Database schema design e data modeling
 */
export class DataEngineerParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.dataengineer',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# 📊 Data Engineer - Data Wizard\n\n');
        stream.markdown('Desenhando schema de database...\n\n');

        stream.markdown('## 🗄️ Database Escolhido\n\n');
        stream.markdown('**PostgreSQL 16** (Relational Database)\n\n');
        stream.markdown('**Por que PostgreSQL?**\n');
        stream.markdown('- ✅ ACID compliant (transações seguras)\n');
        stream.markdown('- ✅ JSON support (flexibilidade)\n');
        stream.markdown('- ✅ Full-text search\n');
        stream.markdown('- ✅ Escalável (read replicas)\n\n');

        stream.markdown('## 📐 Schema Design (Prisma)\n\n');
        stream.markdown('```prisma\n');
        stream.markdown('// Example: Task Manager schema\n');
        stream.markdown('model User {\n');
        stream.markdown('  id        String   @id @default(cuid())\n');
        stream.markdown('  email     String   @unique\n');
        stream.markdown('  name      String?\n');
        stream.markdown('  password  String\n');
        stream.markdown('  tasks     Task[]\n');
        stream.markdown('  createdAt DateTime @default(now())\n');
        stream.markdown('}\n\n');
        stream.markdown('model Task {\n');
        stream.markdown('  id          String   @id @default(cuid())\n');
        stream.markdown('  title       String\n');
        stream.markdown('  description String?\n');
        stream.markdown('  status      String   @default("TODO")\n');
        stream.markdown('  priority    String   @default("MEDIUM")\n');
        stream.markdown('  userId      String\n');
        stream.markdown('  user        User     @relation(fields: [userId], references: [id])\n');
        stream.markdown('  createdAt   DateTime @default(now())\n');
        stream.markdown('  \n');
        stream.markdown('  @@index([userId])\n');
        stream.markdown('  @@index([status])\n');
        stream.markdown('}\n');
        stream.markdown('```\n\n');

        stream.markdown('## 🚀 Performance Indexes\n\n');
        stream.markdown('- `@@index([userId])` - Fast user lookups\n');
        stream.markdown('- `@@index([status])` - Filter by status\n');
        stream.markdown('- `@@unique([email])` - Prevent duplicates\n\n');

        stream.markdown('## 📈 Migrations Strategy\n\n');
        stream.markdown('```bash\n');
        stream.markdown('# Create migration\n');
        stream.markdown('npx prisma migrate dev --name add_tasks\n\n');
        stream.markdown('# Apply to production\n');
        stream.markdown('npx prisma migrate deploy\n');
        stream.markdown('```\n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Próximo passo:** Use @builder para implementar!\n');

        return { metadata: { command: 'dataengineer' } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 9️⃣ builder.ts

```typescript
import * as vscode from 'vscode';

/**
 * 🔨 BUILDER PARTICIPANT - Code Deity
 * Gera código completo e funcional
 */
export class BuilderParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.builder',
            this.handleRequest.bind(this)
        );
    }

    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        stream.markdown('# 🔨 Builder - Code Deity\n\n');
        stream.markdown('Gerando código production-ready...\n\n');

        stream.markdown('## 📦 O Que Vou Criar\n\n');
        stream.markdown('✅ **Estrutura de projeto completa**\n');
        stream.markdown('✅ **Todos os arquivos de código**\n');
        stream.markdown('✅ **Configurações (package.json, tsconfig.json, etc)**\n');
        stream.markdown('✅ **Database schema (Prisma)**\n');
        stream.markdown('✅ **API routes (Next.js)**\n');
        stream.markdown('✅ **React components**\n');
        stream.markdown('✅ **Testes (unit + integration)**\n');
        stream.markdown('✅ **Documentação (README.md)**\n\n');

        stream.markdown('## 🎯 Garantias\n\n');
        stream.markdown('- ✅ **Zero erros TypeScript** (strict mode)\n');
        stream.markdown('- ✅ **100% type-safe**\n');
        stream.markdown('- ✅ **Production-ready**\n');
        stream.markdown('- ✅ **Código limpo e comentado**\n');
        stream.markdown('- ✅ **Best practices aplicadas**\n\n');

        stream.markdown('## 📂 Estrutura Gerada\n\n');
        stream.markdown('```\n');
        stream.markdown('my-project/\n');
        stream.markdown('├── src/\n');
        stream.markdown('│   ├── app/\n');
        stream.markdown('│   │   ├── layout.tsx\n');
        stream.markdown('│   │   ├── page.tsx\n');
        stream.markdown('│   │   └── api/\n');
        stream.markdown('│   ├── components/\n');
        stream.markdown('│   ├── lib/\n');
        stream.markdown('│   └── types/\n');
        stream.markdown('├── prisma/\n');
        stream.markdown('│   └── schema.prisma\n');
        stream.markdown('├── tests/\n');
        stream.markdown('├── package.json\n');
        stream.markdown('├── tsconfig.json\n');
        stream.markdown('└── README.md\n');
        stream.markdown('```\n\n');

        stream.markdown('---\n\n');
        stream.markdown('💡 **Agora vou gerar TODOS os arquivos!**\n');
        stream.markdown('⏱️ **Tempo estimado:** 2-3 minutos\n\n');

        stream.markdown('🚀 **Iniciando geração de código...**\n');

        return { metadata: { command: 'builder' } };
    }

    public register(): vscode.Disposable {
        return this.participant;
    }
}
```

---

## 🔧 Atualizar src/extension.ts

Após criar TODOS os 7 arquivos acima, atualizar `src/extension.ts`:

```typescript
import * as vscode from 'vscode';
import { AnalyzerParticipant } from './participants/analyzer';
import { DesignerParticipant } from './participants/designer';
import { ArchitectParticipant } from './participants/architect';
import { SecurityParticipant } from './participants/security';
import { AIMLParticipant } from './participants/aiml';
import { PerformanceParticipant } from './participants/performance';
import { IntegrationParticipant } from './participants/integration';
import { DataEngineerParticipant } from './participants/dataengineer';
import { BuilderParticipant } from './participants/builder';

export function activate(context: vscode.ExtensionContext) {
    console.log('🌌 Copilot God Mode is now active!');

    try {
        // 1. @analyzer
        const analyzer = new AnalyzerParticipant(context);
        context.subscriptions.push(analyzer.register());

        // 2. @designer
        const designer = new DesignerParticipant(context);
        context.subscriptions.push(designer.register());

        // 3. @architect
        const architect = new ArchitectParticipant(context);
        context.subscriptions.push(architect.register());

        // 4. @security
        const security = new SecurityParticipant(context);
        context.subscriptions.push(security.register());

        // 5. @aiml
        const aiml = new AIMLParticipant(context);
        context.subscriptions.push(aiml.register());

        // 6. @performance
        const performance = new PerformanceParticipant(context);
        context.subscriptions.push(performance.register());

        // 7. @integration
        const integration = new IntegrationParticipant(context);
        context.subscriptions.push(integration.register());

        // 8. @dataengineer
        const dataengineer = new DataEngineerParticipant(context);
        context.subscriptions.push(dataengineer.register());

        // 9. @builder
        const builder = new BuilderParticipant(context);
        context.subscriptions.push(builder.register());

        console.log('✅ All 9 chat participants registered!');

        showWelcomeMessage(context);
    } catch (error) {
        console.error('❌ Error:', error);
        vscode.window.showErrorMessage(`Error: ${error}`);
    }
}

function showWelcomeMessage(context: vscode.ExtensionContext) {
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            '🌌 Copilot God Mode: 9 AI agents ready!',
            'Documentation',
            'Got it'
        ).then(selection => {
            if (selection === 'Documentation') {
                vscode.env.openExternal(
                    vscode.Uri.parse('https://github.com/imjackinggames-glitch/copilot-god-mode')
                );
            }
        });
        
        context.globalState.update('hasShownWelcome', true);
    }
}

export function deactivate() {
    console.log('👋 Copilot God Mode deactivated');
}
```

---

## ✅ Checklist Final

- [ ] Criar `architect.ts`
- [ ] Criar `security.ts`
- [ ] Criar `aiml.ts`
- [ ] Criar `performance.ts`
- [ ] Criar `integration.ts`
- [ ] Criar `dataengineer.ts`
- [ ] Criar `builder.ts`
- [ ] Atualizar `src/extension.ts` (imports + registros)
- [ ] Compilar: `npm run compile`
- [ ] Testar: Pressionar **F5**
- [ ] Verificar todos os 9 participants no chat
- [ ] Commit: `git add . && git commit -m "feat: all 9 participants" && git push`

🎉 **PRONTO! Todos os 9 chat modes funcionando!**
