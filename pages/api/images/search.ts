import {NextApiRequest, NextApiResponse} from "next";
import {ResponseData, searchImagesSchema} from "../../../utils/apiTypes";
import {searchImages} from "../../../utils/docker";
import {ValidationError} from "yup";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        // search images
        await searchImagesSchema.validate(req.body);
        let images = await searchImages(req.body.host, req.body.port, req.body.term);
        if (req.method === 'POST') {
            res.status(200).send({
                status: "success",
                data: images,
                message: "Search images"
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
