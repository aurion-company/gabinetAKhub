# GABINETAK HUB - TAREFAS DE TRANSIÇÃO DO PORTAL DO CIDADÃO

## Fase 1: Arquitetura Base & App-Shell (Estética HubPolítico)
- [x] Criar diretório `components/portal/`
- [x] Criar `components/portal/CitizenAppShell.js` (Sidebar fixa 250px, topbar de cidades, botão flutuante IA)
- [x] Configurar tokens de cores e estilos OLED Dark no CSS (`#090A0F`, `#0C0E14`, `#12141C`, `#1E2230`, `#2563EB`, `#0EA5E9`)

## Fase 2: Telas Principais da Visão do Eleitor
- [x] Criar `components/portal/PortalHome.js`:
  - [x] Hero central com título e AI Command Box iluminada
  - [x] Fileira de chips rápidos de ação
  - [x] Bento Grid de 3 cards (Eixos, Mapa de Demandas, Fiscalize na Prática)
- [x] Criar `components/portal/PortalRadar.js`:
  - [x] Grid de mini-relatórios por cidade (cards bicolores: topo branco + base escura com tags)
  - [x] Seção 2 colunas: Demandas em Alta Hoje (com contagem de apoios) + Feed em Tempo Real do Gabinete
- [x] Criar `components/portal/PortalRelatorioDiario.js`:
  - [x] Topo com KPIs gigantes (Demandas recebidas, Ofícios, Recursos fiscalizados)
  - [x] Carrossel vertical estilo stories das demandas mais apoiadas
  - [x] Pílulas horizontais de volume ("Do que as cidades mais precisaram")
- [x] Criar `components/portal/PortalEixos.js`:
  - [x] Grid dos 12 Eixos com cards escuros e círculos centrais creme com ilustrações temáticas
  - [x] Filtro por categoria para exibir leis, emendas e demandas daquele eixo

## Fase 3: As Inovações Cívicas de Alto Impacto
- [x] `components/portal/features/TinderLegislativo.js` (Votação A Favor / Contra com swipe e comparação com o deputado)
- [x] `components/portal/features/PizzaTracker.js` (Linha do tempo visual do protocolo estilo iFood/Correios com download de ofício PDF)
- [x] `components/portal/features/Economometro.js` (Nota Fiscal do Mandato e economia de cota em consultas/escolas/asfalto)
- [x] `components/portal/features/AntesDepoisSlider.js` (Comparador interativo com slider de fotos da demanda e entrega)
- [x] `components/portal/features/AlertaBairroWhatsApp.js` (Cadastro para alertas por raio de 2km do CEP do morador)

## Fase 4: Modais, Gavetas e Integração Global
- [x] Criar `components/portal/modals/NewDemandModal.js` (Upload com fotos, GPS/bairro, categoria e geração de protocolo)
- [x] Criar `components/portal/modals/TrackProtocolModal.js` (Busca direta de protocolo com exibição do Pizza Tracker)
- [x] Criar `components/portal/drawers/CitizenAIChatDrawer.js` (Chatbot público do gabinete para respostas cívicas integrado à API Gemini)
- [x] Atualizar `app/page.js` para renderizar o `CitizenAppShell` na rota raiz `/`
- [x] Manter e testar as rotas administrativas intactas (`/acessar` e `/app`) -> HTTP 200 OK
- [x] Validar compilação e servidor ativo em `http://localhost:3005` -> HTTP 200 OK
