#!/usr/bin/env node

/**
 * أداة تحسين الصور لموقع نورث وست باص
 * Northwest Bus Image Optimization Tool
 */

const fs = require('fs');
const path = require('path');

// قائمة الصور التي تحتاج تحسين
const imagesToOptimize = [
    'images/1980x1090-en-1 (1).webp',
    'images/225A9478 (1).jpg',
    'images/225A9481-1 (1).webp',
    'images/yellowvipbus (1).webp',
    'images/Website_2M_AR_740x1920px (1).png',
    'images/Summer-Sale_AR_Popup_450x650 (1).png',
    'images/Screenshot-2025-07-30-130400 (1).png',
    'images/WhatsApp-Image-2025-06-30-at-12.55.34-PM-1 (1).jpeg'
];

// إعدادات التحسين
const optimizationSettings = {
    // إعدادات WebP
    webp: {
        quality: 85,
        method: 6,
        lossless: false
    },
    
    // إعدادات JPEG
    jpeg: {
        quality: 85,
        progressive: true,
        mozjpeg: true
    },
    
    // إعدادات PNG
    png: {
        quality: 90,
        speed: 1,
        strip: true
    },
    
    // أحجام الصور المطلوبة
    sizes: [
        { width: 1920, height: 1080, suffix: '_large' },
        { width: 1280, height: 720, suffix: '_medium' },
        { width: 640, height: 360, suffix: '_small' },
        { width: 320, height: 180, suffix: '_thumbnail' }
    ]
};

// وظيفة فحص وجود الصور
function checkImagesExist() {
    console.log('🔍 فحص وجود الصور...');
    
    const missingImages = [];
    const existingImages = [];
    
    imagesToOptimize.forEach(imagePath => {
        if (fs.existsSync(imagePath)) {
            existingImages.push(imagePath);
            console.log(`✅ ${imagePath}`);
        } else {
            missingImages.push(imagePath);
            console.log(`❌ ${imagePath} - غير موجود`);
        }
    });
    
    console.log(`\n📊 النتائج:`);
    console.log(`✅ موجود: ${existingImages.length}`);
    console.log(`❌ مفقود: ${missingImages.length}`);
    
    return { existingImages, missingImages };
}

// وظيفة إنشاء srcset للصور
function generateSrcset(imagePath) {
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const extension = path.extname(imagePath);
    
    let srcset = '';
    optimizationSettings.sizes.forEach((size, index) => {
        const newPath = `images/${baseName}${size.suffix}${extension}`;
        srcset += `${newPath} ${size.width}w`;
        if (index < optimizationSettings.sizes.length - 1) {
            srcset += ', ';
        }
    });
    
    return srcset;
}

// وظيفة إنشاء HTML محسن للصور
function generateOptimizedImageHTML(imagePath) {
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const extension = path.extname(imagePath);
    const alt = baseName.replace(/[_-]/g, ' ').replace(/\([^)]*\)/g, '').trim();
    
    const srcset = generateSrcset(imagePath);
    
    return `
<!-- صورة محسنة: ${baseName} -->
<picture>
    <source media="(min-width: 1280px)" srcset="images/${baseName}_large${extension}">
    <source media="(min-width: 640px)" srcset="images/${baseName}_medium${extension}">
    <source media="(min-width: 320px)" srcset="images/${baseName}_small${extension}">
    <img 
        src="images/${baseName}_medium${extension}" 
        srcset="${srcset}"
        sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        style="width: 100%; height: auto;"
    >
</picture>`;
}

// وظيفة إنشاء تقرير التحسين
function generateOptimizationReport() {
    const report = `
# تقرير تحسين الصور - نورث وست باص
# Image Optimization Report - Northwest Bus

## 📊 إحصائيات الصور
- إجمالي الصور: ${imagesToOptimize.length}
- الصور الموجودة: ${imagesToOptimize.filter(img => fs.existsSync(img)).length}
- الصور المفقودة: ${imagesToOptimize.filter(img => !fs.existsSync(img)).length}

## 🎯 توصيات التحسين

### 1. تحويل الصور إلى WebP
- توفير 25-35% من حجم الملف
- دعم أفضل للمتصفحات الحديثة
- جودة عالية مع حجم أقل

### 2. إنشاء أحجام متعددة
- 1920x1080 للشاشات الكبيرة
- 1280x720 للشاشات المتوسطة  
- 640x360 للشاشات الصغيرة
- 320x180 للصور المصغرة

### 3. استخدام lazy loading
- تحميل الصور عند الحاجة فقط
- تحسين سرعة تحميل الصفحة
- توفير البيانات للمستخدمين

### 4. إضافة srcset
- اختيار الصورة المناسبة للشاشة
- تحسين الأداء على الأجهزة المختلفة
- تجربة مستخدم أفضل

## 🛠️ الأوامر المطلوبة

### تحويل إلى WebP
\`\`\`bash
# تثبيت أداة cwebp
npm install -g webp

# تحويل الصور
cwebp -q 85 -m 6 images/input.jpg -o images/output.webp
\`\`\`

### تحسين JPEG
\`\`\`bash
# تثبيت أداة jpegoptim
npm install -g jpegoptim

# تحسين الصور
jpegoptim --max=85 --progressive images/*.jpg
\`\`\`

### تحسين PNG
\`\`\`bash
# تثبيت أداة pngquant
npm install -g pngquant

# تحسين الصور
pngquant --quality=85-90 images/*.png
\`\`\`

## 📱 PWA Optimization
- استخدام Service Worker للتخزين المؤقت
- تحميل الصور في الخلفية
- دعم الوضع offline

## 🔍 SEO Optimization
- إضافة alt text وصفية
- استخدام structured data للصور
- تحسين Core Web Vitals

---
تم إنشاء هذا التقرير تلقائياً بواسطة أداة تحسين الصور
Generated automatically by Image Optimization Tool
`;

    fs.writeFileSync('image-optimization-report.md', report);
    console.log('📄 تم إنشاء تقرير التحسين: image-optimization-report.md');
}

// تشغيل الفحص
console.log('🚀 بدء فحص وتحسين الصور...\n');

const { existingImages, missingImages } = checkImagesExist();

if (existingImages.length > 0) {
    console.log('\n🖼️ HTML محسن للصور الموجودة:');
    console.log('================================');
    
    existingImages.forEach(imagePath => {
        console.log(generateOptimizedImageHTML(imagePath));
        console.log('\n---\n');
    });
}

// إنشاء التقرير
generateOptimizationReport();

console.log('\n✅ تم الانتهاء من فحص الصور!');
console.log('📋 راجع تقرير التحسين للمزيد من التفاصيل.');

// تصدير النتائج
module.exports = {
    imagesToOptimize,
    optimizationSettings,
    checkImagesExist,
    generateSrcset,
    generateOptimizedImageHTML
};
