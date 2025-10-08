// Northwest Bus Website - Main JavaScript
// Version: 1.0.0

// معالجة الأخطاء العامة
window.addEventListener('error', function(event) {
    console.error('خطأ JavaScript:', event.error);
    
    // إرسال تقرير الخطأ إلى Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': event.error.message,
            'fatal': false
        });
    }
});

// معالجة الأخطاء غير المعالجة
window.addEventListener('unhandledrejection', function(event) {
    console.error('خطأ Promise غير معالج:', event.reason);
    
    // إرسال تقرير الخطأ إلى Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': event.reason.toString(),
            'fatal': false
        });
    }
});

// وظيفة عرض رسائل الخطأ
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle" style="font-size: 1.2rem;"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// وظيفة فحص الاتصال بالإنترنت
function checkInternetConnection() {
    if (!navigator.onLine) {
        showErrorMessage('لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال.');
        return false;
    }
    return true;
}

// مراقبة حالة الاتصال
window.addEventListener('online', function() {
    if (typeof showSuccessMessage !== 'undefined') {
        showSuccessMessage('تم استعادة الاتصال بالإنترنت!');
    }
});

window.addEventListener('offline', function() {
    showErrorMessage('فقدان الاتصال بالإنترنت. بعض الميزات قد لا تعمل.');
});

// وظيفة فحص دعم المتصفح
function checkBrowserSupport() {
    const isOldBrowser = !window.fetch || !window.Promise || !window.localStorage;
    
    if (isOldBrowser) {
        showErrorMessage('متصفحك قديم. يرجى تحديث المتصفح للحصول على أفضل تجربة.');
    }
}

// فحص دعم PWA
function checkPWASupport() {
    if ('serviceWorker' in navigator) {
        console.log('PWA مدعوم');
    } else {
        console.warn('PWA غير مدعوم في هذا المتصفح');
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
        checkBrowserSupport();
        checkPWASupport();
        checkInternetConnection();
    } catch (error) {
        console.error('خطأ في تحميل الموقع:', error);
        showErrorMessage('حدث خطأ في تحميل الموقع. يرجى إعادة تحميل الصفحة.');
    }
    // === Language Switcher ===
    document.querySelectorAll('.lang-menu a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var lang = this.getAttribute('href').replace('#', '');
            if (lang === 'ar' || lang === 'en' || lang === 'ur') {
                localStorage.setItem('siteLang', lang);
                applyLanguage(lang);
            }
        });
    });
    // عند تحميل الصفحة، طبق اللغة المحفوظة
    var savedLang = localStorage.getItem('siteLang');
    if (savedLang && savedLang !== document.documentElement.lang) {
        applyLanguage(savedLang);
    }
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupFAQ();
    setupContactForm();
    setupBackToTop();
    setupMobileMenu();
    setupPWA();
    setupAnimations();
    setupCounters();
    setupParallax();
    setupBookingForm();
    setupDateValidation();
}

// Animation Setup
function setupAnimations() {
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.scroll-animate, .route-card, .fleet-card, .branch-card, .promo-card, .contact-item').forEach(el => {
        observer.observe(el);
    });

    // Add floating animation to specific elements
    document.querySelectorAll('.hero-image, .about-image, .app-screenshot').forEach(el => {
        el.classList.add('floating');
    });

    // Add pulse animation to CTA buttons
    document.querySelectorAll('.btn-primary').forEach(el => {
        el.classList.add('pulse');
    });

    // Add rotating animation to icons
    document.querySelectorAll('.feature-icon, .fleet-feature i, .app-feature i').forEach(el => {
        el.classList.add('rotating-slow');
    });

    // Add wave animation to social links
    document.querySelectorAll('.social-links a').forEach(el => {
        el.classList.add('wave');
    });

    // Staggered entrance animations
    setTimeout(() => {
        document.querySelectorAll('.route-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);

    setTimeout(() => {
        document.querySelectorAll('.fleet-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, 800);

    setTimeout(() => {
        document.querySelectorAll('.branch-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 120);
        });
    }, 1000);
}

// Counter Animation Setup
function setupCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/[^\d]/g, ''));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString() + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax Effect Setup
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .about-image, .app-screenshot');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced Button Click Effects
function setupButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Navigation Setup
function setupNavigation() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// FAQ Functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Show success message
            showMessage('تم إرسال الرسالة بنجاح!', 'success');
            this.reset();
        } else {
            showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
        }
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// PWA Setup
function setupPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }

    // Install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        const installBtn = document.querySelector('.install-btn');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                    installBtn.style.display = 'none';
                });
            });
        }
    });
}

