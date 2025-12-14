// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.getElementById('navOverlay');

if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// FAQ Accordion
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

// Smooth Scrolling
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

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لك! سنتواصل معك قريباً.');
        contactForm.reset();
    });
}

// Registration Modal
const registrationModal = document.getElementById('registrationModal');
const closeModal = document.getElementById('closeModal');
const registrationForm = document.getElementById('registrationForm');

// Open modal when clicking register buttons
const subscribeButtons = document.querySelectorAll('.btn-subscribe, .btn-primary, .btn-pricing');
subscribeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-form')) {
            e.preventDefault();
            registrationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    registrationModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
registrationModal.addEventListener('click', (e) => {
    if (e.target === registrationModal) {
        registrationModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registrationModal.classList.contains('active')) {
        registrationModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// FORM LOGIC - Based on FORM_LOGIC_TEMPLATE
// ============================================

// Configuration
const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/YOUR_FORM_ID_HERE/submit`;

// Phone validation (Algerian format)
const validatePhone = (phone) => {
    const regex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return regex.test(phone);
};

// Validation function
const validateForm = (formData) => {
    const errors = {};
    
    // Required fields
    if (!formData.get('email')?.trim()) errors.email = 'هذا الحقل مطلوب';
    if (!formData.get('fullName')?.trim()) errors.fullName = 'هذا الحقل مطلوب';
    if (!formData.get('phone')?.trim()) errors.phone = 'هذا الحقل مطلوب';
    if (!formData.get('jobTitle')) errors.jobTitle = 'اختر المسمى الوظيفي';
    if (!formData.get('organization')?.trim()) errors.organization = 'هذا الحقل مطلوب';
    if (!formData.get('sector')?.trim()) errors.sector = 'هذا الحقل مطلوب';
    if (!formData.get('employeeCount')) errors.employeeCount = 'اختر عدد الموظفين';
    
    // Email format validation
    const email = formData.get('email')?.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'بريد غير صحيح';
    }
    
    return errors;
};

// Display errors in form
const displayErrors = (form, errors) => {
    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
    
    // Display new errors
    Object.keys(errors).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            // Handle radio buttons differently
            if (field.type === 'radio') {
                const selector = field.closest('.employee-count-selector');
                if (selector) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-error';
                    errorDiv.textContent = errors[fieldName];
                    selector.parentElement.appendChild(errorDiv);
                    selector.querySelectorAll('.employee-count-option').forEach(opt => {
                        opt.style.borderColor = '#ff4444';
                    });
                }
            } else {
                field.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = errors[fieldName];
                field.parentElement.appendChild(errorDiv);
            }
        }
    });
};

// Scroll to first error
const scrollToFirstError = (form, errors) => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
        const field = form.querySelector(`[name="${firstErrorField}"]`);
        if (field) {
            // Handle radio buttons - scroll to the selector container
            if (field.type === 'radio') {
                const selector = field.closest('.employee-count-selector');
                if (selector) {
                    selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => field.focus(), 300);
            }
        }
    }
};

// Show message modal
const showMessage = (type, title, message) => {
    const messageModal = document.getElementById('messageModal');
    const messageIcon = document.getElementById('messageIcon');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');
    
    if (type === 'success') {
        messageIcon.textContent = '✅';
        messageTitle.textContent = 'تم إرسال طلبك';
        messageTitle.style.color = '#22c55e';
        messageText.textContent = message || '✅ تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.';
    } else {
        messageIcon.textContent = '⚠️';
        messageTitle.textContent = 'حدث خطأ';
        messageTitle.style.color = '#ef4444';
        messageText.textContent = message || '⚠️ حدث خطأ غير متوقع.';
    }
    
    messageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (messageModal.classList.contains('active')) {
            closeMessageModal();
        }
    }, 5000);
};

// Close message modal
const closeMessageModal = () => {
    const messageModal = document.getElementById('messageModal');
    messageModal.classList.remove('active');
    document.body.style.overflow = '';
};

// Message modal event listeners
const closeMessageModalBtn = document.getElementById('closeMessageModal');
const closeMessageBtn = document.getElementById('closeMessageBtn');
if (closeMessageModalBtn) {
    closeMessageModalBtn.addEventListener('click', closeMessageModal);
}
if (closeMessageBtn) {
    closeMessageBtn.addEventListener('click', closeMessageModal);
}
const messageModal = document.getElementById('messageModal');
if (messageModal) {
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            closeMessageModal();
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && messageModal && messageModal.classList.contains('active')) {
        closeMessageModal();
    }
});

// Form submission handler
const handleFormSubmit = async (form, formId) => {
    const formData = new FormData(form);
    
    // Bot protection - check honeypot
    if (formData.get('honey')) {
        return; // Silent fail for bots
    }
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        displayErrors(form, errors);
        scrollToFirstError(form, errors);
        return;
    }
    
    // Additional phone validation
    const phone = formData.get('phone')?.trim();
    if (!validatePhone(phone)) {
        const phoneErrors = {
            phone: '⚠️ الرجاء إدخال رقم هاتف صحيح (9 أرقام على الأقل، مع إمكانية + في البداية).'
        };
        displayErrors(form, phoneErrors);
        const phoneField = form.querySelector('[name="phone"]');
        if (phoneField) {
            phoneField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => phoneField.focus(), 300);
        }
        return;
    }
    
    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn?.textContent;
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
    }
    
    try {
        // Prepare payload (map to Arabic field names for CRM)
        const payload = {
            user_id: 'public-user',
            data: {
                'الاسم الكامل': formData.get('fullName'),
                'البريد الإلكتروني': formData.get('email'),
                'رقم الهاتف (واتساب مفضل)': formData.get('phone'),
                'المسمى الوظيفي': formData.get('jobTitle'),
                'الولاية': formData.get('state'),
                'اسم المؤسسة': formData.get('organization'),
                'القطاع الذي تعمل فيه': formData.get('sector'),
                'عدد الموظفين في الشركة': formData.get('employeeCount')
            }
        };
        
        try {
            // Primary attempt: Standard fetch with JSON
            const res = await fetch(PUBLIC_SUBMIT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await res.json().catch(() => ({}));
            
            // Success case
            if (res.ok && res.status >= 200 && res.status < 300) {
                showMessage('success', 'تم إرسال طلبك', '✅ تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.');
                form.reset();
                if (formId === 'registrationForm') {
                    registrationModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                return;
            }
            
            // Handle specific errors
            const errorMsg = data?.error || data?.message || '⚠️ حدث خطأ غير متوقع.';
            
            if (errorMsg.includes('البريد الإلكتروني') && errorMsg.includes('exists')) {
                displayErrors(form, { email: '⚠️ هذا البريد الإلكتروني مسجل مسبقًا.' });
                const emailField = form.querySelector('[name="email"]');
                if (emailField) {
                    emailField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => emailField.focus(), 300);
                }
                return;
            }
            
            if (errorMsg.includes('رقم الهاتف')) {
                displayErrors(form, { phone: errorMsg });
                const phoneField = form.querySelector('[name="phone"]');
                if (phoneField) {
                    phoneField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => phoneField.focus(), 300);
                }
                return;
            }
            
            // Generic error
            showMessage('error', 'حدث خطأ', errorMsg);
            
        } catch (networkError) {
            // Network/CORS error - try fallback
            try {
                await fetch(PUBLIC_SUBMIT_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                
                // Optimistic success (can't read response in no-cors)
                showMessage('success', 'تم إرسال طلبك', '✅ تم إرسال طلبك. سنراجعه ونتواصل معك قريبًا.');
                form.reset();
                if (formId === 'registrationForm') {
                    registrationModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            } catch (fallbackError) {
                showMessage('error', 'حدث خطأ', '⚠️ تعذر إرسال الطلب. حاول لاحقًا.');
            }
        }
        
    } catch (err) {
        console.error('Fetch error:', err);
        showMessage('error', 'حدث خطأ', '⚠️ حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجددًا.');
    } finally {
        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
};

// Clear errors on input
const setupFormErrorClearing = (form) => {
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                field.classList.remove('error');
                const errorDiv = field.parentElement.querySelector('.form-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
        
        // Handle radio buttons
        if (field.type === 'radio') {
            field.addEventListener('change', () => {
                const selector = field.closest('.employee-count-selector');
                if (selector) {
                    const errorDiv = selector.parentElement.querySelector('.form-error');
                    if (errorDiv) {
                        errorDiv.remove();
                    }
                    selector.querySelectorAll('.employee-count-option').forEach(opt => {
                        opt.style.borderColor = '';
                    });
                }
            });
        }
    });
};

// Handle form submission (modal form)
if (registrationForm) {
    setupFormErrorClearing(registrationForm);
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(registrationForm, 'registrationForm');
    });
}

// Handle inline form submission
const registrationFormInline = document.getElementById('registrationFormInline');
if (registrationFormInline) {
    setupFormErrorClearing(registrationFormInline);
    registrationFormInline.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(registrationFormInline, 'registrationFormInline');
    });
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Program Section Toggle (Main Headlines / Subheadlines)
const programSections = document.querySelectorAll('.program-section');

programSections.forEach(section => {
    const headline = section.querySelector('.program-main-headline');
    const sublist = section.querySelector('.program-sublist');
    
    // Only make clickable if there's a sublist
    if (headline && sublist) {
        // Add class to indicate this headline has subheadlines
        headline.classList.add('has-sublist');
        headline.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    }
});

// Pricing Toggle for Webscale Members
const webscaleMemberCheckbox = document.getElementById('webscaleMember');
const pricingCard = document.getElementById('pricingCard');
const priceAmount = document.getElementById('priceAmount');
const pricingTitle = document.getElementById('pricingTitle');
const pricingFeatures = document.getElementById('pricingFeatures');
const specialBadge = document.getElementById('specialBadge');

// General price features
const generalFeatures = [
    '✓ دورة حضورية مكثفة 3 أيام',
    '✓ محتوى عملي وتطبيقي',
    '✓ شهادة إتمام',
    '✓ خطة تطبيق فردية'
];

// Webscale member features
const memberFeatures = [
    '✓ نفس المميزات',
    '✓ خصم 6.000 د.ج',
    '✓ دورة حضورية مكثفة 3 أيام',
    '✓ محتوى عملي وتطبيقي'
];

if (webscaleMemberCheckbox) {
    webscaleMemberCheckbox.addEventListener('change', (e) => {
        // Add transition effect
        pricingCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        priceAmount.style.transition = 'all 0.3s ease';
        pricingTitle.style.transition = 'all 0.3s ease';
        
        if (e.target.checked) {
            // Switch to member pricing with animation
            pricingCard.classList.add('featured');
            specialBadge.style.display = 'block';
            
            // Animate price change
            priceAmount.style.transform = 'scale(1.1)';
            setTimeout(() => {
                priceAmount.textContent = '39.000';
                priceAmount.style.transform = 'scale(1)';
            }, 150);
            
            // Animate title change
            pricingTitle.style.opacity = '0';
            setTimeout(() => {
                pricingTitle.textContent = 'أعضاء Webscale';
                pricingTitle.style.opacity = '1';
            }, 150);
            
            // Update features with fade effect
            pricingFeatures.style.opacity = '0';
            setTimeout(() => {
                pricingFeatures.innerHTML = '';
                memberFeatures.forEach((feature, index) => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    li.style.opacity = '0';
                    li.style.transform = 'translateX(20px)';
                    pricingFeatures.appendChild(li);
                    
                    // Animate each feature in
                    setTimeout(() => {
                        li.style.transition = 'all 0.3s ease';
                        li.style.opacity = '1';
                        li.style.transform = 'translateX(0)';
                    }, index * 50);
                });
                pricingFeatures.style.opacity = '1';
            }, 200);
        } else {
            // Switch to general pricing with animation
            pricingCard.classList.remove('featured');
            specialBadge.style.display = 'none';
            
            // Animate price change
            priceAmount.style.transform = 'scale(1.1)';
            setTimeout(() => {
                priceAmount.textContent = '45.000';
                priceAmount.style.transform = 'scale(1)';
            }, 150);
            
            // Animate title change
            pricingTitle.style.opacity = '0';
            setTimeout(() => {
                pricingTitle.textContent = 'سعر الدورة';
                pricingTitle.style.opacity = '1';
            }, 150);
            
            // Update features with fade effect
            pricingFeatures.style.opacity = '0';
            setTimeout(() => {
                pricingFeatures.innerHTML = '';
                generalFeatures.forEach((feature, index) => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    li.style.opacity = '0';
                    li.style.transform = 'translateX(20px)';
                    pricingFeatures.appendChild(li);
                    
                    // Animate each feature in
                    setTimeout(() => {
                        li.style.transition = 'all 0.3s ease';
                        li.style.opacity = '1';
                        li.style.transform = 'translateX(0)';
                    }, index * 50);
                });
                pricingFeatures.style.opacity = '1';
            }, 200);
        }
    });
}


