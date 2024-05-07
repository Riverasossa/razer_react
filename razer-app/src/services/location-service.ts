import axios from "axios";

export interface Province {
  [key: string]: string;
}

export interface Canton {
  [key: string]: string;
}

export interface District {
  [key: string]: string;
}

const LocationService = {
  getProvinces: async (): Promise<Province> => {
    try {
      const response = await axios.get<Province>(
        "https://ubicaciones.paginasweb.cr/provincias.json"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  },

  getCantonsByProvince: async (provinceCode: string): Promise<Canton> => {
    try {
      const response = await axios.get<Canton>(
        `https://ubicaciones.paginasweb.cr/provincia/${provinceCode}/cantones.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cantons:", error);
      throw error;
    }
  },

  getDistrictsByCanton: async (
    provinceCode: string,
    cantonCode: string
  ): Promise<District> => {
    try {
      const response = await axios.get<District>(
        `https://ubicaciones.paginasweb.cr/provincia/${provinceCode}/canton/${cantonCode}/distritos.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching districts:", error);
      throw error;
    }
  },
};

export default LocationService;
