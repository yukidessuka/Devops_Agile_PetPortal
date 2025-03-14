document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".carousel img");
    const upButton = document.querySelector(".carousel-controls .up");
    const downButton = document.querySelector(".carousel-controls .down");

    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }

    upButton.addEventListener("click", function () {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    });

    downButton.addEventListener("click", function () {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    });

    showImage(currentIndex);
});
