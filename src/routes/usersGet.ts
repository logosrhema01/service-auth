import { Boom } from "@hapi/boom";
import User from "../entity/User";
import { Handler } from "../utils/make-api";

// the "Handler" type automatically does type checks for the response as well
const handler: Handler<'usersGet'> = async (
    { // the parameters, query & request body are automatically combined 
        q,
        count,
        page
    }, 
	{ db }, // db connection
    { user } // user that made the request
) => {
    // a "Boom" error is automatically parsed and returned as a JSON formatted error response
    // with the specified status code
    throw new Boom('Not implemented', { statusCode: 404 })
}
export default handler