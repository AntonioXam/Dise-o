document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const animatedBox = document.getElementById('animatedBox');

    video.addEventListener('timeupdate', function() {
        if (video.currentTime >= 3) {
            animatedBox.classList.add('active');
        }
    });
});
