// Mock external adapters for GovTech integrations

export const StartupIndiaAdapter = {
  async verifyDpiit(dppNumber: string): Promise<{ valid: boolean; companyName?: string; verifiedAt: string }> {
    console.log(`[Simulated Integration] Verifying DPIIT Recognition: ${dppNumber}`);
    return new Promise(resolve => setTimeout(() => resolve({
      valid: dppNumber.startsWith('DIPP'),
      companyName: dppNumber.startsWith('DIPP') ? 'Simulated Startup Pvt Ltd' : undefined,
      verifiedAt: new Date().toISOString()
    }), 500));
  }
};

export const PFMSAdapter = {
  async initiateTransfer(accountDetails: string, amount: number, milestoneId: string): Promise<{ transactionId: string; status: 'processing' | 'success' }> {
    console.log(`[Simulated Integration] Initiating PFMS Transfer of ₹${amount} for milestone ${milestoneId}`);
    return new Promise(resolve => setTimeout(() => resolve({
      transactionId: `PFMS-${Math.random().toString(36).substring(7).toUpperCase()}`,
      status: 'processing'
    }), 600));
  }
};

export const UdyamAdapter = {
  async verifyUdyam(udyamNumber: string): Promise<{ valid: boolean; classification: 'Micro' | 'Small' | 'Medium' }> {
    console.log(`[Simulated Integration] Verifying Udyam Aadhaar: ${udyamNumber}`);
    return new Promise(resolve => setTimeout(() => resolve({
      valid: udyamNumber.startsWith('UDYAM'),
      classification: 'Micro'
    }), 400));
  }
};

export const GeMAdapter = {
  async fetchProcurementHistory(companyId: string) {
    console.log(`[Simulated Integration] Fetching GeM history for ${companyId}`);
    return new Promise(resolve => setTimeout(() => resolve([
      { orderId: 'GEM-2025-100', amount: 500000, date: '2025-06-12', status: 'fulfilled' }
    ]), 500));
  }
};

export const CPPPAdapter = {
  async publishTenderInfo(challengeId: string, title: string) {
    console.log(`[Simulated Integration] Publishing challenge to Central Public Procurement Portal: ${challengeId}`);
    return new Promise(resolve => setTimeout(() => resolve({
      cpppId: `CPPP-${Date.now()}`,
      status: 'published'
    }), 700));
  }
};

export const DigiLockerAdapter = {
  async fetchDocument(docHash: string) {
    console.log(`[Simulated Integration] Fetching verified document from DigiLocker: ${docHash}`);
    return new Promise(resolve => setTimeout(() => resolve({
      docType: 'IncorporationCertificate',
      verified: true,
      issuer: 'Ministry of Corporate Affairs'
    }), 450));
  }
};
