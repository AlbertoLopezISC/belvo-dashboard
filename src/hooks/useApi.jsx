import ApiContext from '@/context/apiProvider';
import { useContext } from 'react';

const useApi = () => {
    return useContext(ApiContext);
};

export default useApi;
