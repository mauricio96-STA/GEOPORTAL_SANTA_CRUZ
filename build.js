const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Crear directorio dist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Archivos a procesar
const files = ['index.html', 'app.js', 'styles.css'];

// Variables de entorno
const vars = {
    '{{SUPABASE_URL}}': process.env.SUPABASE_URL || '',
    '{{SUPABASE_KEY}}': process.env.SUPABASE_KEY || ''
};

files.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distDir, file);

    if (fs.existsSync(src)) {
        let content = fs.readFileSync(src, 'utf8');
        for (const [placeholder, value] of Object.entries(vars)) {
            content = content.split(placeholder).join(value);
        }
        fs.writeFileSync(dest, content, 'utf8');
        console.log(`✅ ${file} → dist/${file}`);
    }
});

console.log('\n🚀 Build completado en /dist');
