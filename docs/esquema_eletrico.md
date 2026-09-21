# Esquema Elétrico e Conexões (ESP32 DevKit 30 Pinos)

Este documento descreve detalhadamente todas as conexões ponto a ponto entre o **ESP32 DevKit (30 pinos)**, atuadores, sensores e módulos de interface.

---

## 1. Diagrama de Pinos do ESP32 (30 Pinos)

```text
                        ESP32 DevKit (30 pinos)
                             +-----------+
              EN (Reset) --- | 01     30 | --- GPIO 23 (Livre / Expansão)
   (Potenciômetro) GPIO 36 - | 02     29 | --- GPIO 22 (LCD 16x2 - I2C SCL)
                   GPIO 39 - | 03     28 | --- GPIO 01 (TX0 - Debug Serial)
                   GPIO 34 - | 04     27 | --- GPIO 03 (RX0 - Debug Serial)
                   GPIO 35 - | 05     26 | --- GPIO 21 (LCD 16x2 - I2C SDA)
        (Botão)    GPIO 32 - | 06     25 | --- GPIO 19 (Driver ULN2003 - IN1)
        (Laser)    GPIO 33 - | 07     24 | --- GPIO 18 (Driver ULN2003 - IN2)
        (Buzzer)   GPIO 25 - | 08     23 | --- GPIO 05 (Driver ULN2003 - IN3)
     (LED Verde)   GPIO 26 - | 09     22 | --- GPIO 17 (Driver ULN2003 - IN4)
   (LED Amarelo)   GPIO 27 - | 10     21 | --- GPIO 16 (Livre / Expansão)
  (LED Vermelho)   GPIO 14 - | 11     20 | --- GPIO 04 (Livre / IR Opcional)
                   GPIO 12 - | 12     19 | --- GPIO 00 (Boot)
                   GPIO 13 - | 13     18 | --- GPIO 02 (LED Onboard)
                       GND - | 14     17 | --- GPIO 15 (Livre / Expansão)
                 VIN (5V) -- | 15     16 | --- 3V3 (3.3V Saída)
                             +-----------+
```

---

## 2. Tabela de Ligações Detalhada

### A. Display LCD 16x2 com Módulo I2C (PCF8574)
| Pino no Módulo I2C | Conexão no ESP32 / Protoboard | Observações |
| :--- | :--- | :--- |
| **GND** | Barramento `GND` | Terra comum |
| **VCC** | Barramento `5V` (VIN da fonte) | Alimentação da lógica e backlight |
| **SDA** | **`GPIO 21`** | Linha I2C Data |
| **SCL** | **`GPIO 22`** | Linha I2C Clock |

*(Nota: Ajustar o trimpot azul traseiro caso o texto fique sem contraste).*

---

### B. Driver de Motor de Passo (ULN2003 + 28BYJ-48)
| Pino no Driver ULN2003 | Conexão no ESP32 / Protoboard |
| :--- | :--- |
| **IN1** | **`GPIO 19`** |
| **IN2** | **`GPIO 18`** |
| **IN3** | **`GPIO 05`** |
| **IN4** | **`GPIO 17`** |
| **+ (VCC)** | Barramento **`5V`** da Fonte Externa |
| **- (GND)** | Barramento **`GND`** Comum |

---

### C. LEDs de Sinalização de Estado
| LED | Ânodo (+) | Cátodo (-) | Resistor |
| :--- | :--- | :--- | :--- |
| **Verde (Standby/Fim)** | **`GPIO 26`** | Barramento `GND` | $300\,\Omega$ em série |
| **Amarelo (Giro/Espera)** | **`GPIO 27`** | Barramento `GND` | $300\,\Omega$ em série |
| **Vermelho (Foto)** | **`GPIO 14`** | Barramento `GND` | $300\,\Omega$ em série |

---

### D. Sensores e Atuadores Auxiliares
* **Push Button:** Um terminal no **`GPIO 32`** e o outro terminal no **`GND`** (aciona por `INPUT_PULLUP`).
* **Potenciômetro:** Terminal esquerdo no **`3.3V`**, terminal central no **`GPIO 36 (VP)`**, terminal direito no **`GND`**.
* **Mini Laser:** Terminal positivo de sinal no **`GPIO 33`**, terminal negativo no **`GND`**.
* **Buzzer:** Terminal positivo (+) no **`GPIO 25`**, terminal negativo (-) no **`GND`**.

---

## 3. Recomendações Elétricas de Montagem
1. **GND Unificado:** Todos os pontos de terra (ESP32, fonte de protoboard, driver, display e LEDs) devem estar estritamente conectados ao mesmo barramento de GND.
2. **Separação de Potência:** O motor 28BYJ-48 deve ser alimentado preferencialmente pelo barramento de 5V da fonte auxiliar/USB externa, evitando ruídos no circuito do microcontrolador.
