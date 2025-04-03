export async function fetchData(url) {
    try {
      const timestamp = Date.now();
      const response = await fetch(`${url}?t=${timestamp}`);
  
      if (!response.ok) {
        console.error(`Error fetching ${url}:`, response.status);
        return null; // Or throw an error if you prefer
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null; // Or throw an error
    }
  }