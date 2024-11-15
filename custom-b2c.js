document.addEventListener('DOMContentLoaded', () => {
  const apiContainer = document.getElementById('api');

  if (!apiContainer) {
    console.error("The 'api' container is missing. Ensure the element with ID 'api' is present in the HTML.");
    return;
  }

  // Set Background Dynamically
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

  // Periodically check for the Azure AD B2C form to be injected
  const checkForForm = setInterval(() => {
    const b2cForm = apiContainer.querySelector('form');

    if (b2cForm) {
      clearInterval(checkForForm); // Stop checking once the form is found

      // Dynamically update labels
      const emailLabel = b2cForm.querySelector('label[for="email"]');
      if (emailLabel) emailLabel.textContent = "{{EMAIL_LABEL}}";

      const passwordLabel = b2cForm.querySelector('label[for="password"]');
      if (passwordLabel) passwordLabel.textContent = "{{PASSWORD_LABEL}}";

      // Add a confirmation checkbox
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

      // Add the confirmation group above the submit button
      const submitButton = b2cForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true; // Initially disable the submit button
        b2cForm.insertBefore(confirmationGroup, submitButton);

        // Add checkbox event listener to toggle submit button
        confirmationCheckbox.addEventListener('change', () => {
          submitButton.disabled = !confirmationCheckbox.checked;
        });
      }

      console.log("B2C form enhanced with dynamic labels and checkbox.");
    } else {
      console.log("Waiting for Azure AD B2C form to load...");
    }
  }, 500); // Check every 500ms
});
