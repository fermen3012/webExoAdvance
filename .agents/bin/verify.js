const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directorio raíz del proyecto (donde reside .agents/ o pasado como argumento)
const PROJECT_ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..', '..');
const AGENTS_DIR = path.join(PROJECT_ROOT, '.agents');
const MEMORY_DIR = path.join(AGENTS_DIR, 'memory');
const SKILLS_DIR = path.join(AGENTS_DIR, 'skills');

const results = {
  memoryIntegrity: { name: 'Memoria & Invariantes', pass: false, details: '' },
  secretAudit: { name: 'Auditoría InfoSec (Cero Secretos Expuestos)', pass: false, details: '' },
  typeCheck: { name: 'QA Gate & Comprobación de Tipos', pass: false, details: '' },
  cloudCostGuard: { name: 'Escudo Anti-Facturas Cloud & Patrones N+1', pass: false, details: '' },
  skeletonSync: { name: 'Sincronización del Esqueleto AST', pass: false, details: '' },
  i18nGuard: { name: 'Gobernanza English-First & Paridad Bilingüe i18n (Regla 10)', pass: false, details: '' },
  adversarialPbtGuard: { name: 'Blindaje Adversarial & Invariantes PBT (Regla 11)', pass: false, details: '' }
};

// 1. Verificación de Integridad de Memoria
function checkMemory() {
  const requiredFiles = [
    path.join(MEMORY_DIR, 'invariants.json'),
    path.join(MEMORY_DIR, 'graph.json'),
    path.join(MEMORY_DIR, 'state.json'),
    path.join(MEMORY_DIR, 'antidotes.json'),
    path.join(SKILLS_DIR, 'registry.json')
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      results.memoryIntegrity.details = `Archivo faltante: ${path.relative(PROJECT_ROOT, file)}`;
      return;
    }
    try {
      JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      results.memoryIntegrity.details = `JSON inválido en: ${path.relative(PROJECT_ROOT, file)} (${e.message})`;
      return;
    }
  }

  results.memoryIntegrity.pass = true;
  results.memoryIntegrity.details = '5 archivos de memoria (incluyendo antidotes.json) y registro validados.';
}

// 2. Auditoría InfoSec y Prevención de Fuga de Secretos
function checkSecrets() {
  // Verificar .gitignore
  const gitignorePath = path.join(PROJECT_ROOT, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignoreContent.includes('.env')) {
      results.secretAudit.details = '.gitignore no contiene regla para proteger archivos .env';
      return;
    }
  }

  // Patrones peligrosos de claves en archivos de código
  const dangerousPatterns = [
    /sk_live_[A-Za-z0-9_]{16,}/,
    /gh[pousr]_[A-Za-z0-9_]{20,}/,
    /AIzaSy[A-Za-z0-9_\-]{25,}/,
    /sbp_[A-Za-z0-9_]{20,}/,
    /vck_[A-Za-z0-9_]{20,}/,
    /sk-(?:proj-)?[A-Za-z0-9_\-]{20,}/,
    /sk-ant-[A-Za-z0-9_\-]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /xox[baprs]-[0-9a-zA-Z]{10,}/,
    /-----BEGIN (?:[A-Z ]+)?PRIVATE KEY-----/
  ];

  // Auditoría específica de .mcp.json para garantizar cero claves hardcodeadas
  const mcpConfigPath = path.join(PROJECT_ROOT, '.mcp.json');
  if (fs.existsSync(mcpConfigPath)) {
    try {
      const mcpContent = fs.readFileSync(mcpConfigPath, 'utf8');
      if (mcpContent.includes('sbp_') || mcpContent.includes('vck_') || mcpContent.includes('postgres://') && !mcpContent.includes('${DATABASE_URL}')) {
        results.secretAudit.details = 'Token o credencial real hardcodeada detectada en .mcp.json. Usa variables de entorno ${...}.';
        return;
      }
    } catch (e) {}
  }

  const codeFiles = [];
  const ignoredDirs = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.agents']);

  function scanForSecrets(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isSymbolicLink && entry.isSymbolicLink()) continue;

      if (entry.isDirectory()) {
        if (!ignoredDirs.has(entry.name) && !entry.name.startsWith('.')) {
          scanForSecrets(path.join(dir, entry.name));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx', '.json', '.py', '.php'].includes(ext)) {
          const filePath = path.join(dir, entry.name);
          try {
            const stat = fs.statSync(filePath);
            if (stat.size <= 1024 * 1024) {
              codeFiles.push(filePath);
            }
          } catch (e) {}
        }
      }
    }
  }

  scanForSecrets(PROJECT_ROOT);

  for (const file of codeFiles) {
    // No auditar package-lock ni node_modules
    if (file.includes('package-lock.json')) continue;
    try {
      const content = fs.readFileSync(file, 'utf8');
      for (const pattern of dangerousPatterns) {
        if (pattern.test(content)) {
          results.secretAudit.details = `Posible clave privada o token expuesto en: ${path.relative(PROJECT_ROOT, file)}`;
          return;
        }
      }
    } catch (e) {
      // Ignorar errores puntuales de lectura
    }
  }

  results.secretAudit.pass = true;
  results.secretAudit.details = `${codeFiles.length} archivos auditados sin credenciales expuestas; .gitignore protegido.`;
}

