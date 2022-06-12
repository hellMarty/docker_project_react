import {NextApiRequest, NextApiResponse} from "next";
import {createImageSchema, ResponseData} from "../../../utils/apiTypes";
import {createImage} from "../../../utils/docker";
import {ValidationError} from "yup";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        // create images
        await createImageSchema.validate(req.body);
        let image = await createImage(req.body.host, req.body.port, req.body.image);
        if (req.method === 'POST') {
            res.status(200).send({
                status: "success",
                data: image.read().toString(),
                message: "Image created"
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
