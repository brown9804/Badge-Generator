document.getElementById('badgeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateBadge();
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('badgeForm').reset();
    document.getElementById('badgePreview').innerHTML = '';
    document.getElementById('regenerateMessage').style.display = 'none'; // Hide the message when form is cleared
});

// Function to show the regenerate message
function showRegenerateMessage() {
    document.getElementById('regenerateMessage').style.display = 'block';
}

// Add event listeners to all input fields to show the regenerate message when any value is changed
const inputs = document.querySelectorAll('#badgeForm input, #badgeForm select');
inputs.forEach(input => {
    input.addEventListener('change', showRegenerateMessage);
});

function generateBadge() {
    const badgeWidth = document.getElementById('badgeWidth').value;
    const badgeHeight = document.getElementById('badgeHeight').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const borderColor = document.getElementById('borderColor').value;
    const textColor = document.getElementById('textColor').value;
    const logoUrl = document.getElementById('logoUrl').value; // Assuming you have an input for logo URL
    const shape = document.getElementById('shape').value;
    const description = document.getElementById('description').value;
    const additionalText = document.getElementById('additionalText').value;

    let badgeSVG = `<svg width="${badgeWidth}" height="${badgeHeight}" xmlns="http://www.w3.org/2000/svg">`;

    // Background shape
    if (shape === 'circle') {
        badgeSVG += `<circle cx="${badgeWidth / 2}" cy="${badgeHeight / 2}" r="${Math.min(badgeWidth, badgeHeight) / 2}" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="5"/>`;
    } else if (shape === 'square') {
        badgeSVG += `<rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="5" rx="15" ry="15"/>`;
    }

    // Random colorful shapes
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
    for (let i = 0; i < 5; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * badgeWidth;
        const randomY = Math.random() * badgeHeight;
        const randomSize = Math.random() * 50 + 10;
        badgeSVG += `<circle cx="${randomX}" cy="${randomY}" r="${randomSize}" fill="${randomColor}" opacity="0.5"/>`;
    }

    // Logo
    badgeSVG += `<image x="${badgeWidth / 2 - 20}" y="${badgeHeight / 4 - 20}" width="40" height="40" href="${logoUrl}" />`;

    // Text
    badgeSVG += `<text x="${badgeWidth / 2}" y="${badgeHeight / 2}" font-size="24" text-anchor="middle" fill="${textColor}" font-family="Arial" font-weight="bold">${description}</text>`;
    badgeSVG += `<text x="${badgeWidth / 2}" y="${badgeHeight / 2 + 40}" font-size="16" text-anchor="middle" fill="${textColor}" font-family="Arial">${additionalText}</text>`;

    // Shadow effect
    badgeSVG += `<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="black" flood-opacity="0.5"/>
                 </filter>`;
    badgeSVG += `<rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" fill="none" stroke="none" filter="url(#shadow)"/>`;

    badgeSVG += `</svg>`;

    document.getElementById('badgePreview').innerHTML = badgeSVG;
    document.getElementById('regenerateMessage').style.display = 'none'; // Hide the message after generating the badge
}

// Add a message element to the HTML
document.getElementById('badgeForm').insertAdjacentHTML('beforeend', '<p id="regenerateMessage" style="display:none; color:red;">Please regenerate the badge since parameters have changed.</p>');
