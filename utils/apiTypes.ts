
import { object, string } from 'yup';
export type ResponseData = {
    status: string,
    data: any,
    message: string
}

export const containerSchema = object({
    host: string().required(),
    port: string().required(),
    containerId: string().required(),
});

export const createContainerSchema = object({
    host: string().required(),
    port: string().required(),
    image: string().required(),
});

export const dockerSchema = object({
    host: string().required(),
    port: string().required(),
    filter: object().optional()
});

export const containerExecSchema = object({
    host: string().required(),
    port: string().required(),
    containerId: string().required(),
    options: object().optional()
});

export const searchImagesSchema = object({
    host: string().required(),
    port: string().required(),
    term: string().required()
});

export const createImageSchema = object({
    host: string().required(),
    port: string().required(),
    image: string().required()
});
