const loadBtn = () => {
  const url = " https://openapi.programming-hero.com/api/phero-tube/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => createBtn(data.categories));
};
const loadVideo = (id) => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => showVideos(data, id));
};
function showAll() {
    const tog = document.querySelector('.tog').classList.add("bg-[#FF1F3D]", "text-white");
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      data.videos.forEach((video) => {
        createVideo(
          video.title,
          video.authors[0].profile_name,
          video.authors[0].verified,
          video.others.views,
          video.thumbnail
        );
      });
    });
}
showAll()
const createBtn = (btns) => {
  // console.log(btns)
  const parent = document.getElementById("category");
  for (const btn of btns) {
    const div = document.createElement("div");
    div.innerHTML = `
            <button class="btn text-xl category tog">${btn.category}</button>
        `;
    parent.appendChild(div);
  }
  const cat = document.querySelectorAll(".category");
  cat.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const t = btns.find((el) => el.category === e.target.innerText);
      document.getElementById("video-container").innerHTML = "";
      loadVideo(t.category_id);
    });
  });
  const toggles = document.querySelectorAll(".tog");

  toggles.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Remove 'bg-red-400' class from all buttons
      toggles.forEach((btn) => btn.classList.remove("bg-[#FF1F3D]", "text-white"));

      // Add 'bg-red-400' class only to the clicked button
      e.target.classList.add("bg-[#FF1F3D]", "text-white");
    });
  });
};
const showVideos = (data, id) => {
  data.videos.forEach((video) => {
    video.category_id === id
      ? createVideo(
          video.title,
          video.authors[0].profile_name,
          video.authors[0].verified,
          video.others.views,
          video.thumbnail
        )
      : "";
  });
  // console.log(data.videos[0].authors[0]);
};
const createVideo = (title, name, verified, views, image) => {
  const parent = document.getElementById("video-container");
  const card = document.createElement("div");
  card.innerHTML = `
        <div class="card bg-base-100 border border-1 border-[#8080803d]">
                <figure>
                  <img
                    src="${image}" class="w-full h-[200px] object-cover"/>
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${title}</h2>
                  <p>${name}</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">${views}</button>
                  </div>
                </div>
              </div>
    `;
  parent.appendChild(card);
};
loadBtn();
