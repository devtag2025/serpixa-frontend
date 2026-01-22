/**
 * GeoNames API Service
 * Free geocoding service for location autocomplete
 * API Docs: http://www.geonames.org/export/web-services.html
 */

const GEONAMES_USERNAME = 'serpixa';
const GEONAMES_BASE_URL = 'https://secure.geonames.org';

// Country codes for supported countries
const COUNTRY_CODES = {
  'France': 'FR',
  'Belgium': 'BE',
  'Netherlands': 'NL',
};

/**
 * Search for regions/states/provinces in a country
 * @param {string} query - Search query
 * @param {string} country - Country name (e.g., "France", "Belgium")
 * @returns {Promise<Array>} Array of region suggestions
 */
export const searchRegions = async (query, country) => {
  if (!query || query.length < 2 || !country) {
    return [];
  }

  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      name_startsWith: query,
      country: countryCode,
      featureClass: 'A', // Administrative divisions
      featureCode: 'ADM1', // First-order administrative division (state/province/region)
      maxRows: 10,
      username: GEONAMES_USERNAME,
      type: 'json',
    });

    const response = await fetch(`${GEONAMES_BASE_URL}/searchJSON?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('GeoNames API error');
    }

    const data = await response.json();
    
    if (data.status) {
      // GeoNames returns status object on error
      console.error('GeoNames error:', data.status.message);
      return [];
    }

    // Also search for ADM2 (second-order administrative divisions) for Belgium
    const params2 = new URLSearchParams({
      name_startsWith: query,
      country: countryCode,
      featureClass: 'A',
      featureCode: 'ADM2',
      maxRows: 10,
      username: GEONAMES_USERNAME,
      type: 'json',
    });

    const response2 = await fetch(`${GEONAMES_BASE_URL}/searchJSON?${params2.toString()}`);
    const data2 = await response2.json();

    // Combine and dedupe results
    const allResults = [...(data.geonames || []), ...(data2.geonames || [])];
    
    // Remove duplicates by name
    const uniqueNames = new Set();
    const uniqueResults = allResults.filter(item => {
      const name = item.name || item.toponymName;
      if (uniqueNames.has(name)) return false;
      uniqueNames.add(name);
      return true;
    });

    return uniqueResults.map(item => ({
      name: item.name || item.toponymName,
      adminName1: item.adminName1,
      countryName: item.countryName,
      geonameId: item.geonameId,
      displayName: item.name || item.toponymName,
    })).slice(0, 10);
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
};

/**
 * Search for cities in a country (optionally filtered by region)
 * @param {string} query - Search query
 * @param {string} country - Country name
 * @param {string} region - Optional region name to filter by
 * @returns {Promise<Array>} Array of city suggestions
 */
export const searchCities = async (query, country, region = null) => {
  if (!query || query.length < 2 || !country) {
    return [];
  }

  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      name_startsWith: query,
      country: countryCode,
      featureClass: 'P', // Populated places (cities, towns, villages)
      maxRows: 15,
      username: GEONAMES_USERNAME,
      type: 'json',
      orderby: 'population', // Order by population for relevance
    });

    const response = await fetch(`${GEONAMES_BASE_URL}/searchJSON?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('GeoNames API error');
    }

    const data = await response.json();
    
    if (data.status) {
      console.error('GeoNames error:', data.status.message);
      return [];
    }

    let results = data.geonames || [];

    // Filter by region if provided
    if (region && results.length > 0) {
      const regionLower = region.toLowerCase();
      const filtered = results.filter(item => {
        const adminName1 = (item.adminName1 || '').toLowerCase();
        const adminName2 = (item.adminName2 || '').toLowerCase();
        return adminName1.includes(regionLower) || 
               adminName2.includes(regionLower) ||
               regionLower.includes(adminName1) ||
               regionLower.includes(adminName2);
      });
      
      // If filtering reduces results too much, include all
      if (filtered.length >= 3) {
        results = filtered;
      }
    }

    return results.map(item => ({
      name: item.name || item.toponymName,
      adminName1: item.adminName1, // Region/State
      adminName2: item.adminName2, // Province/District
      countryName: item.countryName,
      population: item.population,
      geonameId: item.geonameId,
      displayName: `${item.name || item.toponymName}${item.adminName1 ? `, ${item.adminName1}` : ''}`,
    })).slice(0, 10);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

/**
 * Get all regions for a country (pre-fetch)
 * @param {string} country - Country name
 * @returns {Promise<Array>} Array of all regions
 */
export const getRegionsByCountry = async (country) => {
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) {
    return [];
  }

  try {
    // Get first-order administrative divisions
    const params = new URLSearchParams({
      country: countryCode,
      featureCode: 'ADM1',
      maxRows: 50,
      username: GEONAMES_USERNAME,
      type: 'json',
    });

    const response = await fetch(`${GEONAMES_BASE_URL}/searchJSON?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('GeoNames API error');
    }

    const data = await response.json();
    
    if (data.status) {
      console.error('GeoNames error:', data.status.message);
      return [];
    }

    return (data.geonames || []).map(item => ({
      name: item.name || item.toponymName,
      adminCode1: item.adminCode1,
      geonameId: item.geonameId,
    })).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching regions for country:', error);
    return [];
  }
};

export const GeoNamesService = {
  searchRegions,
  searchCities,
  getRegionsByCountry,
  COUNTRY_CODES,
};
