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
            if (link.href.startsWith('mailto:')) {
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
            }
        });
    });

    // QR Code functionality
    const modal = document.getElementById('qrModal');
    const showQRButton = document.getElementById('showQR');
    const closeButton = document.querySelector('.close');
    const qrcodeContainer = document.getElementById('qrcode');
    const downloadButton = document.getElementById('downloadPDF');
    let qrcode = null;

    showQRButton.addEventListener('click', () => {
        modal.style.display = 'block';
        if (!qrcode) {
            qrcode = new QRCode(qrcodeContainer, {
                text: window.location.href,
                width: 200,
                height: 200,
                colorDark: '#2b5cac',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // PDF Download functionality
    downloadButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Get the QR code image
        const qrImage = qrcodeContainer.querySelector('img');
        
        // Add title
        doc.setFontSize(16);
        doc.text('Elizabeth Ewudiwa - Digital Business Card', 105, 20, { align: 'center' });
        
        // Add QR code
        doc.addImage(qrImage.src, 'PNG', 65, 40, 80, 80);
        
        // Add instructions
        doc.setFontSize(12);
        doc.text('Scan this QR code to view the digital business card', 105, 140, { align: 'center' });
        
        // Add contact information
        doc.setFontSize(10);
        doc.text('Contact Information:', 20, 160);
        doc.text('Email: elizabeth@bentinarly.org', 20, 170);
        doc.text('Tel: +233 (0) 208886430', 20, 180);
        doc.text('Mobile: +233 (0) 543401716', 20, 190);
        
        // Save the PDF
        doc.save('Elizabeth-Ewudiwa-QR-Code.pdf');
    });
});
