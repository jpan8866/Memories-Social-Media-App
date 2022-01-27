import jwt from 'jsonwebtoken';

    // eg
    // wants to like a post
    // click like button => auth middleware (NEXT) => like controller...

const auth = async (req, res, next) => {
    try {
        // verify user's token to allow interaction w app
        const token = req.headers.authorization.split(" ")[1];
        // is token length is less than 500, then its our own jwt token, if not then its Google Auth
        const isCustomAuth = token.length < 500;
        
        let decodedData; // data we want to get from the token

        // check whether token was custom or was Google Auth
        if(token && isCustomAuth) {
            // is custom, then get user info from token so we know who they are
            decodedData = jwt.verify(token, 'testKey');
            // get user id
            // Note that the id is decoded from the token, which we have set as id, not _id (see users controller)
            // we populate a field in request, so we can retrieve it in the next middleware
            req.userId = decodedData?.id;
        }
        else { // Google Auth
            // only need to decode if it's Google Auth
            decodedData = jwt.decode(token);
            // get user id
            req.userId = decodedData?.sub; // sub is Google's version of user id
        }
        // go to controller
        next();
    } catch (error) {
        console.log(error);
        console.log('auth failed');
    }
}
// use auth middleware in posts routes
export default auth;