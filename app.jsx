import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Phone,
  ArrowUpRight,
  ArrowRight,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  ShieldAlert,
  Check,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  Lock,
  AlertTriangle,
  RotateCcw,
  Compass,
  Eye,
  EyeOff
} from 'lucide-react';

// ============================================================================
// 1. GLOBAL CONFIGURATION, BRAND TOKENS & SEASONAL SETTINGS
// ============================================================================

const OFFICIAL_LOGO_URL =
  'https://raw.githubusercontent.com/CreativeTugsDotCom/lmn/refs/heads/main/17a86d63-7a98-4dca-9715-4d000d5b65af.png';

const HOLIDAY_POPUP_ARTWORK_URL =
  'https://raw.githubusercontent.com/CreativeTugsDotCom/lmn/refs/heads/main/ba2540fd-3393-4810-b96e-4643064709bc%20(1).png';

const BUSINESS_INFO = {
  name: '4835 Smoke & Vape',
  tagline: 'YOUR VIBE. YOUR WAY.',
  secondaryMessage: 'GOOD VIBES. REAL SERVICE.',
  cityState: 'Dallas, Texas',
  // Clearly marked placeholders for unverified store details (Command 07)
  streetAddress: '[VERIFIED STREET ADDRESS & SUITE PENDING OWNER CONFIRMATION]',
  phone: '[VERIFIED BUSINESS TELEPHONE PENDING]',
  hours: [
    { day: 'Monday – Thursday', time: '[VERIFIED HOURS PENDING]' },
    { day: 'Friday – Saturday', time: '[VERIFIED HOURS PENDING]' },
    { day: 'Sunday', time: '[VERIFIED HOURS PENDING]' }
  ],
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Dallas+Texas',
  announcementText:
    'DALLAS, TX RETAIL DESTINATION — 21+ ADULT VERIFICATION REQUIRED IN-STORE. SAMPLE PROTOTYPE CATALOG ACTIVE.'
};

// Editorial photography (Unsplash architectural/urban/retail interior — properly licensed, adult-focused, zero minor-appealing imagery)
const EDITORIAL_IMAGES = {
  heroUrban:
    'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1600&q=80',
  heroDetail:
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80',
  catHardware:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
  catPods:
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
  catLiquids:
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  catGlass:
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
  catAccessories:
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  brandWall:
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80',
  retailInteriorA:
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  retailInteriorB:
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80',
  dallasSkyline:
    'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?auto=format&fit=crop&w=1400&q=80'
};

// ============================================================================
// 2. CATEGORIES, BRANDS & CLEARLY MARKED SAMPLE PROTOTYPE CATALOG
// ============================================================================

const CATEGORIES = [
  {
    id: 'hardware-devices',
    name: 'Hardware & Devices',
    indexNum: '01',
    shortDesc: 'Precision-built rechargeable pod systems and regulated box mods.',
    image: EDITORIAL_IMAGES.catHardware,
    spanClass: 'md:col-span-7 md:row-span-2'
  },
  {
    id: 'pods-coils',
    name: 'Pods & Coils',
    indexNum: '02',
    shortDesc: 'Replacement mesh coils, refillable pods, and authentic tank components.',
    image: EDITORIAL_IMAGES.catPods,
    spanClass: 'md:col-span-5 md:row-span-1'
  },
  {
    id: 'e-liquids',
    name: 'E-Liquids',
    indexNum: '03',
    shortDesc: 'Adult-compliant tobacco, menthol, and verified freebase/salt formulations.',
    image: EDITORIAL_IMAGES.catLiquids,
    spanClass: 'md:col-span-5 md:row-span-1'
  },
  {
    id: 'glass-pieces',
    name: 'Artisan Glass',
    indexNum: '04',
    shortDesc: 'Heavy-walled borosilicate glassware and functional retail display pieces.',
    image: EDITORIAL_IMAGES.catGlass,
    spanClass: 'md:col-span-6 md:row-span-1'
  },
  {
    id: 'accessories',
    name: 'Accessories & Care',
    indexNum: '05',
    shortDesc: 'Chargers, battery cases, trays, and everyday maintenance essentials.',
    image: EDITORIAL_IMAGES.catAccessories,
    spanClass: 'md:col-span-6 md:row-span-1'
  }
];

// Clearly marked sample brand directory slots pending owner's verified supplier list
const BRANDS = [
  {
    id: 'apex-vapor-lab',
    name: 'Apex Vapor Lab (Sample)',
    letter: 'A',
    tagline: 'Sample Brand Slot — Regulated Hardware & Mesh Architecture',
    origin: 'Prototype Supplier Data'
  },
  {
    id: 'blockline-glass',
    name: 'Blockline Glassworks (Sample)',
    letter: 'B',
    tagline: 'Sample Brand Slot — Borosilicate Studio Pieces',
    origin: 'Prototype Supplier Data'
  },
  {
    id: 'chrome-cell',
    name: 'ChromeCell Systems (Sample)',
    letter: 'C',
    tagline: 'Sample Brand Slot — Compact Rechargeable Pod Devices',
    origin: 'Prototype Supplier Data'
  },
  {
    id: 'dallas-reserve',
    name: 'Metro Reserve Liquids (Sample)',
    letter: 'M',
    tagline: 'Sample Brand Slot — Adult-Compliant Classic Profiles',
    origin: 'Prototype Supplier Data'
  },
  {
    id: 'noir-hardware',
    name: 'Noir Industrial (Sample)',
    letter: 'N',
    tagline: 'Sample Brand Slot — Matte Black Devices & Power Accessories',
    origin: 'Prototype Supplier Data'
  },
  {
    id: 'vanguard-coils',
    name: 'Vanguard Coil Co. (Sample)',
    letter: 'V',
    tagline: 'Sample Brand Slot — Replacement Coils & Refillable Pods',
    origin: 'Prototype Supplier Data'
  }
];

