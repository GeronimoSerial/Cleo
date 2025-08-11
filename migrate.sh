#!/bin/bash

# Script de migración gradual a DIRECTUS API
# Permite alternar entre datos locales y DIRECTUS

echo "🔄 CLEO - Script de Migración a DIRECTUS API"
echo "=============================================="

# Función para mostrar ayuda
show_help() {
    echo "Uso: ./migrate.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  enable    - Habilita DIRECTUS API (reemplaza imports)"
    echo "  disable   - Deshabilita DIRECTUS API (vuelve a datos locales)"
    echo "  status    - Muestra el estado actual"
    echo "  test      - Ejecuta tests de integración"
    echo "  webhook   - Prueba el endpoint de webhook"
    echo "  help      - Muestra esta ayuda"
    echo ""
    echo "Configuración:"
    echo "  Asegúrate de tener configuradas las variables en .env.local:"
    echo "  - DIRECTUS_URL=https://devcms.geroserial.com"
    echo "  - DIRECTUS_TOKEN=tu_token_aqui"
    echo "  - DIRECTUS_WEBHOOK_SECRET=tu_secreto_aqui"
}

# Función para verificar el estado actual
check_status() {
    echo "📊 Estado actual de la migración:"
    echo ""
    
    # Verificar imports en archivos clave
    if grep -q "from '@/lib/directus-api'" app/products/\[segment\]/page.tsx 2>/dev/null; then
        echo "✅ /app/products/[segment]/page.tsx - USANDO DIRECTUS"
    else
        echo "📦 /app/products/[segment]/page.tsx - usando datos locales"
    fi
    
    if grep -q "from '@/lib/directus-api'" app/products/page.tsx 2>/dev/null; then
        echo "✅ /app/products/page.tsx - USANDO DIRECTUS"
    else
        echo "📦 /app/products/page.tsx - usando datos locales"
    fi
    
    if grep -q "from '@/lib/directus-api'" components/products-homepage.tsx 2>/dev/null; then
        echo "✅ /components/products-homepage.tsx - USANDO DIRECTUS"
    else
        echo "📦 /components/products-homepage.tsx - usando datos locales"
    fi
    
    echo ""
    echo "🌐 Configuración de entorno:"
    if [ -f ".env.local" ]; then
        if grep -q "DIRECTUS_URL" .env.local; then
            echo "✅ DIRECTUS_URL configurado"
        else
            echo "❌ DIRECTUS_URL no configurado"
        fi
        
        if grep -q "DIRECTUS_TOKEN" .env.local; then
            echo "✅ DIRECTUS_TOKEN configurado"
        else
            echo "❌ DIRECTUS_TOKEN no configurado"
        fi
    else
        echo "❌ Archivo .env.local no encontrado"
        echo "   Copia .env.example a .env.local y configura las variables"
    fi
}

# Función para habilitar DIRECTUS
enable_directus() {
    echo "🚀 Habilitando DIRECTUS API..."
    
    # Verificar que existe el archivo de DIRECTUS API
    if [ ! -f "lib/directus-api.ts" ]; then
        echo "❌ Error: lib/directus-api.ts no encontrado"
        echo "   Ejecuta primero la implementación completa"
        exit 1
    fi
    
    # Migrar imports en archivos principales
    echo "   📝 Actualizando imports..."
    
    # app/products/[segment]/page.tsx
    if [ -f "app/products/[segment]/page.tsx" ]; then
        sed -i 's/@\/lib\/products-api/@\/lib\/directus-api/g' app/products/[segment]/page.tsx
        echo "   ✅ app/products/[segment]/page.tsx"
    fi
    
    # app/products/page.tsx  
    if [ -f "app/products/page.tsx" ]; then
        sed -i 's/@\/lib\/products-data/@\/lib\/directus-api/g' app/products/page.tsx
        echo "   ✅ app/products/page.tsx"
    fi
    
    # components/products-homepage.tsx
    if [ -f "components/products-homepage.tsx" ]; then
        sed -i 's/@\/lib\/products-data/@\/lib\/directus-api/g' components/products-homepage.tsx
        echo "   ✅ components/products-homepage.tsx"
    fi
    
    echo ""
    echo "✅ DIRECTUS API habilitada!"
    echo "   🔄 Reinicia el servidor de desarrollo: npm run dev"
    echo "   🧪 Ejecuta tests: ./migrate.sh test"
}

# Función para deshabilitar DIRECTUS
disable_directus() {
    echo "📦 Deshabilitando DIRECTUS API (volviendo a datos locales)..."
    
    # Revertir imports
    echo "   📝 Revirtiendo imports..."
    
    # app/products/[segment]/page.tsx
    if [ -f "app/products/[segment]/page.tsx" ]; then
        sed -i 's/@\/lib\/directus-api/@\/lib\/products-api/g' app/products/[segment]/page.tsx
        echo "   ✅ app/products/[segment]/page.tsx"
    fi
    
    # app/products/page.tsx
    if [ -f "app/products/page.tsx" ]; then
        sed -i 's/@\/lib\/directus-api/@\/lib\/products-data/g' app/products/page.tsx
        echo "   ✅ app/products/page.tsx"
    fi
    
    # components/products-homepage.tsx
    if [ -f "components/products-homepage.tsx" ]; then
        sed -i 's/@\/lib\/directus-api/@\/lib\/products-data/g' components/products-homepage.tsx
        echo "   ✅ components/products-homepage.tsx"
    fi
    
    echo ""
    echo "✅ Datos locales restaurados!"
    echo "   🔄 Reinicia el servidor de desarrollo: npm run dev"
}

# Función para ejecutar tests
run_tests() {
    echo "🧪 Ejecutando tests de integración..."
    echo ""
    
    if [ -f "tests/directus-api.test.ts" ]; then
        npx tsx tests/directus-api.test.ts
    else
        echo "❌ Archivo de tests no encontrado: tests/directus-api.test.ts"
    fi
}

# Función para probar webhook
test_webhook() {
    echo "🔗 Probando endpoint de webhook..."
    echo ""
    
    # Verificar que el servidor esté corriendo
    if ! curl -f http://localhost:3000 >/dev/null 2>&1; then
        echo "❌ Servidor no está corriendo en http://localhost:3000"
        echo "   Inicia el servidor: npm run dev"
        exit 1
    fi
    
    # Test GET (health check)
    echo "📡 GET /api/webhook/revalidate (health check):"
    curl -s http://localhost:3000/api/webhook/revalidate | jq '.' 2>/dev/null || curl -s http://localhost:3000/api/webhook/revalidate
    echo ""
    
    # Test POST (simulación de webhook)
    echo "📡 POST /api/webhook/revalidate (simulación):"
    curl -s -X POST http://localhost:3000/api/webhook/revalidate \
        -H "Content-Type: application/json" \
        -d '{"event":"items.update","collection":"Productos","key":"1"}' | \
        jq '.' 2>/dev/null || \
        curl -s -X POST http://localhost:3000/api/webhook/revalidate \
        -H "Content-Type: application/json" \
        -d '{"event":"items.update","collection":"Productos","key":"1"}'
}

# Procesar comando
case "$1" in
    "enable")
        enable_directus
        ;;
    "disable")
        disable_directus
        ;;
    "status")
        check_status
        ;;
    "test")
        run_tests
        ;;
    "webhook")
        test_webhook
        ;;
    "help"|"")
        show_help
        ;;
    *)
        echo "❌ Comando desconocido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
