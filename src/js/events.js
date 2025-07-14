import { get, deleteById, update } from "./services.js";

export async function setupEvents() {
  const ul = document.getElementById("event-list");
  if (!ul) return;

  ul.innerHTML = "";

  const header = document.createElement("li");
  header.classList.add("event-header");
  header.innerHTML = `
    <span>Foto</span>
    <span>Name</span>
    <span>Description</span>
    <span>Capacity</span>
    <span>Date</span>
    <span>Acciones</span>
  `;
  ul.appendChild(header);

  const events = await get("http://localhost:3001/events");

  // 🧠 Obtener Event logueado
  const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
  const isAdmin = currentUser?.role === "admin";

  events.forEach((event) => {
    const li = document.createElement("li");
    li.classList.add("event-row");

    // 🔐 Si es admin, muestra botones; si no, deja el espacio vacío
    const actionsHtml = isAdmin
      ? `
        <button class="edit-btn" data-id="${event.id}">✏️</button>
        <button class="delete-btn" data-id="${event.id}">🗑️</button>
      `
      : `<span class="no-actions">Sin permisos</span>`;

    li.innerHTML = `
      <span><img src="imgs/csgo.jpeg" alt="foto" class="event-avatar"></span>
      <span>${event.name}</span>
      <span>${event.description}</span>
      <span>${event.capacity}</span>
      <span>${event.date}</span>
      <span class="actions">
        ${actionsHtml}
      </span>
    `;
    ul.appendChild(li);
  });

  // Eventos click
  ul.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;

    // 🔒 Verificación extra de rol por si intentan usar el DOM o consola
    if (!isAdmin) {
      return Swal.fire("Sin permisos", "No puedes hacer esta acción", "error");
    }

    // 🗑️ Eliminar
    if (e.target.classList.contains("delete-btn")) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C0392B",
        cancelButtonColor: "#2C3E50",
        confirmButtonText: "Sí, eliminarlo"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const success = await deleteById("http://localhost:3001/events", id);
          if (success) {
            Swal.fire("¡Eliminado!", "El Event ha sido eliminado.", "success");
            setupEvents();
          } else {
            Swal.fire("Error", "No se pudo eliminar el Event.", "error");
          }
        }
      });
    }

    // ✏️ Editar
    if (e.target.classList.contains("edit-btn")) {
      const event = events.find((u) => u.id == id);

      const { value: formValues } = await Swal.fire({
        title: "Editar Event",
        html: `
          <input id="swal-name" class="swal2-input" placeholder="Name" value="${event.name}">
          <input id="swal-description" class="swal2-input" placeholder="Description" value="${event.description}">
          <input id="swal-capacity" class="swal2-input" placeholder="Capacity" value="${event.capacity}">
          <input type="date" id="swal-date" class="swal2-input" placeholder="Date" value="${event.date}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar cambios",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          return {
            name: document.getElementById("swal-name").value.trim(),
            description: document.getElementById("swal-description").value.trim(),
            capacity: document.getElementById("swal-capacity").value.trim(),
            date: document.getElementById("swal-date").value.trim(),
            
          };
        }
      });

      if (formValues) {
        try {
          await update("http://localhost:3001/events", id, formValues);
          Swal.fire("¡Actualizado!", "Los datos del Event han sido modificados.", "success");
          setupEvents();
        } catch (error) {
          Swal.fire("Error", "No se pudo actualizar el Event.", "error");
        }
      }
    }
  });
}
