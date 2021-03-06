/**
 * Created by Mark on 6/6/18.
 */
var assert = require('assert');
var proclamation = require('../index.js')({
    region:'dummy'
});

describe('Filter params for postText request', function() {
    describe('if an additional parameter exists', function() {
        it('should return the object minus the extra parameter', function() {
            const params = {
                botAlias: 'DEV',
                botName: 'StoreSomethingBot',
                inputText: 'I am just saying',
                region:'us-east-1',
                userId: 'lexCLI'
            };

            var obj = proclamation.postTextParamFilter(params);

            // Check if invalid region exists.
            assert.notDeepEqual(params, obj);

        });
    });
});