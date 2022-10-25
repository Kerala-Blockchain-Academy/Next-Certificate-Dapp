import { contractInstance } from '../utils/ethers';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let data = req.body;

        let trx = await contractInstance.issueCertificate(data.id, data.name, data.course, data.grade, data.date);
        console.log(trx);
        res.status(200).json(trx);
    }
    else if (req.method === 'GET') {
        let id = parseInt(req.query.id);

        let result = await contractInstance.Certificates(id);
        console.log(result);
        res.status(200).json({ id, result });
    }
}