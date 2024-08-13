document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const navLinks = document.querySelectorAll("nav a");
  const defaultPage = "about"; // Set the default page

  // Function to load content based on file name
  function loadContent(file) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.querySelector("main").innerHTML = xhr.responseText;

        // After loading content, initialize icon event listeners
        initializeIcons();
      }
    };
    xhr.send();
  }

  // Function to set active link
  function setActive(activeLink) {
    navLinks.forEach((link) => {
      link.classList.remove("active", "font-bold");
    });
    activeLink.classList.add("active", "font-bold");
  }

  // Function to initialize icons after content is loaded
  function initializeIcons() {
    const githubIcon = document.getElementById("github-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    const emailIcon = document.getElementById("email-icon");
    const clipboardMessage = document.getElementById("clipboard-message");

    if (githubIcon) {
      githubIcon.addEventListener("click", function () {
        window.open("https://github.com/yousbot", "_blank");
      });
    }

    if (linkedinIcon) {
      linkedinIcon.addEventListener("click", function () {
        window.open(
          "https://www.linkedin.com/in/sbaiidrissiyoussef/",
          "_blank"
        );
      });
    }

    if (emailIcon) {
      emailIcon.addEventListener("click", function () {
        const email = "sbaiidrissiyoussef@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
          // Hide the email icon and show the clipboard message
          emailIcon.classList.add("hidden");
          clipboardMessage.classList.remove("hidden");

          // After 2 seconds, hide the clipboard message and show the email icon again
          setTimeout(() => {
            clipboardMessage.classList.add("hidden");
            emailIcon.classList.remove("hidden");
          }, 2000);
        });
      });
    }
  }

  // Load the default page and set the "About" link as active
  const defaultLink = document.querySelector(`a[href="#${defaultPage}"]`);
  setActive(defaultLink);
  loadContent(`${defaultPage}.html`);

  // Event listeners for the navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      setActive(link);

      const targetFile = link.getAttribute("href").substring(1) + ".html";
      loadContent(targetFile);
    });
  });

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
