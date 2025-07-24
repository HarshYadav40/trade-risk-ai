export interface AnalysisResult {
  risk_level: 'low' | 'medium' | 'high';
  features_used: string[];
}

export class ApiService {
  private static readonly BASE_URL = 'http://localhost:5000';

  static async analyzeStock(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.BASE_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Failed to analyze stock data');
    }

    return await response.json();
  }
}