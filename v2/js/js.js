document.querySelector('.note a').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('grid').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('bottom').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('start').scrollIntoView({ behavior: 'smooth' });
});

// Auto-generate anchors and separate dimensions for modules
function initModules() {
    const modules = document.querySelectorAll('.module');
    const navHeight = document.querySelector('.nav-bar')?.offsetHeight || 0;
    const navOffset = navHeight     + 20; // 20px extra spacing

    modules.forEach((module, index) => {
        // Create unique ID for each module
        const moduleId = `module-${index + 1}`;
        module.id = moduleId;
        
        // Create anchor element (zero height, absolute positioned)
        const anchor = document.createElement('a');
        anchor.href = `#${moduleId}`;
        anchor.className = 'module-anchor';
        anchor.style.cssText = `
            display: block;
            position: absolute;
            top: -${navOffset}px;
            left: 0;
            width: 100%;
            height: 1px;
            z-index: 1000;
        `;
        module.parentNode.insertBefore(anchor, module);
        
        // Ensure each module has independent dimensions
        module.style.cssText += `
            position: relative;
            height: auto;
            min-height: 300px;
        `;
    });
}

// Initialize on load and resize
window.addEventListener('load', initModules);
window.addEventListener('resize', initModules);

// Smooth scroll for module anchors (optional enhancement)
document.addEventListener('click', function(e) {
    if (e.target.matches('.module-anchor, [href^="#module-"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href')?.substring(1) || e.target.parentElement.href.split('#')[1];
        const target = document.getElementById(targetId);
        if (target) {
            const navHeight = document.querySelector('.nav-bar')?.offsetHeight || 0;
            const offset = navHeight + 20;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Enhanced smooth scroll that works with both navs
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const navHeight = document.querySelector('.nav-bar')?.offsetHeight || 0;
        const sidebarWidth = document.querySelector('.sidebar-nav')?.offsetWidth || 0;
        const offset = navHeight + 40; // Extra space for both navs
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Update the click handler
document.addEventListener('click', function(e) {
    if (e.target.matches('.module-anchor, [href^="#module-"], .sidebar-link')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const targetId = href.substring(1);
        smoothScrollTo(targetId);
    }
});
