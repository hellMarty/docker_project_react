import type { NextApiRequest, NextApiResponse } from 'next'
import { ValidationError } from 'yup';
import { createContainerSchema, ResponseData } from '../../../utils/apiTypes';
import { createContainer } from '../../../utils/docker';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {


    try {

        // create new
        if (req.method === 'POST') {
            await createContainerSchema.validate(req.body);
            const container = await createContainer(req.body.host, req.body.port, req.body.image);

            res.status(201).send({
                status: "success",
                data: await container.inspect(),
                message: "Container created"
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
