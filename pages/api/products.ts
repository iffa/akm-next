import { getProducts } from '@app/lib/products';
import withYup from 'next-yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  query: yup.string().required().min(3),
});

export default withYup()({ query: schema }, async (req, res, data) => {
  const { query } = data.query;

  const products = await getProducts(query);

  return res.status(200).json(products);
});
