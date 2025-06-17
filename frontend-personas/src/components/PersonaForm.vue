<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Registrar Persona</h2>

      <form @submit.prevent="registrarPersona" class="form-body">
        <div class="form-group">
          <label>Nombre</label>
          <input
            v-model="persona.name"
            type="text"
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>

        <div class="form-group">
          <label>Edad</label>
          <input
            v-model="persona.age"
            type="number"
            placeholder="Ej: 28"
            required
          />
        </div>

        <button type="submit">Registrar</button>
      </form>

      <div v-if="mensaje" :class="['alert', esExito ? 'success' : 'error']">
        {{ mensaje }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const persona = reactive({
  name: '',
  age: ''
})

const mensaje = ref('')
const esExito = ref(false)

const registrarPersona = async () => {
  try {
    await axios.post('http://localhost:4000/api/personas', persona)
    mensaje.value = '✅ Persona registrada correctamente'
    esExito.value = true
    persona.name = ''
    persona.age = ''
  } catch (error) {
    mensaje.value =
      '❌ Error al registrar: ' + (error.response?.data?.error || error.message)
    esExito.value = false
  }

  setTimeout(() => {
    mensaje.value = ''
  }, 3000)
}
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f6f8;
}

.form-card {
  background: white;
  padding: 30px 25px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 15px;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.alert {
  margin-top: 20px;
  padding: 12px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
