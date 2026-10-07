# Site Maria Zilda

Landing page estática publicada pelo GitHub Pages em `https://terapeutamariazilda.com.br/`.

## Comandos

- `npm run build`: valida a sintaxe de `script.js` e os recursos estáticos obrigatórios.
- `npm start`: inicia um servidor local em `http://localhost:4173`.

Não há dependências instaladas, lint ou suíte de testes neste momento.

## Privacidade e consentimento

- A política está em `politica-de-privacidade/index.html`; o texto descreve os fluxos técnicos encontrados no código, incluindo armazenamento local, atribuição de campanha, Google Ads, Google Fonts, GitHub Pages e links para WhatsApp/Meet. A redação foi atualizada como aviso operacional, mas ainda precisa de revisão jurídica antes de ser considerada definitiva.
- `script.js` inicia o consentimento de análise e publicidade como negado. A preferência fica em `localStorage` sob `maria-zilda-cookie-consent`; é possível alterá-la pelo rodapé.
- Parâmetros de atribuição são mantidos somente durante a sessão, em `sessionStorage`, e apenas após consentimento de análise ou publicidade. Os parâmetros aceitos são `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid` e `wbraid`.
- A tag Google Ads usa os identificadores reais da conta e só é carregada após consentimento de publicidade. O Google Analytics e o Google Tag Manager permanecem sem configuração. Google Fonts continua sendo uma solicitação externa necessária ao visual atual, antes da escolha; a decisão de hospedar fontes localmente permanece pendente de autorização e revisão de licença.
- Ao retirar consentimento, o estado é atualizado imediatamente e a atribuição incompatível é removida. Uma tag GTM que já tenha sido carregada não pode ser descarregada com segurança; as atualizações de consentimento passam a restringir novas medições. Recarregamento não é forçado para evitar interrupção e loops.

## Integração atual do Google Ads

`tracking-config.js` contém o ID do Google Ads e o rótulo da ação `Clique no WhatsApp`. Esses valores devem coincidir com a ação de conversão criada na conta. Não altere os identificadores sem conferir a configuração no Google Ads.

```js
GTM_CONTAINER_ID: '',
GA4_MEASUREMENT_ID: '',
GOOGLE_ADS_ID: 'AW-…',
GOOGLE_ADS_CONVERSION_LABEL: '…'
```

O código emite `whatsapp_click` para o `dataLayer` após consentimento de análise ou publicidade. O evento de conversão do Google Ads só é enviado após consentimento de publicidade. O valor da conversão não é enviado, conforme a configuração da ação no Google Ads. Não há GTM ou GA4 configurados neste momento. Teste o consentimento e o evento em ambiente de pré-publicação antes de publicar alterações no site.

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

- Revisar juridicamente a Política de Privacidade e a nota de responsabilidade.
- Publicar a versão atualizada do site que restringe a tag Ads ao consentimento de publicidade.
- Fazer um teste controlado da tag e confirmar no Google Ads que a ação de conversão recebeu atividade recente; a conta atualmente mostra a tag como inativa.
- Confirmar orçamento e data de término antes de ativar; orçamento diário médio não é um teto semanal rígido.
- Confirmar o método e token real de verificação do Search Console.

Enquanto a revisão jurídica estiver pendente, a política permanece em `noindex` e fora do sitemap.

## Teste manual de consentimento

1. Em uma janela privada, abra o site e confirme banner visível, Consent Mode padrão negado e ausência de carregamento GTM.
2. Clique em `Configurar`, feche com X, `Esc` e clique no fundo em testes separados; confirme que nada foi salvo e o banner continua disponível.
3. Clique em `Rejeitar`; confirme no `localStorage` que análise e publicidade são falsas, não há GTM e eventos não entram no `dataLayer`.
4. Clique em `Aceitar`; confirme os quatro campos Consent Mode concedidos, ausência de script externo com IDs vazios e persistência após recarregar.
5. Reabra pelo rodapé, marque somente análise e salve; confirme `analytics_storage` concedido, três campos publicitários negados e ausência de click IDs no `sessionStorage`.
6. Abra a página com UTMs, aceite a categoria aplicável e clique em um CTA; inspecione `window.dataLayer`. Confirme que `page_location` não possui query string e a mensagem do WhatsApp não inclui atribuição.
7. Desative JavaScript e confirme que os links essenciais, inclusive WhatsApp, continuam navegáveis. Com um ID GTM real apenas em pré-publicação, use o modo Preview do GTM antes de qualquer publicação.
