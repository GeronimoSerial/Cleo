/**
 * Placeholder Image Generator
 * Run: npx tsx scripts/generate-placeholder-images.ts
 *
 * This script modifies products-local.ts to use placeholder images
 * Perfect for development without real images
 */

import fs from 'fs'
import path from 'path'

const PLACEHOLDER_SERVICES = {
  placehold: (width: number, height: number, bg: string, text: string) =>
    `https://placehold.co/${width}x${height}/${bg}/white?text=${encodeURIComponent(text)}`,

  picsum: (width: number, height: number, seed: number) =>
    `https://picsum.photos/seed/${seed}/${width}/${height}`,

  placeholder: (width: number, height: number, bg: string) =>
    `https://via.placeholder.com/${width}x${height}/${bg}/FFFFFF`,
}

interface ImageMapping {
  original: string
  placeholder: string
}

function generatePlaceholder(filename: string, index: number): string {
  const width = 600
  const height = 800

  // Extract product type from filename
  const productName = filename.split('-')[0]
  const imageNumber = filename.match(/\d+/)?.[0] || '1'

  // Use different colors for variety
  const colors = ['1a1a1a', '2d2d2d', '3a3a3a', '1e293b', '334155']
  const colorIndex = index % colors.length

  return PLACEHOLDER_SERVICES.placehold(
    width,
    height,
    colors[colorIndex],
    `${productName} ${imageNumber}`
  )
}

function updateProductsLocal() {
  const productsLocalPath = path.join(process.cwd(), 'src/core/api/products-local.ts')

  if (!fs.existsSync(productsLocalPath)) {
    console.error('❌ File not found:', productsLocalPath)
    process.exit(1)
  }

  let content = fs.readFileSync(productsLocalPath, 'utf-8')

  // Option 1: Use placehold.co (recommended for development)
  const newImageBaseLocal = `'https://placehold.co/600x800/1a1a1a/white?text='`

  // Replace the LOCAL_IMAGE_BASE constant
  content = content.replace(
    /const LOCAL_IMAGE_BASE = ['"].*['"]/,
    `const LOCAL_IMAGE_BASE = ${newImageBaseLocal}`
  )

  // Update the getLocalImageUrl function to append filename as text
  const newGetLocalImageUrl = `
/**
 * Generates placeholder image URLs for local development
 */
function getLocalImageUrl(fileId: string): string {
  // Extract product name from fileId for better placeholder text
  const productName = fileId.replace(/\.(jpg|png|webp)$/i, '').replace(/-/g, ' ')
  return \`https://placehold.co/600x800/1a1a1a/white?text=\${encodeURIComponent(productName)}\`
}`.trim()

  content = content.replace(
    /\/\*\*[\s\S]*?\*\/\s*function getLocalImageUrl\(fileId: string\): string \{[\s\S]*?\}/,
    newGetLocalImageUrl
  )

  fs.writeFileSync(productsLocalPath, content, 'utf-8')

  console.log('✅ Updated products-local.ts with placeholder images')
}

function generateImageList() {
  const productsJsonPath = path.join(process.cwd(), 'data/products.json')

  if (!fs.existsSync(productsJsonPath)) {
    console.error('❌ products.json not found')
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'))
  const imageMappings: ImageMapping[] = []
  let index = 0

  console.log('\n📸 Image List with Placeholders:\n')
  console.log('Original File → Placeholder URL')
  console.log('─'.repeat(80))

  data.products.forEach((product: any) => {
    product.imagenes.forEach((img: any) => {
      const placeholder = generatePlaceholder(img.directus_files_id, index++)
      imageMappings.push({
        original: img.directus_files_id,
        placeholder
      })
      console.log(`${img.directus_files_id.padEnd(30)} → ${placeholder}`)
    })
  })

  // Save mappings to a file
  const mappingsPath = path.join(process.cwd(), 'data/image-mappings.json')
  fs.writeFileSync(mappingsPath, JSON.stringify(imageMappings, null, 2))

  console.log('\n✅ Saved image mappings to data/image-mappings.json')
}

function showUsageOptions() {
  console.log('\n📋 Placeholder Image Options:\n')

  console.log('1️⃣  Placehold.co (Recommended - with text)')
  console.log('   https://placehold.co/600x800/1a1a1a/white?text=Product')
  console.log('   ✅ Shows product name')
  console.log('   ✅ Fast loading')
  console.log('   ✅ Customizable colors\n')

  console.log('2️⃣  Picsum Photos (Real images)')
  console.log('   https://picsum.photos/seed/123/600/800')
  console.log('   ✅ Real photos')
  console.log('   ✅ Variety')
  console.log('   ⚠️  Random content\n')

  console.log('3️⃣  Placeholder.com')
  console.log('   https://via.placeholder.com/600x800/1a1a1a/FFFFFF')
  console.log('   ✅ Simple')
  console.log('   ✅ Reliable\n')
}

function main() {
  console.log('🎨 Placeholder Image Generator\n')

  const args = process.argv.slice(2)
  const command = args[0] || 'help'

  switch (command) {
    case 'update':
      updateProductsLocal()
      console.log('\n🎯 Next steps:')
      console.log('   1. Restart your dev server: pnpm dev')
      console.log('   2. Images will now load as placeholders')
      console.log('   3. Check http://localhost:3000/products\n')
      break

    case 'list':
      generateImageList()
      break

    case 'options':
      showUsageOptions()
      break

    case 'help':
    default:
      console.log('Usage: npx tsx scripts/generate-placeholder-images.ts [command]\n')
      console.log('Commands:')
      console.log('  update    - Update products-local.ts with placeholder URLs')
      console.log('  list      - Generate list of all images with placeholder URLs')
      console.log('  options   - Show different placeholder service options')
      console.log('  help      - Show this help message\n')
      console.log('Example:')
      console.log('  npx tsx scripts/generate-placeholder-images.ts update\n')
      break
  }
}

main()
