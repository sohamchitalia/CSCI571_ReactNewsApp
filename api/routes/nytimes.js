const express = require('express');
const router = express.Router();
const got = require('got');
const fetch = require('node-fetch');
const cors = require('cors');
// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Handling GET requests to /products'
//     });
// });

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /guardian'
    });
});

router.get('/', cors(), async (request,response) => {
                            console.log("Ny times");
                            const my_response = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });


router.get('/world', cors(), async (request,response) => {

                            const my_response = await fetch('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });
router.get('/politics', cors(), async (request,response) => {

                            const my_response = await fetch('https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });
router.get('/business', cors(), async (request,response) => {

                            const my_response = await fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });
router.get('/technology', cors(), async (request,response) => {

                            const my_response = await fetch('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });
router.get('/sport', cors(), async (request,response) => {

                            const my_response = await fetch('https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });

// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=%5bQUERY_KEYWORD%5d&api-key=%5bYOUR_API_KEY%5d
router.get('/search', cors(), async (request,response) => {
                            var keyword = request.query.nyt;
                            var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
                            var url = url +keyword+ "&api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr"
                            const my_response = await fetch(url);
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });

// /sport/2020/mar/22/virtual-f1-experiment-race-lando-norris


// https://content.guardianapis.com/"+mainId+"?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all"
// https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(
router.get('/post', cors(), async (request,response) => {
                            var reqid = request.query.id;
                            console.log("hello");
                            console.log(request.query);
                            var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+reqid+'")&api-key=IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr';

                            const my_response = await fetch(url);
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });




module.exports = router;


// NY times key == IJzJ5lFl6T5Ga58P8X2FzPMAhVC0OIYr
