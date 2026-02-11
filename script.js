document.addEventListener('DOMContentLoaded', () => {
    const multiplyBtn = document.getElementById('multiplyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const inputs = document.querySelectorAll('input');
    const gfModeToggle = document.getElementById('gfMode');
    const modeLabel = document.querySelector('.mode-label');

    // Matrix input validation: Allow only 0-9, A-F
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.toUpperCase();
            // Remove invalid characters
            const cleanValue = value.replace(/[^0-9A-F]/g, '');
            if (value !== cleanValue) {
                e.target.value = cleanValue;
            } else {
                e.target.value = cleanValue; // Ensure uppercase
            }
        });
    });

    gfModeToggle.addEventListener('change', () => {
        modeLabel.textContent = gfModeToggle.checked ? 'Mode: Galois Field (AES)' : 'Mode: Standard Arithmetic';
    });

    multiplyBtn.addEventListener('click', () => {
        const matrixA = readMatrix('matrixA');
        const matrixB = readMatrix('matrixB');

        if (!matrixA || !matrixB) {
            alert('Please fill in all matrix cells.');
            return;
        }

        const useGF = gfModeToggle.checked;
        const resultMatrix = multiplyMatrices(matrixA, matrixB, useGF);
        displayResult(resultMatrix);
    });

    clearBtn.addEventListener('click', () => {
        inputs.forEach(input => input.value = '');
        // Clear result
        const resultCells = document.querySelectorAll('.result-grid .cell');
        resultCells.forEach(cell => cell.textContent = '00');
    });

    function readMatrix(containerId) {
        const container = document.getElementById(containerId);
        const matrix = [];
        for (let r = 0; r < 4; r++) {
            const row = [];
            for (let c = 0; c < 4; c++) {
                const input = container.querySelector(`input[data-row="${r}"][data-col="${c}"]`);
                const val = input.value.trim();
                const num = val === '' ? 0 : parseInt(val, 16);
                if (isNaN(num)) return null;
                row.push(num);
            }
            matrix.push(row);
        }
        return matrix;
    }

    function multiplyMatrices(A, B, useGF) {
        const C = new Array(4).fill(0).map(() => new Array(4).fill(0));

        for (let i = 0; i < 4; i++) { // Row of A
            for (let j = 0; j < 4; j++) { // Col of B
                let sum = 0;
                for (let k = 0; k < 4; k++) { // Shared dimension
                    if (useGF) {
                        // Galois Field Addition is XOR
                        sum ^= gMul(A[i][k], B[k][j]);
                    } else {
                        // Standard Addition
                        sum += A[i][k] * B[k][j];
                    }
                }
                C[i][j] = sum;
            }
        }
        return C;
    }

    // Galois Field Multiplication (GF(2^8)) for AES
    // Irreducible polynomial: x^8 + x^4 + x^3 + x + 1 (0x11B)
    function gMul(a, b) {
        let p = 0;
        for (let i = 0; i < 8; i++) {
            if ((b & 1) !== 0) {
                p ^= a;
            }
            const hi_bit_set = (a & 0x80) !== 0;
            a = (a << 1) & 0xFF; // Keep within 8 bits
            if (hi_bit_set) {
                a ^= 0x1B; // XOR with 0x11B (0x1B after shift)
            }
            b >>= 1;
        }
        return p & 0xFF;
    }

    function displayResult(matrix) {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const cell = document.querySelector(`.result-grid .cell[data-row="${r}"][data-col="${c}"]`);
                cell.textContent = matrix[r][c].toString(16).toUpperCase().padStart(2, '0');
            }
        }
    }
});
