
export interface Features {
  tenure: number;
  monthlyCharges: number;
  contract: string;
  internetService: string;
  techSupport: string;
  paperlessBilling: boolean;
}

export const predictChurn = (features: Features) => {
  let score = 0;
  
  // Weights (simulating a simple logistic regression)
  if (features.contract === 'Month-to-month') score += 0.45;
  if (features.contract === 'One year') score += 0.15;
  
  if (features.internetService === 'Fiber optic') score += 0.3;
  if (features.techSupport === 'No') score += 0.2;
  
  if (features.tenure < 12) score += 0.25;
  else if (features.tenure < 24) score += 0.15;
  
  if (features.monthlyCharges > 80) score += 0.15;
  if (features.paperlessBilling) score += 0.1;

  // Sigmoid-ish normalization
  const probability = Math.min(0.99, Math.max(0.01, score / 1.5));
  
  return {
    probability,
    churn: probability > 0.5,
    riskLevel: probability > 0.7 ? 'High' : probability > 0.3 ? 'Medium' : 'Low'
  };
};
