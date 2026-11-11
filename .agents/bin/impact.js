const fs = require('fs');
const path = require('path');

// Uso: node .agents/bin/impact.js <simbolo_o_archivo> [directorio_raiz]
const TARGET_QUERY = process.argv[2];
const PROJECT_ROOT = process.argv[3] ? path.resolve(process.argv[3]) : path.resolve(__dirname, '..', '..');

const IGNORED_DIRS = new Set([
  'node_modules', '.git', '.next', '.nuxt', 'dist', 'build',
  'out', '.agents', 'coverage', '.vscode', '.idea', 'tmp', 'temp', 'vendor'
]);

const CODE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.py', '.php', '.sql']);
const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB límite anti-DoS

function collectFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isSymbolicLink && entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.')) {
        collectFiles(path.join(dir, entry.name), list);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CODE_EXTS.has(ext)) {
        const fullPath = path.join(dir, entry.name);
        try {
          if (fs.statSync(fullPath).size <= MAX_FILE_SIZE_BYTES) {
            list.push(fullPath);
          }
        } catch (e) {}
      }
    }
  }
  return list;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  if (!TARGET_QUERY) {
    console.log('\n======================================================');
    console.log('🦾 Exo Advance — Radar de Radio de Explosión (impact.js)');
    console.log('======================================================');
    console.log('Uso: node .agents/bin/impact.js <NombreFuncion | Interfaz | Archivo>\n');
    process.exit(1);
  }

  const cleanQuery = path.basename(TARGET_QUERY, path.extname(TARGET_QUERY));
  const files = collectFiles(PROJECT_ROOT);

  const definitions = [];
  const usages = [];
  const affectedFiles = new Set();

  const defRegex = new RegExp(
    `(?:export\\s+(?:default\\s+)?)?(?:async\\s+)?(?:function|const|let|class|interface|type|def)\\s+${escapeRegExp(cleanQuery)}\\b`
  );
  const wordRegex = new RegExp(`\\b${escapeRegExp(cleanQuery)}\\b`);

  for (const file of files) {
    const relPath = path.relative(PROJECT_ROOT, file).replace(/\\/g, '/');
    const isTargetFile = path.basename(file, path.extname(file)) === cleanQuery || relPath.endsWith(TARGET_QUERY.replace(/\\/g, '/'));

    let content;
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch (e) {
      continue;
    }

    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

      if (defRegex.test(trimmed)) {
        definitions.push({ file: relPath, line: i + 1, code: trimmed.substring(0, 100) });
      } else if (wordRegex.test(trimmed)) {
        usages.push({ file: relPath, line: i + 1, code: trimmed.substring(0, 100) });
        affectedFiles.add(relPath);
      } else if (isTargetFile && i === 0) {
        definitions.push({ file: relPath, line: 1, code: '[Archivo Objetivo]' });
      }
    }
  }

  const totalFiles = affectedFiles.size;
  let riskLevel = '🟢 BAJO (Cambio aislado)';
  if (totalFiles >= 5) riskLevel = '🔴 CRÍTICO (Alto riesgo de rotura en cascada — Requiere revisión de contratos)';
  else if (totalFiles >= 2) riskLevel = '🟡 MEDIO (Impacto multi-archivo — Verificar firmas e imports)';

  console.log('\n======================================================');
  console.log(`🦾 Radar de Radio de Explosión: "${cleanQuery}"`);
  console.log('======================================================');
  console.log(`📊 Nivel de Riesgo: ${riskLevel}`);
  console.log(`📁 Archivos Dependientes: ${totalFiles} | Referencias Totales: ${usages.length}\n`);

  if (definitions.length > 0) {
    console.log('📍 Definición(es) Principal(es):');
    for (const d of definitions) {
      console.log(`   • [${d.file}#L${d.line}] ${d.code}`);
    }
    console.log('');
  }

  if (usages.length > 0) {
    console.log('💥 Puntos de Impacto Directo (Consumidores que se verán afectados):');
    for (const u of usages.slice(0, 25)) {
      console.log(`   • [${u.file}#L${u.line}] ${u.code}`);
    }
    if (usages.length > 25) {
      console.log(`   ... y ${usages.length - 25} referencias adicionales.`);
    }
  } else {
    console.log('✅ Cero consumidores externos detectados. Puedes modificar o eliminar con seguridad.');
  }
  console.log('======================================================\n');
}

main();
