const API_URL = 'http://localhost:3000/api'

export async function startSimulation() {
  const response = await fetch(`${API_URL}/simulation/start`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to start simulation')
  }

  return response.json()
}

export async function stopSimulation() {
  const response = await fetch(`${API_URL}/simulation/stop`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to stop simulation')
  }

  return response.json()
}

export async function resetSimulation() {
  const response = await fetch(`${API_URL}/simulation/reset`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to reset simulation')
  }

  return response.json()
}

export async function getSimulationStatus() {
  const response = await fetch(`${API_URL}/simulation/status`)

  if (!response.ok) {
    throw new Error('Failed to get simulation status')
  }

  return response.json()
}
