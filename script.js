function startSpeedTest() {
    let speedText = document.getElementById("speed");
    let statusText = document.getElementById("status");
    let arcPath = document.getElementById("speedArc");

    let imageUrl = "https://speed.hetzner.de/10MB.bin"; // Test file
    let startTime, endTime;

    statusText.textContent = "Testing download...";
    
    startTime = new Date().getTime();
    fetch(imageUrl)
        .then(response => response.blob())
        .then(data => {
            endTime = new Date().getTime();
            let duration = (endTime - startTime) / 1000; // Convert to seconds
            let bitsLoaded = data.size * 8; // Convert bytes to bits
            let speedMbps = (bitsLoaded / (duration * 1024 * 1024)).toFixed(1);

            speedText.textContent = speedMbps;
            statusText.textContent = "Download Complete";
            updateArc(speedMbps);
        });

    function updateArc(speed) {
        let angle = Math.min(180, (speed / 100) * 180);
        let x = 10 + 80 * Math.cos((180 - angle) * Math.PI / 180);
        let y = 50 - 40 * Math.sin((180 - angle) * Math.PI / 180);
        arcPath.setAttribute("d", `M10 50 A40 40 0 0 1 ${x} ${y}`);
    }
}
