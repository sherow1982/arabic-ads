/**
 * أدوات التسويق العربي - JavaScript الرئيسي
 */

let currentFilter = 'all';
let loadingScreen = null;
let navbar = null;
let backToTopBtn = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadingScreen = document.getElementById('loadingScreen');
    navbar = document.querySelector('.navbar');
    backToTopBtn = document.getElementById('backToTop');
    
    initializeLoading();
    initializeNavigation();
    initializeToolsFilter();
    initializeScrollEffects();
    initializeContactForm();
    
    console.log('🚀 أدوات التسويق العربي جاهزة!');
}

function initializeLoading() {
    if (!loadingScreen) return;
    
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);
}

function initializeNavigation() {
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

function initializeToolsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            currentFilter = filter;
            
            toolCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeScrollEffects() {
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showToast('تم إرسال رسالتك بنجاح!', 'success');
        }, 2000);
    });
}

function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 9999;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
}

window.ArabicAdsApp = {
    showToast,
    trackEvent
};