# Manual de Operação do Sistema de Fotogrametria 3D

Este documento fornece as instruções operacionais para calibração, pareamento sem fio e execução de ciclos de escaneamento automatizado na mesa giratória.

---

## 1. Preparação do Equipamento e Conexões

1. **Alimentação:**
   - Conecte o cabo USB ao ESP32 (conectado a uma porta de computador ou fonte 5V 2A).
   - Certifique-se de que o módulo de fonte da protoboard esteja ligado e com o jumper na posição **5V**.
2. **Inicialização do Sistema:**
   - O display LCD 16x2 acenderá exibindo `"FOTOGRAMETRIA 3D"` seguido da inicialização dos módulos.
   - O **LED Verde** acenderá em modo Standby.
   - O **Módulo Laser** emitirá um feixe vermelho vertical voltado para o centro do prato.

---

## 2. Pareamento Bluetooth com o Smartphone

1. No smartphone (Android ou iOS), acesse as **Configurações de Bluetooth**.
2. Clique em **"Procurar novos dispositivos"**.
3. Selecione o dispositivo: **`Scanner 3D Shutter`**.
4. Confirme o pareamento.
5. O LCD da mesa atualizará exibindo a mensagem: **`[BLE:ON]`** ou **`BLE CONECTADO :)`**.
6. Abra o aplicativo oficial de **Câmera** do smartphone e posicione o aparelho no suporte frontal da estrutura.

---

## 3. Posicionamento e Calibração do Objeto

1. Coloque o objeto a ser digitalizado sobre o disco DVD.
2. Observe o ponto luminoso do **feixe laser**:
   - Ajuste o objeto até que o laser atinja o **centro geométrico** da peça.
3. Isso garante que o objeto gire sobre seu próprio eixo de simetria sem oscilações excêntricas.

---

## 4. Ajuste da Resolução Angular (Densidade de Fotos)

Gire o **Knob do Potenciômetro** no painel frontal para escolher a quantidade de capturas na volta completa de 360°:

| Posição do Potenciômetro | Fotos por Volta ($N$) | Espaçamento Angular ($\Delta\theta$) | Recomendação de Uso |
| :---: | :---: | :---: | :--- |
| **Mínimo** | **8 a 12 fotos** | $30^\circ$ a $45^\circ$ | Testes rápidos de textura ou peças com poucos detalhes |
| **Médio** | **20 a 24 fotos** | $15^\circ$ a $18^\circ$ | **Padrão recomendado** para a maioria dos objetos |
| **Máximo** | **30 a 36 fotos** | $10^\circ$ a $12^\circ$ | Escaneamento de alta densidade / peças complexas |

---

## 5. Execução do Ciclo de Escaneamento

### Iniciar Varredura
* Dê **1 clique simples** no botão frontal.
* O sistema emitirá um bip sonoro, apagará o laser (para não estragar a iluminação) e iniciará o ciclo:
  1. **Giro Mecânico:** A mesa rotaciona $\Delta\theta$ (LED Amarelo pisca e LCD exibe `"GIRANDO MESA..."`).
  2. **Pausa de Estabilização:** Pausa automática de 600 ms para extinguir qualquer vibração mecânica.
  3. **Disparo Fotográfico:** O ESP32 envia o sinal BLE `Volume +`, o **LED Vermelho** acende e um bip curto confirma a captura da foto.
  4. **Pausa de Exposição:** Intervalo de 1,2 s para o processamento de imagem da câmera do smartphone.
  5. O processo repete-se até completar os 360°.

---

## 6. Controles de Pausa, Retomada e Cancelamento

A qualquer momento durante a execução, o operador pode intervir usando o botão físico:

```
                  [ EM EXECUÇÃO ]
                         |
                         | (1 Clique)
                         v
                  [ >> PAUSADO << ]
                   /             \
 (1 Clique pós-janela)         (Duplo Clique Rápido)
         /                         \
        v                           v
  [ RETOMAR CICLO ]           [ CANCELAR E RETORNAR AO PONTO 0 ]
Continua na mesma foto       Motor inverte os passos e volta à partida
```

1. **Pausar Ciclo:** Dê **1 clique** enquanto a mesa estiver em execução. O sistema entrará no estado `PAUSADO` e desenergizará as bobinas do motor.
2. **Retomar Ciclo:** No modo de pausa, dê **1 clique** e aguarde 0,5 s. O sistema emitirá um bip e continuará exatamente de onde parou.
3. **Cancelar e Resetar ao Ponto Zero:** No modo de pausa, dê um **duplo clique rápido**. O sistema emitirá um tom grave, ativará a rotação reversa de precisão e retornará o prato exatamente à orientação inicial de 0°.

---

## 7. Fim de Ciclo e Processamento 3D

1. Ao alcançar a última foto, o motor fecha os 360° exatos, o buzzer emite a melodia de conclusão e o LCD exibe `"SCAN CONCLUIDO!"`.
2. Transfira as fotos do smartphone para o computador.
3. Importe a pasta de fotos para o software **3DF Zephyr** (ou *Meshroom* / *RealityCapture*) para computar a nuvem de pontos densa e a malha 3D poligonal.
