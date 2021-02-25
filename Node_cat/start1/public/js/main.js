const inputEl = document.querySelectorAll("input");
const answEl = document.querySelector(".answ");

inputEl.forEach(e => {
  e.addEventListener("input", ev => {
    axios.post('/', { region: ev.target.defaultValue })
      .then(r => {
        let str = "";

        r.data.country.forEach(el => {
          str = `${str}<div class="country ${el.code} ">
           <div class="country-name"> 
           <h1>${el.name}</h1>
            <img src="${el.flag}" class= "flag" alt="${el.flag}">
            </div>
            <div class="catAll"></div>
            </div>`;
        });

        answEl.innerHTML = str;

        const countryEl = document.querySelectorAll('.country');

        countryEl.forEach(el => {
          r.data.cat.forEach(e => {
            if (el.classList[1] === e.code) {

              el.classList.add("none-delete");

              el.querySelector('.catAll').insertAdjacentHTML('beforeend', `
                                                    <div class="cat ${e.name}">
                                                       <div class="cat-name">  <h2>${e.name}<h2></div>
                                                        <img src="${e.img}" class="cat-img">
                                                    </div>
              `);
            };
          });
          if (el.classList[2] !== "none-delete") {
            el.remove();
          }
        });
      })
      .catch(e => answEl.innerHTML = e);
  });
});