// Clearly marked sample catalog items for functional prototype testing
const SAMPLE_PRODUCTS = [
  {
    id: 'p-4835-001',
    name: 'Apex Mod X1 — Regulated Chassis',
    brandId: 'apex-vapor-lab',
    brandName: 'Apex Vapor Lab (Sample)',
    categoryId: 'hardware-devices',
    categoryName: 'Hardware & Devices',
    price: 54.99,
    color: 'Matte Black',
    colorHex: '#181818',
    nicotineStrength: '0mg (Hardware)',
    puffRange: 'Rechargeable / Refillable',
    flavor: 'N/A (Hardware)',
    status: 'New',
    available: true,
    collection: ['new-arrivals', 'featured'],
    sku: 'SMPL-APX-001',
    description:
      'Sample prototype listing representing a regulated dual-airflow hardware device. Actual retail specifications, FDA compliance status, and Texas SB 2024 eligibility will be verified by 4835 Smoke & Vape prior to live publication.',
    specs: [
      { label: 'Chassis Finish', value: 'Anodized Matte Black' },
      { label: 'Output Range', value: '5W – 80W (Sample Spec)' },
      { label: 'Charging Port', value: 'USB-C' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-002',
    name: 'ChromeCell Mini Pod System',
    brandId: 'chrome-cell',
    brandName: 'ChromeCell Systems (Sample)',
    categoryId: 'hardware-devices',
    categoryName: 'Hardware & Devices',
    price: 29.99,
    color: 'Brushed Silver',
    colorHex: '#C8C8C8',
    nicotineStrength: '0mg (Hardware)',
    puffRange: 'Rechargeable / Refillable',
    flavor: 'N/A (Hardware)',
    status: 'In Stock',
    available: true,
    collection: ['featured', 'in-store-highlights'],
    sku: 'SMPL-CHR-002',
    description:
      'Sample prototype listing for a compact aluminum-alloy refillable pod system with draw-activated firing and magnetic pod connection.',
    specs: [
      { label: 'Material', value: 'Brushed Aluminum Alloy' },
      { label: 'Battery Capacity', value: '900mAh (Sample Spec)' },
      { label: 'Pod Capacity', value: '2.0mL Refillable' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-003',
    name: 'Noir 200W Box Mod Edition',
    brandId: 'noir-hardware',
    brandName: 'Noir Industrial (Sample)',
    categoryId: 'hardware-devices',
    categoryName: 'Hardware & Devices',
    price: 74.99,
    color: 'Graphite',
    colorHex: '#3A3A3A',
    nicotineStrength: '0mg (Hardware)',
    puffRange: 'Rechargeable / Refillable',
    flavor: 'N/A (Hardware)',
    status: 'Sold Out',
    available: false,
    collection: ['in-store-highlights'],
    sku: 'SMPL-NOR-003',
    description:
      'Sample prototype listing demonstrating the Sold Out status state for regulated dual-battery hardware.',
    specs: [
      { label: 'Finish', value: 'Industrial Graphite' },
      { label: 'Thread', value: 'Standard 510 Connector' },
      { label: 'Display', value: 'Monochrome OLED' },
      { label: 'Inventory Status', value: 'Sample — Sold Out State' }
    ]
  },
  {
    id: 'p-4835-004',
    name: 'ChromeCell Yellow Trim Kit',
    brandId: 'chrome-cell',
    brandName: 'ChromeCell Systems (Sample)',
    categoryId: 'hardware-devices',
    categoryName: 'Hardware & Devices',
    price: 34.99,
    color: 'Signal Yellow',
    colorHex: '#F2C916',
    nicotineStrength: '0mg (Hardware)',
    puffRange: 'Rechargeable / Refillable',
    flavor: 'N/A (Hardware)',
    status: 'New',
    available: true,
    collection: ['new-arrivals', 'featured'],
    sku: 'SMPL-CHR-004',
    description:
      'Sample prototype listing for a high-contrast metallic and yellow-accented refillable pod kit.',
    specs: [
      { label: 'Finish', value: 'Black / Signal Yellow Trim' },
      { label: 'Airflow', value: 'Side Adjustable Slider' },
      { label: 'Charging', value: 'USB-C Fast Charge' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-005',
    name: 'Vanguard 0.6Ω Mesh Replacement Coils (5-Pack)',
    brandId: 'vanguard-coils',
    brandName: 'Vanguard Coil Co. (Sample)',
    categoryId: 'pods-coils',
    categoryName: 'Pods & Coils',
    price: 16.99,
    color: 'Brushed Silver',
    colorHex: '#D0D0D0',
    nicotineStrength: '0mg (Component)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'In Stock',
    available: true,
    collection: ['in-store-highlights'],
    sku: 'SMPL-VGD-005',
    description:
      'Sample prototype listing for press-fit replacement mesh coils compatible with verified hardware platforms.',
    specs: [
      { label: 'Resistance', value: '0.6 Ohm Mesh' },
      { label: 'Pack Quantity', value: '5 Coils per Box' },
      { label: 'Installation', value: 'Press-Fit' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-006',
    name: 'ChromeCell Refillable Pods (4-Pack)',
    brandId: 'chrome-cell',
    brandName: 'ChromeCell Systems (Sample)',
    categoryId: 'pods-coils',
    categoryName: 'Pods & Coils',
    price: 14.99,
    color: 'Smoke Tint',
    colorHex: '#484848',
    nicotineStrength: '0mg (Component)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'In Stock',
    available: true,
    collection: ['featured'],
    sku: 'SMPL-CHR-006',
    description:
      'Sample prototype listing for empty refillable magnetic replacement pods with top-fill silicone seal.',
    specs: [
      { label: 'Capacity', value: '2.0mL Empty Pod' },
      { label: 'Resistance', value: '0.8 Ohm Integrated' },
      { label: 'Pack Size', value: '4 Pods' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-007',
    name: 'Vanguard 0.3Ω Sub-Ohm Coils (5-Pack)',
    brandId: 'vanguard-coils',
    brandName: 'Vanguard Coil Co. (Sample)',
    categoryId: 'pods-coils',
    categoryName: 'Pods & Coils',
    price: 18.5,
    color: 'Brushed Silver',
    colorHex: '#B8B8B8',
    nicotineStrength: '0mg (Component)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'New',
    available: true,
    collection: ['new-arrivals'],
    sku: 'SMPL-VGD-007',
    description:
      'Sample prototype listing for low-resistance sub-ohm mesh coils designed for high-wattage tanks.',
    specs: [
      { label: 'Resistance', value: '0.3 Ohm Mesh' },
      { label: 'Recommended Range', value: '40W – 60W (Sample)' },
      { label: 'Pack Size', value: '5 Coils' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-008',
    name: 'Metro Reserve — Classic Tobacco 60mL',
    brandId: 'dallas-reserve',
    brandName: 'Metro Reserve Liquids (Sample)',
    categoryId: 'e-liquids',
    categoryName: 'E-Liquids',
    price: 21.99,
    color: 'Amber Clear',
    colorHex: '#A67C52',
    nicotineStrength: '3mg',
    puffRange: 'Bottle (60mL)',
    flavor: 'Classic Tobacco',
    status: 'In Stock',
    available: true,
    collection: ['featured', 'in-store-highlights'],
    sku: 'SMPL-MTR-008',
    description:
      'Sample prototype e-liquid listing featuring a traditional adult-oriented tobacco profile. Subject to full FDA PMTA and Texas retail eligibility verification before live sale.',
    specs: [
      { label: 'Bottle Size', value: '60mL Child-Resistant' },
      { label: 'Nicotine Strength', value: '3mg Freebase' },
      { label: 'VG/PG Ratio', value: '70/30 (Sample Spec)' },
      { label: 'Compliance Note', value: '21+ Only — Sample Entry' }
    ]
  },
  {
    id: 'p-4835-009',
    name: 'Metro Reserve — Crisp Menthol 60mL',
    brandId: 'dallas-reserve',
    brandName: 'Metro Reserve Liquids (Sample)',
    categoryId: 'e-liquids',
    categoryName: 'E-Liquids',
    price: 21.99,
    color: 'Ice Clear',
    colorHex: '#DCE8EB',
    nicotineStrength: '6mg',
    puffRange: 'Bottle (60mL)',
    flavor: 'Crisp Menthol',
    status: 'In Stock',
    available: true,
    collection: ['in-store-highlights'],
    sku: 'SMPL-MTR-009',
    description:
      'Sample prototype e-liquid listing with a clean menthol profile for adult consumers. Strictly sample data pending owner catalog verification.',
    specs: [
      { label: 'Bottle Size', value: '60mL Child-Resistant' },
      { label: 'Nicotine Strength', value: '6mg Freebase' },
      { label: 'VG/PG Ratio', value: '70/30 (Sample Spec)' },
      { label: 'Compliance Note', value: '21+ Only — Sample Entry' }
    ]
  },
  {
    id: 'p-4835-010',
    name: 'Metro Reserve — Salt Tobacco 30mL',
    brandId: 'dallas-reserve',
    brandName: 'Metro Reserve Liquids (Sample)',
    categoryId: 'e-liquids',
    categoryName: 'E-Liquids',
    price: 19.99,
    color: 'Amber Clear',
    colorHex: '#9A6F44',
    nicotineStrength: '25mg Salt',
    puffRange: 'Bottle (30mL)',
    flavor: 'Classic Tobacco',
    status: 'New',
    available: true,
    collection: ['new-arrivals'],
    sku: 'SMPL-MTR-010',
    description:
      'Sample prototype nicotine salt listing formulated for low-wattage refillable pod devices. Sample data only.',
    specs: [
      { label: 'Bottle Size', value: '30mL Child-Resistant' },
      { label: 'Nicotine Strength', value: '25mg Salt' },
      { label: 'VG/PG Ratio', value: '50/50 (Sample Spec)' },
      { label: 'Compliance Note', value: '21+ Only — Sample Entry' }
    ]
  },
  {
    id: 'p-4835-011',
    name: 'Metro Reserve — Clear Unflavored 30mL',
    brandId: 'dallas-reserve',
    brandName: 'Metro Reserve Liquids (Sample)',
    categoryId: 'e-liquids',
    categoryName: 'E-Liquids',
    price: 18.99,
    color: 'Ice Clear',
    colorHex: '#E6E6E6',
    nicotineStrength: '0mg',
    puffRange: 'Bottle (30mL)',
    flavor: 'Unflavored',
    status: 'Unavailable',
    available: false,
    collection: [],
    sku: 'SMPL-MTR-011',
    description:
      'Sample prototype listing demonstrating the Unavailable status indicator for items currently not offered.',
    specs: [
      { label: 'Bottle Size', value: '30mL Child-Resistant' },
      { label: 'Nicotine Strength', value: '0mg' },
      { label: 'Flavor Profile', value: 'Unflavored' },
      { label: 'Inventory Status', value: 'Sample — Unavailable State' }
    ]
  },
  {
    id: 'p-4835-012',
    name: 'Blockline 9mm Heavy Beaker Piece',
    brandId: 'blockline-glass',
    brandName: 'Blockline Glassworks (Sample)',
    categoryId: 'glass-pieces',
    categoryName: 'Artisan Glass',
    price: 89.0,
    color: 'Smoke Tint',
    colorHex: '#525252',
    nicotineStrength: '0mg (Hardware)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'New',
    available: true,
    collection: ['new-arrivals', 'featured'],
    sku: 'SMPL-BLK-012',
    description:
      'Sample prototype listing for thick-walled borosilicate glasswork crafted for durability and clean industrial aesthetics.',
    specs: [
      { label: 'Glass Thickness', value: '9mm Borosilicate (Sample)' },
      { label: 'Height', value: '12 Inches' },
      { label: 'Finish', value: 'Smoke Tint / Clear Accent' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-013',
    name: 'Blockline Matte Etched Cylinder',
    brandId: 'blockline-glass',
    brandName: 'Blockline Glassworks (Sample)',
    categoryId: 'glass-pieces',
    categoryName: 'Artisan Glass',
    price: 68.0,
    color: 'Matte Black',
    colorHex: '#1F1F1F',
    nicotineStrength: '0mg (Hardware)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'In Stock',
    available: true,
    collection: ['in-store-highlights'],
    sku: 'SMPL-BLK-013',
    description:
      'Sample prototype listing for a sandblasted straight-tube borosilicate display piece.',
    specs: [
      { label: 'Material', value: 'Borosilicate Glass' },
      { label: 'Finish', value: 'Sandblasted Matte' },
      { label: 'Base', value: 'Reinforced Flat Base' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-014',
    name: 'Noir Dual-Bay Smart Battery Charger',
    brandId: 'noir-hardware',
    brandName: 'Noir Industrial (Sample)',
    categoryId: 'accessories',
    categoryName: 'Accessories & Care',
    price: 24.99,
    color: 'Matte Black',
    colorHex: '#161616',
    nicotineStrength: '0mg (Accessory)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'In Stock',
    available: true,
    collection: ['featured'],
    sku: 'SMPL-NOR-014',
    description:
      'Sample prototype listing for an intelligent dual-bay lithium battery charger with overcharge protection and LED readout.',
    specs: [
      { label: 'Bays', value: '2 Independent Channels' },
      { label: 'Compatibility', value: '18650 / 21700 Cells' },
      { label: 'Input', value: 'USB-C 5V/2A' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-015',
    name: 'Noir Hard-Shell Travel Case',
    brandId: 'noir-hardware',
    brandName: 'Noir Industrial (Sample)',
    categoryId: 'accessories',
    categoryName: 'Accessories & Care',
    price: 15.99,
    color: 'Graphite',
    colorHex: '#303030',
    nicotineStrength: '0mg (Accessory)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'New',
    available: true,
    collection: ['new-arrivals'],
    sku: 'SMPL-NOR-015',
    description:
      'Sample prototype listing for a weather-resistant EVA hard-shell travel organizer with interior mesh pockets.',
    specs: [
      { label: 'Outer Shell', value: 'Ballistic EVA' },
      { label: 'Closure', value: 'Sealed Zipper' },
      { label: 'Color', value: 'Charcoal / Yellow Pull' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  },
  {
    id: 'p-4835-016',
    name: 'Apex Precision Silicone Battery Sleeves (2-Pack)',
    brandId: 'apex-vapor-lab',
    brandName: 'Apex Vapor Lab (Sample)',
    categoryId: 'accessories',
    categoryName: 'Accessories & Care',
    price: 7.99,
    color: 'Signal Yellow',
    colorHex: '#F2C916',
    nicotineStrength: '0mg (Accessory)',
    puffRange: 'N/A',
    flavor: 'N/A (Hardware)',
    status: 'In Stock',
    available: true,
    collection: [],
    sku: 'SMPL-APX-016',
    description:
      'Sample prototype listing for protective silicone sleeves designed for safe transport of spare 18650 battery cells.',
    specs: [
      { label: 'Fit', value: '18650 Battery Cells' },
      { label: 'Material', value: 'Non-Conductive Silicone' },
      { label: 'Pack Quantity', value: '2 Sleeves' },
      { label: 'Inventory Status', value: 'Sample Prototype Item' }
    ]
  }
];

// ============================================================================
// 3. CUSTOM VISUAL COMPONENTS (PRODUCT ART, SNOWFALL, CHRISTMAS POPUP)
// ============================================================================

/**
 * Generates an editorial, industrial studio-style SVG visual for sample catalog items
 * so we never fabricate misleading manufacturer photos (Command 18).
 */
function ProductVisual({ product, large = false }) {
  const accent = product.colorHex || '#F2C916';
  const isHardware = product.categoryId === 'hardware-devices';
  const isLiquid = product.categoryId === 'e-liquids';
  const isGlass = product.categoryId === 'glass-pieces';
  const isCoil = product.categoryId === 'pods-coils';

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#111111] border border-[#242424] flex items-center justify-center select-none ${
        large ? 'aspect-square md:aspect-[4/4]' : 'aspect-[4/4]'
      }`}
    >
      {/* Subtle industrial grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #303030 1px, transparent 1px), linear-gradient(to bottom, #303030 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      {/* Radial metallic spotlight */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${accent}44 0%, transparent 65%)`
        }}
      />

      {/* Minimalist Industrial Silhouette Illustration */}
      <svg
        viewBox="0 0 240 240"
        className={`relative z-10 transition-transform duration-500 group-hover:scale-105 ${
          large ? 'w-3/4 h-3/4' : 'w-2/3 h-2/3'
        }`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`metal-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#999999" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#262626" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {isHardware && (
          <g>
            {/* Mouthpiece */}
            <rect x="104" y="34" width="32" height="22" rx="4" fill="#2A2A2A" stroke="#D0D0D0" strokeWidth="1.5" />
            {/* Main Chassis */}
            <rect
              x="76"
              y="56"
              width="88"
              height="148"
              rx="10"
              fill={accent}
              stroke="#D0D0D0"
              strokeWidth="2"
            />
            {/* Metallic Side Rail */}
            <rect x="76" y="56" width="14" height="148" rx="4" fill={`url(#metal-${product.id})`} opacity="0.65" />
            {/* OLED Display */}
            <rect x="104" y="84" width="32" height="58" rx="4" fill="#090909" stroke="#F2C916" strokeWidth="1.2" />
            <text x="120" y="114" textAnchor="middle" fill="#F2C916" fontSize="11" fontFamily="monospace" fontWeight="bold">
              4835
            </text>
            <circle cx="120" cy="164" r="9" fill="#090909" stroke="#D0D0D0" strokeWidth="1.5" />
          </g>
        )}

        {isLiquid && (
          <g>
            {/* Dripper Cap */}
            <path d="M108 32 L132 32 L136 58 L104 58 Z" fill="#1F1F1F" stroke="#D0D0D0" strokeWidth="1.5" />
            <rect x="98" y="58" width="44" height="14" rx="2" fill="#303030" stroke="#D0D0D0" strokeWidth="1.2" />
            {/* Bottle Body */}
            <rect x="82" y="72" width="76" height="132" rx="12" fill="#161616" stroke="#D0D0D0" strokeWidth="2" />
            {/* Liquid Level */}
            <rect x="86" y="96" width="68" height="104" rx="8" fill={accent} opacity="0.45" />
            {/* Minimalist Label */}
            <rect x="86" y="102" width="68" height="72" fill="#090909" stroke="#F2C916" strokeWidth="1.2" />
            <text x="120" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
              SAMPLE
            </text>
            <text x="120" y="150" textAnchor="middle" fill="#F2C916" fontSize="9" fontFamily="monospace">
              21+ ADULT
            </text>
          </g>
        )}

        {isGlass && (
          <g>
            {/* Neck */}
            <rect x="104" y="34" width="32" height="90" fill={accent} fillOpacity="0.35" stroke="#D0D0D0" strokeWidth="2" />
            <ellipse cx="120" cy="34" rx="18" ry="5" fill="#161616" stroke="#F2C916" strokeWidth="1.5" />
            {/* Beaker Base */}
            <path
              d="M104 124 L66 196 Q120 212 174 196 L136 124 Z"
              fill={accent}
              fillOpacity="0.4"
              stroke="#D0D0D0"
              strokeWidth="2"
            />
            <line x1="112" y1="54" x2="112" y2="114" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
          </g>
        )}

        {isCoil && (
          <g>
            {/* Twin Cylinder / Pod Pack */}
            <rect x="64" y="64" width="46" height="112" rx="6" fill={`url(#metal-${product.id})`} stroke="#D0D0D0" strokeWidth="1.5" />
            <rect x="130" y="64" width="46" height="112" rx="6" fill={`url(#metal-${product.id})`} stroke="#D0D0D0" strokeWidth="1.5" />
            <rect x="74" y="96" width="26" height="44" rx="3" fill="#090909" stroke="#F2C916" strokeWidth="1.2" />
            <rect x="140" y="96" width="26" height="44" rx="3" fill="#090909" stroke="#F2C916" strokeWidth="1.2" />
          </g>
        )}

        {!isHardware && !isLiquid && !isGlass && !isCoil && (
          <g>
            {/* Industrial Accessory Case / Charger */}
            <rect x="52" y="68" width="136" height="104" rx="14" fill={accent} stroke="#D0D0D0" strokeWidth="2" />
            <rect x="68" y="84" width="104" height="72" rx="8" fill="#090909" stroke="#303030" strokeWidth="1.5" />
            <line x1="88" y1="120" x2="152" y2="120" stroke="#F2C916" strokeWidth="2.5" />
            <circle cx="96" cy="100" r="4" fill="#F2C916" />
            <circle cx="112" cy="100" r="4" fill="#D0D0D0" />
          </g>
        )}
      </svg>

      {/* Prototype Sample Watermark Badge (Command 14 & 18) */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] tracking-[0.14em] uppercase font-mono text-[#D0D0D0]/70">
        <span>{product.sku}</span>
        <span className="px-1.5 py-0.5 bg-[#090909]/85 border border-[#303030] text-[#F2C916]">
          SAMPLE IMAGE
        </span>
      </div>
    </div>
  );
}

/**
 * Subtle falling-snow canvas animation for the Christmas Seasonal Experience (Command 19).
 * Respects prefers-reduced-motion and never blocks pointer events.
 */
function SnowfallCanvas({ enabled }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const flakeCount = Math.min(55, Math.floor(width / 26));
    const flakes = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.1 + 0.8,
      speedY: Math.random() * 0.65 + 0.25,
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.45 + 0.15,
      isGold: Math.random() > 0.82
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = f.isGold
          ? `rgba(242, 201, 22, ${f.opacity})`
          : `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();

        f.y += f.speedY;
        f.x += f.speedX;

        if (f.y > height + 5) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) f.x = -5;
        if (f.x < -5) f.x = width + 5;
      }
      animationId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}

/**
 * Client-side canvas background eliminator.
 * Automatically detects and strips baked-in solid or checkerboard (mosaic) backgrounds
 * via edge-connected BFS flood-fill, softens anti-aliased fringe halos against dark surfaces,
 * and trims empty transparent margins so the cutout scales cleanly.
 */
const bgRemovalCache = new Map();

function useBackgroundRemovedImage(src) {
  const cached = bgRemovalCache.get(src);
  const [processedSrc, setProcessedSrc] = useState(() => cached?.dataUrl || null);
  const [dimensions, setDimensions] = useState(() =>
    cached ? { width: cached.width, height: cached.height, aspectRatio: cached.aspectRatio } : null
  );
  const [isProcessing, setIsProcessing] = useState(() => !cached);

  useEffect(() => {
    const existing = bgRemovalCache.get(src);
    if (existing) {
      setProcessedSrc(existing.dataUrl);
      setDimensions({
        width: existing.width,
        height: existing.height,
        aspectRatio: existing.aspectRatio
      });
      setIsProcessing(false);
      return;
    }

    let cancelled = false;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (cancelled) return;
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) {
          setProcessedSrc(src);
          setIsProcessing(false);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          setProcessedSrc(src);
          setIsProcessing(false);
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        // 1. Sample opaque pixels along the outer 4px border to identify background palette
        const bucketCounts = new Map();
        let opaqueBorderCount = 0;
        let neutralBorderCount = 0;
        let minNeutralLum = 255;
        let maxNeutralLum = 0;

        const samplePixel = (x, y) => {
          const i = (y * w + x) * 4;
          const a = data[i + 3];
          if (a < 20) return;
          opaqueBorderCount++;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (sat <= 24) {
            neutralBorderCount++;
            if (lum < minNeutralLum) minNeutralLum = lum;
            if (lum > maxNeutralLum) maxNeutralLum = lum;
          }
          const key = `${Math.round(r / 16) * 16},${Math.round(g / 16) * 16},${Math.round(b / 16) * 16}`;
          bucketCounts.set(key, (bucketCounts.get(key) || 0) + 1);
        };

        const borderDepth = Math.min(4, Math.floor(Math.min(w, h) / 10));
        for (let d = 0; d < borderDepth; d++) {
          for (let x = 0; x < w; x++) {
            samplePixel(x, d);
            samplePixel(x, h - 1 - d);
          }
          for (let y = borderDepth; y < h - borderDepth; y++) {
            samplePixel(d, y);
            samplePixel(w - 1 - d, y);
          }
        }

        // Only run background stripping if the outer border actually contains opaque pixels
        if (opaqueBorderCount > 0) {
          const minCount = Math.max(4, opaqueBorderCount * 0.015);
          const bgPalette = [];
          bucketCounts.forEach((count, key) => {
            if (count >= minCount) {
              const [r, g, b] = key.split(',').map(Number);
              bgPalette.push([r, g, b]);
            }
          });

          const borderIsNeutral = neutralBorderCount / opaqueBorderCount > 0.65;

          const colorDistSq = (r, g, b, pr, pg, pb) => {
            const dr = r - pr;
            const dg = g - pg;
            const db = b - pb;
            return dr * dr + dg * dg + db * db;
          };

          const isBgColor = (r, g, b, a) => {
            if (a < 20) return true;
            for (let k = 0; k < bgPalette.length; k++) {
              const [pr, pg, pb] = bgPalette[k];
              if (colorDistSq(r, g, b, pr, pg, pb) <= 44 * 44) return true;
            }
            if (borderIsNeutral) {
              const sat = Math.max(r, g, b) - Math.min(r, g, b);
              const lum = 0.299 * r + 0.587 * g + 0.114 * b;
              if (sat <= 24 && lum >= minNeutralLum - 22 && lum <= maxNeutralLum + 22) {
                return true;
              }
            }
            return false;
          };

          // 2. Edge-connected BFS flood-fill from all 4 outer edges
          const visited = new Uint8Array(w * h);
          const removed = new Uint8Array(w * h);
          const queue = new Int32Array(w * h);
          let head = 0;
          let tail = 0;

          const enqueueIfBg = (x, y) => {
            const idx = y * w + x;
            if (visited[idx]) return;
            const p = idx * 4;
            if (isBgColor(data[p], data[p + 1], data[p + 2], data[p + 3])) {
              visited[idx] = 1;
              removed[idx] = 1;
              queue[tail++] = idx;
            }
          };

          for (let x = 0; x < w; x++) {
            enqueueIfBg(x, 0);
            enqueueIfBg(x, h - 1);
          }
          for (let y = 1; y < h - 1; y++) {
            enqueueIfBg(0, y);
            enqueueIfBg(w - 1, y);
          }

          while (head < tail) {
            const idx = queue[head++];
            const x = idx % w;
            const y = (idx - x) / w;
            if (x > 0) enqueueIfBg(x - 1, y);
            if (x < w - 1) enqueueIfBg(x + 1, y);
            if (y > 0) enqueueIfBg(x, y - 1);
            if (y < h - 1) enqueueIfBg(x, y + 1);
          }

          // Clear removed background pixels
          for (let idx = 0; idx < w * h; idx++) {
            if (removed[idx]) {
              data[idx * 4 + 3] = 0;
            }
          }

          // 3. Soften 1px anti-aliased fringe halos adjacent to removed background
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const idx = y * w + x;
              if (removed[idx]) continue;
              const p = idx * 4;
              if (data[p + 3] < 20) continue;

              const touchesBg =
                removed[idx - 1] ||
                removed[idx + 1] ||
                removed[idx - w] ||
                removed[idx + w];

              if (touchesBg) {
                const r = data[p];
                const g = data[p + 1];
                const b = data[p + 2];
                let minDist = Infinity;
                for (let k = 0; k < bgPalette.length; k++) {
                  const [pr, pg, pb] = bgPalette[k];
                  const d = Math.sqrt(colorDistSq(r, g, b, pr, pg, pb));
                  if (d < minDist) minDist = d;
                }
                if (minDist < 76) {
                  data[p + 3] = Math.round(data[p + 3] * Math.max(0, (minDist - 30) / 46));
                }
              }
            }
          }

          ctx.putImageData(imageData, 0, 0);
        }

        // 4. Trim empty transparent margins tightly around the subject
        let minX = w;
        let minY = h;
        let maxX = 0;
        let maxY = 0;
        let hasOpaque = false;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] > 20) {
              hasOpaque = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (hasOpaque && maxX > minX && maxY > minY) {
          const pad = 4;
          const sx = Math.max(0, minX - pad);
          const sy = Math.max(0, minY - pad);
          const sw = Math.min(w - sx, maxX - minX + 1 + pad * 2);
          const sh = Math.min(h - sy, maxY - minY + 1 + pad * 2);

          const trimmed = document.createElement('canvas');
          trimmed.width = sw;
          trimmed.height = sh;
          const tCtx = trimmed.getContext('2d');
          tCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
          const dataUrl = trimmed.toDataURL('image/png');
          const entry = { dataUrl, width: sw, height: sh, aspectRatio: sw / sh };
          bgRemovalCache.set(src, entry);
          setProcessedSrc(dataUrl);
          setDimensions({ width: sw, height: sh, aspectRatio: sw / sh });
        } else {
          const dataUrl = canvas.toDataURL('image/png');
          const entry = { dataUrl, width: w, height: h, aspectRatio: w / h };
          bgRemovalCache.set(src, entry);
          setProcessedSrc(dataUrl);
          setDimensions({ width: w, height: h, aspectRatio: w / h });
        }
      } catch {
        const w = img.naturalWidth || 1;
        const h = img.naturalHeight || 1;
        setProcessedSrc(src);
        setDimensions({ width: w, height: h, aspectRatio: w / h });
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    };

    img.onerror = () => {
      if (!cancelled) {
        setProcessedSrc(src);
        setDimensions(null);
        setIsProcessing(false);
      }
    };

    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return { processedSrc, isProcessing, dimensions };
}

/**
 * Smoke2Snack-inspired Christmas Seasonal Popup reimagined in 4835 Black / Yellow / Silver / White (Command 19).
 * Strips any baked-in background completely and stages the clean cutout in an asymmetric pop-out composition.
 */
function ChristmasPopup({ open, onDismiss, onExploreShop }) {
  const { processedSrc, isProcessing } = useBackgroundRemovedImage(HOLIDAY_POPUP_ARTWORK_URL);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="holiday-popup-title"
    >
      <div className="relative w-full max-w-2xl bg-[#090909] border-2 border-[#F2C916] shadow-[0_28px_90px_rgba(0,0,0,0.95),0_0_55px_rgba(242,201,22,0.14)] overflow-visible my-auto">
        {/* Industrial Yellow Offset Corner Accent */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute -bottom-2.5 -right-2.5 w-20 h-20 border-r-4 border-b-4 border-[#F2C916] pointer-events-none"
        />

        {/* Subtle Corner Snowflake Details */}
        <Snowflake
          className="absolute top-4 left-4 w-5 h-5 text-[#F2C916]/60 animate-spin-slow pointer-events-none z-20"
          aria-hidden="true"
        />
        <Snowflake
          className="absolute bottom-4 left-6 w-4 h-4 text-[#D0D0D0]/25 pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss seasonal greeting"
          className="absolute top-3 right-3 z-30 p-2 text-[#D0D0D0] hover:text-[#F2C916] hover:bg-[#161616] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* LEFT / TOP STAGE: Clean Background-Free Cutout Overlapping Oversized 4835 Chrome Type */}
          <div className="md:col-span-5 relative flex items-center justify-center px-6 pt-4 pb-2 md:py-8 md:pl-6 md:pr-2 bg-[#090909]">
            {/* Oversized Cropped 4835 Watermark Layered Behind the Cutout for Depth */}
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[6.5rem] sm:text-[7.5rem] font-black leading-none tracking-tighter text-white/[0.045] overflow-hidden"
            >
              4835
            </span>

            {/* Soft Warm Rim Glow Directly Behind Cutout (Zero Grid / Zero Mosaic) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute w-52 h-52 rounded-full blur-3xl opacity-25"
              style={{
                background:
                  'radial-gradient(circle, rgba(242,201,22,0.9) 0%, rgba(208,208,208,0.15) 45%, rgba(9,9,9,0) 75%)'
              }}
            />

            {/* Pop-Out Cutout Breaking Above Mobile Top Edge & Floating Cleanly on Desktop */}
            <div className="relative z-20 -mt-20 md:mt-0 md:-ml-10 flex flex-col items-center">
              {!isProcessing && processedSrc ? (
                <img
                  src={processedSrc}
                  alt="4835 Smoke & Vape Seasonal Edition Cutout"
                  className="w-52 sm:w-60 md:w-64 h-auto max-h-64 md:max-h-72 object-contain select-none drop-shadow-[0_22px_26px_rgba(0,0,0,0.95)]"
                />
              ) : (
                <div className="w-52 h-52 flex items-center justify-center">
                  <Snowflake className="w-8 h-8 text-[#F2C916] animate-spin-slow" />
                </div>
              )}
              {/* Grounded Contact Shadow Under Cutout */}
              <div
                aria-hidden="true"
                className="w-36 h-3 -mt-2 rounded-full bg-black/80 blur-md"
              />
            </div>
          </div>

          {/* RIGHT / CONTENT STAGE: Editorial 4835 Street Culture Copy & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 md:pl-6 text-center md:text-left bg-[#090909] relative z-10">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="h-[2px] w-6 bg-[#F2C916]" />
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#F2C916]">
                SEASONAL EDITION • DALLAS, TX
              </p>
            </div>

            <h2
              id="holiday-popup-title"
              className="text-3xl sm:text-4xl font-black uppercase leading-[0.95] tracking-tight chrome-text mb-2"
            >
              WINTER ON THE 4835 BLOCK
            </h2>

            {/* Yellow Signature Brush Stroke */}
            <svg
              viewBox="0 0 220 12"
              className="w-40 h-3 mb-4 mx-auto md:mx-0"
              aria-hidden="true"
            >
              <path
                d="M2 9 C 65 2, 150 2, 218 8"
                fill="none"
                stroke="#F2C916"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            <p className="text-sm text-[#D0D0D0] leading-relaxed mb-6">
              Season’s greetings from <strong className="text-white">4835 Smoke &amp; Vape</strong>.
              Explore our curated Dallas retail catalog and stop by the shop for real service all
              season long.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                type="button"
                onClick={() => {
                  onDismiss();
                  onExploreShop();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors"
              >
                <span>Explore the Shop</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex items-center justify-center px-5 py-3.5 border border-[#303030] text-[#D0D0D0] font-bold text-xs uppercase tracking-[0.16em] hover:border-white hover:text-white transition-colors"
              >
                Continue Browsing
              </button>
            </div>

            <p className="mt-5 text-[10px] text-[#777777] font-mono uppercase tracking-wider">
              {BUSINESS_INFO.tagline} • 21+ Adult Retail Destination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. GLOBAL HEADER, MEGA MENU & MOBILE DRAWER (COMMAND 06)
// ============================================================================

function Header({
  currentRoute,
  navigate,
  cartCount,
  seasonalEnabled,
  onToggleSeasonal,
  onOpenHolidayPopup,
  searchQuery,
  setSearchQuery
}) {
  const [megaMenu, setMegaMenu] = useState(null); // 'categories' | 'brands' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setMobileOpen(false);
    navigate('shop');
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-30 bg-[#090909]/95 backdrop-blur-md border-b border-[#222222]">
      {/* Slim Editable Announcement Bar (Command 06 & 07) */}
      <div className="bg-[#121212] border-b border-[#222222] px-4 py-2 text-[11px] font-mono tracking-wider text-[#D0D0D0]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {seasonalEnabled && (
              <Snowflake className="w-3.5 h-3.5 text-[#F2C916] shrink-0" aria-hidden="true" />
            )}
            <span className="truncate">{BUSINESS_INFO.announcementText}</span>
          </div>

          {/* Seasonal Enable / Disable Control (Command 19 & 24) */}
          <div className="flex items-center gap-3 shrink-0">
            {seasonalEnabled && (
              <button
                type="button"
                onClick={onOpenHolidayPopup}
                className="text-[#F2C916] hover:underline uppercase text-[10px] tracking-[0.14em]"
              >
                Holiday Card
              </button>
            )}
            <button
              type="button"
              onClick={onToggleSeasonal}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[10px] uppercase tracking-[0.14em] transition-colors ${
                seasonalEnabled
                  ? 'border-[#F2C916] text-[#F2C916] bg-[#F2C916]/10'
                  : 'border-[#303030] text-[#888888] hover:text-white'
              }`}
              aria-pressed={seasonalEnabled}
              title="Toggle Christmas Seasonal Experience"
            >
              <Snowflake className="w-3 h-3" />
              <span>Seasonal: {seasonalEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Global Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2.5 -ml-2 text-white hover:text-[#F2C916] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Official Brand Logo — Unmodified Proportions */}
        <button
          type="button"
          onClick={() => {
            setMegaMenu(null);
            navigate('home');
          }}
          className="flex items-center gap-3 group text-left shrink-0"
          aria-label="4835 Smoke & Vape Home"
        >
          <img
            src={OFFICIAL_LOGO_URL}
            alt="4835 Smoke & Vape Official Logo"
            className="h-11 sm:h-13 w-auto object-contain"
          />
          <div className="hidden sm:block leading-none">
            <span className="block text-sm font-black tracking-[0.16em] text-white group-hover:text-[#F2C916] transition-colors">
              4835
            </span>
            <span className="block text-[10px] font-mono tracking-[0.22em] text-[#D0D0D0] mt-1">
              SMOKE &amp; VAPE
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              navigate('home');
            }}
            className={`text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              currentRoute.page === 'home' ? 'text-[#F2C916]' : 'text-[#D0D0D0] hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              navigate('shop');
            }}
            className={`text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              currentRoute.page === 'shop' ? 'text-[#F2C916]' : 'text-[#D0D0D0] hover:text-white'
            }`}
          >
            Shop
          </button>

          {/* Categories Mega Menu Trigger */}
          <button
            type="button"
            onClick={() => setMegaMenu(megaMenu === 'categories' ? null : 'categories')}
            className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              megaMenu === 'categories' || currentRoute.page === 'category'
                ? 'text-[#F2C916]'
                : 'text-[#D0D0D0] hover:text-white'
            }`}
            aria-expanded={megaMenu === 'categories'}
          >
            <span>Categories</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                megaMenu === 'categories' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Brands Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setMegaMenu(megaMenu === 'brands' ? null : 'brands')}
            className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              megaMenu === 'brands' ||
              currentRoute.page === 'brands' ||
              currentRoute.page === 'brand'
                ? 'text-[#F2C916]'
                : 'text-[#D0D0D0] hover:text-white'
            }`}
            aria-expanded={megaMenu === 'brands'}
          >
            <span>Brands</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                megaMenu === 'brands' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              navigate('about');
            }}
            className={`text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              currentRoute.page === 'about' ? 'text-[#F2C916]' : 'text-[#D0D0D0] hover:text-white'
            }`}
          >
            About 4835
          </button>

          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              navigate('visit');
            }}
            className={`text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
              currentRoute.page === 'visit' ? 'text-[#F2C916]' : 'text-[#D0D0D0] hover:text-white'
            }`}
          >
            Visit Us
          </button>
        </nav>

        {/* Utility Controls: Search, Account, Cart */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              setSearchOpen(!searchOpen);
            }}
            className="p-2.5 text-[#D0D0D0] hover:text-[#F2C916] transition-colors"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              navigate('account');
            }}
            className={`p-2.5 transition-colors ${
              currentRoute.page === 'account'
                ? 'text-[#F2C916]'
                : 'text-[#D0D0D0] hover:text-[#F2C916]'
            }`}
            aria-label="Customer account"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setMegaMenu(null);
              navigate('cart');
            }}
            className={`relative p-2.5 flex items-center gap-1.5 transition-colors ${
              currentRoute.page === 'cart'
                ? 'text-[#F2C916]'
                : 'text-[#D0D0D0] hover:text-[#F2C916]'
            }`}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="min-w-[20px] h-5 px-1.5 bg-[#F2C916] text-[#090909] text-[11px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#222222] bg-[#0F0F0F] px-4 py-4">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sample hardware, pods, e-liquids, brands, or SKUs..."
                className="w-full pl-10 pr-4 py-3 bg-[#090909] border border-[#303030] text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F2C916]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.16em] hover:bg-white transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="px-3 py-3 border border-[#303030] text-[#D0D0D0] hover:text-white"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Desktop Mega Menu: Categories */}
      {megaMenu === 'categories' && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-[#0C0C0C] border-b-2 border-[#F2C916] shadow-2xl">
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            <div className="col-span-3 border-r border-[#242424] pr-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono text-[#F2C916] tracking-[0.22em] uppercase mb-2">
                  4835 INDEX
                </p>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-3">
                  Shop By Category
                </h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">
                  Explore our structured retail departments. Every listing is subject to Texas and
                  federal 21+ compliance verification.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMegaMenu(null);
                  navigate('shop');
                }}
                className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#F2C916] hover:text-white"
              >
                <span>View Complete Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="col-span-9 grid grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setMegaMenu(null);
                    navigate('category', { id: cat.id });
                  }}
                  className="group text-left p-4 bg-[#121212] border border-[#242424] hover:border-[#F2C916] transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-[#F2C916]">{cat.indexNum}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#666666] group-hover:text-[#F2C916] transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-wide text-white group-hover:text-[#F2C916] transition-colors">
                      {cat.name}
                    </div>
                    <p className="text-xs text-[#999999] mt-1 line-clamp-2">{cat.shortDesc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Mega Menu: Brands */}
      {megaMenu === 'brands' && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-[#0C0C0C] border-b-2 border-[#F2C916] shadow-2xl">
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            <div className="col-span-4 border-r border-[#242424] pr-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono text-[#F2C916] tracking-[0.22em] uppercase mb-2">
                  BRAND DISCOVERY
                </p>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-3">
                  Verified Brand Directory
                </h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">
                  Browse sample brand collections below. Live brand partnerships and authorized
                  stockists populate once verified inventory is connected.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMegaMenu(null);
                  navigate('brands');
                }}
                className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#F2C916] hover:text-white"
              >
                <span>Open Full A–Z Directory</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="col-span-8 grid grid-cols-2 gap-3">
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setMegaMenu(null);
                    navigate('brand', { id: b.id });
                  }}
                  className="group text-left p-4 bg-[#121212] border border-[#242424] hover:border-[#F2C916] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#F2C916] transition-colors">
                      {b.name}
                    </div>
                    <div className="text-[11px] text-[#888888] mt-0.5">{b.origin}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#666666] group-hover:text-[#F2C916]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#090909] border-r border-[#262626] h-full flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt="4835 Smoke & Vape"
                  className="h-9 w-auto object-contain"
                />
                <span className="font-black text-sm tracking-[0.15em] text-white">4835</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#D0D0D0] hover:text-[#F2C916]"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-[#222222]">
              <div className="relative">
                <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-[#303030] text-sm text-white placeholder-[#777777] focus:outline-none focus:border-[#F2C916]"
                />
              </div>
            </form>

            {/* Mobile Links */}
            <div className="p-4 flex-1 space-y-1">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Shop All', page: 'shop' },
                { label: 'Brand Directory', page: 'brands' },
                { label: 'About 4835', page: 'about' },
                { label: 'Visit Us (Dallas)', page: 'visit' },
                { label: 'Customer Account', page: 'account' },
                { label: `Shopping Cart (${cartCount})`, page: 'cart' }
              ].map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate(item.page);
                  }}
                  className="w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white hover:bg-[#161616] hover:text-[#F2C916] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#555555]" />
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-[#222222]">
                <p className="px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-2">
                  Categories
                </p>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate('category', { id: cat.id });
                    }}
                    className="w-full text-left px-3 py-2.5 text-xs font-semibold text-[#D0D0D0] hover:text-[#F2C916] flex items-center justify-between"
                  >
                    <span>
                      <span className="font-mono text-[#777777] mr-2">{cat.indexNum}</span>
                      {cat.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[#222222] text-[11px] font-mono text-[#888888]">
              21+ Adult Retail • Dallas, TX
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ============================================================================
// 5. REUSABLE PRODUCT CARD & COMPLETE SHOP / FILTER ENGINE (COMMANDS 08–12)
// ============================================================================

function ProductCard({ product, onViewProduct, onAddToCart }) {
  const statusStyles = {
    New: 'bg-[#F2C916] text-[#090909]',
    'Sold Out': 'bg-[#303030] text-[#D0D0D0]',
    Unavailable: 'bg-[#1A1A1A] text-[#888888] border border-[#303030]'
  };

  return (
    <article className="group bg-[#101010] border border-[#222222] hover:border-[#F2C916]/70 transition-all flex flex-col">
      <div
        onClick={() => onViewProduct(product.id)}
        className="relative cursor-pointer"
      >
        <ProductVisual product={product} />

        {/* Status Indicator (Command 10) */}
        {product.status !== 'In Stock' && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
              statusStyles[product.status] || 'bg-[#303030] text-white'
            }`}
          >
            {product.status}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F2C916] truncate">
              {product.brandName}
            </span>
            <span className="text-[10px] font-mono text-[#777777] shrink-0">
              {product.color}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onViewProduct(product.id)}
            className="text-left text-base font-bold text-white group-hover:text-[#F2C916] transition-colors leading-snug mb-2"
          >
            {product.name}
          </button>

          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-[#A0A0A0] mb-4">
            <span className="px-2 py-0.5 bg-[#181818] border border-[#262626]">
              {product.categoryName}
            </span>
            {product.nicotineStrength && !product.nicotineStrength.includes('Hardware') && (
              <span className="px-2 py-0.5 bg-[#181818] border border-[#262626]">
                {product.nicotineStrength}
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-mono text-[#777777] uppercase">
              Sample Price
            </span>
            <span className="text-lg font-black text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {product.available ? (
            <button
              type="button"
              onClick={() => onAddToCart(product, 1)}
              className="px-3.5 py-2.5 bg-[#F2C916] text-[#090909] font-black text-[11px] uppercase tracking-[0.14em] hover:bg-white transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewProduct(product.id)}
              className="px-3.5 py-2.5 border border-[#303030] text-[#999999] font-bold text-[11px] uppercase tracking-[0.14em] hover:border-white hover:text-white transition-colors"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Complete Shop / Category / Brand Catalog Engine (Commands 08, 09, 10, 11, 12)
 */
function ShopCatalogView({
  lockedCategoryId = null,
  lockedBrandId = null,
  initialCollection = null,
  searchQuery,
  setSearchQuery,
  onViewProduct,
  onAddToCart,
  navigate
}) {
  const [selectedCategories, setSelectedCategories] = useState(
    lockedCategoryId ? [lockedCategoryId] : []
  );
  const [selectedBrands, setSelectedBrands] = useState(lockedBrandId ? [lockedBrandId] : []);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedNicotine, setSelectedNicotine] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedPuffRanges, setSelectedPuffRanges] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState('featured');
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(initialCollection || 'all');

  // Sync locked props when navigating between categories/brands
  useEffect(() => {
    setSelectedCategories(lockedCategoryId ? [lockedCategoryId] : []);
    setSelectedBrands(lockedBrandId ? [lockedBrandId] : []);
    setActiveCollection(initialCollection || 'all');
    setCurrentPage(1);
  }, [lockedCategoryId, lockedBrandId, initialCollection]);

  // Base scope of products (respecting locked category or brand)
  const scopedProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      if (lockedCategoryId && p.categoryId !== lockedCategoryId) return false;
      if (lockedBrandId && p.brandId !== lockedBrandId) return false;
      return true;
    });
  }, [lockedCategoryId, lockedBrandId]);

  // Dynamically derive ONLY filter options that exist in actual scoped products (Command 09)
  const filterOptions = useMemo(() => {
    const colors = [...new Set(scopedProducts.map((p) => p.color))].filter(Boolean);
    const nicotines = [...new Set(scopedProducts.map((p) => p.nicotineStrength))].filter(
      (v) => v && !v.includes('Component') && !v.includes('Accessory')
    );
    const flavors = [...new Set(scopedProducts.map((p) => p.flavor))].filter(
      (v) => v && !v.includes('N/A')
    );
    const puffRanges = [...new Set(scopedProducts.map((p) => p.puffRange))].filter(
      (v) => v && v !== 'N/A'
    );
    const brands = BRANDS.filter((b) => scopedProducts.some((p) => p.brandId === b.id));
    return { colors, nicotines, flavors, puffRanges, brands };
  }, [scopedProducts]);

  // Apply all active filters + search + sorting
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = scopedProducts.filter((p) => {
      if (activeCollection !== 'all' && !p.collection.includes(activeCollection)) return false;
      if (q) {
        const hay = `${p.name} ${p.brandName} ${p.categoryName} ${p.sku} ${p.flavor} ${p.color}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (!lockedCategoryId && selectedCategories.length > 0 && !selectedCategories.includes(p.categoryId)) {
        return false;
      }
      if (!lockedBrandId && selectedBrands.length > 0 && !selectedBrands.includes(p.brandId)) {
        return false;
      }
      if (selectedColors.length > 0 && !selectedColors.includes(p.color)) return false;
      if (selectedNicotine.length > 0 && !selectedNicotine.includes(p.nicotineStrength)) return false;
      if (selectedFlavors.length > 0 && !selectedFlavors.includes(p.flavor)) return false;
      if (selectedPuffRanges.length > 0 && !selectedPuffRanges.includes(p.puffRange)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'newest') {
      list = [...list].sort((a, b) => (b.status === 'New' ? 1 : 0) - (a.status === 'New' ? 1 : 0));
    }
    return list;
  }, [
    scopedProducts,
    activeCollection,
    searchQuery,
    lockedCategoryId,
    lockedBrandId,
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedNicotine,
    selectedFlavors,
    selectedPuffRanges,
    maxPrice,
    sortBy
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * perPage, safePage * perPage);

  const toggleItem = (list, setter, value) => {
    setter(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    if (!lockedCategoryId) setSelectedCategories([]);
    if (!lockedBrandId) setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedNicotine([]);
    setSelectedFlavors([]);
    setSelectedPuffRanges([]);
    setMaxPrice(100);
    setActiveCollection('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    (!lockedCategoryId && selectedCategories.length > 0) ||
    (!lockedBrandId && selectedBrands.length > 0) ||
    selectedColors.length > 0 ||
    selectedNicotine.length > 0 ||
    selectedFlavors.length > 0 ||
    selectedPuffRanges.length > 0 ||
    maxPrice < 100 ||
    activeCollection !== 'all' ||
    searchQuery.trim() !== '';

  const renderFilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-white">
          Filter Catalog
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#F2C916] hover:text-white"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      {!lockedCategoryId && (
        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0] mb-3">
            Category
          </h4>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat.id)}
                  className="accent-[#F2C916] w-4 h-4"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filter */}
      {!lockedBrandId && filterOptions.brands.length > 0 && (
        <div className="pt-4 border-t border-[#222222]">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0] mb-3">
            Brand
          </h4>
          <div className="space-y-2">
            {filterOptions.brands.map((b) => (
              <label key={b.id} className="flex items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.id)}
                  onChange={() => toggleItem(selectedBrands, setSelectedBrands, b.id)}
                  className="accent-[#F2C916] w-4 h-4"
                />
                <span>{b.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="pt-4 border-t border-[#222222]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0]">
            Max Price
          </h4>
          <span className="text-xs font-mono text-[#F2C916]">${maxPrice}</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full accent-[#F2C916]"
        />
      </div>

      {/* Color Filter */}
      {filterOptions.colors.length > 0 && (
        <div className="pt-4 border-t border-[#222222]">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0] mb-3">
            Product Color
          </h4>
          <div className="flex flex-wrap gap-2">
            {filterOptions.colors.map((c) => {
              const active = selectedColors.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleItem(selectedColors, setSelectedColors, c)}
                  className={`px-2.5 py-1.5 text-[11px] border transition-colors ${
                    active
                      ? 'border-[#F2C916] bg-[#F2C916] text-[#090909] font-bold'
                      : 'border-[#303030] text-[#CCCCCC] hover:border-white'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Nicotine Strength Filter */}
      {filterOptions.nicotines.length > 0 && (
        <div className="pt-4 border-t border-[#222222]">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0] mb-3">
            Nicotine Strength
          </h4>
          <div className="space-y-2">
            {filterOptions.nicotines.map((n) => (
              <label key={n} className="flex items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={selectedNicotine.includes(n)}
                  onChange={() => toggleItem(selectedNicotine, setSelectedNicotine, n)}
                  className="accent-[#F2C916] w-4 h-4"
                />
                <span>{n}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Flavor Profile Filter (Only shown if relevant products exist) */}
      {filterOptions.flavors.length > 0 && (
        <div className="pt-4 border-t border-[#222222]">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0] mb-3">
            Flavor Profile
          </h4>
          <div className="space-y-2">
            {filterOptions.flavors.map((fl) => (
              <label key={fl} className="flex items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={selectedFlavors.includes(fl)}
                  onChange={() => toggleItem(selectedFlavors, setSelectedFlavors, fl)}
                  className="accent-[#F2C916] w-4 h-4"
                />
                <span>{fl}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Format / Puff-Count Range Filter */}
      {filterOptions.puffRanges.length > 0 && (
        <div className="pt-4 border-t border-[#222222]">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D0D0D0] mb-3">
            Format / Capacity
          </h4>
          <div className="space-y-2">
            {filterOptions.puffRanges.map((pr) => (
              <label key={pr} className="flex items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={selectedPuffRanges.includes(pr)}
                  onChange={() => toggleItem(selectedPuffRanges, setSelectedPuffRanges, pr)}
                  className="accent-[#F2C916] w-4 h-4"
                />
                <span>{pr}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Prototype Compliance Notice Banner */}
      <div className="mb-8 p-4 bg-[#121212] border-l-4 border-[#F2C916] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#F2C916] shrink-0 mt-0.5" />
          <p className="text-xs text-[#D0D0D0] leading-relaxed">
            <strong className="text-white uppercase tracking-wider">Prototype Catalog Mode:</strong>{' '}
            Items below are clearly labeled sample entries demonstrating retail browsing, filtering,
            and cart interactions. Live inventory is published only after Texas SB 2024 / SB 1313 /
            SB 1316 and FDA eligibility review.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('legal')}
          className="text-[11px] font-mono uppercase tracking-wider text-[#F2C916] hover:underline shrink-0"
        >
          Compliance Info →
        </button>
      </div>

      {/* Collection Quick-Pills + Search Input */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#222222]">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'new-arrivals', label: 'New Arrivals' },
            { id: 'featured', label: 'Featured Collections' },
            { id: 'in-store-highlights', label: 'In-Store Highlights' }
          ].map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => {
                setActiveCollection(col.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] border transition-colors ${
                activeCollection === col.id
                  ? 'bg-[#F2C916] text-[#090909] border-[#F2C916]'
                  : 'bg-[#111111] text-[#D0D0D0] border-[#2A2A2A] hover:border-white'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Filter by keyword or SKU..."
            className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#303030] text-xs text-white placeholder-[#777777] focus:outline-none focus:border-[#F2C916]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 p-5 bg-[#0E0E0E] border border-[#222222]">
            {renderFilterPanel()}
          </div>
        </aside>

        {/* Product Listings Column */}
        <div className="lg:col-span-9">
          {/* Toolbar: Mobile Filter Trigger, Result Count, Per Page, Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3.5 bg-[#101010] border border-[#222222]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-[#1B1B1B] border border-[#303030] text-xs font-bold uppercase tracking-wider text-white hover:border-[#F2C916]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#F2C916]" />
                <span>Filters</span>
              </button>
              <p className="text-xs font-mono text-[#D0D0D0]">
                Showing <strong className="text-white">{filteredProducts.length}</strong> sample
                results • Page <strong className="text-[#F2C916]">{safePage}</strong> of{' '}
                {totalPages}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Per-page selector (Command 10: 12, 24, 48) */}
              <label className="flex items-center gap-2 text-[11px] font-mono text-[#999999]">
                <span>Show:</span>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-[#090909] border border-[#303030] text-white px-2 py-1.5 text-xs focus:outline-none focus:border-[#F2C916]"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </label>

              {/* Sort dropdown */}
              <label className="flex items-center gap-2 text-[11px] font-mono text-[#999999]">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#090909] border border-[#303030] text-white px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#F2C916]"
                >
                  <option value="featured">Curated Order</option>
                  <option value="newest">Newest Marked</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </label>
            </div>
          </div>

          {/* Product Grid or Properly Designed Empty State */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 px-6 text-center bg-[#0F0F0F] border border-[#242424]">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#F2C916] mb-2">
                NO MATCHES FOUND
              </p>
              <h3 className="text-2xl font-black uppercase text-white mb-3">
                No Catalog Items Match Your Filters
              </h3>
              <p className="text-sm text-[#A0A0A0] max-w-md mx-auto mb-6">
                Try broadening your price range, clearing search keywords, or resetting your active
                filter combination.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.16em] hover:bg-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* Working Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2.5 border border-[#303030] text-white disabled:opacity-30 hover:border-[#F2C916]"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 text-xs font-black border transition-colors ${
                    pageNum === safePage
                      ? 'bg-[#F2C916] text-[#090909] border-[#F2C916]'
                      : 'border-[#303030] text-[#D0D0D0] hover:border-white'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2.5 border border-[#303030] text-white disabled:opacity-30 hover:border-[#F2C916]"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-In Filter Drawer (Command 09 & 21) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#090909] border-l border-[#262626] h-full flex flex-col z-10">
            <div className="p-4 border-b border-[#222222] flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#F2C916]">
                Filter Results
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-[#D0D0D0] hover:text-white"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex-1 overflow-y-auto">{renderFilterPanel()}</div>
            <div className="p-4 border-t border-[#222222]">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.16em]"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. HOMEPAGE — THE 4835 BLOCK (COMMANDS 05 & 07)
// ============================================================================

function HomePage({ navigate, onViewProduct, onAddToCart, seasonalEnabled }) {
  const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.collection.includes('new-arrivals')).slice(0, 4);
  const featuredItems = SAMPLE_PRODUCTS.filter((p) => p.collection.includes('featured')).slice(0, 3);
  const {
    processedSrc: heroCutoutSrc,
    isProcessing: heroCutoutLoading,
    dimensions: heroCutoutDims
  } = useBackgroundRemovedImage(HOLIDAY_POPUP_ARTWORK_URL);

  // Adapt the Hero frame's width directly to the trimmed artwork's natural aspect ratio
  const heroAspect = heroCutoutDims?.aspectRatio || 1;
  const isHeroLandscape = heroAspect > 1.15;
  const isHeroPortrait = heroAspect < 0.85;
  const heroFrameWidthClass = isHeroLandscape
    ? 'max-w-[560px]'
    : isHeroPortrait
    ? 'max-w-[420px]'
    : 'max-w-[480px]';

  return (
    <div className="overflow-x-hidden">
      {/* ====================================================================
          SECTION 02: THE MAIN ATTRACTION (DRAMATIC ASYMMETRIC HERO)
         ==================================================================== */}
      <section className="relative min-h-[82vh] flex items-center border-b border-[#242424] bg-[#0B0B0B] overflow-hidden">
        {/* Clean Editorial Backdrop with Brighter Studio Depth */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={EDITORIAL_IMAGES.heroUrban}
            alt="Dallas urban architectural atmosphere"
            className="w-full h-full object-cover opacity-20 grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#0B0B0B]/85 to-[#121212]/65" />
          <div
            className="absolute -top-32 right-0 w-[640px] h-[640px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(242,201,22,0.55) 0%, rgba(255,255,255,0.08) 45%, transparent 72%)'
            }}
          />
        </div>

        {/* Oversized Cropped Background 4835 Typography */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-8 -bottom-14 text-[12rem] sm:text-[18rem] lg:text-[24rem] font-black leading-none tracking-tighter text-white/[0.035]"
        >
          4835
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Asymmetric Editorial Column */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-mono font-bold text-[#F2C916] tracking-[0.22em]">
                02 // THE MAIN ATTRACTION
              </span>
              <span className="h-[2px] w-8 bg-[#F2C916]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E0E0E0]">
                DALLAS, TEXAS
              </span>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter chrome-text mb-2">
              4835
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-[0.14em] text-white mb-4">
              SMOKE &amp; VAPE
            </p>

            {/* Yellow Signature Brush Stroke Accent */}
            <svg
              viewBox="0 0 280 14"
              className="w-52 sm:w-64 h-3.5 mb-5"
              aria-hidden="true"
            >
              <path
                d="M2 10 C 80 2, 195 2, 278 9"
                fill="none"
                stroke="#F2C916"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <div className="space-y-1 mb-5">
              <p className="text-xl sm:text-2xl font-black uppercase tracking-wide text-[#F2C916]">
                {BUSINESS_INFO.tagline}
              </p>
              <p className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-white/85">
                {BUSINESS_INFO.secondaryMessage}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#CFCFCF] max-w-lg leading-relaxed mb-8">
              Dallas’s street-culture smoke and vape destination. Browse our organized retail
              catalog online and visit the 4835 block in person for genuine 21+ adult service.
            </p>

            {/* Two Prominent Hero Destinations */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors shadow-[0_10px_30px_rgba(242,201,22,0.2)]"
              >
                <span>Explore the Shop</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('visit')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/75 text-white font-black text-xs uppercase tracking-[0.2em] hover:border-[#F2C916] hover:text-[#F2C916] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Find Our Store</span>
              </button>
            </div>
          </div>

          {/* Right Clean Architectural Showcase Frame — Fitted to the Background-Free Artwork */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className={`relative w-full ${heroFrameWidthClass}`}>
              {/* Clean Offset Signal-Yellow Architectural Accent Frame */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute inset-0 translate-x-3 translate-y-3 border-2 border-[#F2C916] pointer-events-none z-0"
              />

              {/* Unobstructed Studio Stage (Zero Mosaic, Zero Cluttered Rails) */}
              <div className="relative z-10 bg-[#121212] border border-white/15 p-5 sm:p-8 shadow-[0_28px_70px_rgba(0,0,0,0.75)] flex flex-col items-center justify-center overflow-hidden">
                {/* Soft Studio Rim Light Behind the Cutout */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 48%, rgba(242,201,22,0.24) 0%, rgba(255,255,255,0.06) 44%, rgba(18,18,18,0) 74%)'
                  }}
                />

                {/* Minimal Top-Left Corner Stamp */}
                <div className="relative z-20 w-full flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F2C916]" />
                    <span>THE 4835 BLOCK</span>
                  </span>
                  <span className="text-[#F2C916]">
                    {seasonalEnabled ? '❄ SEASONAL EDITION' : '21+ ADULT RETAIL'}
                  </span>
                </div>

                {/* Background-Free Artwork Rendered Crisp & Unobstructed */}
                <div className="relative z-20 w-full flex flex-col items-center justify-center py-2">
                  {!heroCutoutLoading && heroCutoutSrc ? (
                    <img
                      src={heroCutoutSrc}
                      alt="4835 Smoke & Vape Featured Cutout Artwork"
                      className="w-full h-auto max-h-[420px] sm:max-h-[470px] object-contain select-none transition-transform duration-500 hover:scale-[1.02] drop-shadow-[0_24px_32px_rgba(0,0,0,0.85)]"
                    />
                  ) : (
                    <div className="w-full aspect-square max-h-[360px] flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#F2C916] animate-pulse" />
                    </div>
                  )}

                  {/* Grounded Contact Shadow */}
                  <div
                    aria-hidden="true"
                    className="w-3/5 h-3.5 mt-2 rounded-full bg-black/80 blur-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03: THE 4835 INDEX (ASYMMETRIC CATEGORY DISCOVERY)
         ==================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#222222] bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono text-[#F2C916] tracking-[0.24em] uppercase mb-2">
                03 // THE 4835 INDEX
              </p>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                Shop By Department
              </h2>
            </div>
            <p className="text-sm text-[#A0A0A0] max-w-md">
              Every department connects directly to our filtered retail catalog. Only verified and
              legally eligible adult product categories are represented.
            </p>
          </div>

          {/* Non-repetitive Editorial Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[240px] sm:auto-rows-[260px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate('category', { id: cat.id })}
                className={`group relative overflow-hidden border border-[#262626] hover:border-[#F2C916] text-left transition-all ${cat.spanClass}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-transparent" />

                {/* Oversized Index Number */}
                <span className="absolute top-4 right-5 text-5xl sm:text-6xl font-black text-white/10 group-hover:text-[#F2C916]/25 transition-colors leading-none">
                  {cat.indexNum}
                </span>

                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-1">
                    INDEX {cat.indexNum}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#F2C916] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D0D0D0] mt-1.5 max-w-md line-clamp-2">
                    {cat.shortDesc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white group-hover:text-[#F2C916]">
                    <span>Browse Category</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 04: THE RETAIL FLOOR (CURATED COLLECTIONS)
         ==================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#222222] bg-[#090909]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-mono text-[#F2C916] tracking-[0.24em] uppercase mb-2">
                04 // THE RETAIL FLOOR
              </p>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight chrome-text">
                Curated Collections
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#F2C916] hover:text-white"
            >
              <span>Enter Full Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Collection A: New Arrivals */}
          <div className="mb-16">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#242424]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#F2C916] text-[#090909] font-mono text-[11px] font-black">
                  DROP 01
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  New Arrivals (Sample Lineup)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('shop', { collection: 'new-arrivals' })}
                className="text-xs font-mono uppercase tracking-wider text-[#D0D0D0] hover:text-[#F2C916]"
              >
                View All New →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {newArrivals.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Collection B: Featured + Best Sellers Honesty Block (Asymmetric Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Compliance-Honest Best Sellers Feature Panel (Command 07: Do not invent popularity stats) */}
            <div className="lg:col-span-4 bg-[#121212] border border-[#262626] p-7 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono text-[#F2C916] uppercase tracking-[0.22em] mb-3">
                  LIVE POS RANKINGS
                </p>
                <h3 className="text-3xl font-black uppercase text-white leading-tight mb-4">
                  Best Sellers &amp; Verified Favorites
                </h3>
                <p className="text-sm text-[#BDBDBD] leading-relaxed mb-6">
                  We never fabricate popularity rankings or fake customer reviews. Once 4835 Smoke
                  &amp; Vape’s live point-of-sale inventory is connected, this shelf automatically
                  reflects real Dallas store demand.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-[#242424]">
                <button
                  type="button"
                  onClick={() => navigate('shop', { collection: 'featured' })}
                  className="w-full py-3.5 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.16em] hover:bg-white transition-colors"
                >
                  Browse Featured Samples
                </button>
                <button
                  type="button"
                  onClick={() => navigate('brands')}
                  className="w-full py-3.5 border border-[#303030] text-white font-bold text-xs uppercase tracking-[0.16em] hover:border-[#F2C916] hover:text-[#F2C916] transition-colors"
                >
                  Explore Brand Directory
                </button>
              </div>
            </div>

            {/* Right Featured 3-Item Showcase */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {featuredItems.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 05: THE 4835 BRAND WALL (STRONG VISUAL TRANSITION)
         ==================================================================== */}
      <section className="relative py-24 lg:py-36 border-b border-[#222222] bg-[#090909] overflow-hidden">
        <img
          src={EDITORIAL_IMAGES.brandWall}
          alt="Urban skyline backdrop"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-transparent to-[#090909]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#F2C916] mb-5">
            05 // THE 4835 BRAND WALL {seasonalEnabled ? '• ❄ WINTER BLOCK' : ''}
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] chrome-text mb-6">
            GOOD VIBES.
            <br />
            REAL SERVICE.
          </h2>
          <p className="text-sm sm:text-base text-[#D0D0D0] max-w-xl mx-auto mb-8">
            No generic templates. No gimmicks. Just authentic Dallas street-culture retail built for
            adult enthusiasts who value knowledgeable service.
          </p>
          <button
            type="button"
            onClick={() => navigate('brands')}
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#F2C916] text-[#F2C916] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#F2C916] hover:text-[#090909] transition-colors"
          >
            <span>Discover Our Brands</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ====================================================================
          SECTION 06: MEET 4835 (PHYSICAL BUSINESS INTRO)
         ==================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#222222] bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetric Stacked Retail Photography (Illustrative References per Command 18) */}
          <div className="lg:col-span-6 relative">
            <div className="w-10/12 border border-[#303030] bg-[#141414] p-2">
              <img
                src={EDITORIAL_IMAGES.retailInteriorA}
                alt="Illustrative modern retail interior atmosphere"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover grayscale contrast-110"
              />
            </div>
            <div className="w-7/12 ml-auto -mt-20 relative z-10 border-2 border-[#F2C916] bg-[#090909] p-2 shadow-2xl">
              <img
                src={EDITORIAL_IMAGES.retailInteriorB}
                alt="Illustrative curated retail shelf environment"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <p className="mt-3 text-[10px] font-mono text-[#777777] uppercase tracking-wider">
              * Illustrative retail-atmosphere photography; official in-store photography coming soon.
            </p>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs font-mono text-[#F2C916] tracking-[0.24em] uppercase mb-3">
              06 // MEET 4835
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
              A Real Dallas Retail Destination
            </h2>
            <p className="text-base text-[#D0D0D0] leading-relaxed mb-5">
              4835 Smoke &amp; Vape is a physical e-cigarette and smoke-shop retail business rooted
              in Dallas, Texas. Our digital platform is designed to mirror the clarity, atmosphere,
              and straight-up customer service you get when you walk through our doors.
            </p>
            <p className="text-sm text-[#A0A0A0] leading-relaxed mb-8">
              Whether you are browsing hardware specs online before visiting or discovering new
              verified collections in person, our focus stays simple: organized selection, clear
              information, and full compliance with Texas and federal age-restriction laws.
            </p>
            <button
              type="button"
              onClick={() => navigate('about')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#090909] font-black text-xs uppercase tracking-[0.18em] hover:bg-[#F2C916] transition-colors"
            >
              <span>Read About 4835</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 07: THE DESTINATION (PHYSICAL STORE LOCATION & MAP)
         ==================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#222222] bg-[#090909]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-mono text-[#F2C916] tracking-[0.24em] uppercase mb-2">
              07 // THE DESTINATION
            </p>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Find Us In Dallas, TX
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-[#101010] border border-[#242424] p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#F2C916] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-1">
                      Store Address
                    </h3>
                    <p className="text-sm font-bold text-white">{BUSINESS_INFO.cityState}</p>
                    <p className="text-xs font-mono text-[#999999] mt-1">
                      {BUSINESS_INFO.streetAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#F2C916] shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-2">
                      Opening Hours
                    </h3>
                    <div className="space-y-1.5 text-xs">
                      {BUSINESS_INFO.hours.map((h) => (
                        <div key={h.day} className="flex justify-between text-[#D0D0D0] gap-4">
                          <span>{h.day}</span>
                          <span className="font-mono text-[#999999]">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#F2C916] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-1">
                      Telephone
                    </h3>
                    <p className="text-xs font-mono text-[#D0D0D0]">{BUSINESS_INFO.phone}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.16em] hover:bg-white transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigate('visit')}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-5 border border-[#303030] text-white font-bold text-xs uppercase tracking-[0.16em] hover:border-[#F2C916] hover:text-[#F2C916] transition-colors"
                >
                  <span>Full Store Info</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#242424] bg-[#141414] min-h-[340px] relative overflow-hidden">
              <iframe
                title="4835 Smoke & Vape Dallas Area Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-96.86%2C32.74%2C-96.74%2C32.82&layer=mapnik"
                className="w-full h-full min-h-[340px] grayscale invert contrast-125 opacity-80"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-[#090909]/90 border border-[#303030] px-3 py-1.5 text-[10px] font-mono text-[#F2C916] uppercase tracking-wider">
                Dallas, TX — Exact Pin Updates Upon Address Confirmation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 08: THE CLOSING STATEMENT
         ==================================================================== */}
      <section className="py-20 lg:py-28 bg-[#0B0B0B] border-b border-[#222222] text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.26em] text-[#F2C916] mb-3">
            08 // THE CLOSING STATEMENT
          </p>
          <div className="text-7xl sm:text-9xl font-black tracking-tighter chrome-text leading-none mb-4">
            4835
          </div>
          <p className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-8">
            {BUSINESS_INFO.tagline}
          </p>
          <button
            type="button"
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            <span>Shop The 4835 Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// 7. DEDICATED PAGES (BRANDS, PRODUCT DETAIL, ABOUT, VISIT, CART, ACCOUNT, LEGAL)
// ============================================================================

function BrandDirectoryPage({ navigate }) {
  const [activeLetter, setActiveLetter] = useState('ALL');
  const letters = ['ALL', ...new Set(BRANDS.map((b) => b.letter))];
  const visibleBrands =
    activeLetter === 'ALL' ? BRANDS : BRANDS.filter((b) => b.letter === activeLetter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-2">
        4835 BRAND DIRECTORY
      </p>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight chrome-text mb-4">
        Browse By Brand
      </h1>
      <p className="text-sm text-[#BDBDBD] max-w-2xl mb-8">
        Select any sample brand collection below to explore its eligible catalog items. Live
        authorized brand partnerships are added strictly upon owner inventory verification.
      </p>

      {/* Alphabetical Navigation */}
      <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-[#242424]">
        {letters.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setActiveLetter(l)}
            className={`px-4 py-2 text-xs font-black uppercase border transition-colors ${
              activeLetter === l
                ? 'bg-[#F2C916] text-[#090909] border-[#F2C916]'
                : 'bg-[#111111] text-[#D0D0D0] border-[#2A2A2A] hover:border-white'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleBrands.map((brand) => {
          const count = SAMPLE_PRODUCTS.filter((p) => p.brandId === brand.id).length;
          return (
            <button
              key={brand.id}
              type="button"
              onClick={() => navigate('brand', { id: brand.id })}
              className="group text-left p-6 bg-[#101010] border border-[#242424] hover:border-[#F2C916] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 bg-[#1B1B1B] border border-[#303030] text-[#F2C916] font-black text-lg flex items-center justify-center">
                    {brand.letter}
                  </span>
                  <span className="text-[11px] font-mono text-[#999999]">
                    {count} {count === 1 ? 'Sample Item' : 'Sample Items'}
                  </span>
                </div>
                <h2 className="text-xl font-black uppercase text-white group-hover:text-[#F2C916] transition-colors mb-2">
                  {brand.name}
                </h2>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">{brand.tagline}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1F1F1F] inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white group-hover:text-[#F2C916]">
                <span>View Brand Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductDetailPage({ productId, navigate, onAddToCart }) {
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Breadcrumbs back to Shop, Category & Brand (Command 13) */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#999999] mb-8">
        <button type="button" onClick={() => navigate('shop')} className="hover:text-[#F2C916]">
          Shop
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => navigate('category', { id: product.categoryId })}
          className="hover:text-[#F2C916]"
        >
          {product.categoryName}
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => navigate('brand', { id: product.brandId })}
          className="hover:text-[#F2C916]"
        >
          {product.brandName}
        </button>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Large Visual */}
        <div className="lg:col-span-6">
          <ProductVisual product={product} large />
        </div>

        {/* Clean Information Organization */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <button
                type="button"
                onClick={() => navigate('brand', { id: product.brandId })}
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] hover:underline"
              >
                {product.brandName}
              </button>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] bg-[#1E1E1E] border border-[#303030] text-white">
                {product.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#242424]">
              <span className="text-3xl font-black text-[#F2C916]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-[#888888] uppercase">
                Sample Prototype Price • SKU: {product.sku}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#D0D0D0] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Purchase / Cart Interaction */}
            <div className="p-5 bg-[#111111] border border-[#262626] mb-8">
              {product.available ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="inline-flex items-center border border-[#303030] bg-[#090909]">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="p-3.5 text-[#D0D0D0] hover:text-[#F2C916]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-mono font-bold text-white">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="p-3.5 text-[#D0D0D0] hover:text-[#F2C916]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 py-3.5 px-6 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    {addedFeedback ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Sample to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-xs font-mono text-[#A0A0A0] uppercase tracking-wider">
                  Status: <strong className="text-white">{product.status}</strong> — Not currently
                  eligible to add to cart.
                </div>
              )}

              <p className="mt-4 text-[11px] font-mono text-[#888888] leading-relaxed">
                Notice: Live online payment &amp; shipping are disabled pending Texas &amp; federal
                compliance review. 21+ government ID verification required in-store.
              </p>
            </div>

            {/* Verified Specifications Table */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-3">
                Specifications (Sample Prototype Data)
              </h2>
              <div className="border border-[#242424] divide-y divide-[#222222]">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="px-4 py-3 flex items-center justify-between text-xs bg-[#0D0D0D]"
                  >
                    <span className="font-mono text-[#999999] uppercase">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-3">
        ABOUT 4835 SMOKE &amp; VAPE
      </p>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight chrome-text mb-6">
        4835 Street Culture. Real Dallas Retail.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-7 bg-[#101010] border border-[#242424]">
          <h2 className="text-lg font-black uppercase text-[#F2C916] mb-3">Our Identity</h2>
          <p className="text-sm text-[#D0D0D0] leading-relaxed">
            4835 Smoke &amp; Vape is a physical e-cigarette and smoke-shop retail business in
            Dallas, Texas. Built around the motto{' '}
            <strong className="text-white">YOUR VIBE. YOUR WAY.</strong> and{' '}
            <strong className="text-white">GOOD VIBES. REAL SERVICE.</strong>, our focus is
            delivering a distinctive retail atmosphere paired with clear, organized product
            discovery.
          </p>
        </div>

        <div className="p-7 bg-[#101010] border border-[#242424]">
          <h2 className="text-lg font-black uppercase text-[#F2C916] mb-3">
            Compliance &amp; Responsibility
          </h2>
          <p className="text-sm text-[#D0D0D0] leading-relaxed">
            We operate strictly as a 21+ adult retail destination. Every product category, brand
            listing, and retail channel is structured to comply with applicable FDA regulations,
            federal age restrictions, and Texas statutes including SB 2024, SB 1313, and SB 1316.
          </p>
        </div>
      </div>

      <div className="p-8 bg-[#121212] border-l-4 border-[#F2C916] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black uppercase text-white mb-1">
            Ready to Browse the Catalog?
          </h3>
          <p className="text-sm text-[#A0A0A0]">
            Explore our structured categories or plan your visit to our Dallas store.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('shop')}
            className="px-6 py-3 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.16em] hover:bg-white transition-colors"
          >
            Explore Shop
          </button>
          <button
            type="button"
            onClick={() => navigate('visit')}
            className="px-6 py-3 border border-[#303030] text-white font-bold text-xs uppercase tracking-[0.16em] hover:border-[#F2C916]"
          >
            Visit Us
          </button>
        </div>
      </div>
    </div>
  );
}

function VisitUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-2">
        PHYSICAL RETAIL LOCATION
      </p>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight chrome-text mb-4">
        Visit 4835 Smoke &amp; Vape
      </h1>
      <p className="text-sm text-[#BDBDBD] max-w-2xl mb-10">
        Located in Dallas, Texas. Unverified street, suite, telephone, and daily hours are
        intentionally marked as placeholders until confirmed by the business owner.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 bg-[#101010] border border-[#242424]">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-2">
              Address
            </h2>
            <p className="text-base font-bold text-white">{BUSINESS_INFO.cityState}</p>
            <p className="text-xs font-mono text-[#A0A0A0] mt-1">{BUSINESS_INFO.streetAddress}</p>
          </div>

          <div className="p-6 bg-[#101010] border border-[#242424]">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-3">
              Store Hours
            </h2>
            <div className="space-y-2 text-xs">
              {BUSINESS_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-[#D0D0D0]">
                  <span>{h.day}</span>
                  <span className="font-mono text-[#999999]">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-[#101010] border border-[#242424]">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-2">
              Phone &amp; In-Store Verification
            </h2>
            <p className="text-xs font-mono text-[#D0D0D0] mb-3">{BUSINESS_INFO.phone}</p>
            <p className="text-xs text-[#999999] leading-relaxed">
              All in-store visitors purchasing age-restricted merchandise must present a valid
              government-issued photo ID verifying age 21+.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 border border-[#242424] bg-[#141414] min-h-[420px] relative">
          <iframe
            title="Dallas TX Store Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-96.86%2C32.74%2C-96.74%2C32.82&layer=mapnik"
            className="w-full h-full min-h-[420px] grayscale invert contrast-125 opacity-80"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Functional Shopping Cart & Disabled Checkout Architecture (Commands 14 & 16)
 */
function CartPage({ cart, onUpdateQty, onRemoveItem, onClearCart, navigate }) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-12 h-12 text-[#F2C916] mx-auto mb-5 opacity-80" />
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#F2C916] mb-2">
          YOUR BAG IS EMPTY
        </p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white mb-4">
          No Items in Your Cart
        </h1>
        <p className="text-sm text-[#A0A0A0] mb-8">
          Browse our sample catalog to test adding items, adjusting quantities, and reviewing the
          checkout architecture.
        </p>
        <button
          type="button"
          onClick={() => navigate('shop')}
          className="px-8 py-4 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
        >
          Explore the Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-4 border-b border-[#242424]">
        <div>
          <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.22em] mb-1">
            SHOPPING CART
          </p>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white">
            Your Selection ({cart.reduce((s, i) => s + i.qty, 0)})
          </h1>
        </div>
        <button
          type="button"
          onClick={onClearCart}
          className="text-xs font-mono text-[#999999] hover:text-[#F2C916] uppercase tracking-wider"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Line Items */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map(({ product, qty }) => (
            <div
              key={product.id}
              className="p-4 bg-[#101010] border border-[#242424] flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <div className="w-24 shrink-0">
                <ProductVisual product={product} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono text-[#F2C916] uppercase">{product.brandName}</p>
                <button
                  type="button"
                  onClick={() => navigate('product', { id: product.id })}
                  className="text-left text-base font-bold text-white hover:text-[#F2C916]"
                >
                  {product.name}
                </button>
                <p className="text-xs font-mono text-[#888888] mt-1">
                  ${product.price.toFixed(2)} each • {product.color}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="inline-flex items-center border border-[#303030] bg-[#090909]">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, qty - 1)}
                    className="p-2 text-[#D0D0D0] hover:text-[#F2C916]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center font-mono text-xs text-white">{qty}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, qty + 1)}
                    className="p-2 text-[#D0D0D0] hover:text-[#F2C916]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[74px]">
                  <div className="text-sm font-black text-white">
                    ${(product.price * qty).toFixed(2)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(product.id)}
                  className="p-2 text-[#777777] hover:text-red-400 transition-colors"
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Compliance-Gated Checkout Architecture (Command 16) */}
        <div className="lg:col-span-5">
          <div className="p-6 bg-[#101010] border border-[#262626] sticky top-28">
            <h2 className="text-lg font-black uppercase text-white pb-4 mb-4 border-b border-[#242424]">
              Order Summary &amp; Checkout Readiness
            </h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-[#D0D0D0]">
                <span>Sample Subtotal</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#999999] text-xs font-mono">
                <span>Texas Retail Tax / Excise</span>
                <span>Calculated upon live activation</span>
              </div>
              <div className="flex justify-between text-[#999999] text-xs font-mono">
                <span>Shipping / Delivery</span>
                <span>Disabled pending legal review</span>
              </div>
              <div className="pt-3 border-t border-[#242424] flex justify-between text-lg font-black text-white">
                <span>Estimated Sample Total</span>
                <span className="text-[#F2C916]">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Required Verification Architecture Checklist */}
            <div className="p-4 bg-[#17150C] border border-[#F2C916]/50 mb-6">
              <div className="flex items-start gap-2.5 mb-2">
                <Lock className="w-4 h-4 text-[#F2C916] shrink-0 mt-0.5" />
                <p className="text-xs font-black uppercase tracking-wider text-[#F2C916]">
                  Online Transactions Intentionally Disabled
                </p>
              </div>
              <p className="text-xs text-[#D0D0D0] leading-relaxed mb-3">
                Per 4835 compliance policy, live payment processing, online ordering, shipping, and
                delivery remain locked until the business owner verifies:
              </p>
              <ul className="space-y-1.5 text-[11px] font-mono text-[#CCCCCC]">
                <li>• Texas SB 2024, SB 1313 &amp; SB 1316 product eligibility</li>
                <li>• Third-party legal 21+ age-verification provider integration</li>
                <li>• Federal PACT Act / carrier compliance for any shipped goods</li>
              </ul>
            </div>

            <button
              type="button"
              disabled
              className="w-full py-4 bg-[#262626] text-[#777777] font-black text-xs uppercase tracking-[0.18em] cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Checkout Disabled (Pending Legal Review)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('visit')}
              className="w-full mt-3 py-3.5 border border-[#F2C916] text-[#F2C916] font-black text-xs uppercase tracking-[0.16em] hover:bg-[#F2C916] hover:text-[#090909] transition-colors"
            >
              Visit Our Dallas Store Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Customer Account Interface with Honest Backend Integration Notice (Command 15)
 */
function AccountPage() {
  const [tab, setTab] = useState('signin'); // 'signin' | 'register' | 'forgot' | 'profile'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setFeedback({
        type: 'error',
        msg: 'Please enter a valid email format to test client-side validation.'
      });
      return;
    }
    if (tab !== 'forgot' && password.length < 8) {
      setFeedback({
        type: 'error',
        msg: 'Password must be at least 8 characters. (No credentials are stored in this prototype.)'
      });
      return;
    }
    setFeedback({
      type: 'info',
      msg: 'Form validation passed. Live authentication backend is required before real customer accounts or passwords can be processed. No personal data was submitted or stored.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-2">
        CUSTOMER ACCOUNT
      </p>
      <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight chrome-text mb-4">
        4835 Member Access
      </h1>

      {/* Security & Backend Integration Banner (Command 15) */}
      <div className="p-4 bg-[#141414] border-l-4 border-[#F2C916] mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#F2C916] shrink-0 mt-0.5" />
        <p className="text-xs text-[#D0D0D0] leading-relaxed">
          <strong className="text-white uppercase">Authentication Backend Required:</strong> This
          demonstration interface validates inputs locally and never stores passwords or collects
          real customer data. Connect an encrypted auth service (e.g., Auth0, Supabase, or Shopify
          Customer Accounts) before production launch.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#242424] pb-4">
        {[
          { id: 'signin', label: 'Sign In' },
          { id: 'register', label: 'Register' },
          { id: 'forgot', label: 'Forgot Password' },
          { id: 'profile', label: 'Profile & Orders Preview' }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setFeedback(null);
            }}
            className={`px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] border transition-colors ${
              tab === t.id
                ? 'bg-[#F2C916] text-[#090909] border-[#F2C916]'
                : 'bg-[#101010] text-[#D0D0D0] border-[#262626] hover:border-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#101010] border border-[#242424]">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#F2C916] mb-4">
              Account Profile Structure
            </h2>
            <div className="space-y-3 text-xs font-mono text-[#CCCCCC]">
              <div className="flex justify-between py-2 border-b border-[#1E1E1E]">
                <span className="text-[#888888]">Status</span>
                <span>Not Signed In (Backend Required)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1E1E1E]">
                <span className="text-[#888888]">21+ Age Verification</span>
                <span>Pending Third-Party Integration</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#888888]">Preferred Store</span>
                <span>4835 Smoke &amp; Vape — Dallas, TX</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#101010] border border-[#242424]">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#F2C916] mb-4">
              Order History
            </h2>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              Verified order history will display here once the live ordering system and customer
              authentication backend are connected and legally approved.
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg p-7 bg-[#101010] border border-[#242424] space-y-5"
          noValidate
        >
          {tab === 'register' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#D0D0D0] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sample Name (Do not enter real info)"
                className="w-full px-4 py-3 bg-[#090909] border border-[#303030] text-sm text-white focus:outline-none focus:border-[#F2C916]"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#D0D0D0] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-[#090909] border border-[#303030] text-sm text-white focus:outline-none focus:border-[#F2C916]"
            />
          </div>

          {tab !== 'forgot' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#D0D0D0] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 pr-11 bg-[#090909] border border-[#303030] text-sm text-white focus:outline-none focus:border-[#F2C916]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {feedback && (
            <div
              className={`p-3.5 text-xs leading-relaxed border ${
                feedback.type === 'error'
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-[#17150C] border-[#F2C916]/60 text-[#F2C916]'
              }`}
            >
              {feedback.msg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.18em] hover:bg-white transition-colors"
          >
            {tab === 'signin'
              ? 'Test Sign-In Validation'
              : tab === 'register'
              ? 'Test Registration Validation'
              : 'Test Password Reset Flow'}
          </button>
        </form>
      )}
    </div>
  );
}

/**
 * Policy Pages: Privacy Policy, Terms & Conditions, Retail & Legal Compliance (Commands 17 & 22)
 */
function PolicyPage({ type }) {
  const content = {
    privacy: {
      eyebrow: 'LEGAL DOCUMENTATION',
      title: 'Privacy Policy',
      sections: [
        {
          heading: '1. Prototype & Data Minimization',
          body: '4835 Smoke & Vape respects visitor privacy. In this development prototype, no personal information, payment details, or authentication credentials are transmitted to external servers. Shopping cart selections are stored locally in your browser session.'
        },
        {
          heading: '2. Future Production Data Collection',
          body: 'Prior to activating live customer accounts or age-verification services, this policy will be reviewed by legal counsel and updated with specific disclosures regarding third-party identity verification providers, cookie preferences, and Texas Data Privacy and Security Act (TDPSA) rights.'
        }
      ]
    },
    terms: {
      eyebrow: 'LEGAL DOCUMENTATION',
      title: 'Terms and Conditions',
      sections: [
        {
          heading: '1. Adult-Only Access (21+)',
          body: 'This website is intended solely for adults aged 21 years and older in compliance with federal law and Texas state statutes. By accessing this site, you confirm that you are of legal age to view tobacco and e-cigarette retail information.'
        },
        {
          heading: '2. Sample Catalog & Non-Transactional Status',
          body: 'Product listings displayed in this prototype are sample entries for layout and functionality demonstration. Live pricing, inventory availability, and online purchasing remain disabled pending owner verification and legal compliance review.'
        },
        {
          heading: '3. No Health or Cessation Claims',
          body: '4835 Smoke & Vape makes no medical, health, or smoking-cessation claims regarding any hardware, e-liquid, or accessory displayed on this website.'
        }
      ]
    },
    legal: {
      eyebrow: 'TEXAS & FEDERAL RETAIL COMPLIANCE',
      title: 'Retail & Legal Compliance Policies',
      sections: [
        {
          heading: 'Texas Senate Bill 2024, SB 1313 & SB 1316',
          body: '4835 Smoke & Vape operates in Dallas, Texas and structures its product catalog and marketing strictly around applicable Texas legislation—including restrictions on product eligibility, packaging, advertising, and marketing that could appeal to minors.'
        },
        {
          heading: 'FDA & Federal 21+ Age Restrictions',
          body: 'Only products whose legal eligibility for sale and advertising has been verified will be published in live inventory. An on-screen age notice is never treated as sufficient legal age verification; formal government-issued photo ID verification in-store (and certified third-party age verification if online channels are ever legally enabled) is mandatory.'
        },
        {
          heading: 'Editable Compliance Governance',
          body: 'All compliance statements, product eligibility flags, and store disclosures are maintained in an editable configuration subject to ongoing business-owner and legal-counsel review.'
        }
      ]
    }
  }[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-2">
        {content.eyebrow}
      </p>
      <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight chrome-text mb-8">
        {content.title}
      </h1>
      <div className="space-y-6">
        {content.sections.map((s) => (
          <section key={s.heading} className="p-6 bg-[#101010] border border-[#242424]">
            <h2 className="text-base font-black uppercase text-white mb-2">{s.heading}</h2>
            <p className="text-sm text-[#CCCCCC] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 8. CUSTOM GLOBAL FOOTER
// ============================================================================

function Footer({ navigate }) {
  return (
    <footer className="bg-[#070707] text-[#D0D0D0] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#202020]">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="4835 Smoke & Vape Official Logo"
                className="h-12 w-auto object-contain"
              />
              <div>
                <div className="text-base font-black text-white tracking-[0.14em]">
                  4835 SMOKE &amp; VAPE
                </div>
                <div className="text-[11px] font-mono text-[#F2C916] tracking-[0.16em]">
                  {BUSINESS_INFO.tagline}
                </div>
              </div>
            </div>
            <p className="text-xs text-[#999999] leading-relaxed mb-4">
              {BUSINESS_INFO.secondaryMessage} — Dallas, Texas retail destination for 21+ adult
              smoke &amp; vape hardware and essentials.
            </p>
            <p className="text-[11px] font-mono text-[#777777]">
              WARNING: Nicotine is an addictive chemical. Strictly 21+ only.
            </p>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button type="button" onClick={() => navigate('shop')} className="hover:text-white">
                  All Products
                </button>
              </li>
              {CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => navigate('category', { id: c.id })}
                    className="hover:text-white"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-4">
              The 4835 Block
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button type="button" onClick={() => navigate('brands')} className="hover:text-white">
                  Brand Directory
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('about')} className="hover:text-white">
                  About 4835
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('visit')} className="hover:text-white">
                  Visit Us (Dallas, TX)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('account')} className="hover:text-white">
                  Customer Account
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('cart')} className="hover:text-white">
                  Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2C916] mb-4">
              Policies &amp; Compliance
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button type="button" onClick={() => navigate('legal')} className="hover:text-white">
                  Retail &amp; Legal Compliance (TX / FDA)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('privacy')} className="hover:text-white">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('terms')} className="hover:text-white">
                  Terms and Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#777777]">
          <span>© {new Date().getFullYear()} 4835 Smoke &amp; Vape • Dallas, Texas.</span>
          <span>21+ Adult Retail • Prototype Sample Catalog Active</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// 9. MAIN APPLICATION ROOT
// ============================================================================

export default function App() {
  const [route, setRoute] = useState({ page: 'home', params: {} });
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonalEnabled, setSeasonalEnabled] = useState(true);
  const [holidayPopupOpen, setHolidayPopupOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Persistent Shopping Cart (Command 14)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('4835_sample_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('4835_sample_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  // Show Christmas seasonal popup once per session when seasonal mode is enabled (Command 19)
  useEffect(() => {
    if (!seasonalEnabled) return;
    try {
      const dismissed = sessionStorage.getItem('4835_holiday_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setHolidayPopupOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, [seasonalEnabled]);

  const dismissHolidayPopup = () => {
    setHolidayPopupOpen(false);
    try {
      sessionStorage.setItem('4835_holiday_dismissed', 'true');
    } catch {
      // Ignore
    }
  };

  const navigate = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleAddToCart = (product, quantity = 1) => {
    if (!product.available) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [...prev, { product, qty: quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const handleUpdateQty = (productId, nextQty) => {
    if (nextQty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty: nextQty } : i))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // Render active page via switch/case
  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            navigate={navigate}
            onViewProduct={(id) => navigate('product', { id })}
            onAddToCart={handleAddToCart}
            seasonalEnabled={seasonalEnabled}
          />
        );

      case 'shop':
        return (
          <div>
            <div className="bg-[#0D0D0D] border-b border-[#222222] py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-2">
                  THE 4835 CATALOG
                </p>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight chrome-text">
                  Shop All Products
                </h1>
              </div>
            </div>
            <ShopCatalogView
              initialCollection={route.params?.collection}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onViewProduct={(id) => navigate('product', { id })}
              onAddToCart={handleAddToCart}
              navigate={navigate}
            />
          </div>
        );

      case 'category': {
        const cat = CATEGORIES.find((c) => c.id === route.params?.id) || CATEGORIES[0];
        return (
          <div>
            <div className="relative bg-[#0D0D0D] border-b border-[#222222] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
              />
              <div className="relative z-10 max-w-7xl mx-auto">
                <p className="text-xs font-mono text-[#F2C916] uppercase tracking-[0.24em] mb-2">
                  CATEGORY INDEX {cat.indexNum}
                </p>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-3">
                  {cat.name}
                </h1>
                <p className="text-sm sm:text-base text-[#D0D0D0] max-w-2xl">{cat.shortDesc}</p>
              </div>
            </div>
            <ShopCatalogView
              lockedCategoryId={cat.id}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onViewProduct={(id) => navigate('product', { id })}
              onAddToCart={handleAddToCart}
              navigate={navigate}
            />
          </div>
        );
      }

      case 'brands':
        return <BrandDirectoryPage navigate={navigate} />;

      case 'brand': {
        const brand = BRANDS.find((b) => b.id === route.params?.id) || BRANDS[0];
        return (
          <div>
            <div className="bg-[#0D0D0D] border-b border-[#222222] py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  type="button"
                  onClick={() => navigate('brands')}
                  className="text-xs font-mono text-[#F2C916] uppercase tracking-wider hover:underline mb-3 inline-block"
                >
                  ← Back to Brand Directory
                </button>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight chrome-text mb-2">
                  {brand.name}
                </h1>
                <p className="text-sm text-[#BDBDBD]">{brand.tagline}</p>
              </div>
            </div>
            <ShopCatalogView
              lockedBrandId={brand.id}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onViewProduct={(id) => navigate('product', { id })}
              onAddToCart={handleAddToCart}
              navigate={navigate}
            />
          </div>
        );
      }

      case 'product':
        return (
          <ProductDetailPage
            productId={route.params?.id}
            navigate={navigate}
            onAddToCart={handleAddToCart}
          />
        );

      case 'about':
        return <AboutPage navigate={navigate} />;

      case 'visit':
        return <VisitUsPage />;

      case 'cart':
        return (
          <CartPage
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={() => setCart([])}
            navigate={navigate}
          />
        );

      case 'account':
        return <AccountPage />;

      case 'privacy':
        return <PolicyPage type="privacy" />;

      case 'terms':
        return <PolicyPage type="terms" />;

      case 'legal':
        return <PolicyPage type="legal" />;

      default:
        return (
          <HomePage
            navigate={navigate}
            onViewProduct={(id) => navigate('product', { id })}
            onAddToCart={handleAddToCart}
            seasonalEnabled={seasonalEnabled}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white font-sans selection:bg-[#F2C916] selection:text-[#090909] flex flex-col">
      {/* Global 4835 Chrome Typography, Motion & Industrial Styling */}
      <style>{`
        .chrome-text {
          background: linear-gradient(180deg, #FFFFFF 0%, #D0D0D0 48%, #777777 52%, #EAEAEA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 14s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn, .animate-spin-slow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Subtle Seasonal Falling Snow */}
      <SnowfallCanvas enabled={seasonalEnabled} />

      {/* Christmas Seasonal Popup */}
      <ChristmasPopup
        open={seasonalEnabled && holidayPopupOpen}
        onDismiss={dismissHolidayPopup}
        onExploreShop={() => navigate('shop')}
      />

      {/* Global Header */}
      <Header
        currentRoute={route}
        navigate={navigate}
        cartCount={cartCount}
        seasonalEnabled={seasonalEnabled}
        onToggleSeasonal={() => setSeasonalEnabled((s) => !s)}
        onOpenHolidayPopup={() => setHolidayPopupOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <main className="flex-1">{renderPage()}</main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Non-intrusive Cart Feedback Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 px-5 py-3.5 bg-[#F2C916] text-[#090909] font-black text-xs uppercase tracking-[0.14em] shadow-2xl flex items-center gap-2 animate-fadeIn"
        >
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
