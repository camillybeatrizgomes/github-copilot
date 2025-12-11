/**
 * app.js - Main application file
 * Handles initialization and form submission for the CO2 calculator
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * INITIALIZATION
     * Set up the calculator on page load
     */
    
    CONFIG.populateDatalist();
    
    CONFIG.setupDistanceAutofill();
    
    const calculatorForm = document.getElementById('calculator-form');
    
    calculatorForm.addEventListener('submit', handleFormSubmit);
    
    console.log('✅ Calculadora inicializada!');
    
    /**
     * FORM SUBMIT HANDLER
     * Process form data and display calculation results
     * @param {Event} event - Form submit event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        /**
         * STEP 1: Get and validate form values
         */
        
        const origin = document.getElementById('origin').value.trim();
        
        const destination = document.getElementById('destination').value.trim();
        
        const distanceInput = document.getElementById('distance').value;
        const distance = parseFloat(distanceInput);
        
        const transportModeInput = document.querySelector('input[name="transport"]:checked');
        const transportMode = transportModeInput ? transportModeInput.value : null;
        
        /**
         * STEP 2: Validate inputs
         */
        
        if (!origin || !destination) {
            alert('❌ Por favor, preencha a origem e o destino.');
            return;
        }
        
        if (!distance || distance <= 0) {
            alert('❌ Por favor, insira uma distância válida maior que zero.');
            return;
        }
        
        if (!transportMode) {
            alert('❌ Por favor, selecione um meio de transporte.');
            return;
        }
        
        /**
         * STEP 3: Show loading state
         */
        
        const submitButton = calculatorForm.querySelector('.form-submit');
        
        UI.showLoading(submitButton);
        
        UI.hideElement('results');
        UI.hideElement('comparison');
        UI.hideElement('carbon-credits');
        
        /**
         * STEP 4: Process calculation with simulated delay
         * Simulates API call or heavy processing
         */
        
        setTimeout(function() {
            try {
                /**
                 * CALCULATIONS
                 */

                const emission = Calculator.calculateEmission(distance, transportMode);

                const carEmission = Calculator.calculateEmission(distance, 'car');

                const savings = transportMode !== 'car' 
                    ? Calculator.calculateSavings(emission, carEmission)
                    : null;

                const allModesComparison = Calculator.calculateAllModes(distance);

                const carbonCredits = Calculator.calculateCarbonCredits(emission);

                const creditPrice = Calculator.estimateCreditPrice(carbonCredits);
                
                /**
                 * BUILD DATA OBJECTS FOR RENDERING
                 */
                
                const resultsData = {
                    origin: origin,
                    destination: destination,
                    distance: distance,
                    emission: emission,
                    mode: transportMode,
                    savings: savings
                };
                
                const creditsData = {
                    credits: carbonCredits,
                    price: creditPrice
                };
                
                /**
                 * RENDER RESULTS
                 */
                
                const resultsHTML = UI.renderResults(resultsData);
                document.getElementById('results-content').innerHTML = resultsHTML;
                
                const comparisonHTML = UI.renderComparison(allModesComparison, transportMode);
                document.getElementById('comparison-content').innerHTML = comparisonHTML;
                
                const creditsHTML = UI.renderCarbonCredits(creditsData);
                document.getElementById('carbon-credits-content').innerHTML = creditsHTML;
                
                /**
                 * DISPLAY RESULTS
                 */
                UI.showElement('results');
                UI.showElement('comparison');
                UI.showElement('carbon-credits');

                UI.scrollToElement('results');

                UI.hideLoading(submitButton);

                console.log('✅ Cálculo concluído:', {
                    emission: emission,
                    credits: carbonCredits,
                    savings: savings
                });
                
            } catch (error) {
                console.error('❌ Erro ao calcular emissões:', error);
                
                alert('❌ Ocorreu um erro ao calcular as emissões. Por favor, tente novamente.');
                
                UI.hideLoading(submitButton);
            }
            
        }, 1500); // 1.5 second delay to simulate processing
    }
    
});