// Utility Functions
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Show message with animation
    setTimeout(() => {
        messageDiv.style.display = 'block';
        messageDiv.style.opacity = '1';
    }, 100);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// Enhanced loading states
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// Initialize button effects
document.addEventListener('DOMContentLoaded', () => {
    setupButtonEffects();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16)); // ~60fps

// Enhanced Booking Form Setup
function setupBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    // Form submission with loading state
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchBtn = this.querySelector('.btn-search');
        searchBtn.classList.add('loading');
        
        // Simulate search process
        setTimeout(() => {
            searchBtn.classList.remove('loading');
            showMessage('تم البحث بنجاح! جاري عرض النتائج...', 'success');
        }, 2000);
    });

    // City selection enhancement
    const fromSelect = bookingForm.querySelector('.from-group select');
    const toSelect = bookingForm.querySelector('.to-group select');
    
    if (fromSelect && toSelect) {
        fromSelect.addEventListener('change', function() {
            if (this.value === toSelect.value && this.value !== '') {
                showMessage('لا يمكن اختيار نفس المدينة للذهاب والعودة', 'error');
                toSelect.value = '';
            }
        });
        
        toSelect.addEventListener('change', function() {
            if (this.value === fromSelect.value && this.value !== '') {
                showMessage('لا يمكن اختيار نفس المدينة للذهاب والعودة', 'error');
                fromSelect.value = '';
            }
        });
    }
}

// Date Validation Setup
function setupDateValidation() {
    const dateInput = document.querySelector('.date-group input[type="date"]');
    if (!dateInput) return;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        
        if (selectedDate < today) {
            showMessage('لا يمكن اختيار تاريخ في الماضي', 'error');
            this.value = today.toISOString().split('T')[0];
        }
    });
}

// Passenger Counter Functions
function changePassengers(delta) {
    const countElement = document.getElementById('passengerCount');
    const minusBtn = document.querySelector('.counter-btn.minus');
    const plusBtn = document.querySelector('.counter-btn.plus');
    
    if (!countElement) return;
    
    let currentCount = parseInt(countElement.textContent);
    let newCount = currentCount + delta;
    
    // Limit between 1 and 10 passengers
    if (newCount < 1) newCount = 1;
    if (newCount > 10) newCount = 10;
    
    countElement.textContent = newCount;
    
    // Update button states
    minusBtn.disabled = newCount <= 1;
    plusBtn.disabled = newCount >= 10;
    
    // Add animation
    countElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
    }, 200);
}

// Quick Action Functions
function showSchedule() {
    showMessage('سيتم فتح جدول الرحلات قريباً', 'success');
}

function showTracking() {
    showMessage('سيتم فتح صفحة تتبع الرحلة قريباً', 'success');
}

function showSupport() {
    showMessage('سيتم فتح خدمة العملاء قريباً', 'success');
}

