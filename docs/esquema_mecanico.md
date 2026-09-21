# Esquema Mecânico e Acoplamento Cinemático (Upcycling)

Este documento detalha o arranjo mecânico, transmissão cinemática e conceitos de reaproveitamento de sucata eletrônica (*upcycling*) implementados na mesa giratória.

---

## 1. Visão Geral da Cinemática

O sistema converte o movimento angular do **motor de passo 28BYJ-48** em rotação suave e estável no prato de suporte de fotogrametria, utilizando como eixo de rotação principal o **mecanismo de spindle de um leitor óptico de CD/DVD descartado**.

```
              [ Prato / Disco DVD com base em EVA fosco ]
                                   |
                +------------------v------------------+
                |  Spindle com Travas Esféricas de CD  |
                +------------------+------------------+
                                   | (Mancal de Precisão)
              =====================+===================== (Chapa de Fixação)
                     |                             |
                     |     [ Correia Elástica ]    |
                     +---------------------------->| [ Polia Branca ]
                                                   | [ Eixo D-Shaft ]
                                            +------v------+
                                            | Motor Passo |
                                            |  28BYJ-48   |
                                            +-------------+
```

---

## 2. Componentes Mecânicos Reaproveitados

1. **Spindle Central de Precisão:**
   - **Origem:** Unidade de leitura óptica de notebook/desktop (Samsung / Lite-On).
   - **Função:** Atua como o mancal de rotação e ponto de acoplamento do prato.
   - **Vantagens:** Possui 3 micro-esferas sob pressão de mola que travam o disco DVD centralmente com concentricidade perfeita, rotação balanceada e baixíssimo atrito.
2. **Prato de Digitalização:**
   - Disco de mídia DVD padrão (120 mm de diâmetro) com um disco de **EVA preto fosco** colado na face superior para eliminar reflexos indesejados nas fotos.
3. **Polia e Sistema de Transmissão:**
   - Polia ranhurada proveniente do mecanismo de ejeção da gaveta óptica acoplada diretamente ao eixo chanfrado (*D-shaft*) do motor de passo.
   - **Correia de Transmissão Elastomérica:** Anel elástico de borracha de diâmetro médio, conferindo tração elástica contínua entre a polia motora e a borda do spindle.

---

## 3. Benefícios da Transmissão por Correia Elástica

Na fotogrametria de precisão, a transmissão por correia elástica oferece vantagens superiores em relação a engrenagens rígidas diretas:

* **Filtro Mecânico de Vibrações (Amortecimento):** Os motores de passo avançam em pulsos discretos (degraus magnéticos). O elastômero da correia absorve e dissipa os micro-impactos dos passos, impedindo que trepidações alcancem o objeto.
* **Tolerância a Desalinhamento:** Não exige alinhamento micrométrico entre eixos, eliminando riscos de travamento mecânico por sujeira ou desalinhamento angular.
* **Zero Backlash (Sem Folga de Engrenamento):** Mantém tração constante e suave durante a aceleração e desaceleração.

---

## 4. Cálculo de Resolução Mecânica

O motor **28BYJ-48** opera com um trem de engrenagens de redução interno de proporção nominal de **1:64**:
* **Passos por ciclo elétrico (4 fases):** 32 passos.
* **Passos por rotação completa do eixo de saída:**
  $$\text{Passos Totais} = 32 \times 64 = 2048 \text{ passos/volta}$$
* **Resolução angular elementar:**
  $$\theta_{\text{passo}} = \frac{360^\circ}{2048} \approx 0{,}1758^\circ \text{ por passo}$$

Com uma relação de transmissão aproximada de $1:1$ entre a polia e a pista do spindle, a mesa alcança uma precisão de posicionamento na ordem de **décimos de grau**, atendendo plenamente os critérios de rigor fotogramétrico.