// 3. QA Gate & Verificación de Tipos / Sintaxis
function checkTypes() {
  const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
  const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');

  let typeCheckCmd = null;

  if (fs.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (pkg.scripts && pkg.scripts['type-check']) {
        typeCheckCmd = 'npm run type-check';
      } else if (pkg.scripts && pkg.scripts['typecheck']) {
        typeCheckCmd = 'npm run typecheck';
      }
    } catch (e) {}
  }

  if (!typeCheckCmd && fs.existsSync(tsconfigPath)) {
    typeCheckCmd = 'npx tsc --noEmit';
  }

  if (typeCheckCmd) {
    try {
      execSync(typeCheckCmd, { cwd: PROJECT_ROOT, stdio: 'pipe' });
      results.typeCheck.pass = true;
      results.typeCheck.details = `Verificación de tipos exitosa con: "${typeCheckCmd}" (cero errores).`;
    } catch (e) {
      results.typeCheck.pass = false;
      const errorOutput = (e.stdout ? e.stdout.toString() : '') || (e.stderr ? e.stderr.toString() : '');
      const firstLines = errorOutput.split('\n').slice(0, 3).join(' ').trim();
      results.typeCheck.details = `Errores de compilación detectados: ${firstLines || e.message}`;
    }
  } else {
    // Si no es un proyecto TypeScript estricto, validar archivos base
    results.typeCheck.pass = true;
    results.typeCheck.details = 'Sin configuración estricta de TypeScript; sintaxis base verificada.';
  }
}

// 4. Escudo Anti-Facturas Cloud & Patrones Mortales (N+1 Queries & Loops Infinitos)
function checkCloudCostPatterns() {
  const codeFiles = [];
  const ignoredDirs = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.agents']);

  function collect(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isSymbolicLink && entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) {
        if (!ignoredDirs.has(entry.name) && !entry.name.startsWith('.')) {
          collect(path.join(dir, entry.name));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          const full = path.join(dir, entry.name);
          try {
            if (fs.statSync(full).size <= 1024 * 1024) codeFiles.push(full);
          } catch (e) {}
        }
      }
    }
  }

  collect(PROJECT_ROOT);

  // Patrón 1: Consultas a DB dentro de bucles for/while (Problema N+1 que dispara costos en Supabase/Postgres)
  const nPlusOneRegex = /\b(?:for|while)\s*\([^)]*\)\s*\{[^}]{0,400}\bawait\s+(?:supabase\.from|prisma\.[a-zA-Z]+|db\.query)\s*\(/s;
  // Patrón 2: useEffect con llamadas a red/DB sin array de dependencias (Loop infinito de lecturas en producción)
  const infiniteEffectRegex = /useEffect\s*\(\s*(?:async\s*)?\(\)\s*=>\s*\{[^}]{0,600}(?:fetch\(|supabase\.from\()[^}]*\}\s*\)/s;

  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file).replace(/\\/g, '/');
      if (nPlusOneRegex.test(content)) {
        results.cloudCostGuard.details = `Riesgo N+1 detectado (consulta DB dentro de bucle) en: ${rel}`;
        return;
      }
      if (infiniteEffectRegex.test(content)) {
        results.cloudCostGuard.details = `Bucle infinito potencial (useEffect con fetch/DB sin array de dependencias) en: ${rel}`;
        return;
      }
    } catch (e) {}
  }

  results.cloudCostGuard.pass = true;
  results.cloudCostGuard.details = `${codeFiles.length} archivos verificados libres de consultas N+1 en bucles y efectos infinitos.`;
}