// Search Trips Function
function searchTrips() {
    // Get form data
    const fromCity = document.querySelector('.from-group select').value;
    const toCity = document.querySelector('.to-group select').value;
    const travelDate = document.querySelector('.date-group input').value;
    const passengers = document.getElementById('passengerCount').textContent;
    
    // Validate form
    if (!fromCity || !toCity || !travelDate) {
        showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (fromCity === toCity) {
        showMessage('لا يمكن اختيار نفس المدينة للذهاب والعودة', 'error');
        return;
    }
    
    // Show loading state
    const searchBtn = document.querySelector('.btn-search');
    searchBtn.classList.add('loading');
    
    // Simulate search process
    setTimeout(() => {
        searchBtn.classList.remove('loading');
        // Redirect to search results with parameters
        const params = new URLSearchParams({
            from: fromCity,
            to: toCity,
            date: travelDate,
            passengers: passengers
        });
        window.location.href = `search-results.html?${params.toString()}`;
    }, 1500);
}


// Enhanced Form Validation
function validateBookingForm() {
    const form = document.querySelector('.booking-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add shake animation
            field.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .form-control.error {
        border-color: var(--danger-color);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(style);

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    var translations = {
        ar: {
            home: 'الرئيسية',
            routes: 'الطرق',
            about: 'من نحن',
            fleet: 'أسطولنا',
            faq: 'الأسئلة الشائعة',
            contact: 'تواصل معنا',
            bookNow: 'احجز الآن',
            login: 'تسجيل دخول',
            lang: 'العربية',
            heroTitle: 'استمتع بالوصول إلى وجهتك في رحلة سلسة',
            heroSubtitle: 'خدمة نقل متميزة تجمع بين الراحة والأمان والالتزام بالمواعيد',
            schedule: 'جدول الرحلات',
            searchTrips: 'البحث عن الرحلات',
            bookingTitle: 'احجز رحلتك',
            bookingDesc: 'سافر بثقة مع نورث وست',
            // أضف المزيد حسب الحاجة
        },
        en: {
            home: 'Home',
            routes: 'Routes',
            about: 'About Us',
            fleet: 'Our Fleet',
            faq: 'FAQ',
            contact: 'Contact Us',
            bookNow: 'Book Now',
            login: 'Login',
            lang: 'English',
            heroTitle: 'Enjoy a Smooth Journey to Your Destination',
            heroSubtitle: 'Premium transport service combining comfort, safety, and punctuality',
            schedule: 'Schedule',
            searchTrips: 'Search Trips',
            bookingTitle: 'Book Your Trip',
            bookingDesc: 'Travel with confidence with Northwest',
        },
        ur: {
            home: 'مرکزی صفحہ',
            routes: 'راستے',
            about: 'ہمارے بارے میں',
            fleet: 'بیڑا',
            faq: 'عمومی سوالات',
            contact: 'رابطہ کریں',
            bookNow: 'ابھی بک کریں',
            login: 'لاگ ان',
            lang: 'اردو',
            heroTitle: 'اپنی منزل تک آرام دہ سفر کا لطف اٹھائیں',
            heroSubtitle: 'آرام، حفاظت اور وقت کی پابندی کے ساتھ بہترین ٹرانسپورٹ سروس',
            schedule: 'شیڈول',
            searchTrips: 'سفر تلاش کریں',
            bookingTitle: 'اپنا سفر بک کریں',
            bookingDesc: 'اعتماد کے ساتھ سفر کریں Northwest کے ساتھ',
        }
    };
    var t = translations[lang] || translations['ar'];
    // القوائم
    var navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 6) {
        navLinks[0].textContent = t.home;
        navLinks[1].childNodes[0].textContent = t.routes + ' ';
        navLinks[2].textContent = t.about;
        navLinks[3].textContent = t.fleet;
        navLinks[4].textContent = t.faq;
        navLinks[5].textContent = t.contact;
    }
    // زر الحجز
    var bookBtn = document.querySelector('.booking-btn');
    if (bookBtn) bookBtn.textContent = t.bookNow;
    // زر تسجيل الدخول
    var loginBtn = document.querySelector('.btn-outline');
    if (loginBtn) loginBtn.textContent = t.login;
    // زر اللغة
    var langBtn = document.querySelector('.lang-btn');
    if (langBtn) langBtn.childNodes[0].textContent = t.lang + ' ';
    // الهيرو
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    var heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    // أزرار الهيرو
    var heroBtns = document.querySelectorAll('.hero-actions .btn');
    if (heroBtns.length >= 2) {
        heroBtns[0].textContent = t.bookNow;
        heroBtns[1].textContent = t.schedule;
    }
    // عنوان الحجز
    var bookingTitle = document.querySelector('.booking-header h3');
    if (bookingTitle) bookingTitle.textContent = t.bookingTitle;
    var bookingDesc = document.querySelector('.booking-header p');
    if (bookingDesc) bookingDesc.textContent = t.bookingDesc;
    // زر البحث عن الرحلات
    var searchBtn = document.querySelector('.btn-search span');
    if (searchBtn) searchBtn.textContent = t.searchTrips;
    // يمكن إضافة المزيد من الترجمات حسب الحاجة
}

// Enhanced User Authentication System
function checkUserLogin() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        if (userData.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            // User is logged in, show booking options
            showBookingOptions();
        }
    } else {
        // User not logged in, redirect to login
        window.location.href = 'login.html';
    }
}

function showBookingOptions() {
    // Show booking options for logged in users
    const bookingBtn = document.querySelector('.booking-btn');
    if (bookingBtn) {
        bookingBtn.textContent = 'احجز رحلتك';
        bookingBtn.onclick = function() {
            window.location.href = 'search-results.html';
        };
    }
}

// User Profile Management
function getUserProfile() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

function updateUserProfile(updatedData) {
    const user = getUserProfile();
    if (user) {
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
    }
    return false;
}

// Enhanced Booking System
function initializeBookingSystem() {
    const user = getUserProfile();
    if (user) {
        // User is logged in, enable booking
        console.log('User logged in:', user.fullName);
        return true;
    } else {
        // User not logged in, redirect to login
        window.location.href = 'login.html';
        return false;
    }
}
