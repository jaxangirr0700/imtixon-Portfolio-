let data;
function displayPortfolio() {
  fetch("http://localhost:3000/setup")
    .then((response) => response.json()) // JSON formatda ma'lumotni olish
    .then((a) => {
      // Ma'lumotni olishdan keyin, har bir elementni tekshirib chiqamiz
      const theme = document.getElementById("setup_theme");
      const language = document.getElementById("setup_language");
      const primaryColor = document.getElementById("setup_primarycolor");
      const contactEmail = document.getElementById("setup_contactemail");
      const socialLinks = document.getElementById("setup_socialLinks");
      const editBtn = document.getElementById("setup__edit_btn");
      const deleteBtn = document.getElementById("setup__delete_btn");
      const resetBtn = document.getElementById("setup__reset_btn");
      const createBtn = document.getElementById("setup__create_btn");

      if (theme) theme.textContent = a.theme;
      if (language) language.textContent = a.language;
      if (primaryColor) primaryColor.textContent = a.primaryColor;
      if (contactEmail) contactEmail.textContent = a.contactEmail;
      if (socialLinks) socialLinks.textContent = a.socialLinks;
      if (socialLinks) socialLinks.textContent = a.socialLinks.twitter;
      editBtn.addEventListener("click", () => {
        const updatedData = {
          theme: prompt("New Theme"),
          language: prompt("Uzbek"),
          primaryColor: prompt("#ff5733"),
          contactEmail: prompt("newemail@example.com"),
          socialLinks: {
            twitter: prompt("https://twitter.com/newuser"),
          },
        };

        fetch(`http://localhost:3000/setup`, {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((updated) => {
            theme.textContent = updated.theme;
            language.textContent = updated.language;
            primaryColor.textContent = updated.primaryColor;
            contactEmail.textContent = updated.contactEmail;
            socialLinks.textContent = updated.socialLinks.twitter;
          })
          .catch((err) => {
            console.error("Update error:", err);
          });
      });
    //   deleteBtn.addEventListener("click", () => {
    //     console.log("del");
    //   });
    //   resetBtn.addEventListener("click", () => {
    //     console.log("resetBtn");
    //   });

    //   createBtn.addEventListener("click", () => {
    //     const newSetup = {
    //       theme: "New Setup Theme",
    //       language: "English",
    //       primaryColor: "#ffffff",
    //       contactEmail: "newcontact@example.com",
    //       socialLinks: {
    //         twitter: "https://twitter.com/newsetup",
    //       },
    //     };

    //     fetch("http://localhost:3000/setup", {
    //       method: "POST",
    //       body: JSON.stringify(newSetup),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //   });
    })
    .catch((er) => {
      console.log(`Serverda hatolik bor: ${er}`);
    });
}

displayPortfolio();
