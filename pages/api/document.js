import { ethers } from 'ethers';
import { contractInstance } from '../utils/ethers';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let id = req.body.id;
        let path = req.body.path;
        let hash = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(path));
        let trx = await contractInstance.uploadDocument(id, hash);
        console.log(trx);
        res.status(200).json(trx);
    }
    else if (req.method === 'GET') {
        let id = parseInt(req.query.id);
        let result = {}
        let hash = await contractInstance.Documents(id);
        let path = ethers.utils.toUtf8String(hash)
        result.id = id;
        result.path = path
        console.log(result);
        res.status(200).json(result);
    }
}