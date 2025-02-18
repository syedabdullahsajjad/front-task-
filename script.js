// Load the JSON data
let jsonData = null;
fetch('sample.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        initFloorplan();
    });


function initFloorplan() {
    const canvas = document.getElementById('floorplan-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    jsonData.Regions.forEach(region => {
        ctx.beginPath();
        ctx.moveTo(region[0].X, region[0].Y);
        ctx.lineTo(region[1].X, region[1].Y);
        ctx.stroke();
    });

    // Draw doors
    jsonData.Doors.forEach(door => {
        ctx.beginPath();
        ctx.arc(door.Location.X, door.Location.Y, door.Width / 2, 0, 2 * Math.PI);
        ctx.stroke();
    });

    // Draw furniture
    jsonData.Furnitures.forEach(furniture => {
        ctx.beginPath();
        ctx.rect(furniture.MinBound.X, furniture.MinBound.Y, furniture.MaxBound.X - furniture.MinBound.X, furniture.MaxBound.Y - furniture.MinBound.Y);
        ctx.stroke();

        // Add hover feature
        canvas.addEventListener('mousemove', event => {
            const x = event.offsetX;
            const y = event.offsetY;
            if (x >= furniture.MinBound.X && x <= furniture.MaxBound.X && y >= furniture.MinBound.Y && y <= furniture.MaxBound.Y) {
                ctx.font = '12px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(furniture.equipName, x, y);
            }
        });
    });

    // Add navigation and zoom features
    let scaleFactor = 1;
    let translateX = 0;
    let translateY = 0;

    canvas.addEventListener('wheel', event => {
        event.preventDefault();
        scaleFactor += event.deltaY * 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFloorplan();
    });

    canvas.addEventListener('mousedown', event => {
        event.preventDefault();
        translateX = event.offsetX;
        translateY = event.offsetY;
        canvas.addEventListener('mousemove', event => {
            event.preventDefault();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            translateX = event.offsetX;
            translateY = event.offsetY;
            drawFloorplan();
        });
    });

    function drawFloorplan() {
        ctx.save();
        ctx.translate(translateX, translateY);
        ctx.scale(scaleFactor, scaleFactor);

        // Draw regions (walls)
        jsonData.Regions.forEach(region => {
            ctx.beginPath();
            ctx.moveTo(region[0].X, region[0].Y);
            ctx.lineTo(region[1].X, region[1].Y);
            ctx.stroke();
        });

        // Draw doors
        jsonData.Doors.forEach(door => {
            ctx.beginPath();
            ctx.arc(door.Location.X, door.Location.Y, door.Width / 2, 0, 2 * Math.PI);
            ctx.stroke();
        });

        // Draw furniture
        jsonData.Furnitures.forEach(furniture => {
            ctx.beginPath();
            ctx.rect(furniture.MinBound.X, furniture.MinBound.Y, furniture.MaxBound.X - furniture.MinBound.X, furniture.MaxBound.Y - furniture.MinBound.Y);
            ctx.stroke();
        });

        ctx.restore();
    }
}