// src/hooks/useRadioBrowser.js
import { useEffect, useState } from "react";

export function useRadioBrowser({ country = "ES", limit = 50, tag = "music" }) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStations() {
      setLoading(true);
      // Lista de servidores recomendados
      const servers = ["de2.api.radio-browser.info", "fi1.api.radio-browser.info"];
      for (let srv of servers) {
        try {
          const resp = await fetch(
            `https://${srv}/json/stations/bycountrycodeexact/${country}?limit=${limit}&tag=${tag}`
          );
          const data = await resp.json();
          if (Array.isArray(data) && data.length) {
            setStations(data);
            break;
          }
        } catch (e) {
          console.warn(`Servidor ${srv} falló, probando siguiente…`);
        }
      }
      setLoading(false);
    }
    fetchStations();
  }, [country, limit, tag]);

  return { stations, loading };
}
