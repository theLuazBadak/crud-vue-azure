<script setup lang="ts">
import { ref } from 'vue'
import { getSasUrl } from '@/services/uploadService'

const file = ref<File | null>(null)
const uploading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files.length) return

  const selectedFile = target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    error.value = null
    success.value = false
  }
}

async function upload() {
  if (!file.value) {
    error.value = 'Selecciona un archivo.'
    return
  }

  uploading.value = true
  error.value = null

  try {
    const selectedFile = file.value
    const { uploadUrl } = await getSasUrl(selectedFile.name)

    // Aquí SOLO probamos SAS (aún no subimos)
    console.log('SAS OK:', uploadUrl)

    success.value = true
  } catch (e) {
    error.value = 'Error obteniendo SAS.'
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Upload Excel</h1>

    <div class="p-4 border rounded-lg bg-white space-y-4 max-w-xl">
      <div>
        <label class="block text-sm font-medium mb-1">
          Archivo Excel (.xlsx)
        </label>
        <input
          type="file"
          accept=".xlsx"
          @change="onFileChange"
          class="block w-full text-sm"
        />
      </div>

      <button
        @click="upload"
        :disabled="uploading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {{ uploading ? 'Obteniendo permiso…' : 'Solicitar permiso (SAS)' }}
      </button>

      <p v-if="error" class="text-sm text-red-600">
        {{ error }}
      </p>

      <p v-if="success" class="text-sm text-green-600">
        SAS obtenido correctamente. Revisa la consola.
      </p>
    </div>
  </div>
</template>