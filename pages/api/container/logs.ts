import {NextApiRequest, NextApiResponse} from "next";
import {getContainer} from "../../../utils/docker";
import {ValidationError} from "yup";
import { ResponseData, containerSchema } from "../../../utils/apiTypes";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {


    try {

        await containerSchema.validate(req.body);
        if (req.method === 'POST') {
            let container = getContainer(req.body.host, req.body.port, req.body.containerId);
            let logs:Buffer = (await container.logs({stdout : true})).filter((character, index, array) => character != 0 && character != 1);
            console.log(logs);
            return res.status(200).send({
                status: "success",
                data: logs.toString().split("\n"),
                message: "container logs"
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
