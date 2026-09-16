# Site Maria Zilda

Landing page estática publicada pelo GitHub Pages em `https://terapeutamariazilda.com.br/`.

## Comandos

- `npm run build`: valida a sintaxe de `script.js` e os recursos estáticos obrigatórios.
- `npm start`: inicia um servidor local em `http://localhost:4173`.

Não há dependências instaladas, lint ou suíte de testes neste momento.

## Privacidade e consentimento

- A política provisória está em `politica-de-privacidade/index.html`. O texto exige revisão jurídica antes da publicação definitiva e contém pendências explícitas de contato e identificação.
- `script.js` inicia o consentimento de análise e publicidade como negado. A preferência fica em `localStorage` sob `maria-zilda-cookie-consent`; é possível alterá-la pelo rodapé.
- Parâmetros de atribuição são mantidos somente durante a sessão, em `sessionStorage`, e apenas após consentimento de análise ou publicidade. Os parâmetros aceitos são `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid` e `wbraid`.
- Sem consentimento, nenhuma tag externa é carregada. Não há IDs Google no repositório.

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
- Informar e-mail/canal de privacidade e confirmar dados de identificação na política.
- Definir duração, plataforma, horários, pagamento, agendamento, cancelamento, disponibilidade presencial e como consultar valores antes de expor essas informações.
- Revisar juridicamente a Política de Privacidade e a nota de responsabilidade.
- Confirmar o método e token real de verificação do Search Console.

## Teste manual de consentimento

1. Abra o site em uma janela privada e rejeite os cookies; confirme que não há carregamento Google e que os links WhatsApp ainda funcionam.
2. Altere a escolha em `Preferências de cookies` e recarregue a página para confirmar a persistência.
3. Abra a página com UTMs, aceite análise ou publicidade e clique em um CTA; inspecione `window.dataLayer` no console.
4. Com um ID GTM real apenas no ambiente de teste, use o modo Preview do GTM e valide consentimento e eventos antes de publicar.
