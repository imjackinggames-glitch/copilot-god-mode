import * as vscode from 'vscode';

/**
 * 🎨 DESIGNER PARTICIPANT - Aesthetic Genius
 * Cria design systems, mockups, paletas de cores e tipografia
 */
export class DesignerParticipant {
    private participant: vscode.ChatParticipant;

    constructor(private context: vscode.ExtensionContext) {
        this.participant = vscode.chat.createChatParticipant(
            'copilot-god-mode.designer',
            this.handleRequest.bind(this)
        );

        // Metadata do participant
        this.participant.iconPath = vscode.Uri.joinPath(
            context.extensionUri,
            'assets',
            'designer-icon.png'
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
        stream.markdown('# 🎨 Designer - Aesthetic Genius\n\n');
        stream.markdown('Criando design system completo...\n\n');

        const userMessage = request.prompt;

        // ═══════════════════════════════════════════════════════════
        // FASE 1: ANÁLISE DE DESIGN
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 🎯 Análise de Design\n\n');

        // Detectar tipo de aplicação
        let appType = 'Web Application';
        if (userMessage.toLowerCase().includes('mobile')) {
            appType = 'Mobile App';
        } else if (userMessage.toLowerCase().includes('dashboard')) {
            appType = 'Dashboard';
        } else if (userMessage.toLowerCase().includes('e-commerce')) {
            appType = 'E-commerce';
        }

        stream.markdown(`**Tipo de aplicação:** ${appType}\n\n`);

        // ═══════════════════════════════════════════════════════════
        // FASE 2: PALETA DE CORES
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 🎨 Paleta de Cores Recomendada\n\n');

        const colorPalette = {
            primary: '#3B82F6',      // Blue
            secondary: '#8B5CF6',    // Purple
            accent: '#F59E0B',       // Amber
            success: '#10B981',      // Green
            warning: '#F59E0B',      // Orange
            error: '#EF4444',        // Red
            background: '#FFFFFF',   // White
            surface: '#F9FAFB',      // Gray 50
            text: '#1F2937',         // Gray 800
            textSecondary: '#6B7280' // Gray 500
        };

        stream.markdown('```css\n');
        stream.markdown(':root {\n');
        stream.markdown(`  --color-primary: ${colorPalette.primary};\n`);
        stream.markdown(`  --color-secondary: ${colorPalette.secondary};\n`);
        stream.markdown(`  --color-accent: ${colorPalette.accent};\n`);
        stream.markdown(`  --color-success: ${colorPalette.success};\n`);
        stream.markdown(`  --color-error: ${colorPalette.error};\n`);
        stream.markdown(`  --color-background: ${colorPalette.background};\n`);
        stream.markdown(`  --color-text: ${colorPalette.text};\n`);
        stream.markdown('}\n');
        stream.markdown('```\n\n');

        // ═══════════════════════════════════════════════════════════
        // FASE 3: TIPOGRAFIA
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 📝 Tipografia\n\n');
        stream.markdown('**Fonte Principal:** Inter (Google Fonts)\n');
        stream.markdown('**Fonte Código:** JetBrains Mono\n\n');

        stream.markdown('```css\n');
        stream.markdown('@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");\n\n');
        stream.markdown('body {\n');
        stream.markdown('  font-family: "Inter", sans-serif;\n');
        stream.markdown('  font-size: 16px;\n');
        stream.markdown('  line-height: 1.5;\n');
        stream.markdown('}\n');
        stream.markdown('```\n\n');

        // ═══════════════════════════════════════════════════════════
        // FASE 4: COMPONENTES PRINCIPAIS
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 🧩 Componentes Principais\n\n');
        stream.markdown('### Botões\n');
        stream.markdown('- **Primary Button:** Background azul, texto branco\n');
        stream.markdown('- **Secondary Button:** Outline, texto azul\n');
        stream.markdown('- **Ghost Button:** Sem border, hover com background\n\n');

        stream.markdown('### Inputs\n');
        stream.markdown('- **Text Input:** Border cinza, focus com azul\n');
        stream.markdown('- **Textarea:** Mesma estética dos inputs\n');
        stream.markdown('- **Select:** Custom dropdown com ícone\n\n');

        stream.markdown('### Cards\n');
        stream.markdown('- **Border:** 1px cinza claro\n');
        stream.markdown('- **Shadow:** Sutil (0 1px 3px rgba(0,0,0,0.1))\n');
        stream.markdown('- **Padding:** 1.5rem\n');
        stream.markdown('- **Radius:** 0.5rem\n\n');

        // ═══════════════════════════════════════════════════════════
        // FASE 5: LAYOUT
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 📐 Layout e Espaçamento\n\n');
        stream.markdown('**Sistema de Espaçamento:** 8px base unit\n\n');

        stream.markdown('```css\n');
        stream.markdown(':root {\n');
        stream.markdown('  --spacing-xs: 0.25rem;  /* 4px */\n');
        stream.markdown('  --spacing-sm: 0.5rem;   /* 8px */\n');
        stream.markdown('  --spacing-md: 1rem;     /* 16px */\n');
        stream.markdown('  --spacing-lg: 1.5rem;   /* 24px */\n');
        stream.markdown('  --spacing-xl: 2rem;     /* 32px */\n');
        stream.markdown('  --spacing-2xl: 3rem;    /* 48px */\n');
        stream.markdown('}\n');
        stream.markdown('```\n\n');

        // ═══════════════════════════════════════════════════════════
        // FASE 6: RESPONSIVIDADE
        // ═══════════════════════════════════════════════════════════
        stream.markdown('## 📱 Breakpoints Responsivos\n\n');
        stream.markdown('```css\n');
        stream.markdown('/* Mobile First */\n');
        stream.markdown('@media (min-width: 640px) { /* sm */ }\n');
        stream.markdown('@media (min-width: 768px) { /* md */ }\n');
        stream.markdown('@media (min-width: 1024px) { /* lg */ }\n');
        stream.markdown('@media (min-width: 1280px) { /* xl */ }\n');
        stream.markdown('```\n\n');

        // ═══════════════════════════════════════════════════════════
        // FASE 7: PRÓXIMOS PASSOS
        // ═══════════════════════════════════════════════════════════
        stream.markdown('---\n\n');
        stream.markdown('## 💡 Próximos Passos\n\n');
        stream.markdown('1. Use **@architect** para definir a arquitetura técnica\n');
        stream.markdown('2. Use **@builder** para gerar os componentes com este design\n\n');
        stream.markdown('💬 **Digite @architect para continuar!**\n');

        return {
            metadata: {
                command: 'design',
                appType,
                colorPalette,
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
