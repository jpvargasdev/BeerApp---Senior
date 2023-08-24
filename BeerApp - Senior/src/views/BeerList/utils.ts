import { getBeerList, getBeerMetaData } from '../../api';
import { ApiParams, Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (
  setData: (data: Array<Beer>) => void,
  setPages: (pages: number) => void,
  params: ApiParams
) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      const metadata = await getBeerMetaData(params);
      const pages = metadata.data.total / metadata.data.per_page;
      
      setPages(Math.ceil(pages));
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};


export { fetchData };
