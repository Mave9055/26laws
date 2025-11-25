// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .symptom-list li, .chart-container, .diagram');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Glass Box Visualization
function createGlassBoxDiagram() {
    const container = document.getElementById('glass-box-diagram');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw glass box
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        
        // Box outline
        const boxX = canvas.width / 2 - 100;
        const boxY = 100;
        const boxSize = 200;
        
        ctx.strokeRect(boxX, boxY, boxSize, boxSize);
        
        // Inner figure (isolated)
        ctx.fillStyle = '#ff6b35';
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 200, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Cracks
        ctx.setLineDash([]);
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(boxX + 50, boxY);
        ctx.lineTo(boxX + 70, boxY + 100);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(boxX + boxSize, boxY + 80);
        ctx.lineTo(boxX + 150, boxY + 120);
        ctx.stroke();
        
        // Fire particles
        const time = Date.now() * 0.001;
        for (let i = 0; i < 5; i++) {
            const x = canvas.width / 2 + Math.sin(time + i) * 20;
            const y = 250 + Math.cos(time + i * 0.5) * 10 + i * 8;
            
            ctx.fillStyle = `rgba(255, 107, 53, ${0.5 - i * 0.1})`;
            ctx.beginPath();
            ctx.arc(x, y, 4 - i * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Trauma Response Wheel
function createTraumaResponseWheel() {
    const container = document.getElementById('trauma-wheel');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    
    const responses = [
        { label: 'FIGHT', angle: 0, color: '#dc2626' },
        { label: 'FLIGHT', angle: Math.PI / 2, color: '#fbbf24' },
        { label: 'FREEZE', angle: Math.PI, color: '#3b82f6' },
        { label: 'FAWN', angle: (3 * Math.PI) / 2, color: '#10b981' }
    ];
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        responses.forEach((response, index) => {
            const startAngle = response.angle - Math.PI / 4;
            const endAngle = response.angle + Math.PI / 4;
            
            // Draw segment
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            
            ctx.fillStyle = response.color + '40';
            ctx.fill();
            
            ctx.strokeStyle = response.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Label
            const labelAngle = response.angle;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 40);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 40);
            
            ctx.fillStyle = '#e5e5e5';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(response.label, labelX, labelY);
        });
        
        // Center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6b35';
        ctx.fill();
        
        ctx.fillStyle = '#0a0a0a';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('THREAT', centerX, centerY);
    }
    
    draw();
    
    // Animate on hover
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < radius + 40) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    });
}

// CPTSD Symptom Impact Chart
function createSymptomImpactChart() {
    const container = document.getElementById('symptom-chart');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = 300;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    const symptoms = [
        { name: 'Emotional Dysregulation', value: 90 },
        { name: 'Negative Self-Concept', value: 85 },
        { name: 'Relationship Difficulties', value: 80 },
        { name: 'Hypervigilance', value: 75 },
        { name: 'Dissociation', value: 70 }
    ];
    
    const barHeight = 40;
    const barSpacing = 10;
    const maxWidth = canvas.width - 200;
    
    symptoms.forEach((symptom, index) => {
        const y = index * (barHeight + barSpacing) + 20;
        const barWidth = (symptom.value / 100) * maxWidth;
        
        // Background bar
        ctx.fillStyle = '#2d2d2d';
        ctx.fillRect(150, y, maxWidth, barHeight);
        
        // Value bar
        const gradient = ctx.createLinearGradient(150, y, 150 + barWidth, y);
        gradient.addColorStop(0, '#ff6b35');
        gradient.addColorStop(1, '#fbbf24');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(150, y, barWidth, barHeight);
        
        // Label
        ctx.fillStyle = '#e5e5e5';
        ctx.font = '14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(symptom.name, 140, y + 25);
        
        // Value
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(symptom.value + '%', 150 + barWidth + 10, y + 25);
    });
}

// Phase Treatment Timeline
function createTreatmentTimeline() {
    const container = document.getElementById('treatment-timeline');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = 200;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    const phases = [
        { name: 'Safety', duration: 40, color: '#10b981' },
        { name: 'Processing', duration: 35, color: '#fbbf24' },
        { name: 'Integration', duration: 25, color: '#3b82f6' }
    ];
    
    const startX = 50;
    const y = canvas.height / 2;
    const totalWidth = canvas.width - 100;
    
    let currentX = startX;
    
    phases.forEach((phase, index) => {
        const width = (phase.duration / 100) * totalWidth;
        
        // Phase bar
        ctx.fillStyle = phase.color + '60';
        ctx.fillRect(currentX, y - 30, width, 60);
        
        ctx.strokeStyle = phase.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(currentX, y - 30, width, 60);
        
        // Phase name
        ctx.fillStyle = '#e5e5e5';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(phase.name, currentX + width / 2, y + 5);
        
        // Duration
        ctx.font = '12px Arial';
        ctx.fillText(`${phase.duration}%`, currentX + width / 2, y + 25);
        
        // Arrow
        if (index < phases.length - 1) {
            ctx.strokeStyle = '#ff6b35';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(currentX + width, y);
            ctx.lineTo(currentX + width + 20, y);
            ctx.stroke();
            
            // Arrow head
            ctx.beginPath();
            ctx.moveTo(currentX + width + 20, y);
            ctx.lineTo(currentX + width + 15, y - 5);
            ctx.lineTo(currentX + width + 15, y + 5);
            ctx.closePath();
            ctx.fillStyle = '#ff6b35';
            ctx.fill();
        }
        
        currentX += width + 20;
    });
}

// Brain Region Impact Diagram
function createBrainDiagram() {
    const container = document.getElementById('brain-diagram');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = 300;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Simplified brain shape
    ctx.fillStyle = '#2d2d2d';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 120, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Regions
    const regions = [
        { name: 'Amygdala', x: centerX - 40, y: centerY, size: 20, impact: 'high' },
        { name: 'Hippocampus', x: centerX + 40, y: centerY, size: 18, impact: 'high' },
        { name: 'Prefrontal Cortex', x: centerX, y: centerY - 50, size: 25, impact: 'medium' }
    ];
    
    regions.forEach(region => {
        const color = region.impact === 'high' ? '#dc2626' : '#fbbf24';
        
        // Pulsing effect
        let pulse = 0;
        setInterval(() => {
            ctx.clearRect(region.x - 40, region.y - 40, 80, 80);
            
            ctx.globalAlpha = 0.3 + Math.sin(pulse) * 0.2;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(region.x, region.y, region.size + Math.sin(pulse) * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            
            pulse += 0.1;
        }, 50);
        
        // Label
        ctx.fillStyle = '#e5e5e5';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(region.name, region.x, region.y + region.size + 20);
    });
}

// Expandable sections
function initExpandable() {
    const expandables = document.querySelectorAll('[data-expandable]');
    
    expandables.forEach(element => {
        element.addEventListener('click', () => {
            const targetId = element.getAttribute('data-expandable');
            const target = document.getElementById(targetId);
            
            if (target) {
                target.classList.toggle('active');
                element.classList.toggle('active');
            }
        });
    });
}

// Particle background effect
function createParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.fillStyle = '#ff6b35';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    createGlassBoxDiagram();
    createTraumaResponseWheel();
    createSymptomImpactChart();
    createTreatmentTimeline();
    createBrainDiagram();
    initExpandable();
    createParticleEffect();
});
