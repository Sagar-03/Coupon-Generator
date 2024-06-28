// script.js

function generateCoupon() {
    const canvas = document.getElementById('couponCanvas');
    const ctx = canvas.getContext('2d');
    const organizationName = document.getElementById('organizationName').value;
    const discount = document.getElementById('discount').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const url = document.getElementById('url').value;

    // Set canvas dimensions based on container width
    const container = document.querySelector('.coupon-preview');
    canvas.width = container.clientWidth;
    canvas.height = 280;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const gradient = generateRandomGradient(ctx, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text styles
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    // Calculate positions for each line
    const lineHeight = 30;
    const startY = 40;

    // Draw texts
    ctx.fillText('Organization Name: ' + organizationName, canvas.width / 2, startY);
    ctx.fillText('Discount: ' + discount, canvas.width / 2, startY + lineHeight);
    ctx.fillText('Expires on: ' + expiryDate, canvas.width / 2, startY + lineHeight * 2);

    // Draw barcode on a temporary canvas and then draw it onto the main canvas
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, '123456789012', { format: 'CODE128', displayValue: false });
    
    const barcodeWidth = 160;
    const barcodeHeight = 40;
    const barcodeX = (canvas.width - barcodeWidth) / 2;
    const barcodeY = startY + lineHeight * 3 + 10;
    
    ctx.drawImage(barcodeCanvas, barcodeX, barcodeY, barcodeWidth, barcodeHeight);

    // Generate QR code on a temporary element and draw it onto the main canvas
    const qrCodeContainer = document.createElement('div');
    const qrCode = new QRCode(qrCodeContainer, {
        text: url,
        width: 80,
        height: 80,
    });

    // Wait for QR code image to load before drawing
    qrCode._oDrawing._elImage.onload = () => {
        const qrCodeImage = qrCodeContainer.querySelector('img');
        const qrCodeSize = 80;
        const qrCodeX = 10;
        const qrCodeY = canvas.height - qrCodeSize - 30;

        ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

        ctx.font = '14px Arial';
        ctx.fillText('Visit our website', qrCodeX + qrCodeSize - 30, qrCodeY + qrCodeSize / 2 + 55);

        // Set the download link to download the generated coupon image
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.addEventListener('click', () => {
            downloadCoupon(canvas);
        });
    };
}

function generateRandomGradient(ctx, width, height) {
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, randomColor());
    gradient.addColorStop(1, randomColor());
    return gradient;
}

function downloadCoupon(canvas) {
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'coupon.png';
    downloadLink.click();
}
