# Proclamation - A local way to test your Amazon Lex chatbot with BDD feature files

## Requirements

This is for local development only at this time.

aws-sdk
v2.230.1

### Installation

```javascript
npm install proclamation --save-dev
```

###

Note: Your bot needs to be up and running in AWS and you need to have your local AWS CLI connected to your AWS account.

[AWS CLI] (https://aws.amazon.com/cli/)

Proclamation uses dependency injection for initialization; see below.
```javascript
    const proclamation = require('proclamation')({
        botAlias: 'DEV',
        botName: 'TheNameOfYourBot',
        inputText: 'Initial utterance',
        region:'us-east-1',
        userId: 'lexCLI'
    });
```