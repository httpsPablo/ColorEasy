document.addEventListener('DOMContentLoaded', () => {
    const palettesGrid = document.getElementById('palettesGrid');
    const searchInput = document.getElementById('searchInput');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const colorPicker = document.getElementById('colorPicker');
    const colorPreview = document.getElementById('colorPreview');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');
    const toast = document.getElementById('toast');

    let currentCategory = 'trending';
    let filteredPalettes = [...colorPalettes];

    // Initialize the page
    updatePalettesGrid();
    updateColorInfo(colorPicker.value);

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredPalettes = colorPalettes.filter(palette => 
            palette.name.toLowerCase().includes(searchTerm) ||
            palette.category.toLowerCase().includes(searchTerm)
        );
        updatePalettesGrid();
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filteredPalettes = colorPalettes.filter(palette => 
                currentCategory === 'trending' || palette.category === currentCategory
            );
            updatePalettesGrid();
        });
    });

    colorPicker.addEventListener('input', (e) => {
        updateColorInfo(e.target.value);
    });

    // Functions
    function updatePalettesGrid() {
        palettesGrid.innerHTML = '';
        filteredPalettes.forEach(palette => {
            const card = createPaletteCard(palette);
            palettesGrid.appendChild(card);
        });
    }

    function createPaletteCard(palette) {
        const card = document.createElement('div');
        card.className = 'palette-card';
        
        const colorsDiv = document.createElement('div');
        colorsDiv.className = 'palette-colors';
        
        palette.colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'palette-color';
            colorDiv.style.backgroundColor = color;
            colorDiv.addEventListener('click', () => copyToClipboard(color));
            colorsDiv.appendChild(colorDiv);
        });

        const info = document.createElement('div');
        info.className = 'palette-info';
        info.innerHTML = `
            <div class="palette-name">${palette.name}</div>
            <div class="palette-category">${palette.category}</div>
        `;

        card.appendChild(colorsDiv);
        card.appendChild(info);
        return card;
    }

    function updateColorInfo(color) {
        // Update color preview
        colorPreview.style.backgroundColor = color;
        
        // Update hex value
        hexValue.textContent = color.toUpperCase();
        
        // Update RGB value
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        rgbValue.textContent = `RGB(${r}, ${g}, ${b})`;
        
        // Update HSL value
        const hsl = hexToHSL(color);
        hslValue.textContent = `HSL(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        // Create variations section if it doesn't exist
        let variationsSection = document.querySelector('.color-variations');
        if (!variationsSection) {
            variationsSection = document.createElement('div');
            variationsSection.className = 'color-variations';
            document.querySelector('.color-info').appendChild(variationsSection);
        }

        // Update variations
        updateColorVariations(color, variationsSection);

        // Add click to copy for all color values
        [hexValue, rgbValue, hslValue].forEach(element => {
            element.addEventListener('click', () => copyToClipboard(element.textContent));
        });
    }

    function updateColorVariations(color, container) {
        container.innerHTML = '';

        // Shades and Tints
        const variations = generateColorVariations(color);
        addVariationSection('Shades & Tints', variations, container);

        // Monochromatic
        const monochromatic = generateMonochromaticPalette(color);
        addVariationSection('Monochromatic', monochromatic, container);

        // Analogous
        const analogous = generateAnalogousPalette(color);
        addVariationSection('Analogous', analogous, container);
    }

    function addVariationSection(title, colors, container) {
        const section = document.createElement('div');
        section.className = 'variation-section';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'variation-title';
        titleElement.textContent = title;
        
        const colorRow = document.createElement('div');
        colorRow.className = 'color-row';
        
        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            colorBox.setAttribute('data-color', color);
            colorBox.addEventListener('click', () => copyToClipboard(color));
            colorRow.appendChild(colorBox);
        });
        
        section.appendChild(titleElement);
        section.appendChild(colorRow);
        container.appendChild(section);
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast();
        });
    }

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
});