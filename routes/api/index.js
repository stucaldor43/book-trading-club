const OAuth = require("oauth");
const router = require("express").Router();
const { jsend } = require("./../../helpers/utils");

const allowOrigin = (req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "https://stucaldor43.github.io",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE"
    });
    next();
};
router.use(allowOrigin);
router.get("/get_request_token", (req, res) => {
    const oauth = new OAuth.OAuth(
              'https://api.twitter.com/oauth/request_token',
              'https://api.twitter.com/oauth/access_token',
              'gW7NqZsRz8PWpLHp7xLc3s4MN',
              '2Yi2ro0P1E8Qw4R5mWwdhAeIN1Ms74XZbRfUh3MHtaAawDritM',
              '1.0A',
              'https://stucaldor43.github.io/book-trading-club/#/login',
              'HMAC-SHA1'
            );
            
    oauth.getOAuthRequestToken({}, function(err, token, secret, parsed) {
        res.json(jsend.success({token, secret}));
    });
});
router.get("/get_access_token", (req, res) => {
    const oauth = new OAuth.OAuth(
              'https://api.twitter.com/oauth/request_token',
              'https://api.twitter.com/oauth/access_token',
              'gW7NqZsRz8PWpLHp7xLc3s4MN',
              '2Yi2ro0P1E8Qw4R5mWwdhAeIN1Ms74XZbRfUh3MHtaAawDritM',
              '1.0A',
              'https://stucaldor43.github.io/book-trading-club/#/login',
              'HMAC-SHA1'
            );
            
    const {secret, token, verifier} = req.query;
    oauth.getOAuthAccessToken(token, secret, verifier, function(err, access_token, access_secret, user) {
        if (!user) {
            console.log(user);
            res.json({
                status: "fail", 
                data: {}
                    
                });
            return;
        }
        req.session.username = user.screen_name;
        res.json(jsend.success({access_token, access_secret, user}));
    });
});
router.use("/client", require("./clients"));
router.use("/address", require("./addresses"));
router.use("/book", require("./books"));
router.use("/bookdetails", require("./book_details"));
router.use("/offer", require("./offers"))
module.exports = router;