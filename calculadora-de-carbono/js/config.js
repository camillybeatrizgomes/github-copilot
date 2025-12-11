/**
 * CONFIG - Global configuration object
 * Contains emission factors, transport mode metadata, and utility functions
 */

const CONFIG = {
    /**
     * CO2 emission factors in kg per kilometer for each transport mode
     */
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    /**
     * Transport mode metadata for UI rendering
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚲",
            color: "#10b981"
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#3b82f6"
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#f59e0b"
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#ef4444"
        }
    },

    /**
     * Carbon credit configuration
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    populateDatalist: function() {
        const cities = RoutesDB.getAllCities();
        
        const datalist = document.getElementById('cities-list');
        
        datalist.innerHTML = '';
        
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    },

    setupDistanceAutofill: function() {
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualCheckbox = document.getElementById('manual-distance');
        const helperText = document.querySelector('.form-group__helper-text');

        const tryFindDistance = () => {
            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();
            
            if (origin && destination) {
                const distance = RoutesDB.findDistance(origin, destination);
                
                if (distance !== null) {
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;
                    
                    if (helperText) {
                        helperText.textContent = `✓ Distância encontrada: ${distance} km`;
                        helperText.style.color = '#10b981';
                    }
                } else {
                    distanceInput.value = '';
                    distanceInput.readOnly = false;
                    
                    if (helperText) {
                        helperText.textContent = 'Rota não encontrada. Por favor, insira a distância manualmente.';
                        helperText.style.color = '#f59e0b';
                    }
                }
            }
        };
        
        originInput.addEventListener('change', tryFindDistance);
        destinationInput.addEventListener('change', tryFindDistance);
        
        manualCheckbox.addEventListener('change', function() {
            if (this.checked) {
                distanceInput.readOnly = false;
                distanceInput.focus();
                
                if (helperText) {
                    helperText.textContent = 'Digite a distância manualmente';
                    helperText.style.color = '#6b7280';
                }
            } else {
                tryFindDistance();
            }
        });
    }
};