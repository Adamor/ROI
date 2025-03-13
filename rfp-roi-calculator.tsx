import React, { useState } from 'react';

const RFPToolROICalculator = () => {
  const [formData, setFormData] = useState({
    // Current RFP Process Analysis
    rfpsReceived: '',
    rfpSize: '',
    rfpResponseRate: '',
    missedOpportunities: '',
    
    // Resource Allocation
    seHours: '',
    seHourlyCost: '',
    smeHours: '',
    smeHourlyCost: '',
    legalHours: '',
    legalHourlyCost: '',
    marketingHours: '',
    marketingHourlyCost: '',
    pmHours: '',
    pmHourlyCost: '',
    
    // Efficiency Gains
    currentTime: '',
    irisTime: '',
    
    // Investment
    irisSubscription: '',
    implementation: '',
    training: '',
  });

  const [calculations, setCalculations] = useState({
    seTotalCost: 0,
    smeTotalCost: 0,
    legalTotalCost: 0,
    marketingTotalCost: 0,
    pmTotalCost: 0,
    totalResourceCost: 0,
    
    timeSaved: 0,
    valueSaved: 0,
    
    totalInvestment: 0,
    annualROI: 0,
    paybackPeriod: 0,
    threeYearROI: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate totals when input changes
    setTimeout(calculateTotals, 0);
  };

  const calculateTotals = () => {
    // Resource costs
    const seTotalCost = formData.seHours * formData.seHourlyCost || 0;
    const smeTotalCost = formData.smeHours * formData.smeHourlyCost || 0;
    const legalTotalCost = formData.legalHours * formData.legalHourlyCost || 0;
    const marketingTotalCost = formData.marketingHours * formData.marketingHourlyCost || 0;
    const pmTotalCost = formData.pmHours * formData.pmHourlyCost || 0;
    const totalResourceCost = seTotalCost + smeTotalCost + legalTotalCost + marketingTotalCost + pmTotalCost;
    
    // Time saved
    const timeSaved = (parseFloat(formData.currentTime) || 0) - (parseFloat(formData.irisTime) || 0);
    
    // Value of time saved using average hourly cost
    const averageHourlyCost = ((parseFloat(formData.seHourlyCost) || 0) + 
                              (parseFloat(formData.smeHourlyCost) || 0) + 
                              (parseFloat(formData.legalHourlyCost) || 0)) / 3;
    const valueSaved = timeSaved * averageHourlyCost;
    
    // Investment
    const totalInvestment = (parseFloat(formData.irisSubscription) || 0) + 
                           (parseFloat(formData.implementation) || 0) + 
                           (parseFloat(formData.training) || 0);
    
    // ROI calculations
    const annualROI = totalInvestment > 0 ? ((valueSaved - totalInvestment) / totalInvestment) * 100 : 0;
    const paybackPeriod = valueSaved > 0 ? (totalInvestment / (valueSaved / 12)) : 0; // in months
    const threeYearROI = totalInvestment > 0 ? ((valueSaved * 3 - totalInvestment) / totalInvestment) * 100 : 0;

    setCalculations({
      seTotalCost,
      smeTotalCost,
      legalTotalCost,
      marketingTotalCost,
      pmTotalCost,
      totalResourceCost,
      timeSaved,
      valueSaved,
      totalInvestment,
      annualROI,
      paybackPeriod,
      threeYearROI
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  return (
    <div className="flex flex-col bg-white text-gray-800 max-w-6xl mx-auto">
      <header className="bg-purple-900 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">RFP Tool ROI Calculator</h1>
            <p className="text-xl">Quantify the impact of transforming your RFP process with AI</p>
          </div>
          <div className="text-white text-4xl">
            <span>Iris</span>
          </div>
        </div>
      </header>

      <div className="p-6">
        <section className="mb-12">
          <div className="bg-purple-900 text-white p-4 mb-6">
            <h2 className="text-2xl font-bold">Part 1: Current RFP Response Process Analysis</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-900">A. Volume Assessment</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Metric</th>
                    <th className="p-3 text-left border">Industry Average</th>
                    <th className="p-3 text-left border">Your Numbers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Number of RFPs received annually</td>
                    <td className="p-3 border">Industry avg: 30% increase YoY</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="rfpsReceived"
                        value={formData.rfpsReceived}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Average RFP size (pages)</td>
                    <td className="p-3 border">Industry avg: 75-100 pages</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="rfpSize"
                        value={formData.rfpSize}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">% of RFPs you can currently respond to</td>
                    <td className="p-3 border">Industry avg: 40-60%</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="rfpResponseRate"
                        value={formData.rfpResponseRate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">% of opportunities missed due to capacity constraints</td>
                    <td className="p-3 border">Industry avg: 25-35%</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="missedOpportunities"
                        value={formData.missedOpportunities}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-900">B. Resource Allocation</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Team Member</th>
                    <th className="p-3 text-left border">Hours Per RFP (Current Process)</th>
                    <th className="p-3 text-left border">Hourly Cost</th>
                    <th className="p-3 text-left border">Total Cost Per RFP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Sales Engineer</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="seHours"
                        value={formData.seHours}
                        onChange={handleInputChange}
                        placeholder="20-25 hours"
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="seHourlyCost"
                        value={formData.seHourlyCost}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border font-medium">
                      {formatCurrency(calculations.seTotalCost)}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Subject Matter Expert</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="smeHours"
                        value={formData.smeHours}
                        onChange={handleInputChange}
                        placeholder="8-12 hours"
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="smeHourlyCost"
                        value={formData.smeHourlyCost}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border font-medium">
                      {formatCurrency(calculations.smeTotalCost)}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Legal/Compliance</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="legalHours"
                        value={formData.legalHours}
                        onChange={handleInputChange}
                        placeholder="4-6 hours"
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="legalHourlyCost"
                        value={formData.legalHourlyCost}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border font-medium">
                      {formatCurrency(calculations.legalTotalCost)}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="p-3 border font-bold text-right">TOTAL</td>
                    <td className="p-3 border font-bold">
                      {formatCurrency(calculations.totalResourceCost)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-purple-900 text-white p-4 mb-6">
            <h2 className="text-2xl font-bold">Part 2: Iris Impact Projection</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-900">A. Efficiency Gains</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Process</th>
                    <th className="p-3 text-left border">Current Time (hours)</th>
                    <th className="p-3 text-left border">With Iris (hours)</th>
                    <th className="p-3 text-left border">Time Saved</th>
                    <th className="p-3 text-left border">Value of Time Saved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Total RFP Process</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="currentTime"
                        value={formData.currentTime}
                        onChange={handleInputChange}
                        placeholder="43-61 hours"
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="irisTime"
                        value={formData.irisTime}
                        onChange={handleInputChange}
                        placeholder="10-16 hours"
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="p-3 border font-medium">
                      {calculations.timeSaved} hours
                    </td>
                    <td className="p-3 border font-medium">
                      {formatCurrency(calculations.valueSaved)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <div className="bg-purple-900 text-white p-4 mb-6">
            <h2 className="text-2xl font-bold">Part 3: ROI Calculation</h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-900">A. Annual Investment</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Item</th>
                    <th className="p-3 text-left border">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Iris subscription</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="irisSubscription"
                        value={formData.irisSubscription}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Implementation</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="implementation"
                        value={formData.implementation}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Training</td>
                    <td className="p-3 border">
                      <input 
                        type="number" 
                        name="training"
                        value={formData.training}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="p-3 border font-bold">TOTAL INVESTMENT</td>
                    <td className="p-3 border font-bold">
                      {formatCurrency(calculations.totalInvestment)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-900">B. ROI Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Metric</th>
                    <th className="p-3 text-left border">Calculation</th>
                    <th className="p-3 text-left border">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Annual ROI</td>
                    <td className="p-3 border">(Total Return - Total Investment) / Total Investment</td>
                    <td className="p-3 border font-medium">
                      {calculations.annualROI.toFixed(2)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Payback period</td>
                    <td className="p-3 border">Total Investment / Monthly Return</td>
                    <td className="p-3 border font-medium">
                      {calculations.paybackPeriod.toFixed(1)} months
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">3-Year ROI</td>
                    <td className="p-3 border">3-Year Return / Total Investment</td>
                    <td className="p-3 border font-medium">
                      {calculations.threeYearROI.toFixed(2)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-purple-900 text-white p-4 mb-6">
            <h2 className="text-2xl font-bold">Part 4: Implementation Readiness Assessment</h2>
          </div>

          <div className="mb-8">
            <p className="mb-4">Rate your organization's readiness in these areas (1-5, with 5 being highest):</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Area</th>
                    <th className="p-3 text-left border">Rating (1-5)</th>
                    <th className="p-3 text-left border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Current RFP content organization</td>
                    <td className="p-3 border">
                      <select className="w-full p-2 border rounded">
                        <option value="">Select...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td className="p-3 border">
                      <input type="text" className="w-full p-2 border rounded" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Team willingness to adopt AI tools</td>
                    <td className="p-3 border">
                      <select className="w-full p-2 border rounded">
                        <option value="">Select...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td className="p-3 border">
                      <input type="text" className="w-full p-2 border rounded" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Integration with existing systems</td>
                    <td className="p-3 border">
                      <select className="w-full p-2 border rounded">
                        <option value="">Select...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td className="p-3 border">
                      <input type="text" className="w-full p-2 border rounded" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-purple-900 text-white p-4 mb-6">
            <h2 className="text-2xl font-bold">Part 5: Action Plan</h2>
          </div>

          <div className="mb-8">
            <p className="mb-4">Based on your scores above, these are your recommended next steps:</p>
            
            <h3 className="text-lg font-bold mb-2">Immediate (0-30 days):</h3>
            <ul className="list-disc pl-8 mb-4">
              <li className="mb-2">Conduct full RFP response audit to identify content gaps</li>
              <li className="mb-2">Schedule Iris demo with key stakeholders</li>
              <li className="mb-2">Identify the top 3 pain points in the current process</li>
            </ul>
            
            <h3 className="text-lg font-bold mb-2">Short-term (30-60 days):</h3>
            <ul className="list-disc pl-8 mb-4">
              <li className="mb-2">Begin Iris implementation for select RFP types</li>
              <li className="mb-2">Document existing best-practice responses for AI training</li>
              <li className="mb-2">Set baseline metrics for performance tracking</li>
            </ul>
            
            <h3 className="text-lg font-bold mb-2">Medium-term (60-90 days):</h3>
            <ul className="list-disc pl-8">
              <li className="mb-2">Expand Iris usage across all RFP responses</li>
              <li className="mb-2">Measure initial results and adjust approach</li>
              <li className="mb-2">Train all team members on optimized workflow</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RFPToolROICalculator;