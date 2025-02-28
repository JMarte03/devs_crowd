// Profile/Avatar photo preview
const preview = document.getElementById('profile-preview');
const avatarInput = document.getElementById('avatar');

// Makes the src of preview (image) change to whatever value 'avatarInput' (file input) has
avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

