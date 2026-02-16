document.addEventListener('DOMContentLoaded', () => {
    const yamlInput = document.getElementById('yaml-input');
    const pythonOutput = document.getElementById('python-output');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');

    // Auto-convert on typing (with debounce)
    let timeout = null;
    yamlInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(convert, 500);
    });

    convertBtn.addEventListener('click', convert);

    clearBtn.addEventListener('click', () => {
        yamlInput.value = '';
        pythonOutput.value = '';
        yamlInput.focus();
    });

    downloadBtn.addEventListener('click', () => {
        const content = pythonOutput.value;
        if (!content) return;

        const blob = new Blob([content], { type: 'text/x-python' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.py';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    copyBtn.addEventListener('click', () => {
        if (!pythonOutput.value) return;
        navigator.clipboard.writeText(pythonOutput.value).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });

    function convert() {
        const yamlText = yamlInput.value;
        if (!yamlText.trim()) {
            pythonOutput.value = '';
            return;
        }

        try {
            const obj = jsyaml.load(yamlText);
            let pythonCode = '';

            for (const [key, value] of Object.entries(obj)) {
                pythonCode += `${key} = ${formatValue(value)}\n`;
            }

            pythonOutput.value = pythonCode.trim();
        } catch (e) {
            pythonOutput.value = `# Error parsing YAML:\n# ${e.message}`;
        }
    }

    function formatValue(value) {
        if (value === null) return 'None';
        if (value === true) return 'True';
        if (value === false) return 'False';

        if (typeof value === 'string') {
            // Check if string looks like it contains existing python repr
            // User example: Modeling_Journey: '411918': '[''Base'', ''Pathways'']'
            // The user input example shows some strings that are effectively python structures in strings.
            // However, the standard behavior for a converter is to treat everything as a string unless it parses otherwise.
            // Let's stick to standard repr-like behavior but prioritize double quotes if single quotes exist.
            if (value.includes("'") && !value.includes('"')) {
                return `"${value}"`;
            } else if (value.includes('"') && !value.includes("'")) {
                return `'${value}'`;
            } else {
                // Default to double quotes or escaped quotes
                return JSON.stringify(value);
            }
        }

        if (Array.isArray(value)) {
            const items = value.map(formatValue).join(', ');
            return `[${items}]`;
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value).map(([k, v]) => {
                // Keys in python dicts are typically strings (unless it works otherwise)
                // In YAML keys are strings.
                return `'${k}': ${formatValue(v)}`;
            });
            return `{${entries.join(', ')}}`;
        }

        return String(value);
    }
});
