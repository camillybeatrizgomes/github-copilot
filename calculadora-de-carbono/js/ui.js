/**
 * UI - Global UI object for rendering and DOM manipulation
 * Contains utility methods and rendering functions for the calculator interface
 */

const UI = {
    /**
     * UTILITY METHODS
     */

    /**
     * Format a number with specified decimal places and thousand separators
     * @param {number} number - Number to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number string (e.g., "1.234,56")
     */
    formatNumber: function(number, decimals = 2) {
        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Format a value as Brazilian Real currency
     * @param {number} value - Value to format
     * @returns {string} Formatted currency string (e.g., "R$ 1.234,56")
     */
    formatCurrency: function(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show an element by removing the 'hidden' class
     * @param {string} elementId - ID of the element to show
     */
    showElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    },

    /**
     * Hide an element by adding the 'hidden' class
     * @param {string} elementId - ID of the element to hide
     */
    hideElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    },

    /**
     * Smoothly scroll to an element
     * @param {string} elementId - ID of the element to scroll to
     */
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    /**
     * RENDERING METHODS
     */

    /**
     * Render the main calculation results
     * @param {Object} data - Result data containing origin, destination, distance, emission, mode, savings
     * @returns {string} HTML string for results section
     */
    renderResults: function(data) {
        const modeData = CONFIG.TRANSPORT_MODES[data.mode];
        
        let html = `
            <h2 class="section-title">Resultados da Emissão</h2>
            
            <div class="results__grid">
                <!-- Route Card -->
                <div class="results__card">
                    <div class="results__card-icon">🗺️</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Rota</h3>
                        <p class="results__card-value">${data.origin} → ${data.destination}</p>
                    </div>
                </div>
                
                <!-- Distance Card -->
                <div class="results__card">
                    <div class="results__card-icon">📏</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Distância</h3>
                        <p class="results__card-value">${this.formatNumber(data.distance, 0)} km</p>
                    </div>
                </div>
                
                <!-- Emission Card -->
                <div class="results__card results__card--highlight">
                    <div class="results__card-icon">🌿</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Emissão de CO₂</h3>
                        <p class="results__card-value results__card-value--large">${this.formatNumber(data.emission)} kg</p>
                    </div>
                </div>
                
                <!-- Transport Mode Card -->
                <div class="results__card">
                    <div class="results__card-icon">${modeData.icon}</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Meio de Transporte</h3>
                        <p class="results__card-value">${modeData.label}</p>
                    </div>
                </div>
        `;
        
        if (data.mode !== 'car' && data.savings && data.savings.savedKg > 0) {
            html += `
                <!-- Savings Card -->
                <div class="results__card results__card--success">
                    <div class="results__card-icon">✅</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Economia vs Carro</h3>
                        <p class="results__card-value">${this.formatNumber(data.savings.savedKg)} kg</p>
                        <p class="results__card-subtitle">${this.formatNumber(data.savings.percentage)}% menos emissões</p>
                    </div>
                </div>
            `;
        }
        
        html += `</div>`;
        
        return html;
    },

    /**
     * Render comparison of all transport modes
     * @param {Array} modesArray - Array of mode objects from Calculator.calculateAllModes()
     * @param {string} selectedMode - Currently selected transport mode
     * @returns {string} HTML string for comparison section
     */
    renderComparison: function(modesArray, selectedMode) {
        let html = `
            <h2 class="section-title">Comparação entre Meios de Transporte</h2>
            <div class="comparison__grid">
        `;
        
        const maxEmission = Math.max(...modesArray.map(m => m.emission));
        
        modesArray.forEach(modeObj => {
            const modeData = CONFIG.TRANSPORT_MODES[modeObj.mode];
            const isSelected = modeObj.mode === selectedMode;
            
            const barWidth = maxEmission > 0 ? (modeObj.emission / maxEmission) * 100 : 0;
            
            // Determine color based on percentage vs car
            let barColor;
            if (modeObj.percentageVsCar <= 25) {
                barColor = '#10b981'; // Green - very eco-friendly
            } else if (modeObj.percentageVsCar <= 75) {
                barColor = '#f59e0b'; // Yellow - moderate
            } else if (modeObj.percentageVsCar <= 100) {
                barColor = '#fb923c'; // Orange - high
            } else {
                barColor = '#ef4444'; // Red - very high
            }
            
            html += `
                <div class="comparison__item${isSelected ? ' comparison__item--selected' : ''}">
                    <div class="comparison__header">
                        <span class="comparison__icon">${modeData.icon}</span>
                        <span class="comparison__label">${modeData.label}</span>
                        ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
                    </div>
                    
                    <div class="comparison__stats">
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">Emissão</span>
                            <span class="comparison__stat-value">${this.formatNumber(modeObj.emission)} kg CO₂</span>
                        </div>
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">vs Carro</span>
                            <span class="comparison__stat-value">${this.formatNumber(modeObj.percentageVsCar)}%</span>
                        </div>
                    </div>
                    
                    <div class="comparison__bar-container">
                        <div class="comparison__bar" style="width: ${barWidth}%; background-color: ${barColor};"></div>
                    </div>
                </div>
            `;
        });
        
        html += `
            </div>
            
            <!-- Tip Box -->
            <div class="comparison__tip">
                <span class="comparison__tip-icon">💡</span>
                <p class="comparison__tip-text">
                    <strong>Dica:</strong> Escolher meios de transporte mais sustentáveis ajuda a reduzir 
                    significativamente as emissões de CO₂ e contribui para um planeta mais saudável!
                </p>
            </div>
        `;
        
        return html;
    },

    /**
     * Render carbon credits information and pricing
     * @param {Object} creditsData - Object containing credits and price information
     * @returns {string} HTML string for carbon credits section
     */
    renderCarbonCredits: function(creditsData) {
        const html = `
            <h2 class="section-title">Créditos de Carbono</h2>
            
            <div class="carbon-credits__grid">
                <!-- Credits Needed Card -->
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-header">
                        <span class="carbon-credits__icon">🌳</span>
                        <h3 class="carbon-credits__card-title">Créditos Necessários</h3>
                    </div>
                    <div class="carbon-credits__card-body">
                        <p class="carbon-credits__value">${this.formatNumber(creditsData.credits, 4)}</p>
                        <p class="carbon-credits__helper">1 crédito = 1.000 kg CO₂</p>
                    </div>
                </div>
                
                <!-- Price Estimate Card -->
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-header">
                        <span class="carbon-credits__icon">💰</span>
                        <h3 class="carbon-credits__card-title">Custo Estimado</h3>
                    </div>
                    <div class="carbon-credits__card-body">
                        <p class="carbon-credits__value">${this.formatCurrency(creditsData.price.average)}</p>
                        <p class="carbon-credits__helper">
                            Variação: ${this.formatCurrency(creditsData.price.min)} - ${this.formatCurrency(creditsData.price.max)}
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- Information Box -->
            <div class="carbon-credits__info">
                <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
                <p class="carbon-credits__info-text">
                    Créditos de carbono são certificados que representam a redução de uma tonelada 
                    de CO₂ da atmosfera. Ao comprar créditos, você compensa suas emissões financiando 
                    projetos de preservação ambiental, reflorestamento e energia renovável.
                </p>
            </div>
            
            <!-- Compensation Button -->
            <div class="carbon-credits__action">
                <button class="carbon-credits__button" type="button">
                    🛒 Compensar Emissões
                </button>
            </div>
        `;
        
        return html;
    },

    /**
     * Show loading state on a button
     * @param {HTMLElement} buttonElement - Button element to show loading state
     */
    showLoading: function(buttonElement) {
        buttonElement.dataset.originalText = buttonElement.innerHTML;
        
        buttonElement.disabled = true;

        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Hide loading state and restore button
     * @param {HTMLElement} buttonElement - Button element to restore
     */
    hideLoading: function(buttonElement) {
        buttonElement.disabled = false;
        
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
};