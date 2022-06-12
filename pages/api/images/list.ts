import {NextApiRequest, NextApiResponse} from "next";
import {dockerSchema, ResponseData} from "../../../utils/apiTypes";
import {listImages} from "../../../utils/docker";
import {ValidationError} from "yup";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {


    try {
        // list images
        await dockerSchema.validate(req.body);
        let images = await listImages(req.body.host, req.body.port);
        if (req.method === 'POST') {
            res.status(200).send({
                status: "success",
                data: images,
                message: "List of images"
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
