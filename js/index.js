// ---------------- PLUGINS ---------------------
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});
// ---------------- FUNCIONES --------------------
const menues = [];      // Array de Menus

// Carga de las opciones dentro de Horario.
const cargarHorario = ()=>{
    let select = document.querySelector("#horario-txt");
    let optNull = document.createElement("option");
    optNull.innerText = "Seleccionar";
    let optDesayuno = document.createElement("option");
    optDesayuno.innerText = "Desayuno";
    let optAlmuerzo = document.createElement("option");
    optAlmuerzo.innerText = "Almuerzo";
    let optOnce = document.createElement("option");
    optOnce.innerText = "Once";
    let optCena = document.createElement("option");
    optCena.innerText = "Cena";

    select.appendChild(optNull);
    select.appendChild(optDesayuno);
    select.appendChild(optAlmuerzo);
    select.appendChild(optOnce);
    select.appendChild(optCena);
}

// Terminar comprobacion
const comprobar = (t)=>{
    if(t.nombre==""){
        Swal.fire('EL campo "Nombre" está vacío.','','warning');
    }else if(t.horario=="Seleccionar"){
        Swal.fire('El campo "Horario" no ha sido seleccionado.','','warning');
    }else if(t.valor!=0){
        if(t.horario=="Desayuno" && (t.valor<1000 || t.valor>10000)){
            Swal.fire('El Valor debe ser entre 1000 y 10000 pesos.','','warning');
        }else if(t.horario=="Almuerzo" && (t.valor<10000 || t.valor>20000)){
            Swal.fire('El Valor debe fluctuar entre los 10000 a 20000 pesos.','','warning');
        }else if(t.horario=="Once" && (t.valor<5000 || t.valor>15000)){
            Swal.fire('El Valor debe fluctuar entre los 5000 a los 15000 pesos.','','warning');
        }else if(t.horario=="Cena" && t.valor<15000){
            Swal.fire('El Valor debe ser mayor a los 15000 pesos.','','warning');
        }else{
            menues.push(t);
            Swal.fire("Registro de Menú Realizado","","success")
        }
    }else{
        Swal.fire('El Valor es nulo.','','warning');
    }
}

// Cargas elementos en la tabla
const cargarTabla = ()=>{
  let tbody = document.querySelector("#tabla-tbody");
  tbody.innerText = "";
  for(let i=0; i < menues.length; ++i){
    let m = menues[i];
    let tr = document.createElement("tr");
    let tdNro = document.createElement("td");
    tdNro.innerText = (i+1);
    let tdNombre = document.createElement("td");
    tdNombre.innerText = m.nombre;
    let tdHorario = document.createElement("td");
    tdHorario.innerText = m.horario;
    let tdValor = document.createElement("td");
    tdValor.innerText = m.valor;
    let tdDesc = document.createElement("td");
    tdDesc.innerHTML = m.descripcion;
    let tdOferta = document.createElement("td");
    
    let icono = document.createElement("i");
    // Aprovechando la flexibilidad de JS.
    if(((m.horario == "Desayuno") && (m.valor < 5000)) ||
        ((m.horario == "Almuerzo") && (m.valor < 15000)) ||
        ((m.horario == "Once") && (m.valor < 10000)) ||
        ((m.horario == "Cena") && (m.valor < 20000))){
      icono.classList.add("fas","fa-check","text-success","fa-3x");
    }else{
      icono.classList.add("fas","fa-times","text-danger","fa-3x");
    }
    tdOferta.classList.add("text-center");
    tdOferta.appendChild(icono);

    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdHorario);
    tr.appendChild(tdValor);
    tr.appendChild(tdDesc);
    tr.appendChild(tdOferta);

    tbody.appendChild(tr);
  }
};

// ---------------- PRINCIPAL --------------------
window.addEventListener("load", ()=>{
    cargarHorario();
});

document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let horario = document.querySelector("#horario-txt").value;
    let valor = document.querySelector("#valor-txt").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    
    let menu = {};
    menu.nombre = nombre;
    menu.horario = horario;
    menu.valor = valor;
    menu.descripcion = descripcion;

    comprobar(menu);

    cargarTabla();
});