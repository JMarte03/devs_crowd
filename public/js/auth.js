// Select all close buttons
document.querySelectorAll('.close-err').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.style.display = "none"; // Hide the parent div
    });
});
