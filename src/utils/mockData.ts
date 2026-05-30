
export interface Customer {
  id: string;
  name: string;
  tenure: number;
  monthlyCharges: number;
  totalCharges: number;
  contract: 'Month-to-month' | 'One year' | 'Two year';
  internetService: 'DSL' | 'Fiber optic' | 'No';
  techSupport: 'Yes' | 'No';
  churn: boolean;
  predictionProbability?: number;
}

export const generateMockData = (count: number): Customer[] => {
  const names = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis', 'Chris Wilson', 'Sarah Miller', 'David Taylor', 'Anna Moore', 'James Anderson', 'Linda Thomas'];
  const contracts: Customer['contract'][] = ['Month-to-month', 'One year', 'Two year'];
  const services: Customer['internetService'][] = ['DSL', 'Fiber optic', 'No'];
  
  return Array.from({ length: count }, (_, i) => {
    const tenure = Math.floor(Math.random() * 72);
    const monthlyCharges = Math.floor(Math.random() * 100) + 20;
    const contract = contracts[Math.floor(Math.random() * contracts.length)];
    const internetService = services[Math.floor(Math.random() * services.length)];
    const techSupport = Math.random() > 0.7 ? 'Yes' : 'No';
    
    // Simple heuristic for churn probability
    let churnProb = 0.1;
    if (contract === 'Month-to-month') churnProb += 0.3;
    if (internetService === 'Fiber optic') churnProb += 0.2;
    if (techSupport === 'No') churnProb += 0.1;
    if (tenure < 12) churnProb += 0.2;
    
    return {
      id: `CUST-${1000 + i}`,
      name: names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1),
      tenure,
      monthlyCharges,
      totalCharges: tenure * monthlyCharges,
      contract,
      internetService,
      techSupport,
      churn: Math.random() < churnProb,
    };
  });
};

export const mockCustomers = generateMockData(100);
