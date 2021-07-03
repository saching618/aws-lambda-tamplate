import { APIGatewayProxyHandler } from 'aws-lambda';
import {v4 as uuidv4} from 'uuid';
import 'source-map-support/register';
import moment, { now } from 'moment';
import { AUTH_PERMISSION } from '../constant';
import { closeRedis, initRedis, RedisClient } from '../services/redis.service';

export const handler: APIGatewayProxyHandler = async (event:any): Promise<any> => {
    const requestId:string = uuidv4();
    try{
        const startTime = now();
        const headersData:any = event.headers || [];
        const authData = [AUTH_PERMISSION] || [];
        const authPermission = headersData['authentication_data'] || '';
        if(! (authPermission && authData && authData.includes(authPermission)) ){
        // return 403 for invalid request
        console.log(requestId,`lambda Request Data:  ${JSON.stringify({headersData})}`);
        return {
            statusCode: 403,
            body: 'permission denied due to missing header data'
        };
        }
        const data:any = JSON.parse(event.body||'{}');
        const key: string = data['key'] || '';
        if(key === ""){
            // return 403 for invalid request
            console.log(requestId,`lambda Request data: ${JSON.stringify({requestId,event})}`);
            return {
            statusCode: 401,
            body: 'Bad Request  - {key is missing}'
            };
        }
        await initRedis(requestId);
        const RedisObj = new RedisClient();
        console.log(requestId,`lambda Request data: ${JSON.stringify({data})}`);
        const response:any = await RedisObj.deleteKey(requestId, key);
        console.log(requestId,`lambda Response data: ${JSON.stringify({data,response})}`);
        
        const endTime = now();
        const totalTimeTaken = moment(endTime).diff(moment(startTime), "seconds");
        await closeRedis(requestId);
        console.log(requestId,`totol time take: ${totalTimeTaken}`);
        if(response !== false){
            // Return success reponse
            return {
                statusCode: 200,
                body:JSON.stringify({
                data: response,
                message: 'success',
                })
            };
        } else {
            // Return Failes reponse
            return {
                statusCode: 404,
                body:JSON.stringify({
                data: response,
                message: 'failed',
                })
            };
        }
        
    }
    catch(err){
        console.log(requestId,`lambda Request Data in catch block: ${JSON.stringify({event})}`);
        console.log(requestId,`lambda error Response in catch block:: ${err}`);
         // return 500 for failed shortening
        return {
            statusCode: 500,
            body: JSON.stringify({
            message: err,
            }, null, 2)
        };
    } 

}

