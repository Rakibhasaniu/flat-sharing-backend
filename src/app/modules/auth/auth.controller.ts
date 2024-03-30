import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";

const login:RequestHandler = catchAsync(async(req,res) => {
    const result = await AuthServices.logInUser(req.body);
    const {refreshToken} = result;
    res.cookie('refreshToken',refreshToken,{
        secure:false,
        httpOnly : true
    });

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Login Successfully',
        data:{
            accessToken:result.accessToken,
            // needsPasswordChange:result.needPasswordChange,
        }
    })
})
const refreshToken:RequestHandler = catchAsync(async(req,res) => {
    const {refreshToken} = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
 

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Refresh token generated Successfully',
        data:result
        // data:{
        //     accessToken:result.accessToken,
        //     needsPasswordChange:result.needPasswordChange,
        // }
    })
})

export const AuthController ={
    login,
    refreshToken,
    
}