import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class CatalogAndStockSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      /**
       * RESET
       */
      await trx.from('stock_level').delete()
      await trx.from('stock_location').delete()

      await trx.from('product_attributes').delete()
      await trx.from('attribute_value').delete()
      await trx.from('attribute').delete()

      await trx.from('product_variant_options').delete()
      await trx.from('product_variant_assets').delete()
      await trx.from('product_variant').delete()

      await trx.from('product_option_value').delete()
      await trx.from('product_option').delete()

      await trx.from('product_assets').delete()
      await trx.from('product').delete()

      await trx.from('collection').delete()
      await trx.from('asset').delete()

      /**
       * ASSET
       */
      await trx.table('asset').insert([
        { id: 1, name: 'dbCart Logo Sticker (image)', width: 1200, height: 1200 },
        { id: 2, name: 'dbCart T-Shirt (image)', width: 1600, height: 1600 },
        { id: 3, name: 'dbCart Hoodie (image)', width: 1600, height: 1600 },
        { id: 4, name: 'dbCart Mug (image)', width: 1600, height: 1600 },
        { id: 5, name: 'dbCart Cap (image)', width: 1600, height: 1600 },
        { id: 6, name: 'dbCart Tote Bag (image)', width: 1600, height: 1600 },
        { id: 7, name: 'dbCart Notebook (image)', width: 1600, height: 1600 },
        { id: 8, name: 'dbCart Socks (image)', width: 1600, height: 1600 },
        { id: 9, name: 'dbCart Enamel Pin (image)', width: 1200, height: 1200 },
        { id: 10, name: 'dbCart Gift Card (image)', width: 1600, height: 1000 },
      ])

      /**
       * COLLECTION
       */
      await trx.table('collection').insert([
        { id: 1, code: 'swag', name: 'dbCart Swag', parent_collection_id: null },
        { id: 2, code: 'apparel', name: 'Apparel', parent_collection_id: 1 },
        { id: 3, code: 'accessories', name: 'Accessories', parent_collection_id: 1 },
        { id: 4, code: 'office', name: 'Office', parent_collection_id: 1 },
        { id: 5, code: 'stickers_pins', name: 'Stickers & Pins', parent_collection_id: 1 },
      ])

      /**
       * PRODUCT
       */
      await trx.table('product').insert([
        {
          id: 1,
          sku: 'DBC-STKR-LOGO',
          collection_id: 5,
          featured_image_id: 1,
          custom_fields: {
            name: 'dbCart Logo Sticker Pack',
            description: '3 premium matte vinyl stickers (10cm).',
            tags: ['sticker', 'vinyl'],
            brand: 'dbCart',
            material: 'vinyl',
          },
        },
        {
          id: 2,
          sku: 'DBC-TSH-CORE',
          collection_id: 2,
          featured_image_id: 2,
          custom_fields: {
            name: 'dbCart Core T-Shirt',
            description: '100% cotton tee with dbCart logo.',
            tags: ['tshirt', 'apparel'],
            brand: 'dbCart',
            material: 'cotton',
          },
        },
        {
          id: 3,
          sku: 'DBC-HOOD-ZIP',
          collection_id: 2,
          featured_image_id: 3,
          custom_fields: {
            name: 'dbCart Zip Hoodie',
            description: 'Midweight zip hoodie for everyday shipping.',
            tags: ['hoodie', 'apparel'],
            brand: 'dbCart',
            material: 'cotton-poly',
          },
        },
        {
          id: 4,
          sku: 'DBC-MUG-ENML',
          collection_id: 3,
          featured_image_id: 4,
          custom_fields: {
            name: 'dbCart Camper Mug',
            description: '12oz enamel mug.',
            tags: ['mug', 'kitchen'],
            brand: 'dbCart',
            material: 'enamel',
          },
        },
        {
          id: 5,
          sku: 'DBC-CAP-DAD',
          collection_id: 3,
          featured_image_id: 5,
          custom_fields: {
            name: 'dbCart Dad Cap',
            description: 'Adjustable embroidered cap.',
            tags: ['cap', 'accessories'],
            brand: 'dbCart',
            material: 'cotton',
          },
        },
        {
          id: 6,
          sku: 'DBC-TOTE-CANV',
          collection_id: 3,
          featured_image_id: 6,
          custom_fields: {
            name: 'dbCart Canvas Tote',
            description: 'Heavy canvas tote for conferences.',
            tags: ['tote', 'bag'],
            brand: 'dbCart',
            material: 'canvas',
          },
        },
        {
          id: 7,
          sku: 'DBC-NOTE-A5',
          collection_id: 4,
          featured_image_id: 7,
          custom_fields: {
            name: 'dbCart A5 Notebook',
            description: 'Dot-grid notebook with soft-touch cover.',
            tags: ['notebook', 'office'],
            brand: 'dbCart',
          },
        },
        {
          id: 8,
          sku: 'DBC-SOCKS-STRP',
          collection_id: 2,
          featured_image_id: 8,
          custom_fields: {
            name: 'dbCart Stripe Socks',
            description: 'Comfy crew socks with subtle stripe.',
            tags: ['socks', 'apparel'],
            brand: 'dbCart',
            material: 'cotton',
          },
        },
        {
          id: 9,
          sku: 'DBC-PIN-ENAMEL',
          collection_id: 5,
          featured_image_id: 9,
          custom_fields: {
            name: 'dbCart Enamel Pin',
            description: 'Hard enamel pin with butterfly clutch.',
            tags: ['pin', 'accessories'],
            brand: 'dbCart',
            material: 'enamel',
          },
        },
        {
          id: 10,
          sku: 'DBC-GC-000',
          collection_id: 3,
          featured_image_id: 10,
          custom_fields: {
            name: 'dbCart Gift Card',
            description: 'Digital gift card delivered by email.',
            tags: ['gift-card', 'digital'],
            brand: 'dbCart',
          },
        },
      ])

      /**
       * PRODUCT_ASSETS (pivot)
       */
      await trx.table('product_assets').insert([
        { product_id: 1, asset_id: 1, order: 1 },
        { product_id: 2, asset_id: 2, order: 1 },
        { product_id: 3, asset_id: 3, order: 1 },
        { product_id: 4, asset_id: 4, order: 1 },
        { product_id: 5, asset_id: 5, order: 1 },
        { product_id: 6, asset_id: 6, order: 1 },
        { product_id: 7, asset_id: 7, order: 1 },
        { product_id: 8, asset_id: 8, order: 1 },
        { product_id: 9, asset_id: 9, order: 1 },
        { product_id: 10, asset_id: 10, order: 1 },
      ])

      /**
       * PRODUCT_OPTION
       */
      await trx.table('product_option').insert([
        { id: 1, product_id: 2 },
        { id: 2, product_id: 2 },
        { id: 3, product_id: 3 },
        { id: 4, product_id: 3 },
        { id: 5, product_id: 5 },
        { id: 6, product_id: 10 },
      ])

      /**
       * PRODUCT_OPTION_VALUE
       */
      await trx.table('product_option_value').insert([
        { id: 1, value: 'S', option_id: 1 },
        { id: 2, value: 'M', option_id: 1 },
        { id: 3, value: 'L', option_id: 1 },
        { id: 4, value: 'XL', option_id: 1 },
        { id: 5, value: 'Black', option_id: 2 },
        { id: 6, value: 'White', option_id: 2 },
        { id: 7, value: 'Navy', option_id: 2 },
        { id: 8, value: 'S', option_id: 3 },
        { id: 9, value: 'M', option_id: 3 },
        { id: 10, value: 'L', option_id: 3 },
        { id: 11, value: 'XL', option_id: 3 },
        { id: 12, value: 'Charcoal', option_id: 4 },
        { id: 13, value: 'Navy', option_id: 4 },
        { id: 14, value: 'Black', option_id: 5 },
        { id: 15, value: 'Navy', option_id: 5 },
        { id: 16, value: 'Khaki', option_id: 5 },
        { id: 17, value: '25', option_id: 6 },
        { id: 18, value: '50', option_id: 6 },
        { id: 19, value: '100', option_id: 6 },
      ])

      /**
       * PRODUCT_VARIANT
       */
      await trx.table('product_variant').insert([
        {
          id: 1,
          product_id: 1,
          tax_category_id: 1,
          shipping_category_id: 2,
          featured_image_id: 1,
          price: 900,
          custom_fields: { weight_g: 20 },
        },

        {
          id: 2,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'S', color: 'Black', weight_g: 180 },
        },
        {
          id: 3,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'M', color: 'Black', weight_g: 180 },
        },
        {
          id: 4,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'L', color: 'Black', weight_g: 180 },
        },
        {
          id: 5,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 2190,
          custom_fields: { size: 'XL', color: 'Black', weight_g: 180 },
        },
        {
          id: 6,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'M', color: 'White', weight_g: 180 },
        },
        {
          id: 7,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'L', color: 'White', weight_g: 180 },
        },
        {
          id: 8,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'M', color: 'Navy', weight_g: 180 },
        },
        {
          id: 9,
          product_id: 2,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 2,
          price: 1990,
          custom_fields: { size: 'L', color: 'Navy', weight_g: 180 },
        },

        {
          id: 10,
          product_id: 3,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 3,
          price: 4990,
          custom_fields: { size: 'S', color: 'Charcoal', weight_g: 650 },
        },
        {
          id: 11,
          product_id: 3,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 3,
          price: 4990,
          custom_fields: { size: 'M', color: 'Charcoal', weight_g: 650 },
        },
        {
          id: 12,
          product_id: 3,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 3,
          price: 4990,
          custom_fields: { size: 'L', color: 'Charcoal', weight_g: 650 },
        },
        {
          id: 13,
          product_id: 3,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 3,
          price: 5290,
          custom_fields: { size: 'XL', color: 'Charcoal', weight_g: 650 },
        },
        {
          id: 14,
          product_id: 3,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 3,
          price: 4990,
          custom_fields: { size: 'M', color: 'Navy', weight_g: 650 },
        },
        {
          id: 15,
          product_id: 3,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 3,
          price: 4990,
          custom_fields: { size: 'L', color: 'Navy', weight_g: 650 },
        },

        {
          id: 16,
          product_id: 4,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 4,
          price: 1890,
          custom_fields: { volume_oz: 12, weight_g: 350 },
        },

        {
          id: 17,
          product_id: 5,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 5,
          price: 2490,
          custom_fields: { color: 'Black', weight_g: 90 },
        },
        {
          id: 18,
          product_id: 5,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 5,
          price: 2490,
          custom_fields: { color: 'Navy', weight_g: 90 },
        },
        {
          id: 19,
          product_id: 5,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 5,
          price: 2490,
          custom_fields: { color: 'Khaki', weight_g: 90 },
        },

        {
          id: 20,
          product_id: 6,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 6,
          price: 1590,
          custom_fields: { weight_g: 140, capacity_l: 12 },
        },

        {
          id: 21,
          product_id: 7,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 7,
          price: 1290,
          custom_fields: { pages: 192, paper: '90gsm' },
        },

        {
          id: 22,
          product_id: 8,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 8,
          price: 1490,
          custom_fields: { size: 'M', weight_g: 70 },
        },
        {
          id: 23,
          product_id: 8,
          tax_category_id: 1,
          shipping_category_id: 1,
          featured_image_id: 8,
          price: 1490,
          custom_fields: { size: 'L', weight_g: 70 },
        },

        {
          id: 24,
          product_id: 9,
          tax_category_id: 1,
          shipping_category_id: 2,
          featured_image_id: 9,
          price: 790,
          custom_fields: { weight_g: 15 },
        },

        {
          id: 25,
          product_id: 10,
          tax_category_id: 2,
          shipping_category_id: 3,
          featured_image_id: 10,
          price: 2500,
          custom_fields: { amount: 25, delivery: 'email' },
        },
        {
          id: 26,
          product_id: 10,
          tax_category_id: 2,
          shipping_category_id: 3,
          featured_image_id: 10,
          price: 5000,
          custom_fields: { amount: 50, delivery: 'email' },
        },
        {
          id: 27,
          product_id: 10,
          tax_category_id: 2,
          shipping_category_id: 3,
          featured_image_id: 10,
          price: 10000,
          custom_fields: { amount: 100, delivery: 'email' },
        },
      ])

      /**
       * PRODUCT_VARIANT_ASSETS (pivot)
       */
      await trx.table('product_variant_assets').insert([
        { product_variant_id: 1, asset_id: 1, order: 1 },
        { product_variant_id: 2, asset_id: 2, order: 1 },
        { product_variant_id: 3, asset_id: 2, order: 1 },
        { product_variant_id: 4, asset_id: 2, order: 1 },
        { product_variant_id: 5, asset_id: 2, order: 1 },
        { product_variant_id: 6, asset_id: 2, order: 1 },
        { product_variant_id: 7, asset_id: 2, order: 1 },
        { product_variant_id: 8, asset_id: 2, order: 1 },
        { product_variant_id: 9, asset_id: 2, order: 1 },

        { product_variant_id: 10, asset_id: 3, order: 1 },
        { product_variant_id: 11, asset_id: 3, order: 1 },
        { product_variant_id: 12, asset_id: 3, order: 1 },
        { product_variant_id: 13, asset_id: 3, order: 1 },
        { product_variant_id: 14, asset_id: 3, order: 1 },
        { product_variant_id: 15, asset_id: 3, order: 1 },

        { product_variant_id: 16, asset_id: 4, order: 1 },

        { product_variant_id: 17, asset_id: 5, order: 1 },
        { product_variant_id: 18, asset_id: 5, order: 1 },
        { product_variant_id: 19, asset_id: 5, order: 1 },

        { product_variant_id: 20, asset_id: 6, order: 1 },

        { product_variant_id: 21, asset_id: 7, order: 1 },

        { product_variant_id: 22, asset_id: 8, order: 1 },
        { product_variant_id: 23, asset_id: 8, order: 1 },

        { product_variant_id: 24, asset_id: 9, order: 1 },

        { product_variant_id: 25, asset_id: 10, order: 1 },
        { product_variant_id: 26, asset_id: 10, order: 1 },
        { product_variant_id: 27, asset_id: 10, order: 1 },
      ])

      /**
       * PRODUCT_VARIANT_OPTIONS (pivot)
       *
       */
      await trx.table('product_variant_options').insert([
        { product_variant_id: 2, product_options_id: 1 },
        { product_variant_id: 2, product_options_id: 5 },

        { product_variant_id: 3, product_options_id: 2 },
        { product_variant_id: 3, product_options_id: 5 },

        { product_variant_id: 4, product_options_id: 3 },
        { product_variant_id: 4, product_options_id: 5 },

        { product_variant_id: 5, product_options_id: 4 },
        { product_variant_id: 5, product_options_id: 5 },

        { product_variant_id: 6, product_options_id: 2 },
        { product_variant_id: 6, product_options_id: 6 },

        { product_variant_id: 7, product_options_id: 3 },
        { product_variant_id: 7, product_options_id: 6 },

        { product_variant_id: 8, product_options_id: 2 },
        { product_variant_id: 8, product_options_id: 7 },

        { product_variant_id: 9, product_options_id: 3 },
        { product_variant_id: 9, product_options_id: 7 },

        { product_variant_id: 10, product_options_id: 8 },
        { product_variant_id: 10, product_options_id: 12 },

        { product_variant_id: 11, product_options_id: 9 },
        { product_variant_id: 11, product_options_id: 12 },

        { product_variant_id: 12, product_options_id: 10 },
        { product_variant_id: 12, product_options_id: 12 },

        { product_variant_id: 13, product_options_id: 11 },
        { product_variant_id: 13, product_options_id: 12 },

        { product_variant_id: 14, product_options_id: 9 },
        { product_variant_id: 14, product_options_id: 13 },

        { product_variant_id: 15, product_options_id: 10 },
        { product_variant_id: 15, product_options_id: 13 },

        { product_variant_id: 17, product_options_id: 14 },
        { product_variant_id: 18, product_options_id: 15 },
        { product_variant_id: 19, product_options_id: 16 },

        { product_variant_id: 25, product_options_id: 17 },
        { product_variant_id: 26, product_options_id: 18 },
        { product_variant_id: 27, product_options_id: 19 },
      ])

      /**
       * ATTRIBUTE + ATTRIBUTE_VALUE + PRODUCT_ATTRIBUTES
       */
      await trx.table('attribute').insert([
        { id: 1, name: 'Category' },
        { id: 2, name: 'Material' },
        { id: 3, name: 'Audience' },
      ])

      await trx.table('attribute_value').insert([
        { id: 1, attribute_id: 1, name: 'Apparel' },
        { id: 2, attribute_id: 1, name: 'Accessories' },
        { id: 3, attribute_id: 1, name: 'Office' },
        { id: 4, attribute_id: 1, name: 'Stickers & Pins' },
        { id: 5, attribute_id: 1, name: 'Digital' },

        { id: 10, attribute_id: 2, name: 'Cotton' },
        { id: 11, attribute_id: 2, name: 'Cotton-Poly' },
        { id: 12, attribute_id: 2, name: 'Canvas' },
        { id: 13, attribute_id: 2, name: 'Enamel' },
        { id: 14, attribute_id: 2, name: 'Vinyl' },

        { id: 20, attribute_id: 3, name: 'Unisex' },
        { id: 21, attribute_id: 3, name: 'Everyone' },
      ])

      await trx.table('product_attributes').insert([
        { product_id: 2, attribute_value_id: 1 },
        { product_id: 3, attribute_value_id: 1 },
        { product_id: 8, attribute_value_id: 1 },

        { product_id: 4, attribute_value_id: 2 },
        { product_id: 5, attribute_value_id: 2 },
        { product_id: 6, attribute_value_id: 2 },
        { product_id: 9, attribute_value_id: 2 },

        { product_id: 7, attribute_value_id: 3 },

        { product_id: 1, attribute_value_id: 4 },
        { product_id: 10, attribute_value_id: 5 },

        { product_id: 2, attribute_value_id: 10 },
        { product_id: 5, attribute_value_id: 10 },

        { product_id: 3, attribute_value_id: 11 },
        { product_id: 6, attribute_value_id: 12 },
        { product_id: 4, attribute_value_id: 13 },
        { product_id: 9, attribute_value_id: 13 },
        { product_id: 1, attribute_value_id: 14 },

        { product_id: 1, attribute_value_id: 21 },
        { product_id: 2, attribute_value_id: 21 },
        { product_id: 3, attribute_value_id: 21 },
        { product_id: 4, attribute_value_id: 21 },
        { product_id: 5, attribute_value_id: 21 },
        { product_id: 6, attribute_value_id: 21 },
        { product_id: 7, attribute_value_id: 21 },
        { product_id: 8, attribute_value_id: 21 },
        { product_id: 9, attribute_value_id: 21 },
        { product_id: 10, attribute_value_id: 21 },
      ])

      /**
       * STOCK_LOCATION + STOCK_LEVEL
       */
      await trx.table('stock_location').insert([
        { id: 1, name: 'EU Warehouse (Milan)', shipping_priority: 1 },
        { id: 2, name: 'US 3PL (California)', shipping_priority: 2 },
      ])

      await trx.table('stock_level').insert([
        {
          stock_location_id: 1,
          product_variant_id: 1,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 1,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 2,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 2,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 3,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 3,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 4,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 4,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 5,
          quantity_available: 15,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 5,
          quantity_available: 8,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 6,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 6,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 7,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 7,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 8,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 8,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 9,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 9,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 10,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 10,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 11,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 11,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 12,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 12,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 13,
          quantity_available: 15,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 13,
          quantity_available: 8,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 14,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 14,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 15,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 15,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 16,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 16,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 17,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 17,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 18,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 18,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 19,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 19,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 20,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 20,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 21,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 21,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 22,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 22,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 23,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 23,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 24,
          quantity_available: 50,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 24,
          quantity_available: 20,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 25,
          quantity_available: 9999,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 25,
          quantity_available: 9999,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 26,
          quantity_available: 9999,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 26,
          quantity_available: 9999,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },

        {
          stock_location_id: 1,
          product_variant_id: 27,
          quantity_available: 9999,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
        {
          stock_location_id: 2,
          product_variant_id: 27,
          quantity_available: 9999,
          quantity_allocated: 0,
          quantity_reserved: 0,
        },
      ])
    })
  }
}
