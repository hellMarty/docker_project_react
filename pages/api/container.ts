import type { NextApiRequest, NextApiResponse } from 'next'
import { ValidationError } from 'yup';
import { ResponseData, containerSchema } from '../../utils/apiTypes';
import { getContainer, createContainer } from '../../utils/docker';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {


    try {

    
        await containerSchema.validate(req.body);
        let container = getContainer(req.body.host, req.body.port, req.body.containerId);

        // delete
        if (req.method === 'DELETE') {
            await container.remove();
            res.status(200).send({
                status: "success",
                data: "Container deleted",
                message: "Container deleted"
            });
        }
        // inspect
        else if (req.method === 'POST') {
            res.status(200).send({
                status: "success",
                data: await container.inspect(),
                message: "Inspect container"
            })

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
