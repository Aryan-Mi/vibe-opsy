export interface LesionCategory {
  name: string;
  code: string;
  cancerous: boolean;
}

export interface ScanResult {
  lesionCode: string;
  probability: number;
}

export const LESION_CATEGORIES: LesionCategory[] = [
  { name: 'Melanocytic nevi', code: 'NV', cancerous: false },
  { name: 'Melanoma', code: 'MEL', cancerous: true },
  { name: 'Benign keratosis', code: 'BKL', cancerous: false },
  { name: 'Basal cell carcinoma', code: 'BCC', cancerous: true },
  { name: 'Actinic keratoses', code: 'AKIEC', cancerous: true },
  { name: 'Vascular lesions', code: 'VASC', cancerous: false },
  { name: 'Dermatofibroma', code: 'DF', cancerous: false },
];
