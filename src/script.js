document.getElementById('badgeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateBadge();
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('badgeForm').reset();
    document.getElementById('badgePreview').innerHTML = '';
    document.getElementById('regenerateMessage').style.display = 'none';
    document.getElementById('downloadSVGButton').style.display = 'none';
    document.getElementById('downloadPNGButton').style.display = 'none';
});

function showRegenerateMessage() {
    document.getElementById('regenerateMessage').style.display = 'block';
}

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
    const shape = document.getElementById('shape').value;
    const description = document.getElementById('description').value;
    const additionalText = document.getElementById('additionalText').value;

    let badgeSVG = `<svg width="${badgeWidth}" height="${badgeHeight}" xmlns="http://www.w3.org/2000/svg">`;

    if (shape === 'circle') {
        badgeSVG += `<circle cx="${badgeWidth / 2}" cy="${badgeHeight / 2}" r="${Math.min(badgeWidth, badgeHeight) / 2}" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="5"/>`;
    } else if (shape === 'square') {
        badgeSVG += `<rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" fill="${backgroundColor}" stroke="${borderColor}" stroke-width="5" rx="15" ry="15"/>`;
    }

    function generateRandomShapes(text) {
        const words = text.split(' ');
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
        let shapesSVG = '';

        words.forEach(word => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomX = Math.random() * badgeWidth;
            const randomY = Math.random() * badgeHeight;
            const randomSize = Math.random() * 50 + 10;

            if (word.toLowerCase().includes('circle')) {
                shapesSVG += `<circle cx="${randomX}" cy="${randomY}" r="${randomSize / 2}" fill="${randomColor}" opacity="0.5"/>`;
            } else if (word.toLowerCase().includes('rect')) {
                shapesSVG += `<rect x="${randomX}" y="${randomY}" width="${randomSize}" height="${randomSize}" fill="${randomColor}" opacity="0.5"/>`;
            } else if (word.toLowerCase().includes('ellipse')) {
                shapesSVG += `<ellipse cx="${randomX}" cy="${randomY}" rx="${randomSize / 2}" ry="${randomSize / 3}" fill="${randomColor}" opacity="0.5"/>`;
            } else if (word.toLowerCase().includes('x')) {
                shapesSVG += `<text x="${randomX}" y="${randomY}" font-size="${randomSize}" fill="${randomColor}" opacity="0.5">X</text>`;
            } else if (word.toLowerCase().includes('computer')) {
                shapesSVG += `<text x="${randomX}" y="${randomY}" font-size="${randomSize}" fill="${randomColor}" opacity="0.5">💻</text>`;
            } else if (word.toLowerCase().includes('high')) {
                shapesSVG += `<text x="${randomX}" y="${randomY}" font-size="${randomSize}" fill="${randomColor}" opacity="0.5">📈</text>`;
            } else {
                shapesSVG += `<circle cx="${randomX}" cy="${randomY}" r="${randomSize / 2}" fill="${randomColor}" opacity="0.5"/>`;
            }
        });

        return shapesSVG;
    }

    function generateRandomFigures() {
        const colors = ['#FFD700', '#FF4500', '#1E90FF', '#32CD32', '#FF69B4'];
        let figuresSVG = '';

        for (let i = 0; i < 10; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomX = Math.random() * badgeWidth;
            const randomY = Math.random() * badgeHeight;
            const randomSize = Math.random() * 30 + 10;

            if (Math.random() > 0.5) {
                figuresSVG += `<polygon points="${randomX},${randomY - randomSize} ${randomX + randomSize / 2},${randomY + randomSize / 2} ${randomX - randomSize / 2},${randomY + randomSize / 2}" fill="${randomColor}" opacity="0.5"/>`;
            } else {
                figuresSVG += `<polygon points="${randomX},${randomY - randomSize} ${randomX + randomSize},${randomY + randomSize} ${randomX - randomSize},${randomY + randomSize}" fill="${randomColor}" opacity="0.5"/>`;
            }
        }

        return figuresSVG;
    }

    badgeSVG += generateRandomShapes(description);
    badgeSVG += generateRandomShapes(additionalText);
    badgeSVG += generateRandomFigures();

    badgeSVG += `<text x="${badgeWidth / 2}" y="${badgeHeight / 2}" font-size="24" text-anchor="middle" fill="${textColor}" font-family="Arial" font-weight="bold">${description}</text>`;
    badgeSVG += `<text x="${badgeWidth / 2}" y="${badgeHeight / 2 + 40}" font-size="16" text-anchor="middle" fill="${textColor}" font-family="Arial">${additionalText}</text>`;

    badgeSVG += `<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="black" flood-opacity="0.5"/>
                 </filter>`;
    badgeSVG += `<rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" fill="none" stroke="none" filter="url(#shadow)"/>`;

    badgeSVG += `</svg>`;

    document.getElementById('badgePreview').innerHTML = badgeSVG;
    document.getElementById('regenerateMessage').style.display = 'none';
    document.getElementById('downloadSVGButton').style.display = 'block';
    document.getElementById('downloadPNGButton').style.display = 'block';
}

document.getElementById('downloadSVGButton').addEventListener('click', function() {
    const badgeSVG = document.getElementById('badgePreview').innerHTML;
    const blob = new Blob([badgeSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'badge.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('downloadPNGButton').addEventListener('click', function() {
    const badgeSVG = document.getElementById('badgePreview').innerHTML;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const v = new DOMParser().parseFromString(badgeSVG, 'image/svg+xml');
    const svgElement = v.documentElement;

    canvas.width = svgElement.getAttribute('width');
    canvas.height = svgElement.getAttribute('height');

    const img = new Image();
    const svgBlob = new Blob([badgeSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = 'badge.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    img.src = url;
});

document.getElementById('badgeForm').insertAdjacentHTML('beforeend', '<p id="regenerateMessage" style="display:none; color:red;">Please regenerate the badge since parameters have changed.</p>');
document.getElementById('badgeForm').insertAdjacentHTML('afterend', '<button id="downloadSVGButton" style="display:none;">Download SVG</button>');
document.getElementById('badgeForm').insertAdjacentHTML('afterend', '<button id="downloadPNGButton" style="display:none;">Download PNG</button>');

document.getElementById('downloadSVGButton').addEventListener('click', function() {
    const badgeSVG = document.getElementById('badgePreview').innerHTML;
    const blob = new Blob([badgeSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'badge.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('downloadPNGButton').addEventListener('click', function() {
    const badgeSVG = document.getElementById('badgePreview').innerHTML;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const v = new DOMParser().parseFromString(badgeSVG, 'image/svg+xml');
    const svgElement = v.documentElement;

    canvas.width = svgElement.getAttribute('width');
    canvas.height = svgElement.getAttribute('height');

    const img = new Image();
    const svgBlob = new Blob([badgeSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = 'badge.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    img.src = url;
});
