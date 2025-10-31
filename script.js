let opcions = [];

fetch('https://karengarrido1801.github.io/programacion3-tarea6/menu.json')
  .then(res => {
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    return res.json();
})
  .then(data => {
    console.log('menu:', data);
    configurarMenu(data);
})
  .catch(error => {
    console.error('No se pudo cargar menu.json:', error);
});

function configurarMenu(menuOptions) {
    const menu = document.getElementById("menu");
    
    options = menuOptions;
    let template = "";

    for(let option of options) {
        template += `<li onmouseover="desplegarSubMenu('${option.id}')">${option.title}</li>\n`;
    }

    template += `<li id="menu-desplegable"></li>`;
    menu.innerHTML = template;
    ocultarSubMenu();
}

function desplegarSubMenu(id){
    const subMenu = document.getElementById("menu-desplegable");
    subMenu.style.display = "none";
    let menuOptions = options.filter(x => x.id === id);
    let subOptions = Array.from(menuOptions[0]["children"] ?? []);

    if(subOptions.length > 0) {
        let optionsTemplate = "";
        for(let option of subOptions) {
            optionsTemplate += `<li id="${option.id}"> ${option.title} ....... ${option.price}</li>\n`;
        }

        let subMenuTemplate = `<ul>${optionsTemplate}</ul>`;
        subMenu.innerHTML = subMenuTemplate;
        subMenu.style.display = "block";
    }
    
}

function ocultarSubMenu(){
    const subMenu = document.getElementById("menu-desplegable");
    const  process = (Event) => {Event.target.style.display ="none"};

    subMenu.removeEventListener("mouseleave", process);
    subMenu.addEventListener("mouseleave", process);
}

