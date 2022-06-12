import {NextApiRequest, NextApiResponse} from "next";
import {containerSchema, ResponseData} from "../../../utils/apiTypes";
import {pauseContainer} from "../../../utils/docker";
import {ValidationError} from "yup";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {


    try {

        await containerSchema.validate(req.body);
        // create new
        if (req.method === 'POST') {
            await pauseContainer(req.body.host, req.body.port, req.body.containerId);
            return res.status(200).send({
                status: "success",
                data: "Container stopped",
                message: "Container stopped"
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
