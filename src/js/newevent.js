
import { post } from "./services.js";


export function setupNewEvent() {
  const form = document.getElementById("event-form");
  const msg = document.getElementById("form-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newEvent = {
      name: document.getElementById("name").value.trim(),      
      description: document.getElementById("description").value.trim(),
      date: document.getElementById("date").value,
      capacity: document.getElementById("capacity").value.trim(),  // ✅ AQUI VA
    };

    try {
      const res = await post("http://localhost:3001/events", newEvent);
      console.log("Respuesta del POST:", res);
      msg.textContent = "✅ Usuario agregado exitosamente";
      msg.style.color = "green";
      form.reset();
    } catch (err) {
      console.error("Error en el POST:", err); // 👈 esto te muestra si falló
      msg.textContent = "❌ Error al agregar usuario";
      msg.style.color = "red";
    }
  });
}

