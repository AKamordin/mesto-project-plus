import {NextFunction, Request, Response} from "express";
import {IAuthRequest} from "../types";
import {USER_ID} from "../constants";

const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: USER_ID
  }
  next()
}

export default auth
