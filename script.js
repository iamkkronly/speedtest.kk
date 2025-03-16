// script.js
document.getElementById('start-test').addEventListener('click', function() {
    const speedWheel = document.querySelector('.speed-wheel');
    const downloadSpeedElement = document.getElementById('download-speed');

    // Start the speed wheel animation
    speedWheel.style.animationPlayState = 'running';

    // Measure download speed
    measureDownloadSpeed().then(speed => {
        // Stop the speed wheel animation
        speedWheel.style.animationPlayState = 'paused';

        // Display the download speed
        downloadSpeedElement.textContent = speed.toFixed(2);
    });
});

function measureDownloadSpeed() {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const fileSizeInBytes = 10000000; // 10MB file
        const fileUrl = `https://example.com/file?size=${fileSizeInBytes}`; // Replace with a real file URL

        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileUrl, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const endTime = Date.now();
                const durationInSeconds = (endTime - startTime) / 1000;
                const speedInMbps = (fileSizeInBytes * 8) / (durationInSeconds * 1000000);
                resolve(speedInMbps);
            } else {
                reject(new Error('Failed to load file'));
            }
        };
        xhr.onerror = function() {
            reject(new Error('Network error'));
        };
        xhr.send();
    });
}
