console.log('Setting Background Dynamically...');

// Set Background Dynamically
document.addEventListener('DOMContentLoaded', () => {
  const backgroundLoginImage = false; // Placeholder for the image URL
  const gradientBackground = `linear-gradient(145deg, 
        rgba(207, 174, 168, 0.3) 16%, 
        rgba(139, 188, 188, 0.3) 45%, 
        rgba(100, 193, 195, 0.3) 60%, 
        rgba(73, 184, 161, 0.3) 80%, 
        rgba(80, 178, 104, 0.3) 98%)`;

  document.body.style.background = backgroundLoginImage
    ? `url(${backgroundLoginImage}) no-repeat center/cover`
    : gradientBackground;

  console.log('DOMContentLoaded...');
  const label1 = document.createElement('label');
  label1.appendChild(document.createTextNode('Welcome to the Login page @'));
  document.body.appendChild(label1);

  const apiContainer = document.getElementById('api');

  if (!apiContainer) {
    console.error("The 'api' container is missing. Ensure the element with ID 'api' is present in the HTML.");
    return;
  }

  const checkForForm = setInterval(() => {
    const b2cForm = apiContainer.querySelector('form');

    if (b2cForm) {
      clearInterval(checkForForm);

      const confirmationGroup = document.createElement('div');
      confirmationGroup.className = 'confirmation';

      const confirmationCheckbox = document.createElement('input');
      confirmationCheckbox.type = 'checkbox';
      confirmationCheckbox.id = 'dynamic-confirmation-checkbox';
      confirmationCheckbox.name = 'confirmation';

      const confirmationLabel = document.createElement('label');
      confirmationLabel.htmlFor = 'dynamic-confirmation-checkbox';
      confirmationLabel.textContent = "{{CONFIRMATION_TEXT}}";

      confirmationGroup.appendChild(confirmationCheckbox);
      confirmationGroup.appendChild(confirmationLabel);

      const submitButton = b2cForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        b2cForm.insertBefore(confirmationGroup, submitButton);

        confirmationCheckbox.addEventListener('change', () => {
          submitButton.disabled = !confirmationCheckbox.checked;
        });
      }

      console.log("Confirmation checkbox and label appended successfully.");
    } else {
      console.log("Waiting for Azure AD B2C form to load...");
    }
  }, 500);
});
