import {object, string, ref} from 'yup';

export const createPromotionSchema = object({
    body: object({
        name: string().required('Name is required')
    })
});

