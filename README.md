# Hexadecimal Matrix Multiplication Calculator

A modern, web-based tool for multiplying 4x4 hexadecimal matrices. Designed with a sleek, dark-mode interface and built-in support for both standard arithmetic and Galois Field (AES) arithmetic.

## Features

- **4x4 Matrix Input**: Easy-to-use grid interface for entering hexadecimal values (0-9, A-F).
- **Dual Calculation Modes**:
    - **Galois Field (AES) Mode**: Performs multiplication over GF(2^8) using the AES irreducible polynomial ($x^8 + x^4 + x^3 + x + 1$). This is the default mode, useful for cryptography applications like the AES MixColumns step.
    - **Standard Arithmetic Mode**: Performs standard matrix multiplication with normal integer addition and multiplication.
- **Real-Time Validation**: Input fields automatically validate and format hexadecimal entries.
- **Responsive Design**: fully responsive layout that works on desktop and mobile devices.

## Usage

1.  **Enter Values**: Fill in the 4x4 grids for **Matrix A** and **Matrix B** with hexadecimal values.
2.  **Select Mode**: Use the toggle switch to choose between "Galois Field (AES)" and "Standard Arithmetic".
3.  **Calculate**: Click the **CALCULATE RESULT** button to see the product matrix.
4.  **Clear**: Use the **CLEAR** button to reset all inputs and results.

## Technical Details

- **Tech Stack**: HTML5, CSS3, JavaScript (Vanilla).
- **GF(2^8) Implementation**: Uses the standard AES reduction polynomial `0x11B`.

## Installation

Simply clone the repository and open `index.html` in your browser.

```bash
git clone https://github.com/PaxChiR/Hexadecimal-Matrix-Multiplication-Calculator.git
cd Hexadecimal-Matrix-Multiplication-Calculator
# Open index.html
```

## License

[MIT License](LICENSE)