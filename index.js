/*!
 * proclamation <https://github.com/MTempsNH/proclamation>
 *
 * Copyright (c) 2018, Mark Temple.
 * Released under the MIT License.
 */
const AWS = require('aws-sdk');

let lexruntime;
const postTextParams = ['botName', 'botAlias', 'userId', 'inputText'];

function proclamation(params) {
    if (!params || !params.region) {
        throw new Error('Proclamation region parameter is required');
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
        lexUtteranceToPrompt(intent) {
            const awsObj = params;
            awsObj.inputText = intent;

            return new Promise((resolve, reject) => {
                const trimmedParams = this.postTextParamFilter(awsObj);

                lexruntime.postText(trimmedParams, (err, data) => {
                    if (err) {
                        reject(new Error(err));
                    } else if (data && data.message) {
                        resolve(data.message);
                    } else {
                        resolve();
                    }
                });
            });
        },

        /**
         * Filter the passed parameters to remove unneeded items
         * @param parameters injected
         * @returns {*}
         */
        /* eslint-disable no-param-reassign */
        postTextParamFilter(awsParams) {
            const filteredObj = Object.keys(awsParams)
                .filter(item => postTextParams.includes(item))
                .reduce((obj, item) => {
                    obj[item] = params[item];
                    return obj;
                }, {});

            return filteredObj;
        },
    };
}

module.exports = proclamation;