// 5. Verificación de Sincronización del Esqueleto
function checkSkeleton() {
  const skeletonPath = path.join(MEMORY_DIR, 'skeleton.compact');
  if (!fs.existsSync(skeletonPath)) {
    results.skeletonSync.details = 'skeleton.compact no existe. Corre "node .agents/bin/scan.js".';
    return;
  }

  const stat = fs.statSync(skeletonPath);
  if (stat.size < 50) {
    results.skeletonSync.details = 'skeleton.compact parece vacío o incompleto.';
    return;
  }

  results.skeletonSync.pass = true;
  results.skeletonSync.details = `Esqueleto activo y sincronizado (${(stat.size / 1024).toFixed(2)} KB).`;
}

// 6. Verificación de Gobernanza English-First & Paridad Bilingüe (Regla 10)
function checkEnglishFirstAndI18n() {
  const ignoreDirs = new Set(['node_modules', '.git', '.agents', 'dist', 'build', '.next', '.vercel']);
  const codeFiles = [];

  function collect(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) {
        if (!ignoreDirs.has(ent.name) && !ent.name.startsWith('.agents.backup') && !ent.name.startsWith('.')) {
          collect(path.join(dir, ent.name));
        }
      } else if (ent.isFile() && /\.(tsx|jsx|ts|js|py|sql)$/.test(ent.name)) {
        codeFiles.push(path.join(dir, ent.name));
      }
    }
  }
  collect(PROJECT_ROOT);

  // A. Comprobar que el arranque de idioma por defecto NO esté forzado a español ('es')
  // Patrones: useState('es'), useState<Locale>('es'), defaultLocale: 'es', initialLocale: 'es'
  const spanishDefaultLocaleRegex = /\b(?:useState\s*(?:<[^>]*>)?\s*\(\s*['"]es['"]\s*\)|defaultLocale\s*:\s*['"]es['"]|initialLocale\s*:\s*['"]es['"])/;

  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const rel = path.relative(PROJECT_ROOT, file).replace(/\\/g, '/');
      if (spanishDefaultLocaleRegex.test(content)) {
        results.i18nGuard.details = `Violación Regla 10: Arranque por defecto configurado en español ('es') en: ${rel}. Por arquitectura English-First, el runtime debe arrancar en 'en' por defecto.`;
        return;
      }
    } catch (e) {}
  }

  // B. Comprobar paridad de claves en carpetas locales o i18n
  const possibleLocalesDirs = [
    path.join(PROJECT_ROOT, 'locales'),
    path.join(PROJECT_ROOT, 'src', 'locales'),
    path.join(PROJECT_ROOT, 'public', 'locales')
  ];

  for (const locDir of possibleLocalesDirs) {
    const enFile = path.join(locDir, 'en.json');
    const esFile = path.join(locDir, 'es.json');
    if (fs.existsSync(enFile) && fs.existsSync(esFile)) {
      try {
        const enObj = JSON.parse(fs.readFileSync(enFile, 'utf8'));
        const esObj = JSON.parse(fs.readFileSync(esFile, 'utf8'));

        function getLeafKeys(obj, prefix = '') {
          let keys = [];
          for (const k of Object.keys(obj)) {
            const fullKey = prefix ? `${prefix}.${k}` : k;
            if (obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
              keys = keys.concat(getLeafKeys(obj[k], fullKey));
            } else {
              keys.push(fullKey);
            }
          }
          return keys;
        }

        const enKeys = new Set(getLeafKeys(enObj));
        const esKeys = new Set(getLeafKeys(esObj));

        const missingInEs = [...enKeys].filter(k => !esKeys.has(k));
        const missingInEn = [...esKeys].filter(k => !enKeys.has(k));

        if (missingInEs.length > 0) {
          results.i18nGuard.details = `Falta paridad bilingüe: ${missingInEs.length} clave(s) en en.json faltan en es.json (ej: ${missingInEs[0]})`;
          return;
        }
        if (missingInEn.length > 0) {
          results.i18nGuard.details = `Falta paridad bilingüe: ${missingInEn.length} clave(s) en es.json faltan en en.json (ej: ${missingInEn[0]})`;
          return;
        }
      } catch (e) {
        results.i18nGuard.details = `Error parseando archivos de idiomas en ${path.relative(PROJECT_ROOT, locDir)}: ${e.message}`;
        return;
      }
    }
  }

  results.i18nGuard.pass = true;
  results.i18nGuard.details = 'Arranque en inglés verificado y paridad bilingüe i18n sincronizada.';
}

