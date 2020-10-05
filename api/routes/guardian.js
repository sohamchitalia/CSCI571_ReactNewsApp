const express = require('express');
const router = express.Router();
const got = require('got');
const fetch = require('node-fetch');
const cors = require('cors');
const commentBox = require('commentbox.io');
const qs = require('qs');
const googleTrends = require('google-trends-api');
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
                            try{
                              const my_response = await fetch('https://content.guardianapis.com/search?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&section=(sport|business|technology|politics|world)&show-blocks=all');
                              const json = await my_response.json();
                              response.json(json);
                              // console.log(response.body);
                              //=> '<!doctype html> ...'
                          }
                          catch (error) {
                          console.log(error);
                        }
                    });

router.get('/home', cors(), async (request,response) => {
                            try{
                              const my_response = await fetch('http://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=7b488434-d103-4371-8e49-c4f87d4e147c');
                              const json = await my_response.json();
                              response.json(json);
                              // console.log(response.body);
                              //=> '<!doctype html> ...'
                          }
                          catch (error) {
                          console.log(error);
                        }
                    });


router.get('/business', cors(), async (request,response) => {

                            const my_response = await fetch('https://content.guardianapis.com/business?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });

router.get('/world', cors(), async (request,response) => {

                            const my_response = await fetch('https://content.guardianapis.com/world?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });
router.get('/sport', cors(), async (request,response) => {

                            const my_response = await fetch('https://content.guardianapis.com/sport?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });

router.get('/technology', cors(), async (request,response) => {

                            const my_response = await fetch('https://content.guardianapis.com/technology?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });

router.get('/science', cors(), async (request,response) => {

                            const my_response = await fetch('https://content.guardianapis.com/science?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });
router.get('/politics', cors(), async (request,response) => {

                            const my_response = await fetch('https://content.guardianapis.com/politics?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all');
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });


// https://content.guardianapis.com/search?q=QUERY_KEYWORD&api-key=YOUR_API_KEY&show-blocks=all
router.get('/search', cors(), async (request,response) => {
                            var keyword = request.query.guq;
                            var url = 'https://content.guardianapis.com/search?q=';
                            var url = url +keyword+ "&api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all"
                            const my_response = await fetch(url);
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });


// /sport/2020/mar/22/virtual-f1-experiment-race-lando-norris


// https://content.guardianapis.com/"+mainId+"?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all"

router.get('/post', cors(), async (request,response) => {
                            var reqid = request.query.id;
                            var url = 'https://content.guardianapis.com/';
                            var url = url +reqid+ "?api-key=7b488434-d103-4371-8e49-c4f87d4e147c&show-blocks=all"
                            const my_response = await fetch(url);
                            const json = await my_response.json();
                            response.json(json);
                            // console.log(response.body);
                            //=> '<!doctype html> ...'
                    });

router.get('/topnews', cors(), async (request,response) => {
                            try{
                              const my_response = await fetch('http://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=7b488434-d103-4371-8e49-c4f87d4e147c');
                              const json = await my_response.json();
                              response.json(json);
                              // console.log(response.body);
                              //=> '<!doctype html> ...'
                          }
                          catch (error) {
                          console.log(error);
                        }
                    });


router.get('/trending?', cors(), async (request,response) => {
                            var res;
                            var keyword = request.query.keyword;
                            var err = "error"
                            googleTrends.interestOverTime({keyword: keyword, startTime: new Date('2019-06-01')})
                            .then((res) => {
                              response.status(200).send(res);
                            })
                            .catch((err) => {
                              console.log(err);
                            })
                    });

module.exports = router;
