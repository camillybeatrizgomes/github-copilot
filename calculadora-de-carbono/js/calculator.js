/**
 * Calculator - Global calculator object for CO2 emissions
 * Contains all calculation methods for emissions, comparisons, and carbon credits
 */

const Calculator = {
    /**
     * Calculate CO2 emission for a given distance and transport mode
     * @param {number} distanceKm - Distance in kilometers
     * @param {string} transportMode - Transport mode key (bicycle, car, bus, truck)
     * @returns {number} CO2 emission in kilograms, rounded to 2 decimal places
     */
    calculateEmission: function(distanceKm, transportMode) {
        const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];
        
        const emission = distanceKm * emissionFactor;
        
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calculate emissions for all transport modes and compare with car as baseline
     * @param {number} distanceKm - Distance in kilometers
     * @returns {Array} Array of objects with mode, emission, and percentage vs car, sorted by emission
     */
    calculateAllModes: function(distanceKm) {
        const results = [];
        
        const carEmission = this.calculateEmission(distanceKm, 'car');
        
        for (const mode in CONFIG.EMISSION_FACTORS) {
            const emission = this.calculateEmission(distanceKm, mode);
            
            const percentageVsCar = carEmission > 0 
                ? Math.round((emission / carEmission) * 100 * 100) / 100
                : 0;
            
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: percentageVsCar
            });
        }
        
        results.sort((a, b) => a.emission - b.emission);
        
        return results;
    },

    /**
     * Calculate CO2 savings compared to a baseline emission
     * @param {number} emission - Current emission in kg CO2
     * @param {number} baselineEmission - Baseline emission to compare against in kg CO2
     * @returns {Object} Object with savedKg and percentage properties
     */
    calculateSavings: function(emission, baselineEmission) {
        const savedKg = baselineEmission - emission;
        
        const percentage = baselineEmission > 0
            ? (savedKg / baselineEmission) * 100
            : 0;
        
        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    },

    /**
     * Calculate carbon credits needed to offset the emission
     * @param {number} emissionKg - CO2 emission in kilograms
     * @returns {number} Number of carbon credits needed, rounded to 4 decimal places
     */
    calculateCarbonCredits: function(emissionKg) {
        const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estimate the price range for carbon credits in Brazilian Reais
     * @param {number} credits - Number of carbon credits
     * @returns {Object} Object with min, max, and average price in BRL
     */
    estimateCreditPrice: function(credits) {
        const min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        
        const max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        
        const average = (min + max) / 2;
        
        return {
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            average: Math.round(average * 100) / 100
        };
    }
};