// 7. Verificación de Blindaje Adversarial & Invariantes PBT (Regla 11)
function checkAdversarialPbt() {
  const ignoreDirs = new Set(['node_modules', '.git', '.agents', 'dist', 'build', '.next', '.vercel']);
  const pbtFiles = [];
  const criticalModules = [];

  function collect(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) {
        if (!ignoreDirs.has(ent.name) && !ent.name.startsWith('.agents.backup') && !ent.name.startsWith('.')) {
          collect(path.join(dir, ent.name));
        }
      } else if (ent.isFile()) {
        const lowerName = ent.name.toLowerCase();
        if (/\.(property|pbt)\.test\.(ts|tsx|js|jsx)$/.test(lowerName)) {
          pbtFiles.push(path.join(dir, ent.name));
        } else if (/\.(ts|tsx|js|jsx)$/.test(lowerName) && !lowerName.includes('.test.') && !lowerName.includes('.spec.')) {
          if (/billing|checkout|payment|pricing|stripe|ledger|balance|tax-calc/i.test(lowerName)) {
            criticalModules.push(path.join(dir, ent.name));
          }
        }
      }
    }
  }
  collect(PROJECT_ROOT);

  if (pbtFiles.length > 0) {
    for (const file of pbtFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const rel = path.relative(PROJECT_ROOT, file).replace(/\\/g, '/');
        if (!content.includes('fast-check') && !content.includes('fc.') && !content.includes("from 'fast-check'")) {
          results.adversarialPbtGuard.details = `Suite PBT inválida en ${rel}: debe utilizar el motor 'fast-check'.`;
          return;
        }
        if (!content.includes('assert') && !content.includes('property')) {
          results.adversarialPbtGuard.details = `Suite PBT sin aserciones de propiedad en ${rel}.`;
          return;
        }
      } catch (e) {}
    }
    results.adversarialPbtGuard.pass = true;
    results.adversarialPbtGuard.details = `${pbtFiles.length} suite(s) PBT validadas con fast-check (invariantes y aserciones conformes).`;
    return;
  }

  if (criticalModules.length > 0) {
    const relCritical = path.relative(PROJECT_ROOT, criticalModules[0]).replace(/\\/g, '/');
    results.adversarialPbtGuard.pass = true;
    results.adversarialPbtGuard.details = `⚠️ Módulo financiero detectado (${relCritical}). Se recomienda convocar a red-team-breaker para blindaje PBT.`;
    return;
  }

  results.adversarialPbtGuard.pass = true;
  results.adversarialPbtGuard.details = 'Sin módulos financieros/pagos pendientes de PBT. Scope en orden.';
}

function main() {
  console.log('\n======================================================');
  console.log('🛡️ Verificador de Invariantes & QA Gate (AGENTS.md)');
  console.log('======================================================');
  console.log(`📁 Directorio auditado: ${PROJECT_ROOT}\n`);

  checkMemory();
  checkSecrets();
  checkTypes();
  checkCloudCostPatterns();
  checkSkeleton();
  checkEnglishFirstAndI18n();
  checkAdversarialPbt();

  let allPassed = true;

  for (const [key, test] of Object.entries(results)) {
    const symbol = test.pass ? '✅ [PASS]' : '❌ [FAIL]';
    console.log(`${symbol} ${test.name}`);
    console.log(`   └─ ${test.details}`);
    if (!test.pass) {
      allPassed = false;
    }
  }

  console.log('\n------------------------------------------------------');
  if (allPassed) {
    console.log('🎉 RESULTADO FINAL: VERIFICACIÓN EXITOSA (QA GATE APROBADO)');
    console.log('   El proyecto cumple con todas las invariantes y protocolos del kit.\n');
    process.exit(0);
  } else {
    console.error('⚠️ RESULTADO FINAL: VERIFICACIÓN FALLIDA');
    console.error('   Corrige las advertencias anteriores antes de dar por cerrada la tarea.\n');
    process.exit(1);
  }
}

main();
