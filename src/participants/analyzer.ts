import * as vscode from 'vscode';

/**
 * 🧠 ANALYZER PARTICIPANT - Omniscient Oracle
 * Entry point do sistema multi-agente
 * Analisa intenção do usuário e recomenda outros chat modes
 */
export class AnalyzerParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.analyzer',
            this.handleRequest.bind(this)
        );

        // Metadata do participant
        this.participant.iconPath = vscode.Uri.joinPath(
            context.extensionUri,
            'assets',
            'analyzer-icon.png'
        );
    }

    /**
     * Handler principal - processa requisições do usuário
     */
    private async handleRequest(
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
    ): Promise<vscode.ChatResult> {
        // Header
        stream.markdown('# 🧠 Analyzer - Omniscient Oracle\n\n');
        stream.markdown('Analisando profundamente seu projeto...\n\n');

        const userMessage = request.prompt;

        // ═══════════════════════════════════════════════════════════
        // FASE 1: ANÁLISE DE INTENÇÃO
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 📊 Análise de Intenção\n\n');
        stream.markdown(`**Input do usuário:** ${userMessage}\n\n`);

        // Detectar tipo de projeto
        let projectType = 'Web Application';
        let complexity = 'Média';
        let timeline = '2-3 semanas';

        if (userMessage.toLowerCase().includes('mobile')) {
            projectType = 'Mobile App';
        } else if (userMessage.toLowerCase().includes('api')) {
            projectType = 'Backend API';
            complexity = 'Baixa';
            timeline = '1-2 semanas';
        } else if (userMessage.toLowerCase().includes('dashboard')) {
            projectType = 'Dashboard';
        } else if (userMessage.toLowerCase().includes('e-commerce')) {
            projectType = 'E-commerce Platform';
            complexity = 'Alta';
            timeline = '4-6 semanas';
        } else if (userMessage.toLowerCase().includes('social')) {
            projectType = 'Social Media App';
            complexity = 'Muito Alta';
            timeline = '8-12 semanas';
        }

        stream.markdown(`**Tipo detectado:** ${projectType}\n`);
        stream.markdown(`**Complexidade:** ${complexity}\n`);
        stream.markdown(`**Timeline estimado:** ${timeline}\n\n`);

        // ═══════════════════════════════════════════════════════════
        // FASE 2: RECOMENDAÇÕES DE CHAT MODES
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 🎯 Chat Modes Recomendados\n\n');
        stream.markdown('Baseado na análise, você deve chamar:\n\n');

        // Sempre recomendar designer para UX
        stream.markdown('1. **@designer** - Para criar mockups visuais e design system\n');

        // Recomendar architect para estrutura
        stream.markdown('2. **@architect** - Para desenhar a arquitetura completa\n');

        // Se mencionar segurança ou dados sensíveis
        if (
            userMessage.toLowerCase().includes('login') ||
            userMessage.toLowerCase().includes('auth') ||
            userMessage.toLowerCase().includes('password') ||
            userMessage.toLowerCase().includes('payment')
        ) {
            stream.markdown('3. **@security** - Para implementar segurança robusta (autenticação detectada)\n');
        }

        // Se mencionar AI/ML
        if (
            userMessage.toLowerCase().includes('ai') ||
            userMessage.toLowerCase().includes('ml') ||
            userMessage.toLowerCase().includes('chat') ||
            userMessage.toLowerCase().includes('recommend')
        ) {
            stream.markdown('4. **@aiml** - Para implementar AI/ML features\n');
        }

        // Se mencionar performance
        if (
            userMessage.toLowerCase().includes('fast') ||
            userMessage.toLowerCase().includes('performance') ||
            userMessage.toLowerCase().includes('speed')
        ) {
            stream.markdown('5. **@performance** - Para otimizar performance\n');
        }

        // Se mencionar integração com APIs
        if (
            userMessage.toLowerCase().includes('api') ||
            userMessage.toLowerCase().includes('integration') ||
            userMessage.toLowerCase().includes('stripe') ||
            userMessage.toLowerCase().includes('payment')
        ) {
            stream.markdown('6. **@integration** - Para integrar third-party APIs\n');
        }

        // Se mencionar dados/database
        if (
            userMessage.toLowerCase().includes('database') ||
            userMessage.toLowerCase().includes('data') ||
            userMessage.toLowerCase().includes('sql')
        ) {
            stream.markdown('7. **@dataengineer** - Para desenhar schema de database\n');
        }

        // Sempre recomendar builder no final
        stream.markdown('8. **@builder** - Para gerar o código completo e funcional\n\n');

        // ═══════════════════════════════════════════════════════════
        // FASE 3: PRÓXIMOS PASSOS
        // ═══════════════════════════════════════════════════════════
        stream.markdown('---\n\n');
        stream.markdown('## 💡 Próximos Passos Sugeridos\n\n');
        stream.markdown('1. Comece com **@designer** para criar a visão visual\n');
        stream.markdown('2. Use **@architect** para definir a arquitetura técnica\n');
        stream.markdown('3. Chame os specialists conforme necessário\n');
        stream.markdown('4. Finalize com **@builder** para gerar o código\n\n');
        stream.markdown('💬 **Digite @designer para começar o design!**\n');

        return {
            metadata: {
                command: 'analyze',
                projectType,
                complexity,
                timeline,
            },
        };
    }

    /**
     * Registra o participant no VS Code
     */
    public register(): vscode.Disposable {
        return this.participant;
    }
}
