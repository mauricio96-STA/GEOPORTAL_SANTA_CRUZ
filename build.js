const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

const files = ['index.html', 'app.js', 'styles.css'];

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('⚠️  ERROR: SUPABASE_URL y SUPABASE_KEY no están definidas.');
    console.error('   Configúralas en Vercel → Settings → Environment Variables');
    process.exit(1);
}

console.log(`🔑 SUPABASE_URL: ${supabaseUrl.substring(0, 30)}...`);
console.log(`🔑 SUPABASE_KEY: ${supabaseKey.substring(0, 20)}...`);

const vars = {
    '{{SUPABASE_URL}}': supabaseUrl,
    '{{SUPABASE_KEY}}': supabaseKey
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
