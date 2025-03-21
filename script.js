document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.business-card');
    
    // Add subtle animation when hovering over contact links
    const contactLinks = document.querySelectorAll('.contact-info a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
            link.style.display = 'inline-block';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // Add click-to-copy functionality for email addresses
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Create and show a temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    background: #333;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    top: ${e.pageY - 30}px;
                    left: ${e.pageX}px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(tooltip);
                
                // Show and hide the tooltip
                setTimeout(() => tooltip.style.opacity = '1', 10);
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }, 1500);
            });
        });
    });
});
