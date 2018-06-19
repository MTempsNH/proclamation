/*!
 * proclamation <https://github.com/MTempsNH/proclamation>
 *
 * Copyright (c) 2018, Mark Temple.
 * Released under the MIT License.
 */
var AWS = require('aws-sdk');

var lexruntime;
const postTextParams = ['botName', 'botAlias', 'userId', 'inputText'];

function proclamation (params){
    if (!params || !params.region) {
        throw new Error ('Proclamation region parameter is required');
    }

    AWS.config.update({ region: params.region });

    lexruntime = new AWS.LexRuntime();

    return {
        /**
         * Take an intent that is passed and return the prompt that was returned
         * by the Lex bot.
         * @param intent
         * @return Promise
         */
        lexUtteranceToPrompt: function(intent){
            params.inputText = intent;

            return new Promise((resolve, reject) => {

                var _params = this.postTextParamFilter(params);

                lexruntime.postText(_params, function(err, data){
                    if(err) {
                        reject("AWS error", err);
                    } else {
                        if(data && data.message){
                            resolve(data.message);
                        }else{
                            resolve();
                        }
                    }
                });
            });
        },

        /**
         * Filter the passed parameters to remove unneeded items
         * @param parameters injected
         * @returns {*}
         */
        postTextParamFilter: function(params) {

            const filteredObj = Object.keys( params )
                    .filter( item => postTextParams.includes(item))
                    .reduce((obj, item) => {
                            obj[item] = params[item];
                        return obj;
                    }, {});

            return filteredObj;
        }
    }
}

module.exports = proclamation;
