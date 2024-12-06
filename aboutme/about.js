let data;
function displayPortfolio() {
  fetch(`http://localhost:3000/aboutme`)
    .then((response) => response.json())
    .then((a) => {
      const bio = document.getElementById("bio_about");
      const name = document.getElementById("name_about");
      const duration = document.getElementById("responsibilities_about");

      const editBtn = document.getElementById("about__edit_btn");

      if (bio) bio.textContent = a.bio;
      if (name) name.textContent = a.name;
      if (duration) duration.textContent = a.duration;
      editBtn.addEventListener("click", () => {
        const updatedData = {
          bio: prompt("New bio"),
          name: prompt("New name"),
          duration: prompt("New duration"),
        };

        fetch(`http://localhost:3000/aboutme`, {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((updated) => {
            bio.textContent = updated.bio;
            name.textContent = updated.name;
            duration.textContent = updated.duration;
          })
          .catch((err) => {
            console.error("Update error:", err);
          });
      });
    })
    .catch((er) => {
      console.log(`Serverda hatolik bor: ${er}`);
    });
}

displayPortfolio();
