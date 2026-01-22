export interface PredictionResponse {
	predicted_class: number
	diagnosis: string
	confidence: number
	is_cancer: boolean
	probabilities: Record<string, number>
}

export const analyzeSkinLesion = async (
	file: File,
): Promise<PredictionResponse> => {
	const formData = new FormData()
	formData.append('file', file)

	// Use relative URL in development, absolute URL in production
	const apiUrl = import.meta.env.DEV
		? '/api/inference'
		: 'https://skin-lesion-api-267598825904.europe-west1.run.app/inference'

	const response = await fetch(apiUrl, {
		method: 'POST',
		body: formData,
	})

	if (!response.ok) {
		throw new Error(`API call failed: ${response.statusText}`)
	}

	return response.json()
}
