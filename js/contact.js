document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;
  document.querySelectorAll('.error-msg').forEach((el) => (el.style.display = 'none'));

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // 1. Name Validation
  if (name === '') {
    showError('name-error');
    isValid = false;
  }

  // 2. Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '' || !emailRegex.test(email)) {
    showError('email-error');
    isValid = false;
  }

  // 3. Phone Validation (Digits only)
  const phoneRegex = /^\d+$/;
  if (phone === '' || !phoneRegex.test(phone)) {
    showError('phone-error');
    isValid = false;
  }

  // 4. Message Validation
  if (message === '') {
    showError('message-error');
    isValid = false;
  }

  if (isValid) {
    alert('Thank you! Your message has been sent successfully.');
    this.reset();
  }
});

function showError(elementId) {
  document.getElementById(elementId).style.display = 'block';
}