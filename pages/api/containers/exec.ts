import {NextApiRequest, NextApiResponse} from "next";
import {containerExecSchema, ResponseData} from "../../../utils/apiTypes";
import {getContainer} from "../../../utils/docker";
import {ValidationError} from "yup";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {


    try {
        // exec
        if (req.method === 'POST') {
            await containerExecSchema.validate(req.body);
            const container = getContainer(req.body.host, req.body.port, req.body.containerId);
            const exec = await container.exec(req.body.options);
            await exec.start({Detach: true});
            const execReturnValue = await exec.inspect();
            res.status(201).send({
                status: "success",
                data: execReturnValue.ExitCode,
                message: "command executed"
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
