const form = document.getElementById('coupon-form');
const couponContainer = document.getElementById('coupon-container');
const couponImage = document.getElementById('coupon-image');
const downloadCoupon = document.getElementById('download-coupon');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const organizationName = document.getElementById('organization-name').value;
    const discountDeal = document.getElementById('discount-deal').value;
    const expiryDate = document.getElementById('expiry-date').value;

    generateCoupon(organizationName, discountDeal, expiryDate);
});

function generateCoupon(organizationName, discountDeal, expiryDate) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');

    // Draw the coupon background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add the organization name
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(organizationName, 10, 10);

    // Add the discount/deal
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(discountDeal, 10, 40);

    // Add the expiry date
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(expiryDate, 10, 70);

    // Convert the canvas to an image
    const imageDataURL = canvas.toDataURL('image/png');

    // Set the coupon image and download link
    couponImage.src = imageDataURL;
    downloadCoupon.href = imageDataURL;
    couponContainer.style.display = 'block';
}