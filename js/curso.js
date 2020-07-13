//Array que contiene las opiniones y usuarios
arrayOpinionUser = [
  { opinion: "Excelente curso. 100% recomendable", user: "María Pérez" },
  {
    opinion: "Muy contento de haber realizado este curso",
    user: "Pablo López",
  },
  {
    opinion:
      "Personal y profesorado muy cualificados. Una experiencia muy positiva",
    user: "Victoria Santos",
  },
  {
    opinion:
      "Por motivos de horarios realicé el curso online y no me arrepiento",
    user: "Miguel Fernández",
  },
  {
    opinion: "Poseen unos precios muy buenos en todas sus modalidades",
    user: "Francisco Gómez",
  },
  {
    opinion:
      "Si quieres aprender de diseño web, éste es tu sitio. Muy buenos profesores y muy atentos",
    user: "Javier Velasco",
  },
];

//Array con los datos necesarios para pintar el calendario
let arrayYears = [
  {
    month: ["Septiembre", "Octubre", "Noviembre", "Diciembre"],
    year: 2020,
    initialDay: 245,
    counter: 0,
  },
  {
    month: ["Enero", "Febrero", "Marzo"],
    year: 2021,
    initialDay: 1,
    counter: 1000,
  },
];

//función que ordena alfabéticamente las provincias
function compare(a, b) {
  if (a.nm < b.nm) return -1;
  if (a.id > b.nm) return 1;
  return 0;
}

/* VALIDACIÓN DEL FORMULARIO
a parte de la validación que proporciona el input type email, hace falta otra serie de comprobaciones para verificar que es un email  */
function validateEmail() {
  let inputemail = document.getElementById("email");
  let email = inputemail.value;
  let dot = email.lastIndexOf(".");
  let at = email.lastIndexOf("@");
  let leng = email.length;
  if (dot < 0 || at > dot || leng - (dot + 1) < 2 || leng - (dot + 1) >= 4) {
    inputemail.style.border = "solid 2px #203354";
    return false;
  } else {
    inputemail.style.border = "";
    return true;
  }
}

//esta función retorna true si el checkbox se encuentra marcado
function validateCheck() {
  if (document.getElementById("checkbox").checked) {
    document.getElementById("checkbox").style.outline = "";
    return true;
  } else {
    document.getElementById("checkbox").style.outline = "solid 2px #203354";
    return false;
  }
}

/* validar es la función que es llamada al dar click al submit del formulario (se encuentra en el onsubmit)
Si onsubmit retorna true el formulario será enviado por petici9ón GET/POST
va a retornar true si tanto validarCheck como validarEmail son true */
function validate() {
  if (validateEmail() && validateCheck()) {
    return true;
  } else {
    return false;
  }
}

/* aceptarcondiciones es la función que se activa al pulsar el aviso legal o la política de privacidad
se pasa el evento asociado para distinguir cual de las dos se pulsa
escribe en el div asociado el mensaje correspondiente */
function aceptarCondiciones(e) {
  let divPrivacity = document.getElementById("div_privacity");
  let imagenCerrar = document.getElementById("close");

  divPrivacity.style.display = "flex";
  divPrivacity.style.flexDirection = "column";
  if (e.target.id === "conditions") {
    divPrivacity.innerHTML =
      "<p>Aquí iría el Aviso legal</p>" + imagenCerrar.outerHTML;
  } else if (e.target.id === "privacity") {
    divPrivacity.innerHTML =
      "<p>Aquí iría la Política de Privacidad</p>" + imagenCerrar.outerHTML;
  }
}

//función que se activa al pulsar el icono x de la política de privacidad. Oculta el contenido del div que muestra el mensaje
function out() {
  document.getElementById("div_privacity").style.display = "none";
}

//changeOption cambia los mensajes de opiniones cada cierto tiempo. Esta función es llamada así misma desde el setTimeOut
function changeOpinion() {
  //bucle for que distribuye los números del 0 a la longitud del array de opiniones de usuario de forma aleatoria
  let i, j, k;
  for (i = arrayOpinionUser.length; i; i--) {
    j = Math.floor(Math.random() * i);
    k = arrayOpinionUser[i - 1];
    arrayOpinionUser[i - 1] = arrayOpinionUser[j];
    arrayOpinionUser[j] = k;
  }
  //se cogen las tres primeras posiciones del array de opiniones con los números aleatorios y se pinta el usuario y su opinión correspondiente
  document.getElementById("user1").innerHTML = arrayOpinionUser[0].user;
  document.getElementById("user2").innerHTML = arrayOpinionUser[1].user;
  document.getElementById("user3").innerHTML = arrayOpinionUser[2].user;
  document.getElementById("opinion1").innerHTML = arrayOpinionUser[0].opinion;
  document.getElementById("opinion2").innerHTML = arrayOpinionUser[1].opinion;
  document.getElementById("opinion3").innerHTML = arrayOpinionUser[2].opinion;
  setTimeout(function () {
    changeOpinion();
  }, 5000);
}

//socialNetwork es la función que se encarga de redirigir a las diferentes redes sociales
function socialNetworks(e) {
  if (e.target.src === "http://127.0.0.1:5500/assets/img/facebook.png")
    window.location.href = "https://www.facebook.com/iunit.madrid/";
  else if (e.target.src === "http://127.0.0.1:5500/assets/img/instagram.png")
    window.location.href = "https://www.instagram.com/iunit_madrid/";
  else if (e.target.src === "http://127.0.0.1:5500/assets/img/twitter.png")
    window.location.href = "https://twitter.com/IUNIT_madrid";
}

