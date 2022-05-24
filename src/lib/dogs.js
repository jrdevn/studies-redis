import api from './api.js';
import Cache from './Cache.js';
class Dogs {
    async breeds(options) {
        try {
            const params = new URLSearchParams(options);

            const cached = await Cache.get(params);
            if (cached) {
                return cached;
            }
            const { data } = await api.get(`/breeds?${params}`);
            const response = {
                racaPertencente: data[0].bred_for,
                racaGrupo: data[0].breed_group,
            };

            Cache.set('dogsOne', response, 60 * 15);
            return response;

        } catch (error) {
            return error.message;
        }
    }
}
export default new Dogs();