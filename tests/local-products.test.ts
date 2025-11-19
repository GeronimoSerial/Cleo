/**
 * Test for local products API
 * Run with: npx tsx tests/local-products.test.ts
 */

import { getAllProducts, getProductBySlug, getProductsByCategory, getAllCategories, getRelatedProducts, getCategoryBySlug } from '../src/core/api/products-local'

async function runTests() {
  console.log('🧪 Testing Local Products API\n')

  try {
    // Test 1: Get all products
    console.log('1️⃣  Testing getAllProducts()...')
    const allProducts = await getAllProducts()
    console.log(`   ✅ Loaded ${allProducts.length} products`)
    console.log(`   📦 First product: ${allProducts[0].name} ($${allProducts[0].price})`)
    console.log()

    // Test 2: Get product by slug
    console.log('2️⃣  Testing getProductBySlug()...')
    const product = await getProductBySlug('oversized-hoodie-black')
    if (product) {
      console.log(`   ✅ Found product: ${product.name}`)
      console.log(`   💰 Price: $${product.price}${product.originalPrice ? ` (was $${product.originalPrice})` : ''}`)
      console.log(`   🎨 Colors: ${product.colors.join(', ')}`)
      console.log(`   📏 Sizes: ${product.sizes.join(', ')}`)
      console.log(`   🖼️  Images: ${product.images.length}`)
    } else {
      console.log('   ❌ Product not found')
    }
    console.log()

    // Test 3: Get products by category
    console.log('3️⃣  Testing getProductsByCategory()...')
    const hoodies = await getProductsByCategory('hoodies')
    console.log(`   ✅ Found ${hoodies.length} hoodies`)
    hoodies.forEach(h => console.log(`      - ${h.name} ($${h.price})`))
    console.log()

    // Test 4: Get all categories
    console.log('4️⃣  Testing getAllCategories()...')
    const categories = await getAllCategories()
    console.log(`   ✅ Found ${categories.length} categories`)
    categories.forEach(cat => console.log(`      - ${cat.name}: ${cat.count} products`))
    console.log()

    // Test 5: Get related products
    console.log('5️⃣  Testing getRelatedProducts()...')
    const related = await getRelatedProducts(1, 'hoodies', 2)
    console.log(`   ✅ Found ${related.length} related products`)
    related.forEach(r => console.log(`      - ${r.name}`))
    console.log()

    // Test 6: Get category by slug
    console.log('6️⃣  Testing getCategoryBySlug()...')
    const category = await getCategoryBySlug('jackets')
    if (category) {
      console.log(`   ✅ Found category: ${category.name}`)
      console.log(`   📝 Description: ${category.description}`)
      console.log(`   📊 Products: ${category.count}`)
    } else {
      console.log('   ❌ Category not found')
    }
    console.log()

    // Test 7: Filter special products
    console.log('7️⃣  Testing product filters...')
    const newProducts = allProducts.filter(p => p.isNew)
    const bestSellers = allProducts.filter(p => p.isBestSeller)
    const limited = allProducts.filter(p => p.isLimited)
    const featured = allProducts.filter(p => p.featured)
    const onSale = allProducts.filter(p => p.originalPrice)

    console.log(`   🆕 New products: ${newProducts.length}`)
    console.log(`   🔥 Best sellers: ${bestSellers.length}`)
    console.log(`   💎 Limited edition: ${limited.length}`)
    console.log(`   ⭐ Featured: ${featured.length}`)
    console.log(`   🏷️  On sale: ${onSale.length}`)
    console.log()

    // Test 8: Data validation
    console.log('8️⃣  Testing data validation...')
    let errors = 0

    allProducts.forEach(p => {
      if (!p.slug) {
        console.log(`   ❌ Product ${p.id} missing slug`)
        errors++
      }
      if (!p.category) {
        console.log(`   ❌ Product ${p.id} missing category`)
        errors++
      }
      if (p.images.length === 0) {
        console.log(`   ❌ Product ${p.id} has no images`)
        errors++
      }
      if (p.sizes.length === 0) {
        console.log(`   ❌ Product ${p.id} has no sizes`)
        errors++
      }
      if (p.colors.length === 0) {
        console.log(`   ❌ Product ${p.id} has no colors`)
        errors++
      }
    })

    if (errors === 0) {
      console.log(`   ✅ All products valid`)
    } else {
      console.log(`   ⚠️  Found ${errors} validation errors`)
    }
    console.log()

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✨ All tests completed!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📊 Summary:`)
    console.log(`   Total products: ${allProducts.length}`)
    console.log(`   Total categories: ${categories.length}`)
    console.log(`   Validation errors: ${errors}`)
    console.log()

  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

runTests()
