// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' });
}

const api_key="-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIFxG95q+feSkhWSnAKze+rWB3eo7oDNYKXpkiX45h3QcoAoGCCqGSM49\nAwEHoUQDQgAEyVDroLdmHJEpDAzJX6YJYQjMiWGYzEdDzu2TNyVUAP6w4ayA8qGe\nuJROGr7n7QT7MGg/IaA+MkhqO7lhgWLw2A==\n-----END EC PRIVATE KEY-----\n"