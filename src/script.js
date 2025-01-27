document.getElementById('badgeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateBadge();
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('badgeForm').reset();
    document.getElementById('badgePreview').innerHTML = '';
});

function generateBadge() {
    const badgeWidth = document.getElementById('badgeWidth').value;
    const badgeHeight = document.getElementById('badgeHeight').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const borderColor = document.getElementById('borderColor').value;
    const textColor = document.getElementById('textColor').value;
    const logoColor = document.getElementById('logoColor').value;
    const shape = document.getElementById('shape').value;
    const description = document.getElementById('description').value;
    const additionalText = document.getElementById('additionalText').value;

    let badgeSVG = `<svg width="${badgeWidth}" height="${badgeHeight}" xmlns="http://www.w3.org/2000/svg">`;

    if (shape === 'circle') {
        badgeSVG += `<circle cx="${badgeWidth / 2}" cy="${badgeHeight / 2}" r="${Math.min(badgeWidth, badgeHeight) / 2}" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="5"/>`;
    } else if (shape === 'square') {
        badgeSVG += `<rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="5"/>`;
    }

    badgeSVG += `<text x="${badgeWidth / 2}" y="${badgeHeight / 2}" font-size="24" text-anchor="middle" fill="${textColor}">${description}</text>`;
    badgeSVG += `<text x="${badgeWidth / 2}" y="${badgeHeight / 2 + 40}" font-size="16" text-anchor="middle" fill="${textColor}">${additionalText}</text>`;
    badgeSVG += `<rect x="${badgeWidth / 2 - 20}" y="${badgeHeight / 4 - 20}" width="40" height="40" fill="${logoColor}"/>`;
    badgeSVG += `</svg>`;

    document.getElementById('badgePreview').innerHTML = badgeSVG;
    alert('Please regenerate the badge if any parameter is changed.');
}
