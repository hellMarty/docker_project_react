import type { NextApiRequest, NextApiResponse } from 'next'

import { ValidationError } from 'yup';
import { ResponseData, dockerSchema } from '../../../utils/apiTypes';
import { listContainers } from '../../../utils/docker';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await dockerSchema.validate(req.body);
        let containers = await listContainers(req.body.host, req.body.port, req.body.filter);
        // create new
        if (req.method === 'POST') {
            res.status(200).send({
                status: "success",
                data: containers,
                message: "List of containers"
            });
        }
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).send({
                status: "error",
                data: e.errors,
                message: e.message
            })
        }
        else {
            res.status(500).json({
                status: "error",
                data: {},
                message: "Something went wrong"
            })
        }
    }
}
