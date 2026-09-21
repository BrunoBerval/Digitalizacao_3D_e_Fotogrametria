# Mapeamento de Pinos e Pinout (ESP32 DevKit 30 Pinos)

Este documento apresenta a distribuição física de pinos (pinout) do microcontrolador **ESP32 DevKit V1 (versão com 30 pinos - 15 por lado)**, detalhando as funções lógicas, interfaces e restrições de cada conexão no projeto.

---

## 1. Diagrama Esquemático ASCII do Microcontrolador

```text
                               ESP32 DevKit V1 (30 Pinos)
                                     +-------------+
                 EN (Reset Externo) -| 01       30 |- GPIO 23 [Livre / Expansão]
      [Potenciômetro ADC1]  GPIO 36 -| 02 (VP)  29 |- GPIO 22 [LCD 16x2 - I2C SCL]
                            GPIO 39 -| 03 (VN)  28 |- GPIO 01 [TX0 - Log Serial]
                            GPIO 34 -| 04       27 |- GPIO 03 [RX0 - Log Serial]
                            GPIO 35 -| 05       26 |- GPIO 21 [LCD 16x2 - I2C SDA]
       [Push Button PULLUP] GPIO 32 -| 06       25 |- GPIO 19 [ULN2003 - IN1]
        [Módulo Mini Laser] GPIO 33 -| 07       24 |- GPIO 18 [ULN2003 - IN2]
        [Buzzer PWM / Tone] GPIO 25 -| 08       23 |- GPIO 05 [ULN2003 - IN3]
     [LED Verde - Standby]  GPIO 26 -| 09       22 |- GPIO 17 [ULN2003 - IN4]
    [LED Amarelo - Giro]    GPIO 27 -| 10       21 |- GPIO 16 [Livre / Expansão]
    [LED Vermelho - Foto]   GPIO 14 -| 11       20 |- GPIO 04 [Livre / IR Opcional]
                            GPIO 12 -| 12       19 |- GPIO 00 [Pino de Boot]
                            GPIO 13 -| 13       18 |- GPIO 02 [LED Azul Onboard]
                        GND (Terra) -| 14       17 |- GPIO 15 [Livre / Expansão]
                  VIN (5V USB/Fonte)-| 15       16 |- 3V3 (Saída Regulada 3.3V)
                                     +-------------+
```

---

## 2. Tabela Detalhada de Conexões e Especificações Elétricas

| GPIO / Pino | Nome do Componente | Modo de Operação | Tensão / Nível | Descrição Funcional |
| :---: | :--- | :---: | :---: | :--- |
| **`GPIO 21`** | LCD 16x2 (I2C) | `SDA (I2C)` | 3.3V / 5V (I2C) | Linha serial de dados bidirecional |
| **`GPIO 22`** | LCD 16x2 (I2C) | `SCL (I2C)` | 3.3V / 5V (I2C) | Linha serial de clock de sincronismo |
| **`GPIO 19`** | Driver ULN2003 (IN1) | `OUTPUT` | 3.3V Lógico | Comanda a fase A do motor de passo |
| **`GPIO 18`** | Driver ULN2003 (IN2) | `OUTPUT` | 3.3V Lógico | Comanda a fase B do motor de passo |
| **`GPIO 05`** | Driver ULN2003 (IN3) | `OUTPUT` | 3.3V Lógico | Comanda a fase C do motor de passo |
| **`GPIO 17`** | Driver ULN2003 (IN4) | `OUTPUT` | 3.3V Lógico | Comanda a fase D do motor de passo |
| **`GPIO 26`** | LED Verde | `OUTPUT` | 3.3V (com $300\,\Omega$) | Indica sistema pronto ou ciclo 100% finalizado |
| **`GPIO 27`** | LED Amarelo | `OUTPUT` | 3.3V (com $300\,\Omega$) | Indica rotação mecânica ou pausa de estabilização |
| **`GPIO 14`** | LED Vermelho | `OUTPUT` | 3.3V (com $300\,\Omega$) | Indica momento exato do disparo fotográfico |
| **`GPIO 33`** | Módulo Mini Laser | `OUTPUT` | 3.3V / 5V | Mira óptica para centralização (desliga durante o scan) |
| **`GPIO 25`** | Buzzer Piezoelétrico | `OUTPUT (PWM)` | 3.3V Lógico | Emissão de frequências sonoras de feedback (800 Hz a 1800 Hz) |
| **`GPIO 32`** | Push Button | `INPUT_PULLUP` | 0V (Ativo em LOW) | Botão multifunção (Iniciar, Pausar, Retomar e Resetar) |
| **`GPIO 36`** | Potenciômetro 10kΩ | `ANALOG (ADC1_0)` | 0V a 3.3V (12 bits) | Leitura analógica de 0 a 4095 para mapear de 8 a 36 fotos |
| **`VIN`** | Barramento 5V | `POWER INPUT/OUT` | 5.0V DC | Alimentação do driver do motor e do backlight do LCD |
| **`GND`** | Barramento Comum | `POWER GND` | 0V | Referência elétrica de aterramento compartilhada por todos os módulos |

---

## 3. Cuidados e Decisões de Engenharia de Hardware

1. **Uso dos Canais ADC1:** O potenciômetro está conectado ao `GPIO 36` (pertencente ao conversor analógico **ADC1**). Os pinos do **ADC2** foram expressamente evitados pois perdem a capacidade de leitura analógica quando os rádios **Wi-Fi ou Bluetooth** do ESP32 são ativados.
2. **Pinos de Boot Protegidos:** Os pinos de *strapping* (`GPIO 0`, `GPIO 2`, `GPIO 12` e `GPIO 15`) foram mantidos livres para garantir inicialização limpa e gravação de firmware sem falhas.
3. **Imunidade a Ruído no Botão (`GPIO 32`):** O pino 32 utiliza o resistor de *pull-up* interno ativado via software em conjunto com rotina de *debounce* por amostragem temporal no firmware.
