# Site Maria Zilda

Landing page estática publicada pelo GitHub Pages em `https://terapeutamariazilda.com.br/`.

## Comandos

- `npm run build`: valida a sintaxe de `script.js` e os recursos estáticos obrigatórios.
- `npm start`: inicia um servidor local em `http://localhost:4173`.

Não há dependências instaladas, lint ou suíte de testes neste momento.

## Privacidade e consentimento

- A política está em `politica-de-privacidade/index.html` e pode ser acessada pelo rodapé. Solicitações de privacidade devem ser enviadas para `mariazildaterapeuta@gmail.com`.
- `script.js` inicia o consentimento de análise e publicidade como negado. A preferência fica em `localStorage` sob `maria-zilda-cookie-consent`; é possível alterá-la pelo rodapé.
- Parâmetros de atribuição são mantidos somente durante a sessão, em `sessionStorage`, e apenas após consentimento de análise ou publicidade. Os parâmetros aceitos são `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid` e `wbraid`.
- Sem consentimento, nenhuma tag de análise ou publicidade é carregada. Não há IDs Google no repositório. Google Fonts continua sendo uma solicitação externa necessária ao visual atual, antes da escolha; a decisão de hospedar fontes localmente permanece pendente de autorização e revisão de licença.
- Ao retirar consentimento, o estado é atualizado imediatamente e a atribuição incompatível é removida. Uma tag GTM que já tenha sido carregada não pode ser descarregada com segurança; as atualizações de consentimento passam a restringir novas medições. Recarregamento não é forçado para evitar interrupção e loops.

## Integrações futuras

Preencha somente IDs reais em `tracking-config.js`:

```js
GTM_CONTAINER_ID: '',
GA4_MEASUREMENT_ID: '',
GOOGLE_ADS_ID: ''
```

O carregador atual ativa somente o GTM e apenas após consentimento de análise ou publicidade. Após criar e configurar o container GTM, use o ID real em `GTM_CONTAINER_ID` e crie nele as tags GA4 e Google Ads conforme os consentimentos aplicáveis. `GA4_MEASUREMENT_ID` e `GOOGLE_ADS_ID` ficam centralizados para documentar os IDs futuros, mas não são carregados diretamente pelo site. Teste em ambiente de pré-publicação antes de habilitar produção.

Para Search Console, use a verificação real fornecida pelo Google: adicione a meta tag ao `<head>` de `index.html` ou o arquivo de verificação na raiz. Não use token de exemplo.

## Eventos disponíveis

Eventos são enviados para `window.dataLayer` somente após consentimento de análise ou publicidade:

- `whatsapp_click` (evento comercial principal)
- `cta_click`
- `instagram_click`
- `faq_expand`
- `certificate_view`

CTAs WhatsApp: `header`, `hero`, `process_section`, `faq`, `final_cta`, `footer` e `floating_button`. Todo link recebe a mesma mensagem inicial, sem UTMs, identificadores de clique ou dados sensíveis. `whatsapp_click` inclui apenas `cta_location`, `cta_text`, `link_url`, `page_location` sem query string e UTMs disponíveis; não inclui conteúdo de conversa, nome, telefone ou dados de saúde. Os eventos de FAQ e certificados não enviam o tema consultado.

No GTM, crie gatilhos de Evento Personalizado para esses nomes e marque apenas `whatsapp_click` como conversão comercial no GA4/Google Ads. Não marque FAQ ou certificados como conversão.

## Pendências antes de tráfego pago

- Criar as contas Google e fornecer IDs reais.
- Definir duração, plataforma, horários, pagamento, agendamento, cancelamento, disponibilidade presencial e como consultar valores antes de expor essas informações.
- Revisar juridicamente a Política de Privacidade e a nota de responsabilidade.
- Confirmar o método e token real de verificação do Search Console.

## Teste manual de consentimento

1. Em uma janela privada, abra o site e confirme banner visível, Consent Mode padrão negado e ausência de carregamento GTM.
2. Clique em `Configurar`, feche com X, `Esc` e clique no fundo em testes separados; confirme que nada foi salvo e o banner continua disponível.
3. Clique em `Rejeitar`; confirme no `localStorage` que análise e publicidade são falsas, não há GTM e eventos não entram no `dataLayer`.
4. Clique em `Aceitar`; confirme os quatro campos Consent Mode concedidos, ausência de script externo com IDs vazios e persistência após recarregar.
5. Reabra pelo rodapé, marque somente análise e salve; confirme `analytics_storage` concedido, três campos publicitários negados e ausência de click IDs no `sessionStorage`.
6. Abra a página com UTMs, aceite a categoria aplicável e clique em um CTA; inspecione `window.dataLayer`. Confirme que `page_location` não possui query string e a mensagem do WhatsApp não inclui atribuição.
7. Desative JavaScript e confirme que os links essenciais, inclusive WhatsApp, continuam navegáveis. Com um ID GTM real apenas em pré-publicação, use o modo Preview do GTM antes de qualquer publicação.
