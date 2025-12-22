import type { Persona } from "@/types/persona"
import { mockPersonas } from "@/mock/personas"
import { getRuntimeConfig } from "@/services/runtimeConfig"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

async function getConfig() {
  return await getRuntimeConfig()
}

export const personasService = {
  async getAll(): Promise<Persona[]> {
    const { apiUrl, useMock } = await getConfig()

    if (useMock || !apiUrl) {
      await delay(300)
      return [...mockPersonas]
    }

    const res = await fetch(`${apiUrl}/consultar/clientes`)
    return await res.json()
  },

  async getById(id: string): Promise<Persona | undefined> {
    const { apiUrl, useMock } = await getConfig()

    if (useMock || !apiUrl) {
      await delay(200)
      return mockPersonas.find(p => p.id === id)
    }

    const res = await fetch(`${apiUrl}/consultar/cliente/${id}`)
    return await res.json()
  },

  async create(data: Omit<Persona, 'id'>): Promise<Persona> {
    const { apiUrl, useMock } = await getConfig()

    if (useMock || !apiUrl) {
      await delay(300)
      const newPersona: Persona = { ...data, id: crypto.randomUUID() }
      mockPersonas.push(newPersona)
      return newPersona
    }

    const res = await fetch(`${apiUrl}/registrar/cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    return await res.json()
  },

  async update(id: string, data: Partial<Persona>): Promise<Persona> {
    const { apiUrl, useMock } = await getConfig()

    if (useMock || !apiUrl) {
      await delay(300)
      const index = mockPersonas.findIndex(p => p.id === id)
      if (index === -1) throw new Error("Persona no encontrada")

      const existing = mockPersonas[index]
      if (!existing) throw new Error("Persona no encontrada")

      const updated: Persona = { ...existing, ...data, id: existing.id }
      mockPersonas[index] = updated
      return updated
    }

    const res = await fetch(`${apiUrl}/actualizar/cliente/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    return await res.json()
  },

  async delete(id: string): Promise<void> {
    const { apiUrl, useMock } = await getConfig()

    if (useMock || !apiUrl) {
      await delay(200)
      const index = mockPersonas.findIndex(p => p.id === id)
      if (index !== -1) mockPersonas.splice(index, 1)
      return
    }

    await fetch(`${apiUrl}/eliminar/cliente/${id}`, { method: 'DELETE' })
  }
}