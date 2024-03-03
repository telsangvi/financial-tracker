import { Response } from 'express';

const formatResponse = (
  result: {
    status: number;
    isSuccess: boolean;
    message: string;
    payload?: object;
    count?: number;
  },
  res: Response,
) => {
  const output = {
    status: result?.status,
    data: {
      isSuccess: result?.isSuccess,
      message: result?.message,
      payload: result?.payload,
      count: result?.count,
    },
  };
  return res.status(result?.status).send(output);
};

export default formatResponse;
