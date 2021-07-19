import got from 'got';

const addCat = async (data: { name: string; description: string; gender: 'male' | 'female' | 'unisex' }) => {
   const response = await got.post('https://meowle.qa-fintech.ru/api/core/cats/add', {
      json: { cats: [ data ] },
      responseType: 'json',
    });
  return response.body;
};

const getCatsNameBySearchPattern = async (pattern: string) => {
  const response = await got.post('https://meowle.qa-fintech.ru/api/core/cats/search', {
    json: { name: pattern },
    responseType: 'json',
  });
  const bodyResponse: any = response.body;
  const catNames: string[] = [];
  bodyResponse.groups.forEach((group) => group.cats.forEach((cat) => catNames.push(cat.name)));
  return catNames;
};

const api = {
  getCatsNameBySearchPattern,
  addCat,
};
export default api;
