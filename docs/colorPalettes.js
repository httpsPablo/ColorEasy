const colorPalettes = [
    {
        name: "Ocean Breeze",
        category: "nature",
        colors: ["#1B4965", "#62B6CB", "#5FA8D3", "#CAE9F5", "#FFFFFF"]
    },
    {
        name: "Sunset Vibes",
        category: "trending",
        colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1", "#2C3E50"]
    },
    {
        name: "Forest Walk",
        category: "nature",
        colors: ["#2D5A27", "#5F8D4E", "#A4BE7B", "#E5D9B6", "#285430"]
    },
    {
        name: "Lavender Dream",
        category: "gradient",
        colors: ["#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4", "#22223B"]
    },
    {
        name: "Desert Storm",
        category: "trending",
        colors: ["#E6BEAE", "#C9A9A6", "#A79C93", "#8A897C", "#6F7072"]
    },
    {
        name: "Monochrome Blue",
        category: "monochrome",
        colors: ["#03045E", "#023E8A", "#0077B6", "#0096C7", "#00B4D8"]
    },
    {
        name: "Spring Pastels",
        category: "trending",
        colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB", "#F9DCC4", "#FEC89A"]
    },
    {
        name: "Urban Gray",
        category: "monochrome",
        colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#D3D3D3", "#FFFFFF"]
    },
    {
        name: "Rainbow Gradient",
        category: "gradient",
        colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF"]
    },
    {
        name: "Earthy Tones",
        category: "nature",
        colors: ["#582F0E", "#7F4F24", "#936639", "#A68A64", "#B6AD90"]
    },
    {
        name: "Neon Nights",
        category: "trending",
        colors: ["#FF00FF", "#00FF00", "#00FFFF", "#FF0099", "#6600FF"]
    },
    {
        name: "Vintage Warmth",
        category: "gradient",
        colors: ["#CB997E", "#DDBEA9", "#FFE8D6", "#B7B7A4", "#A5A58D"]
    }
];

// Function to generate color variations
function generateColorVariations(baseColor) {
    const hsl = hexToHSL(baseColor);
    const variations = [];
    
    // Generate 5 lighter shades
    for (let i = 0; i < 5; i++) {
        variations.push(HSLToHex(hsl.h, hsl.s, Math.min(100, hsl.l + (i + 1) * 10)));
    }
    
    // Add the base color
    variations.push(baseColor);
    
    // Generate 5 darker shades
    for (let i = 0; i < 5; i++) {
        variations.push(HSLToHex(hsl.h, hsl.s, Math.max(0, hsl.l - (i + 1) * 10)));
    }
    
    return variations;
}

// Function to generate monochromatic variations
function generateMonochromaticPalette(baseColor) {
    const hsl = hexToHSL(baseColor);
    return [
        HSLToHex(hsl.h, Math.max(0, hsl.s - 30), hsl.l),      // Less saturated
        HSLToHex(hsl.h, Math.max(0, hsl.s - 15), hsl.l),      // Slightly less saturated
        baseColor,                                             // Original color
        HSLToHex(hsl.h, Math.min(100, hsl.s + 15), hsl.l),    // Slightly more saturated
        HSLToHex(hsl.h, Math.min(100, hsl.s + 30), hsl.l)     // More saturated
    ];
}

// Function to generate analogous colors
function generateAnalogousPalette(baseColor) {
    const hsl = hexToHSL(baseColor);
    return [
        HSLToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),     // -30 degrees
        HSLToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),     // -15 degrees
        baseColor,                                             // Original color
        HSLToHex((hsl.h + 15) % 360, hsl.s, hsl.l),           // +15 degrees
        HSLToHex((hsl.h + 30) % 360, hsl.s, hsl.l)            // +30 degrees
    ];
}

// Helper function to convert hex to HSL
function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Helper function to convert HSL to hex
function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c/2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`.toUpperCase();
}