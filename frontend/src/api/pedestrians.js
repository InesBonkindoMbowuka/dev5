const API_URL = 'http://localhost:3000/api'

export async function getPedestrians() {
  const response = await fetch(`${API_URL}/pedestrians`)

  if (!response.ok) {
    throw new Error('Failed to fetch pedestrians')
  }

  return response.json()
}