//Esta función da el cuerpo del calendario. Pinta la tabla para los meses elegidos
function structure(num, arrayMonth, counter) {
  var arrayDay = ["Lun", "Mar", "Mie", "Juv", "Vie", "Sab", "Dom"];
  //Bucle que va desde 0 hasta la longitud del array-1. Es decir, es el número de meses
  for (m = 0; m <= num; m++) {
    //Mes
    let month = document.createElement("DIV");
    month.className = "month";
    document.getElementById("schedule").appendChild(month);
    //Tabla
    let tableMonth = document.createElement("TABLE");
    tableMonth.className = "table_month";
    month.appendChild(tableMonth);
    //Título
    let title = document.createElement("CAPTION");
    title.className = "month_title";
    title.innerText = arrayMonth[m];
    tableMonth.appendChild(title);
    //Cabecera
    let headboard = document.createElement("THEAD");
    headboard.className = "headboard";
    tableMonth.appendChild(headboard);
    let row = document.createElement("TR");
    headboard.appendChild(row);
    for (d = 0; d < 7; d++) {
      let day = document.createElement("TH");
      day.innerText = arrayDay[d];
      row.appendChild(day);
    }
    //Cuerpo
    let bodyTable = document.createElement("TBODY");
    bodyTable.className = "table_body";
    tableMonth.appendChild(bodyTable);
    for (f = 0; f < 6; f++) {
      let row = document.createElement("TR");
      bodyTable.appendChild(row);
      for (d = 0; d < 7; d++) {
        let day = document.createElement("TD");
        day.setAttribute("id", "td" + counter);
        counter++;
        day.innerText = "";
        row.appendChild(day);
      }
    }
  }
}

//Función que asigna los días y los añade al calendario
function number(beginning, startDay, year) {
  for (let i = startDay; i < 367; i++) {
    let date = dateByDay(year, i);
    let month = date.getMonth();
    let modifiedMonth = beginning === "Septiembre" ? month - 8 : month + 4;
    let select_tabla = document.getElementsByClassName("table_month")[
      modifiedMonth
    ];
    let day = date.getDate();

    let weekday = date.getDay();
    if (day == 1) {
      var mon = 0;
    }
    let monthPrint = mon;
    //retraso un día cada día
    let weekdayPrint = weekday - 1;
    // los que empiezan el día uno en domingo van una fila para abajo
    if (weekdayPrint === -1 && day === 1) {
      monthPrint++;
      mon++;
    }
    //si era un domingo, hay que subirlo de fila
    if (weekdayPrint === -1) {
      weekdayPrint = 6;
      monthPrint--;
    }
    try {
      select_tabla.children[2].children[monthPrint].children[
        weekdayPrint
      ].innerText = day;
    } catch (error) {}
    if (weekday == 6) {
      mon = mon + 1;
    }
  }
}

function dateByDay(year, day) {
  var date = new Date(year, 0);
  return new Date(date.setDate(day));
}

window.onload = function () {
  changeOpinion();
  //se realiza una petición para coger el json que contienen las provincias que serán usadas en el desplegable
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "./js/provincias.json", true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //transfomamos el tipo .json en un array y lo almacenamos en una variable
      let datos = JSON.parse(this.responseText);
      let sectionCity = document.getElementById("city");
      datos.sort(compare);
      //bucle que va a crear tantos elementos de tipo option que se añaden al select como elementos de la matriz que contiene las provincias
      for (let i = 0; i < datos.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", datos[i].nm);
        option.innerHTML = datos[i].nm;
        sectionCity.appendChild(option);
      }
    }
  };

  /* Bucle que recorre el array necesario para pintar el calendario. Es necesario que este bucle esté dentro de la función
  window.onload ya que llama a la función structure, y ésta contiene un document.getElementById() que es necesario
  que este precargado antes */
  for (let i = 0; i < arrayYears.length; i++) {
    structure(
      arrayYears[i].month.length - 1,
      arrayYears[i].month,
      arrayYears[i].counter
    );
    number(
      arrayYears[i].month[0],
      arrayYears[i].initialDay,
      arrayYears[i].year
    );
  }

  /* Bucle que va a pintar los mensajes al pasar por los elementos marcados del calendario
  Están asociados a hover mediante css para que se muestren al pasar por encima y desaparezcan al salir */
  let arrayStartFinish = [
    document.getElementById("td14"),
    document.getElementById("td137"),
    document.getElementById("td1016"),
    document.getElementById("td1096"),
  ];
  for (let i = 0; i < arrayStartFinish.length; i++) {
    let span = document.createElement("span");

    if (arrayStartFinish[i].id === "td14") {
      span.innerText = "Comienzo de las clases";
      arrayStartFinish[i].appendChild(span);
    } else if (arrayStartFinish[i].id === "td137") {
      span.innerText = "Final curso PRESENCIAL";
      arrayStartFinish[i].appendChild(span);
    } else if (arrayStartFinish[i].id === "td1016") {
      span.innerText = "Final curso SEMI PRESENCIAL";
      arrayStartFinish[i].appendChild(span);
    } else {
      span.innerText = "Final curso ONLINE";
      arrayStartFinish[i].appendChild(span);
    }
  }
};
