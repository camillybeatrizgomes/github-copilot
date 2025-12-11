const RoutesDB = {
    routes: [

        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1120 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2660 },
        { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3120 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1650 },
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Florianópolis, SC", destination: "Porto Alegre, RS", distanceKm: 476 },
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Belo Horizonte, MG", destination: "Brasília, DF", distanceKm: 741 },
        { origin: "Manaus, AM", destination: "Brasília, DF", distanceKm: 3490 },
        
        // Regional Routes - São Paulo State
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 87 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "São Paulo, SP", destination: "São José dos Campos, SP", distanceKm: 94 },
        { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 233 },
        
        // Regional Routes - Rio de Janeiro State
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
        { origin: "Rio de Janeiro, RJ", destination: "Cabo Frio, RJ", distanceKm: 140 },
        { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 151 },
        
        // Regional Routes - Minas Gerais
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 543 },
        { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 272 },
        
        // Regional Routes - South Region
        { origin: "Porto Alegre, RS", destination: "Caxias do Sul, RS", distanceKm: 129 },
        { origin: "Porto Alegre, RS", destination: "Pelotas, RS", distanceKm: 261 },
        { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 637 },
        { origin: "Curitiba, PR", destination: "Londrina, PR", distanceKm: 369 },
        
        // Regional Routes - Northeast
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 108 },
        { origin: "Recife, PE", destination: "João Pessoa, PB", distanceKm: 120 },
        { origin: "Fortaleza, CE", destination: "Juazeiro do Norte, CE", distanceKm: 491 }
    ],

    /**
     * Get all unique city names from the routes database
     * @returns {Array<string>} Sorted array of unique city names
     */
    getAllCities: function() {
        // Create a Set to store unique city names
        const citiesSet = new Set();
        
        // Extract cities from both origin and destination
        this.routes.forEach(route => {
            citiesSet.add(route.origin);
            citiesSet.add(route.destination);
        });
        
        // Convert Set to Array and sort alphabetically
        return Array.from(citiesSet).sort();
    },

    /**
     * Find the distance between two cities
     * Searches bidirectionally (handles both origin->destination and destination->origin)
     * @param {string} origin - Origin city name
     * @param {string} destination - Destination city name
     * @returns {number|null} Distance in kilometers if route found, null otherwise
     */
    findDistance: function(origin, destination) {
        // Normalize inputs: trim whitespace and convert to lowercase
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();
        
        // Search for route in both directions
        const route = this.routes.find(r => {
            const routeOrigin = r.origin.toLowerCase();
            const routeDestination = r.destination.toLowerCase();
            
            // Check if route matches in either direction
            return (
                (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)
            );
        });
        
        // Return distance if found, null otherwise
        return route ? route.distanceKm : null;
    }
};