// ===================================
// 26 LAWS - INTERACTIVE FEATURES
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Sticky Navigation Active State
    const seasonNavItems = document.querySelectorAll('.season-nav-item');
    const seasonSections = document.querySelectorAll('.season-section');
    
    function updateActiveNavItem() {
        let current = '';
        
        seasonSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        seasonNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavItem);
    updateActiveNavItem();
    
    // Smooth Scroll for Navigation
    seasonNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 150;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Law Card Intersection Observer for Animations
    const lawCards = document.querySelectorAll('.law-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    lawCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Reading Progress Bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 72px;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--accent), #667eea);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
    
    // Law Number Badge Hover Effect
    const lawBadges = document.querySelectorAll('.law-number-badge');
    
    lawBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Somatic List Item Sequential Reveal
    const somaticLists = document.querySelectorAll('.somatic-list');
    
    const listObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            item.style.transition = 'all 0.4s ease-out';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 50);
                    }, index * 100);
                });
                listObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    somaticLists.forEach(list => {
        listObserver.observe(list);
    });
    
    // Application Steps Sequential Reveal
    const applicationSteps = document.querySelectorAll('.application-steps');
    
    const stepsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = entry.target.querySelectorAll('li');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '0';
                        step.style.transform = 'translateX(-30px)';
                        setTimeout(() => {
                            step.style.transition = 'all 0.5s ease-out';
                            step.style.opacity = '1';
                            step.style.transform = 'translateX(0)';
                        }, 50);
                    }, index * 150);
                });
                stepsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    applicationSteps.forEach(steps => {
        stepsObserver.observe(steps);
    });
    
    // Season Number Animation
    const seasonNumbers = document.querySelectorAll('.season-number-large');
    
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.5) rotate(-10deg)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.opacity = '0.3';
                    entry.target.style.transform = 'scale(1) rotate(0deg)';
                }, 100);
                
                numberObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    seasonNumbers.forEach(number => {
        numberObserver.observe(number);
    });
    
    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--accent);
        color: var(--bg-primary);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
    `;
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 8px 30px rgba(255, 107, 53, 0.5)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.3)';
    });
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Arrow keys to navigate between seasons
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            const activeItem = document.querySelector('.season-nav-item.active');
            if (activeItem && activeItem.nextElementSibling) {
                activeItem.nextElementSibling.click();
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            const activeItem = document.querySelector('.season-nav-item.active');
            if (activeItem && activeItem.previousElementSibling) {
                activeItem.previousElementSibling.click();
            }
        }
    });
    
    console.log('26 Laws interactive features loaded successfully');
});
