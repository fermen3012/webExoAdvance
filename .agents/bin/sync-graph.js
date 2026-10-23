const fs = require('fs');
const path = require('path');

// Directorio raíz del proyecto
const PROJECT_ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..', '..');
const AGENTS_DIR = path.join(PROJECT_ROOT, '.agents');
const MEMORY_DIR = path.join(AGENTS_DIR, 'memory');
const GRAPH_FILE = path.join(MEMORY_DIR, 'graph.json');

const IGNORED_DIRS = new Set([
  'node_modules', '.git', '.next', '.nuxt', 'dist', 'build',
  'out', '.agents', 'coverage', '.vscode', '.idea', 'tmp', 'temp', 'vendor'
]);

const CODE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.py', '.php']);

function scanModules(rootDir) {
  const modules = new Map(); // moduleKey => { id, name, type, dir, files: [], importedModules: Set(), allFilePaths: [] }

  // Pasada 1: Descubrimiento de estructura y archivos de código
  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.')) {
          walk(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (CODE_EXTS.has(ext)) {
          const fullPath = path.join(currentDir, entry.name);
          const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
          
          const parts = relPath.split('/');
          let moduleKey = 'root';
          if (parts.length > 1) {
            if (parts[0] === 'src' && parts.length > 2) {
              moduleKey = `${parts[0]}/${parts[1]}`;
            } else {
              moduleKey = parts[0];
            }
          }

          if (!modules.has(moduleKey)) {
            modules.set(moduleKey, {
              id: `mod_${moduleKey.replace(/[^a-zA-Z0-9_]/g, '_')}`,
              name: `Módulo ${moduleKey}`,
              type: 'module',
              dir: moduleKey,
              files: [],
              importedModules: new Set(),
              allFilePaths: []
            });
          }

          const mod = modules.get(moduleKey);
          mod.allFilePaths.push(fullPath);
          if (mod.files.length < 5) {
            mod.files.push(relPath);
          }
        }
      }
    }
  }

  walk(rootDir);

  // Pasada 2: Extracción y mapeo de relaciones entre módulos descubiertos
  for (const [moduleKey, mod] of modules.entries()) {
    for (const filePath of mod.allFilePaths) {
      extractImports(filePath, moduleKey, modules);
    }
  }

  return modules;
}

function extractImports(filePath, currentModuleKey, modules) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /(?:import\s+(?:[\s\S]*?from\s+)?|require\s*\(\s*)["']([^"']+)["']/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath.startsWith('.')) {
        // Import relativo
        const resolved = path.normalize(path.join(path.dirname(filePath), importPath)).replace(/\\/g, '/');
        const relResolved = path.relative(PROJECT_ROOT, resolved).replace(/\\/g, '/');
        
        for (const [key, mod] of modules.entries()) {
          if (key !== currentModuleKey && relResolved.startsWith(key)) {
            modules.get(currentModuleKey).importedModules.add(mod.id);
          }
        }
      } else if (importPath.startsWith('@/')) {
        // Alias de TypeScript / Next.js
        const aliasPath = importPath.replace(/^@\//, '');
        for (const [key, mod] of modules.entries()) {
          if (key !== currentModuleKey && aliasPath.startsWith(key)) {
            modules.get(currentModuleKey).importedModules.add(mod.id);
          }
        }
      }
    }
  } catch (e) {
    // Continuar si hay error de lectura puntual
  }
}

function main() {
  console.log('🕸️ Sincronizando grafo real de conocimiento (.agents/memory/graph.json)...');
  console.log(`📁 Directorio raíz: ${PROJECT_ROOT}`);

  if (!fs.existsSync(GRAPH_FILE)) {
    console.warn(`⚠️ No se encontró graph.json en ${GRAPH_FILE}. Asegúrate de haber ejecutado setup.js.`);
    return;
  }

  let graphData;
  try {
    graphData = JSON.parse(fs.readFileSync(GRAPH_FILE, 'utf8'));
  } catch (e) {
    console.error('❌ Error al leer graph.json:', e.message);
    return;
  }

  const moduleMap = scanModules(PROJECT_ROOT);

  if (moduleMap.size === 0) {
    console.log('ℹ️ No se detectaron módulos de código suficientes para reestructurar el grafo. Manteniendo configuración existente.');
    return;
  }

  const nodes = [];
  const edges = [];
  const seenEdges = new Set();

  for (const [key, mod] of moduleMap.entries()) {
    nodes.push({
      id: mod.id,
      name: mod.name,
      type: mod.type,
      directory: mod.dir,
      sample_files: mod.files
    });

    for (const targetId of mod.importedModules) {
      const edgeKey = `${mod.id}->${targetId}`;
      if (!seenEdges.has(edgeKey)) {
        seenEdges.add(edgeKey);
        edges.push({
          source: mod.id,
          target: targetId,
          relation: 'imports_and_uses'
        });
      }
    }
  }

  // Preservar metadatos del proyecto y actualizar nodos y dependencias
  graphData.nodes = nodes;
  graphData.edges = edges;
  graphData.last_synced = new Date().toISOString();

  fs.writeFileSync(GRAPH_FILE, JSON.stringify(graphData, null, 2), 'utf8');

  console.log('✅ Grafo sincronizado con éxito:');
  console.log(`   📦 Nodos reales detectados: ${nodes.length}`);
  console.log(`   🔗 Aristas y relaciones de import mapeadas: ${edges.length}`);
  console.log(`   📄 Archivo actualizado: ${path.relative(PROJECT_ROOT, GRAPH_FILE)}\n`);
}

main();
