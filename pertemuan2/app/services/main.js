import { fetchData } from "./core.js";

document.addEventListener("DOMContentLoaded", () => {
  const alertAdmin = document.getElementById("alertAdmin");
  if (!alertAdmin) return;

  alertAdmin.classList.remove("d-none");

  setTimeout(() => {
    alertAdmin.classList.add("d-none");
  }, 3000);
  fetchData("https://api.myquran.com/v2/quran/surat/semua").then((data) => {
    console.log(data);
    const surat = document.getElementById("surat");
    surat.textContent = data.data.length;
  });

  fetchData("https://api.myquran.com/v2/hadits/perawi/").then((data) => {
    console.log(data);
    const tbody = document.getElementById("tbody");
    data.data.forEach((item, index) => {
      tbody.innerHTML += `
        <tr> 
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.slug}</td>
        <td>${item.total}</td>
        <td>${
          index % 2 === 0
            ? `<span class="badge text-bg-info text-dark">Masyhur</span>
`
            : `<span class="badge text-bg-primary text-white">masyhur</span>
`
        }</td>
        </tr>
        `;
    });
  });

  fetchData("https://api.myquran.com/v2/husna/semua/").then((data) => {
    console.log(data);
    const husna = document.getElementById("husna");
    husna.textContent = data.data.length;
  });

  fetchData("https://api.myquran.com/v2/quran/juz/semua/").then((data) => {
    console.log(data);
    const juz = document.getElementById("juz");
    juz.textContent = data.data.length;
  });

  fetchData("https://api.myquran.com/v2/hadits/arbain/semua").then((data) => {
    console.log(data);
    const hadist = document.getElementById("hadist");
    hadist.textContent = data.data.length;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const alertStaff = document.getElementById("alertStaff");
  if (!alertStaff) return;
  alertStaff.classList.remove('d-none')
  setTimeout(() => {
    alertStaff.classList.add('d-none')
  }, 2500);
  fetchData("https://api.myquran.com/v2/quran/surat/semua").then(data => {
    console.log(data);
    const table = document.getElementById('table-surat')
    data.data.slice(0, 10).forEach((item, index  ) => {
        table.innerHTML += `
        <tr> 
        <td>${index + 1}</td>
        <td>${item.name_id}</td>
        <td>${item.name_long}</td>
        <td>${item.translation_id}</td>
        <td><span class="badge text-bg-warning text-dark">${item.number_of_verses}</span></td>
        </tr>
        `
    });
  })
});
